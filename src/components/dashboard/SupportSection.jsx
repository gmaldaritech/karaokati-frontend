import React from "react";
import { Heart, Coffee, Sparkles, ExternalLink, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SupportSection() {
  const BUYMEACOFFEE_LINK = "#";
  const PAYPAL_LINK = "https://www.paypal.com/donate/?hosted_button_id=N2MW8AJGQ6KN6&locale.x=it_IT&currency_code=EUR&country.x=IT";

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
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

      {/* Transparency Box */}
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

      {/* What donations help with */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold text-white mb-3 text-center">
          💜 Il tuo supporto è prezioso
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm">
          Le donazioni ci permettono di mantenere il servizio gratuito più a lungo e migliorarlo continuamente.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          {[
            { icon: "☁️", text: "Coprire i costi di hosting attuali" },
            { icon: "🚀", text: "Ritardare l'introduzione dei piani a pagamento" },
            { icon: "💪", text: "Sviluppare nuove funzionalità" },
            { icon: "🎁", text: "Offrire un piano gratuito più generoso in futuro" }
          ].map((item, idx) => (
            <div key={idx} className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 text-center">
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-gray-300 text-xs">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-300 text-sm font-medium">
          Ogni donazione, anche piccola, conta!
        </p>
      </div>

      {/* Donation Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* PayPal Card */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-600/50 p-6 hover:border-blue-500 transition-all">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">PayPal</h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              Sostieni il progetto con una donazione sicura tramite PayPal. 
              Qualsiasi importo è benvenuto!
            </p>
            <a href={PAYPAL_LINK} target="_blank" rel="noopener noreferrer">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5"
                disabled={PAYPAL_LINK === "#"}
              >
                <Heart className="w-5 h-5 mr-2" />
                Dona con PayPal
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </Card>

        {/* Buy Me a Coffee Card */}
        <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-600/50 p-6 opacity-60">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Buy Me a Coffee</h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              Offri un caffè virtuale con una donazione veloce e sicura. 
              Anche 2€ fanno la differenza!
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-5 opacity-70"
              disabled
            >
              <Coffee className="w-5 h-5 mr-2" />
              Prossimamente
            </Button>
          </div>
        </Card>
      </div>

      {/* Alternative ways to help */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          🤝 Anche senza donare puoi aiutare:
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">📣</div>
            <h3 className="text-lg font-semibold text-white mb-2">Condividi</h3>
            <p className="text-gray-400 text-sm">
              Parla di Karaokati ad altri DJ e fallo conoscere nelle tue serate
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-white mb-2">Feedback</h3>
            <p className="text-gray-400 text-sm">
              Lascia suggerimenti e segnala bug per aiutarci a migliorare
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎤</div>
            <h3 className="text-lg font-semibold text-white mb-2">Usa il servizio</h3>
            <p className="text-gray-400 text-sm">
              Più DJ usano Karaokati, più il progetto cresce e migliora
            </p>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-2xl p-6 text-center mb-10">
        <h2 className="text-xl font-bold text-white mb-3">
          🎤 Grazie alla community che sostiene Karaokati!
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Ogni donazione, grande o piccola, aiuta a mantenere vivo questo progetto 
          e a ritardare l'introduzione di piani a pagamento. Grazie per il tuo supporto! 💜
        </p>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-bold text-white text-center mb-4">
          ❓ Domande Frequenti
        </h2>
        <div className="space-y-3">
          <Card className="bg-gray-800/50 border-purple-800/30 p-4">
            <h3 className="font-semibold text-white mb-2 text-sm">
              Posso usare Karaokati senza donare?
            </h3>
            <p className="text-gray-300 text-sm">
              <strong className="text-green-400">Assolutamente sì!</strong> Karaokati è completamente gratuito. 
              Le donazioni sono puramente volontarie e non influenzano il tuo accesso.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-purple-800/30 p-4">
            <h3 className="font-semibold text-white mb-2 text-sm">
              Ci saranno piani a pagamento in futuro?
            </h3>
            <p className="text-gray-300 text-sm">
              Attualmente Karaokati è gratuito per permettere la massima diffusione. Se il progetto crescerà molto, 
              potremmo introdurre piani premium con funzionalità avanzate, ma il piano base resterà 
              sempre gratuito per tutti. Ti avviseremo con almeno 60 giorni di anticipo.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-purple-800/30 p-4">
            <h3 className="font-semibold text-white mb-2 text-sm">
              Quanto dovrei donare?
            </h3>
            <p className="text-gray-300 text-sm">
              Qualsiasi importo è apprezzato! Anche 2€ per un caffè virtuale fanno la differenza. 
              Tu decidi quanto e se donare, in base a quanto trovi utile Karaokati.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-purple-800/30 p-4">
            <h3 className="font-semibold text-white mb-2 text-sm">
              Le donazioni sono sicure?
            </h3>
            <p className="text-gray-300 text-sm">
              Sì! Usiamo piattaforme sicure e certificate (PayPal) per gestire le donazioni. 
              Non gestiamo direttamente carte di credito o dati di pagamento.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-purple-800/30 p-4">
            <h3 className="font-semibold text-white mb-2 text-sm">
              Posso perdere l'accesso se non dono?
            </h3>
            <p className="text-gray-300 text-sm">
              No! Le donazioni sono completamente volontarie e non influenzano il tuo accesso. 
              Se ti iscrivi ora, avrai accesso a tutte le funzionalità attuali gratuitamente, 
              indipendentemente dalle donazioni.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}