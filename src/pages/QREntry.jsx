import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mic2, Shield, AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from '../api/apiClient';

export default function QREntry() {
  const { qrCodeId } = useParams();
  const navigate = useNavigate();
  const [djInfo, setDjInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [routingDecision, setRoutingDecision] = useState(null);

  // 🆕 SMART ROUTING: Logica di decisione basata sullo stato
  useEffect(() => {
    const determineUserRoute = async () => {
      try {
        // STEP 1: Verifica se esiste già una sessione valida
        const existingSessionValid = await checkExistingSession();
        if (existingSessionValid) {
          console.log("🎯 Sessione esistente valida → Redirect diretto a ChatbotUser");
          setRoutingDecision("redirect_to_chat");
          return;
        }

        // STEP 2: Verifica stato DJ e venue (senza creare sessione)
        const djStatus = await validateDJStatus();
        if (!djStatus.valid) {
          console.log("❌ DJ/Venue non valido → Mostra pagina errore");
          setRoutingDecision("show_error");
          setError(djStatus.error);
          return;
        }

        // STEP 3: Prima volta o sessione scaduta → Mostra welcome
        console.log("🎤 Prima volta o sessione scaduta → Mostra welcome");
        setRoutingDecision("show_welcome");
        setDjInfo(djStatus.data);
        
      } catch (err) {
        console.error("🚨 Errore durante routing decision:", err);
        setError("Errore di connessione al server");
        setRoutingDecision("show_error");
      } finally {
        setLoading(false);
      }
    };

    if (qrCodeId) {
      determineUserRoute();
    } else {
      setError('QR Code mancante nell\'URL');
      setLoading(false);
    }
  }, [qrCodeId]);

  // 🔍 STEP 1: Controlla se esiste sessione valida
  const checkExistingSession = async () => {
    try {
      const sessionData = await apiClient.validateSession();
      
      if (sessionData.valid && 
          sessionData.dj?.qr_code_id === qrCodeId && 
          sessionData.active_venue) {
        
        // Sessione valida per questo DJ e venue attivo
        const sessionId = sessionData.session_id;
        setTimeout(() => navigate(`/chat/${sessionId}`), 100);
        return true;
      }
      
      return false;
    } catch (error) {
      // Nessuna sessione valida (normale per prima volta)
      console.log("🔍 Nessuna sessione esistente valida");
      return false;
    }
  };

  // 🆕 STEP 2: Valida stato DJ usando apiClient
  const validateDJStatus = async () => {
    try {
      const data = await apiClient.handleQRFlow(qrCodeId);
      
      if (data.action === "welcome") {
        return { 
          valid: true, 
          data: {
            stage_name: data.data.dj.stage_name,
            qr_code_id: data.data.dj.qr_code_id,
            venue_name: data.data.active_venue.name,
            venue_address: data.data.active_venue.address
          }
        };
      } else if (data.action === "redirect") {
        // Sessione esistente valida
        setTimeout(() => navigate(`/chat/${data.session_id}`), 100);
        return { valid: true, redirect: true };
      } else {
        // Error case
        return { valid: false, error: data.error_type || "dj_error" };
      }
    } catch (error) {
      console.error("Errore validazione DJ:", error);
      return { valid: false, error: "connection_error" };
    }
  };

  // 🎯 DECISIONE ROUTING: Redirect automatici
  useEffect(() => {
    if (routingDecision === "redirect_to_chat") {
      // Già gestito in checkExistingSession
      return;
    } else if (routingDecision === "show_error") {
      // 🆕 Redirect alla pagina errore unificata
      let errorType = "qr_expired"; // default
      
      if (error === "no_active_venue") {
        errorType = "no_active_venue";
      } else if (error === "qr_not_found") {
        errorType = "qr_not_found";
      } else if (error === "connection_error") {
        errorType = "connection_error";
      }
      
      navigate(`/qr-error/${errorType}/${qrCodeId}`);
    }
    // Se è "show_welcome" → mostra il componente welcome (non redirect)
  }, [routingDecision, error, navigate, qrCodeId]);

  const handleAccept = async () => {
    console.log("🎵 handleAccept INIZIATO!");
    setSubmitting(true);
    
    try {
      const result = await apiClient.createSession(qrCodeId);
      
      console.log("✅ Sessione creata con ID:", result.session_id);
      
      // 🆕 PULISCI LA HISTORY - il browser "dimentica" da dove è arrivato
      window.history.replaceState(null, '', `/chat/${result.session_id}`);
      window.location.href = `/chat/${result.session_id}`;
      
    } catch (err) {
      console.error("💥 ERRORE in handleAccept:", err);
      setError(err.message || 'Errore durante l\'accettazione');
    } finally {
      setSubmitting(false);
    }
  };

  // 🔄 LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <Card className="bg-gray-800/50 backdrop-blur-sm border-purple-800/30 p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Mic2 className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">Verifica QR Code</h1>
          
          <div className="flex items-center justify-center gap-3 text-purple-300">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Validazione in corso...</span>
          </div>
          
          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <div>🔍 Controllo sessione esistente...</div>
            <div>🎤 Verifica stato DJ e venue...</div>
            <div>🎯 Decisione routing intelligente...</div>
          </div>
        </Card>
      </div>
    );
  }

  // 🚨 ERRORE TEMPORANEO (solo se routing decision fallisce)
  if (routingDecision === "show_error" && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-4">
        <Card className="bg-gray-800/50 backdrop-blur-sm border-red-800/30 p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">Redirect in corso...</h1>
          
          <p className="text-gray-300 mb-6">Reindirizzamento alla pagina errore appropriata...</p>
        </Card>
      </div>
    );
  }

  // 🎤 WELCOME PAGE (solo se routing decision è "show_welcome")
  if (routingDecision !== "show_welcome") {
    return null; // Non renderizzare nulla se non è welcome
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-purple-800/30 text-white max-w-lg w-full">
        <div className="text-center space-y-6 p-8">
          <div className="flex items-center gap-3 mb-6 justify-center">
                <img 
                  src="/logo.png"
                  alt="Karaokati" 
                  className="h-10 w-auto"
                />
          </div>
          
          {/* Titolo dinamico */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Benvenuto!</h1>
            <h2 className="text-xl text-purple-300 mb-2">
              Karaoke con {djInfo?.stage_name || 'DJ'}
            </h2>
            {djInfo?.venue_name && (
              <h3 className="text-lg text-pink-300 mb-4">
                📍{djInfo.venue_name}
              </h3>
            )}
            <p className="text-gray-300">
              Stai per accedere alla piattaforma digitale per prenotazioni karaoke.
            </p>
            <p className="text-purple-300 mt-2 font-medium">
              La tua sessione sarà valida per 6 ore.
            </p>
          </div>

          {/* Info QR */}
          <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-4 text-left">
            <div className="flex items-center gap-3 mb-3">
              <Mic2 className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-purple-300">Dettagli Sessione</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">DJ:</span>
                <span className="text-white">{djInfo?.stage_name || 'Caricamento...'}</span>
              </div>
              {djInfo?.venue_name && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Locale:</span>
                  <span className="text-white">{djInfo.venue_name}</span>
                </div>
              )}
              {djInfo?.venue_address && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Indirizzo:</span>
                  <span className="text-gray-300 text-xs">{djInfo.venue_address}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Durata:</span>
                <span className="text-green-300">6 ore</span>
              </div>
            </div>
          </div>

          {/* Informativa Privacy */}
          <div className="bg-gray-800/80 border border-purple-700/30 rounded-xl p-4 text-left">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-300 mb-2">Informativa Privacy</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Il sistema utilizza un cookie tecnico per l'identificazione della sessione utente. 
                  Non vengono effettuati tracciamenti comportamentali o profilazione commerciale. 
                  Il trattamento è effettuato ai sensi dell'Art. 6, lett. f) del GDPR per interesse legittimo.
                  Il cookie scadrà automaticamente con la sessione.
                </p>
              </div>
            </div>
          </div>

          {/* Pulsante Accettazione */}
          <Button
            onClick={handleAccept}
            disabled={submitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 text-lg disabled:opacity-50"
          >
            {submitting ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creazione sessione...</span>
              </div>
            ) : (
              "🎤 Accetta e Inizia Sessione"
            )}
          </Button>

          {/* Footer */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>Powered by Karaokati</p>
            <p>Nessuna registrazione richiesta</p>
          </div>
        </div>
      </Card>
    </div>
  );
}