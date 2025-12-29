import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mic2, Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmailVerificationSent() {
  useEffect(() => {
    document.title = "Email Inviata - Karaokati | Verifica il tuo account";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Mic2 className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Karaokati
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Controlla la tua Email
            </CardTitle>
            <p className="text-gray-400 mt-2">
              Abbiamo inviato un link di verifica
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
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Invia nuovamente l'email
              </Button>

              <Link to={createPageUrl("Access")} className="block">
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-400 hover:text-white hover:bg-gray-800/50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Torna al login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-sm text-white py-6 px-6 border-t border-purple-800/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 Karaokati. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <Link to={createPageUrl("TermsOfService")} className="hover:text-white transition">Termini di servizio</Link>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}