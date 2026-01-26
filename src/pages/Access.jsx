import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mic2, Mail, Lock, ArrowLeft, Music, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import ResendVerificationModal from "@/components/ResendVerificationModal";

// ============================================================================
// HOOKS & UTILITIES
// ============================================================================

const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscapeMode = width > height;
      
      const maxDimension = Math.max(width, height);
      const minDimension = Math.min(width, height);
      
      if (maxDimension < 768) {
        // Mobile
        setIsMobile(true);
        setIsTablet(false);
      } else if (minDimension >= 768 && maxDimension <= 1366) {
        // Tablet
        setIsMobile(false);
        setIsTablet(true);
      } else if (minDimension < 768 && maxDimension >= 768 && maxDimension <= 1366) {
        // Tablet landscape
        setIsMobile(false);
        setIsTablet(true);
      } else {
        // Desktop
        setIsMobile(false);
        setIsTablet(false);
      }
      
      setIsLandscape(isLandscapeMode);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkDevice, 150);
    });
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return { isMobile, isTablet, isLandscape };
};

// ============================================================================
// HEADER COMPONENTS
// ============================================================================

const MobileHeader = () => (
  <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-purple-800/30 z-50 lg:hidden">
    <div className="px-4 py-3 flex justify-between items-center">
      <Link to={createPageUrl("home")} className="flex items-center gap-2">
        <img src="/logo.png" alt="Karaokati" className="h-9 w-auto" />
      </Link>
      <div className="flex items-center gap-3">
        <Link 
          to={createPageUrl("register")} 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
        >
          Registrati
        </Link>
      </div>
    </div>
  </header>
);

// ============================================================================
// FORM COMPONENTS
// ============================================================================

const LoginForm = ({ formData, onInputChange, onSubmit, loading, showPassword, setShowPassword, onForgotPassword, onResendVerification }) => (
  <form onSubmit={onSubmit} className="space-y-5" noValidate>
    {/* Email Field */}
    <div className="space-y-2">
      <Label htmlFor="email" className="flex items-center gap-2 text-gray-300">
        <Mail className="w-4 h-4 text-purple-400" />
        Email
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="mario@example.com"
        value={formData.email}
        onChange={(e) => onInputChange('email', e.target.value)}
        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
        disabled={loading}
        autoComplete="email"
      />
    </div>

    {/* Password Field */}
    <div className="space-y-2">
      <Label htmlFor="password" className="flex items-center gap-2 text-gray-300">
        <Lock className="w-4 h-4 text-purple-400" />
        Password
      </Label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => onInputChange('password', e.target.value)}
          className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 pr-12"
          disabled={loading}
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          disabled={loading}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>

    {/* Forgot Password Link */}
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onForgotPassword}
        className="text-sm text-purple-400 hover:underline"
        disabled={loading}
      >
        Password dimenticata?
      </button>
    </div>

    {/* Submit Button */}
    <Button 
      type="submit" 
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
      disabled={loading}
    >
      {loading ? "Accesso in corso..." : "Accedi"}
    </Button>

    {/* Footer Links */}
    <div className="text-center pt-4 space-y-2">
      <div>
        <span className="text-gray-400">Non hai ancora un account? </span>
        <Link to={createPageUrl("register")} className="text-purple-400 font-medium hover:underline">
          Registrati
        </Link>
      </div>
      
      <div className="text-sm">
        <span className="text-gray-500">Ti sei registrato ma non hai ricevuto l'email di conferma? </span>
        <button
          type="button"
          onClick={onResendVerification}
          className="text-purple-400 hover:text-purple-300 transition-colors"
          disabled={loading}
        >
          Clicca qui per richiederne una nuova
        </button>
      </div>
    </div>
  </form>
);

// ============================================================================
// FEATURE CARDS
// ============================================================================

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
    <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
      <Icon className="w-6 h-6 text-purple-400" />
    </div>
    <div>
      <div className="font-semibold text-white mb-1">{title}</div>
      <div className="text-sm text-gray-400">{description}</div>
    </div>
  </div>
);

const DesktopFeatures = () => (
  <div className="space-y-6">
    <FeatureCard
      icon={Music}
      title="Gestione Completa"
      description="Dashboard professionale per DJ"
    />
    <FeatureCard
      icon={Mic2}
      title="QR Code Personale"
      description="Condividi e gestisci prenotazioni"
    />
  </div>
);

// ============================================================================
// MOBILE/TABLET LAYOUT
// ============================================================================

