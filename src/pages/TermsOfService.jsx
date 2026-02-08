import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Mic2, FileText, Shield, Scale, AlertCircle } from "lucide-react";
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

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to={createPageUrl("home")} onClick={handleLogoClick} className="flex items-center gap-3 group">
            {/* <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition" /> */}
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

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-12">
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
            Piattaforma per la gestione di serate karaoke
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="bg-gray-800/50 px-3 py-1 rounded-full">
              Ultimo aggiornamento: 07 Febbraio 2026
            </span>
          </div>
        </div>

        {/* Preambolo */}
        <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <FileText className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <p className="text-gray-300 leading-relaxed">
              Karaokati è un progetto creato per aiutare DJ e appassionati di karaoke 
              a gestire le proprie serate in modo digitale. Utilizzando questa piattaforma, accetti di 
              seguire queste condizioni per garantire un'esperienza positiva per tutti.
            </p>
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-8">
          <Section number="1" title="Cos'è Karaokati">
            <p>Karaokati è una piattaforma web che ti permette di:</p>
            <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
              <li>Gestire digitalmente le tue serate karaoke</li>
              <li>Organizzare il tuo catalogo musicale</li>
              <li>Ricevere prenotazioni in tempo reale</li>
              <li>Generare QR code personalizzati per i tuoi clienti</li>
              <li>Utilizzare un chatbot per facilitare le prenotazioni</li>
            </ul>
            
            {/* UPDATED - Modello di servizio */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-300 mb-2">Modello di Servizio</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Attualmente Karaokati è completamente gratuito durante la fase di crescita iniziale. 
                    In futuro, quando il progetto crescerà e i costi aumenteranno, potremmo introdurre 
                    un modello freemium con:
                  </p>
                  <ul className="list-disc list-inside mt-2 ml-4 text-gray-300 text-sm space-y-1">
                    <li>Piano Gratuito con funzionalità base</li>
                    <li>Piano Pro a pagamento con funzionalità avanzate</li>
                  </ul>
                  <p className="text-blue-200 text-sm mt-2">
                    Ti avviseremo con almeno 60 giorni di anticipo prima di qualsiasi cambio di pricing.
                  </p>
                </div>
              </div>
            </div>
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
                <li>Usare tutte le funzionalità disponibili nel tuo piano</li>
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
              </p>
            </div>
          </Section>

          <Section number="6" title="Privacy e Dati">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">La tua privacy è importante</span>
            </div>

            <p>Karaokati raccoglie solo i dati necessari per fornirti il servizio. Siamo trasparenti su cosa raccogliamo, come lo usiamo e con chi lo condividiamo.</p>

            {/* COSA RACCOGLIAMO */}
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <p className="font-semibold text-purple-300 mb-2">📊 Dati che Raccogliamo</p>
              <ul className="space-y-2 ml-4 text-gray-300">
                <li><strong>Account:</strong> Email, password (criptata), nome artistico, telefono (facoltativo)</li>
                <li><strong>Servizio:</strong> Catalogo canzoni, prenotazioni, locali, serate, QR code</li>
                <li><strong>Tecnici (anonimi):</strong> IP, browser, dispositivo, pagine visitate (Vercel Analytics - no cookie)</li>
                <li><strong>Analytics (solo se accetti cookie):</strong> Navigazione dettagliata, eventi, tempo permanenza, provenienza traffico (Google Analytics)</li>
              </ul>
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded p-2 mt-3">
                <p className="text-yellow-300 text-sm">
                  ⚠️ <strong>Google Analytics:</strong> Dati processati da Google LLC (USA). Google può usare dati aggregati. Puoi rifiutare dal banner cookie.
                </p>
              </div>
            </div>

            {/* COME LI USIAMO */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mt-4">
              <p className="font-semibold text-blue-300 mb-2">🎯 Per cosa usiamo i Dati</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                <li>Fornirti il servizio (account, catalogo, prenotazioni)</li>
                <li>Comunicazioni essenziali (verifica email, reset password)</li>
                <li>Sicurezza (prevenire abusi e frodi)</li>
                <li>Migliorare la piattaforma (analisi anonime)</li>
                <li>Assistenza tecnica</li>
              </ul>
              <p className="text-blue-200 text-xs mt-2">
                ✅ <strong>NON usiamo dati per:</strong> Spam, pubblicità mirata, vendita a terzi
              </p>
            </div>

            {/* TERZE PARTI */}
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4 mt-4">
              <p className="font-semibold text-purple-300 mb-2">🔗 Condivisione con Terze Parti</p>
              <p className="text-gray-300 mb-2"><strong>Partner Tecnologici (sempre):</strong> Vercel (hosting), Railway (API), Resend (email)</p>
              <p className="text-gray-300"><strong>Analytics (solo se accetti):</strong> Google Analytics (USA) - <a href="https://policies.google.com/privacy" target="_blank" className="text-purple-400 underline">Privacy Policy</a></p>
              <p className="text-yellow-300 text-xs mt-2">
                ⚠️ Trasferimento dati extra-UE protetto da Clausole Contrattuali Standard (GDPR)
              </p>
              <div className="bg-green-900/20 border border-green-700/30 rounded p-2 mt-3">
                <p className="text-green-300 text-xs">
                  ✅ <strong>NON vendiamo MAI</strong> i tuoi dati a broker o aziende pubblicitarie
                </p>
              </div>
            </div>

            {/* COOKIE */}
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <p className="font-semibold text-purple-300 mb-2">🍪 Cookie</p>
              <ul className="space-y-2 ml-4 text-gray-300">
                <li><strong>Tecnici (sempre attivi):</strong> Session cookie per login, preferenze UI</li>
                <li><strong>Analitici (richiedono consenso):</strong> Google Analytics (_ga, _gid) - Durata: 24 mesi</li>
              </ul>
              <p className="text-purple-300 text-xs mt-2 ml-4">
                💡 Puoi rifiutare dal banner. La scelta viene salvata.
              </p>
            </div>

            {/* DIRITTI GDPR */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mt-4">
              <p className="font-semibold text-blue-300 mb-2">⚖️ I Tuoi Diritti (GDPR)</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                <li><strong>Accesso:</strong> Vedi i tuoi dati dalla dashboard</li>
                <li><strong>Modifica:</strong> Cambia email, nome, telefono</li>
                <li><strong>Cancellazione:</strong> Elimina account (30 giorni)</li>
                <li><strong>Esportazione:</strong> Scarica dati in CSV/JSON</li>
                <li><strong>Opposizione:</strong> Rifiuta cookie analitici</li>
                <li><strong>Reclamo:</strong> <a href="https://www.garanteprivacy.it" target="_blank" className="text-purple-400 underline">Garante Privacy</a></li>
              </ul>
            </div>

            {/* SICUREZZA */}
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 mt-4">
              <p className="font-semibold text-green-300 mb-2">🔒 Sicurezza</p>
              <ul className="list-disc list-inside ml-4 text-gray-300space-y-1">
                <li>HTTPS/TLS per comunicazioni</li>
                <li>Password criptate (bcrypt)</li>
                <li>Database protetto da firewall</li>
              </ul>
              <p className="text-yellow-300 text-xs mt-2">
                ⚠️ Nessun sistema è sicuro al 100%. Violazioni notificate entro 72h (GDPR).
              </p>
            </div>

            {/* CONSERVAZIONE */}
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4 mt-4">
              <p className="font-semibold text-purple-300 mb-2">📅 Conservazione Dati</p>
              <ul className="list-disc list-inside ml-4 text-gray-300space-y-1">
                <li><strong>Account attivo:</strong> Finché usi il servizio</li>
                <li><strong>Account cancellato:</strong> 30 giorni</li>
                <li><strong>Cookie Analytics:</strong> 24 mesi</li>
                <li><strong>Log sicurezza:</strong> 12 mesi</li>
              </ul>
            </div>

            {/* MINORI */}
            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 mt-4">
              <p className="font-semibold text-red-300 mb-2">👶 Minori di 16 anni</p>
              <p className="text-gray-300">
                Karaokati è per professionisti adulti. Serve consenso genitoriale se hai meno di 16 anni.
              </p>
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

          {/* UPDATED - Pricing e Cambiamenti */}
          <Section number="8" title="Pricing e Modifiche al Servizio">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mb-4">
              <p className="text-blue-300 font-semibold mb-2">Modello Attuale</p>
              <p className="text-gray-300">
                Attualmente Karaokati è completamente gratuito per tutti gli utenti durante la fase di crescita.
              </p>
            </div>

            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4 mb-4">
              <p className="text-purple-300 font-semibold mb-2">Modello Futuro</p>
              <p className="text-gray-300 mb-3">
                Quando il progetto crescerà e i costi di infrastruttura aumenteranno significativamente, 
                potremmo introdurre un modello freemium:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Piano Gratuito:</strong> Funzionalità base sufficienti per uso occasionale</li>
                <li><strong>Piano Pro:</strong> Funzionalità avanzate e illimitate (a pagamento)</li>
              </ul>
            </div>

            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
              <p className="text-green-300 font-semibold mb-2">I Tuoi Diritti</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Ti avviseremo con <strong>almeno 60 giorni di anticipo</strong> prima di qualsiasi cambio di pricing</li>
                <li>Riceverai una email dettagliata con tutte le informazioni sui nuovi piani</li>
                <li>Avrai tempo per decidere quale piano scegliere</li>
                <li>Se non sei d'accordo, potrai cancellare l'account ed esportare i tuoi dati</li>
              </ul>
            </div>

            <p className="mt-4 text-purple-300">
              💡 <strong>Trasparenza:</strong> Vogliamo essere onesti fin dall'inizio. Se il progetto avrà successo, 
              dovremo renderlo sostenibile economicamente. Non promettiamo "gratis per sempre" per poi cambiare le carte in tavola.
            </p>
          </Section>

          <Section number="9" title="Limitazioni e Disclaimer">
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-4">
              <p className="text-yellow-300 leading-relaxed">
                ⚠️ <strong>Karaokati è fornito "così com'è"</strong>
              </p>
            </div>
            
            <p>Karaokati è un servizio in continua evoluzione. Ci impegniamo a mantenerlo stabile e funzionale, ma come ogni piattaforma digitale:</p>
            
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4 mb-4">
              <p className="font-semibold text-white mb-2">Cosa può succedere:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Potrebbero verificarsi interruzioni temporanee del servizio</li>
                <li>Occasionalmente potrebbero presentarsi bug o malfunzionamenti</li>
                <li>Le funzionalità possono essere migliorate, modificate o aggiornate nel tempo</li>
                <li>In rari casi, i server potrebbero essere momentaneamente non disponibili</li>
              </ul>
            </div>

            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 mb-4">
              <p className="text-red-300 font-semibold mb-2">Limiti di responsabilità - Karaokati non è responsabile per:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Perdita o danneggiamento dei tuoi dati (ti consigliamo di fare backup periodici)</li>
                <li>Interruzioni del servizio durante le tue serate</li>
                <li>Eventuali danni diretti o indiretti derivanti dall'uso della piattaforma</li>
                <li>Problemi tecnici dei dispositivi dei tuoi clienti (connessione, chatbot, ecc.)</li>
                <li>Questioni legali relative al tuo utilizzo del servizio (licenze musicali, diritti d'autore, ecc.)</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mb-4">
              <p className="text-blue-300 font-semibold mb-2">💡 Raccomandazioni pratiche:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Conserva sempre una copia di backup del tuo catalogo (puoi esportarlo dalla dashboard)</li>
                <li>Prepara un piano B per le tue serate (es. lista cartacea di emergenza)</li>
                <li>Testa il sistema prima di ogni serata importante</li>
                <li>Verifica che i tuoi clienti abbiano connessione internet stabile</li>
              </ul>
            </div>

            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
              <p className="text-purple-300 font-semibold mb-2">Il nostro impegno:</p>
              <p className="text-gray-300 mb-2">
                Anche se non possiamo garantire il 100% di uptime, ci impegniamo a:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                <li>Mantenere il servizio il più stabile possibile</li>
                <li>Risolvere bug e problemi tempestivamente</li>
                <li>Comunicare in anticipo eventuali manutenzioni programmate</li>
                <li>Fornire supporto tecnico in caso di difficoltà</li>
              </ul>
            </div>
          </Section>

          <Section number="10" title="Cancellazione Account">
            <p>Puoi cancellare il tuo account in qualsiasi momento:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Dalle impostazioni della dashboard, oppure</li>
              <li>Scrivendoci direttamente</li>
            </ul>
            <p className="mt-3">Quando cancelli l'account:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
              <li>I tuoi dati vengono eliminati entro 30 giorni</li>
              <li>Non potrai più recuperare il catalogo o le prenotazioni</li>
              <li>Il tuo QR code smetterà di funzionare</li>
              <li>Eventuali abbonamenti attivi verranno cancellati (se applicabile in futuro)</li>
            </ul>
            <p className="mt-4 text-purple-300">
              Ci riserviamo di sospendere o chiudere account che violano queste condizioni.
            </p>
          </Section>

          <Section number="11" title="Modifiche a Queste Condizioni">
            <p>Potremmo aggiornare queste condizioni nel tempo. Quando lo facciamo:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Ti avviseremo via email</li>
              <li>Le modifiche entrano in vigore dopo 30 giorni</li>
              <li>Se continui a usare Karaokati, accetti le nuove condizioni</li>
              <li>Se non sei d'accordo, puoi cancellare l'account</li>
            </ul>
          </Section>

          <Section number="12" title="Chiusura del Servizio">
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
              <p className="text-purple-300 leading-relaxed">
                Se un giorno dovessimo chiudere il servizio, ti avviseremo con almeno 90 giorni di anticipo, 
                dandoti il tempo di esportare tutti i tuoi dati.
              </p>
            </div>
          </Section>

          <Section number="13" title="Contatti e Supporto">
            <p>Per domande, problemi o suggerimenti, puoi contattarci:</p>
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <p className="text-purple-400 mb-2">📧 Email di supporto:</p>
              <p className="text-white">support@karaokati.com</p>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Rispondiamo di solito entro 48-72 ore lavorative.
            </p>
          </Section>
        </div>

        {/* Info Box Finale - UPDATED */}
        <div className="mt-12 pt-8 border-t border-purple-800/30">
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💜</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Spirito del Progetto</h3>
                <p className="text-gray-300 leading-relaxed">
                  Karaokati nasce dalla passione per il karaoke e dalla voglia di creare uno strumento utile. 
                  È attualmente gratuito per far crescere la community, ma se avrà successo dovremo renderlo 
                  sostenibile. Preferiamo essere onesti fin dall'inizio piuttosto che promettere "gratis per sempre" 
                  e poi deludere. Se ti piace e vuoi sostenerlo con una donazione, fantastico. Altrimenti, 
                  goditi il servizio finché è gratuito. Buone serate! 🎤
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-8 px-6 border-t border-purple-800/30 mt-12">
        <div className="max-w-5xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2026 Karaokati. Tutti i diritti riservati.</p>
          <p className="mt-2">Ultimo aggiornamento: 07 Febbraio 2026</p>
        </div>
      </footer>
    </div>
  );
}