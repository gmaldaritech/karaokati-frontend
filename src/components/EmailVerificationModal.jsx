import React from 'react';
import { X, Mail, ArrowLeft, RefreshCw, Mic2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from '@/api/apiClient';
import { toast } from "sonner";

const EmailVerificationModal = ({ isOpen, onClose, email, stageName }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // 🆕 Funzione unificata per chiusura e redirect
  const handleCloseAndRedirect = () => {
    onClose(); // Chiude modal
    navigate(createPageUrl("Access")); // Vai al login
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseAndRedirect(); // 🆕 Usa la funzione unificata
    }
  };

  const handleOkClick = () => {
    onClose(); // Chiude modal
    navigate(createPageUrl("Access")); // Vai al login
  };

  const handleResendEmail = async () => {
  try {
    const result = await apiClient.post('/auth/resend-verification', { email });
    
    toast.success("Email reinviata! Controlla la tua posta.");
    
  } catch (error) {
    console.error('Errore resend:', error);
    
    if (error.message.includes('404')) {
      toast.error("Account non trovato o già verificato");
    } else {
      toast.error("Errore durante il reinvio. Riprova tra poco.");
    }
  }
};

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={handleCloseAndRedirect}
    >
      {/* Background animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl relative">
          {/* Close X button */}
          <button 
            onClick={handleCloseAndRedirect}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

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
            <CardTitle className="text-2xl font-bold text-white mb-10">
              Controlla la tua Email
            </CardTitle>
			<div className="h-6"></div>
            <p className="text-gray-400">
              Ciao <span className="font-medium text-white">{stageName}</span>!<br />
              Abbiamo inviato un link di verifica a:<br />
              <span className="text-purple-300 font-medium">{email}</span>
            </p>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            {/* Mail Icon */}
            <div className="w-20 h-20 bg-purple-900/30 border border-purple-700/50 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-10 h-10 text-purple-400" />
            </div>

            <div className="space-y-2">
              <p className="text-gray-300">
                Clicca sul link nell'email per completare la registrazione e attivare il tuo account.
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-purple-900/30 border border-purple-800/30 rounded-xl p-4 text-left">
              <h3 className="font-semibold text-purple-300 mb-2">💡 Non trovi l'email?</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Controlla la cartella spam o posta indesiderata</li>
                <li>• Verifica che l'indirizzo email sia corretto</li>
                <li>• Attendi qualche minuto e riprova</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
			{/* 🆕 Pulsante OK principale */}
			<Button 
				onClick={handleOkClick}
				className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
			>
				Ho Capito
			</Button>

			{/* 🆕 Link secondario per reinvio */}
			<button 
				onClick={handleResendEmail}
				className="w-full text-purple-400 hover:text-purple-300 text-sm transition-colors py-2"
			>
				Non hai ricevuto l'email? Invia nuovamente
			</button>
			</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerificationModal;