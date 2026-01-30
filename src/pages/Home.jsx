import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Heart, Mic2, QrCode, Music, Sparkles, Clock, Users, 
  Check, ArrowRight, ChevronLeft, ChevronRight, Coffee, 
  MapPin, Calendar, MessageSquare, LayoutDashboard, 
  AlertCircle, ChevronDown, ArrowLeft 
} from "lucide-react";

// ============================================================================
// HOOKS & STATE MANAGEMENT
// ============================================================================

const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet };
};

// ============================================================================
// HEADER COMPONENTS
// ============================================================================

const MobileHeader = () => (
  <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-purple-800/30 z-50 lg:hidden">
    <div className="px-4 py-3 flex justify-between items-center">
      <img src="/logo.png" alt="Karaokati" className="h-9 w-auto" />
      <div className="flex items-center gap-3">
        <Link to={createPageUrl("login")}>
          <a className="text-purple-300 hover:text-purple-100 px-3 py-1.5 rounded-lg hover:bg-purple-900/50 transition text-sm">
            Accedi
          </a>
        </Link>
        <Link to={createPageUrl("register")}>
          <a className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
            Registrati Gratis
          </a>
        </Link>
      </div>
    </div>
  </header>
);

const DesktopHeader = () => (
  <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 z-50 hidden lg:block">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <img src="/logo.png" alt="Karaokati" className="h-10 w-auto" />
      <div className="flex items-center gap-4">
        <Link to={createPageUrl("login")}>
          <a className="text-purple-300 hover:text-purple-100 px-4 py-2 rounded-lg hover:bg-purple-900/50 transition">
            Accedi
          </a>
        </Link>
        <Link to={createPageUrl("register")}>
          <a className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg transition">
            Registrati Gratis
          </a>
        </Link>
      </div>
    </div>
  </header>
);

// ============================================================================
// HERO COMPONENTS
// ============================================================================

const HeroFeatureCards = ({ isTablet }) => {
  if (isTablet) {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl rounded-full" />
        <div className="relative bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-800/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* QR Code Card */}
            <div className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-none rounded-xl">
              <QrCode className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">QR Code</h3>
              <p className="text-purple-100">Ogni DJ ha il suo codice personale</p>
            </div>
            
            {/* Music Card */}
            <div className="p-6 bg-gradient-to-br from-pink-600 to-pink-700 text-white border-none rounded-xl">
              <Music className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">80.000+</h3>
              <p className="text-pink-100">Titoli dei tuoi brani</p>
            </div>
            
            {/* Clock Card */}
            <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none rounded-xl">
              <Clock className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Real-time</h3>
              <p className="text-blue-100">Prenotazioni istantanee</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Mobile version
  return (
    <>
      {/* QR Code */}
      <div className="p-4 bg-purple-900/30 backdrop-blur-sm rounded-xl border border-purple-800/30">
        <QrCode className="w-8 h-8 mb-2 mx-auto text-purple-400" />
        <h3 className="text-sm font-bold text-white mb-1">QR Code</h3>
        <p className="text-xs text-purple-200">Personale</p>
      </div>
      
      {/* Music */}
      <div className="p-4 bg-pink-900/30 backdrop-blur-sm rounded-xl border border-pink-800/30">
        <Music className="w-8 h-8 mb-2 mx-auto text-pink-400" />
        <h3 className="text-sm font-bold text-white mb-1">Catalogo</h3>
        <p className="text-xs text-pink-200">Digitale</p>
      </div>
      
      {/* Clock */}
      <div className="p-4 bg-blue-900/30 backdrop-blur-sm rounded-xl border border-blue-800/30">
        <Clock className="w-8 h-8 mb-2 mx-auto text-blue-400" />
        <h3 className="text-sm font-bold text-white mb-1">Prenotazioni</h3>
        <p className="text-xs text-blue-200">Real-time</p>
      </div>
      
      {/* Users */}
      <div className="p-4 bg-green-900/30 backdrop-blur-sm rounded-xl border border-green-800/30">
        <Users className="w-8 h-8 mb-2 mx-auto text-green-400" />
        <h3 className="text-sm font-bold text-white mb-1">Chatbot</h3>
        <p className="text-xs text-green-200">Integrato</p>
      </div>
    </>
  );
};

const MobileHero = ({ isTablet }) => (
  <section className={`pt-20 pb-12 px-4 lg:hidden ${isTablet ? 'pt-24 pb-16' : ''}`}>
    <div className={`text-center ${isTablet ? 'max-w-4xl mx-auto' : ''}`}>
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-purple-900/50 border border-purple-700/50 rounded-full mb-4 ${isTablet ? 'px-4 py-2 mb-6' : ''}`}>
        <Sparkles className={`text-purple-400 ${isTablet ? 'w-4 h-4' : 'w-3 h-3'}`} />
        <span className={`font-medium text-purple-300 ${isTablet ? 'text-sm' : 'text-xs'}`}>
          Gestisci il tuo karaoke in modo professionale
        </span>
      </div>
      
      <h1 className={`font-bold mb-4 leading-tight text-white ${isTablet ? 'text-5xl mb-6' : 'text-3xl'}`}>
        Addio ai{" "}
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          bigliettini
        </span>
        <br />
        {isTablet ? 'Benvenuto al futuro del karaoke' : 'Karaoke digitale'}
      </h1>
      
      <p className={`text-gray-300 mb-6 leading-relaxed px-2 ${isTablet ? 'text-lg mb-8 max-w-3xl mx-auto px-0' : ''}`}>
        Karaokati è la piattaforma italiana che rivoluziona le serate karaoke per DJ professionisti. 
        Crea il tuo catalogo digitale, distribuisci il tuo QR code personale e ricevi prenotazioni 
        in tempo reale tramite un chatbot integrato. Completamente gratuito.
      </p>

      <div className={`space-y-3 mb-8 ${isTablet ? 'flex flex-col sm:flex-row gap-4 justify-center space-y-0' : ''}`}>
        <Link to={createPageUrl("register")}>
          <a className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition inline-flex items-center justify-center gap-2 ${isTablet ? 'px-8 py-4 text-lg' : 'block px-6 py-3'}`}>
            Inizia Gratis
            {isTablet && <ArrowRight className="w-5 h-5" />}
          </a>
        </Link>
      </div>

      <div className={isTablet ? 'mt-16 relative' : 'grid grid-cols-2 gap-3'}>
        <HeroFeatureCards isTablet={isTablet} />
      </div>
    </div>
  </section>
);

