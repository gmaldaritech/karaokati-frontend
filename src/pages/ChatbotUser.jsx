import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic2, Send, Music, X, List, Shield, Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
// 🆕 Import del tuo apiClient esistente
import { apiClient } from '../api/apiClient';

export default function ChatbotUser() {
  const { sessionId } = useParams(); // 🆕 Ottieni sessionId dall'URL
  const navigate = useNavigate(); // 🆕 Per redirect a QRAccessDenied
  const [sessionData, setSessionData] = useState(null);
  const [isValidSession, setIsValidSession] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "🎤 Connessione in corso...",
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedKey, setSelectedKey] = useState("0");
  const [bookingUserName, setBookingUserName] = useState("");
  const [currentSongPage, setCurrentSongPage] = useState(1);
  const [showAllResultsDialog, setShowAllResultsDialog] = useState(false);
  const [allSearchResults, setAllSearchResults] = useState([]);
  const [searchInDialog, setSearchInDialog] = useState("");
  const [catalogSongs, setCatalogSongs] = useState([]); // 🆕 Catalogo dinamico dal backend
  const [bookingNotes, setBookingNotes] = useState("");

  const [catalogTotal, setCatalogTotal] = useState(null); // null = sconosciuto
  const [isFreeRequest, setIsFreeRequest] = useState(false);

  const noCatalog = catalogTotal === 0;
  const hasCatalog = catalogTotal !== null && catalogTotal > 0;
  const showFreeRequestLink = hasCatalog && sessionData?.dj?.allow_free_requests === true;
  
  const messagesEndRef = useRef(null);
  const songsPerPage = 8;
  const maxSongsInChat = 0;

  const validateSessionBeforeAction = async () => {
  try {
    const data = await apiClient.validateSession();
    console.log(data);
    
    if (!data.valid) {
      // ✅ MANTIENI: handleInvalidSession rimane uguale
      handleInvalidSession(data.message || data.error || "Sessione non valida");
      return false;
    }

    setSessionData(data);
    return data;
  } catch (error) {
    console.error("Errore validazione:", error);
    handleInvalidSession("connection_error");
    return false;
  }
};


  // 🆕 Validazione sessione e inizializzazione
  useEffect(() => {
    const validateSession = async () => {
      try {

        const data = await apiClient.validateSession();
        
        if (data.valid) {
          setSessionData(data);
          setIsValidSession(true);
          
          const total = await loadDJCatalog(data.dj.qr_code_id);
          await loadUserBookings();

          const intro = `🎤 Ciao! Benvenuto da ${data.dj.stage_name}!\n📍 ${data.active_venue.name}\n\n`;
          const welcomeText = total === 0
            ? `${intro}Qui non c'è un catalogo da sfogliare, quindi scegli tu!\n\nScrivi il titolo e l'artista della canzone che vuoi cantare e la invieremo al DJ.`
            : `${intro}Sono qui per aiutarti a prenotare la tua canzone preferita.\n\nCerca una canzone scrivendo il titolo o il nome dell'artista!`;

          setMessages([{
            id: 1,
            type: "bot",
            text: welcomeText,
            timestamp: new Date()
          }]);
          
          await loadDJCatalog(data.dj.qr_code_id);
          await loadUserBookings();
          
          document.title = `Karaoke ${data.dj.stage_name} - ${data.active_venue.name}`;
        } else {
          handleInvalidSession(data.error || data.message || "Sessione non valida");
        }
      } catch (error) {
        console.error("Errore validazione sessione:", error);
        handleInvalidSession("connection_error");
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [sessionId]);


  // Carica catalogo pubblico DJ
  const loadDJCatalog = async (qrCodeId) => {
    try {
      // 🆕 Carica solo le prime 10 canzoni o nessuna
            const data = await apiClient.getPublicCatalog(qrCodeId, { limit: 10 });
      const total = data.total || 0;
      setCatalogTotal(total);
      setCatalogSongs([]); // 🆕 Lascia vuoto, useremo ricerca server-side
      console.log(`Catalogo disponibile: ${total} canzoni totali`);
      return total;
    } catch (error) {
      console.error("Errore catalogo:", error);
      toast.error("Errore nel caricamento del catalogo");
      return null;
    }
  };

  // Carica prenotazioni utente
  const loadUserBookings = async () => {
    try {
      const data = await apiClient.getUserBookings();
      setUserBookings(data.bookings || []);
    } catch (error) {
      console.error("Errore prenotazioni:", error);
    }
  };

  // 🆕 REDIRECT a QRAccessDenied invece di messaggi in chat
  const handleInvalidSession = (errorMessage) => {
    console.log("🚨 Sessione invalida:", errorMessage);
    
    let errorType = "qr_expired";
    
    if (errorMessage === "no_session" || errorMessage.includes("Sessione non trovata")) {
      errorType = "qr_expired";
    } else if (errorMessage === "session_expired" || errorMessage.includes("scaduta")) {
      errorType = "qr_expired";
    } else if (errorMessage === "venue_inactive" || errorMessage.includes("locale non è più attivo")) {
      errorType = "no_active_venue";
    } else if (errorMessage.includes("connessione") || errorMessage === "connection_error") {
      errorType = "connection_error";
    }
    
    const qrCode = sessionData?.dj?.qr_code_id || "unknown";
    
    // 🎯 REDIRECT invece di mostrare messaggi in chat
    navigate(`/qr-error/${errorType}/${qrCode}`);
  };

  // Prenota canzone
  const bookSong = async (userName, songName, key, notes, isFree = false) => {
    try {
      const sessionValid = await validateSessionBeforeAction();
      if (!sessionValid) return false;

      const result = await apiClient.createUserBooking({
        user_name: userName,
        song: songName,
        key: key,
        notes: notes?.trim() || "",
        is_free_request: isFree
      });
      
      await loadUserBookings();
      
      addMessage(
        "bot",
        `✅ Prenotazione ricevuta!\n\n🎵 **${songName}**\n👤 Cantante: ${userName}\n🎹 Tonalità: ${key === "0" ? "Originale" : key}` +
        (result.max_bookings !== 999
          ? `\n\n📋 Slot rimanenti: ${result.remaining_bookings || 0}`
          : ``)
      );

      toast.success("Prenotazione inviata con successo!");
      return true;
    } catch (error) {
      console.error("Errore prenotazione:", error);
      
      if (error.message.includes('429') || error.message.includes('Limite prenotazioni raggiunto')) {
        addMessage("bot", "⚠️ Hai raggiunto il limite di prenotazioni per sessione!\n\nPer prenotare un'altra canzone, clicca sul pulsante dal pulsante 'Le mie prenotazioni' e cancella una delle tue prenotazioni ancora in attesa: quelle già accettate dal DJ non si possono più annullare.");
        toast.error("Limite prenotazioni raggiunto ");
      } else if (error.message.includes('404') || error.message.includes('non trovata')) {
        addMessage("bot", "❌ Canzone non trovata nel catalogo del DJ.\n\nProva a cercare un'altra canzone!");
        toast.error("Canzone non disponibile");
      } else {
        addMessage("bot", `❌ Errore nella prenotazione: ${error.message}`);
        toast.error("Errore nella prenotazione");
      }
      return false;
    }
  };

  // Cancella prenotazione utente
  const cancelBooking = async (bookingId) => {
    try {
      const sessionValid = await validateSessionBeforeAction();
      if (!sessionValid) return false;

      await apiClient.deleteUserBooking(bookingId);
      await loadUserBookings();
      
      addMessage("bot", "✅ Prenotazione cancellata con successo!");
      toast.success("Prenotazione cancellata");
      return true;
    } catch (error) {
      console.error("Errore cancellazione:", error);
      addMessage("bot", `❌ Impossibile cancellare: ${error.message}`);
      toast.error("Errore cancellazione");
      return false;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type, text, data = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      data,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

const showMyBookings = async () => {
  addMessage("user", "📋 Le mie prenotazioni");
  
  const sessionValid = await validateSessionBeforeAction();
  if (!sessionValid) return;
  
  try {
    const data = await apiClient.getUserBookings();
    const currentBookings = data.bookings || [];
    
    setUserBookings(currentBookings);
    
    setTimeout(() => {
      if (currentBookings.length === 0) {
        addMessage("bot", "📋 Non hai ancora nessuna prenotazione.\n\nCerca una canzone per iniziare!");
      } else {
        // ✅ Usa currentBookings.length invece di userBookings.length
        addMessage("bot", `📋 Ecco le tue prenotazioni:`, {
          type: "bookingsList"
        });
      }
    }, 300);
    
  } catch (error) {
    console.error("Errore caricamento prenotazioni:", error);
    addMessage("bot", "❌ Errore nel caricamento delle prenotazioni. Riprova!");
  }
};

  const showHelp = () => {
    addMessage("user", "❓ Aiuto");
    setTimeout(() => {
      const helpText = noCatalog
        ? `🤖 Ecco cosa posso fare per te:\n\n🎤 Scrivi il titolo e l'artista della canzone che vuoi cantare\n📝 Compila i dati e invia la richiesta al DJ\n📋 Usa il pulsante "Le mie prenotazioni" per vedere le tue richieste\n❌ Cancella una richiesta dalla lista\n\nScrivi la tua canzone per iniziare!`
        : `🤖 Ecco cosa posso fare per te:\n\n✨ Cerca canzoni scrivendo il titolo o l'artista\n🎵 Prenota una canzone cliccandoci sopra\n` +
          (showFreeRequestLink
            ? `🎤 Se non la trovi, usa "Fai una richiesta al DJ" sotto i risultati\n`
            : ``) +
          `📋 Usa il pulsante "Le mie prenotazioni" per vedere le tue richieste\n❌ Cancella una prenotazione dalla lista\n\nProva a cercare una canzone ora!`;

      addMessage("bot", helpText);
    }, 300);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const freshSession = await validateSessionBeforeAction();
    if (!freshSession) return;

    // Valore aggiornato: il DJ potrebbe aver cambiato l'impostazione dopo l'apertura della chat
    const freeLinkNow = hasCatalog && freshSession.dj?.allow_free_requests === true;

    const searchTerm = inputValue;
    setInputValue("");

    addMessage("user", searchTerm);
    console.log("FREE LINK DEBUG", {
      catalogTotal,
      allow: sessionData?.dj?.allow_free_requests,
      freeLinkNow
    });

    // DJ senza catalogo: apri subito il form con il testo precompilato
    if (noCatalog) {
      setTimeout(() => {
        handleFreeRequest(searchTerm.trim());
        addMessage("bot", "🎤 Scrivi qui sotto la canzone che vuoi cantare e invia la tua richiesta!");
      }, 300);
      return;
    }

    setTimeout(async () => {
      try {
        const data = await apiClient.getPublicCatalog(
          sessionData.dj.qr_code_id,
          { search: searchTerm.trim(), limit: 1000 }
        );

        const searchResults = data.songs || [];

        if (searchResults.length === 0) {
          addMessage("bot", `🔍 Non ho trovato canzoni con "${searchTerm}" o simili.\n\nProva con:\n• Un altro titolo\n• Nome dell'artista\n• Parole chiave diverse\n\n💡 Usa "aiuto" per vedere cosa posso fare!`, {
            type: "songList",
            songs: [],
            hasMore: false,
            totalCount: 0,
            showFreeRequest: freeLinkNow,
            searchTerm: searchTerm.trim()
          });
        } else {
          const displaySongs = searchResults.slice(0, maxSongsInChat);
          const hasMore = searchResults.length > maxSongsInChat;

          addMessage("bot", `🎵 Trovate ${searchResults.length} canzoni con "${searchTerm}" o simili:`, {
            type: "songList",
            songs: displaySongs,
            hasMore: hasMore,
            totalCount: searchResults.length,
            showFreeRequest: freeLinkNow,
            searchTerm: searchTerm.trim()
          });

          if (hasMore) {
            setAllSearchResults(searchResults);
          }
        }
      } catch (error) {
        console.error("Errore ricerca:", error);
        addMessage("bot", "❌ Errore nella ricerca. Riprova!");
      }
    }, 300);
  };

  const handleSongClick = (song) => {
    setIsFreeRequest(false);
    setSelectedSong(song);
    setShowKeyDialog(true);
  };

  const handleFreeRequest = (term = "") => {
    setIsFreeRequest(true);
    setSelectedSong(term);
    setBookingUserName("");
    setShowKeyDialog(true);
  };

  const confirmBooking = async () => {
    if (!bookingUserName.trim()) return;
    if (isFreeRequest && !selectedSong?.trim()) return;

    const songName = isFreeRequest ? selectedSong.trim() : selectedSong;
    const success = await bookSong(bookingUserName.trim(), songName, selectedKey, bookingNotes, isFreeRequest);

    if (success) {
      setShowKeyDialog(false);
      setSelectedSong(null);
      setSelectedKey("0");
      setBookingUserName("");
      setBookingNotes("");
      setIsFreeRequest(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    await cancelBooking(bookingId);
  };

  const renderMessage = (message) => {
    if (message.type === "user") {
      return (
        <div className="flex justify-end mb-4" key={message.id}>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%]">
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-start mb-4" key={message.id}>
        <div className="flex gap-3 max-w-[90%]">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Mic2 className="w-5 h-5 text-white" />
            <img 
                  src="/logo_circle.png" 
                  alt="Logo" 
                  className="w-10 h-10" 
            />
          </div>
          <div className="flex-1">
            <div className="bg-gray-800 border border-purple-800/30 rounded-2xl rounded-tl-sm px-5 py-3">
              <p className="text-sm leading-relaxed whitespace-pre-line text-gray-200">{message.text}</p>
            </div>
            
            {message.data?.type === "songList" && (
              <SongList 
                songs={message.data.songs} 
                onSongClick={handleSongClick}
                hasMore={message.data.hasMore}
                totalCount={message.data.totalCount}
                showFreeRequest={message.data.showFreeRequest}
                searchTerm={message.data.searchTerm}
                onFreeRequest={handleFreeRequest}
              />
            )}

            {message.data?.type === "bookingsList" && (
              <BookingsList bookings={userBookings} onCancel={handleCancelBooking} />
            )}
          </div>
        </div>
      </div>
    );
  };

  const SongList = ({ songs, onSongClick, hasMore, totalCount, showFreeRequest, searchTerm, onFreeRequest }) => {
    return (
      <div className="mt-3 space-y-2">
        <div className="grid grid-cols-1 gap-2">
          {songs.map((song, idx) => (
            <button
              key={idx}
              onClick={() => onSongClick(song)}
              className="bg-gray-800/80 border border-purple-700/30 rounded-xl p-3 hover:border-purple-500/70 hover:bg-gray-800 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 shrink-0 bg-purple-900/50 border border-purple-700/50 rounded-lg flex items-center justify-center group-hover:bg-purple-800/50 transition-colors">
                  <Music className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-gray-200 text-sm flex-1 min-w-0 break-words group-hover:text-white transition-colors">{song}</div>
                <div className="hidden md:block shrink-0 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Clicca per prenotare
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {hasMore && (
          <button
            onClick={() => setShowAllResultsDialog(true)}
            className="w-full bg-purple-900/30 border border-purple-700/50 rounded-xl p-3 hover:border-purple-500/70 hover:bg-purple-900/50 transition-all text-center"
          >
            <div className="text-purple-300 text-sm font-medium">
              🔍 Vedi tutti i {totalCount} risultati
            </div>
          </button>
        )}

        {showFreeRequest && (
          <button
            onClick={() => onFreeRequest("")}
            className="w-full bg-gray-800/60 border border-pink-700/40 rounded-xl p-3 hover:border-pink-500/70 hover:bg-gray-800 transition-all text-center"
          >
            <div className="text-sm text-gray-300">
              Non hai trovato quello che cercavi?{" "}
              <span className="text-pink-400 font-medium block mt-1">Fai una richiesta al DJ</span>
            </div>
          </button>
        )}
      </div>
    );
  };

  const BookingsList = ({ bookings, onCancel }) => {
    return (
      <div className="mt-3 space-y-2">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-purple-900/20 border border-purple-700/50 rounded-xl p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Music className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-200 break-words">{booking.song}</div>
                  <div className="text-xs text-purple-300 mt-1">👤 {booking.user_name}</div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge className={`text-xs ${
                      booking.status === "pending" ? "bg-yellow-900/50 text-yellow-300 border-yellow-700/50" :
                      booking.status === "accepted" ? "bg-green-900/50 text-green-300 border-green-700/50" :
                      "bg-red-900/50 text-red-300 border-red-700/50"
                    }`}>
                      {booking.status === "pending" ? "In attesa" : 
                       booking.status === "accepted" ? "✅ Accettata" : "❌ Rifiutata"}
                    </Badge>
                    <Badge variant="outline" className="border-purple-700/50 text-purple-300 text-xs">
                      {booking.key === "0" ? "Tonalità: Originale" : `Tonalità: ${booking.key}`}
                    </Badge>
                  </div>
                  {booking.created_at && (
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(/[zZ]$|[+-]\d{2}:?\d{2}$/.test(booking.created_at) ? booking.created_at : booking.created_at + 'Z').toLocaleTimeString('it-IT', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  )}
                </div>
              </div>
              {booking.can_delete !== false && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:bg-red-900/30 h-8 w-8 p-0 flex-shrink-0"
                  onClick={() => onCancel(booking.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const filteredDialogSongs = allSearchResults.filter(song =>
    song.toLowerCase().includes(searchInDialog.toLowerCase())
  );

  // Se la sessione non è valida, non renderizzare (redirect in corso)
  if (!isValidSession && !loading) {
    return null;
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <Card className="bg-gray-800/50 backdrop-blur-sm border-purple-800/30 p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Mic2 className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">Connessione in corso...</h1>
          
          <div className="flex items-center justify-center gap-3 text-purple-300">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Validazione sessione</span>
          </div>
          
          <div className="mt-6 space-y-2">
            <div className="text-sm text-gray-400">Session ID: {sessionId?.substring(0, 8)}...</div>
            <div className="text-xs text-gray-500">Caricamento dati DJ e catalogo</div>
          </div>
        </Card>
      </div>
    );
  }

  // 🎤 LAYOUT ORIGINALE (primo allegato)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        
        {/* All Results Dialog */}
        <Dialog open={showAllResultsDialog} onOpenChange={setShowAllResultsDialog}>
                    <DialogContent className="bg-gray-900 border-purple-800/30 text-white w-[calc(100%-2rem)] max-w-2xl max-h-[80vh] overflow-hidden [&>*]:min-w-0 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">
                🔍 {allSearchResults.length} canzoni trovate
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Filtra i risultati..."
                value={searchInDialog}
                onChange={(e) => setSearchInDialog(e.target.value)}
                className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
              />
              <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-2">
                {filteredDialogSongs.map((song, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleSongClick(song);
                      setShowAllResultsDialog(false);
                      setSearchInDialog("");
                    }}
                    className="w-full bg-gray-800/80 border border-purple-700/30 rounded-xl p-3 hover:border-purple-500/70 hover:bg-gray-800 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 shrink-0 bg-purple-900/50 border border-purple-700/50 rounded-lg flex items-center justify-center group-hover:bg-purple-800/50 transition-colors">
                        <Music className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="text-gray-200 text-sm flex-1 min-w-0 break-words group-hover:text-white transition-colors">{song}</div>
                    </div>
                  </button>
                ))}
                {filteredDialogSongs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Nessuna canzone trovata con questo filtro
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showKeyDialog} onOpenChange={setShowKeyDialog}>
          <DialogContent className="bg-gray-900 border-purple-800/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {isFreeRequest ? "🎤 Richiedi una canzone al DJ" : "🎵 Prenota questa canzone"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {isFreeRequest ? (
                <div className="space-y-2">
                  <Label htmlFor="freeSong" className="text-gray-300">Canzone richiesta *</Label>
                  <Input
                    id="freeSong"
                    maxLength={200}
                    placeholder="Artista - Titolo"
                    value={selectedSong || ""}
                    onChange={(e) => setSelectedSong(e.target.value)}
                    className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
                  />
                  <p className="text-xs text-gray-500">
                    💡 Questa è una richiesta libera: il DJ potrebbe non avere la base della canzone, quindi non è garantito che venga accettata
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-purple-900/30 border border-purple-700/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Music className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400 mb-1">Canzone Selezionata</div>
                      <div className="font-medium text-white text-sm break-words">{selectedSong}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="userName" className="text-gray-300">Nome Utente *</Label>
                <Input
                  id="userName"
                  placeholder="Chi canterà questa canzone?"
                  value={bookingUserName}
                  onChange={(e) => setBookingUserName(e.target.value)}
                  className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="key" className="text-gray-300">Scegli la tonalità</Label>
                <Select value={selectedKey} onValueChange={setSelectedKey}>
                  <SelectTrigger className="bg-gray-800/50 border-purple-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-800/30">
                    {["+3", "+2", "+1", "0", "-1", "-2", "-3"].map((key) => (
                      <SelectItem key={key} value={key} className="text-white hover:bg-purple-900/30">
                        {key === "0" ? "🎹 Originale (Consigliato)" : `🎹 ${key}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  💡 Se non sei sicuro, lascia "Originale"
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-300">Note per il DJ (opzionale)</Label>
                <Input
                  id="notes"
                  maxLength={500}
                  placeholder="Es: Tavolo 5, dedica per un compleanno..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowKeyDialog(false);
                    setSelectedSong(null);
                    setSelectedKey("0");
                    setBookingUserName("");
                    setBookingNotes("");
                    setIsFreeRequest(false);
                  }}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                >
                  Annulla
                </Button>
                <Button
                  onClick={confirmBooking}
                  disabled={!bookingUserName.trim() || (isFreeRequest && !selectedSong?.trim())}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  ✅ Conferma Prenotazione
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Header */}
        <Card className="mb-4 border-purple-800/30 bg-gray-800/50 backdrop-blur-sm shadow-xl">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                {/* <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Mic2 className="w-6 h-6" />
                </div> */}
                <img 
                  src="/logo_circle.png" 
                  alt="Logo" 
                  className="w-12 h-12" 
                />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">Karaokati Assistant</h1>
                  <p className="text-purple-100 text-xs md:text-sm">
                    {sessionData ? 
                      `${sessionData.active_venue.name} • Serata avviata 🎤` : 
                      "Connessione in corso..."
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={showMyBookings}
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-none"
              >
                <List className="w-4 h-4 mr-2" />
                Le mie prenotazioni
                {userBookings.length > 0 && (
                  <Badge className="ml-2 bg-yellow-500 text-gray-900 hover:bg-yellow-500">
                    {userBookings.length}
                  </Badge>
                )}
              </Button>
              <Button
                onClick={showHelp}
                size="sm"
                variant="ghost"
                className="bg-white/10 hover:bg-white/20 text-white border-none"
              >
                ❓ Aiuto
              </Button>
            </div>
          </div>
        </Card>

        {/* Chat Container */}
        <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm shadow-xl">
          <div className="h-[500px] overflow-y-auto p-6 bg-gray-900/50">
            {messages.map((message) => renderMessage(message))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-purple-800/30 p-4 bg-gray-900/50 rounded-b-xl">
            <div className="flex gap-3">
              
              <span className="text-2xl select-none">👉</span>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Scrivi canzone o l'artista..."
                className="w-full bg-gray-950 text-white placeholder:text-gray-400 border-none focus-visible:ring-1 focus-visible:ring-pink-500/50 focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={!inputValue.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="text-center mt-4 text-sm text-gray-400">
          <p>Powered by Karaokati • Nessuna registrazione richiesta 🎵</p>
        </div>
      </div>
    </div>
  );
}