import React from "react";
import { useParams } from "react-router-dom";
import { Clock, Mic2, MapPin, XCircle, RefreshCw, AlertTriangle, Wifi } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QRAccessDenied() {
  const { type, qrCodeId } = useParams();
  
  // 🆕 Configurazione errori aggiornata con più casi d'uso
  const errorConfig = {
    qr_expired: {
      mainIcon: XCircle,
      smallIcon: Clock,
      title: "QR Code Scaduto",
      description: "Il QR code che hai scansionato non è più valido",
      detailsTitle: "Sessione scaduta",
      detailsText: "I QR code hanno una validità di 6 ore per motivi di sicurezza. Questo codice è stato generato troppo tempo fa e non è più utilizzabile.",
      howToTitle: "Come risolvere",
    //   steps: [
    //     "Chiedi al DJ di generare un nuovo QR code",
    //     "Scansiona il nuovo codice",
    //     "Inizia a prenotare le tue canzoni preferite! 🎤"
    //   ],
    //   helpNote: "Il DJ può generare un nuovo QR code dalla sua dashboard in qualsiasi momento"
	steps: [
		"Scansiona il nuovo codice",
		"Inizia a prenotare le tue canzoni preferite! 🎤"
	],
    },
    no_active_venue: {
      mainIcon: XCircle,
      smallIcon: MapPin,
      title: "Nessun Locale Attivo",
      description: "Il DJ non ha ancora attivato la serata",
      detailsTitle: "Locale non configurato",
      detailsText: "Il DJ deve attivare un locale dalla dashboard prima che tu possa prenotare le canzoni. La configurazione richiede solo pochi secondi.",
      howToTitle: "Come risolvere",
      steps: [
        "Attendi qualche secondo che il DJ attiva il locale",
        "Scansiona di nuovo il QR code"
      ],
      //helpNote: "Il DJ può attivare un locale dalla dashboard in pochi secondi"
    },
    qr_not_found: {
      mainIcon: XCircle,
      smallIcon: AlertTriangle,
      title: "QR Code Non Trovato",
      description: "Il QR code scansionato non esiste o non è valido",
      detailsTitle: "Codice non riconosciuto",
      detailsText: "Il QR code che hai scansionato non corrisponde a nessun DJ registrato nel sistema. Potrebbe essere un codice errato o danneggiato.",
      howToTitle: "Come risolvere",
      steps: [
        "Verifica di aver scansionato il QR code corretto",
        "Chiedi al DJ di mostrarti il QR code ufficiale",
        "Assicurati che la camera sia ben focalizzata"
      ],
      helpNote: "Ogni DJ ha un QR code unico generato dalla piattaforma Karaokati"
    },
    connection_error: {
      mainIcon: XCircle,
      smallIcon: Wifi,
      title: "Errore di Connessione",
      description: "Impossibile connettersi al server",
      detailsTitle: "Problema di rete",
      detailsText: "Non siamo riusciti a contattare il server. Potrebbe essere un problema temporaneo di connessione internet o di disponibilità del servizio.",
      howToTitle: "Come risolvere",
      steps: [
        "Verifica la tua connessione internet",
        "Prova a ricaricare la pagina",
        "Scansiona nuovamente il QR code tra qualche minuto"
      ],
      helpNote: "Se il problema persiste, contatta il DJ o riprova più tardi"
    }
  };

  // Fallback al tipo default se non specificato
  const currentType = type || "no_active_venue";
  const error = errorConfig[currentType] || errorConfig.no_active_venue;
  const MainIcon = error.mainIcon;
  const SmallIcon = error.smallIcon;

  const handleRetry = () => {
    // Ricarica la pagina o torna al QR entry
    if (qrCodeId) {
      window.location.href = `/sessions/entry/${qrCodeId}`;
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Mic2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Karaokati
            </span>
          </div>
        </div>

        {/* Error Card */}
        <Card className="border-red-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center border-2 border-red-700/50 relative">
                <MainIcon className="w-14 h-14 text-red-400" strokeWidth={2.5} />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                  <SmallIcon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-white text-center mb-3">
              {error.title}
            </h1>

            {/* Error Description */}
            <p className="text-gray-300 text-center text-lg mb-6">
              {error.description}
            </p>

            {/* Error Details Box */}
            <div className="bg-red-900/30 border border-red-700/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <SmallIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-300 mb-1">
                    {error.detailsTitle}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {error.detailsText}
                  </p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-purple-900/30 border border-purple-700/30 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <RefreshCw className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-purple-300">
                  {error.howToTitle}
                </p>
              </div>
              <div className="space-y-2 text-sm ml-8">
                {error.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-purple-400 font-bold flex-shrink-0">{index + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 🆕 Retry Button */}
            {/* <div className="mb-6">
              <Button
                onClick={handleRetry}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Riprova
              </Button>
            </div> */}

            {/* Help Note */}
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                {error.helpNote}
              </p>
            </div>

            {/* 🆕 Debug Info (solo in development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-700">
                <p className="text-xs text-gray-400 font-mono">
                  Debug: type={currentType}, qrCodeId={qrCodeId}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-400">
            💡 <span className="text-gray-300">Suggerimento:</span> Parla direttamente con il DJ
          </p>
          <p className="text-xs text-gray-500">
            Hai bisogno di aiuto? Contatta il DJ
          </p>
          
          {/* QR Code ID Display */}
          {qrCodeId && (
            <p className="text-xs text-gray-600 font-mono">
              QR: {qrCodeId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}