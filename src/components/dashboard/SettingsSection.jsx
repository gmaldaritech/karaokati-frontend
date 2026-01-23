import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, User, Mail, Phone, Lock, Save, Trash2, AlertTriangle, Loader2, QrCode, Copy } from "lucide-react";
import ConfirmDialog from "../ConfirmDialog";
import { toast } from "sonner";
import { apiClient } from "@/api/apiClient";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsSection() {
  const { user, updateProfile, changePassword, logout } = useAuth();
  
  const [settings, setSettings] = useState({
    full_name: "",
    stage_name: "",
    email: "",
    phone: "",
    max_bookings_per_user: 999
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [showDeleteBookingsDialog, setShowDeleteBookingsDialog] = useState(false);
  const [showDeleteCatalogDialog, setShowDeleteCatalogDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // ← AGGIUNGI QUESTO STATE

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      setSettings({
        full_name: user.full_name || "",
        stage_name: user.stage_name || "",
        email: user.email || "",
        phone: user.phone || "",
        max_bookings_per_user: user.max_bookings_per_user || 999
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    // Validazioni manuali complete
    if (!settings.full_name.trim()) {
      toast.error("Il nome completo è obbligatorio");
      return;
    }

    if (!settings.stage_name.trim()) {
      toast.error("Il nome d'arte DJ è obbligatorio");
      return;
    }

    // Telefono opzionale - se fornito, deve avere almeno 10 caratteri
    if (settings.phone && settings.phone.trim() && settings.phone.trim().length < 10) {
      toast.error("Inserisci un numero di telefono valido");
      return;
    }

    try {
      setSubmitting(true);
      
      // Invia solo i campi modificabili (escludiamo email)
      await updateProfile({
        full_name: settings.full_name,
        stage_name: settings.stage_name,
        phone: settings.phone,
        max_bookings_per_user: settings.max_bookings_per_user
      });
      
      toast.success("Profilo aggiornato con successo");
    } catch (error) {
      console.error('Error updating profile:', error);
      
      // Gestisci errori specifici
      if (error.message.includes("Network Error") || error.message.includes("fetch")) {
        toast.error("Impossibile connettersi al server. Riprova.");
      } else {
        toast.error(error.message || "Impossibile aggiornare il profilo");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validazioni manuali complete
    if (!passwordData.current_password) {
      toast.error("La password attuale è obbligatoria");
      return;
    }

    if (!passwordData.new_password) {
      toast.error("La nuova password è obbligatoria");
      return;
    }

    if (passwordData.new_password.length < 8) {
      toast.error("La password deve essere di almeno 8 caratteri");
      return;
    }

    if (!passwordData.confirm_password) {
      toast.error("Conferma la nuova password");
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("Le password non coincidono");
      return;
    }

    try {
      setChangingPassword(true);
      await changePassword({
        current_password: passwordData.current_password,
        new_password: passwordData.new_password
      });

      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: ""
      });
      setShowPasswordForm(false);

      toast.success("Password modificata con successo");
    } catch (error) {
      console.error('Error changing password:', error);
      
      // Gestisci errori specifici
      if (error.message.includes("Password attuale non corretta")) {
        toast.error("La password attuale non è corretta");
      } else if (error.message.includes("Network Error") || error.message.includes("fetch")) {
        toast.error("Impossibile connettersi al server. Riprova.");
      } else {
        toast.error(error.message || "Impossibile modificare la password");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const copyQRCode = () => {
    if (user?.qr_code_id) {
      navigator.clipboard.writeText(user.qr_code_id);
      toast.success("ID QR Code copiato negli appunti");
    }
  };

  const handleDeleteAllBookings = async () => {
    try {
      const result = await apiClient.deleteAllBookings();
      toast.success(`${result.deleted} prenotazioni eliminate da tutti i locali`);
    } catch (error) {
      console.error('Error deleting bookings:', error);
      toast.error("Impossibile eliminare tutte le prenotazioni")
    }
  };

  const handleDeleteCatalog = async () => {
    try {
      await apiClient.clearCatalog();
      setShowDeleteCatalogDialog(false);
      toast.success("Catalogo eliminato completamente");
    } catch (error) {
      console.error('Error deleting catalog:', error);
      toast.error("Impossibile eliminare il catalogo");
    }
  };

  const handleDeleteAccount = async () => {
  try {
    setIsDeleting(true); // ← ATTIVA LOADING
    // La tua chiamata API esistente
    await apiClient.deleteAccount();
    
    // Logout e redirect (verrà eseguito dopo la risposta)
    await logout();
    
  } catch (error) {
    console.error('Errore eliminazione:', error);
    setIsDeleting(false); // ← DISATTIVA SE ERRORE
    toast.error("Errore durante l'eliminazione dell'account");
  }
  // Non serve setIsDeleting(false) qui perché l'utente viene reindirizzato
};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Impostazioni</h2>
        <p className="text-gray-400">Configura il tuo account e le preferenze</p>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={showDeleteAccountDialog}
        onOpenChange={setShowDeleteAccountDialog}
        title="Elimina Account"
        description="Sei sicuro di voler eliminare il tuo account? Tutti i tuoi dati, locali, catalogo e prenotazioni saranno eliminati definitivamente. Questa azione non può essere annullata."
        onConfirm={handleDeleteAccount}
        confirmText="Elimina Account"
        variant="danger"
      />

      <ConfirmDialog
        open={showDeleteBookingsDialog}
        onOpenChange={setShowDeleteBookingsDialog}
        title="Cancella Tutte le Prenotazioni"
        description="Sei sicuro di voler cancellare TUTTE le prenotazioni per TUTTI i locali? Questa azione non può essere annullata."
        onConfirm={handleDeleteAllBookings}
        confirmText="Cancella Tutte"
        variant="danger"
      />

      <ConfirmDialog
        open={showDeleteCatalogDialog}
        onOpenChange={setShowDeleteCatalogDialog}
        title="Cancella Catalogo"
        description="Sei sicuro di voler cancellare l'intero catalogo delle canzoni? Questa azione non può essere annullata."
        onConfirm={handleDeleteCatalog}
        confirmText="Cancella Catalogo"
        variant="danger"
      />

      {/* Profile Settings */}
      <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="w-5 h-5 text-purple-400" />
            Informazioni Profilo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">Nome Completo</Label>
                <Input
                  id="fullName"
                  value={settings.full_name}
                  onChange={(e) => setSettings({ ...settings, full_name: e.target.value })}
                  className="bg-gray-900/50 border-purple-800/50 text-white"
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stageName" className="text-gray-300">Nome d'Arte</Label>
                <Input
                  id="stageName"
                  value={settings.stage_name}
                  onChange={(e) => setSettings({ ...settings, stage_name: e.target.value })}
                  className="bg-gray-900/50 border-purple-800/50 text-white"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4 text-purple-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="bg-gray-900/50 border-purple-800/50 text-white"
                  disabled={true}  // 🔒 Campo disabilitato
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4 text-purple-400" />
                  Telefono
                </Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="bg-gray-900/50 border-purple-800/50 text-white"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* QR Code Info */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <QrCode className="w-4 h-4 text-purple-400" />
                QR Code ID
              </Label>
              <div className="flex gap-3">
                <Input
                  value={user?.qr_code_id || ""}
                  disabled
                  className="flex-1 bg-gray-900/50 border-purple-800/50 text-gray-400"
                />
                <Button 
                  type="button"
                  variant="ghost" 
                  className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
                  onClick={copyQRCode}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Max Bookings Configuration */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <Users className="w-4 h-4 text-purple-400" />
                Max Prenotazioni per Utente
              </Label>
              <div className="relative">
                <select
                  value={String(settings.max_bookings_per_user)}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    max_bookings_per_user: parseInt(e.target.value) 
                  })}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-purple-800/50 rounded-md text-white 
                            focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none
                            appearance-none cursor-pointer 
                            font-normal text-sm
                            hover:bg-gray-800/50 hover:border-purple-700/50
                            transition-all duration-200
                            [&>option]:font-normal [&>option]:text-sm"
                >
                  <option value="3" className="bg-gray-900 text-white font-normal">3 prenotazioni</option>
                  <option value="5" className="bg-gray-900 text-white font-normal">5 prenotazioni</option>
                  <option value="10" className="bg-gray-900 text-white font-normal">10 prenotazioni</option>
                  <option value="999" className="bg-gray-900 text-white font-normal">Nessun limite</option>
                </select>
                
                {/* Icona freccia personalizzata */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Numero massimo di prenotazioni che ogni utente può fare per sessione
              </p>
            </div>

            <Button 
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salva Modifiche
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lock className="w-5 h-5 text-purple-400" />
            Sicurezza
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!showPasswordForm ? (
              <div>
                <Label className="text-gray-300">Password</Label>
                <div className="flex gap-3 mt-2">
                  <Input 
                    type="password" 
                    value="••••••••" 
                    disabled 
                    className="flex-1 bg-gray-900/50 border-purple-800/50 text-gray-500" 
                  />
                  <Button 
                    variant="ghost" 
                    className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
                    onClick={() => setShowPasswordForm(true)}
                  >
                    Modifica Password
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-gray-300">Password Attuale</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                    className="bg-gray-900/50 border-purple-800/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-300">Nuova Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                    className="bg-gray-900/50 border-purple-800/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">Conferma Nuova Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirm_password}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                    className="bg-gray-900/50 border-purple-800/50 text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    type="submit"
                    disabled={changingPassword}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {changingPassword ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Cambia Password
                  </Button>
                  <Button 
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordData({
                        current_password: "",
                        new_password: "",
                        confirm_password: ""
                      });
                    }}
                    className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    Annulla
                  </Button>
                </div>
              </form>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="border-red-800/30 bg-red-900/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Gestione Dati e Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Cancella Tutte le Prenotazioni</h4>
              <p className="text-sm text-gray-400 mb-3">
                Elimina tutte le prenotazioni per tutti i locali. Questa azione non può essere annullata.
              </p>
              <Button 
                onClick={() => setShowDeleteBookingsDialog(true)}
                variant="ghost" 
                className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Cancella Tutte le Prenotazioni
              </Button>
            </div>

            <div className="pt-4 border-t border-red-800/30">
              <h4 className="font-semibold text-white mb-2">Cancella Catalogo</h4>
              <p className="text-sm text-gray-400 mb-3">
                Elimina l'intero catalogo delle canzoni. Questa azione non può essere annullata.
              </p>
              <Button 
                onClick={() => setShowDeleteCatalogDialog(true)}
                variant="ghost" 
                className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Cancella Catalogo
              </Button>
            </div>

            <div className="pt-4 border-t border-red-800/30">
              <h4 className="font-semibold text-white mb-2">Elimina Account</h4>
              <p className="text-sm text-gray-400 mb-3">
                Elimina definitivamente il tuo account DJ e tutti i dati associati. Questa azione è irreversibile.
              </p>
              <Button 
                onClick={() => setShowDeleteAccountDialog(true)}
                variant="ghost" 
                className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Elimina Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700/50">
        <CardHeader>
          <CardTitle className="text-white">Il Tuo Piano</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              {/* <div className="text-2xl font-bold text-purple-400 mb-1">Piano Pro</div> */}
              <div className="text-gray-300">Locali illimitati • Titoli nel catalogo illimitati • Chatbot integrato</div>
              {/* <div className="text-sm text-gray-400 mt-2">Prossimo rinnovo: 15 Febbraio 2025</div> */}
            </div>
            {/* <Button variant="ghost" className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50">
              Gestisci Piano
            </Button> */}
          </div>
        </CardContent>
      </Card>

      {isDeleting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="bg-gray-800/50 border-red-800/50 p-8 text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Eliminazione in corso...</h2>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <Loader2 className="w-6 h-6 text-red-400 animate-spin" />
              <p className="text-gray-300">Stiamo eliminando il tuo account</p>
            </div>
            
            <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-300">
                Non chiudere questa pagina durante l'operazione
              </p>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}