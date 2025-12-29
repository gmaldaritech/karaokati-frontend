import React, { useState, useEffect } from "react";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import OverviewSection from "../components/dashboard/OverviewSection";
import VenuesSection from "../components/dashboard/VenuesSection";
import CatalogSection from "../components/dashboard/CatalogSection";
import BookingsSection from "../components/dashboard/BookingsSection";
import SettingsSection from "../components/dashboard/SettingsSection";
import SupportSection from "@/components/dashboard/SupportSection";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");

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
        //return <OverviewSection />;
        return <OverviewSection onSectionChange={setActiveSection} />;
      case "venues":
        return <VenuesSection />;
      case "catalog":
        return <CatalogSection />;
      case "bookings":
        return <BookingsSection />;
      case "settings":
        return <SettingsSection />;
      case "support":
        return <SupportSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex">
      <DashboardSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
      />
      
      <div className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}