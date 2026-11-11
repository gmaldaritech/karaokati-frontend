import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Music, Plus, Search, X, ChevronLeft, ChevronRight, MapPin, Trash2, Download, Loader2, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmDialog from "../ConfirmDialog";
import { apiClient } from "@/api/apiClient";
import { toast } from "sonner";

export default function BookingsSection() {
  const [activeVenue, setActiveVenue] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showManualBooking, setShowManualBooking] = useState(false);
  const [manualBookingData, setManualBookingData] = useState({
    userName: "",
    song: "",
    key: "0",
    notes: ""
  });

  const [songSearch, setSongSearch] = useState("");
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  // 🆕 Nuovi stati per ricerca ottimizzata
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Titolo scritto a mano (inserimento libero)
  const [freeSong, setFreeSong] = useState("");

  // null = ancora in caricamento
  const [catalogCount, setCatalogCount] = useState(null);
  const noCatalog = catalogCount === 0;

  // 🆕 AGGIUNGI questi ref per polling
const pollingIntervalRef = useRef(null);
const isPollingActiveRef = useRef(false);

// 🆕 FUNZIONE POLLING SILENZIOSO
const startSilentPolling = useCallback(() => {
  if (isPollingActiveRef.current) return;
  
  isPollingActiveRef.current = true;
  
  const interval = setInterval(async () => {
    try {
      if (activeVenue?.id) {
        const bookingsData = await apiClient.getBookings(activeVenue.id);
        
        // Transform API data (stesso codice di loadBookings)
        const transformedBookings = bookingsData.map(booking => ({
          id: booking.id,
          userName: booking.user_name,
          song: booking.song,
          time: formatTimeAgo(booking.created_at),
          status: booking.status,
          key: booking.key,
          notes: booking.notes,
          venue: booking.venue_name,
          sessionId: booking.session_id,
          isFreeRequest: booking.is_free_request
        }));

        setBookings(transformedBookings);
        // 🔇 NESSUN toast, loader, o indicatore visuale
      }
    } catch (error) {
      // 🔇 Solo console.error, nessuna notifica user
      console.error("Errore polling prenotazioni:", error);
    }
  }, 10000); // Ogni 10 secondi
  
  pollingIntervalRef.current = interval;
}, [activeVenue?.id]);

// 🆕 FUNZIONE STOP POLLING
const stopSilentPolling = useCallback(() => {
  if (pollingIntervalRef.current) {
    clearInterval(pollingIntervalRef.current);
    pollingIntervalRef.current = null;
    isPollingActiveRef.current = false;
  }
}, []);

// GESTIONE CICLO DI VITA POLLING
useEffect(() => {
  if (activeVenue?.id) {
    startSilentPolling();
  } else {
    stopSilentPolling();
  }
  
  return () => stopSilentPolling();
}, [activeVenue?.id, startSilentPolling, stopSilentPolling]);

