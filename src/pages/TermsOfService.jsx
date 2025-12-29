import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Mic2, FileText, Shield, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Termini e Condizioni di Servizio - Karaokati";
    window.scrollTo(0, 0);
  }, []);

  const Section = ({ number, title, children }) => (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-3 py-1 rounded-full">
          Art. {number}
        </span>
        {title}
      </h2>
      <div className="text-gray-300 leading-relaxed space-y-4 pl-4 border-l-2 border-purple-800/50">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
                <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" />
                <div className="flex items-center">
                <img 
                  src="/logo2.png"
                  alt="Karaokati" 
                  className="h-8 w-auto"
                />
                </div>
              </Link>
            </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Document Header */}
        <div className="text-center mb-12 pb-8 border-b border-purple-800/30">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-6">
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Linee Guida</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Condizioni d'Uso di Karaokati
          </h1>
          
          <p className="text-lg text-purple-300 mb-6">
            Piattaforma gratuita per la gestione di serate karaoke
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="bg-gray-800/50 px-3 py-1 rounded-full">
              Ultimo aggiornamento: 10 Dicembre 2024
            </span>
          </div>
        </div>

        {/* Preambolo */}
        <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <FileText className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <p className="text-gray-300 leading-relaxed">
              Karaokati è un progetto personale gratuito creato per aiutare DJ e appassionati di karaoke 
              a gestire le proprie serate in modo digitale. Utilizzando questa piattaforma, accetti di 
              seguire queste semplici linee guida per garantire un'esperienza positiva per tutti.
            </p>
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-8">
          <Section number="1" title="Cos'è Karaokati">
            <p>Karaokati è una piattaforma web gratuita che ti permette di:</p>
            <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
              <li>Gestire digitalmente le tue serate karaoke</li>
              <li>Organizzare il tuo catalogo musicale</li>
              <li>Ricevere prenotazioni in tempo reale</li>
              <li>Generare QR code personalizzati per i tuoi clienti</li>
              <li>Utilizzare un chatbot per facilitare le prenotazioni</li>
            </ul>
            <p className="mt-4 text-purple-300">
              La piattaforma è completamente gratuita e rimarrà tale. Chi lo desidera può sostenere 
              volontariamente il progetto, ma il servizio rimane identico per tutti.
            </p>
          </Section>

          <Section number="2" title="Chi Può Usare Karaokati">
            <p>Karaokati è pensato principalmente per DJ e organizzatori di serate karaoke, ma può essere utilizzato da chiunque voglia organizzare eventi di questo tipo.</p>
            <p className="mt-3">Per registrarti hai bisogno di:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li>Un indirizzo email valido</li>
              <li>Un numero di telefono dove poter essere contattato in caso di necessità</li>
            </ul>
          </Section>

          <Section number="3" title="Account e Sicurezza">
            <p>Quando ti registri:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Fornisci dati veri (almeno l'email deve essere corretta per la verifica)</li>
              <li>Custodisci la tua password e non condividerla con altri</li>
              <li>Sei responsabile di tutto ciò che accade con il tuo account</li>
              <li>Se noti attività sospette, cambia subito la password</li>
            </ul>
            <p className="mt-4 text-yellow-300">
              💡 Consiglio: Usa una password sicura e diversa da quella che usi per altri servizi.
            </p>
          </Section>

          <Section number="4" title="Cosa Puoi e Non Puoi Fare">
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 mb-4">
              <p className="font-semibold text-green-400 mb-2">✅ PUOI:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Usare Karaokati per organizzare serate karaoke</li>
                <li>Caricare il catalogo delle tue canzoni</li>
                <li>Gestire prenotazioni dei tuoi clienti</li>
                <li>Usare tutte le funzionalità disponibili</li>
              </ul>
            </div>
            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
              <p className="font-semibold text-red-400 mb-2">❌ NON PUOI:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                <li>Tentare di hackerare o danneggiare la piattaforma</li>
                <li>Caricare contenuti illegali, offensivi o inappropriati</li>
                <li>Usare il servizio per spam o attività illecite</li>
                <li>Copiare o rubare il codice della piattaforma</li>
                <li>Creare account falsi o multipli per abusare del servizio</li>
              </ul>
            </div>
            <p className="mt-4 text-purple-300">
              <strong>⚠️ Diritto d'autore:</strong> Tu sei responsabile di avere i permessi necessari 
              per usare le canzoni dei titoli che carichi (es. licenze SIAE/SCF se applicabili). Karaokati non 
              fornisce né gestisce licenze musicali.
            </p>
          </Section>

          <Section number="5" title="Le Tue Responsabilità">
            <p>Usando Karaokati, tu sei responsabile per:</p>
            <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
              <li>I contenuti che carichi (titoli, artisti, cataloghi)</li>
              <li>Rispettare le leggi sul diritto d'autore del tuo paese</li>
              <li>L'uso che fai della piattaforma</li>
              <li>Mantenere al sicuro il tuo account</li>
            </ul>
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mt-4">
              <p className="text-yellow-300">
                <strong>Importante:</strong> Karaokati è solo uno strumento tecnologico. Non siamo responsabili 
                per come lo usi o per eventuali problemi legali che potrebbero derivare dal tuo utilizzo. 
                Se qualcuno ti fa causa per qualcosa che hai fatto con Karaokati, è una cosa tra te e loro.
              </p>
            </div>
          </Section>

          <Section number="6" title="Privacy e Dati">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">I tuoi dati sono al sicuro</span>
            </div>

            <p className="mb-4">Karaokati raccoglie solo i dati essenziali per funzionare:</p>

            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="font-medium text-purple-300 mb-2">📧 Cosa Raccogliamo:</p>
                <ul className="text-sm space-y-1 ml-4 list-disc list-inside">
                  <li>Email (per login e comunicazioni)</li>
                  <li>Nome (facoltativo, per personalizzazione)</li>
                  <li>Catalogo canzoni che carichi</li>
                  <li>Prenotazioni ricevute</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <p className="text-green-300 mb-2">✅ NON raccogliamo o condividiamo:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                  <li>Dati sensibili personali</li>
                  <li>Informazioni di pagamento (il servizio è gratuito)</li>
                  <li>Dati di navigazione per marketing</li>
                  <li>Le tue informazioni con terze parti</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <p className="text-blue-300 mb-2">🍪 Cookie Tecnici:</p>
                <p className="text-gray-300 text-sm">
                  Usiamo solo cookie necessari per farti accedere e mantenere la sessione attiva. 
                  Niente pubblicità, niente tracciamento, niente profilazione.
                </p>
              </div>

              <div>
                <p className="font-semibold text-white mb-2">I Tuoi Diritti</p>
                <p className="text-gray-300 text-sm">
                  Puoi sempre vedere, modificare o eliminare i tuoi dati dalla dashboard. 
                  Se vuoi cancellare completamente l'account, scrivici e lo faremo subito.
                </p>
              </div>
            </div>
          </Section>

          <Section number="7" title="I Tuoi Contenuti">
            <p className="text-white mb-3">
              <strong>Le canzoni e i dati che carichi rimangono tuoi.</strong>
            </p>
            <p>Quando carichi il tuo catalogo o gestisci prenotazioni:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Tu mantieni tutti i diritti sui tuoi contenuti</li>
              <li>Noi li usiamo solo per fornirti il servizio</li>
              <li>Non li vendiamo o condividiamo con nessuno</li>
              <li>Puoi eliminarli quando vuoi</li>
            </ul>
          </Section>

          <Section number="8" title="Limitazioni e Disclaimer">
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-4">
              <p className="text-yellow-300 leading-relaxed">
                ⚠️ <strong>Karaokati è fornito "così com'è"</strong> - è un progetto gratuito gestito da un gruppo di persone nel tempo libero.
              </p>
            </div>
            
            <p>Questo significa che:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Non posso garantire che funzioni sempre al 100%</li>
              <li>Potrebbero esserci bug o interruzioni del servizio</li>
              <li>Potrei fare manutenzione senza preavviso</li>
              <li>Faccio del mio meglio, ma non ho obblighi legali</li>
            </ul>

            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 mt-4">
              <p className="text-red-300 font-semibold mb-2">Non sono responsabile per:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                <li>Perdita di dati (fai sempre backup!)</li>
                <li>Problemi durante le tue serate</li>
                <li>Danni derivanti dall'uso della piattaforma</li>
                <li>Problemi legali legati al tuo uso del servizio</li>
              </ul>
            </div>

            <p className="mt-4 text-purple-300">
              💡 <strong>Consiglio pratico:</strong> Tieni sempre un backup del tuo catalogo e un piano B per le tue serate!
            </p>
          </Section>

          <Section number="9" title="Cancellazione Account">
            <p>Puoi cancellare il tuo account in qualsiasi momento:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Dalle impostazioni della dashboard, oppure</li>
              <li>Scrivendomi direttamente</li>
            </ul>
            <p className="mt-3">Quando cancelli l'account:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li>I tuoi dati vengono eliminati entro 30 giorni</li>
              <li>Non potrai più recuperare il catalogo o le prenotazioni</li>
              <li>Il tuo QR code smetterà di funzionare</li>
            </ul>
            <p className="mt-4 text-purple-300">
              Posso anche sospendere o chiudere account che violano queste condizioni, 
              ma cercherò sempre di avvisarti prima se possibile.
            </p>
          </Section>

          <Section number="10" title="Modifiche a Queste Condizioni">
            <p>Potrei aggiornare queste condizioni nel tempo. Quando lo faccio:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Ti avviso via email</li>
              <li>Le modifiche entrano in vigore dopo 30 giorni</li>
              <li>Se continui a usare Karaokati, accetti le nuove condizioni</li>
              <li>Se non sei d'accordo, puoi cancellare l'account</li>
            </ul>
          </Section>

          <Section number="11" title="Chiusura del Servizio">
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
              <p className="text-purple-300 leading-relaxed">
                Karaokati è un progetto gratuito che dipende dall'interesse della community. 
                Se un giorno dovessi chiuderlo, ti avviserò con almeno 90 giorni di anticipo, 
                dandoti il tempo di esportare tutti i tuoi dati.
              </p>
            </div>
          </Section>
          <Section number="12" title="Contatti e Supporto">
            <p>Per domande, problemi o suggerimenti, puoi contattarmi:</p>
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <p className="text-purple-400 mb-2">📧 Email di supporto:</p>
              <p className="text-white">admin@karaokati.com</p>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Rispondo quando posso, di solito entro 48-72 ore. Ricorda che questo è un progetto 
              personale, quindi la risposta potrebbe non essere immediata.
            </p>
          </Section>
        </div>

        {/* Info Box Finale */}
        <div className="mt-12 pt-8 border-t border-purple-800/30">
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💜</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Spirito del Progetto</h3>
                <p className="text-gray-300 leading-relaxed">
                  Karaokati nasce dalla passione per il karaoke e dalla voglia di aiutare chi organizza serate. 
                  È un progetto gratuito, senza pubblicità e senza secondi fini. L'unico obiettivo è creare 
                  uno strumento utile per la community. Se ti piace e vuoi sostenerlo, fantastico. 
                  Se preferisci solo usarlo, va benissimo lo stesso. Buone serate! 🎤
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link to={createPageUrl("Home")}>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna alla Home
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-8 px-6 border-t border-purple-800/30 mt-12">
        <div className="max-w-5xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2025 Karaokati. Tutti i diritti riservati.</p>
          <p className="mt-2">Ultimo aggiornamento: 10 Dicembre 2024</p>
        </div>
      </footer>
    </div>
  );
}