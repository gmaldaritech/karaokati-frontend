import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, Coffee, ArrowLeft, ExternalLink, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ============================================================================
// CONSTANTS
// ============================================================================

const DONATION_LINKS = {
  PAYPAL: "https://www.paypal.com/donate/?hosted_button_id=N2MW8AJGQ6KN6&locale.x=it_IT&currency_code=EUR&country.x=IT",
  BUYMEACOFFEE: "#"
};

const SUPPORT_BENEFITS = [
  { icon: "☁️", text: "Coprire i costi di hosting attuali" },
  { icon: "🚀", text: "Ritardare l'introduzione dei piani a pagamento" },
  { icon: "💪", text: "Sviluppare nuove funzionalità" },
  { icon: "🎁", text: "Offrire un piano gratuito più generoso in futuro" }
];

const ALTERNATIVE_HELP = [
  {
    icon: "📣",
    title: "Condividi",
    description: "Parla di Karaokati ad altri DJ e fallo conoscere nelle tue serate"
  },
  {
    icon: "💬",
    title: "Feedback",
    description: "Lascia suggerimenti e segnala bug per aiutarci a migliorare"
  },
  {
    icon: "🎤",
    title: "Usa il servizio",
    description: "Più DJ usano Karaokati, più il progetto cresce e migliora"
  }
];

const FAQ_ITEMS = [
  {
    question: "Posso usare Karaokati senza donare?",
    answer: (
      <>
        <strong className="text-green-400">Assolutamente sì!</strong> Karaokati è completamente gratuito. 
        Le donazioni sono puramente volontarie e non influenzano il tuo accesso.
      </>
    )
  },
  {
    question: "Ci saranno piani a pagamento in futuro?",
    answer: (
      <>
        Attualmente Karaokati è gratuito per permettere la massima diffusione. Se il progetto crescerà molto, 
        potremmo introdurre piani premium con funzionalità avanzate, ma il piano base resterà 
        sempre gratuito per tutti. Ti avviseremo con almeno 60 giorni di anticipo.
      </>
    )
  },
  {
    question: "Quanto dovrei donare?",
    answer: (
      <>
        Qualsiasi importo è apprezzato! Anche 2€ per un caffè virtuale fanno la differenza. 
        Tu decidi quanto e se donare, in base a quanto trovi utile Karaokati.
      </>
    )
  },
  {
    question: "Le donazioni sono sicure?",
    answer: (
      <>
        Sì! Usiamo piattaforme sicure e certificate (PayPal) per gestire le donazioni. 
        Non gestiamo direttamente carte di credito o dati di pagamento.
      </>
    )
  },
  {
    question: "Posso perdere l'accesso se non dono?",
    answer: (
      <>
        No! Le donazioni sono completamente volontarie e non influenzano il tuo accesso. 
        Se ti iscrivi ora, avrai accesso a tutte le funzionalità attuali gratuitamente, 
        indipendentemente dalle donazioni.
      </>
    )
  }
];

// ============================================================================
// HEADER COMPONENT
// ============================================================================

const Header = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to={createPageUrl("home")} onClick={handleLogoClick} className="flex items-center gap-3 group">
          {/* <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" /> */}
          <div className="flex items-center">
          <img 
            src="/logo.png"
            alt="Karaokati" 
            className="h-8 w-auto"
          />
          </div>
        </Link>
      </div>
    </header>
  );
};

// ============================================================================
// HERO SECTION
// ============================================================================

const HeroSection = () => (
  <div className="text-center mb-12">
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-6">
      <Heart className="w-4 h-4 text-purple-400" />
      <span className="text-sm font-medium text-purple-300">Supporto Volontario</span>
    </div>
    
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
      Sostieni lo sviluppo di{" "}
      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Karaokati
      </span>
    </h1>
    
    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
      Karaokati è <strong className="text-purple-300">gratuito durante la fase di crescita</strong>. 
      Se vuoi aiutarci a coprire i costi di server e sviluppo mentre il progetto cresce, 
      ogni donazione volontaria è molto apprezzata! 💜
    </p>
  </div>
);

// ============================================================================
// TRANSPARENCY BOX
// ============================================================================

const TransparencyBox = () => (
  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-2 border-blue-600/50 rounded-2xl p-6 mb-10">
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        <AlertCircle className="w-7 h-7 text-white" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white mb-3">
          Come funziona il nostro modello
        </h2>
        <p className="text-gray-200 leading-relaxed mb-3">
          Karaokati è completamente gratuito per permettere a DJ e locali di scoprirlo senza barriere.
        </p>
        <p className="text-gray-200 text-sm leading-relaxed mb-3">
          Quando il progetto crescerà e i costi di infrastruttura aumenteranno, 
          introdurremo un modello freemium sostenibile:
        </p>
        <ul className="space-y-2 mb-3">
          <li className="flex items-center gap-3 text-gray-200 text-sm">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            Piano Gratuito con funzionalità base
          </li>
          <li className="flex items-center gap-3 text-gray-200 text-sm">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            Piano Pro a pagamento con funzionalità avanzate
          </li>
        </ul>
        <div className="bg-blue-900/40 border border-blue-700/50 rounded-lg p-3">
          <p className="text-blue-200 text-sm">
            <strong>Importante:</strong> Ti avviseremo con almeno 60 giorni di anticipo prima di qualsiasi cambio.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// SUPPORT BENEFITS
// ============================================================================

const SupportBenefitsCard = ({ icon, text }) => (
  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 text-center">
    <div className="text-xl mb-1">{icon}</div>
    <p className="text-gray-300 text-xs">{text}</p>
  </div>
);

const SupportBenefits = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 mb-10">
    <h2 className="text-xl font-bold text-white mb-3 text-center">
      💜 Il tuo supporto è prezioso
    </h2>
    <p className="text-gray-300 text-center mb-6 text-sm">
      Le donazioni ci permettono di mantenere il servizio gratuito più a lungo e migliorarlo continuamente.
    </p>
    <div className="grid md:grid-cols-2 gap-3 mb-4">
      {SUPPORT_BENEFITS.map((item, idx) => (
        <SupportBenefitsCard key={idx} {...item} />
      ))}
    </div>
    <p className="text-center text-gray-300 text-sm font-medium">
      Ogni donazione, anche piccola, conta!
    </p>
  </div>
);

