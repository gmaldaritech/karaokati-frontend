import React from "react";
import { Heart, Mic2, LayoutDashboard, MapPin, Music, ListOrdered, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardSidebar({ activeSection, setActiveSection }) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: "overview", label: "Panoramica", icon: LayoutDashboard },
    { id: "venues", label: "Locali", icon: MapPin },
    { id: "catalog", label: "Catalogo", icon: Music },
    { id: "bookings", label: "Prenotazioni", icon: ListOrdered },
    { id: "settings", label: "Impostazioni", icon: Settings },
    { id: "support", label: "Supportaci", icon: Heart },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 p-4 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Mic2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Karaokati
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-64 bg-gray-900/50 backdrop-blur-sm border-r border-purple-800/30">
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
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-purple-800/30 p-2 z-50">
        <div className="grid grid-cols-5 gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                activeSection === item.id
                  ? "bg-purple-900/50 text-purple-400"
                  : "text-gray-400"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}