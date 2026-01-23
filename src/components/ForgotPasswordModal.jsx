// src/components/ForgotPasswordModal.jsx
import React, { useState } from 'react';
import { X, Mail, CheckCircle, Mic2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/api/apiClient"; // 🆕 Import apiClient
import { toast } from "sonner"; // 🆕 Import toast

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // 🆕 Spostato dentro il componente

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 🆕 Chiamata API usando apiClient
      const result = await apiClient.requestPasswordReset(email);
      
      console.log("✅ Reset password richiesto:", result);
      setSubmitted(true);
      
      // Toast di successo opzionale
      toast.success("Email di reset inviata! Controlla la tua posta.");
      
    } catch (error) {
      console.error("❌ Errore reset password:", error);
      
      // Anche in caso di errore, mostra successo per sicurezza
      setSubmitted(true);
      
      // Toast neutro
      toast.info("Se l'email esiste, riceverai le istruzioni per il reset.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    onClose();
    navigate(createPageUrl("login"));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    setEmail("");
    setSubmitted(false);
    setLoading(false); // 🆕 Reset loading
    onClose();
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
              {submitted ? "Email Inviata!" : "Recupera Password"}
            </CardTitle>
            
            <p className="text-gray-400 mt-2">
              {submitted 
                ? "Controlla la tua casella di posta" 
                : "Inserisci la tua email per ricevere il link di reset"}
            </p>
          </CardHeader>
          
          <CardContent>
            {submitted ? (
              <div className="text-center space-y-6">
                {/* Success icon */}
                <div className="w-20 h-20 bg-green-900/30 border border-green-700/50 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-gray-300">
                    Abbiamo inviato un'email a:
                  </p>
                  <p className="text-purple-400 font-medium">{email}</p>
                  <p className="text-sm text-gray-500 mt-4">
                    Clicca sul link nell'email per reimpostare la tua password.
                    Se non ricevi l'email, controlla la cartella spam.
                  </p>
                </div>
                
                {/* Actions after email sent */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleBackToLogin}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
                  >
                    Ho capito
                  </Button>
                  
                  {/* Secondary action to try again */}
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setEmail("");
                    }}
                    className="w-full text-purple-400 hover:text-purple-300 text-sm transition-colors py-2"
                  >
                    Riprova
                  </button>
                </div>
              </div>
            ) : (
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
                    disabled={loading} // 🆕 Disabilita durante loading
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
                  disabled={loading} // 🆕 Disabilita durante loading
                >
                  {loading ? "Invio in corso..." : "Conferma"} {/* 🆕 Testo dinamico */}
                </Button>

                <div className="text-center pt-2">
                  <span className="text-gray-400">Ricordi la password? </span>
                  <button 
                    onClick={handleBackToLogin}
                    className="text-purple-400 font-medium hover:underline"
                    disabled={loading} // 🆕 Disabilita durante loading
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

export default ForgotPasswordModal;