// ============================================================================
// DONATION CARDS
// ============================================================================

const DonationCard = ({ platform, icon: Icon, title, description, link, disabled = false }) => {
  const isPayPal = platform === 'paypal';
  const colorClasses = isPayPal 
    ? 'from-blue-900/50 to-indigo-900/50 border-blue-600/50 hover:border-blue-500'
    : 'from-yellow-900/50 to-orange-900/50 border-yellow-600/50';
  
  const buttonClasses = isPayPal
    ? 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
    : 'from-yellow-600 to-orange-600';

  const iconBgClasses = isPayPal
    ? 'from-blue-600 to-indigo-600'
    : 'from-yellow-600 to-orange-600';

  return (
    <Card className={`bg-gradient-to-br ${colorClasses} border-2 p-6 transition-all ${disabled ? 'opacity-60' : ''}`}>
      <div className="text-center">
        <div className={`w-16 h-16 bg-gradient-to-br ${iconBgClasses} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 leading-relaxed text-sm">
          {description}
        </p>
        {disabled ? (
          <Button 
            className={`w-full bg-gradient-to-r ${buttonClasses} text-white py-5 opacity-70`}
            disabled
          >
            <Icon className="w-5 h-5 mr-2" />
            Prossimamente
          </Button>
        ) : (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Button 
              className={`w-full bg-gradient-to-r ${buttonClasses} text-white py-5`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {isPayPal ? 'Dona con PayPal' : 'Offrimi un Caffè'}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        )}
      </div>
    </Card>
  );
};

const DonationOptions = () => (
  <div className="grid md:grid-cols-2 gap-6 mb-10">
    <DonationCard
      platform="paypal"
      icon={Heart}
      title="PayPal"
      description="Sostieni il progetto con una donazione sicura tramite PayPal. Qualsiasi importo è benvenuto!"
      link={DONATION_LINKS.PAYPAL}
    />
    <DonationCard
      platform="coffee"
      icon={Coffee}
      title="Buy Me a Coffee"
      description="Offri un caffè virtuale con una donazione veloce e sicura. Anche 2€ fanno la differenza!"
      link={DONATION_LINKS.BUYMEACOFFEE}
      disabled={true}
    />
  </div>
);

// ============================================================================
// ALTERNATIVE HELP
// ============================================================================

const AlternativeHelpCard = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const AlternativeHelp = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 mb-10">
    <h2 className="text-xl font-bold text-white mb-6 text-center">
      🤝 Anche senza donare puoi aiutare:
    </h2>
    <div className="grid md:grid-cols-3 gap-6">
      {ALTERNATIVE_HELP.map((item, idx) => (
        <AlternativeHelpCard key={idx} {...item} />
      ))}
    </div>
  </div>
);

// ============================================================================
// COMMUNITY SECTION
// ============================================================================

const CommunitySection = () => (
  <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-2xl p-6 text-center mb-10">
    <h2 className="text-xl font-bold text-white mb-3">
      🎤 Grazie alla community che sostiene Karaokati!
    </h2>
    <p className="text-gray-300 leading-relaxed">
      Ogni donazione, grande o piccola, aiuta a mantenere vivo questo progetto 
      e a ritardare l'introduzione di piani a pagamento. Grazie per il tuo supporto! 💜
    </p>
  </div>
);

// ============================================================================
// FAQ SECTION
// ============================================================================

const FAQCard = ({ question, answer }) => (
  <Card className="bg-gray-800/50 border-purple-800/30 p-4">
    <h3 className="font-semibold text-white mb-2 text-sm">
      {question}
    </h3>
    <p className="text-gray-300 text-sm">
      {answer}
    </p>
  </Card>
);

const FAQSection = () => (
  <div>
    <h2 className="text-xl font-bold text-white text-center mb-4">
      ❓ Domande Frequenti
    </h2>
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, idx) => (
        <FAQCard key={idx} {...item} />
      ))}
    </div>
  </div>
);

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

const Footer = () => (
  <footer className="bg-gray-950 text-white py-8 px-4 md:px-6 border-t border-purple-800/30 mt-12">
    <div className="max-w-5xl mx-auto text-center text-gray-400 text-sm">
      <p>© 2026 Karaokati. Tutti i diritti riservati.</p>
      <p className="mt-2">Grazie per il tuo supporto! 💜</p>
    </div>
  </footer>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Support() {
  useEffect(() => {
    document.title = "Sostieni Karaokati - Supporto Volontario";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-32 pb-12">
        <HeroSection />
        <TransparencyBox />
        <SupportBenefits />
        <DonationOptions />
        <AlternativeHelp />
        <CommunitySection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}