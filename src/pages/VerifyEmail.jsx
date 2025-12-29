import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mic2, CheckCircle, ArrowRight, Mail, XCircle, Loader2, RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth"; // 🆕 AGGIUNTO
import { toast } from "sonner"; // 🆕 AGGIUNTO
import { apiClient } from "@/api/apiClient";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth(); // 🆕 AGGIUNTO
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    document.title = "Verifica Email - Karaokati";
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const data = await apiClient.request(`/auth/verify-email/${token}`, {
        method: 'POST'
      });

      setStatus('success');
      
      if (data.token) {
        apiClient.setToken(data.token);  // Usa il metodo dell'apiClient
        setUser(data.dj);
        setIsAuthenticated(true);
      }
      
      toast.success('Email verificata con successo!');
      
    } catch (error) {
      setStatus('error');
      toast.error(error.message || 'Errore durante la verifica');
      console.error('Verification error:', error);
    }
  };

  
  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <>
            <CardHeader className="text-center pb-6">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Mic2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Karaokati
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Verifica in corso...
              </CardTitle>
              <p className="text-gray-400 mt-2">
                Stiamo verificando il tuo account
              </p>
            </CardHeader>
            
            <CardContent className="text-center space-y-6">
              <div className="w-20 h-20 bg-purple-900/30 border border-purple-700/50 rounded-full flex items-center justify-center mx-auto">
                <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
              </div>
              
              <p className="text-gray-400 text-sm">
                Attendere qualche istante...
              </p>
            </CardContent>
          </>
        );

      case 'error':
        return (
          <>
            <CardHeader className="text-center pb-6">
              {/* <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Mic2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Karaokati
                </span>
              </div> */}
              <div className="flex items-center gap-3 mb-6 justify-center">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Mic2 className="w-6 h-6 text-white" />
              </div> */}
                <img 
                  src="/logo2.png"
                  alt="Karaokati"
                  className="h-10 w-auto"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Verifica Fallita
              </CardTitle>
              <p className="text-gray-400 mt-2">
                Non è stato possibile verificare l'email
              </p>
            </CardHeader>
            
            <CardContent className="text-center space-y-6">
              <div className="w-20 h-20 bg-red-900/30 border border-red-700/50 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-10 h-10 text-red-400" />
              </div>

              <div className="space-y-2">
                <p className="text-gray-300">
                  Il link di verifica potrebbe essere scaduto o non valido.
                </p>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-xl p-4 text-left">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-300 mb-1">Link scaduto?</h3>
                    <p className="text-sm text-gray-400">
                      I link di verifica sono validi per 24 ore. Se è passato più tempo, richiedi un nuovo link.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link to={createPageUrl("Register")} className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Registrati di nuovo
                  </Button>
                </Link>

                <Link to={createPageUrl("Access")} className="block">
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-400 hover:text-white hover:bg-gray-800/50"
                  >
                    Torna al login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </>
        );

      case 'success':
        return (
          <>
            <CardHeader className="text-center pb-6">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Mic2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Karaokati
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Email Verificata!
              </CardTitle>
              <p className="text-gray-400 mt-2">
                Il tuo account è ora attivo
              </p>
            </CardHeader>
            
            <CardContent className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-green-900/30 border border-green-700/50 rounded-full flex items-center justify-center mx-auto">
                  <div className="relative">
                    <Mail className="w-8 h-8 text-green-400" />
                    <CheckCircle className="w-5 h-5 text-green-400 absolute -bottom-1 -right-1 bg-gray-900 rounded-full" />
                  </div>
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-green-500/20 rounded-full blur-xl" />
              </div>

              <div className="space-y-2">
                <p className="text-gray-300">
                  La verifica del tuo indirizzo email è andata a buon fine.
                </p>
              </div>

              <div className="bg-purple-900/30 border border-purple-800/30 rounded-xl p-4 text-left">
                <p className="text-purple-300 text-sm">
                  🎉 <strong>Complimenti!</strong> La registrazione è completata!
                </p>
              </div>

              <Link to={createPageUrl("Access")} className="block pt-2">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6">
                  Prosegui
                </Button>
              </Link>
            </CardContent>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl ${
          status === 'success' ? 'bg-green-600/20' : 
          status === 'error' ? 'bg-red-600/20' : 'bg-purple-600/20'
        }`} />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
          {renderContent()}
        </Card>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-sm text-white py-6 px-6 border-t border-purple-800/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 Karaokati. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <Link to={createPageUrl("TermsOfService")} className="hover:text-white transition">Termini di servizio</Link>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}