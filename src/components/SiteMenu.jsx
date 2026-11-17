import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, Home, Users, MessageSquare, Heart, FileText, Mail,
  LogIn, UserPlus, LayoutDashboard,
} from "lucide-react";
import { apiClient } from "@/api/apiClient";

const PAGES = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about-us", label: "Chi siamo", icon: Users },
  { to: "/suggestions", label: "Suggerimenti", icon: MessageSquare },
  { to: "/support", label: "Sostienici", icon: Heart },
  { to: "/terms", label: "Termini di servizio", icon: FileText },
  { to: "/terms#contatti", label: "Contatti", icon: Mail },
];

/**
 * True se nel browser c'è un token di accesso non ancora scaduto.
 * Legge il campo "exp" del JWT senza chiamare il server: non verifica la firma,
 * serve solo a decidere quali voci mostrare (la dashboard fa comunque il suo controllo).
 */
function hasValidToken() {
  try {
    const token = apiClient.getAuthToken();
    if (!token) return false;
    const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(part.padEnd(part.length + ((4 - (part.length % 4)) % 4), "=")));
    return typeof exp === "number" && exp * 1000 > Date.now();
  } catch {
    return false; // token assente o illeggibile
  }
}

/**
 * Pulsante "hamburger" con menu a tendina verso il basso con tutte le pagine del sito.
 * Si chiude cliccando fuori, premendo Esc o scegliendo una voce.
 */
export default function SiteMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname, hash } = useLocation();

  const loggedIn = hasValidToken();

  // Chiude il menu quando cambia pagina
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("touchstart", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("touchstart", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Altezza massima della tendina = altezza dello schermo meno lo spazio sopra di essa.
  // Con il telefono in orizzontale le voci non ci stanno tutte: la tendina diventa scorrevole.
  // Il calcolo è in CSS (dvh), così si adatta da solo anche ruotando con il menu aperto.
  const [offsetTop, setOffsetTop] = useState(80);
  useLayoutEffect(() => {
    if (!open) return;
    const button = ref.current?.querySelector("button");
    if (button) setOffsetTop(Math.round(button.getBoundingClientRect().bottom) + 8 + 12); // mt-2 + margine
  }, [open]);
  const maxHeight = `max(120px, calc(100dvh - ${offsetTop}px))`;

  // "/terms" e "/terms#contatti" sono voci distinte: si confronta anche l'ancora
  const isActive = (to) => (to === "/" ? pathname === "/" || pathname === "/home" : pathname + hash === to);

  const handleItemClick = (to) => {
    setOpen(false);
    const anchor = to.split("#")[1];
    if (!anchor) { window.scrollTo({ top: 0 }); return; }
    // Già sulla pagina con la stessa ancora: l'URL non cambia, quindi si scorre qui
    if (pathname + hash === to) document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
  };

  const itemClass = (active) =>
    `flex items-center gap-3 px-4 py-3 text-sm md:text-base transition ${
      active ? "bg-purple-900/60 text-white" : "text-gray-300 hover:bg-purple-900/40 hover:text-white"
    }`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        aria-expanded={open}
        aria-haspopup="menu"
        className="p-2 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/50 transition"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        role="menu"
        className={`absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] origin-top-right rounded-xl border border-purple-800/40 bg-gray-900/95 backdrop-blur-md shadow-2xl overflow-y-auto overscroll-contain transition duration-150 ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        style={{ maxHeight }}
      >
        <nav className="py-2">
          {PAGES.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} role="menuitem" tabIndex={open ? 0 : -1}
              onClick={() => handleItemClick(to)}
              className={itemClass(isActive(to))}>
              <Icon className="w-4 h-4 text-purple-400" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-purple-800/40 py-2">
          {loggedIn ? (
            <Link to="/dj-dashboard" role="menuitem" tabIndex={open ? 0 : -1} className={itemClass(false)}>
              <LayoutDashboard className="w-4 h-4 text-purple-400" />
              La mia dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" role="menuitem" tabIndex={open ? 0 : -1} className={itemClass(isActive("/login"))}>
                <LogIn className="w-4 h-4 text-purple-400" />
                Accedi
              </Link>
              <Link to="/register" role="menuitem" tabIndex={open ? 0 : -1} className={itemClass(isActive("/register"))}>
                <UserPlus className="w-4 h-4 text-pink-400" />
                Registrati gratis
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
