import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mic2, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Recupera Password - Karaokati";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link to={createPageUrl("login")} className="inline-flex items-center gap-3 mb-8 group">
          <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" />
          <span className="text-purple-300 font-medium">Torna al login</span>
        </Link>

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
                <Link to={createPageUrl("login")}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6">
                    Torna al Login
                  </Button>
                </Link>
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
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
                >
                  Invia Link di Reset
                </Button>

                <div className="text-center pt-2">
                  <span className="text-gray-400">Ricordi la password? </span>
                  <Link to={createPageUrl("login")} className="text-purple-400 font-medium hover:underline">
                    Accedi
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-sm text-white py-6 px-6 border-t border-purple-800/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 Karaokati. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <Link to={createPageUrl("terms")} className="hover:text-white transition">Termini di servizio</Link>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}