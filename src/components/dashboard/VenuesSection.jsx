
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, Edit2, Trash2, Building2, Power, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConfirmDialog from "../ConfirmDialog";
import { toast } from "sonner";
import { apiClient } from "@/api/apiClient";

export default function VenuesSection() {
  const [venues, setVenues] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🆕 Stati per ConfirmDialog
  const [showDeleteVenueDialog, setShowDeleteVenueDialog] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);

  // 🆕 Stati per Edit Dialog
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);

  // Assicurati che entrambi gli stati abbiano notes inizializzato
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    capacity: '',
    notes: '' // 🔧 Assicurati che sia una stringa vuota, non undefined
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    address: '',
    capacity: '',
    notes: '' // 🔧 Assicurati che sia una stringa vuota, non undefined
  });

  // Load venues on component mount
  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      setLoading(true);
      const venuesData = await apiClient.getVenues();
      setVenues(venuesData);
    } catch (error) {
      console.error('Error loading venues:', error);
      toast.error("Impossibile caricare i locali");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.name.trim()) {
  //     toast.error("Il nome del locale è obbligatorio");
  //     return;
  //   }

  //   try {
  //     setSubmitting(true);
  //     const newVenue = await apiClient.createVenue({
  //       name: formData.name,
  //       address: formData.address || null,
  //       capacity: formData.capacity ? parseInt(formData.capacity) : 50,
  //       notes: formData.notes || null
  //     });
      
  //     setVenues([...venues, newVenue]);
  //     setFormData({ name: '', address: '', capacity: '', notes: '' });
  //     setShowAddForm(false);

  //     toast.success("Locale aggiunto con successo");
  //   } catch (error) {
  //     console.error('Error creating venue:', error);
  //     toast.error("Impossibile aggiungere il locale");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazioni manuali complete come nel Register.jsx
    if (!formData.name.trim()) {
      toast.error("Il nome del locale è obbligatorio");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("L'indirizzo del locale è obbligatorio");
      return;
    }

    try {
      setSubmitting(true);
      const newVenue = await apiClient.createVenue({
        name: formData.name,
        address: formData.address || null,
        capacity: formData.capacity ? parseInt(formData.capacity) : 50,
        notes: formData.notes || null
      });
      
      setVenues([...venues, newVenue]);
      setFormData({ name: '', address: '', capacity: '', notes: '' });
      setShowAddForm(false);
      
      toast.success("Locale aggiunto con successo");
    } catch (error) {
      console.error('Error creating venue:', error);
      toast.error("Impossibile aggiungere il locale");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleVenueActive = async (venueId) => {
    try {
      const result = await apiClient.toggleVenue(venueId);
      
      // Update local state - only one venue can be active at a time
      setVenues(venues.map(v => ({
        ...v,
        active: v.id === venueId ? result.active : false
      })));

    } catch (error) {
      console.error('Error toggling venue:', error);
      toast.error("Impossibile modificare lo stato del locale");
    }
  };

  // 🆕 Modifica funzione per usare ConfirmDialog
  const handleDeleteVenue = (venue) => {
    setVenueToDelete(venue);
    setShowDeleteVenueDialog(true);
  };

  const proceedWithDeleteVenue = async () => {
    if (!venueToDelete) return;
    
    try {
      await apiClient.deleteVenue(venueToDelete.id);
      setVenues(venues.filter(v => v.id !== venueToDelete.id));
      
      toast.success("Locale eliminato con successo");
    } catch (error) {
      console.error('Error deleting venue:', error);
      toast.error("Impossibile eliminare il locale");
    } finally {
      setShowDeleteVenueDialog(false);
      setVenueToDelete(null);
    }
  };

  // 🆕 Funzioni per gestire la modifica
  const handleEditVenue = (venue) => {
    setEditingVenue(venue);
    setEditFormData({
      name: venue.name,
      address: venue.address || '',
      capacity: venue.capacity || '',
      notes: venue.notes || ''
    });
    setShowEditDialog(true);
  };

  const handleUpdateVenue = async () => {

    if (!editFormData.name.trim()) {
      toast.error("Il nome del locale è obbligatorio");
      return;
    }

    if (!editFormData.address.trim()) {
      toast.error("L'indirizzo del locale è obbligatorio");
      return;
    }

    try {
      setSubmitting(true);
      const updatedVenue = await apiClient.updateVenue(editingVenue.id, {
        name: editFormData.name,
        address: editFormData.address || null,
        capacity: editFormData.capacity ? parseInt(editFormData.capacity) : null,
        notes: editFormData.notes || null
      });
      
      setVenues(venues.map(v => v.id === editingVenue.id ? updatedVenue : v));
      setShowEditDialog(false);
      setEditingVenue(null);
      
      toast.success("Locale aggiornato con successo");
    } catch (error) {
      console.error('Error updating venue:', error);
      toast.error("Impossibile aggiornare il locale");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* 🆕 ConfirmDialog per eliminazione locale */}
      <ConfirmDialog
        open={showDeleteVenueDialog}
        onOpenChange={setShowDeleteVenueDialog}
        title="Elimina Locale"
        description={`Sei sicuro di voler eliminare il locale "${venueToDelete?.name}"? Tutte le prenotazioni associate verranno eliminate. Questa azione non può essere annullata.`}
        onConfirm={proceedWithDeleteVenue}
        confirmText="Elimina Locale"
        variant="danger"
      />

      {/* 🆕 Dialog per modifica locale */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-gray-900 border-purple-800/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Modifica Locale</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="editVenueName" className="text-gray-300">Nome Locale</Label>
              <Input 
                id="editVenueName" 
                value={editFormData.name}
                onChange={(e) => handleEditInputChange('name', e.target.value)}
                className="bg-gray-800/50 border-purple-800/50 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editVenueAddress" className="text-gray-300">Indirizzo</Label>
              <Input 
                id="editVenueAddress" 
                value={editFormData.address}
                onChange={(e) => handleEditInputChange('address', e.target.value)}
                className="bg-gray-800/50 border-purple-800/50 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editVenueCapacity" className="text-gray-300">Capacità</Label>
              <Input 
                id="editVenueCapacity" 
                type="number" 
                value={editFormData.capacity}
                onChange={(e) => handleEditInputChange('capacity', e.target.value)}
                className="bg-gray-800/50 border-purple-800/50 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editVenueNotes" className="text-gray-300">
                Note <span className="text-sm text-gray-500">({editFormData.notes.length}/500)</span>
              </Label>
              <textarea
                id="editVenueNotes"
                value={editFormData.notes}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    handleEditInputChange('notes', e.target.value);
                  }
                }}
                placeholder="Note aggiuntive sul locale"
                rows={3}
                maxLength={500}
                className="w-full px-3 py-2 bg-gray-800/50 border border-purple-800/50 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowEditDialog(false);
                  setEditingVenue(null);
                }}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                Annulla
              </Button>
              <Button
                onClick={handleUpdateVenue}
                disabled={submitting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {submitting ? 'Salvando...' : 'Salva Modifiche'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">I Tuoi Locali</h2>
          <p className="text-gray-400">Gestisci tutti i locali dove fai serate</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Aggiungi Locale
        </Button>
      </div>

      {/* Add Venue Form */}
      {showAddForm && (
        <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Nuovo Locale</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venueName" className="text-gray-300">Nome Locale *</Label>
                  <Input 
                    id="venueName" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Es. Rock Café" 
                    className="bg-gray-900/50 border-purple-800/50 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venueCapacity" className="text-gray-300">Capacità</Label>
                  <Input 
                    id="venueCapacity" 
                    type="number" 
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="Es. 200" 
                    className="bg-gray-900/50 border-purple-800/50 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venueAddress" className="text-gray-300">Indirizzo *</Label>
                <Input 
                  id="venueAddress" 
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Via, Città" 
                  className="bg-gray-900/50 border-purple-800/50 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venueNotes" className="text-gray-300">
                  Note <span className="text-sm text-gray-500">({formData.notes.length}/500)</span>
                </Label>
                <textarea
                  id="venueNotes"
                  value={formData.notes}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      handleInputChange('notes', e.target.value);
                    }
                  }}
                  placeholder="Note aggiuntive sul locale (opzionale)"
                  rows={3}
                  maxLength={500}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-purple-800/50 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button 
                  type="button" 
                  variant="ghost"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ name: '', address: '', capacity: '', notes: '' });
                  }}
                  disabled={submitting}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                >
                  Annulla
                </Button>
                <Button 
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {submitting ? 'Salvando...' : 'Salva Locale'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Venues Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <Card key={venue.id} className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-900/20 transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-1 text-white">{venue.name}</CardTitle>
                      {venue.active && (
                        <Badge className="bg-green-900/50 text-green-300 border-green-700/50">
                          <Power className="w-3 h-3 mr-1" />
                          Serata Avviata
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {venue.address && (
                    <div className="flex items-start gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" />
                      <span>{venue.address}</span>
                    </div>
                  )}
                  {venue.capacity && (
                    <div className="text-sm text-gray-400">
                      Capacità: <span className="font-semibold text-gray-300">{venue.capacity} persone</span>
                    </div>
                  )}
                  <div className="text-sm">
                    <div className="text-gray-400 mb-1">Note:</div>
                    <div className="text-gray-300 bg-gray-900/30 p-2 rounded border border-gray-700/50 text-xs leading-relaxed break-words overflow-hidden min-h-[120px] max-h-[120px] overflow-y-auto">
                      {venue.notes ? (
                        <span>{venue.notes}</span>
                      ) : (
                        <span className="text-gray-500 italic">Nessuna nota aggiunta</span>
                      )}
                    </div>
                  </div>

                  {/* Activate Event Switch */}
                  <div className="p-3 bg-gray-900/50 rounded-lg border border-purple-800/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-300">Avvia Serata</div>
                        <div className="text-xs text-gray-500">Permetti prenotazioni</div>
                      </div>
                      <Switch
                        checked={venue.active}
                        onCheckedChange={() => toggleVenueActive(venue.id)}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleEditVenue(venue)}
                      className="flex-1 text-gray-300 hover:text-white hover:bg-gray-800/50"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Modifica
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteVenue(venue)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {venues.length === 0 && (
        <Card className="p-12 border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Nessun locale aggiunto</h3>
            <p className="text-gray-400 mb-6">
              Inizia aggiungendo il primo locale dove organizzi serate karaoke
            </p>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Aggiungi il Primo Locale
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
