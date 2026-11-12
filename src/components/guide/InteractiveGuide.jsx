import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap, X, Check, Info, Zap, Loader2, MapPin, Building2, Power,
  ArrowLeft, ArrowRight, Copy, Trash2, CheckCircle, Mic2, Music, Layers,
  ListOrdered, Flame, QrCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { apiClient } from "@/api/apiClient";

// ============================================================================
// COSTANTI
// ============================================================================

const TEST_VENUE_NAME = "Karaokati - Locale di prova";
const STEPS = ["Crea il locale", "Avvia la serata", "Prenota come un cliente", "Ricevi la richiesta"];
// stage: -1 benvenuto | 0..3 passi | 4 guida completata

const primaryBtn =
  "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white";
const outlineBtn =
  "border border-purple-300/60 text-white hover:bg-white/10 hover:text-white bg-transparent";
const fieldCls = "bg-gray-900/50 border-purple-800/50 text-white placeholder:text-gray-500";
const cardCls = "border-purple-800/30 bg-gray-800/50 backdrop-blur-sm";

// ============================================================================
// PEZZI DI UI
// ============================================================================

const Stepper = ({ current, onSelect }) => (
  <div className="flex items-start px-2 md:px-8">
    {STEPS.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-2 w-20 md:w-36 shrink-0">
            <button
              type="button"
              disabled={!done}
              onClick={() => onSelect(i)}
              title={done ? "Torna a questo passaggio" : undefined}
              className={cn(
                "w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all disabled:cursor-default",
                done && "bg-purple-500 border-purple-300 text-white hover:bg-purple-400 cursor-pointer",
                active && "bg-purple-600 border-purple-200 text-white shadow-[0_0_18px_rgba(192,132,252,0.8)]",
                !done && !active && "border-purple-400/60 text-transparent"
              )}
            >
              {done ? <Check className="w-5 h-5" /> : active ? i + 1 : "."}
            </button>
            <span className={cn("text-xs md:text-sm text-center", active ? "text-white font-semibold" : "text-purple-100/90")}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={cn("h-0.5 flex-1 mt-[18px]", i < current ? "bg-purple-400" : "bg-purple-700/60")} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const Tile = ({ icon: Icon, className }) => (
  <div
    className={cn(
      "rounded-[2rem] bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-950/60 shrink-0",
      className || "w-40 h-40 md:w-52 md:h-52"
    )}
  >
    <Icon className="w-1/2 h-1/2 text-white" strokeWidth={1.4} />
  </div>
);

const InfoBox = ({ children, className }) => (
  <div className={cn("flex items-start gap-3 rounded-xl border border-purple-400/40 bg-purple-500/15 px-4 py-3 text-sm text-purple-50", className)}>
    <Info className="w-5 h-5 shrink-0 text-purple-300 mt-0.5" />
    <div>{children}</div>
  </div>
);

const RealOpsNote = () => (
  <div className="flex items-center gap-2 text-sm text-purple-100">
    <Zap className="w-4 h-4 text-purple-300 shrink-0" />
    Le operazioni vengono eseguite realmente sul tuo account.
  </div>
);

// Layout comune a tutti i passaggi: riquadro a sinistra + contenuto a destra
const StepLayout = ({ pill, title, description, info, children }) => (
  <div className="grid md:grid-cols-[300px_1fr] gap-6 items-start">
           <div className="relative rounded-2xl bg-purple-200/90 p-6 space-y-4 shadow-[0_0_35px_rgba(217,70,239,0.35)] ring-2 ring-fuchsia-400/70 md:sticky md:top-6 guide-glow">
      <span className="inline-block rounded-full bg-fuchsia-500 px-3 py-1 text-sm font-semibold text-white">
        👉 Cosa fare ora
      </span>
      <h3 className="text-3xl font-bold text-purple-950 leading-tight">{title}</h3>
      <p className="text-lg text-purple-900">{description}</p>
      {info && <InfoBox className="bg-white/50 border-purple-300 text-purple-900">{info}</InfoBox>}
    </div>
    <div className="min-w-0">{children}</div>
  </div>
);

// ============================================================================
// COMPONENTE PRINCIPALE
// ============================================================================

const EMPTY_FORM = { address: "", capacity: "", notes: "" };

export default function InteractiveGuide({ open, onClose }) {
  const { user, setUser } = useAuth();

  const [stage, setStage] = useState(-1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [venue, setVenue] = useState(null);               // locale di prova in uso nella guida
  const [existingTest, setExistingTest] = useState(null); // locale di prova già presente nel DB
  const [loadingVenues, setLoadingVenues] = useState(false);
  const [booking, setBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [exiting, setExiting] = useState(false);
  const baselineRef = useRef(null);
  const hasBooking = !!booking;

  // Reset ad ogni apertura
  useEffect(() => {
    if (open) {
      setStage(-1);
      setForm(EMPTY_FORM);
      setVenue(null);
      setExistingTest(null);
      setBooking(null);
      setActivateError(false);
      setConfirmExit(false);
      setExiting(false);
      baselineRef.current = null;
    }
  }, [open]);

  // Blocca lo scroll della pagina sotto: scorre solo la finestra della guida
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC: apre/chiude la conferma di uscita
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (confirmExit) setConfirmExit(false);
      else if (stage === 4) onClose();
      else setConfirmExit(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, stage, confirmExit]);

  // Step 1: cerca il locale di prova | Step 2: rilegge lo stato reale del locale
  useEffect(() => {
    if (!open || (stage !== 0 && stage !== 1)) return;
    let cancelled = false;

    (async () => {
      try {
        if (stage === 0) setLoadingVenues(true);
        const list = await apiClient.getVenues();
        if (cancelled) return;
        if (stage === 0) {
          setExistingTest(list.find((v) => v.name === TEST_VENUE_NAME) || null);
        } else if (venue?.id) {
          const fresh = list.find((v) => v.id === venue.id);
          if (fresh) setVenue(fresh);
        }
      } catch (e) {
        console.error("Errore caricamento locali:", e);
      } finally {
        if (!cancelled) setLoadingVenues(false);
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, stage]);

  // Step 3: polling reale. Le prenotazioni già presenti NON fanno avanzare la guida.
  // Se la richiesta è già stata ricevuta (es. si torna indietro) il polling non parte.
  useEffect(() => {
    if (!open || stage !== 2 || !venue?.id || hasBooking) return;
    let cancelled = false;
    baselineRef.current = null; // nuova "attesa" ad ogni ingresso nello step

    const check = async () => {
      try {
        const list = await apiClient.getBookings(venue.id);
        if (cancelled) return;
        if (!baselineRef.current) {
          baselineRef.current = new Set(list.map((b) => b.id));
          return;
        }
        // Nuova richiesta inviata da un cliente via QR (session_id valorizzato)
        const fresh = list.find((b) => b.session_id && !baselineRef.current.has(b.id));
        if (fresh) {
          setBooking(fresh);
          setStage(3);
        }
      } catch (e) {
        console.error("Errore polling guida:", e);
      }
    };

    check();
    const t = setInterval(check, 3000);
    return () => { cancelled = true; clearInterval(t); };
  }, [open, stage, venue?.id, hasBooking]);

  // Schermata finale raggiunta = guida completata (salvato nel DB)
  useEffect(() => {
    if (open && stage === 4) saveStatus("completed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, stage]);

  // --------------------------------------------------------------------------
  // HANDLER
  // --------------------------------------------------------------------------

  const saveStatus = async (status) => {
    try {
      const res = await apiClient.updateGuideStatus(status);
      setUser((u) => ({ ...u, guide_status: res.guide_status }));
      return true;
    } catch (e) {
      console.error("Errore salvataggio stato guida:", e);
      toast.error(`Impossibile salvare lo stato della guida: ${e.message}`);
      return false;
    }
  };

  // X / "Esci dalla guida" / "Chiudi": prima la conferma (tranne a guida già completata)
  const requestClose = () => {
    if (stage === 4) onClose();
    else setConfirmExit(true);
  };

  const handleConfirmExit = async () => {
    setExiting(true);
    await saveStatus("dismissed");
    setConfirmExit(false);
    onClose();
  };

  const setField = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  // Step 1 → POST /venues
  const handleCreateVenue = async (e) => {
    e.preventDefault();
    if (!form.address.trim()) return toast.error("L'indirizzo del locale è obbligatorio");

    try {
      setSubmitting(true);
      const created = await apiClient.createVenue({
        name: TEST_VENUE_NAME,
        address: form.address,
        capacity: form.capacity ? parseInt(form.capacity) : 50,
        notes: form.notes || null,
      });
      setVenue(created);
      toast.success("Locale creato con successo");
      setStage(1);
    } catch (error) {
      console.error(error);
      toast.error("Impossibile creare il locale");
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2 → POST /venues/{id}/toggle (il backend disattiva da solo gli altri locali)
  const handleToggle = async () => {
    try {
      setToggling(true);
      const result = await apiClient.toggleVenue(venue.id);
      setVenue((v) => ({ ...v, active: result.active }));
      if (result.active) setActivateError(false);
    } catch (error) {
      console.error(error);
      toast.error("Impossibile modificare lo stato del locale");
    } finally {
      setToggling(false);
    }
  };

  // Step 2 → Avanti: verifica lo stato reale prima di proseguire
  const handleActivateNext = async () => {
    try {
      const list = await apiClient.getVenues();
      const fresh = list.find((v) => v.id === venue.id);
      if (fresh) setVenue(fresh);
      if (!fresh?.active) {
        setActivateError(true);
        return;
      }
      setActivateError(false);
      setStage(2);
    } catch (error) {
      console.error(error);
      toast.error("Impossibile verificare lo stato del locale");
    }
  };

  // --------------------------------------------------------------------------

  if (!open) return null;

  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const entryUrl = user?.qr_code_id ? `${baseUrl}/sessions/entry/${user.qr_code_id}` : "";
  const qrUrl = entryUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(entryUrl)}&color=4C1D95&bgcolor=ffffff&qzone=1&format=png`
    : "";

  // --------------------------------------------------------------------------
  // SCHERMATE (funzioni di render, NON componenti: così gli input non perdono il focus)
  // --------------------------------------------------------------------------

  const renderHeader = () => (
    <div className="flex items-center gap-4 pr-10">
      <div className="w-14 h-14 rounded-2xl bg-purple-500/25 border border-purple-400/40 flex items-center justify-center shrink-0">
        <GraduationCap className="w-7 h-7 text-purple-100" />
      </div>
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Guida Interattiva Karaokati</h2>
        <p className="text-sm text-purple-100/80">Ti accompagniamo nei primi passi per scoprire quanto è semplice usare Karaokati.</p>
      </div>
    </div>
  );

  // Scheda locale: stessa grafica della sezione Locali
  const renderVenueCard = (v, withToggle) => (
    <Card className={cardCls}>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-lg mb-1 text-white">{v.name}</CardTitle>
            {v.active && (
              <Badge className="bg-green-900/50 text-green-300 border-green-700/50">
                <Power className="w-3 h-3 mr-1" />
                Serata Avviata
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {v.address && (
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" />
              <span>{v.address}</span>
            </div>
          )}
          {v.capacity && (
            <div className="text-sm text-gray-400">
              Capacità: <span className="font-semibold text-gray-300">{v.capacity} persone</span>
            </div>
          )}
          <div className="text-sm">
            <div className="text-gray-400 mb-1">Note:</div>
            <div className="text-gray-300 bg-gray-900/30 p-2 rounded border border-gray-700/50 text-xs break-words min-h-[120px] max-h-[120px] overflow-y-auto">
              {v.notes ? v.notes : <span className="italic text-gray-500">Nessuna nota aggiunta</span>}
            </div>
          </div>

          {withToggle && (
            <div className={cn("p-3 bg-gray-900/50 rounded-lg border border-purple-800/30", !v.active && "mb-10")}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-300">Avvia Serata</div>
                  <div className="text-xs text-gray-500">Permetti prenotazioni</div>
                </div>
                <div className="relative flex items-center gap-3">
                  {toggling && <Loader2 className="w-4 h-4 animate-spin text-purple-300" />}
                  <span className="relative flex">
                    {!v.active && !toggling && (
                      <span className="absolute inset-0 rounded-full bg-purple-400/60 animate-ping pointer-events-none" />
                    )}
                    <Switch
                      checked={!!v.active}
                      onCheckedChange={handleToggle}
                      disabled={toggling}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </span>

                  {/* Manina animata che indica il toggle */}
                  {!v.active && (
                    <div className="absolute top-full right-0 mt-1 flex items-center gap-2 pointer-events-none z-10">
                      <span className="text-xs font-medium text-purple-300 whitespace-nowrap">Clicca qui per avviare</span>
                      <span className="animate-bounce text-3xl select-none leading-none" aria-hidden="true">👆</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderWelcome = () => (
    <>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 px-2 md:px-8">
        <Tile icon={Mic2} />
        <div className="flex-1">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Benvenuto su Karaokati!</h2>
          <p className="text-purple-100/90 mb-6">
            Ti accompagniamo nei primi passi per scoprire quanto è semplice configurare e usare Karaokati,
            mostrandoti anche come funziona l'esperienza lato cliente.
          </p>
          <ul className="space-y-3">
            {[
              "Crea il tuo primo locale",
              "Avvia la serata del tuo locale",
              "Prenota la canzone dal tuo smartphone tramite il QR Code, come farebbe un cliente",
              "Ricevi la tua prima richiesta e scopri come gestirla",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-white font-medium">
                <span className="w-9 h-9 rounded-full bg-purple-400/80 flex items-center justify-center shrink-0"><Check className="w-5 h-5" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <InfoBox className="mx-2 md:mx-4 py-4">
        Se chiudi questa guida, non ti verrà più mostrata automaticamente. Potrai sempre riaprirla dal menu laterale.
      </InfoBox>
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 md:px-4">
        <RealOpsNote />
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white" onClick={requestClose}>Chiudi</Button>
          <Button className={cn(primaryBtn, "h-12 px-6")} onClick={() => setStage(0)}>
            Inizia la guida <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </>
  );

  const renderCreateVenue = () => (
    <StepLayout
      pill="Passaggio 1 di 4"
      title="Crea il tuo primo locale"
      description="Inserisci i dati del locale dove farai le tue serate karaoke. Per la guida useremo un locale di prova."
      info="Il locale di prova resterà nel tuo account anche dopo la guida: potrai modificarlo o eliminarlo quando vuoi."
    >
      {loadingVenues ? (
        <Card className={cardCls}>
          <CardContent className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-300" />
          </CardContent>
        </Card>
      ) : existingTest ? (
        <div className="space-y-4">
          {renderVenueCard(existingTest, false)}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-purple-400/40 bg-purple-500/15 px-4 py-3">
            <span className="text-sm text-purple-50">Hai già creato il locale di prova: puoi riutilizzarlo per la guida.</span>
            <Button className={primaryBtn} onClick={() => { setVenue(existingTest); setStage(1); }}>
              Usa il locale di prova <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      ) : (
        <Card className={cardCls}>
          <CardHeader>
            <CardTitle className="text-white">Nuovo Locale</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateVenue} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guideVenueName" className="text-gray-300">Nome Locale *</Label>
                  <Input id="guideVenueName" value={TEST_VENUE_NAME} disabled readOnly className={fieldCls} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guideVenueCapacity" className="text-gray-300">Capacità</Label>
                  <Input
                    id="guideVenueCapacity"
                    type="number"
                    placeholder="Es. 200"
                    value={form.capacity}
                    onChange={(e) => setField("capacity", e.target.value)}
                    className={fieldCls}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guideVenueAddress" className="text-gray-300">Indirizzo *</Label>
                <Input
                  id="guideVenueAddress"
                  placeholder="Via, Città"
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  className={fieldCls}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guideVenueNotes" className="text-gray-300">
                  Note <span className="text-sm text-gray-500">({form.notes.length}/500)</span>
                </Label>
                <textarea
                  id="guideVenueNotes"
                  rows={3}
                  maxLength={500}
                  placeholder="Note aggiuntive sul locale (opzionale)"
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-purple-800/50 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setForm(EMPTY_FORM)}
                  disabled={submitting}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                >
                  Annulla
                </Button>
                <Button type="submit" disabled={submitting} className={primaryBtn}>
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {submitting ? "Salvando..." : "Salva Locale"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </StepLayout>
  );

  const renderActivate = () => (
    <StepLayout
      pill="Passaggio 2 di 4"
      title="Avvia la serata"
      description="Per iniziare a ricevere prenotazioni, avvia la serata del locale di prova: basta un click sull'interruttore."
      info="Ricorda che puoi avere una sola serata attiva alla volta: avviandone una nuova, la precedente si fermerà da sola."
    >
      <div className="space-y-4">
        {venue && renderVenueCard(venue, true)}
        {activateError && (
          <div className="flex items-start gap-3 rounded-lg border border-yellow-500/50 bg-yellow-900/30 px-4 py-3 text-sm text-yellow-100">
            <Info className="w-5 h-5 shrink-0 text-yellow-300" />
            Per proseguire devi avviare la serata del locale di prova: attiva l'interruttore "Avvia Serata".
          </div>
        )}
      </div>
    </StepLayout>
  );

  const renderQr = () => (
    <StepLayout
      pill="Passaggio 3 di 4"
      title={
        <>
          <span className="block text-lg font-semibold text-fuchsia-700 mb-1">Mettiti nei panni di un cliente</span>
          Scansiona il QR Code e prenota
        </>
      }
      description="Inquadra il QR Code con lo smartphone e invia la tua prima prenotazione, proprio come farebbe un tuo cliente."
      info="Tranquillo, è solo una prova: potrai eliminare la prenotazione quando vuoi."
    >
      <div className="space-y-4">
        <Card className={cardCls}>
          <CardContent className="p-6 grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="flex flex-col items-center gap-2 mx-auto">
              <div className="w-48 h-48 rounded-xl bg-white p-2">
                {qrUrl
                  ? <img src={qrUrl} alt="QR personale" className="w-full h-full object-contain" />
                  : <Loader2 className="w-8 h-8 animate-spin text-purple-600 m-auto" />}
              </div>

              {/* Manina animata che indica il QR */}
              <div className="flex flex-col items-center gap-1 text-center pointer-events-none">
                <span className="animate-bounce text-3xl select-none leading-none" aria-hidden="true">👆</span>
                <span className="text-base font-medium text-purple-300 whitespace-nowrap">Inquadrami con la fotocamera</span>
              </div>
            </div>
            <div className="space-y-4 min-w-0">
              <h4 className="text-xl font-bold text-white">A che punto sei</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Locale creato</div>
                    <div className="text-sm text-gray-400">
                      {venue?.name}{venue?.address && <> · {venue.address}</>}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Serata avviata</div>
                    <div className="text-sm text-gray-400">Le prenotazioni sono aperte</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  {booking
                    ? <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                    : <span className="w-6 h-6 rounded-full border-2 border-purple-300 shrink-0" />}
                  <div>
                    <div className="font-semibold text-white">Prima prenotazione</div>
                    <div className={booking ? "text-sm text-gray-400" : "text-sm text-purple-200"}>
                      {booking ? "Richiesta ricevuta" : "Inquadra il QR e prenota una canzone"}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {booking ? (
          <div className="rounded-xl border border-green-600/50 bg-green-900/30 py-4 px-4 flex flex-wrap items-center justify-center gap-3 text-green-200 font-semibold">
            <CheckCircle className="w-5 h-5" /> Richiesta ricevuta!
            <button className="text-sm font-normal underline text-purple-200 hover:text-white" onClick={() => setBooking(null)}>
              Invia un'altra richiesta
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-purple-400/40 bg-purple-500/20 py-5 px-4 flex items-center justify-center gap-3 text-white text-base md:text-lg font-semibold text-center">
            <Loader2 className="w-5 h-5 animate-spin text-purple-200 shrink-0" />
            <span className="flex flex-col">
              <span>In attesa della tua prenotazione</span>
              <span className="text-sm md:text-base font-normal text-purple-100">
                Scansiona il QR Code
                <QrCode className="inline-block w-5 h-5 mx-1 -mt-1 text-purple-200" />
                {" "} e prenota una canzone per proseguire
              </span>
            </span>
          </div>
        )}
      </div>
    </StepLayout>
  );

  // Card STATICA: stessa grafica della sezione Prenotazioni, pulsanti solo illustrativi
  const renderBooking = () => (
    <StepLayout
      pill="Passaggio 4 di 4"
      title="Ecco la tua richiesta"
      description="Questa è la prenotazione che hai appena inviato dal tuo smartphone."
      info="È così che riceverai le richieste dei tuoi clienti: le troverai nella sezione Prenotazioni, dove potrai accettarle, rifiutarle o cancellarle."
    >
      <Card className={cardCls}>
        <CardContent className="pt-6">
          {booking && (
            <div
              className={cn(
                "relative overflow-hidden p-4 bg-gray-900/30 rounded-lg border border-yellow-700/50",
                booking.is_free_request && "pt-7"
              )}
            >
              {booking.is_free_request && (
                <div className="absolute top-0 left-0 flex items-center gap-1 bg-pink-900/40 text-pink-300 text-[11px] font-medium px-2.5 py-0.5 rounded-br-lg border-b border-r border-pink-700/40">
                  <Flame className="w-3 h-3 text-orange-400" /> Richiesta libera
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-purple-400">{booking.user_name?.[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-8 mb-1 flex-wrap">
                      <span className="font-medium text-white">{booking.user_name}</span>
                      {booking.status === "accepted" ? (
                        <Badge className="bg-green-900/50 text-green-300 border-green-700/50">Accettata</Badge>
                      ) : (
                        <Badge className="bg-yellow-900/50 text-yellow-300 border-yellow-700/50">In Attesa</Badge>
                      )}
                      <Badge variant="outline" className="border-purple-700/50 text-purple-300">
                        Tonalità: {booking.key === "0" ? "Originale" : booking.key}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 truncate">{booking.song}</div>
                    {booking.notes && (
                      <div className="mt-1.5 flex items-start gap-1.5 text-xs bg-purple-950/30 border border-purple-900/30 p-2 rounded md:max-w-[90%]">
                        <span className="text-purple-400 font-semibold select-none">Note:</span>
                        <p className="text-gray-400 italic break-words flex-1">{booking.notes}</p>
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">Ora</div>
                  </div>
                </div>

                {/* Pulsanti solo illustrativi */}
                <div className="flex gap-2 flex-shrink-0 items-center pointer-events-none select-none" aria-hidden="true">
                  {booking.status !== "accepted" && (
                    <Button size="sm" tabIndex={-1} className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" /> Accetta
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" tabIndex={-1} className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
                  <Button size="sm" variant="ghost" tabIndex={-1} className="text-purple-300"><Copy className="w-4 h-4 mr-1.5" /></Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </StepLayout>
  );

  const renderDone = () => (
    <StepLayout
      pill="Guida completata"
      title="Guida completata!"
      description="Ora sai come creare il tuo locale, come avviare la tua serata e quanto è semplice far prenotare i tuoi clienti dallo smartphone."
      info="Il catalogo è facoltativo: potrai aggiungerlo anche in seguito dalla sezione Catalogo."
    >
      <Card className={cardCls}>
        <CardHeader>
          <CardTitle className="text-white text-2xl">Ora tocca a te!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-gray-300">
            Crea i tuoi locali, decidi se caricare o meno il tuo catalogo e gestisci le prenotazioni dei tuoi clienti.
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: MapPin, text: "Crea i tuoi locali" },
              { icon: Music, text: "Carica il catalogo, se vuoi" },
              { icon: ListOrdered, text: "Gestisci le prenotazioni" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-lg border border-purple-800/30 bg-gray-900/50 p-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-700/50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm text-gray-200">{text}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-cyan-500/30 bg-gray-900/40 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-900/40 border border-cyan-500/40 flex items-center justify-center"><Music className="w-5 h-5 text-cyan-300" /></div>
                <h4 className="text-lg font-bold text-white">Con catalogo</h4>
              </div>
              <p className="text-sm text-cyan-200 mb-3">
                Ideale se hai le tue basi karaoke sul computer o su un disco.
              </p>
              <ul className="space-y-2">
                {["I clienti scelgono tra le canzoni che hai", "Puoi importarlo da Excel", "Puoi generarlo automaticamente dalle tue basi karaoke"].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-200"><Check className="w-4 h-4 mt-0.5 text-purple-400 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-gray-900/40 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-900/40 border border-purple-500/40 flex items-center justify-center"><Layers className="w-5 h-5 text-purple-300" /></div>
                <h4 className="text-lg font-bold text-white">Senza catalogo</h4>
              </div>
              <p className="text-sm text-purple-200 mb-3">
                Ideale se non hai basi tue e usi piattaforme o app che te le forniscono.
              </p>
              <ul className="space-y-2">
                {["Puoi usare Karaokati da subito, senza caricare nulla", "I clienti inviano titolo e artista", "Tu cerchi la canzone sulla tua piattaforma e accetti la richiesta"].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-200"><Check className="w-4 h-4 mt-0.5 text-purple-400 shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </StepLayout>
  );

  const renderFooter = () => (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-purple-500/30">
      <div className="flex flex-wrap items-center gap-6">
        <button className="flex items-center gap-2 text-white hover:text-purple-200" onClick={() => setStage(stage - 1)}>
          <ArrowLeft className="w-4 h-4" /> Passaggio precedente
        </button>
        {stage < 4 && <RealOpsNote />}
      </div>

      <div className="flex items-center gap-3">
        {stage < 4 ? (
          <>
            <Button className={cn(outlineBtn, "h-11 px-5")} onClick={requestClose}>Esci dalla guida</Button>
            {stage === 1 && (
              <Button className={cn(primaryBtn, "h-11 px-6")} onClick={handleActivateNext}>
                Avanti <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {stage === 2 && booking && (
              <Button className={cn(primaryBtn, "h-11 px-6")} onClick={() => setStage(3)}>
                Avanti <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {stage === 3 && (
              <Button className={cn(primaryBtn, "h-11 px-6")} onClick={() => setStage(4)}>
                Avanti <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </>
        ) : (
          <Button className={cn(primaryBtn, "h-11 px-6")} onClick={onClose}>
            Inizia a usare Karaokati <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // RENDER
  // La finestra scorre con la normale barra di scorrimento del browser,
  // la stessa del resto della piattaforma.
  // --------------------------------------------------------------------------

  return (
    <>
      <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/50 backdrop-blur-md">
        <div className="min-h-full flex items-center justify-center p-3 md:p-8">
          <div className="relative w-full max-w-6xl rounded-3xl border border-purple-400/60 bg-gradient-to-br from-[#2a0f4d] via-[#3b1270] to-[#2a0f4d] shadow-[0_0_70px_rgba(168,85,247,0.35)] p-5 md:p-8 space-y-6">
            <button onClick={requestClose} aria-label="Chiudi guida" className="absolute top-5 right-5 text-white/90 hover:text-white z-10">
              <X className="w-7 h-7" />
            </button>

            {stage >= 0 && renderHeader()}
            <Stepper current={stage} onSelect={setStage} />

            {stage === -1 && renderWelcome()}
            {stage === 0 && renderCreateVenue()}
            {stage === 1 && renderActivate()}
            {stage === 2 && renderQr()}
            {stage === 3 && renderBooking()}
            {stage === 4 && renderDone()}

            {stage >= 0 && renderFooter()}
          </div>
        </div>
      </div>

      {/* Conferma di uscita */}
      {confirmExit && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-purple-400/60 bg-gradient-to-br from-[#2a0f4d] to-[#3b1270] p-6 space-y-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-white">Vuoi uscire dalla guida?</h3>
            <p className="text-purple-100/90">
              La guida non verrà più mostrata automaticamente, ma potrai riaprirla in qualsiasi momento dal menu laterale.
            </p>
            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <Button className={primaryBtn} onClick={() => setConfirmExit(false)} disabled={exiting}>
                Continua la guida
              </Button>
              <Button className={outlineBtn} onClick={handleConfirmExit} disabled={exiting}>
                {exiting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Esci dalla guida
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}