import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mic2, User, Mail, Lock, Phone, ArrowLeft, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import EmailVerificationModal from "@/components/EmailVerificationModal";
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
        setIsMobile(true);
        setIsTablet(false);
      } else if (minDimension >= 768 && maxDimension <= 1366) {
        setIsMobile(false);
        setIsTablet(true);
      } else if (minDimension < 768 && maxDimension >= 768 && maxDimension <= 1366) {
        setIsMobile(false);
        setIsTablet(true);
      } else {
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
        <img src="/logo.png" alt="Karaokati" className="h-7 w-auto" />
      </Link>
      <div className="flex items-center gap-3">
        <Link 
          to={createPageUrl("login")} 
          className="text-purple-300 hover:text-purple-100 px-3 py-1.5 rounded-lg hover:bg-purple-900/50 transition text-sm"
        >
          Accedi
        </Link>
      </div>
    </div>
  </header>
);

// ============================================================================
// FORM COMPONENTS
// ============================================================================

const PasswordInput = ({ id, value, onChange, showPassword, toggleShow, disabled, label, placeholder, hint }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="flex items-center gap-2 text-gray-300">
      <Lock className="w-4 h-4 text-purple-400" />
      {label}
    </Label>
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 pr-12"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        disabled={disabled}
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
    {hint && <p className="text-xs text-gray-500">{hint}</p>}
  </div>
);

