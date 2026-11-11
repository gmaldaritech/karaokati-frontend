import React, { useState, useEffect, useRef } from "react";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import OverviewSection from "../components/dashboard/OverviewSection";
import VenuesSection from "../components/dashboard/VenuesSection";
import CatalogSection from "../components/dashboard/CatalogSection";
import BookingsSection from "../components/dashboard/BookingsSection";
import SettingsSection from "../components/dashboard/SettingsSection";
import VideoTutorialSection from "../components/dashboard/VideoTutorialSection";
import SupportSection from "@/components/dashboard/SupportSection";
import InteractiveGuide from "@/components/guide/InteractiveGuide";
import { useAuth } from "@/hooks/useAuth";
import { apiClient } from "@/api/apiClient";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");
  const [showGuide, setShowGuide] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const autoOpened = useRef(false);

  // Apertura automatica a ogni accesso finché lo stato nel DB è "pending".
  // Lo stato viene riletto dal backend (fonte di verità), non dal payload del login.
  useEffect(() => {
    if (!user?.id || autoOpened.current) return;
    autoOpened.current = true;

    apiClient.getCurrentDj()
      .then((me) => {
        setUser((u) => ({ ...u, guide_status: me.guide_status }));
        if (me.guide_status === "pending") setShowGuide(true);
      })
      .catch((e) => console.error("Errore lettura stato guida:", e));
  }, [user?.id]);

  const handleCloseGuide = () => {
    setShowGuide(false);
    setContentKey((k) => k + 1); // ricarica la sezione sotto e mostra i dati creati nella guida
  };

  useEffect(() => {
    document.title = "Dashboard DJ - Karaokati | Gestisci Serate Karaoke";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Dashboard professionale per DJ karaoke. Gestisci prenotazioni, catalogo, locali e visualizza statistiche in tempo reale.");
    }
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection onSectionChange={setActiveSection} />;
      case "venues":
        return <VenuesSection />;
      case "catalog":
        return <CatalogSection />;
      case "bookings":
        return <BookingsSection />;
      case "settings":
        return <SettingsSection />;
      case "tutorials":
        return <VideoTutorialSection />;
      case "support":
        return <SupportSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex">
      <InteractiveGuide
        open={showGuide}
        onClose={handleCloseGuide}
        onNavigate={setActiveSection}
      />
      <DashboardSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onOpenGuide={() => setShowGuide(true)}
        guideOpen={showGuide}
      />
      
      <div className="flex-1 md:ml-64">
        <div className="p-6 md:p-8" key={contentKey}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}