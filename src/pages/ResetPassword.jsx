import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mic2, Lock, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/api/apiClient";
import { toast } from "sonner";

export default function ResetPassword() {
  const { token } = useParams(); // Ottieni token dalla URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Reimposta Password - Karaokati";
    
    // Cancella token esistente per forzare reset
    localStorage.removeItem('authToken');
    
    // Verifica se token esiste
    if (!token) {
      toast.error("Link di reset non valido");
      navigate(createPageUrl("login"));
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 8) {
      setError("La password deve contenere almeno 8 caratteri");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Le password non corrispondono");
      setLoading(false);
      return;
    }

    try {
      // Chiamata API per reset password
      const result = await apiClient.resetPassword({
        token: token,
        new_password: password
      });

      console.log("✅ Password reset completato:", result);
      setSubmitted(true);
      toast.success("Password aggiornata con successo!");
      
    } catch (error) {
      console.error("❌ Errore reset password:", error);
      
      if (error.message.includes("Token non valido") || error.message.includes("scaduto")) {
        setError("Link di reset scaduto o non valido. Richiedi un nuovo link.");
      } else {
        setError("Errore durante l'aggiornamento. Riprova.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Se non c'è token, mostra errore
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl max-w-md w-full">
          <CardContent className="text-center py-8">
            <p className="text-red-300 mb-4">Link di reset non valido</p>
            <Link to={createPageUrl("login")}>
              <Button>Torna al Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              {submitted ? "Password Aggiornata!" : "Reimposta Password"}
            </CardTitle>
            <p className="text-gray-400 mt-2">
              {submitted 
                ? "La tua password è stata cambiata con successo" 
                : "Inserisci la tua nuova password"}
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
                    La tua password è stata reimpostata con successo.
                  </p>
                  <p className="text-sm text-gray-500">
                    Ora puoi accedere con la nuova password.
                  </p>
                </div>
                <div className="pt-4">
                  <Link to={createPageUrl("login")}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6">
                      Vai al Login
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2 text-base text-gray-300">
                    <Lock className="w-4 h-4 text-purple-400" />
                    Nuova Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 h-12 pr-12"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Minimo 8 caratteri</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-base text-gray-300">
                    <Lock className="w-4 h-4 text-purple-400" />
                    Conferma Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 h-12 pr-12"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
                  disabled={loading}
                >
                  {loading ? "Aggiornamento..." : "Reimposta Password"}
                </Button>
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