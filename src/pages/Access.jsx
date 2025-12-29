// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createPageUrl } from "@/utils";
// import { Mic2, Mail, Lock, ArrowLeft, Music, Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useAuth } from "@/hooks/useAuth";
// import { toast } from "sonner";
// import ForgotPasswordModal from "@/components/ForgotPasswordModal";
// import ResendVerificationModal from "@/components/ResendVerificationModal";

// export default function Access() {
//   const { login, loading, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
  
//   // State per modals
//   const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
//   const [showResendVerificationModal, setShowResendVerificationModal] = useState(false);
  
//   // State per visualizzazione password
//   const [showPassword, setShowPassword] = useState(false);
  
//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/Dashboard");
//     }
//   }, [isAuthenticated, navigate]);
  
//   useEffect(() => {
//     document.title = "Accedi - Karaokati | Login DJ Dashboard per Gestione Karaoke";
    
//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//       metaDescription.setAttribute("content", "Accedi alla tua dashboard DJ Karaokati. Gestisci prenotazioni, catalogo e locali in tempo reale.");
//     }
//   }, []);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("🔐 Tentativo login:", { email: formData.email });

//     // Validazioni manuali complete
//     if (!formData.email.trim()) {
//       toast.error("L'email è obbligatoria");
//       return;
//     }

//     // Validazione formato email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast.error("Inserisci un'email valida");
//       return;
//     }

//     if (!formData.password) {
//       toast.error("La password è obbligatoria");
//       return;
//     }

//     try {
//       // Chiama il login con il nostro backend
//       const result = await login({
//         email: formData.email,
//         password: formData.password
//       });

//       console.log("✅ Login completato:", result);
//       toast.success(`Benvenuto ${result.dj.stage_name}!`);
      
//       // Redirect alla dashboard (handled by useAuth)
//       navigate("/Dashboard");
      
//     } catch (error) {
//       console.error("❌ Errore login:", error);
      
//       // Gestisci errori specifici
//       if (error.message.includes("Credenziali non valide") || error.message.includes("401")) {
//         toast.error("Email o password non corretti. Riprova.");
//       } else if (error.message.includes("Network Error") || error.message.includes("fetch")) {
//         toast.error("Impossibile connettersi al server. Verifica che il backend sia avviato.");
//       } else if (error.message.includes("DJ non trovato")) {
//         toast.error("Account non trovato. Verifica l'email o registrati.");
//       } else if (error.message.includes("Email non ancora verificata")) {
//         toast.error("Devi verificare la tua email prima di accedere. Controlla la tua posta.");
//       } else {
//         toast.error(error.message || "Errore durante il login. Riprova.");
//       }
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   // Show loading state during login
//   if (loading && isAuthenticated === null) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
//         <div className="text-center text-white">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
//           <p>Caricamento...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Pagina con blur condizionale */}
//       <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6 transition-all duration-300 ${
//         showForgotPasswordModal || showResendVerificationModal ? 'blur-sm' : ''
//       }`}>
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
//           <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
//         </div>

//         <div className="w-full max-w-5xl relative z-10">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="hidden md:block">
//               <Link to={createPageUrl("Home")} className="inline-flex items-center gap-3 mb-8 group">
//                 <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" />
//                 <span className="text-purple-300 font-medium">Torna alla home</span>
//               </Link>
              
//               {/* <div className="flex items-center gap-3 mb-8">
//                 <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
//                   <Mic2 className="w-8 h-8 text-white" />
//                 </div>
//                 <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   Karaokati
//                 </span>
//               </div> */}

//               <div className="flex items-center gap-3 mb-6">
//               {/* <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
//                 <Mic2 className="w-6 h-6 text-white" />
//               </div> */}
//                 <img 
//                   src="/logo2.png"
//                   alt="Karaokati" 
//                   className="h-10 w-auto"
//                 />
//               </div>

//               <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
//                 Bentornato!<br />
//                 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   Accedi al tuo mondo
//                 </span>
//               </h1>

//               <p className="text-lg text-gray-300 mb-8">
//                 Accedi alla tua dashboard per gestire locali, catalogo musicale e 
//                 prenotazioni in tempo reale.
//               </p>