const DesktopHero = () => (
  <section className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">
            Gestisci il tuo karaoke in modo professionale
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
          Addio ai{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            bigliettini
          </span>
          <br />
          Benvenuto al futuro del karaoke
        </h1>
        
        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
          Karaokati è la piattaforma italiana che rivoluziona le serate karaoke per DJ professionisti. 
          Gestisci prenotazioni in tempo reale con QR code, crea il tuo catalogo digitale e ricevi 
          prenotazioni tramite un chatbot integrato.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl("register")}>
            <a className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center justify-center gap-2 transition">
              Inizia Gratis
              <ArrowRight className="w-5 h-5" />
            </a>
          </Link>
        </div>

        <div className="mt-16 relative">
          <HeroFeatureCards isTablet={true} />
        </div>
      </div>
    </div>
  </section>
);

// ============================================================================
// OVERVIEW SECTION
// ============================================================================

const OverviewCard = ({ icon, title, description, color }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6 text-center">
    <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{title}</h3>
    <p className="text-sm md:text-base text-gray-400">{description}</p>
  </div>
);

const OverviewSection = ({ isTablet }) => {
  const overviewCards = [
    {
      icon: <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>,
      title: "Niente più bigliettini",
      description: "Elimina carta, penna e la confusione di tenere traccia manualmente delle prenotazioni",
      color: "from-red-600 to-orange-600"
    },
    {
      icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Tutto in tempo reale",
      description: "Le prenotazioni arrivano istantaneamente sulla tua dashboard",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      title: "Esperienza migliore",
      description: "I tuoi clienti prenotano facilmente dal telefono, senza aspettare in fila e senza installare nulla",
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <section className="pt-4 md:pt-6 pb-6 md:pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-4 md:mb-6">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
            <span className="text-xs md:text-sm font-medium text-purple-300">La Rivoluzione Digitale</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
            Dimentica carta e penna.{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              È tutto digitale
            </span>
          </h2>
          <p className="text-sm md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 md:mb-12">
            Basta con i bigliettini che si perdono, la confusione delle prenotazioni scritte a mano 
            e le code interminabili. Karaokati porta le tue serate karaoke nell'era digitale.
          </p>
        </div>

        <div className={`grid gap-6 md:gap-8 mb-8 md:mb-16 ${isTablet ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-3'}`}>
          {overviewCards.map((card, idx) => (
            <OverviewCard key={idx} {...card} />
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-700/50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
          <p className="text-sm md:text-xl text-gray-200 leading-relaxed">
            <strong className="text-white">In pratica:</strong> i tuoi clienti scansionano il tuo{" "}
            <strong className="text-purple-300">QR code personale</strong>, cercano la canzone nel tuo 
            catalogo digitale e prenotano via chatbot in <strong className="text-purple-300">pochi secondi</strong>. 
            Tu ricevi tutto sulla tua dashboard, accetti o rifiuti con un tap.{" "}
            <strong className="text-purple-300">Zero stress, massima professionalità</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// CAROUSEL DATA & MOCKUPS
// ============================================================================

const SLIDES_DATA = [
  {
    id: 1,
    step: "1",
    icon: MapPin,
    title: "Aggiungi i Tuoi Locali",
    subtitle: "Registrati e aggiungi i locali",
    description: "Dopo la registrazione, aggiungi i locali dove organizzi le serate karaoke. Avvia la serata con un semplice click quando arrivi al locale.",
    features: ["Registrazione gratuita in 30 secondi", "Aggiungi locali illimitati", "Avvia la serata con un click"],
    color: "from-blue-600 to-blue-700",
    borderColor: "border-blue-600/50"
  },
  {
    id: 2,
    step: "2",
    icon: Music,
    title: "Carica il Catalogo",
    subtitle: "Costruisci il tuo repertorio digitale",
    description: "Carica i titoli delle tue canzoni in tre modi: importa da Excel, genera automaticamente, oppure aggiungi manualmente.",
    features: ["Importazione massiva da Excel", "Generazione automatica da cartelle", "Ricerca istantanea full-text"],
    color: "from-orange-600 to-orange-700",
    borderColor: "border-orange-600/50"
  },
  {
    id: 3,
    step: "3",
    icon: MessageSquare,
    title: "Clienti Prenotano",
    subtitle: "I clienti prenotano via chatbot",
    description: "I clienti scansionano il tuo QR code e accedono al chatbot. Cercano la canzone, scelgono la tonalità e prenotano in pochi secondi. Nessuna app da scaricare, funziona dal browser.",
    features: ["QR code personale per ogni DJ", "Ricerca istantanea nel catalogo", "Selezione tonalità personalizzata"],
    color: "from-pink-600 to-pink-700",
    borderColor: "border-pink-600/50"
  },
  {
    id: 4,
    step: "4",
    icon: Calendar,
    title: "Gestisci Prenotazioni",
    subtitle: "Accetta e gestisci le richieste",
    description: "Ricevi le prenotazioni in tempo reale nella tua dashboard. Accetta, rifiuta o aggiungi prenotazioni manuali. Esporta la lista in Excel per tenerla sempre a portata di mano o per usarla come Borderò.",
    features: ["Notifiche in tempo reale", "Accetta o rifiuta con un tap", "Esporta la lista in Excel"],
    color: "from-green-600 to-green-700",
    borderColor: "border-green-600/50"
  },
  {
    id: 5,
    step: "5",
    icon: LayoutDashboard,
    title: "Dashboard Completa",
    subtitle: "Tutto sotto controllo",
    description: "Una dashboard completa per gestire la tua serata. Crea i tuoi locali, gestisci il catalogo, monitora le prenotazioni in tempo reale e scarica il tuo QR code personale.",
    features: ["QR Code personale scaricabile", "Gestione catalogo semplificata", "Gestione delle prenotazioni"],
    color: "from-purple-600 to-purple-700",
    borderColor: "border-purple-600/50"
  }
];

const SlideMockup = ({ slideId, isTablet }) => {
  const isMobileSize = !isTablet && window.innerWidth < 768;

  // Step 1: Venues
  if (slideId === 1) {
    if (isMobileSize || isTablet) {
      return (
        <div className="w-full max-w-xs mx-auto">
          <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 p-4">
            <h4 className="text-lg font-bold text-white mb-4 text-center">I Tuoi Locali</h4>
            <div className="space-y-3">
              {[
                { name: "Locale Rock", active: true },
                { name: "Blue Moon Bar", active: false }
              ].map((venue, idx) => (
                <div key={idx} className={`p-3 rounded-lg border ${venue.active ? 'bg-green-900/20 border-green-700/50' : 'bg-gray-900/50 border-purple-800/30'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-white text-sm font-medium">{venue.name}</span>
                    </div>
                    <div className={`w-8 h-4 rounded-full ${venue.active ? 'bg-green-600' : 'bg-gray-600'} relative`}>
                      <div className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transition-all ${venue.active ? 'right-0.5' : 'left-0.5'}`} />
                    </div>
                  </div>
                  {venue.active && (
                    <div className="text-xs text-green-400 mt-1">● Serata Avviata</div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-3 rounded-lg text-sm font-medium">
              + Aggiungi Locale
            </button>
          </div>
        </div>
      );
    }
    // Desktop
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-bold text-white">I Tuoi Locali</h4>
            <p className="text-sm text-gray-400">Gestisci i luoghi delle tue serate</p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">
            + Aggiungi
          </div>
        </div>
        <div className="space-y-4">
          {[
            { name: "Locale Rock", address: "Via Roma 123", active: true },
            { name: "Blue Moon Bar", address: "Piazza Dante 45", active: false }
          ].map((venue, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${venue.active ? 'bg-green-900/20 border-green-700/50' : 'bg-gray-900/50 border-purple-800/30'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{venue.name}</div>
                    <div className="text-sm text-gray-400">{venue.address}</div>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full ${venue.active ? 'bg-green-600' : 'bg-gray-600'} relative`}>
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${venue.active ? 'right-0.5' : 'left-0.5'}`} />
                </div>
              </div>
              {venue.active && (
                <div className="text-sm text-green-400 font-medium">● Serata Avviata</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Catalog
  if (slideId === 2) {
    if (isMobileSize || isTablet) {
      return (
        <div className="w-full max-w-xs mx-auto">
          <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Catalogo</h4>
              <div className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">+ Aggiungi</div>
            </div>
            <p className="text-xs text-gray-400 mb-3">1.250 brani</p>
            <div className="mb-3">
              <div className="flex items-center gap-2 bg-gray-900/50 border border-purple-800/30 rounded-lg px-3 py-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-gray-500 text-xs">Cerca...</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { artist: "Modugno", title: "Volare" },
                { artist: "Jovanotti", title: "Bella" }
              ].map((song, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-gray-900/50 rounded-lg border border-purple-800/20">
                  <Music className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{song.artist}</div>
                    <div className="text-gray-400 text-xs truncate">{song.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    // Desktop
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-bold text-white">Catalogo Canzoni</h4>
            <p className="text-sm text-gray-400">1.250 brani nel tuo catalogo</p>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-2 bg-gray-700 rounded-lg text-white text-sm">Importa</div>
            <div className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">+ Aggiungi</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-3 bg-gray-900/50 border border-purple-800/30 rounded-lg px-4 py-3">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-gray-500">Cerca nel catalogo...</span>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { artist: "Domenico Modugno", title: "Volare - Nel Blu Dipinto di Blu" },
            { artist: "Jovanotti", title: "Bella - Radio Edit" },
            { artist: "Umberto Tozzi", title: "Gloria - Original Version" }
          ].map((song, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-purple-800/20">
              <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Music className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">{song.artist}</div>
                <div className="text-sm text-gray-400 truncate">{song.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Step 3: Chatbot
  if (slideId === 3) {
    if (isMobileSize || isTablet) {
      return (
        <div className="w-full max-w-xs mx-auto">
          <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3">
              <div className="flex items-center gap-2">
                <Mic2 className="w-5 h-5 text-white" />
                <div>
                  <div className="text-white text-sm font-bold">Karaokati Bot</div>
                  <div className="text-purple-100 text-xs">Locale Rock 🎤</div>
                </div>
              </div>
            </div>
            <div className="p-3 space-y-3 min-h-[120px]">
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mic2 className="w-3 h-3 text-white" />
                </div>
                <div className="bg-gray-800 border border-purple-800/30 rounded-lg px-2 py-1 max-w-[80%]">
                  <p className="text-gray-200 text-xs">🎤 Ciao! Benvenuto! Cerca una canzone scrivendo il titolo o l'artista!</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-2 py-1 max-w-[60%]">
                  <p className="text-white text-xs">Volare</p>
                </div>
              </div>
              <div className="bg-gray-800/90 border border-purple-700/40 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-gray-200 text-xs font-medium">Modugno - Volare</div>
                    <div className="text-gray-400 text-xs">Tap per prenotare</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Desktop
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/80 rounded-2xl border border-purple-800/30 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Mic2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">Karaokati Assistant</div>
                <div className="text-sm text-purple-100">Locale Rock • Serata avviata 🎤</div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4 bg-gray-900 min-h-[300px]">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Mic2 className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-800 border border-purple-800/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <p className="text-gray-200">🎤 Ciao! Benvenuto! Cerca una canzone scrivendo il titolo o l'artista!</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                <p className="text-white">Modugno</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Mic2 className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-3">
                <div className="bg-gray-800 border border-purple-800/30 rounded-2xl rounded-tl-sm px-4 py-3">
                  <p className="text-gray-200">🔍 Ho trovato 2 canzoni!</p>
                </div>
                <div className="bg-gray-800/90 border border-purple-700/40 rounded-xl p-3 hover:bg-gray-800 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-gray-200 font-medium">Domenico Modugno - Volare</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/90 border border-purple-700/40 rounded-xl p-3 hover:bg-gray-800 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-gray-200 font-medium">Domenico Modugno - Tre briganti Tre somari</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Bookings
  if (slideId === 4) {
    if (isMobileSize || isTablet) {
      return (
        <div className="w-full max-w-xs mx-auto">
          <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Prenotazioni</h4>
              <div className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded text-white text-xs">
                +
              </div>
            </div>
            <div className="space-y-2">
              {[
                { name: "Marco", song: "Volare", status: "pending" },
                { name: "Laura", song: "Bella", status: "accepted" }
              ].map((booking, idx) => (
                <div key={idx} className={`p-2 rounded-lg border ${booking.status === 'pending' ? 'bg-yellow-900/20 border-yellow-700/50' : 'bg-green-900/20 border-green-700/50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-6 h-6 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-purple-400">{booking.name[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="text-white text-xs font-medium truncate">{booking.name}</div>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${booking.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-green-900/50 text-green-300'}`}>
                            {booking.status === 'pending' ? 'In Attesa' : 'Accettata'}
                          </span>
                        </div>
                        <div className="text-gray-400 text-xs truncate">{booking.song}</div>
                      </div>
                    </div>
                    {booking.status === 'pending' && (
                      <div className="w-6 h-6 bg-green-900/50 rounded flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    // Desktop
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Prenotazioni</h4>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Locale: <span className="text-purple-400">Locale Rock</span></span>
            </div>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">
            + Prenota
          </div>
        </div>
        <div className="space-y-3">
          {[
            { name: "Marco", song: "Volare - Modugno", status: "pending", time: "2 min fa" },
            { name: "Laura", song: "Bella - Jovanotti", status: "pending", time: "5 min fa" },
            { name: "Giuseppe", song: "Gloria - Tozzi", status: "accepted", time: "8 min fa" }
          ].map((booking, idx) => (
            <div key={idx} className={`p-4 bg-gray-900/50 rounded-xl border ${booking.status === 'pending' ? 'border-yellow-700/50' : 'border-purple-800/20'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-purple-400">{booking.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white truncate">{booking.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${booking.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-green-900/50 text-green-300'}`}>
                        {booking.status === 'pending' ? 'In Attesa' : 'Accettata'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 truncate">{booking.song}</div>
                    <div className="text-xs text-gray-500 mt-1">{booking.time}</div>
                  </div>
                </div>
                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <div className="w-9 h-9 bg-green-900/50 hover:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Step 5: Dashboard
  if (slideId === 5) {
    if (isMobileSize || isTablet) {
      return (
        <div className="w-full max-w-xs mx-auto">
          <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 p-4">
            <h4 className="text-lg font-bold text-white mb-4 text-center">Dashboard</h4>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-800/50 border border-purple-800/30 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-white">1.250</div>
                <div className="text-xs text-gray-400">Canzoni</div>
              </div>
              <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-green-400">Attivo</div>
                <div className="text-xs text-gray-400">Locale</div>
              </div>
              <div className="bg-gray-800/50 border border-purple-800/30 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-white">12</div>
                <div className="text-xs text-gray-400">Richieste</div>
              </div>
              <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-2 text-center">
                <QrCode className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <div className="text-xs text-gray-400">QR Code</div>
              </div>
            </div>
            <div className="flex gap-2">
              {[LayoutDashboard, MapPin, Music, Calendar].map((Icon, idx) => (
                <div key={idx} className={`flex-1 p-2 rounded-lg flex items-center justify-center ${idx === 0 ? 'bg-purple-900/50 border border-purple-700/50' : 'bg-gray-800/50'}`}>
                  <Icon className={`w-5 h-5 ${idx === 0 ? 'text-purple-400' : 'text-gray-500'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    // Desktop
    return (
      <div className="w-full">
        <div className="bg-gray-900/80 rounded-2xl border border-purple-800/30 overflow-hidden">
          <div className="flex">
            <div className="w-20 bg-gray-900 border-r border-purple-800/30 p-4 space-y-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
                <Mic2 className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-4 pt-4">
                {[LayoutDashboard, MapPin, Music, Calendar].map((Icon, idx) => (
                  <div key={idx} className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto ${idx === 0 ? 'bg-purple-900/50 border border-purple-700/50' : 'hover:bg-gray-800 cursor-pointer'}`}>
                    <Icon className={`w-6 h-6 ${idx === 0 ? 'text-purple-400' : 'text-gray-500'}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-6 bg-gray-900/50">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-1">Panoramica</h4>
                <p className="text-sm text-gray-400">Vista generale della tua attività</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">1.250</div>
                  <div className="text-xs text-gray-400">Canzoni</div>
                </div>
                <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-400 mb-1">Attivo</div>
                  <div className="text-xs text-gray-400">Locale Rock</div>
                </div>
                <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">12</div>
                  <div className="text-xs text-gray-400">Prenotazioni</div>
                </div>
              </div>
              <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-4">
                <div className="text-sm font-medium text-white mb-3">QR Code Personale</div>
                <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// ============================================================================
// CAROUSEL COMPONENT
// ============================================================================

const CarouselNavigation = ({ currentSlide, totalSlides, onPrev, onNext, onGoTo }) => (
  <>
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        onClick={onPrev}
        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 border border-purple-800/30 rounded-full flex items-center justify-center"
      >
        <ChevronLeft className="w-5 h-5 text-purple-400" />
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'w-6 bg-gradient-to-r from-purple-600 to-pink-600' 
                : 'w-2 bg-gray-700'
            }`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 border border-purple-800/30 rounded-full flex items-center justify-center"
      >
        <ChevronRight className="w-5 h-5 text-purple-400" />
      </button>
    </div>

    <div className="text-center mt-4">
      <span className="text-gray-400 text-sm">
        {currentSlide + 1} di {totalSlides}
      </span>
    </div>
  </>
);

const HowItWorksCarousel = ({ isTablet }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="py-12 px-4 lg:py-20 lg:px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white flex items-baseline justify-center gap-2 md:gap-3">
            Trasforma le tue serate
            <Mic2 className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-purple-400 animate-pulse translate-y-[3px] md:translate-y-[4px] lg:translate-y-[5px]" />
          </h2>
          <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto">
            {isTablet || window.innerWidth < 768 ? '5 semplici passaggi per la rivoluzione digitale' : 'Segui questi 5 semplici passaggi per rivoluzionare le tue serate karaoke'}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto lg:max-w-7xl">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {SLIDES_DATA.map((slide) => {
                const Icon = slide.icon;
                const isMobile = window.innerWidth < 768;
                
                return (
                  <div key={slide.id} className="w-full flex-shrink-0 px-2 md:px-4">
                    <div className={`bg-gray-800/50 backdrop-blur-sm border-2 ${slide.borderColor} rounded-2xl md:rounded-3xl overflow-hidden ${isMobile || isTablet ? 'min-h-[500px]' : 'p-8 md:p-12 min-h-[680px]'} flex flex-col`}>
                      
                      {isMobile || isTablet ? (
                        /* Mobile/Tablet Layout */
                        <>
                          <div className="p-4 border-t border-purple-800/30">
                            <div className="text-center mb-3">
                              <div className="flex items-center justify-center gap-2 mb-8">
                                <div className={`w-8 h-8 bg-gradient-to-br ${slide.color} rounded-full flex items-center justify-center`}>
                                  <span className="text-white font-bold text-sm">{slide.step}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white">{slide.title}</h3>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                {slide.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Mockup */}
                          <div className={`p-4 flex items-center justify-center ${isTablet ? 'min-h-[280px]' : 'min-h-[200px]'}`}>
                            <SlideMockup slideId={slide.id} isTablet={isTablet} />
                          </div>
                        </>
                      ) : (
                        /* Desktop Layout */
                        <div className="grid md:grid-cols-2 gap-16 items-center flex-1">
                          {/* Content */}
                          <div className={slide.id % 2 === 0 ? 'order-1' : 'order-2'}>
                            <div className="flex items-center gap-4 mb-6">
                              <div className={`w-16 h-16 bg-gradient-to-br ${slide.color} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                                {slide.step}
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <Icon className="w-6 h-6 text-white" />
                                  <h3 className="text-3xl font-bold text-white">{slide.title}</h3>
                                </div>
                                <p className="text-gray-400">{slide.subtitle}</p>
                              </div>
                            </div>

                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                              {slide.description}
                            </p>

                            <ul className="space-y-4">
                              {slide.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-300">
                                  <div className={`w-6 h-6 bg-gradient-to-br ${slide.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-lg">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Visual Mock */}
                          <div className={slide.id % 2 === 0 ? 'order-2' : 'order-1'}>
                            <div className="bg-gray-900/70 rounded-2xl border border-purple-800/30 p-8 min-h-[400px] flex items-center justify-center">
                              <SlideMockup slideId={slide.id} isTablet={false} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop arrows */}
          {!isTablet && window.innerWidth >= 1024 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-gray-800/90 hover:bg-gray-700 border border-purple-800/40 rounded-full flex items-center justify-center transition z-10"
              >
                <ChevronLeft className="w-7 h-7 text-purple-400" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-gray-800/90 hover:bg-gray-700 border border-purple-800/40 rounded-full flex items-center justify-center transition z-10"
              >
                <ChevronRight className="w-7 h-7 text-purple-400" />
              </button>
            </>
          )}

          {/* Mobile/Tablet Navigation */}
          {(isTablet || window.innerWidth < 1024) && (
            <CarouselNavigation
              currentSlide={currentSlide}
              totalSlides={SLIDES_DATA.length}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoTo={goToSlide}
            />
          )}

          {/* Desktop Step Counter */}
          {!isTablet && window.innerWidth >= 1024 && (
            <div className="text-center mt-6">
              <span className="text-gray-400">
                Step <span className="text-white font-bold">{currentSlide + 1}</span> di <span className="text-white font-bold">{SLIDES_DATA.length}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// PRICING & FAQ COMPONENTS
// ============================================================================

const PricingCard = ({ isTablet }) => (
  <div className={`bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-4 border-purple-500 relative overflow-hidden shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 ${isTablet ? 'max-w-2xl mx-auto' : ''}`}>
    <div className="absolute -right-12 top-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-16 py-2 rotate-45 font-bold text-sm shadow-lg z-10">
      GRATIS ORA
    </div>
    
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse" />
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
    
    <div className="relative">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
          <div className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl ${isTablet ? 'w-14 h-14' : 'w-10 h-10 lg:w-16 lg:h-16'}`}>
            <Sparkles className={`text-white ${isTablet ? 'w-7 h-7' : 'w-5 h-5 lg:w-9 lg:h-9'}`} />
          </div>
          <h3 className={`font-bold text-white mb-0 ${isTablet ? 'text-2xl' : 'text-lg lg:text-3xl'}`}>
            Piano Illimitato
          </h3>
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-2 md:gap-3 mb-6 md:mb-8`}>
        {[
          "Locali illimitati",
          "Fino a 80.000 titoli",
          "Importazione massiva Excel",
          "Generazione catalogo automatica",
          "QR Code personalizzati",
          "Chatbot integrato"
        ].map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-purple-900/40 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 border border-purple-700/30">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-green-400/30">
              <Check className="w-3 h-3 md:w-3 md:h-3 text-green-400" />
            </div>
            <span className="text-gray-100 font-medium text-xs md:text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <Link to={createPageUrl("register")}>
        <a className={`block w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 hover:from-green-600 hover:via-emerald-600 hover:to-green-600 text-white font-bold rounded-xl text-center shadow-xl transition hover:scale-[1.02] mb-3 md:mb-4 ${isTablet ? 'py-5 text-xl' : 'py-4 text-lg lg:py-5 lg:text-xl'}`}>
          <span className="inline-flex items-center justify-center gap-2">
            <Sparkles className={`animate-pulse ${isTablet ? 'w-5 h-5' : 'w-4 h-4 lg:w-5 lg:h-5'}`} />
            Inizia Gratis Ora
            <ArrowRight className={isTablet ? 'w-5 h-5' : 'w-4 h-4 lg:w-5 lg:h-5'} />
          </span>
        </a>
      </Link>

      <p className="text-center text-purple-100 text-[10px] md:text-xs">
        Nessuna carta richiesta • Setup in 2 minuti
      </p>
    </div>
  </div>
);

const FAQSection = ({ isTablet }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-center mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 mx-auto transition ${isTablet ? 'text-base' : 'text-sm lg:text-base'}`}
      >
        <span className="text-base">Clicca per scoprire di più</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-6 md:mt-8 space-y-4 md:space-y-6 text-left">
          {/* Come funziona il nostro modello */}
          <div className="p-4 md:p-5 bg-gray-800/50 border border-gray-700/50 rounded-xl">
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <div className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 ${isTablet ? 'w-8 h-8' : 'w-6 h-6 lg:w-8 lg:h-8'}`}>
                <AlertCircle className={`text-white ${isTablet ? 'w-4 h-4' : 'w-3 h-3 lg:w-4 lg:h-4'}`} />
              </div>
              <h4 className={`font-bold text-white ${isTablet ? 'text-lg' : 'text-base lg:text-lg'}`}>
                📢 Come funziona il nostro modello
              </h4>
            </div>
            
            <div className={`space-y-2 md:space-y-3 text-gray-300 leading-relaxed ${isTablet ? 'text-base' : 'text-sm lg:text-base'}`}>
              <p>
                Attualmente Karaokati è <strong className="text-white">completamente gratuito</strong> per permettere 
                a DJ e locali di scoprirlo e testarlo senza barriere.
              </p>
              <p>
                Mantenere i server attivi e sviluppare nuove funzionalità ha costi reali che crescono 
                con ogni nuovo utente. Per rendere il progetto sostenibile nel tempo, abbiamo bisogno 
                del supporto della community attraverso donazioni volontarie o, in futuro, piani a pagamento.
              </p>
              <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-3 mt-2 md:mt-3">
                <p className={`text-purple-200 ${isTablet ? 'text-sm' : 'text-xs lg:text-sm'}`}>
                  <strong>Il nostro impegno:</strong> ti avviseremo con almeno <strong>60 giorni di anticipo</strong> prima 
                  di qualsiasi cambio, così potrai decidere con calma quale piano scegliere.
                </p>
              </div>
              <p className="text-purple-300">
                💜 Più DJ usano e supportano Karaokati, più il progetto può crescere e rimanere accessibile per tutti!
              </p>
            </div>
          </div>

          {/* FAQ 1 */}
          <div className="p-4 md:p-5 bg-gray-800/50 border border-gray-700/50 rounded-xl">
            <h4 className={`font-bold text-white mb-2 md:mb-3 ${isTablet ? 'text-lg' : 'text-base lg:text-lg'}`}>
              ❓ Posso aiutare a mantenere il servizio gratis più a lungo?
            </h4>
            <p className={`text-gray-300 leading-relaxed ${isTablet ? 'text-base' : 'text-sm lg:text-base'}`}>
              Sì! Le donazioni volontarie ci permettono di coprire i costi di infrastruttura e 
              ritardare l'introduzione dei piani a pagamento. Anche condividere Karaokati con 
              altri DJ aiuta moltissimo: più siamo, più il progetto può crescere in modo sostenibile!
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 md:p-5 bg-gray-800/50 border border-gray-700/50 rounded-xl">
            <h4 className={`font-bold text-white mb-2 md:mb-3 ${isTablet ? 'text-lg' : 'text-base lg:text-lg'}`}>
              ❓ Perché questa trasparenza?
            </h4>
            <p className={`text-gray-300 leading-relaxed ${isTablet ? 'text-base' : 'text-sm lg:text-base'}`}>
              Crediamo nell'onestà. Troppi servizi promettono "gratis per sempre" e poi cambiano 
              le carte in tavola senza preavviso. Preferiamo dirti fin da subito come funziona: 
              gratuito ora, sostenibile in futuro grazie al supporto della community o con piani 
              a pagamento. Il futuro di Karaokati dipende da quanto la community lo supporta! 💜
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SUPPORT SECTION
// ============================================================================

const SupportSection = ({ isTablet }) => (
  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-700/40 p-6 md:p-8 lg:p-10 rounded-2xl">
    <div className="text-center mb-6 md:mb-8">
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className={`bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg ${isTablet ? 'w-12 h-12' : 'w-10 h-10 lg:w-14 lg:h-14'}`}>
          <Heart className={`text-white ${isTablet ? 'w-6 h-6' : 'w-5 h-5 lg:w-7 lg:h-7'}`} />
        </div>
        <h3 className={`font-bold text-white ${isTablet ? 'text-2xl' : 'text-xl lg:text-2xl lg:text-3xl'}`}>
          Supporta il progetto
        </h3>
      </div>
      
      <p className={`text-gray-300 leading-relaxed mb-4 max-w-2xl mx-auto ${isTablet ? 'text-sm' : 'text-xs lg:text-base'}`}>
        Karaokati è gratuito, ma mantenere i server attivi e sviluppare nuove 
        funzionalità ha dei costi reali che crescono con ogni nuovo DJ.
      </p>
      
      <p className={`text-gray-400 mb-3 md:mb-4 ${isTablet ? 'text-sm' : 'text-xs lg:text-sm'}`}>
        Il tuo supporto volontario ci aiuta a:
      </p>
      
      <div className="grid grid-cols-2 gap-2 mb-4 max-w-2xl mx-auto">
        {[
          { icon: "☁️", text: "Coprire i costi di hosting" },
          { icon: "🚀", text: "Ritardare i piani a pagamento" },
          { icon: "💪", text: "Sviluppare nuove funzionalità" },
          { icon: "🎁", text: "Servizio accessibile per tutti" }
        ].map((item, idx) => (
          <div key={idx} className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-2 md:p-3 text-center">
            <div className={`mb-1 ${isTablet ? 'text-xl' : 'text-lg lg:text-xl'}`}>{item.icon}</div>
            <p className={`text-gray-300 leading-tight ${isTablet ? 'text-xs' : 'text-[10px] lg:text-xs'}`}>{item.text}</p>
          </div>
        ))}
      </div>

      <p className={`text-gray-400 mb-4 md:mb-6 ${isTablet ? 'text-sm' : 'text-xs lg:text-sm'}`}>
        Ogni contributo, anche piccolo, fa la differenza!
      </p>
    </div>

    {/* Donation buttons */}
    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6 max-w-2xl mx-auto">
      <a 
        href="https://www.paypal.com/donate/?hosted_button_id=N2MW8AJGQ6KN6&locale.x=it_IT&currency_code=EUR&country.x=IT" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-600/50 p-3 md:p-4 rounded-xl hover:border-blue-500 transition text-center block"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-1 md:mb-2">
          <div className={`bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center ${isTablet ? 'w-8 h-8' : 'w-6 h-6 lg:w-10 lg:h-10'}`}>
            <Heart className={`text-white ${isTablet ? 'w-4 h-4' : 'w-3 h-3 lg:w-5 lg:h-5'}`} />
          </div>
          <h4 className={`font-bold text-white ${isTablet ? 'text-base' : 'text-sm lg:text-lg'}`}>PayPal</h4>
        </div>
        <p className={`text-blue-300 ${isTablet ? 'text-xs' : 'text-[10px] lg:text-xs'}`}>Donazione facoltativa</p>
      </a>
      
      <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-600/30 p-3 md:p-4 rounded-xl opacity-60 text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-1 md:mb-2">
          <div className={`bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center ${isTablet ? 'w-8 h-8' : 'w-6 h-6 lg:w-10 lg:h-10'}`}>
            <Coffee className={`text-white ${isTablet ? 'w-4 h-4' : 'w-3 h-3 lg:w-5 lg:h-5'}`} />
          </div>
          <h4 className={`font-bold text-white ${isTablet ? 'text-base' : 'text-sm lg:text-lg'}`}>Buy Me a Coffee</h4>
        </div>
        <p className={`text-yellow-300 opacity-70 ${isTablet ? 'text-xs' : 'text-[10px] lg:text-xs'}`}>Prossimamente</p>
      </div>
    </div>

    {/* Alternative ways to help */}
    <div className="text-center">
      <p className={`text-gray-400 mb-2 md:mb-3 ${isTablet ? 'text-sm' : 'text-xs lg:text-sm'}`}>
        Anche senza donare puoi aiutare:
      </p>
      <div className={`flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-2 ${isTablet ? 'text-sm' : 'text-xs lg:text-sm'}`}>
        <span className="text-gray-300">📣 Condividi con altri DJ</span>
        <span className="text-gray-300">💬 Lascia feedback</span>
        <span className="text-gray-300">🎤 Usalo nelle tue serate</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

const Footer = () => (
  <footer className="bg-gray-950 text-white py-12 px-6 border-t border-purple-800/30">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-1">
          <img src="/logo.png" alt="Karaokati" className="h-8 w-auto" />
          <p className="text-gray-400 text-sm mt-6">
            La piattaforma italiana numero uno per DJ karaoke professionisti
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:col-span-3">
          <div>
            <h4 className="font-bold mb-4">Prodotto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Funzionalità</a></li>
              <li><Link to={createPageUrl("register")} className="hover:text-white transition">Registrati</Link></li>
              <li><Link to={createPageUrl("login")} className="hover:text-white transition">Accedi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Supporto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to={createPageUrl("support")} className="hover:text-white transition">Fai una donazione</Link></li>
              <li><Link to={createPageUrl("suggestions")} className="hover:text-white transition">Suggerimenti</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Informazioni</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to={createPageUrl("about-us")} className="hover:text-white transition">Chi siamo</Link></li>
              <li><Link to={createPageUrl("terms")} className="hover:text-white transition">Termini di servizio</Link></li>
              <li><Link to={createPageUrl("terms")} className="hover:text-white transition">Contatti</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
        <p className="text-sm">© 2026 Karaokati. Tutti i diritti riservati.</p>
      </div>
    </div>
  </footer>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HomeCarousel() {
  const { isMobile, isTablet } = useDeviceDetection();

  useEffect(() => {
    document.title = "Karaokati - Piattaforma Professionale per Gestione Karaoke | QR Code e Prenotazioni Real-time";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <MobileHeader />
      <DesktopHeader />

      {(isMobile || isTablet) ? (
        <>
          <MobileHero isTablet={isTablet} />
          <OverviewSection isTablet={isTablet} />
          <HowItWorksCarousel isTablet={isTablet} />
          <section className="py-12 px-4 lg:hidden">
            <div className="text-center mb-8">
              <h2 className={`font-bold mb-2 text-white ${isTablet ? 'text-3xl' : 'text-2xl'}`}>
                Un Solo Piano: Tutto Incluso
              </h2>
              <p className={`text-gray-400 ${isTablet ? 'text-lg' : 'text-base'}`}>
                🚀 Gratis mentre cresciamo insieme 🚀
              </p>
            </div>
            <PricingCard isTablet={isTablet} />
            <FAQSection isTablet={isTablet} />
            <div className="mt-6">
              <SupportSection isTablet={isTablet} />
            </div>
          </section>

          {/* Mobile CTA */}
          <section className="py-12 px-4 lg:hidden bg-gray-900/50">
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white p-8 text-center rounded-xl max-w-2xl mx-auto">
              <h2 className={`font-bold mb-4 ${isTablet ? 'text-3xl' : 'text-2xl'}`}>
                Pronto a rivoluzionare le tue serate?
              </h2>
              <p className={`text-purple-100 mb-6 ${isTablet ? 'text-base' : 'text-sm'}`}>
                Unisciti alla community di Karaokati
              </p>
              <Link to={createPageUrl("register")}>
                <a className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg transition font-medium">
                  Registrati Ora - È Gratis
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
          </section>
        </>
      ) : (
        <>
          <DesktopHero />
          <OverviewSection isTablet={false} />
          <HowItWorksCarousel isTablet={false} />
          
          {/* Desktop Pricing */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Un Solo Piano: Tutto Incluso
                </h2>
                <p className="text-xl text-gray-400">
                  🚀 Gratis mentre cresciamo insieme 🚀
                </p>
              </div>
              <div className="max-w-3xl mx-auto mb-12">
                <PricingCard isTablet={false} />
              </div>
              <FAQSection isTablet={false} />
              <div className="max-w-3xl mx-auto mt-8">
                <SupportSection isTablet={false} />
              </div>
            </div>
          </section>

          {/* Desktop CTA */}
          <section className="py-20 px-6 bg-gray-900/50">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white p-12 md:p-16 text-center border-none rounded-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Pronto a rivoluzionare le tue serate?
                </h2>
                <p className="text-xl mb-8 text-purple-100">
                  Unisciti alla community di Karaokati
                </p>
                <Link to={createPageUrl("register")}>
                  <a className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-lg px-10 py-6 rounded-lg transition">
                    Registrati Ora - È Gratis
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
