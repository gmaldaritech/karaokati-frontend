import React, { useState } from "react";
import { Heart, LayoutDashboard, MapPin, Music, ListOrdered, Settings, LogOut, Play, GraduationCap, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardSidebar({ activeSection, setActiveSection, onOpenGuide, guideOpen }) {
  const { user, logout } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);

  const handleItemClick = (id) => (id === "guide" ? onOpenGuide?.() : setActiveSection(id));
  const isActive = (id) => (id === "guide" ? !!guideOpen : activeSection === id);

  const menuItems = [
    { id: "overview", label: "Panoramica", icon: LayoutDashboard },
    { id: "venues", label: "Locali", icon: MapPin },
    { id: "catalog", label: "Catalogo", icon: Music },
    { id: "bookings", label: "Prenotazioni", icon: ListOrdered },
    { id: "settings", label: "Impostazioni", icon: Settings },
    { id: "tutorials", label: "Video Tutorial", icon: Play },
    { id: "guide", label: "Guida Interattiva", icon: GraduationCap },
    { id: "support", label: "Supportaci", icon: Heart },
  ];

  // Su mobile la barra in basso ha spazio per 4 voci + "Altro"
  const PRIMARY_IDS = ["overview", "venues", "catalog", "bookings"];
  const primaryItems = menuItems.filter((i) => PRIMARY_IDS.includes(i.id));
  const secondaryItems = menuItems.filter((i) => !PRIMARY_IDS.includes(i.id));
  const moreActive = secondaryItems.some((i) => isActive(i.id));

  return (
    <>
      {/* Mobile Header */}
      <div className="desk:hidden fixed short:absolute top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 p-4 short:py-2 z-50">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="Karaokati" className="h-8 short:h-6 w-auto" />
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden desk:block fixed left-0 top-0 h-screen w-64 bg-gray-900/50 backdrop-blur-sm border-r border-purple-800/30">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10 justify-center">
                <img 
                  src="/logo.png"
                  alt="Karaokati" 
                  className="h-10 w-auto"
                />
          </div>

          {/* DJ Info */}
          <div className="mb-6 p-4 bg-purple-900/30 border border-purple-800/30 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">
                  {user?.stage_name ? user.stage_name.charAt(0).toUpperCase() : 'DJ'}
                </span>
              </div>
              <div>
                <div className="font-semibold text-white">
                  {user?.stage_name || 'DJ'}
                </div>
                {/* <div className="text-sm text-gray-400">Pro Account</div> */}
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.id)
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button 
              onClick={logout}
              variant="ghost" 
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Esci
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation: 4 voci principali + "Altro" */}
      <nav className="desk:hidden fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-purple-800/30 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] short:pt-1 short:pb-[calc(0.25rem+env(safe-area-inset-bottom))] z-50">
        <div className="grid grid-cols-5 gap-1">
          {primaryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`flex flex-col short:flex-row items-center justify-center gap-1 short:gap-2 py-2 short:py-1.5 rounded-lg transition-all ${
                isActive(item.id)
                  ? "bg-purple-900/50 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[11px] font-medium leading-tight truncate max-w-full short:text-xs">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setMoreOpen(true)}
            className={`flex flex-col short:flex-row items-center justify-center gap-1 short:gap-2 py-2 short:py-1.5 rounded-lg transition-all ${
              moreActive ? "bg-purple-900/50 text-purple-400" : "text-gray-400"
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[11px] font-medium leading-tight short:text-xs">Altro</span>
          </button>
        </div>
      </nav>

      {/* Pannello "Altro" (solo mobile) */}
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent
          side="bottom"
          className="desk:hidden max-h-[90vh] overflow-y-auto bg-gray-900 border-purple-800/30 text-white rounded-t-2xl pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
        >
          <SheetHeader>
            <SheetTitle className="text-white text-left">
              {user?.stage_name || "DJ"}
            </SheetTitle>
            <SheetDescription className="sr-only">Altre sezioni della dashboard</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-1">
            {secondaryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMoreOpen(false);
                  handleItemClick(item.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.id)
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-300 active:bg-gray-800/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                setMoreOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 active:bg-red-900/20 border-t border-gray-800 mt-2 pt-4"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Esci</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}