//               <div className="space-y-6">
//                 <div className="flex items-center gap-4 p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
//                   <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
//                     <Music className="w-6 h-6 text-purple-400" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-white mb-1">Gestione Completa</div>
//                     <div className="text-sm text-gray-400">Dashboard professionale per DJ</div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
//                   <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
//                     <Mic2 className="w-6 h-6 text-purple-400" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-white mb-1">QR Code Personale</div>
//                     <div className="text-sm text-gray-400">Condividi e gestisci prenotazioni</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
//               <CardHeader className="text-center pb-6">
//                 <div className="md:hidden flex items-center gap-3 mb-6 justify-center">
//                   <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
//                     <Mic2 className="w-6 h-6 text-white" />
//                   </div>
//                   <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                     Karaokati
//                   </span>
//                 </div>
//                 <CardTitle className="text-2xl font-bold text-white">Accedi al tuo account</CardTitle>
//                 <p className="text-gray-400 mt-2">Inserisci le tue credenziali per continuare</p>
//               </CardHeader>
              
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//                   <div className="space-y-2">
//                     <Label htmlFor="email" className="flex items-center gap-2 text-gray-300">
//                       <Mail className="w-4 h-4 text-purple-400" />
//                       Email
//                     </Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="mario@example.com"
//                       value={formData.email}
//                       onChange={(e) => handleInputChange('email', e.target.value)}
//                       className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
//                       disabled={loading}
//                       autoComplete="email"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="password" className="flex items-center gap-2 text-gray-300">
//                       <Lock className="w-4 h-4 text-purple-400" />
//                       Password
//                     </Label>
//                     <div className="relative">
//                       <Input
//                         id="password"
//                         type={showPassword ? "text" : "password"}
//                         placeholder="••••••••"
//                         value={formData.password}
//                         onChange={(e) => handleInputChange('password', e.target.value)}
//                         className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 pr-12"
//                         disabled={loading}
//                         autoComplete="current-password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                         disabled={loading}
//                       >
//                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <Checkbox
//                         id="rememberMe"
//                         checked={formData.rememberMe}
//                         onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
//                         disabled={loading}
//                       />
//                       <Label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer">
//                         Ricordami
//                       </Label>
//                     </div>
                    
//                     {/* Button per aprire modal password dimenticata */}
//                     <button
//                       type="button"
//                       onClick={() => setShowForgotPasswordModal(true)}
//                       className="text-sm text-purple-400 hover:underline"
//                       disabled={loading}
//                     >
//                       Password dimenticata?
//                     </button>
//                   </div>

//                   <Button 
//                     type="submit" 
//                     className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
//                     disabled={loading}
//                   >
//                     {loading ? "Accesso in corso..." : "Accedi"}
//                   </Button>

//                   <div className="text-center pt-4 space-y-2">
//                     <div>
//                       <span className="text-gray-400">Non hai ancora un account? </span>
//                       <Link to={createPageUrl("Register")} className="text-purple-400 font-medium hover:underline">
//                         Registrati
//                       </Link>
//                     </div>
                    
//                     {/* Sezione per resend verifica */}
//                     <div className="text-sm">
//                       <span className="text-gray-500">Ti sei registrato ma non hai ricevuto l'email di conferma? </span>
//                       <button
//                         type="button"
//                         onClick={() => setShowResendVerificationModal(true)}
//                         className="text-purple-400 hover:text-purple-300 transition-colors"
//                         disabled={loading}
//                       >
//                         Clicca qui per richiederne una nuova
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="absolute bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-sm text-white py-6 px-6 border-t border-purple-800/30">
//           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
//             <p>© 2024 Karaokati. Tutti i diritti riservati.</p>
//             <div className="flex gap-6">
//               <Link to={createPageUrl("TermsOfService")} className="hover:text-white transition">Termini di servizio</Link>
//               <a href="#" className="hover:text-white transition">Privacy Policy</a>
//             </div>
//           </div>
//         </footer>
//       </div>

//       {/* Modals fuori dal div con blur */}
//       <ForgotPasswordModal 
//         isOpen={showForgotPasswordModal}
//         onClose={() => setShowForgotPasswordModal(false)}
//       />
      
//       <ResendVerificationModal 
//         isOpen={showResendVerificationModal}
//         onClose={() => setShowResendVerificationModal(false)}
//       />
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mic2, Mail, Lock, ArrowLeft, Music, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import ResendVerificationModal from "@/components/ResendVerificationModal";