const MobileTabletLayout = ({ isTablet, isLandscape, formData, onInputChange, onSubmit, loading, showPassword, setShowPassword, onForgotPassword, onResendVerification }) => (
  <>
    <MobileHeader />
    
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center transition-all duration-300 ${
      isTablet && isLandscape ? 'p-4' : 'p-6 pt-20'
    }`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className={`w-full relative z-10 ${isTablet ? 'max-w-3xl' : 'max-w-md'}`}>
        <div className={isTablet && isLandscape ? 'grid grid-cols-2 gap-8 items-center' : ''}>
          
          {/* Hero Section - Solo tablet landscape */}
          {isTablet && isLandscape && (
            <div>
              <Link to={createPageUrl("home")} className="inline-flex items-center gap-3 mb-6 group">
                <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" />
                <span className="text-purple-300 font-medium">Torna alla home</span>
              </Link>
              
              <h1 className="text-3xl font-bold mb-4 leading-tight text-white">
                Bentornato!<br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Accedi al tuo mondo
                </span>
              </h1>

              <p className="text-base text-gray-300 mb-6">
                Gestisci locali, catalogo e prenotazioni in tempo reale.
              </p>

              <div className="space-y-4">
                <FeatureCard
                  icon={Music}
                  title="Gestione Completa"
                  description="Dashboard professionale"
                />
                <FeatureCard
                  icon={Mic2}
                  title="QR Code Personale"
                  description="Gestisci prenotazioni"
                />
              </div>
            </div>
          )}

          {/* Form Card */}
          <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
            {/* Logo e back button - Solo mobile/tablet portrait */}
            {!(isTablet && isLandscape) && (
              <div className="p-6 pb-0">
                <Link to={createPageUrl("home")} className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Home</span>
                </Link>
                <div className="flex justify-center mb-4">
                  <img src="/logo.png" alt="Karaokati" className="h-9 w-auto" />
                </div>
              </div>
            )}

            <CardHeader className="text-center pb-6">
              <CardTitle className={`font-bold text-white ${isTablet ? 'text-2xl' : 'text-xl'}`}>
                Accedi al tuo account
              </CardTitle>
              <p className="text-gray-400 mt-2 text-sm">Inserisci le tue credenziali</p>
            </CardHeader>
            
            <CardContent>
              <LoginForm
                formData={formData}
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                loading={loading}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onForgotPassword={onForgotPassword}
                onResendVerification={onResendVerification}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    {/* Mobile Footer */}
    <footer className="bg-gray-950 text-white py-6 px-6 border-t border-purple-800/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 text-center text-sm text-gray-400">
        <p>© 2026 Karaokati. Tutti i diritti riservati.</p>
        <div className="flex gap-6 justify-center">
          <Link to={createPageUrl("terms")} className="hover:text-white transition">
            Termini di servizio
          </Link>
        </div>
      </div>
    </footer>
  </>
);

// ============================================================================
// DESKTOP LAYOUT
// ============================================================================

const DesktopLayout = ({ formData, onInputChange, onSubmit, loading, showPassword, setShowPassword, onForgotPassword, onResendVerification }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
    </div>

    <div className="w-full max-w-5xl relative z-10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Hero Section */}
        <div className="hidden md:block">
          <Link to={createPageUrl("home")} className="inline-flex items-center gap-3 mb-8 group">
            <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" />
            <img src="/logo.png" alt="Karaokati" className="h-10 w-auto" />
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            Bentornato!<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Accedi al tuo mondo
            </span>
          </h1>

          <p className="text-lg text-gray-300 mb-8">
            Accedi alla tua dashboard per gestire locali, catalogo musicale e 
            prenotazioni in tempo reale.
          </p>

          <DesktopFeatures />
        </div>

        {/* Form Card */}
        <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-white">Accedi al tuo account</CardTitle>
            <p className="text-gray-400 mt-2">Inserisci le tue credenziali per continuare</p>
          </CardHeader>
          
          <CardContent>
            <LoginForm
              formData={formData}
              onInputChange={onInputChange}
              onSubmit={onSubmit}
              loading={loading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onForgotPassword={onForgotPassword}
              onResendVerification={onResendVerification}
            />
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Desktop Footer */}
    <footer className="absolute bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-sm text-white py-6 px-6 border-t border-purple-800/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>© 2026 Karaokati. Tutti i diritti riservati.</p>
        <div className="flex gap-6">
          <Link to={createPageUrl("terms")} className="hover:text-white transition">
            Termini di servizio
          </Link>
        </div>
      </div>
    </footer>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Access() {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isMobile, isTablet, isLandscape } = useDeviceDetection();
  
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showResendVerificationModal, setShowResendVerificationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dj-dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  // Set page metadata
  useEffect(() => {
    document.title = "Accedi - Karaokati | Login DJ Dashboard per Gestione Karaoke";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Accedi alla tua dashboard DJ Karaokati. Gestisci prenotazioni, catalogo e locali in tempo reale.");
    }
  }, []);

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔐 Tentativo login:", { email: formData.email });

    // Validation
    if (!formData.email.trim()) {
      toast.error("L'email è obbligatoria");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Inserisci un'email valida");
      return;
    }

    if (!formData.password) {
      toast.error("La password è obbligatoria");
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      console.log("✅ Login completato:", result);
      toast.success(`Benvenuto ${result.dj.stage_name}!`);
      navigate("/dj-dashboard");
      
    } catch (error) {
      console.error("❌ Errore login:", error);
      
      if (error.message.includes("Credenziali non valide") || error.message.includes("401")) {
        toast.error("Email o password non corretti. Riprova.");
      } else if (error.message.includes("Network Error") || error.message.includes("fetch")) {
        toast.error("Impossibile connettersi al server. Verifica che il backend sia avviato.");
      } else if (error.message.includes("DJ non trovato")) {
        toast.error("Account non trovato. Verifica l'email o registrati.");
      } else if (error.message.includes("Email non ancora verificata")) {
        toast.error("Devi verificare la tua email prima di accedere. Controlla la tua posta.");
      } else {
        toast.error(error.message || "Errore durante il login. Riprova.");
      }
    }
  };

  // Loading state
  if (loading && isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={showForgotPasswordModal || showResendVerificationModal ? 'blur-sm' : ''}>
        {isMobile || isTablet ? (
          <MobileTabletLayout
            isTablet={isTablet}
            isLandscape={isLandscape}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            loading={loading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onForgotPassword={() => setShowForgotPasswordModal(true)}
            onResendVerification={() => setShowResendVerificationModal(true)}
          />
        ) : (
          <DesktopLayout
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            loading={loading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onForgotPassword={() => setShowForgotPasswordModal(true)}
            onResendVerification={() => setShowResendVerificationModal(true)}
          />
        )}
      </div>

      {/* Modals */}
      <ForgotPasswordModal 
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />
      
      <ResendVerificationModal 
        isOpen={showResendVerificationModal}
        onClose={() => setShowResendVerificationModal(false)}
      />
    </>
  );
}
