import React from "react";
import { Heart, Coffee, Sparkles, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SupportSection() {
  // TODO: Sostituire questi link con quelli reali
  const BUYMEACOFFEE_LINK = "https://buymeacoffee.com/karaokati"; // Inserire link Buy Me a Coffee
  const PAYPAL_LINK = "#"; // Inserire link PayPal

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-4">
          <Heart className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">Supporto Volontario</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Aiuta a mantenere Karaokati{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            vivo e gratuito
          </span>
        </h1>
        
        <p className="text-lg text-gray-300 leading-relaxed">
          Karaokati è e rimarrà sempre <strong className="text-purple-300">100% gratuito</strong> per tutti. 
          Se ti piace e vuoi aiutare a coprire i costi di server e sviluppo, 
          una donazione volontaria è molto apprezzata! 💜
        </p>
      </div>

      {/* Il Servizio Rimane Gratuito Box */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-2 border-green-600/50 rounded-2xl p-6 mb-10">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              Il servizio è e rimarrà sempre gratuito
            </h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              Non devi pagare nulla per usare Karaokati. Tutte le funzionalità sono accessibili a tutti, 
              senza limiti, senza abbonamenti, senza costi nascosti.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-gray-200">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                Nessuna funzionalità premium esclusiva
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                Nessuna differenza tra chi dona e chi non dona
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                Il servizio resta identico per tutti
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Donation Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Buy Me a Coffee Card */}
        <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-600/50 p-6 hover:border-yellow-500 transition-all">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Buy Me a Coffee</h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              Offri un caffè virtuale con una donazione veloce e sicura. 
              Anche 2€ fanno la differenza!
            </p>
            <a href={BUYMEACOFFEE_LINK} target="_blank" rel="noopener noreferrer">
              <Button 
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-5"
                disabled={BUYMEACOFFEE_LINK === "#"}
              >
                <Coffee className="w-5 h-5 mr-2" />
                Offrimi un Caffè
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
            {BUYMEACOFFEE_LINK === "#" && (
              <p className="text-xs text-gray-400 mt-2">
                Link in arrivo
              </p>
            )}
          </div>
        </Card>

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
            {PAYPAL_LINK === "#" && (
              <p className="text-xs text-gray-400 mt-2">
                Link in arrivo
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Transparency Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          💰 A cosa servono le donazioni?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">☁️</div>
            <h3 className="text-lg font-semibold text-white mb-2">Server</h3>
            <p className="text-gray-400 text-sm">
              Hosting, database e infrastruttura cloud per mantenere il servizio online 24/7
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔧</div>
            <h3 className="text-lg font-semibold text-white mb-2">Sviluppo</h3>
            <p className="text-gray-400 text-sm">
              Tempo dedicato a nuove funzionalità, bug fix e miglioramenti continui
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="text-lg font-semibold text-white mb-2">Supporto</h3>
            <p className="text-gray-400 text-sm">
              Email, assistenza tecnica e risposta alle richieste della community
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
          Ogni donazione, grande o piccola, aiuta a mantenere vivo questo progetto. 
          Anche se non puoi donare, puoi aiutare condividendo Karaokati con altri DJ 
          e lasciando un feedback per migliorarlo sempre di più.
        </p>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          ❓ Domande Frequenti
        </h2>
        <div className="space-y-3">
          <Card className="bg-gray-800/50 border-purple-800/30 p-4">
            <h3 className="font-semibold text-white mb-2 text-sm">
              Se non dono, posso usare Karaokati?
            </h3>
            <p className="text-gray-300 text-sm">
              <strong className="text-green-400">Assolutamente sì!</strong> Karaokati è e rimarrà sempre 100% gratuito. 
              Non c'è nessuna differenza tra chi dona e chi non dona.
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
              Sì! Usiamo piattaforme sicure e certificate (Buy Me a Coffee e PayPal) per gestire le donazioni. 
              Non gestiamo direttamente carte di credito o dati di pagamento.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-purple-800/30 p-4">
            <h3 className="font-semibold text-white mb-2 text-sm">
              Posso donare in altro modo?
            </h3>
            <p className="text-gray-300 text-sm">
              Puoi aiutare anche senza donare: condividi Karaokati con altri DJ, 
              lascia un feedback per migliorarlo, o semplicemente continua a usarlo 
              e parla bene del progetto!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}