import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Mic2, MessageSquare, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { apiClient } from '@/api/apiClient';
import { toast } from "sonner";

export default function Suggestions() {
  const [suggestion, setSuggestion] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    document.title = "Suggerimenti - Karaokati";
	window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
	e.preventDefault();
	
	if (suggestion.trim()) {
		try {
		// 🆕 Invia suggerimento al backend
		await apiClient.sendSuggestion(suggestion.trim());
		
		// Mostra popup di ringraziamento
		setShowThankYou(true);
		
		// Reset del form
		setSuggestion("");
		} catch (error) {
		console.error("Errore invio suggerimento:", error);
		// Opzionale: mostra toast di errore
		toast.error("Errore nell'invio del suggerimento");
		}
	}
	};

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to={createPageUrl("home")} onClick={handleLogoClick} className="flex items-center gap-3 group">
            {/* <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" /> */}
            <div className="flex items-center">
            <img 
              src="/logo.png"
              alt="Karaokati" 
              className="h-10 w-auto"
            />
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                Il tuo feedback è prezioso
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Inviaci i tuoi{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Suggerimenti
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Hai un'idea per migliorare Karaokati? Vuoi segnalare un problema o suggerire una nuova funzionalità? 
              Siamo sempre felici di ascoltarti!
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-800/30 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="suggestion" className="block text-lg font-semibold text-white mb-3">
                  Il tuo suggerimento
                </label>
                <Textarea
                  id="suggestion"
                  placeholder="Scrivi qui il tuo suggerimento, idea o segnalazione... Più dettagli fornisci, meglio possiamo aiutarti!"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  className="min-h-[200px] bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 text-base resize-none"
                  required
                />
                <p className="text-sm text-gray-400 mt-2">
                  {suggestion.length} caratteri
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                disabled={!suggestion.trim()}
              >
                <Send className="w-5 h-5 mr-2" />
                Invia Suggerimento
              </Button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-purple-900/30 border border-purple-700/50 rounded-xl">
              <p className="text-sm text-purple-200 text-center">
                💡 Leggiamo ogni suggerimento con attenzione. Anche se non possiamo rispondere a tutti, 
                il tuo feedback ci aiuta a migliorare Karaokati per tutta la community!
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-800/30 border border-purple-800/20 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Suggerimenti</h3>
              <p className="text-gray-400 text-sm">
                Condividi le tue idee per nuove funzionalità
              </p>
            </div>

            <div className="text-center p-6 bg-gray-800/30 border border-purple-800/20 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Segnalazioni</h3>
              <p className="text-gray-400 text-sm">
                Aiutaci a risolvere bug e problemi tecnici
              </p>
            </div>

            <div className="text-center p-6 bg-gray-800/30 border border-purple-800/20 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Miglioramenti</h3>
              <p className="text-gray-400 text-sm">
                Suggerisci come migliorare l'esperienza d'uso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="bg-gray-900 border-purple-800/30 text-white max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center">
              Grazie per il tuo suggerimento!
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center text-base mt-4">
              Abbiamo ricevuto il tuo feedback e lo valuteremo con attenzione. 
              Il tuo contributo ci aiuta a rendere Karaokati sempre migliore! 💜
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowThankYou(false)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8"
            >
              Chiudi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-8 px-6 border-t border-purple-800/30 mt-12">
        <div className="max-w-5xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2026 Karaokati. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}