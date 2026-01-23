import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, MapPin, QrCode, Power, RefreshCw, Download, Printer, Share2, ArrowRight, Sparkles, Calendar, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiClient } from "@/api/apiClient";
import { toast } from "sonner";
import { generateQRPrintHTML } from "@/components/QRCodePrintTemplate.jsx";


export default function OverviewSection(onSectionChange) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [dashboardData, setDashboardData] = useState({
    totalSongs: 0,
    activeVenue: null,
    venues: []
  });

  // Carica i dati della dashboard
  useEffect(() => {
    loadDashboardData();
  }, [user]);

  useEffect(() => {
    if (user?.qr_code_id) {
      const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      const entryUrl = `${baseUrl}/sessions/entry/${user.qr_code_id}`;
      
      // Colori viola per il QR code
      const colors = ['4C1D95'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(entryUrl)}&color=${randomColor}&bgcolor=ffffff&qzone=1&format=png`;
      setQrCodeUrl(qrUrl);
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Carica canzoni (per il conteggio)
      const songsResponse = await apiClient.getSongs({ per_page: 1 });
      
      // Carica venues per trovare quello attivo
      const venuesResponse = await apiClient.getVenues();
      const activeVenue = venuesResponse.find(v => v.active);

      setDashboardData({
        totalSongs: songsResponse.total || 0,
        activeVenue: activeVenue || null,
        venues: venuesResponse
      });

    } catch (error) {
      console.error('Errore nel caricamento dashboard:', error);
      toast.error("Impossibile caricare i dati della dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshQRCode = async () => {
    // Placeholder per rigenerazione QR code
    toast({
      title: "Funzione in arrivo",
      description: "La rigenerazione del QR code sarà disponibile a breve",
    });
  };

  const handleDownloadQRCode = async () => {
    if (!qrCodeUrl) {
      return;
    }

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qrcode-${user?.stage_name || 'karaokati'}.png`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.error("Impossibile scaricare il QR Code");
    }
  };

  const handlePrintQRCode = async () => {
    if (!qrCodeUrl) {
      return;
    }

    try {
      // 🆕 URL PayPal per QR code donazione
      const paypalUrl = "https://www.paypal.com/donate/?hosted_button_id=N2MW8AJGQ6KN6&locale.x=it_IT&currency_code=EUR&country.x=IT";
      const paypalQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paypalUrl)}`;
      
      // Crea un'immagine e aspetta che si carichi (QR principale)
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        const base64data = canvas.toDataURL('image/png');
        
        // 🆕 Carica QR code PayPal
        const paypalImg = new Image();
        paypalImg.crossOrigin = "anonymous";
        
        paypalImg.onload = function() {
          // Converti QR PayPal in base64
          const paypalCanvas = document.createElement('canvas');
          const paypalCtx = paypalCanvas.getContext('2d');
          paypalCanvas.width = paypalImg.width;
          paypalCanvas.height = paypalImg.height;
          
          paypalCtx.drawImage(paypalImg, 0, 0);
          const paypalBase64 = paypalCanvas.toDataURL('image/png');
          
          // Stampa con entrambi i QR code
          printWithIframe(base64data, paypalBase64);
        };
        
        paypalImg.onerror = function() {
          // Fallback: stampa solo con QR principale
          console.warn("Impossibile caricare QR PayPal, uso placeholder");
          printWithIframe(base64data, null);
        };
        
        paypalImg.src = paypalQrUrl;
      };
      
      img.onerror = function() {
        // Fallback: nessun QR caricato
        console.warn("Impossibile caricare QR principale");
        printWithIframe(null, null);
        toast.warning("QR code non caricato, stampato con placeholder");
      };
      
      img.src = qrCodeUrl;
      
    } catch (error) {
      console.error('Error preparing print:', error);
      toast.error("Impossibile preparare la stampa");
    }

    // 🆕 Funzione helper per evitare duplicazione codice iframe
    function printWithIframe(mainQrBase64, paypalQrBase64) {
      const printHTML = generateQRPrintHTML(user, mainQrBase64, paypalQrBase64);
      
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';
      
      document.body.appendChild(iframe);
      
      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        
        // Rimuovi iframe dopo stampa
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      };
      
      iframe.contentDocument.open();
      iframe.contentDocument.write(printHTML);
      iframe.contentDocument.close();
    }
  };

  const handleShareQRCode = async () => {
    if (!user?.qr_code_id) {
      toast.error("QR Code ID non disponibile");
      return;
    }

    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    const entryUrl = `${baseUrl}/sessions/entry/${user.qr_code_id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.stage_name} - Karaoke`,
          text: 'Scansiona per prenotare canzoni karaoke!',
          url: entryUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to copying URL
        navigator.clipboard.writeText(entryUrl);
        toast.success("URL di ingresso copiato negli appunti");
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(entryUrl);
      toast.success("URL di ingresso copiato negli appunti");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">
          Ciao, {user.stage_name}! 👋
        </h2>
        <p className="text-gray-400">Vista generale della tua attività</p>
      </div>

      {/* Quick Start Guide */}
      <Card className="border-purple-600/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Guida Rapida</h3>
              <p className="text-sm text-purple-300">Segui questi passi per iniziare la tua serata</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-blue-900/50 border border-blue-700/50 rounded-full flex items-center justify-center text-xs font-bold text-blue-400">1</div>
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Crea un Locale</h4>
              <p className="text-xs text-gray-400">Aggiungi il locale dove fai le serate</p>
            </div>

            <div className="p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-orange-900/50 border border-orange-700/50 rounded-full flex items-center justify-center text-xs font-bold text-orange-400">2</div>
                <Music className="w-4 h-4 text-orange-400" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Carica il Catalogo</h4>
              <p className="text-xs text-gray-400">Importa o aggiungi le tue canzoni</p>
            </div>

            <div className="p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-green-900/50 border border-green-700/50 rounded-full flex items-center justify-center text-xs font-bold text-green-400">3</div>
                <Power className="w-4 h-4 text-green-400" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Avvia la Serata</h4>
              <p className="text-xs text-gray-400">Avvia la serata in un locale per ricevere prenotazioni</p>
            </div>

            <div className="p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-pink-900/50 border border-pink-700/50 rounded-full flex items-center justify-center text-xs font-bold text-pink-400">4</div>
                <Calendar className="w-4 h-4 text-pink-400" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Gestisci Prenotazioni</h4>
              <p className="text-xs text-gray-400">Accetta le richieste dei clienti</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <Music className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {loading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    dashboardData.totalSongs
                  )}
                </div>
                <div className="text-sm text-gray-400">Brani nel Catalogo</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                dashboardData.activeVenue 
                  ? 'bg-gradient-to-br from-green-600 to-green-700' 
                  : 'bg-gray-700'
              }`}>
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                {dashboardData.activeVenue ? (
                  <>
                    <div className="text-lg font-bold text-white mb-1">
                      {dashboardData.activeVenue.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Power className="w-4 h-4 text-green-400" />
                      <div className="text-sm text-green-400">Serata Avviata</div>
                    </div>
                  </>
                ) : loading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                ) : (
                  <div className="text-sm text-gray-400">Nessuna serata avviata</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <QrCode className="w-5 h-5 text-purple-400" />
              QR Code Personale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {/* QR Code Display con il design che ti piaceva */}
              <div className="w-64 h-64 bg-white border-4 border-purple-600 rounded-2xl p-4 mb-6">
                {qrCodeUrl ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <img 
                      src={qrCodeUrl} 
                      alt="QR Code Karaokati" 
                      className="w-full h-full object-contain"
                    />
                    <div className="text-[11px] font-semibold uppercase tracking-widest
                                    bg-gradient-to-r from-purple-400 to-fuchsia-500
                                    bg-clip-text text-transparent">
                      Powered by Karaokati
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-24 h-24 text-purple-400 mx-auto mb-4" />
                      <div className="text-sm text-gray-400">Caricamento...</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleDownloadQRCode}
                  disabled={!qrCodeUrl}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Scarica PNG
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
                  onClick={handlePrintQRCode}
                  disabled={!qrCodeUrl}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Stampa
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
                  onClick={handleShareQRCode}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Condividi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-800/30 bg-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Come Funziona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-purple-400">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Stampa o Mostra il QR</h4>
                  <p className="text-sm text-gray-400">
                    Stampa il codice e posizionalo nel locale, oppure mostralo su uno schermo
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-purple-400">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Gli Utenti Scansionano</h4>
                  <p className="text-sm text-gray-400">
                    I clienti scansionano il QR con il loro smartphone
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-purple-400">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Chatbot Interattivo</h4>
                  <p className="text-sm text-gray-400">
                    Si apre una chat dove possono cercare e prenotare le canzoni
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-purple-400">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Ricevi le Prenotazioni</h4>
                  <p className="text-sm text-gray-400">
                    Vedi tutte le richieste in tempo reale nella dashboard
                  </p>
                </div>
              </div>

              <div className="p-4 bg-purple-900/30 border border-purple-800/30 rounded-lg mt-6">
                <div className="text-sm font-medium text-purple-300 mb-2">💡 Consiglio</div>
                <div className="text-sm text-purple-400">
                  Posiziona il QR code in un punto visibile e ben illuminato per facilitare la scansione
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}