export default function Access() {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // State per device detection
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  
  // State per modals
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showResendVerificationModal, setShowResendVerificationModal] = useState(false);
  
  // State per visualizzazione password
  const [showPassword, setShowPassword] = useState(false);

useEffect(() => {
  const checkDevice = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscapeMode = width > height;
    
    // Considera tablet se:
    // 1. Larghezza tra 768px e 1366px OPPURE
    // 2. Altezza tra 768px e 1366px (per catturare landscape/portrait)
    const maxDimension = Math.max(width, height);
    const minDimension = Math.min(width, height);
    
    if (maxDimension < 768) {
      // Mobile: dimensione massima sotto 768px
      setIsMobile(true);
      setIsTablet(false);
    } else if (minDimension >= 768 && maxDimension <= 1366) {
      // Tablet: dimensione minima almeno 768px e massima non oltre 1366px
      setIsMobile(false);
      setIsTablet(true);
    } else if (minDimension < 768 && maxDimension >= 768 && maxDimension <= 1366) {
      // Tablet in landscape estremo (tipo 1024x600)
      setIsMobile(false);
      setIsTablet(true);
    } else {
      // Desktop: tutto il resto
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
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    document.title = "Accedi - Karaokati | Login DJ Dashboard per Gestione Karaoke";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Accedi alla tua dashboard DJ Karaokati. Gestisci prenotazioni, catalogo e locali in tempo reale.");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔐 Tentativo login:", { email: formData.email });

    // Validazioni manuali complete
    if (!formData.email.trim()) {
      toast.error("L'email è obbligatoria");
      return;
    }

    // Validazione formato email
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
      // Chiama il login con il nostro backend
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      console.log("✅ Login completato:", result);
      toast.success(`Benvenuto ${result.dj.stage_name}!`);
      
      // Redirect alla dashboard (handled by useAuth)
      navigate("/Dashboard");
      
    } catch (error) {
      console.error("❌ Errore login:", error);
      
      // Gestisci errori specifici
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Show loading state during login
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

  // Mobile header component
  const MobileHeader = () => (
    <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-purple-800/30 z-50 lg:hidden">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link to={createPageUrl("Home")} className="flex items-center gap-2">
          <img 
            src="/logo2.png"
            alt="Karaokati" 
            className="h-7 w-auto"
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link to={createPageUrl("Register")} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
            Registrati Gratis
          </Link>
        </div>
      </div>
    </header>
  );

  // Desktop header component  
  const DesktopHeader = () => (
    <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 z-50 hidden lg:block">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to={createPageUrl("Home")} className="flex items-center gap-3">
          <img 
            src="/logo2.png"
            alt="Karaokati" 
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link to={createPageUrl("Register")} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg transition">
            Registrati Gratis
          </Link>
        </div>
      </div>
    </header>
  );

  return (
    <>
      {/* Headers */}
      <MobileHeader />
      <DesktopHeader />

      {/* Layout condizionale */}
      {(isMobile || isTablet) ? (
        // Mobile/Tablet Layout
        <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 transition-all duration-300 ${
          showForgotPasswordModal || showResendVerificationModal ? 'blur-sm' : ''
        }`}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className={`${
            isTablet && isLandscape
              ? 'pt-20 pb-12 px-6' // Tablet landscape: padding ridotto
              : isTablet 
                ? 'pt-24 pb-20 px-4' // Tablet portrait: padding normale
                : 'pt-20 pb-16 px-4' // Mobile: padding standard
          } min-h-screen flex items-center justify-center`}>
            
            <div className={`w-full relative z-10 ${
              isTablet && isLandscape
                ? 'max-w-5xl' // Tablet landscape: contenitore più largo
                : isTablet 
                  ? 'max-w-2xl' // Tablet portrait
                  : 'max-w-md' // Mobile
            }`}>
              
              {/* Layout per tablet landscape */}
              {isTablet && isLandscape ? (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left side - Hero */}
                  <div className="text-left">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-white">
                      Bentornato!<br />
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Accedi al tuo mondo
                      </span>
                    </h1>
                    <p className="text-base lg:text-lg text-gray-300 mb-6">
                      Accedi alla tua dashboard per gestire locali e prenotazioni
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 bg-gray-800/50 border border-purple-800/30 rounded-xl">
                        <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
                          <Music className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm mb-1">Gestione Completa</div>
                          <div className="text-xs text-gray-400">Dashboard professionale per DJ</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-gray-800/50 border border-purple-800/30 rounded-xl">
                        <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
                          <Mic2 className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm mb-1">QR Code Personale</div>
                          <div className="text-xs text-gray-400">Condividi e gestisci prenotazioni</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Form compatta */}
                  <div>
                    <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl font-bold text-white">
                          Accedi al tuo account
                        </CardTitle>
                        <p className="text-gray-400 text-sm">Inserisci le tue credenziali</p>
                      </CardHeader>
                      
                      <CardContent className="px-6 pb-6">
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                          <div className="space-y-1">
                            <Label htmlFor="email" className="text-gray-300 text-sm">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="mario@example.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 h-9 text-sm"
                              disabled={loading}
                              autoComplete="email"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="password" className="text-gray-300 text-sm">
                              Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 pr-8 h-9 text-sm"
                                disabled={loading}
                                autoComplete="current-password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                disabled={loading}
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">                        
                            <button
                              type="button"
                              onClick={() => setShowForgotPasswordModal(true)}
                              className="text-xs text-purple-400 hover:underline"
                              disabled={loading}
                            >
                              Password dimenticata?
                            </button>
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                            disabled={loading}
                          >
                            {loading ? "Accesso in corso..." : "Accedi"}
                          </Button>

                          <div className="text-center pt-2 space-y-2">
                            <div>
                              <span className="text-gray-400 text-sm">Non hai ancora un account? </span>
                              <Link to={createPageUrl("Register")} className="text-purple-400 font-medium hover:underline text-sm">
                                Registrati
                              </Link>
                            </div>
                            
                            <div className="text-xs">
                              <span className="text-gray-500">Non hai ricevuto l'email di conferma? </span>
                              <button
                                type="button"
                                onClick={() => setShowResendVerificationModal(true)}
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                                disabled={loading}
                              >
                                Clicca qui
                              </button>
                            </div>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                /* Layout standard per mobile e tablet portrait */
                <>
                  {/* Mobile/Tablet Portrait hero section */}
                  <div className="text-center mb-8">
                    <h1 className={`font-bold mb-4 leading-tight text-white ${isTablet ? 'text-4xl' : 'text-3xl'}`}>
                      Bentornato!<br />
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Accedi al tuo mondo
                      </span>
                    </h1>
                    <p className={`text-gray-300 mb-6 text-center ${isTablet ? 'text-lg' : 'text-base'}`}>
                      Accedi alla tua dashboard per gestire tutto
                    </p>

                    {/* Mobile features */}
                    <div className={`grid gap-4 mb-8 mx-auto ${isTablet ? 'grid-cols-2 max-w-lg' : 'grid-cols-1 max-w-md'}`}>
                      <div className="flex items-center gap-3 p-3 bg-gray-800/50 border border-purple-800/30 rounded-xl">
                        <div className="w-8 h-8 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
                          <Music className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold text-white ${isTablet ? 'text-sm' : 'text-xs'} mb-1`}>Gestione Completa</div>
                          <div className={`${isTablet ? 'text-xs' : 'text-xs'} text-gray-400`}>Dashboard professionale</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-800/50 border border-purple-800/30 rounded-xl">
                        <div className="w-8 h-8 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
                          <Mic2 className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold text-white ${isTablet ? 'text-sm' : 'text-xs'} mb-1`}>QR Code Personale</div>
                          <div className={`${isTablet ? 'text-xs' : 'text-xs'} text-gray-400`}>Gestisci prenotazioni</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Card */}
                  <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl mx-auto">
                    <CardHeader className={`text-center ${isTablet ? 'pb-8' : 'pb-6'}`}>
                      <CardTitle className={`font-bold text-white ${isTablet ? 'text-2xl' : 'text-xl'}`}>
                        Accedi al tuo account
                      </CardTitle>
                      <p className="text-gray-400 mt-2">Inserisci le tue credenziali per continuare</p>
                    </CardHeader>
                    
                    <CardContent className={isTablet ? 'px-8 pb-8' : ''}>
                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
                            disabled={loading}
                            autoComplete="email"
                          />
                        </div>

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
                              onChange={(e) => handleInputChange('password', e.target.value)}
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

                        <div className="flex items-center justify-between">
                        
                          <button
                            type="button"
                            onClick={() => setShowForgotPasswordModal(true)}
                            className={`text-purple-400 hover:underline ${isTablet ? 'text-sm' : 'text-sm'}`}
                            disabled={loading}
                          >
                            Password dimenticata?
                          </button>
                        </div>

                        <Button 
                          type="submit" 
                          className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white ${isTablet ? 'py-6' : 'py-6'}`}
                          disabled={loading}
                        >
                          {loading ? "Accesso in corso..." : "Accedi"}
                        </Button>

                        <div className="text-center pt-4 space-y-2">
                          <div>
                            <span className="text-gray-400">Non hai ancora un account? </span>
                            <Link to={createPageUrl("Register")} className="text-purple-400 font-medium hover:underline">
                              Registrati
                            </Link>
                          </div>
                          
                          <div className={isTablet ? 'text-sm' : 'text-sm'}>
                            <span className="text-gray-500">Ti sei registrato ma non hai ricevuto l'email di conferma? </span>
                            <button
                              type="button"
                              onClick={() => setShowResendVerificationModal(true)}
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                              disabled={loading}
                            >
                              Clicca qui per richiederne una nuova
                            </button>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Mobile Footer */}
          <footer className="bg-gray-950/80 backdrop-blur-sm text-white py-6 px-4 border-t border-purple-800/30">
            <div className="text-center text-sm text-gray-400">
              <p className="mb-2">© 2025 Karaokati. Tutti i diritti riservati.</p>
              <div className="flex justify-center gap-4">
                <Link to={createPageUrl("TermsOfService")} className="hover:text-white transition">Termini</Link>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        // Desktop Layout (originale)
        <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6 transition-all duration-300 ${
          showForgotPasswordModal || showResendVerificationModal ? 'blur-sm' : ''
        }`}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="w-full max-w-5xl relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="hidden md:block">
                <Link to={createPageUrl("Home")} className="inline-flex items-center gap-3 mb-8 group">
                  <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" />
                  <span className="text-purple-300 font-medium">Torna alla home</span>
                </Link>
                
                <div className="flex items-center gap-3 mb-8">
                  <img 
                    src="/logo2.png"
                    alt="Karaokati" 
                    className="h-10 w-auto"
                  />
                </div>

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

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
                    <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
                      <Music className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Gestione Completa</div>
                      <div className="text-sm text-gray-400">Dashboard professionale per DJ</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
                    <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
                      <Mic2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">QR Code Personale</div>
                      <div className="text-sm text-gray-400">Condividi e gestisci prenotazioni</div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-white">Accedi al tuo account</CardTitle>
                  <p className="text-gray-400 mt-2">Inserisci le tue credenziali per continuare</p>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
                        disabled={loading}
                        autoComplete="email"
                      />
                    </div>

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
                          onChange={(e) => handleInputChange('password', e.target.value)}
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

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setShowForgotPasswordModal(true)}
                        className="text-sm text-purple-400 hover:underline"
                        disabled={loading}
                      >
                        Password dimenticata?
                      </button>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
                      disabled={loading}
                    >
                      {loading ? "Accesso in corso..." : "Accedi"}
                    </Button>

                    <div className="text-center pt-4 space-y-2">
                      <div>
                        <span className="text-gray-400">Non hai ancora un account? </span>
                        <Link to={createPageUrl("Register")} className="text-purple-400 font-medium hover:underline">
                          Registrati
                        </Link>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-gray-500">Ti sei registrato ma non hai ricevuto l'email di conferma? </span>
                        <button
                          type="button"
                          onClick={() => setShowResendVerificationModal(true)}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                          disabled={loading}
                        >
                          Clicca qui per richiederne una nuova
                        </button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Desktop Footer */}
          <footer className="absolute bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-sm text-white py-6 px-6 border-t border-purple-800/30">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>© 2025 Karaokati. Tutti i diritti riservati.</p>
              <div className="flex gap-6">
                <Link to={createPageUrl("TermsOfService")} className="hover:text-white transition">Termini di servizio</Link>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Modals fuori dal div con blur */}
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