// 🆕 GESTIONE VISIBILITÀ TAB (risparmia risorse)
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopSilentPolling();
    } else if (activeVenue?.id) {
      startSilentPolling();
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [activeVenue?.id, startSilentPolling, stopSilentPolling]);

  // 🆕 Hook per debounce
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearch = useDebounce(songSearch, 300);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Reload bookings when active venue changes
  useEffect(() => {
    if (activeVenue) {
      loadBookings(activeVenue.id);
    }
  }, [activeVenue]);

  // 🆕 Effetto per ricerca real-time
  useEffect(() => {
    searchSongs(debouncedSearch);
  }, [debouncedSearch]);

  const loadCatalogCount = async () => {
    try {
      const response = await apiClient.getSongs({ page: 1, per_page: 1 });
      setCatalogCount(response.total || 0);
    } catch (error) {
      console.error('Error loading catalog count:', error);
    }
  };

  // Ricontrolla il catalogo ogni volta che si apre la prenotazione manuale
  useEffect(() => {
    if (showManualBooking) {
      loadCatalogCount();
    }
  }, [showManualBooking]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Load only venues (no songs preloading)
      const venuesData = await apiClient.getVenues();
      setVenues(venuesData);

      // Find active venue
      const active = venuesData.find(v => v.active);
      if (active) {
        setActiveVenue(active);
        await loadBookings(active.id);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error("Impossibile caricare i dati");
    } finally {
      setLoading(false);
    }
  };

  // 🆕 Funzione per ricerca real-time
  const searchSongs = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await apiClient.getSongs({ 
        search: query.trim(), 
        per_page: 1000
      });
      setSearchResults(response.songs.map(song => song.file_name));
    } catch (error) {
      console.error('Error searching songs:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const loadBookings = async (venueId) => {
    try {
      const bookingsData = await apiClient.getBookings(venueId);
      
      // Transform API data to component format
      const transformedBookings = bookingsData.map(booking => ({
        id: booking.id,
        userName: booking.user_name,
        song: booking.song,
        time: formatTimeAgo(booking.created_at),
        status: booking.status,
        key: booking.key,
        notes: booking.notes,
        venue: booking.venue_name,
        sessionId: booking.session_id,
        isFreeRequest: booking.is_free_request
      }));

      setBookings(transformedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast.error("Impossibile caricare le prenotazioni");
    }
  };

  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    
    // 🆕 Forza interpretazione come UTC e converte automaticamente al fuso locale
    const created = new Date(createdAt.endsWith('Z') ? createdAt : createdAt + 'Z');
    
    const diffInMinutes = Math.floor((now - created) / 60000);
    
    if (diffInMinutes < 1) return "Ora";
    if (diffInMinutes === 1) return "1 minuto fa";
    if (diffInMinutes < 60) return `${diffInMinutes} minuti fa`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return "1 ora fa";
    if (diffInMinutes < 1440) return `${diffInHours} ore fa`;
    
    const diffInDays = Math.floor(diffInMinutes / 1440);
    if (diffInDays === 1) return "1 giorno fa";
    return `${diffInDays} giorni fa`;
};

  // Current venue bookings
  const venueBookings = bookings;

  const handleAccept = async (id) => {
    try {
      await apiClient.acceptBooking(id);
      setBookings(bookings.map(b => b.id === id ? { ...b, status: "accepted" } : b));
    } catch (error) {
      console.error('Error accepting booking:', error);
      toast.error("Impossibile accettare la prenotazione");
    }
  };

  const handleReject = async (id) => {
    try {
      await apiClient.deleteBooking(id);
      setBookings(bookings.filter(b => b.id !== id));
      toast.success("Prenotazione eliminata")
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast.error("Impossibile eliminare la prenotazione");
    }
  };

  const handleDeleteAllForVenue = async () => {
    try {
      await apiClient.deleteVenueBookings(activeVenue.id);
      setBookings([]);
      setShowDeleteAllDialog(false);
      toast.success("Tutte le prenotazioni sono state eliminate");
    } catch (error) {
      console.error('Error deleting all bookings:', error);
      toast.error("Impossibile eliminare le prenotazioni");
    }
  };

  const handleManualBooking = async () => {
    const song = manualBookingData.song || freeSong.trim();
    const isFree = !manualBookingData.song;
    if (!manualBookingData.userName || !song) {
      return;
    }

    try {
      setSubmitting(true);
      const newBooking = await apiClient.createBooking({
        user_name: manualBookingData.userName,
        song: song,
        key: manualBookingData.key,
        notes: manualBookingData.notes?.trim() || null,
        venue_id: activeVenue.id,
        is_free_request: isFree
      });

      // Add to local state
      const transformedBooking = {
        id: newBooking.id,
        userName: newBooking.user_name,
        song: newBooking.song,
        time: "Ora",
        status: newBooking.status,
        key: newBooking.key,
        notes: newBooking.notes ?? manualBookingData.notes ?? "",
        venue: activeVenue.name,
        sessionId: null,
        isFreeRequest: newBooking.is_free_request ?? isFree
      };

      setBookings([...bookings, transformedBooking]);
      setManualBookingData({ userName: "", song: "", key: "0", notes: "" });
      setFreeSong("");
      setShowManualBooking(false);
      setSongSearch("");
      setSearchResults([]);

    } catch (error) {
      console.error('Error creating manual booking:', error);
      toast.error("Impossibile creare la prenotazione");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadBookings = async () => {
    try {
      const blob = await apiClient.downloadBookings(activeVenue.id);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `prenotazioni_${activeVenue.name.replace(/\s+/g, "_")}_${new Date().toLocaleDateString("it-IT").replace(/\//g, "-")}.xlsx`;
      link.click();
      URL.revokeObjectURL(link.href);
      toast.success("Prenotazioni scaricate");
    } catch (error) {
      console.error("Error downloading bookings:", error);
      toast.error("Impossibile scaricare le prenotazioni");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-900/50 text-yellow-300 border-yellow-700/50">In Attesa</Badge>;
      case "accepted":
        return <Badge className="bg-green-900/50 text-green-300 border-green-700/50">Accettata</Badge>;
      case "rejected":
        return <Badge className="bg-red-900/50 text-red-300 border-red-700/50">Rifiutata</Badge>;
      default:
        return null;
    }
  };

  const pendingBookings = venueBookings.filter(b => b.status === "pending");
  const allVenueBookings = [...venueBookings].sort((a, b) => {
  return a.id - b.id;
});

    // Canzone scelta dal catalogo oppure scritta a mano
  const effectiveSong = manualBookingData.song || freeSong.trim();

  const manualSongInput = (
    <>
      <Input
        placeholder="Scrivi Titolo - Artista (es: Albachiara - Vasco Rossi)..."
        value={freeSong}
        onChange={(e) => setFreeSong(e.target.value)}
        maxLength={200}
        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
      />
      <p className="text-xs text-gray-500 mt-1.5 pl-1">
        💡 Scrivi il titolo e l'artista della canzone, poi conferma la prenotazione.
      </p>
    </>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Prenotazioni</h2>
          <p className="text-gray-400">Gestisci le richieste dei clienti in tempo reale</p>
        </div>
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
        </div>
      </div>
    );
  }

  if (!activeVenue) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Prenotazioni</h2>
          <p className="text-gray-400">Gestisci le richieste dei clienti in tempo reale</p>
        </div>

        <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Nessuna serata avviata
            </h3>
            <p className="text-gray-400">
              Avvia la serata in un locale per vedere le prenotazioni ad esso associate
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog
        open={showDeleteAllDialog}
        onOpenChange={setShowDeleteAllDialog}
        title="Cancella Tutte le Prenotazioni"
        description={`Sei sicuro di voler cancellare tutte le prenotazioni per ${activeVenue?.name}? Questa azione non può essere annullata.`}
        onConfirm={handleDeleteAllForVenue}
        confirmText="Cancella Tutte"
        variant="danger"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Prenotazioni</h2>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>Locale: <span className="font-semibold text-purple-400">{activeVenue?.name}</span></span>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {venueBookings.length > 0 && (
            <Button
              onClick={handleDownloadBookings}
              variant="ghost"
              className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Scarica Prenotazioni
            </Button>
          )}
          {venueBookings.length > 0 && (
            <Button 
              onClick={() => setShowDeleteAllDialog(true)}
              variant="ghost"
              className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Cancella Tutte
            </Button>
          )}
          <Button 
            onClick={() => setShowManualBooking(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Prenota Manualmente
          </Button>
        </div>
      </div>

      {/* Manual Booking Dialog */}
      <Dialog open={showManualBooking} onOpenChange={(open) => {setShowManualBooking(open);
        if (!open) setFreeSong("");}}>
        <DialogContent className="bg-gray-900 border-purple-800/30 text-white max-w-2xl overflow-y-auto max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Prenotazione Manuale</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-gray-300">Nome Utente</Label>
              <Input
                id="userName"
                placeholder="Inserisci il nome della persona..."
                value={manualBookingData.userName}
                onChange={(e) => setManualBookingData({ ...manualBookingData, userName: e.target.value })}
                className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
              />
            </div>

                        <div className="space-y-2">
              <Label className="text-gray-300">Scelta Canzone</Label>

              {manualBookingData.song ? (
                <div className="p-4 bg-purple-900/20 border border-purple-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Music className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-xs text-purple-400 font-medium">Brano Confermato</div>
                        <div className="font-medium text-white text-sm">{manualBookingData.song}</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setManualBookingData({ ...manualBookingData, song: "" })}
                      className="text-gray-400 hover:text-red-400 hover:bg-transparent"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : noCatalog ? (
                manualSongInput
              ) : (
                <Tabs defaultValue="catalog" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-purple-800/20 p-1">
                    <TabsTrigger value="catalog" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400 text-sm">
                      🔍 Cerca nel Catalogo
                    </TabsTrigger>
                    <TabsTrigger value="manual" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400 text-sm">
                      ✍️ Inserimento Libero
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="catalog" className="space-y-4 mt-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        id="songSearch"
                        placeholder="Digita titolo o artista..."
                        value={songSearch}
                        onChange={(e) => setSongSearch(e.target.value)}
                        className="pl-10 bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
                      />
                    </div>

                    {songSearch && (
                      <div className="max-h-52 overflow-y-auto space-y-2 border border-purple-800/20 rounded-lg p-2 bg-gray-950/40">
                        {searchLoading ? (
                          <div className="p-6 text-center">
                            <Loader2 className="w-5 h-5 animate-spin text-purple-400 mx-auto" />
                            <p className="text-gray-400 mt-2 text-xs">Cercando nel database...</p>
                          </div>
                        ) : (
                          searchResults.map((song, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setManualBookingData({ ...manualBookingData, song });
                                setSongSearch("");
                                setSearchResults([]);
                              }}
                              className="p-2.5 bg-gray-800/30 border border-purple-800/20 rounded-md hover:border-purple-500 cursor-pointer transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Music className="w-4 h-4 text-purple-400" />
                                <span className="text-gray-300 text-sm">{song}</span>
                              </div>
                            </div>
                          ))
                        )}
                        {searchResults.length === 0 && !searchLoading && (
                          <div className="p-6 text-center text-gray-500 text-xs">
                            Nessun brano trovato per "{songSearch}"
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="manual" className="mt-3">
                    {manualSongInput}
                  </TabsContent>
                </Tabs>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="key" className="text-gray-300">Tonalità</Label>
              <Select
                value={manualBookingData.key}
                onValueChange={(value) => setManualBookingData({ ...manualBookingData, key: value })}
              >
                <SelectTrigger className="bg-gray-800/50 border-purple-800/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-800/30">
                  {["+3", "+2", "+1", "0", "-1", "-2", "-3"].map((key) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-purple-900/30">
                      {key === "0" ? "Originale" : key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-gray-300">Note Speciali (Opzionale)</Label>
              <Input
                id="notes"
                placeholder="Es: Tavolo 5, Dedica a compleanno, Versione acustica..."
                value={manualBookingData.notes || ""}
                onChange={(e) => setManualBookingData({ ...manualBookingData, notes: e.target.value })}
                className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-purple-800/20">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowManualBooking(false);
                  setManualBookingData({ userName: "", song: "", key: "0", notes: "" });
                  setFreeSong("");
                  setSongSearch("");
                  setSearchResults([]);
                }}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                Annulla
              </Button>
              <Button
                onClick={handleManualBooking}
                //disabled={!manualBookingData.userName || !manualBookingData.song || submitting}
                disabled={!manualBookingData.userName || !effectiveSong || submitting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {submitting ? 'Creando...' : 'Conferma Prenotazione'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="space-y-3">
            {allVenueBookings.length === 0 ? (
              // CARD PER NESSUNA PRENOTAZIONE
              <div className="p-8 text-center">
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Nessuna prenotazione
                </h3>
                <p className="text-gray-400 mb-6">
                  Il locale <span className="font-semibold text-purple-400">{activeVenue?.name}</span> è attivo ma non ci sono ancora prenotazioni
                </p>
                <Button 
                  onClick={() => setShowManualBooking(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crea Prima Prenotazione
                </Button>
              </div>
            ) : (
              allVenueBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`relative overflow-hidden p-4 bg-gray-900/30 rounded-lg border transition-colors ${
                    booking.isFreeRequest ? "pt-7" : ""
                    } ${
                    booking.status === "pending" 
                      ? "border-yellow-700/50 hover:border-yellow-600/70" 
                      : "border-purple-800/20 hover:border-purple-600/50"
                  }`}
                >
                  {booking.isFreeRequest && (
                    <div className="absolute top-0 left-0 bg-pink-900/40 text-pink-300 text-[11px] font-medium px-2.5 py-0.5 rounded-br-lg border-b border-r border-pink-700/40">
                      ✍️ Richiesta libera
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-400">
                          {booking.userName[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-8 mb-1 flex-wrap">
                          <span className="font-medium text-white">{booking.userName}</span>
                          {getStatusBadge(booking.status)}
                          {booking.key && (
                            <Badge variant="outline" className="border-purple-700/50 text-purple-300">
                              Tonalità: {booking.key === "0" ? "Originale" : booking.key}
                            </Badge>
                          )}
                        </div>

                        <div className="text-sm text-gray-400 truncate">{booking.song}</div>
                        {booking.notes && (
                          <div className="mt-1.5 flex items-start gap-1.5 text-xs bg-purple-950/30 border border-purple-900/30 p-2 rounded md:max-w-[90%]">
                            <span className="text-purple-400 font-semibold select-none">Note:</span>
                            <p className="text-gray-400 italic break-words flex-1">{booking.notes}</p>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">{booking.time}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0 items-center">
                      {booking.status === "pending" && (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                          onClick={() => handleAccept(booking.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accetta
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                        onClick={() => handleReject(booking.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="border-purple-700/40 text-purple-300 hover:bg-purple-900/40 hover:text-white"
                        title="Copia titolo canzone"
                        onClick={() => {
                          const textToCopy = booking.song;
                          if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(textToCopy);
                          } else {
                            const textArea = document.createElement("textarea");
                            textArea.value = textToCopy;
                            textArea.style.position = "fixed";
                            textArea.style.opacity = "0";
                            document.body.appendChild(textArea);
                            textArea.focus();
                            textArea.select();
                            try { document.execCommand("copy"); } catch (err) {}
                            document.body.removeChild(textArea);
                          }
                          setCopiedId(booking.id);
                          setTimeout(() => setCopiedId((id) => (id === booking.id ? null : id)), 1500);
                        }}
                      >
                        {copiedId === booking.id
                          ? <Check className="w-4 h-4 mr-1.5" />
                          : <Copy className="w-4 h-4 mr-1.5" />}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>

      </Card>
    </div>
  );
}
