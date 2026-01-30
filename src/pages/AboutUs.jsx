import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mic2, Heart, Users, Lightbulb, Target, Sparkles, Code, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  useEffect(() => {
    document.title = "Chi Siamo - Karaokati";
    window.scrollTo(0, 0);
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to={createPageUrl("Home")} onClick={handleLogoClick} className="flex items-center gap-3">
            <div className="flex items-center">
            <img 
              src="/logo.png"
              alt="Karaokati" 
              className="h-10 w-auto"
            />
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-6">
              <Heart className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                La nostra storia
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Chi siamo e{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                perché esistiamo
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Karaokati nasce dalla passione per la musica e dalla voglia di modernizzare 
              un settore troppo spesso ancorato a metodi tradizionali e inefficienti.
            </p>
          </div>

          {/* Story Section */}
          {/* <div className="bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-800/30 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Come è nato Karaokati
              </h2>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Tutto è iniziato con una frustrazione.</strong> Osservando i DJ karaoke 
                al lavoro, ci siamo resi conto di quanto tempo prezioso venisse sprecato gestendo bigliettini di carta, 
                riscrivendo nomi illeggibili e cercando canzoni in cataloghi cartacei disorganizzati.
              </p>

              <p>
                Nel 2024, in un'era dove ordiniamo taxi con un tap, gestiamo le nostre finanze da smartphone e 
                comunichiamo istantaneamente con chiunque nel mondo, sembrava assurdo che i DJ karaoke dovessero 
                ancora lavorare come negli anni '90.
              </p>

              <p className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                <strong className="text-purple-300">Così abbiamo deciso di cambiare le cose.</strong>
                <br /><br />
                Karaokati non è solo un'app, è una missione per portare dignità digitale a un settore che lo merita. 
                Vogliamo che ogni DJ possa presentarsi a una serata con la sicurezza di avere tutto sotto controllo, 
                con strumenti professionali che li facciano sentire orgogliosi del loro lavoro.
              </p>

              <p>
                Non siamo una grande azienda. Siamo un piccolo team di appassionati che crede nel potere della 
                tecnologia per migliorare la vita delle persone. Ogni feedback che riceviamo, ogni suggerimento, 
                ogni DJ che usa Karaokati ci motiva a continuare.
              </p>
            </div>
          </div> */}

          {/* Story Section */}
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-800/30 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Come è nato Karaokati
              </h2>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Come qualsiasi grande idea, tutto è iniziato da una necessità💡</strong> In questo caso non mia, 
                ma di mio papà a cui è dedicato il sito web, e che da qui in avanti chiamerò con il suo attuale nome d'arte: <strong className="text-purple-300">DJ Frank</strong> 🎧.
              </p>

              <p>
                La sua necessità era quella infatti di far sì che, durante le sue serate karaoke tra i vari locali, le persone 
                potessero in totale comodità sfogliare le canzoni presenti all'interno suo catalogo e prenotarle. Con DJ Frank 
                abbiamo passato diverse settimane, che dico, mesi, per capire quale potesse essere la migliore soluzione da proporre 
                durante le serate 🤔; qualsiasi momento libero, qualsiasi tragitto, che fosse casa - lavoro - supermercato, era buono 
                per parlarne e arrivare ad una quadra, era diventata una ossessione! 😅
              </p>

              <div className="space-y-4">
                <p>
                  Anche i vari siti web e piattaforme karaoke dell'epoca non permettevano nulla di ciò. 
                </p>
                
                <p>
                  Inizialmente immaginavamo di utilizzare un catalogo cartaceo da mettere a disposizione dei clienti (ma valle tu a stampare 15185 pagine) 😱
                </p>
                
                <p>
                  Poi si è pensato di utilizzare un computer dedicato riposto su un tavolo del locale e che mostrasse il catalogo; anche questa però non ci convinceva: la gente infatti doveva alzarsi per andare a prenotare, rendendo il tutto poco comodo 🚶‍♂️
                </p>
                
                <p>
                  Infine l'idea di acquistare più tablet da poter riporre sui vari tavoli dei locali (idea come potete immaginare poco conveniente economicamente) 💸
                </p>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-4">
                <p>
                  <strong className="text-purple-300">Allora unendo le forze 🤝</strong>, ovvero la spiccata fantasia ed inventiva di DJ Frank e le mia capacità 
                  di programmatore software siamo arrivati a qualcosa di più sofisticato: un servizio artigianale, un pò rudimentale ma 
                  funzionante che permetteva ai clienti tramite semplice scansione di un QR code di sfogliare il catalogo e prenotare! 📱✨
                </p>
              </div>
              <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                <p>
                  <strong className="text-white">Da quest'ultima idea, l'evoluzione! 🚀</strong>
                  <br /><br />
                  Una piattaforma completa, una web app dotata di area riservata per i DJ con gestione dei locali 
                  e del proprio catalogo, e un chatbot interattivo 🤖 che permette ai clienti di prenotare tramite smartphone senza alcuna 
                  registrazione permettendo al DJ di ricevere le prenotazioni in tempo reale ⚡, eliminando il fastidioso meccanismo dei 
                  bigliettini e foglietti volanti, il tutto per facilitare ancora di più sia l'esperienza utente che la gestione delle serate! 🎉🎤
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Vuoi far parte di questa rivoluzione?
            </h3>
            <p className="text-gray-400 mb-6">
              Unisciti alla community di Karaokati
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Register")}>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-6 text-lg">
                  Inizia Gratis Ora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-8 px-6 border-t border-purple-800/30 mt-12">
        <div className="max-w-5xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2026 Karaokati. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}