// src/components/ResendVerificationModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle, RefreshCw, Mic2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/api/apiClient";
import { toast } from "sonner";

const ResendVerificationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🆕 Reset completo quando il modal si apre/chiude
  useEffect(() => {
    if (isOpen) {
      // Reset completo dello stato quando si apre
      setEmail("");
      setSubmitted(false);
      setLoading(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await apiClient.post('/auth/resend-verification', { email });
      
      console.log("✅ Email verifica reinviata:", email);
      setSubmitted(true);
      
      toast.success("Email di verifica inviata! Controlla la tua posta.");
      
    } catch (error) {
      console.error("❌ Errore resend verifica:", error);
      
      if (error.message.includes('non trovato')) {
        setError("Account non trovato o già verificato");
        toast.error("Account non trovato o già verificato");
      } else {
        setError("Errore durante l'invio. Riprova tra poco.");
        toast.error("Errore durante il reinvio. Riprova tra poco.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    handleClose();
    navigate(createPageUrl("login"));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    // Reset completo di tutti gli stati
    setEmail("");
    setSubmitted(false);
    setLoading(false);
    setError(null);
    onClose();
  };

  const handleRetry = () => {
    // Torna al form pulito
    setError(null);
    setEmail("");
    setSubmitted(false);
    setLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={handleOverlayClick}
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
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <CardHeader className="text-center pb-6">
            <div className="flex items-center gap-3 mb-6 justify-center">
                <img 
                  src="/logo.png"
                  alt="Karaokati" 
                  className="h-10 w-auto"
                />
              </div>
            
            <CardTitle className="text-2xl font-bold text-white">
              {submitted ? "Email Inviata!" : error ? "Errore Invio" : "Reinvia Verifica"}
            </CardTitle>
            
            <p className="text-gray-400 mt-2">
              {submitted 
                ? "Controlla la tua casella di posta" 
                : error 
                ? "Si è verificato un problema"
                : "Inserisci la tua email per ricevere nuovamente l'email di verifica"
              }
            </p>
          </CardHeader>
          
          <CardContent>
            {submitted ? (
              // STATO SUCCESS
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-900/30 border border-green-700/50 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-gray-300">
                    Abbiamo inviato una nuova email di verifica a:
                  </p>
                  <p className="text-purple-400 font-medium">{email}</p>
                  <p className="text-sm text-gray-500 mt-4">
                    Clicca sul link nell'email per attivare il tuo account.
                    Se non ricevi l'email, controlla la cartella spam.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleBackToLogin}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
                  >
                    Ho capito
                  </Button>
                  
                  <button 
                    onClick={handleRetry}
                    className="w-full text-purple-400 hover:text-purple-300 text-sm transition-colors py-2"
                  >
                    Prova con un'altra email
                  </button>
                </div>
              </div>
            ) : error ? (
              // STATO ERROR
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-red-900/30 border border-red-700/50 rounded-full flex items-center justify-center mx-auto">
                  <XCircle className="w-10 h-10 text-red-400" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    Impossibile Inviare Email
                  </h3>
                  <p className="text-red-300 font-medium">{error}</p>
                  <p className="text-sm text-gray-500 mt-4">
                    {error.includes('non trovato') 
                      ? "Verifica che l'email sia corretta o che l'account non sia già verificato."
                      : "Verifica la connessione e riprova."
                    }
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleRetry}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
                  >
                    Riprova
                  </Button>
                  
                  <button 
                    onClick={handleBackToLogin}
                    className="w-full text-purple-400 hover:text-purple-300 text-sm transition-colors py-2"
                  >
                    Torna al Login
                  </button>
                </div>
              </div>
            ) : (
              // STATO FORM
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-base text-gray-300">
                    <Mail className="w-4 h-4 text-purple-400" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mario@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 h-12"
                    required
                    disabled={loading}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    "Conferma"
                  )}
                </Button>

                <div className="text-center pt-2">
                  <span className="text-gray-400">Ricordi le credenziali? </span>
                  <button 
                    type="button"
                    onClick={handleBackToLogin}
                    className="text-purple-400 font-medium hover:underline"
                    disabled={loading}
                  >
                    Accedi
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResendVerificationModal;