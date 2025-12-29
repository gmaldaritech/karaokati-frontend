//import React, { useState, useEffect } from "react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Music, Plus, Search, X, ChevronLeft, ChevronRight, MapPin, Trash2, Download, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
// import { toast } from "@/components/ui/use-toast";
import { apiClient } from "@/api/apiClient";
import { toast } from "sonner";

export default function BookingsSection() {
  const [activeVenue, setActiveVenue] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showManualBooking, setShowManualBooking] = useState(false);
  const [manualBookingData, setManualBookingData] = useState({
    userName: "",
    song: "",
    key: "0"
  });

  const [songSearch, setSongSearch] = useState("");
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  // 🆕 Nuovi stati per ricerca ottimizzata
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

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
          venue: booking.venue_name,
          sessionId: booking.session_id
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

// 🆕 AGGIUNGI questo useEffect dopo quelli esistenti (circa riga 75)
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
      // toast({
      //   title: "Errore",
      //   description: "Impossibile caricare i dati",
      //   variant: "destructive",
      // });
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
        venue: booking.venue_name,
        sessionId: booking.session_id
      }));

      setBookings(transformedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      // toast({
      //   title: "Errore",
      //   description: "Impossibile caricare le prenotazioni",
      //   variant: "destructive",
      // });
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
      // toast({
      //   title: "Successo",
      //   description: "Prenotazione accettata",
      // });
    } catch (error) {
      console.error('Error accepting booking:', error);
      // toast({
      //   title: "Errore",
      //   description: error.message || "Impossibile accettare la prenotazione",
      //   variant: "destructive",
      // });
      toast.error("Impossibile accettare la prenotazione");
    }
  };

  const handleReject = async (id) => {
    try {
      await apiClient.deleteBooking(id);
      setBookings(bookings.filter(b => b.id !== id));
      // toast({
      //   title: "Successo",
      //   description: "Prenotazione eliminata",
      // });
      toast.success("Prenotazione eliminata")
    } catch (error) {
      console.error('Error rejecting booking:', error);
      // toast({
      //   title: "Errore",
      //   description: error.message || "Impossibile eliminare la prenotazione",
      //   variant: "destructive",
      // });
      toast.error("Impossibile eliminare la prenotazione");
    }
  };

  const handleDeleteAllForVenue = async () => {
    try {
      await apiClient.deleteVenueBookings(activeVenue.id);
      setBookings([]);
      setShowDeleteAllDialog(false);
      // toast({
      //   title: "Successo",
      //   description: "Tutte le prenotazioni eliminate",
      // });
      toast.success("Tutte le prenotazioni sono state eliminate");
    } catch (error) {
      console.error('Error deleting all bookings:', error);
      // toast({
      //   title: "Errore",
      //   description: error.message || "Impossibile eliminare le prenotazioni",
      //   variant: "destructive",
      // });
      toast.error("Impossibile eliminare le prenotazioni");
    }
  };

  const handleManualBooking = async () => {
    if (!manualBookingData.userName || !manualBookingData.song) {
      return;
    }

    try {
      setSubmitting(true);
      const newBooking = await apiClient.createBooking({
        user_name: manualBookingData.userName,
        song: manualBookingData.song,
        key: manualBookingData.key,
        venue_id: activeVenue.id
      });

      // Add to local state
      const transformedBooking = {
        id: newBooking.id,
        userName: newBooking.user_name,
        song: newBooking.song,
        time: "Ora",
        status: newBooking.status,
        key: newBooking.key,
        venue: activeVenue.name,
        sessionId: null
      };

      setBookings([...bookings, transformedBooking]);
      setManualBookingData({ userName: "", song: "", key: "0" });
      setShowManualBooking(false);
      setSongSearch("");
      setSearchResults([]);

      // toast({
      //   title: "Successo",
      //   description: "Prenotazione manuale creata",
      // });
    } catch (error) {
      console.error('Error creating manual booking:', error);
      // toast({
      //   title: "Errore",
      //   description: error.message || "Impossibile creare la prenotazione",
      //   variant: "destructive",
      // });
      toast.error("Impossibile creare la prenotazione");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadBookings = () => {
    const acceptedBookings = allVenueBookings.filter(b => b.status === "accepted");
    const csvContent = "Nome,Canzone,Tonalità,Orario\n" + 
      acceptedBookings.map(b => 
        `"${b.userName}","${b.song}","${b.key === "0" ? "Originale" : b.key}","${b.time}"`
      ).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `prenotazioni_${activeVenue.name.replace(/\s+/g, "_")}_${new Date().toLocaleDateString("it-IT").replace(/\//g, "-")}.csv`;
    link.click();
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
    const timeA = a.time === "Ora" ? 0 : parseInt(a.time);
    const timeB = b.time === "Ora" ? 0 : parseInt(b.time);
    return timeB - timeA;
  });

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
              Nessuna serata attivata
            </h3>
            <p className="text-gray-400">
              Attiva un locale per vedere le prenotazioni ad esso associate
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
        <div className="flex gap-3">
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
      <Dialog open={showManualBooking} onOpenChange={setShowManualBooking}>
        <DialogContent className="bg-gray-900 border-purple-800/30 text-white max-w-2xl overflow-y-auto max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Prenotazione Manuale</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-gray-300">Nome Utente</Label>
              <Input
                id="userName"
                placeholder="Inserisci il nome..."
                value={manualBookingData.userName}
                onChange={(e) => setManualBookingData({ ...manualBookingData, userName: e.target.value })}
                className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="songSearch" className="text-gray-300">Cerca Canzone</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="songSearch"
                  placeholder="Cerca nel catalogo..."
                  value={songSearch}
                  onChange={(e) => setSongSearch(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* 🆕 Ricerca ottimizzata con API real-time */}
            {songSearch && (
              <div className="space-y-2">
                <Label className="text-gray-300">Seleziona Canzone</Label>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {searchLoading ? (
                    <div className="p-8 text-center">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400 mx-auto" />
                      <p className="text-gray-400 mt-2">Cercando...</p>
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
                        className="p-3 bg-gray-800/50 border border-purple-800/30 rounded-lg hover:border-purple-600/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Music className="w-5 h-5 text-purple-400" />
                          <span className="text-gray-300 text-sm">{song}</span>
                        </div>
                      </div>
                    ))
                  )}
                  {searchResults.length === 0 && songSearch && !searchLoading && (
                    <div className="p-8 text-center text-gray-500">
                      Nessuna canzone trovata per "{songSearch}"
                    </div>
                  )}
                </div>
              </div>
            )}

            {manualBookingData.song && !songSearch && (
              <div className="p-4 bg-purple-900/30 border border-purple-700/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">Canzone Selezionata</div>
                      <div className="font-medium text-white text-sm">{manualBookingData.song}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setManualBookingData({ ...manualBookingData, song: "" })}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

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

            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowManualBooking(false);
                  setManualBookingData({ userName: "", song: "", key: "0" });
                  setSongSearch("");
                  setSearchResults([]);
                }}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                Annulla
              </Button>
              <Button
                onClick={handleManualBooking}
                disabled={!manualBookingData.userName || !manualBookingData.song || submitting}
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
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Tutte le Prenotazioni</CardTitle>
            {allVenueBookings.filter(b => b.status === "accepted" || b.status === "pending").length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDownloadBookings}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30"
              >
                <Download className="w-4 h-4 mr-2" />
                Scarica Prenotazioni
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allVenueBookings.length === 0 ? (
              // 🆕 CARD PER NESSUNA PRENOTAZIONE
              <div className="p-8 text-center">
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Nessuna prenotazione ancora
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
                className={`p-4 bg-gray-900/30 rounded-lg border transition-colors ${
                  booking.status === "pending" 
                    ? "border-yellow-700/50 hover:border-yellow-600/70" 
                    : "border-purple-800/20 hover:border-purple-600/50"
                }`}
              >
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
                      <div className="text-xs text-gray-500 mt-1">{booking.time}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
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
