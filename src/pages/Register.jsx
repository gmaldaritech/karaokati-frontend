// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createPageUrl } from "@/utils";
// import { Mic2, User, Mail, Lock, Phone, ArrowLeft, Sparkles, Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useAuth } from "@/hooks/useAuth";
// import { toast } from "sonner";
// import EmailVerificationModal from "@/components/EmailVerificationModal";
// import ResendVerificationModal from "@/components/ResendVerificationModal";

// export default function Register() {
//   const { register, loading } = useAuth();
//   const navigate = useNavigate();

//   // State per modals
//   const [showVerificationModal, setShowVerificationModal] = useState(false);
//   const [showResendVerificationModal, setShowResendVerificationModal] = useState(false);
//   const [verificationData, setVerificationData] = useState({});
  
//   // State per visualizzazione password
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   useEffect(() => {
//     document.title = "Registrazione DJ - Karaokati | Crea Account Gratuito per Gestione Karaoke";
    
//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//       metaDescription.setAttribute("content", "Registrati gratis su Karaokati e ottieni il tuo QR code personale. Gestisci le tue serate karaoke con catalogo digitale e prenotazioni real-time.");
//     }
//   }, []);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     stageName: "",
//     phone: "",
//     acceptTerms: false
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("🚀 Tentativo registrazione:", formData);

//     // Validazioni manuali complete
//     if (!formData.fullName.trim()) {
//       toast.error("Il nome completo è obbligatorio");
//       return;
//     }

//     if (!formData.stageName.trim()) {
//       toast.error("Il nome d'arte DJ è obbligatorio");
//       return;
//     }

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

//     if (formData.password.length < 8) {
//       toast.error("La password deve essere di almeno 8 caratteri");
//       return;
//     }

//     if (!formData.confirmPassword) {
//       toast.error("Conferma la password");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Le password non coincidono");
//       return;
//     }

//     if (!formData.acceptTerms) {
//       toast.error("Devi accettare i termini e condizioni");
//       return;
//     }

//     try {
//       // Chiama la registrazione con il nostro backend
//       const result = await register({
//         full_name: formData.fullName,
//         stage_name: formData.stageName,
//         email: formData.email,
//         phone: formData.phone || null,
//         password: formData.password
//       });

//       console.log("✅ Registrazione completata:", result);
//       toast.success("Account creato! Controlla la tua posta.");
      
//       // NUOVO FLUSSO: Mostra modal invece di navigare
//       if (result.requires_verification) {
//         setVerificationData({
//           email: formData.email,
//           stageName: result.dj.stage_name
//         });
//         setShowVerificationModal(true);
//       } else {
//         // Fallback: se per qualche motivo non richiede verifica
//         toast.success(`Benvenuto ${result.dj.stage_name}! Account creato con successo.`);
//         navigate("/Dashboard");
//       }
      
//     } catch (error) {
//       // Gestisci errori specifici
//       if (error.message.includes("Email già registrata")) {
//         toast.error("Questa email è già registrata. Prova ad accedere invece.");
//       } else if (error.message.includes("Network Error") || error.message.includes("fetch")) {
//         toast.error("Impossibile connettersi al server. Verifica che il backend sia avviato.");
//       } else {
//         toast.error(error.message || "Errore durante la registrazione. Riprova.");
//       }
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleOpenResendModal = () => {
//     setShowVerificationModal(false);
//     setShowResendVerificationModal(true);
//   };

//   return (
//     <>
//       {/* Pagina con blur condizionale */}
//       <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6 transition-all duration-300 ${
//         showVerificationModal || showResendVerificationModal ? 'blur-sm' : ''
//       }`}>
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
//           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
//         </div>

//         <div className="w-full max-w-6xl relative z-10">
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div className="hidden md:block">
//               <Link to={createPageUrl("Home")} className="inline-flex items-center gap-3 mb-8 group">
//                 <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" />
//                 <span className="text-purple-300 font-medium">Torna alla home</span>
//               </Link>
              
//               {/* <div className="flex items-center gap-3 mb-6">
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
//                 Inizia la tua<br />
//                 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   avventura digitale
//                 </span>
//               </h1>

//               <p className="text-lg text-gray-300 mb-8">
//                 Registrati come DJ e ricevi immediatamente il tuo QR code personale. 
//                 Gestisci le tue serate karaoke in modo professionale.
//               </p>

//               <div className="space-y-4">
//                 {[
//                   "QR code personale incluso",
//                   "Gestione locali illimitata",
//                   "Catalogo fino a 80.000 brani",
//                   "Prenotazioni in tempo reale"
//                 ].map((feature, idx) => (
//                   <div key={idx} className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
//                       <Sparkles className="w-3 h-3 text-purple-400" />
//                     </div>
//                     <span className="text-gray-300">{feature}</span>
//                   </div>
//                 ))}
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
//                 <CardTitle className="text-2xl font-bold text-white">Crea il tuo account DJ</CardTitle>
//                 <p className="text-gray-400 mt-2">Compila i campi per iniziare</p>
//               </CardHeader>
              
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//                   <div className="space-y-2">
//                     <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-300">
//                       <User className="w-4 h-4 text-purple-400" />
//                       Nome completo
//                     </Label>
//                     <Input
//                       id="fullName"
//                       type="text"
//                       placeholder="Mario Rossi"
//                       value={formData.fullName}
//                       onChange={(e) => handleInputChange('fullName', e.target.value)}
//                       className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
//                       disabled={loading}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="stageName" className="flex items-center gap-2 text-gray-300">
//                       <Mic2 className="w-4 h-4 text-purple-400" />
//                       Nome d'arte DJ
//                     </Label>
//                     <Input
//                       id="stageName"
//                       type="text"
//                       placeholder="DJ Rossi"
//                       value={formData.stageName}
//                       onChange={(e) => handleInputChange('stageName', e.target.value)}
//                       className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
//                       disabled={loading}
//                     />
//                   </div>

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
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="phone" className="flex items-center gap-2 text-gray-300">
//                       <Phone className="w-4 h-4 text-purple-400" />
//                       Telefono
//                     </Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       placeholder="+39 333 1234567"
//                       value={formData.phone}
//                       onChange={(e) => handleInputChange('phone', e.target.value)}
//                       className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
//                       disabled={loading}
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
//                     <p className="text-xs text-gray-500">Minimo 8 caratteri</p>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-300">
//                       <Lock className="w-4 h-4 text-purple-400" />
//                       Conferma password
//                     </Label>
//                     <div className="relative">
//                       <Input
//                         id="confirmPassword"
//                         type={showConfirmPassword ? "text" : "password"}
//                         placeholder="••••••••"
//                         value={formData.confirmPassword}
//                         onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                         className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 pr-12"
//                         disabled={loading}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                         disabled={loading}
//                       >
//                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <Checkbox
//                       id="terms"
//                       checked={formData.acceptTerms}
//                       onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
//                       disabled={loading}
//                     />
//                     <Label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer leading-relaxed">
//                       Accetto i{" "}
//                       <a href="#" className="text-purple-400 hover:underline">
//                         termini e condizioni
//                       </a>{" "}
//                       e la{" "}
//                       <a href="#" className="text-purple-400 hover:underline">
//                         privacy policy
//                       </a>
//                     </Label>
//                   </div>

//                   <Button 
//                     type="submit" 
//                     className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
//                     disabled={!formData.acceptTerms || loading}
//                   >
//                     {loading ? "Creazione account..." : "Crea Account"}
//                   </Button>

//                   <div className="text-center pt-4">
//                     <span className="text-gray-400">Hai già un account? </span>
//                     <Link to={createPageUrl("Access")} className="text-purple-400 font-medium hover:underline">
//                       Accedi
//                     </Link>
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

//       {/* Modal Email Verification */}
//       <EmailVerificationModal 
//         isOpen={showVerificationModal}
//         onClose={() => setShowVerificationModal(false)}
//         email={verificationData.email}
//         stageName={verificationData.stageName}
//         onOpenResendModal={handleOpenResendModal}
//       />

//       {/* Modal Resend Verification */}
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

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  // State per device detection
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // State per modals
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showResendVerificationModal, setShowResendVerificationModal] = useState(false);
  const [verificationData, setVerificationData] = useState({});
  
  // State per visualizzazione password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLandscape, setIsLandscape] = useState(false);

  // useEffect(() => {
  //   const checkDevice = () => {
  //     const width = window.innerWidth;
  //     setIsMobile(width < 768);
  //     setIsTablet(width >= 768 && width < 1024);
  //   };
    
  //   checkDevice();
  //   window.addEventListener('resize', checkDevice);
    
  //   return () => window.removeEventListener('resize', checkDevice);
  // }, []);
  
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

  useEffect(() => {
    document.title = "Registrazione DJ - Karaokati | Crea Account Gratuito per Gestione Karaoke";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Registrati gratis su Karaokati e ottieni il tuo QR code personale. Gestisci le tue serate karaoke con catalogo digitale e prenotazioni real-time.");
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    stageName: "",
    phone: "",
    acceptTerms: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Tentativo registrazione:", formData);

    // Validazioni manuali complete
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
      // Chiama la registrazione con il nostro backend
      const result = await register({
        full_name: formData.fullName,
        stage_name: formData.stageName,
        email: formData.email,
        phone: formData.phone || null,
        password: formData.password
      });

      console.log("✅ Registrazione completata:", result);
      toast.success("Account creato! Controlla la tua posta.");
      
      // NUOVO FLUSSO: Mostra modal invece di navigare
      if (result.requires_verification) {
        setVerificationData({
          email: formData.email,
          stageName: result.dj.stage_name
        });
        setShowVerificationModal(true);
      } else {
        // Fallback: se per qualche motivo non richiede verifica
        toast.success(`Benvenuto ${result.dj.stage_name}! Account creato con successo.`);
        navigate("/Dashboard");
      }
      
    } catch (error) {
      // Gestisci errori specifici
      if (error.message.includes("Email già registrata")) {
        toast.error("Questa email è già registrata. Prova ad accedere invece.");
      } else if (error.message.includes("Network Error") || error.message.includes("fetch")) {
        toast.error("Impossibile connettersi al server. Verifica che il backend sia avviato.");
      } else {
        toast.error(error.message || "Errore durante la registrazione. Riprova.");
      }
    }
  };

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
          <Link to={createPageUrl("Access")} className="text-purple-300 hover:text-purple-100 px-3 py-1.5 rounded-lg hover:bg-purple-900/50 transition text-sm">
            Accedi
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
          <Link to={createPageUrl("Access")} className="text-purple-300 hover:text-purple-100 px-4 py-2 rounded-lg hover:bg-purple-900/50 transition">
            Accedi
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
        // Mobile/Tablet Layout
      <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 transition-all duration-300 ${
        showVerificationModal || showResendVerificationModal ? 'blur-sm' : ''
      }`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
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
              ? 'max-w-6xl' // Tablet landscape: contenitore più largo
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
                    Inizia la tua<br />
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      avventura digitale
                    </span>
                  </h1>
                  <p className="text-base lg:text-lg text-gray-300 mb-6">
                    Registrati come DJ e ricevi il tuo QR code personale per gestire le tue serate karaoke
                  </p>

                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {[
                      "QR code personale incluso",
                      "Gestione locali illimitata", 
                      "Catalogo fino a 80.000 brani",
                      "Prenotazioni in tempo reale"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Form compatta */}
                <div>
                  <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl font-bold text-white">
                        Crea il tuo account DJ
                      </CardTitle>
                      <p className="text-gray-400 text-sm">Compila i campi per iniziare</p>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-6">
                      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {/* Grid a due colonne per ottimizzare spazio */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor="fullName" className="text-gray-300 text-sm">
                              Nome completo
                            </Label>
                            <Input
                              id="fullName"
                              type="text"
                              placeholder="Mario Rossi"
                              value={formData.fullName}
                              onChange={(e) => handleInputChange('fullName', e.target.value)}
                              className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 h-9 text-sm"
                              disabled={loading}
                            />
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="stageName" className="text-gray-300 text-sm">
                              Nome d'arte DJ
                            </Label>
                            <Input
                              id="stageName"
                              type="text"
                              placeholder="DJ Rossi"
                              value={formData.stageName}
                              onChange={(e) => handleInputChange('stageName', e.target.value)}
                              className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 h-9 text-sm"
                              disabled={loading}
                            />
                          </div>
                        </div>

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
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="phone" className="text-gray-300 text-sm">
                            Telefono (opzionale)
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+39 333 1234567"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 h-9 text-sm"
                            disabled={loading}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
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
                            <p className="text-xs text-gray-500">Min. 8 caratteri</p>
                          </div>

                          <div className="space-y-1">
                            <Label htmlFor="confirmPassword" className="text-gray-300 text-sm">
                              Conferma password
                            </Label>
                            <div className="relative">
                              <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 pr-8 h-9 text-sm"
                                disabled={loading}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                disabled={loading}
                              >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="terms"
                            checked={formData.acceptTerms}
                            onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                            disabled={loading}
                          />
                          <Label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer leading-tight">
                            Accetto i{" "}
                            <Link to={createPageUrl("TermsOfService")} className="text-purple-400 hover:underline">
                              termini e condizioni
                            </Link>{" "}
                          </Label>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                          disabled={!formData.acceptTerms || loading}
                        >
                          {loading ? "Creazione account..." : "Crea Account"}
                        </Button>

                        <div className="text-center pt-2">
                          <span className="text-gray-400 text-sm">Hai già un account? </span>
                          <Link to={createPageUrl("Access")} className="text-purple-400 font-medium hover:underline text-sm">
                            Accedi
                          </Link>
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
                    Inizia la tua<br />
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      avventura digitale
                    </span>
                  </h1>
                  <p className={`text-gray-300 mb-6 text-center ${isTablet ? 'text-lg' : 'text-base'}`}>
                    Registrati come DJ e ricevi il tuo QR code personale
                  </p>

                  {/* Mobile features */}
                  <div className={`grid gap-3 mb-8 mx-auto ${isTablet ? 'grid-cols-2 max-w-lg' : 'grid-cols-1 max-w-md'}`}>
                    {[
                      "QR code personale incluso",
                      "Gestione locali illimitata", 
                      "Catalogo fino a 80.000 brani",
                      "Prenotazioni in tempo reale"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 justify-center">
                        <div className="w-5 h-5 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                        </div>
                        <span className={`text-gray-300 ${isTablet ? 'text-base' : 'text-sm'}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Card standard */}
                <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl mx-auto">
                  <CardHeader className={`text-center ${isTablet ? 'pb-8' : 'pb-6'}`}>
                    <CardTitle className={`font-bold text-white ${isTablet ? 'text-2xl' : 'text-xl'}`}>
                      Crea il tuo account DJ
                    </CardTitle>
                    <p className="text-gray-400 mt-2">Compila i campi per iniziare</p>
                  </CardHeader>
                  
                  <CardContent className={isTablet ? 'px-8 pb-8' : ''}>
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
                          disabled={loading}
                        />
                      </div>

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
                          onChange={(e) => handleInputChange('stageName', e.target.value)}
                          className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
                          disabled={loading}
                        />
                      </div>

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
                        />
                      </div>

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
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
                          disabled={loading}
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
                        <p className="text-xs text-gray-500">Minimo 8 caratteri</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-300">
                          <Lock className="w-4 h-4 text-purple-400" />
                          Conferma password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 pr-12"
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            disabled={loading}
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                          disabled={loading}
                        />
                        <Label htmlFor="terms" className={`cursor-pointer leading-relaxed text-gray-400 ${isTablet ? 'text-sm' : 'text-xs'}`}>
                          Accetto i{" "}
                          <Link to={createPageUrl("TermsOfService")} className="text-purple-400 hover:underline">
                            termini e condizioni
                          </Link>{" "}
                        </Label>
                      </div>

                      <Button 
                        type="submit" 
                        className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white ${isTablet ? 'py-6' : 'py-6'}`}
                        disabled={!formData.acceptTerms || loading}
                      >
                        {loading ? "Creazione account..." : "Crea Account"}
                      </Button>

                      <div className="text-center pt-4">
                        <span className="text-gray-400">Hai già un account? </span>
                        <Link to={createPageUrl("Access")} className="text-purple-400 font-medium hover:underline">
                          Accedi
                        </Link>
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
          showVerificationModal || showResendVerificationModal ? 'blur-sm' : ''
        }`}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
          </div>

          <div className="w-full max-w-6xl relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="hidden md:block">
                <Link to={createPageUrl("Home")} className="inline-flex items-center gap-3 mb-8 group">
                  <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" />
                  <span className="text-purple-300 font-medium">Torna alla home</span>
                </Link>
                
                <div className="flex items-center gap-3 mb-6">
                  <img 
                    src="/logo2.png"
                    alt="Karaokati" 
                    className="h-10 w-auto"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                  Inizia la tua<br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    avventura digitale
                  </span>
                </h1>

                <p className="text-lg text-gray-300 mb-8">
                  Registrati come DJ e ricevi immediatamente il tuo QR code personale. 
                  Gestisci le tue serate karaoke in modo professionale.
                </p>

                <div className="space-y-4">
                  {[
                    "QR code personale incluso",
                    "Gestione locali illimitata",
                    "Catalogo fino a 80.000 brani",
                    "Prenotazioni in tempo reale"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-purple-800/30 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-white">Crea il tuo account DJ</CardTitle>
                  <p className="text-gray-400 mt-2">Compila i campi per iniziare</p>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
                        disabled={loading}
                      />
                    </div>

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
                        onChange={(e) => handleInputChange('stageName', e.target.value)}
                        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
                        disabled={loading}
                      />
                    </div>

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
                      />
                    </div>

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
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600"
                        disabled={loading}
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
                      <p className="text-xs text-gray-500">Minimo 8 caratteri</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-300">
                        <Lock className="w-4 h-4 text-purple-400" />
                        Conferma password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="bg-gray-800/50 border-purple-800/50 text-white placeholder:text-gray-500 focus:border-purple-600 pr-12"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          disabled={loading}
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                        disabled={loading}
                        className="mt-0.5 w-5 h-5 border- border-purple-800/50 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-500"
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer leading-tight">
                        Accetto i{" "}
                        <Link to={createPageUrl("TermsOfService")} className="text-purple-400 hover:underline">
                          termini e condizioni
                        </Link>{" "}
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
                      disabled={!formData.acceptTerms || loading}
                    >
                      {loading ? "Creazione account..." : "Crea Account"}
                    </Button>

                    <div className="text-center pt-4">
                      <span className="text-gray-400">Hai già un account? </span>
                      <Link to={createPageUrl("Access")} className="text-purple-400 font-medium hover:underline">
                        Accedi
                      </Link>
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

      {/* Modal Email Verification */}
      <EmailVerificationModal 
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={verificationData.email}
        stageName={verificationData.stageName}
        onOpenResendModal={handleOpenResendModal}
      />

      {/* Modal Resend Verification */}
      <ResendVerificationModal 
        isOpen={showResendVerificationModal}
        onClose={() => setShowResendVerificationModal(false)}
      />
    </>
  );
}