const RegisterForm = ({ 
  formData, 
  onInputChange, 
  onSubmit, 
  loading, 
  showPassword, 
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => (
  <form onSubmit={onSubmit} className="space-y-5" noValidate>
    {/* Full Name */}
    <div className="space-y-2">
      <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-300">
        <User className="w-4 h-4 text-purple-400" />
        Nome completo
      </Label>
      <Input
        id="fullName"
        type="text"
        placeholder="Mario Rossi"
        value={formData.fullName}
        onChange={(e) => onInputChange('fullName', e.target.value)}
        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
        disabled={loading}
      />
    </div>

    {/* Stage Name */}
    <div className="space-y-2">
      <Label htmlFor="stageName" className="flex items-center gap-2 text-gray-300">
        <Mic2 className="w-4 h-4 text-purple-400" />
        Nome d'arte DJ
      </Label>
      <Input
        id="stageName"
        type="text"
        placeholder="DJ Rossi"
        value={formData.stageName}
        onChange={(e) => onInputChange('stageName', e.target.value)}
        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
        disabled={loading}
      />
    </div>

    {/* Email */}
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
      />
    </div>

    {/* Phone (Optional) */}
    <div className="space-y-2">
      <Label htmlFor="phone" className="flex items-center gap-2 text-gray-300">
        <Phone className="w-4 h-4 text-purple-400" />
        Telefono (opzionale)
      </Label>
      <Input
        id="phone"
        type="tel"
        placeholder="+39 333 1234567"
        value={formData.phone}
        onChange={(e) => onInputChange('phone', e.target.value)}
        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
        disabled={loading}
      />
    </div>

    {/* Password */}
    <PasswordInput
      id="password"
      value={formData.password}
      onChange={(e) => onInputChange('password', e.target.value)}
      showPassword={showPassword}
      toggleShow={() => setShowPassword(!showPassword)}
      disabled={loading}
      label="Password"
      placeholder="••••••••"
      hint="Minimo 8 caratteri"
    />

    {/* Confirm Password */}
    <PasswordInput
      id="confirmPassword"
      value={formData.confirmPassword}
      onChange={(e) => onInputChange('confirmPassword', e.target.value)}
      showPassword={showConfirmPassword}
      toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
      disabled={loading}
      label="Conferma password"
      placeholder="••••••••"
    />

    {/* Terms Checkbox */}
    <div className="flex items-start gap-3">
      <Checkbox
        id="terms"
        checked={formData.acceptTerms}
        onCheckedChange={(checked) => onInputChange('acceptTerms', checked)}
        disabled={loading}
        className="mt-0.5 w-5 h-5 border-purple-800/50 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-500"
      />
      <Label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer leading-tight">
        Accetto i{" "}
        <Link to={createPageUrl("terms")} className="text-purple-400 hover:underline">
          termini e condizioni
        </Link>
      </Label>
    </div>

    {/* Submit Button */}
    <Button 
      type="submit" 
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
      disabled={!formData.acceptTerms || loading}
    >
      {loading ? "Creazione account..." : "Crea Account"}
    </Button>

    {/* Footer Link */}
    <div className="text-center pt-4">
      <span className="text-gray-400">Hai già un account? </span>
      <Link to={createPageUrl("login")} className="text-purple-400 font-medium hover:underline">
        Accedi
      </Link>
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

const BenefitsList = ({ benefits }) => (
  <div className="space-y-3">
    {benefits.map((benefit, idx) => (
      <div key={idx} className="flex items-start gap-3">
        <div className="w-6 h-6 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-3 h-3 text-purple-400" />
        </div>
        <div className="text-gray-300 text-sm">{benefit}</div>
      </div>
    ))}
  </div>
);

const DesktopFeatures = () => {
  const benefits = [
    "QR code personale per le tue serate",
    "Gestione completa del catalogo musicale",
    "Prenotazioni in tempo reale",
    "Dashboard professionale per DJ"
  ];

  return (
    <div className="space-y-6">
      <FeatureCard
        icon={Sparkles}
        title="Setup Veloce"
        description="Inizia in 2 minuti"
      />
      <FeatureCard
        icon={Mic2}
        title="100% Gratuito"
        description="Nessun costo nascosto"
      />
      <div className="bg-gray-800/30 border border-purple-800/20 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Cosa ottieni:</h3>
        <BenefitsList benefits={benefits} />
      </div>
    </div>
  );
};

// ============================================================================
// MOBILE/TABLET LAYOUT
// ============================================================================

const MobileTabletLayout = ({ 
  isTablet, 
  isLandscape, 
  formData, 
  onInputChange, 
  onSubmit, 
  loading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => {
  const benefits = [
    "QR code personale",
    "Catalogo digitale",
    "Prenotazioni real-time",
    "100% gratuito"
  ];

  return (
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
          <div className={isTablet && isLandscape ? 'grid grid-cols-2 gap-8 items-start' : ''}>
            
            {/* Hero Section - Solo tablet landscape */}
            {isTablet && isLandscape && (
              <div>
                <Link to={createPageUrl("home")} className="inline-flex items-center gap-3 mb-6 group">
                  <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" />
                  <span className="text-purple-300 font-medium">Torna alla home</span>
                </Link>
                
                <h1 className="text-3xl font-bold mb-4 leading-tight text-white">
                  Unisciti a<br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Karaokati
                  </span>
                </h1>

                <p className="text-base text-gray-300 mb-6">
                  Crea il tuo account e inizia a gestire le tue serate in modo professionale.
                </p>

                <div className="space-y-4 mb-6">
                  <FeatureCard
                    icon={Sparkles}
                    title="Setup Veloce"
                    description="Inizia in 2 minuti"
                  />
                  <FeatureCard
                    icon={Mic2}
                    title="100% Gratuito"
                    description="Nessun costo"
                  />
                </div>

                <div className="bg-gray-800/30 border border-purple-800/20 rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-3 text-sm">Cosa ottieni:</h3>
                  <BenefitsList benefits={benefits} />
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
                    <img src="/logo.png" alt="Karaokati" className="h-7 w-auto" />
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className={`font-bold text-white ${isTablet ? 'text-2xl' : 'text-xl'}`}>
                  Crea il tuo account
                </CardTitle>
                <p className="text-gray-400 mt-2 text-sm">Compila i campi per iniziare</p>
              </CardHeader>
              
              <CardContent>
                <RegisterForm
                  formData={formData}
                  onInputChange={onInputChange}
                  onSubmit={onSubmit}
                  loading={loading}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
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
};

// ============================================================================
// DESKTOP LAYOUT
// ============================================================================

const DesktopLayout = ({ 
  formData, 
  onInputChange, 
  onSubmit, 
  loading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => (
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
            <img src="/logo.png" alt="Karaokati" className="h-7 w-auto" />
          </Link>
  

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            Unisciti a<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Karaokati
            </span>
          </h1>

          <p className="text-lg text-gray-300 mb-8">
            Crea il tuo account gratuito e inizia a gestire le tue serate karaoke 
            in modo professionale con QR code personale e prenotazioni in tempo reale.
          </p>

          <DesktopFeatures />
        </div>

        {/* Form Card */}
        <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-white">Crea il tuo account</CardTitle>
            <p className="text-gray-400 mt-2">Compila i campi per iniziare</p>
          </CardHeader>
          
          <CardContent>
            <RegisterForm
              formData={formData}
              onInputChange={onInputChange}
              onSubmit={onSubmit}
              loading={loading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
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

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const { isMobile, isTablet, isLandscape } = useDeviceDetection();
  
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showResendVerificationModal, setShowResendVerificationModal] = useState(false);
  const [verificationData, setVerificationData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    stageName: "",
    phone: "",
    acceptTerms: false
  });

  // Set page metadata
  useEffect(() => {
    document.title = "Registrazione DJ - Karaokati | Crea Account Gratuito per Gestione Karaoke";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Registrati gratis su Karaokati e ottieni il tuo QR code personale. Gestisci le tue serate karaoke con catalogo digitale e prenotazioni real-time.");
    }
  }, []);

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOpenResendModal = () => {
    setShowVerificationModal(false);
    setShowResendVerificationModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Tentativo registrazione:", formData);

    // Validations
    if (!formData.fullName.trim()) {
      toast.error("Il nome completo è obbligatorio");
      return;
    }

    if (!formData.stageName.trim()) {
      toast.error("Il nome d'arte DJ è obbligatorio");
      return;
    }

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

    if (formData.password.length < 8) {
      toast.error("La password deve essere di almeno 8 caratteri");
      return;
    }

    if (!formData.confirmPassword) {
      toast.error("Conferma la password");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Le password non coincidono");
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("Devi accettare i termini e condizioni");
      return;
    }

    try {
      const result = await register({
        full_name: formData.fullName,
        stage_name: formData.stageName,
        email: formData.email,
        phone: formData.phone || null,
        password: formData.password
      });

      console.log("✅ Registrazione completata:", result);
      toast.success("Account creato! Controlla la tua posta.");
      
      if (result.requires_verification) {
        setVerificationData({
          email: formData.email,
          stageName: result.dj.stage_name
        });
        setShowVerificationModal(true);
      } else {
        toast.success(`Benvenuto ${result.dj.stage_name}! Account creato con successo.`);
        navigate("/dj-dashboard");
      }
      
    } catch (error) {
      if (error.message.includes("Email già registrata")) {
        toast.error("Questa email è già registrata. Prova ad accedere invece.");
      } else if (error.message.includes("Network Error") || error.message.includes("fetch")) {
        toast.error("Impossibile connettersi al server. Verifica che il backend sia avviato.");
      } else {
        toast.error(error.message || "Errore durante la registrazione. Riprova.");
      }
    }
  };

  return (
    <>
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
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      ) : (
        <DesktopLayout
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={loading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      )}

      {/* Modals */}
      <EmailVerificationModal 
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={verificationData.email}
        stageName={verificationData.stageName}
        onOpenResendModal={handleOpenResendModal}
      />

      <ResendVerificationModal 
        isOpen={showResendVerificationModal}
        onClose={() => setShowResendVerificationModal(false)}
      />
    </>
  );
}
