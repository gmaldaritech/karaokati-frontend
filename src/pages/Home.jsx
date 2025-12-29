// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { createPageUrl } from "@/utils";
// import { Coffee, Heart, Mic2, QrCode, Music, Sparkles, Clock, Users, Check, ArrowRight, Zap, Crown, MessageSquare, LayoutDashboard, MapPin, Calendar } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// export default function Home() {
//   useEffect(() => {
//     document.title = "Karaokati - Piattaforma Professionale per Gestione Karaoke | QR Code e Prenotazioni Real-time";
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
//       {/* Header */}
//       <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           {/* <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
//               <Mic2 className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Karaokati
//             </span>
//           </div> */}
//           <div className="flex items-center gap-3">
//             {/* <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
//               <Mic2 className="w-6 h-6 text-white" />
//             </div> */}
//             <img 
//               src="/logo2.png"
//               alt="Karaokati" 
//               className="h-8 w-auto"
//             />
//           </div>
//           <div className="flex items-center gap-4">
//             <Link to={createPageUrl("Access")}>
//               <Button variant="ghost" className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50">
//                 Accedi
//               </Button>
//             </Link>
//             <Link to={createPageUrl("Register")}>
//               <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
//                 Registrati Gratis
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center max-w-4xl mx-auto">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-6">
//               <Sparkles className="w-4 h-4 text-purple-400" />
//               <span className="text-sm font-medium text-purple-300">
//                 Gestisci il tuo karaoke in modo professionale
//               </span>
//             </div>
            
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
//               Addio ai{" "}
//               <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
//                 bigliettini
//               </span>
//               <br />
//               Benvenuto al futuro del karaoke
//             </h1>
            
//             <p className="text-xl text-gray-300 mb-10 leading-relaxed">
//               Karaokati è la piattaforma italiana che rivoluziona le serate karaoke per DJ professionisti. 
//               Gestisci prenotazioni in tempo reale con QR code, crea il tuo catalogo digitale e ricevi prenotazioni tramite un chatbot integrato.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link to={createPageUrl("Register")}>
//                 <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6">
//                   Inizia Gratis
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </Button>
//               </Link>
//             </div>

//             {/* Hero Cards */}
//             <div className="mt-16 relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl rounded-full" />
//               <div className="relative bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-800/30">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-none">
//                     <QrCode className="w-12 h-12 mb-4" />
//                     <h3 className="text-2xl font-bold mb-2">QR Code</h3>
//                     <p className="text-purple-100">Ogni DJ ha il suo codice personale</p>
//                   </Card>
//                   <Card className="p-6 bg-gradient-to-br from-pink-600 to-pink-700 text-white border-none">
//                     <Music className="w-12 h-12 mb-4" />
//                     <h3 className="text-2xl font-bold mb-2">80.000+</h3>
//                     <p className="text-pink-100">Titoli dei tuoi brani</p>
//                   </Card>
//                   <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
//                     <Clock className="w-12 h-12 mb-4" />
//                     <h3 className="text-2xl font-bold mb-2">Real-time</h3>
//                     <p className="text-blue-100">Prenotazioni istantanee via Chatbot</p>
//                   </Card>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Screenshots Section */}
//       <section className="py-20 px-6 bg-gray-900/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
//               Scopri Karaokati in azione
//             </h2>
//             <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//               Un'esperienza completa per DJ e clienti. Segui il percorso dalla registrazione alla gestione della serata.
//             </p>
//           </div>

//           {/* Screenshot Grid */}
//           <div className="space-y-20">
            
//             {/* Step 1: Venues - DJ creates venue */}
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div className="order-1 md:order-2">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">1</div>
//                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/50 border border-blue-700/50 rounded-full">
//                     <MapPin className="w-4 h-4 text-blue-400" />
//                     <span className="text-sm font-medium text-blue-300">Crea i Tuoi Locali</span>
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-white mb-4">
//                   Registrati e crea il tuo primo locale
//                 </h3>
//                 <p className="text-gray-400 text-lg mb-6 leading-relaxed">
//                   Dopo la registrazione, aggiungi i locali dove organizzi le serate karaoke. Inserisci nome, indirizzo e capacità. Attiva la serata con un semplice switch quando arrivi al locale.
//                 </p>
//                 <ul className="space-y-3">
//                   {["Registrazione gratuita in 30 secondi", "Aggiungi locali illimitati", "Attiva la serata con un click"].map((item, idx) => (
//                     <li key={idx} className="flex items-center gap-3 text-gray-300">
//                       <div className="w-5 h-5 bg-blue-900/50 border border-blue-700/50 rounded-full flex items-center justify-center">
//                         <Check className="w-3 h-3 text-blue-400" />
//                       </div>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="order-1 md:order-2">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl rounded-3xl" />
//                   <div className="relative bg-gray-800 rounded-2xl border border-purple-800/30 overflow-hidden shadow-2xl p-6">
//                     {/* Mock Venues UI */}
//                     <div className="flex items-center justify-between mb-6">
//                       <div>
//                         <h3 className="text-lg font-bold text-white">I Tuoi Locali</h3>
//                         <p className="text-sm text-gray-400">Gestisci i luoghi delle tue serate</p>
//                       </div>
//                       <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">
//                         + Aggiungi
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       {[
//                         { name: "Locale Rock", address: "Via Roma 123", active: true },
//                         { name: "Blue Moon Bar", address: "Piazza Dante 45", active: false }
//                       ].map((venue, idx) => (
//                         <div key={idx} className={`p-4 rounded-xl border ${venue.active ? 'bg-green-900/20 border-green-700/50' : 'bg-gray-900/50 border-purple-800/30'}`}>
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-xl flex items-center justify-center">
//                               <MapPin className="w-5 h-5 text-purple-400" />
//                             </div>
//                             <div className={`w-10 h-5 rounded-full ${venue.active ? 'bg-green-600' : 'bg-gray-600'} relative`}>
//                               <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all ${venue.active ? 'right-0.5' : 'left-0.5'}`} />
//                             </div>
//                           </div>
//                           <div className="font-medium text-white text-sm">{venue.name}</div>
//                           <div className="text-xs text-gray-400 mt-1">{venue.address}</div>
//                           {venue.active && (
//                             <div className="mt-2 text-xs text-green-400 font-medium">● Serata Attiva</div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Step 2: Catalog */}
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div className="order-2 md:order-1">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-pink-600/20 blur-2xl rounded-3xl" />
//                   <div className="relative bg-gray-800 rounded-2xl border border-purple-800/30 overflow-hidden shadow-2xl p-6">
//                     {/* Mock Catalog UI */}
//                     <div className="flex items-center justify-between mb-6">
//                       <div>
//                         <h3 className="text-lg font-bold text-white">Catalogo Canzoni</h3>
//                         <p className="text-sm text-gray-400">1.250 brani nel tuo catalogo</p>
//                       </div>
//                       <div className="flex gap-2">
//                         <div className="px-3 py-1.5 bg-gray-700 rounded-lg text-white text-sm">
//                           Importa
//                         </div>
//                         <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">
//                           + Aggiungi
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mb-4">
//                       <div className="flex items-center gap-3 bg-gray-900/50 border border-purple-800/30 rounded-lg px-4 py-3">
//                         <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                         <span className="text-gray-500 text-sm">Cerca nel catalogo...</span>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       {[
//                         { artist: "Domenico Modugno", title: "Volare - Nel Blu Dipinto di Blu" },
//                         { artist: "Jovanotti", title: "Bella - Radio Edit" },
//                         { artist: "Umberto Tozzi", title: "Gloria - Original Version" },
//                         { artist: "Adriano Celentano", title: "Azzurro - Remastered" }
//                       ].map((song, idx) => (
//                         <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-purple-800/20 hover:border-purple-600/50 transition-colors">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-lg flex items-center justify-center">
//                               <Music className="w-5 h-5 text-purple-400" />
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-white">{song.artist}</div>
//                               <div className="text-xs text-gray-400">{song.title}</div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="order-1 md:order-2">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold">2</div>
//                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-900/50 border border-orange-700/50 rounded-full">
//                     <Music className="w-4 h-4 text-orange-400" />
//                     <span className="text-sm font-medium text-orange-300">Carica il Catalogo</span>
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-white mb-4">
//                   Costruisci il tuo repertorio digitale
//                 </h3>
//                 <p className="text-gray-400 text-lg mb-6 leading-relaxed">
//                   Carica i titoli delle tue canzoni in tre modi: importa da Excel, genera automaticamente dalle cartelle del tuo PC, oppure aggiungi manualmente.
//                 </p>
//                 <ul className="space-y-3">
//                   {["Importazione massiva da Excel", "Generazione automatica da cartelle", "Ricerca istantanea full-text"].map((item, idx) => (
//                     <li key={idx} className="flex items-center gap-3 text-gray-300">
//                       <div className="w-5 h-5 bg-orange-900/50 border border-orange-700/50 rounded-full flex items-center justify-center">
//                         <Check className="w-3 h-3 text-orange-400" />
//                       </div>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Step 3: Chatbot - Customers book */}
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div className="order-1 md:order-1">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-700 rounded-full flex items-center justify-center text-white font-bold">3</div>
//                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-900/50 border border-pink-700/50 rounded-full">
//                     <MessageSquare className="w-4 h-4 text-pink-400" />
//                     <span className="text-sm font-medium text-pink-300">Clienti Prenotano</span>
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-white mb-4">
//                   I clienti prenotano via chatbot
//                 </h3>
//                 <p className="text-gray-400 text-lg mb-6 leading-relaxed">
//                   I clienti scansionano il tuo QR code e accedono al chatbot. Cercano la canzone, scelgono la tonalità e prenotano in pochi secondi. Nessuna app da scaricare, funziona dal browser.
//                 </p>
//                 <ul className="space-y-3">
//                   {["QR code personale per ogni DJ", "Ricerca istantanea nel catalogo", "Selezione tonalità personalizzata"].map((item, idx) => (
//                     <li key={idx} className="flex items-center gap-3 text-gray-300">
//                       <div className="w-5 h-5 bg-pink-900/50 border border-pink-700/50 rounded-full flex items-center justify-center">
//                         <Check className="w-3 h-3 text-pink-400" />
//                       </div>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="order-2 md:order-2">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 blur-2xl rounded-3xl" />
//                   <div className="relative bg-gray-800 rounded-2xl border border-purple-800/30 overflow-hidden shadow-2xl">
//                     {/* Mock Chatbot UI */}
//                     <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                           <Mic2 className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <div className="font-bold text-white">Karaokati Assistant</div>
//                           <div className="text-xs text-purple-100">Locale Rock • Serata attiva 🎤</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-4 space-y-4 bg-gray-900">
//                       {/* Bot message */}
//                       <div className="flex gap-3">
//                         <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
//                           <Mic2 className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="bg-gray-800 border border-purple-800/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
//                           <p className="text-sm text-gray-200">🎤 Ciao! Benvenuto al Karaoke Night! Cerca una canzone scrivendo il titolo o l'artista!</p>
//                         </div>
//                       </div>
//                       {/* User message */}
//                       <div className="flex justify-end">
//                         <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
//                           <p className="text-sm text-white">Modugno</p>
//                         </div>
//                       </div>
//                       {/* Bot response with songs */}
//                       <div className="flex gap-3">
//                         <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
//                           <Mic2 className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="space-y-2 max-w-[85%]">
//                           <div className="bg-gray-800 border border-purple-800/30 rounded-2xl rounded-tl-sm px-4 py-3">
//                             <p className="text-sm text-gray-200">🔍 Ho trovato 2 canzoni!</p>
//                           </div>
//                           <div className="bg-gray-800/80 border border-purple-700/30 rounded-xl p-3">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 bg-purple-900/50 rounded-lg flex items-center justify-center">
//                                 <Music className="w-4 h-4 text-purple-400" />
//                               </div>
//                               <span className="text-gray-200 text-sm">Domenico Modugno - Volare</span>
//                             </div>
//                           </div>
//                           <div className="bg-gray-800/80 border border-purple-700/30 rounded-xl p-3">
//                              <div className="flex items-center gap-3">
//                                <div className="w-8 h-8 bg-purple-900/50 rounded-lg flex items-center justify-center">
//                                  <Music className="w-4 h-4 text-purple-400" />
//                                </div>
//                               <span className="text-gray-200 text-sm">Domenico Modugno - Tre briganti Tre somari</span>
//                              </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-4 border-t border-purple-800/30 bg-gray-900">
//                       <div className="flex gap-3">
//                         <div className="flex-1 bg-gray-800/50 border border-purple-800/50 rounded-lg px-4 py-3 text-gray-500 text-sm">
//                           Cerca canzone o artista...
//                         </div>
//                         <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
//                           <ArrowRight className="w-5 h-5 text-white" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Step 4: Bookings - DJ manages */}
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div className="order-2 md:order-1">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-purple-600/20 blur-2xl rounded-3xl" />
//                   <div className="relative bg-gray-800 rounded-2xl border border-purple-800/30 overflow-hidden shadow-2xl p-6">
//                     {/* Mock Bookings UI */}
//                     <div className="flex items-center justify-between mb-6">
//                       <div>
//                         <h3 className="text-lg font-bold text-white">Prenotazioni</h3>
//                         <div className="flex items-center gap-2 text-sm text-gray-400">
//                           <MapPin className="w-3 h-3 text-purple-400" />
//                           <span>Locale: <span className="text-purple-400">Locale Rock</span></span>
//                         </div>
//                       </div>
//                       <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">
//                         + Prenota
//                       </div>
//                     </div>
//                     <div className="space-y-3">
//                       {[
//                         { name: "Marco", song: "Volare - Modugno", status: "pending", time: "2 min fa" },
//                         { name: "Laura", song: "Bella - Jovanotti", status: "pending", time: "5 min fa" },
//                         { name: "Giuseppe", song: "Gloria - Umberto Tozzi", status: "accepted", time: "8 min fa" }
//                       ].map((booking, idx) => (
//                         <div key={idx} className={`p-4 bg-gray-900/50 rounded-xl border ${booking.status === 'pending' ? 'border-yellow-700/50' : 'border-purple-800/20'}`}>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center">
//                                 <span className="text-sm font-bold text-purple-400">{booking.name[0]}</span>
//                               </div>
//                               <div>
//                                 <div className="flex items-center gap-2">
//                                   <span className="font-medium text-white text-sm">{booking.name}</span>
//                                   <span className={`text-xs px-2 py-0.5 rounded-full ${booking.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-green-900/50 text-green-300'}`}>
//                                     {booking.status === 'pending' ? 'In Attesa' : 'Accettata'}
//                                   </span>
//                                 </div>
//                                 <div className="text-xs text-gray-400">{booking.song}</div>
//                               </div>
//                             </div>
//                             {booking.status === 'pending' && (
//                               <div className="flex gap-2">
//                                 <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center">
//                                   <Check className="w-4 h-4 text-green-400" />
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="order-1 md:order-2">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold">4</div>
//                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/50 border border-green-700/50 rounded-full">
//                     <Calendar className="w-4 h-4 text-green-400" />
//                     <span className="text-sm font-medium text-green-300">Gestisci Prenotazioni</span>
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-white mb-4">
//                   Accetta e gestisci le richieste
//                 </h3>
//                 <p className="text-gray-400 text-lg mb-6 leading-relaxed">
//                   Ricevi le prenotazioni in tempo reale nella tua dashboard. Accetta, rifiuta o aggiungi prenotazioni manuali. Esporta la lista in Excel per tenerla sempre a portata di mano o per usarla come Borderò.
//                 </p>
//                 <ul className="space-y-3">
//                   {["Notifiche in tempo reale", "Accetta o rifiuta con un tap", "Esporta la lista in Excel"].map((item, idx) => (
//                     <li key={idx} className="flex items-center gap-3 text-gray-300">
//                       <div className="w-5 h-5 bg-green-900/50 border border-green-700/50 rounded-full flex items-center justify-center">
//                         <Check className="w-3 h-3 text-green-400" />
//                       </div>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Step 5: Dashboard Overview */}
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div className="order-1 md:order-1">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold">5</div>
//                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-900/50 border border-purple-700/50 rounded-full">
//                     <LayoutDashboard className="w-4 h-4 text-purple-400" />
//                     <span className="text-sm font-medium text-purple-300">Dashboard Completa</span>
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-white mb-4">
//                   Tutto sotto controllo
//                 </h3>
//                 <p className="text-gray-400 text-lg mb-6 leading-relaxed">
//                   Una dashboard completa per gestire la tua serata. Crea i tuoi locali, gestisci il catalogo, monitora le prenotazioni in tempo reale e scarica il tuo QR code personale.
//                 </p>
//                 <ul className="space-y-3">
//                   {["QR Code personale scaricabile", "Gestione catalogo semplificata", "Gestione delle prenotazioni"].map((item, idx) => (
//                     <li key={idx} className="flex items-center gap-3 text-gray-300">
//                       <div className="w-5 h-5 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center">
//                         <Check className="w-3 h-3 text-purple-400" />
//                       </div>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="order-2 md:order-2">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-2xl rounded-3xl" />
//                   <div className="relative bg-gray-800 rounded-2xl border border-purple-800/30 overflow-hidden shadow-2xl">
//                     {/* Mock Dashboard UI */}
//                     <div className="flex">
//                       {/* Sidebar */}
//                       <div className="w-16 bg-gray-900 border-r border-purple-800/30 p-3 space-y-4">
//                         <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
//                           <Mic2 className="w-5 h-5 text-white" />
//                         </div>
//                         <div className="space-y-3 pt-4">
//                           {[LayoutDashboard, MapPin, Music, Calendar].map((Icon, idx) => (
//                             <div key={idx} className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto ${idx === 0 ? 'bg-purple-900/50 border border-purple-700/50' : 'hover:bg-gray-800'}`}>
//                               <Icon className={`w-5 h-5 ${idx === 0 ? 'text-purple-400' : 'text-gray-500'}`} />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                       {/* Main content */}
//                       <div className="flex-1 p-6 bg-gray-900/50">
//                         <div className="mb-6">
//                           <h3 className="text-xl font-bold text-white mb-1">Panoramica</h3>
//                           <p className="text-sm text-gray-400">Vista generale della tua attività</p>
//                         </div>
//                         <div className="grid grid-cols-3 gap-4 mb-6">
//                           <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-3 md:p-4">
//                             <div className="text-xl md:text-2xl font-bold text-white">1.250</div>
//                             <div className="text-xs text-gray-400 truncate">Canzoni</div>
//                           </div>
//                           <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-3 md:p-4">
//                             <div className="text-xl md:text-2xl font-bold text-green-400">Attivo</div>
//                             <div className="text-xs text-gray-400 break-words">Pub Rock</div>
//                           </div>
//                           <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-3 md:p-4">
//                             <div className="text-2xl font-bold text-white">12</div>
//                             <div className="text-xs text-gray-400 truncate">Prenotazioni</div>
//                           </div>
//                         </div>
//                         <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-4">
//                           <div className="text-sm font-medium text-white mb-3">QR Code Personale</div>
//                           <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
//                             <QrCode className="w-16 h-16 text-gray-900" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       {/* <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
//               Tutto quello che ti serve
//             </h2>
//             <p className="text-xl text-gray-400">
//               Una piattaforma completa per gestire le tue serate karaoke professionali
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { icon: QrCode, title: "QR Code Personale", description: "Ogni DJ riceve un QR code unico. Gli utenti lo scansionano per prenotare.", color: "from-purple-600 to-purple-700" },
//               { icon: Music, title: "Catalogo Digitale", description: "Carica fino a 80.000 titoli. Gestisci il repertorio facilmente.", color: "from-pink-600 to-pink-700" },
//               { icon: Sparkles, title: "Genera Automaticamente", description: "Scansiona le cartelle e crea il catalogo automaticamente.", color: "from-cyan-600 to-blue-600" },
//               { icon: Users, title: "Gestione Locali", description: "Crea e gestisci tutti i tuoi locali. Attiva la serata con un click.", color: "from-blue-600 to-blue-700" },
//               { icon: Clock, title: "Real-time", description: "Visualizza le richieste in tempo reale. Accetta o rifiuta con un tap.", color: "from-green-600 to-green-700" },
//               { icon: Mic2, title: "Chatbot", description: "Gli utenti prenotano tramite chat interattiva. Semplice e immediato.", color: "from-orange-600 to-red-600" }
//             ].map((feature, idx) => (
//               <Card key={idx} className="p-8 bg-gray-800/50 backdrop-blur-sm border-purple-800/30 hover:border-purple-600/50 hover:shadow-xl transition-all">
//                 <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
//                   <feature.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
//                 <p className="text-gray-400 leading-relaxed">{feature.description}</p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* Pricing Section */}
//       {/* <section className="py-20 px-6 bg-gray-900/50"> */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
//               Un Solo Piano: Tutto Incluso
//             </h2>
//           </div>

//           {/* Promo Pro Plan - Solo questo visibile inizialmente */}
//           <div className="max-w-xl mx-auto mb-20">
//             <Card className="p-10 bg-gradient-to-br from-purple-900/70 to-pink-900/70 border-4 border-purple-500 relative overflow-hidden shadow-2xl">
//               {/* Badge promozione */}
//               <div className="absolute -right-12 top-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-16 py-2 rotate-45 font-bold text-sm shadow-lg">
//                 SEMPRE GRATIS
//               </div>

//               {/* Animated glow */}
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 animate-pulse" />

//               <div className="relative">
//                 <div className="flex items-center justify-center gap-3 mb-6">
//                   <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
//                     <Sparkles className="w-9 h-9 text-white" />
//                   </div>
//                   <div className="text-center">
//                     <h3 className="text-3xl font-bold text-white">Karaokati</h3>
//                     <p className="text-purple-200 font-medium">Tutte le funzionalità incluse</p>
//                   </div>
//                 </div>

//                 {/* Pricing */}
//                 <div className="text-center mb-8">
//                   <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text mb-2">
//                     100% GRATIS
//                   </div>
//                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 border border-green-600 rounded-full mb-3">
//                     <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
//                     <span className="text-lg font-bold text-green-300">Per Sempre</span>
//                   </div>
//                   <p className="text-purple-200 text-sm">
//                     Nessun costo nascosto • Nessuna carta richiesta • Sempre gratuito
//                   </p>
//                 </div>

//                 {/* Features Grid */}
//                 <div className="grid md:grid-cols-2 gap-4 mb-8">
//                   {[
//                     "Locali illimitati",
//                     "Fino a 80.000 titoli",
//                     "Importazione massiva Excel",
//                     "Generazione catalogo automatica",
//                     "QR Code personalizzati",
//                     "Esportazione dati",
//                     "Chatbot integrato"
//                   ].map((feature, idx) => (
//                     <div key={idx} className="flex items-center gap-3 bg-purple-900/40 backdrop-blur-sm rounded-xl p-3 border border-purple-700/30">
//                       <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
//                         <Check className="w-4 h-4 text-green-400" />
//                       </div>
//                       <span className="text-gray-100 font-medium">{feature}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <Link to={createPageUrl("Register")}>
//                   <Button className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-7 text-xl font-bold shadow-2xl">
//                     <Sparkles className="w-6 h-6 mr-2 animate-pulse" />
//                     Inizia Gratis Ora
//                     <ArrowRight className="w-6 h-6 ml-2" />
//                   </Button>
//                 </Link>

//                 <div className="mt-4 text-center">
//                   <p className="text-xs text-purple-300">
//                     💜 Supporto volontario disponibile per chi vuole aiutare il progetto
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* Il futuro di Karaokati */}
//             <div className="max-w-4xl mx-auto">
//             <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-purple-600/30 p-10 rounded-2xl">
//               <div className="text-center mb-8">
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-6">
//                   <Heart className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-white mb-4">
//                   Vuoi sostenerci?
//                 </h3>
//                 <p className="text-gray-300 text-lg leading-relaxed">
//                   Karaokati rimarrà sempre <strong className="text-purple-300">100% gratuito</strong> per tutti. 
//                   Se apprezzi il progetto e vuoi aiutarci a mantenerlo attivo, puoi sostenerci con una donazione volontaria.
//                 </p>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4 mb-6">
//                 <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-600/30 p-6 rounded-xl text-center opacity-60">
//                   <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Coffee className="w-8 h-8 text-white" />
//                   </div>
//                   <h4 className="text-xl font-bold text-white mb-2">Buy Me a Coffee</h4>
//                   <p className="text-gray-300 text-sm">In arrivo</p>
//                 </div>
//                 <a href="#" className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-600/50 p-6 rounded-xl hover:border-blue-500 transition text-center block">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Heart className="w-8 h-8 text-white" />
//                   </div>
//                   <h4 className="text-xl font-bold text-white mb-2">PayPal</h4>
//                   <p className="text-gray-300 text-sm">Disponibile ora</p>
//                 </a>
//               </div>

//               <ul className="space-y-2 text-gray-300">
//                 <li className="flex items-start gap-3">
//                   <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                   <span><strong className="text-white">Completamente facoltativo</strong> - il servizio resta identico con o senza donazione</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                   <span><strong className="text-white">Tu decidi quanto</strong> - nessun importo minimo o consigliato</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                   <span><strong className="text-white">Nessuna funzionalità premium</strong> - tutti hanno accesso a tutto</span>
//                 </li>
//               </ul>
//               <div className="text-center">
//                 <p className="text-gray-400 text-sm leading-relaxed mt-8">
//                   💜 Il futuro di Karaokati dipende dalla community. Se ci sarà interesse, 
//                   la piattaforma continuerà a crescere e migliorare. 
//                   Sempre con <strong className="text-purple-300">trasparenza</strong> e <strong className="text-purple-300">rispetto</strong> per chi la usa.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-6 bg-gray-900/50">
//         <div className="max-w-5xl mx-auto">
//           <Card className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white p-12 md:p-16 text-center border-none">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Pronto a rivoluzionare le tue serate?
//             </h2>
//             <p className="text-xl mb-8 text-purple-100">
//               Unisciti a centinaia di DJ che hanno già scelto Karaokati
//             </p>
//             <Link to={createPageUrl("Register")}>
//               <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white text-lg px-10 py-6">
//                 Registrati Ora - È Gratis
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//             </Link>
//           </Card>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-950 text-white py-12 px-6 border-t border-purple-800/30">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               {/* <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
//                   <Mic2 className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="text-xl font-bold">Karaokati</span>
//               </div> */}
//               <div className="flex items-center gap-3">
//               <img 
//                 src="/logo2.png"
//                 alt="Karaokati" 
//                 className="h-8 w-auto"
//               />
//             </div>
//               <br></br>
//               <p className="text-gray-400">
//                 La piattaforma italiana numero uno per DJ karaoke professionisti
//               </p>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Prodotto</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition">Funzionalità</a></li>
//                 <li><Link to={createPageUrl("Register")} className="hover:text-white transition">Registrati</Link></li>
//                 <li><Link to={createPageUrl("Access")} className="hover:text-white transition">Accedi</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Supporto</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><Link to={createPageUrl("Support")} className="hover:text-white transition">Fai una donazione</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Informazioni</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><Link to={createPageUrl("TermsOfService")} className="hover:text-white transition">Termini di servizio</Link></li>
//                 <li><Link to="/TermsOfService" className="hover:text-white transition">Contatti</Link></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
//             <p>© 2025 Karaokati. Tutti i diritti riservati.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, Mic2, QrCode, Music, Sparkles, Clock, Users, Check, ArrowRight, ChevronLeft, ChevronRight, Coffee, MapPin, Calendar, MessageSquare, LayoutDashboard, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    document.title = "Karaokati - Piattaforma Professionale per Gestione Karaoke | QR Code e Prenotazioni Real-time";
  }, []);

  const slides = [
    {
      id: 1,
      step: "1",
      icon: MapPin,
      title: "Aggiungi i Tuoi Locali",
      subtitle: "Registrati e aggiungi i locali",
      description: "Dopo la registrazione, aggiungi i locali dove organizzi le serate karaoke. Attiva la serata con un semplice click quando arrivi al locale.",
      features: ["Registrazione gratuita in 30 secondi", "Aggiungi locali illimitati", "Attiva la serata con un click"],
      color: "from-blue-600 to-blue-700",
      borderColor: "border-blue-600/50",
      mobileIcon: "🏢",
      mobileTitle: "Aggiungi i Tuoi Locali",
      mobileDesc: "Aggiungi i tuoi locali e attiva la serata con un click"
    },
    {
      id: 2,
      step: "2",
      icon: Music,
      title: "Carica il Catalogo",
      subtitle: "Costruisci il tuo repertorio digitale",
      description: "Carica i titoli delle tue canzoni in tre modi: importa da Excel, genera automaticamente, oppure aggiungi manualmente.",
      features: ["Importazione massiva da Excel", "Generazione automatica da cartelle", "Ricerca istantanea full-text"],
      color: "from-orange-600 to-orange-700",
      borderColor: "border-orange-600/50",
      mobileIcon: "🎵",
      mobileTitle: "Carica il Catalogo",
      mobileDesc: "Importa da Excel o aggiungi manualmente le tue canzoni"
    },
    {
      id: 3,
      step: "3",
      icon: MessageSquare,
      title: "Clienti Prenotano",
      subtitle: "I clienti prenotano via chatbot",
      description: "I clienti scansionano il tuo QR code e accedono al chatbot. Cercano la canzone, scelgono la tonalità e prenotano in pochi secondi. Nessuna app da scaricare, funziona dal browser.",
      features: ["QR code personale per ogni DJ", "Ricerca istantanea nel catalogo", "Selezione tonalità personalizzata"],
      color: "from-pink-600 to-pink-700",
      borderColor: "border-pink-600/50",
      mobileIcon: "📱",
      mobileTitle: "Clienti Prenotano",
      mobileDesc: "I clienti scansionano il QR e prenotano via chatbot"
    },
    {
      id: 4,
      step: "4",
      icon: Calendar,
      title: "Gestisci Prenotazioni",
      subtitle: "Accetta e gestisci le richieste",
      description: "Ricevi le prenotazioni in tempo reale nella tua dashboard. Accetta, rifiuta o aggiungi prenotazioni manuali. Esporta la lista in Excel per tenerla sempre a portata di mano o per usarla come Borderò.",
      features: ["Notifiche in tempo reale", "Accetta o rifiuta con un tap", "Esporta la lista in Excel"],
      color: "from-green-600 to-green-700",
      borderColor: "border-green-600/50",
      mobileIcon: "✅",
      mobileTitle: "Gestisci Prenotazioni",
      mobileDesc: "Accetta o rifiuta prenotazioni in tempo reale"
    },
    {
      id: 5,
      step: "5",
      icon: LayoutDashboard,
      title: "Dashboard Completa",
      subtitle: "Tutto sotto controllo",
      description: "Una dashboard completa per gestire la tua serata. Crea i tuoi locali, gestisci il catalogo, monitora le prenotazioni in tempo reale e scarica il tuo QR code personale.",
      features: ["QR Code personale scaricabile", "Gestione catalogo semplificata", "Gestione delle prenotazioni"],
      color: "from-purple-600 to-purple-700",
      borderColor: "border-purple-600/50",
      mobileIcon: "📊",
      mobileTitle: "Dashboard Completa",
      mobileDesc: "Controlla tutto dalla tua dashboard professionale"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Mobile header component (for mobile AND tablet)
  const MobileHeader = () => (
    <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-purple-800/30 z-50 lg:hidden">
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="/logo2.png"
            alt="Karaokati" 
            className="h-7 w-auto"
          />
        </div>
        <div className="flex items-center gap-3">
          <Link to={createPageUrl("Access")}>
            <a className="text-purple-300 hover:text-purple-100 px-3 py-1.5 rounded-lg hover:bg-purple-900/50 transition text-sm">
              Accedi
            </a>
          </Link>
          <Link to={createPageUrl("Register")}>
            <a className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
              Registrati Gratis
            </a>
          </Link>
        </div>
      </div>
    </header>
  );

  // Desktop header component
  const DesktopHeader = () => (
    <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-purple-800/30 z-50 hidden lg:block">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/logo2.png"
            alt="Karaokati" 
            className="h-8 w-auto"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link to={createPageUrl("Access")}>
            <a className="text-purple-300 hover:text-purple-100 px-4 py-2 rounded-lg hover:bg-purple-900/50 transition">
              Accedi
            </a>
          </Link>
          <Link to={createPageUrl("Register")}>
            <a className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg transition">
              Registrati Gratis
            </a>
          </Link>
        </div>
      </div>
    </header>
  );

  // Mobile hero section (for mobile AND tablet)
  const MobileHero = () => (
    <section className={`pt-20 pb-12 px-4 lg:hidden ${isTablet ? 'pt-24 pb-16' : ''}`}>
      <div className={`text-center ${isTablet ? 'max-w-4xl mx-auto' : ''}`}>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-purple-900/50 border border-purple-700/50 rounded-full mb-4 ${isTablet ? 'px-4 py-2 mb-6' : ''}`}>
          <Sparkles className={`text-purple-400 ${isTablet ? 'w-4 h-4' : 'w-3 h-3'}`} />
          <span className={`font-medium text-purple-300 ${isTablet ? 'text-sm' : 'text-xs'}`}>
            Gestisci il tuo karaoke in modo professionale
          </span>
        </div>
        
        <h1 className={`font-bold mb-4 leading-tight text-white ${isTablet ? 'text-5xl mb-6' : 'text-3xl'}`}>
          Addio ai{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            bigliettini
          </span>
          <br />
          {isTablet ? 'Benvenuto al futuro del karaoke' : 'Karaoke digitale'}
        </h1>
        
        <p className={`text-gray-300 mb-6 leading-relaxed px-2 ${isTablet ? 'text-lg mb-8 max-w-3xl mx-auto px-0' : ''}`}>
          {isTablet ? 
            'Karaokati è la piattaforma italiana che rivoluziona le serate karaoke per DJ professionisti. Crea il tuo catalogo digitale, distribusici il tuo QR code personale e ricevi prenotazioni in tempo reale tramite un chatbot integrato. Completamente gratuito.' :
            'Karaokati è la piattaforma italiana che rivoluziona le serate karaoke per DJ professionisti. Crea il tuo catalogo digitale, distribusici il tuo QR code personale e ricevi prenotazioni in tempo reale tramite un chatbot integrato. Completamente gratuito.'
          }
        </p>

        <div className={`space-y-3 mb-8 ${isTablet ? 'flex flex-col sm:flex-row gap-4 justify-center space-y-0' : ''}`}>
          <Link to={createPageUrl("Register")}>
            <a className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition inline-flex items-center justify-center gap-2 ${isTablet ? 'px-8 py-4 text-lg' : 'block px-6 py-3'}`}>
              Inizia Gratis
              {isTablet && <ArrowRight className="w-5 h-5" />}
            </a>
          </Link>
        </div>

        {/* Hero feature cards */}
        <div className={`${isTablet ? 'mt-16 relative' : 'grid grid-cols-2 gap-3'}`}>
          {isTablet ? (
            // Tablet version - similar to desktop
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl rounded-full" />
              <div className="relative bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-800/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-none rounded-xl">
                    <QrCode className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">QR Code</h3>
                    <p className="text-purple-100">Ogni DJ ha il suo codice personale</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-pink-600 to-pink-700 text-white border-none rounded-xl">
                    <Music className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">80.000+</h3>
                    <p className="text-pink-100">Titoli dei tuoi brani</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none rounded-xl">
                    <Clock className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Real-time</h3>
                    <p className="text-blue-100">Prenotazioni istantanee</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Mobile version - compact grid
            <>
              <div className="p-4 bg-purple-900/30 backdrop-blur-sm rounded-xl border border-purple-800/30">
                <QrCode className="w-8 h-8 mb-2 mx-auto text-purple-400" />
                <h3 className="text-sm font-bold text-white mb-1">QR Code</h3>
                <p className="text-xs text-purple-200">Personale</p>
              </div>
              <div className="p-4 bg-pink-900/30 backdrop-blur-sm rounded-xl border border-pink-800/30">
                <Music className="w-8 h-8 mb-2 mx-auto text-pink-400" />
                <h3 className="text-sm font-bold text-white mb-1">Catalogo</h3>
                <p className="text-xs text-pink-200">Digitale</p>
              </div>
              <div className="p-4 bg-blue-900/30 backdrop-blur-sm rounded-xl border border-blue-800/30">
                <Clock className="w-8 h-8 mb-2 mx-auto text-blue-400" />
                <h3 className="text-sm font-bold text-white mb-1">Prenotazioni</h3>
                <p className="text-xs text-blue-200">Real-time</p>
              </div>
              <div className="p-4 bg-green-900/30 backdrop-blur-sm rounded-xl border border-green-800/30">
                <Users className="w-8 h-8 mb-2 mx-auto text-green-400" />
                <h3 className="text-sm font-bold text-white mb-1">Chatbot</h3>
                <p className="text-xs text-green-200">Integrato</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );

  // Mobile carousel section
  const MobileCarousel = () => (
    <section className="py-12 px-4 lg:hidden bg-gray-900/50">
      <div className="text-center mb-8">
        <h2 className={`font-bold mb-2 text-white ${isTablet ? 'text-3xl' : 'text-2xl'}`}>
          Come funziona Karaokati
        </h2>
        <p className={`text-gray-400 ${isTablet ? 'text-base' : 'text-sm'}`}>
          5 semplici passaggi per la rivoluzione digitale
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={slide.id} className="w-full flex-shrink-0 px-2">
                <div className={`bg-gray-800/50 backdrop-blur-sm border-2 ${slide.borderColor} rounded-2xl overflow-hidden`}>
                  <div className="p-4 border-t border-purple-800/30">
                    
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center gap-2 mb-8">
                        <div className={`w-8 h-8 bg-gradient-to-br ${slide.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{slide.step}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white">{slide.mobileTitle}</h3>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {slide.description}
                      </p>
                    </div>

                    {/* Enhanced feature list */}
                    {/* <div className="space-y-2">
                      {slide.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-3 h-3 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div> */}
                  </div>
                  {/* Mobile/Tablet Mockup */}
                  <div className={`p-4 flex items-center justify-center ${isTablet ? 'min-h-[280px]' : 'min-h-[200px]'}`}>
                    {/* Step 1: Venues Mobile */}
                    {slide.id === 1 && (
                      <div className="w-full max-w-xs">
                        <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 p-4">
                          <h4 className="text-lg font-bold text-white mb-4 text-center">I Tuoi Locali</h4>
                          <div className="space-y-3">
                            {[
                              { name: "Locale Rock", active: true },
                              { name: "Blue Moon Bar", active: false }
                            ].map((venue, idx) => (
                              <div key={idx} className={`p-3 rounded-lg border ${venue.active ? 'bg-green-900/20 border-green-700/50' : 'bg-gray-900/50 border-purple-800/30'}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-purple-400" />
                                    <span className="text-white text-sm font-medium">{venue.name}</span>
                                  </div>
                                  <div className={`w-8 h-4 rounded-full ${venue.active ? 'bg-green-600' : 'bg-gray-600'} relative`}>
                                    <div className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transition-all ${venue.active ? 'right-0.5' : 'left-0.5'}`} />
                                  </div>
                                </div>
                                {venue.active && (
                                  <div className="text-xs text-green-400 mt-1">● Serata Attiva</div>
                                )}
                              </div>
                            ))}
                          </div>
                          <button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-3 rounded-lg text-sm font-medium">
                            + Aggiungi Locale
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Catalog Mobile */}
                    {slide.id === 2 && (
                      <div className="w-full max-w-xs">
                        <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-white">Catalogo</h4>
                            <div className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">+ Aggiungi</div>
                            <span className="text-xs text-gray-400">1.250 brani</span>
                          </div>
                          <div className="mb-3">
                            <div className="flex items-center gap-2 bg-gray-900/50 border border-purple-800/30 rounded-lg px-3 py-2">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <span className="text-gray-500 text-xs">Cerca...</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {[
                              { artist: "Modugno", title: "Volare" },
                              { artist: "Jovanotti", title: "Bella" }
                              // { artist: "Tozzi", title: "Gloria" }
                            ].map((song, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-2 bg-gray-900/50 rounded-lg border border-purple-800/20">
                                <Music className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="text-white text-sm font-medium truncate">{song.artist}</div>
                                  <div className="text-gray-400 text-xs truncate">{song.title}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Chatbot Mobile */}
                    {slide.id === 3 && (
                      <div className="w-full max-w-xs">
                        <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3">
                            <div className="flex items-center gap-2">
                              <Mic2 className="w-5 h-5 text-white" />
                              <div>
                                <div className="text-white text-sm font-bold">Karaokati Bot</div>
                                <div className="text-purple-100 text-xs">Locale Rock 🎤</div>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 space-y-3 min-h-[120px]">
                            <div className="flex gap-2">
                              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Mic2 className="w-3 h-3 text-white" />
                              </div>
                              <div className="bg-gray-800 border border-purple-800/30 rounded-lg px-2 py-1 max-w-[80%]">
                                <p className="text-gray-200 text-xs">🎤 Ciao! Benvenuto! Cerca una canzone scrivendo il titolo o l'artista!</p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-2 py-1 max-w-[60%]">
                                <p className="text-white text-xs">Volare</p>
                              </div>
                            </div>
                            <div className="bg-gray-800/90 border border-purple-700/40 rounded-lg p-2">
                              <div className="flex items-center gap-2">
                                <Music className="w-4 h-4 text-purple-400" />
                                <div>
                                  <div className="text-gray-200 text-xs font-medium">Modugno - Volare</div>
                                  <div className="text-gray-400 text-xs">Tap per prenotare</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Step 4: Bookings Mobile */}
                    {slide.id === 4 && (
                      <div className="w-full max-w-xs">
                        <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-white">Prenotazioni</h4>
                            <div className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded text-white text-xs">
                              +
                            </div>
                          </div>
                          <div className="space-y-2">
                            {[
                              { name: "Marco", song: "Volare", status: "pending" },
                              { name: "Laura", song: "Bella", status: "accepted" }
                            ].map((booking, idx) => (
                              <div key={idx} className={`p-2 rounded-lg border ${booking.status === 'pending' ? 'bg-yellow-900/20 border-yellow-700/50' : 'bg-green-900/20 border-green-700/50'}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <div className="w-6 h-6 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                                      <span className="text-xs font-bold text-purple-400">{booking.name[0]}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1 mb-1">
                                        <div className="text-white text-xs font-medium truncate">{booking.name}</div>
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${booking.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-green-900/50 text-green-300'}`}>
                                          {booking.status === 'pending' ? 'In Attesa' : 'Accettata'}
                                        </span>
                                      </div>
                                      <div className="text-gray-400 text-xs truncate">{booking.song}</div>
                                    </div>
                                  </div>
                                  {booking.status === 'pending' && (
                                    <div className="w-6 h-6 bg-green-900/50 rounded flex items-center justify-center flex-shrink-0">
                                      <Check className="w-3 h-3 text-green-400" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Step 5: Dashboard Mobile */}
                    {slide.id === 5 && (
                      <div className="w-full max-w-xs">
                        <div className="bg-gray-900/90 rounded-xl border border-purple-800/30 p-4">
                          <h4 className="text-lg font-bold text-white mb-4 text-center">Dashboard</h4>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="bg-gray-800/50 border border-purple-800/30 rounded-lg p-2 text-center">
                              <div className="text-lg font-bold text-white">1.250</div>
                              <div className="text-xs text-gray-400">Canzoni</div>
                            </div>
                            <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-2 text-center">
                              <div className="text-lg font-bold text-green-400">Attivo</div>
                              <div className="text-xs text-gray-400">Locale</div>
                            </div>
                            <div className="bg-gray-800/50 border border-purple-800/30 rounded-lg p-2 text-center">
                              <div className="text-lg font-bold text-white">12</div>
                              <div className="text-xs text-gray-400">Richieste</div>
                            </div>
                            <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-2 text-center">
                              <QrCode className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                              <div className="text-xs text-gray-400">QR Code</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {[LayoutDashboard, MapPin, Music, Calendar].map((Icon, idx) => (
                              <div key={idx} className={`flex-1 p-2 rounded-lg flex items-center justify-center ${idx === 0 ? 'bg-purple-900/50 border border-purple-700/50' : 'bg-gray-800/50'}`}>
                                <Icon className={`w-5 h-5 ${idx === 0 ? 'text-purple-400' : 'text-gray-500'}`} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile Content */}
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 border border-purple-800/30 rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-purple-400" />
          </button>

          <div className="flex gap-1">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'w-6 bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'w-2 bg-gray-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 border border-purple-800/30 rounded-full flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-purple-400" />
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-400 text-sm">
            {currentSlide + 1} di {slides.length}
          </span>
        </div>
      </div>

      {/* Mobile Understanding Section */}
      {/* <div className="mt-12 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-3 text-center">L'idea dietro Karaokati</h3>
        <p className="text-gray-200 text-sm leading-relaxed mb-4">
          <strong className="text-white">Il problema:</strong> I DJ karaoke gestiscono tutto con carta, penna e bigliettini. 
          I clienti fanno la fila, scrivono male i titoli, i fogli si perdono e la serata diventa caotica.
        </p>
        <p className="text-gray-200 text-sm leading-relaxed">
          <strong className="text-white">La soluzione:</strong> Karaokati digitalizza tutto. I clienti scansionano il tuo QR, 
          trovano le canzoni nel tuo catalogo digitale e prenotano via chatbot. Tu gestisci tutto dalla dashboard in tempo reale. 
          <strong className="text-purple-300"> Zero stress, massima professionalità</strong>.
        </p>
      </div> */}
    </section>
  );

  // Mobile pricing section
  const MobilePricing = () => (
    <section className="py-12 px-4 lg:hidden">
      <div className="text-center mb-8">
        <h2 className={`font-bold mb-2 text-white ${isTablet ? 'text-3xl' : 'text-2xl'}`}>
          Un Solo Piano: Tutto Incluso
        </h2>
      </div>

      <div className={`bg-gradient-to-br from-purple-900/70 to-pink-900/70 border-2 border-purple-500 relative overflow-hidden shadow-2xl rounded-2xl p-6 ${isTablet ? 'max-w-2xl mx-auto' : ''}`}>
        <div className={`absolute bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rotate-45 ${isTablet ? '-right-12 top-8 px-16 py-2 text-sm' : '-right-8 top-4 px-12 py-1 text-xs'}`}>
          GRATIS
        </div>
        
        <div className="text-center mb-6">
          <div className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 ${isTablet ? 'w-16 h-16' : 'w-12 h-12'}`}>
            <Sparkles className={`text-white ${isTablet ? 'w-8 h-8' : 'w-6 h-6'}`} />
          </div>
          <h3 className={`font-bold text-white mb-1 ${isTablet ? 'text-2xl' : 'text-xl'}`}>Karaokati</h3>
          <p className={`text-purple-200 ${isTablet ? 'text-base' : 'text-sm'}`}>Tutte le funzionalità</p>
        </div>

        <div className="text-center mb-6">
          <div className={`font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text mb-2 ${isTablet ? 'text-6xl' : 'text-4xl'}`}>
            100% GRATIS
          </div>
          <p className={`text-purple-200 ${isTablet ? 'text-sm' : 'text-xs'}`}>
            Per Sempre • Nessun costo
          </p>
        </div>

        <div className={`space-y-2 mb-6 ${isTablet ? 'grid grid-cols-2 gap-3 space-y-0' : ''}`}>
          {[
            "Locali illimitati",
            "QR Code personalizzati", 
            "Chatbot integrato",
            "Esportazione dati"
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-purple-900/40 backdrop-blur-sm rounded-lg p-2">
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className={`text-gray-100 font-medium ${isTablet ? 'text-base' : 'text-sm'}`}>{feature}</span>
            </div>
          ))}
        </div>

        <Link to={createPageUrl("Register")}>
          <a className={`block w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold rounded-lg text-center ${isTablet ? 'py-6 text-xl' : 'py-4 text-lg'}`}>
            Inizia Gratis
          </a>
        </Link>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 ">
      {/* Headers */}
      <MobileHeader />
      <DesktopHeader />

      {/* Mobile Layout (for mobile AND tablet) */}
      {(isMobile || isTablet) ? (
        <>
          <MobileHero />
          
          {/* Mobile Overview Section */}
          <section className="pt-4 pb-6 px-4 lg:hidden">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-900/50 border border-purple-700/50 rounded-full mb-4">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-xs font-medium text-purple-300">La Rivoluzione Digitale</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Dimentica carta e penna.{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  È tutto digitale
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base">
                Basta bigliettini che si perdono, confusione delle prenotazioni scritte a mano 
                e code interminabili. Karaokati porta le tue serate karaoke nell'era digitale.
              </p>
            </div>

            <div className={`grid gap-6 mb-8 ${isTablet ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Niente più bigliettini</h3>
                <p className="text-gray-400 text-sm">
                  Elimina carta, penna e la confusione di tenere traccia manualmente delle prenotazioni
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Tutto in tempo reale</h3>
                <p className="text-gray-400 text-sm">
                  Le prenotazioni arrivano istantaneamente sulla tua dashboard
                </p>
              </div>

              <div className={`bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6 text-center ${isTablet ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Esperienza migliore</h3>
                <p className="text-gray-400 text-sm">
                  I tuoi clienti prenotano facilmente dal telefono, senza aspettare in fila e senza installare nulla
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-700/50 rounded-xl p-6 text-center">
              <p className={`text-gray-200 leading-relaxed ${isTablet ? 'text-base' : 'text-sm'}`}>
                <strong className="text-white">In pratica:</strong> i tuoi clienti scansionano il tuo <strong className="text-purple-300">QR code personale</strong>, 
                cercano la canzone nel tuo catalogo digitale e prenotano via chatbot in <strong className="text-purple-300">pochi secondi</strong>. 
                Tu ricevi tutto sulla tua dashboard, accetti o rifiuti con un tap. <strong className="text-purple-300">Zero stress, massima professionalità</strong>
              </p>
            </div>
          </section>

          <MobileCarousel />
          <MobilePricing />

          {/* Mobile Support Section */}
          <section className="py-12 px-4 lg:hidden">
            <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-purple-600/30 p-6 rounded-xl max-w-2xl mx-auto`}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Vuoi sostenerci?
                </h3>
                <p className={`text-gray-300 leading-relaxed ${isTablet ? 'text-base' : 'text-sm'}`}>
                  Karaokati rimarrà sempre <strong className="text-purple-300">100% gratuito</strong> per tutti. 
                  Se apprezzi il progetto puoi sostenerci con una donazione volontaria.
                </p>
              </div>

              <div className={`grid gap-3 mb-4 ${isTablet ? 'grid-cols-2' : 'grid-cols-2'}`}>

                <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border border-yellow-600/30 p-4 rounded-lg text-center opacity-60">
                  {/* <Coffee className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white" /> */}
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Buy Me a Coffee</h4>
                  <p className="text-gray-300 text-xs">In arrivo</p>
                </div> 

                <a href="#" className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-600/50 p-4 rounded-lg text-center block">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">PayPal</h4>
                  <p className="text-gray-300 text-xs">Disponibile</p>
                </a>
              </div>

              <div className="space-y-1 text-gray-300">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className={`${isTablet ? 'text-sm' : 'text-xs'}`}><strong className="text-white">Completamente facoltativo</strong> - servizio identico</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className={`${isTablet ? 'text-sm' : 'text-xs'}`}><strong className="text-white">Tu decidi quanto</strong> - nessun importo minimo</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className={`${isTablet ? 'text-sm' : 'text-xs'}`}><strong className="text-white">Nessuna funzionalità premium</strong> - tutti hanno tutto</span>
                </div>
              </div>
              <div className="text-center">
                 <p className="text-gray-400 text-sm leading-relaxed mt-8">
                   💜 Il futuro di Karaokati dipende dalla community. Se ci sarà interesse, 
                   la piattaforma continuerà a crescere e migliorare. 
                   Sempre con <strong className="text-purple-300">trasparenza</strong> e <strong className="text-purple-300">rispetto</strong> per chi la usa.
                 </p>
               </div>
            </div>
          </section>

          {/* Mobile CTA Section */}
          <section className="py-12 px-4 lg:hidden bg-gray-900/50">
            <div className={`bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white p-8 text-center rounded-xl max-w-2xl mx-auto`}>
              <h2 className={`font-bold mb-4 ${isTablet ? 'text-3xl' : 'text-2xl'}`}>
                Pronto a rivoluzionare le tue serate?
              </h2>
              <p className={`text-purple-100 mb-6 ${isTablet ? 'text-base' : 'text-sm'}`}>
                Unisciti a centinaia di DJ che hanno già scelto Karaokati
              </p>
              <Link to={createPageUrl("Register")}>
                <a className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg transition font-medium">
                  Registrati Ora - È Gratis
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
          </section>
        </>
      ) : (
        /* Desktop Layout (your original code) */
        <>
          {/* Hero Section */}
          <section className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">
                    Gestisci il tuo karaoke in modo professionale
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                  Addio ai{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    bigliettini
                  </span>
                  <br />
                  Benvenuto al futuro del karaoke
                </h1>
                
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  Karaokati è la piattaforma italiana che rivoluziona le serate karaoke per DJ professionisti. 
                  Gestisci prenotazioni in tempo reale con QR code, crea il tuo catalogo digitale e ricevi prenotazioni tramite un chatbot integrato.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={createPageUrl("Register")}>
                    <a className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center justify-center gap-2 transition">
                      Inizia Gratis
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Link>
                </div>

                {/* Hero Cards */}
                <div className="mt-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl rounded-full" />
                  <div className="relative bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-800/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-none rounded-xl">
                        <QrCode className="w-12 h-12 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">QR Code</h3>
                        <p className="text-purple-100">Ogni DJ ha il suo codice personale</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-pink-600 to-pink-700 text-white border-none rounded-xl">
                        <Music className="w-12 h-12 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">80.000+</h3>
                        <p className="text-pink-100">Titoli dei tuoi brani</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none rounded-xl">
                        <Clock className="w-12 h-12 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Real-time</h3>
                        <p className="text-blue-100">Prenotazioni istantanee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section className="pt-6 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">La Rivoluzione Digitale</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Dimentica carta e penna.{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    È tutto digitale
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
                  Basta con i bigliettini che si perdono, la confusione delle prenotazioni scritte a mano 
                  e le code interminabili. Karaokati porta le tue serate karaoke nell'era digitale.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Niente più bigliettini</h3>
                  <p className="text-gray-400">
                    Elimina carta, penna e la confusione di tenere traccia manualmente delle prenotazioni
                  </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Tutto in tempo reale</h3>
                  <p className="text-gray-400">
                    Le prenotazioni arrivano istantaneamente sulla tua dashboard
                  </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Esperienza migliore</h3>
                  <p className="text-gray-400">
                    I tuoi clienti prenotano facilmente dal telefono, senza aspettare in fila e senza installare nulla
                  </p>
                </div>
              </div>

              {/* Timeline */}
              {/* <div className="relative mb-16">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 transform -translate-y-1/2 hidden md:block" />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 relative">
                  {[
                    { number: "1", label: "Registrati", icon: "✓" },
                    { number: "2", label: "Carica Catalogo", icon: "♫" },
                    { number: "3", label: "Genera QR", icon: "⚡" },
                    { number: "4", label: "Clienti Prenotano", icon: "📱" },
                    { number: "5", label: "Gestisci", icon: "✨" }
                  ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg relative z-10 border-4 border-gray-900">
                        {step.icon}
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-purple-300 mb-1">Step {step.number}</div>
                        <div className="text-sm text-gray-300 font-medium">{step.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-700/50 rounded-2xl p-8 text-center">
                <p className="text-xl text-gray-200 leading-relaxed">
                  <strong className="text-white">In pratica:</strong> i tuoi clienti scansionano il tuo <strong className="text-purple-300">QR code personale</strong>, 
                cercano la canzone nel tuo catalogo digitale e prenotano via chatbot in <strong className="text-purple-300">pochi secondi</strong>. 
                Tu ricevi tutto sulla tua dashboard, accetti o rifiuti con un tap. <strong className="text-purple-300">Zero stress, massima professionalità</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Desktop Carousel Section (your original complex carousel) */}
          <section className="py-20 px-6 bg-gray-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Come funziona Karaokati
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Segui questi 5 semplici passaggi per rivoluzionare le tue serate karaoke
                </p>
              </div>

              {/* Your original complex carousel code here... */}
              <div className="relative">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {slides.map((slide, index) => {
                      const Icon = slide.icon;
                      return (
                        <div key={slide.id} className="w-full flex-shrink-0 px-4">
                          <div className={`bg-gray-800/50 backdrop-blur-sm border-2 ${slide.borderColor} rounded-3xl p-8 md:p-12 min-h-[680px] flex flex-col`}>
                            <div className="grid md:grid-cols-2 gap-16 items-center flex-1 ">
                              {/* Content */}
                              <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                                <div className="flex items-center gap-4 mb-6">
                                  <div className={`w-16 h-16 bg-gradient-to-br ${slide.color} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                                    {slide.step}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-3 mb-1">
                                      <Icon className="w-6 h-6 text-white" />
                                      <h3 className="text-3xl font-bold text-white">{slide.title}</h3>
                                    </div>
                                    <p className="text-gray-400">{slide.subtitle}</p>
                                  </div>
                                </div>

                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                  {slide.description}
                                </p>

                                <ul className="space-y-4">
                                  {slide.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                                      <div className={`w-6 h-6 bg-gradient-to-br ${slide.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                        <Check className="w-4 h-4 text-white" />
                                      </div>
                                      <span className="text-lg">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Visual Mock */}
                              <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                                <div className="bg-gray-900/70 rounded-2xl border border-purple-800/30 p-8 min-h-[400px] flex items-center justify-center">
                                  {/* Step 1: Venues */}
                                  {slide.id === 1 && (
                                    <div className="w-full">
                                      <div className="flex items-center justify-between mb-6">
                                        <div>
                                          <h4 className="text-xl font-bold text-white">I Tuoi Locali</h4>
                                          <p className="text-sm text-gray-400">Gestisci i luoghi delle tue serate</p>
                                        </div>
                                        <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">
                                          + Aggiungi
                                        </div>
                                      </div>
                                      <div className="space-y-4">
                                        {[
                                          { name: "Locale Rock", address: "Via Roma 123", active: true },
                                          { name: "Blue Moon Bar", address: "Piazza Dante 45", active: false }
                                        ].map((venue, idx) => (
                                          <div key={idx} className={`p-4 rounded-xl border ${venue.active ? 'bg-green-900/20 border-green-700/50' : 'bg-gray-900/50 border-purple-800/30'}`}>
                                            <div className="flex items-center justify-between mb-3">
                                              <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-purple-900/50 border border-purple-700/50 rounded-lg flex items-center justify-center">
                                                  <MapPin className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <div>
                                                  <div className="font-bold text-white">{venue.name}</div>
                                                  <div className="text-sm text-gray-400">{venue.address}</div>
                                                </div>
                                              </div>
                                              <div className={`w-12 h-6 rounded-full ${venue.active ? 'bg-green-600' : 'bg-gray-600'} relative`}>
                                                <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${venue.active ? 'right-0.5' : 'left-0.5'}`} />
                                              </div>
                                            </div>
                                            {venue.active && (
                                              <div className="text-sm text-green-400 font-medium">● Serata Attiva</div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Step 2: Catalog */}
                                  {slide.id === 2 && (
                                    <div className="w-full">
                                      <div className="flex items-center justify-between mb-6">
                                        <div>
                                          <h4 className="text-xl font-bold text-white">Catalogo Canzoni</h4>
                                          <p className="text-sm text-gray-400">1.250 brani nel tuo catalogo</p>
                                        </div>
                                        <div className="flex gap-2">
                                          <div className="px-3 py-2 bg-gray-700 rounded-lg text-white text-sm">Importa</div>
                                          <div className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">+ Aggiungi</div>
                                        </div>
                                      </div>
                                      <div className="mb-4">
                                        <div className="flex items-center gap-3 bg-gray-900/50 border border-purple-800/30 rounded-lg px-4 py-3">
                                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                          </svg>
                                          <span className="text-gray-500">Cerca nel catalogo...</span>
                                        </div>
                                      </div>
                                      <div className="space-y-3">
                                        {[
                                          { artist: "Domenico Modugno", title: "Volare - Nel Blu Dipinto di Blu" },
                                          { artist: "Jovanotti", title: "Bella - Radio Edit" },
                                          { artist: "Umberto Tozzi", title: "Gloria - Original Version" }
                                        ].map((song, idx) => (
                                          <div key={idx} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-purple-800/20">
                                            <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                                              <Music className="w-6 h-6 text-purple-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <div className="font-medium text-white truncate">{song.artist}</div>
                                              <div className="text-sm text-gray-400 truncate">{song.title}</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Step 3: Chatbot */}
                                  {slide.id === 3 && (
                                    <div className="w-full max-w-md mx-auto">
                                      <div className="bg-gray-900/80 rounded-2xl border border-purple-800/30 overflow-hidden">
                                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                                          <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                              <Mic2 className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                              <div className="font-bold text-white text-lg">Karaokati Assistant</div>
                                              <div className="text-sm text-purple-100">Locale Rock • Serata attiva 🎤</div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="p-6 space-y-4 bg-gray-900 min-h-[300px]">
                                          <div className="flex gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                                              <Mic2 className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="bg-gray-800 border border-purple-800/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                              <p className="text-gray-200">🎤 Ciao! Benvenuto! Cerca una canzone scrivendo il titolo o l'artista!</p>
                                            </div>
                                          </div>
                                          <div className="flex justify-end">
                                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%]">
                                              <p className="text-white">Modugno</p>
                                            </div>
                                          </div>
                                          <div className="flex gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                                              <Mic2 className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="space-y-3">
                                              <div className="bg-gray-800 border border-purple-800/30 rounded-2xl rounded-tl-sm px-4 py-3">
                                                <p className="text-gray-200">🔍 Ho trovato 2 canzoni!</p>
                                              </div>
                                              <div className="bg-gray-800/90 border border-purple-700/40 rounded-xl p-3 hover:bg-gray-800 transition cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                  <Music className="w-5 h-5 text-purple-400" />
                                                  <div>
                                                    <div className="text-gray-200 font-medium">Domenico Modugno - Volare</div>
                                                    
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="bg-gray-800/90 border border-purple-700/40 rounded-xl p-3 hover:bg-gray-800 transition cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                  <Music className="w-5 h-5 text-purple-400" />
                                                  <div>
                                                    <div className="text-gray-200 font-medium">Domenico Modugno - Tre briganti Tre somari</div>
                                    
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Step 4: Bookings */}
                                  {slide.id === 4 && (
                                    <div className="w-full">
                                      <div className="flex items-center justify-between mb-6">
                                        <div>
                                          <h4 className="text-xl font-bold text-white">Prenotazioni</h4>
                                          <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <MapPin className="w-4 h-4 text-purple-400" />
                                            <span>Locale: <span className="text-purple-400">Locale Rock</span></span>
                                          </div>
                                        </div>
                                        <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium">
                                          + Prenota
                                        </div>
                                      </div>
                                      <div className="space-y-3">
                                        {[
                                          { name: "Marco", song: "Volare - Modugno", status: "pending", time: "2 min fa" },
                                          { name: "Laura", song: "Bella - Jovanotti", status: "pending", time: "5 min fa" },
                                          { name: "Giuseppe", song: "Gloria - Tozzi", status: "accepted", time: "8 min fa" }
                                        ].map((booking, idx) => (
                                          <div key={idx} className={`p-4 bg-gray-900/50 rounded-xl border ${booking.status === 'pending' ? 'border-yellow-700/50' : 'border-purple-800/20'}`}>
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <div className="w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                  <span className="text-lg font-bold text-purple-400">{booking.name[0]}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-white truncate">{booking.name}</span>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${booking.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-green-900/50 text-green-300'}`}>
                                                      {booking.status === 'pending' ? 'In Attesa' : 'Accettata'}
                                                    </span>
                                                  </div>
                                                  <div className="text-sm text-gray-400 truncate">{booking.song}</div>
                                                  <div className="text-xs text-gray-500 mt-1">{booking.time}</div>
                                                </div>
                                              </div>
                                              {booking.status === 'pending' && (
                                                <div className="flex gap-2">
                                                  <div className="w-9 h-9 bg-green-900/50 hover:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition">
                                                    <Check className="w-5 h-5 text-green-400" />
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Step 5: Dashboard */}
                                  {slide.id === 5 && (
                                    <div className="w-full">
                                      <div className="bg-gray-900/80 rounded-2xl border border-purple-800/30 overflow-hidden">
                                        <div className="flex">
                                          <div className="w-20 bg-gray-900 border-r border-purple-800/30 p-4 space-y-6">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
                                              <Mic2 className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="space-y-4 pt-4">
                                              {[LayoutDashboard, MapPin, Music, Calendar].map((Icon, idx) => (
                                                <div key={idx} className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto ${idx === 0 ? 'bg-purple-900/50 border border-purple-700/50' : 'hover:bg-gray-800 cursor-pointer'}`}>
                                                  <Icon className={`w-6 h-6 ${idx === 0 ? 'text-purple-400' : 'text-gray-500'}`} />
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                          <div className="flex-1 p-6 bg-gray-900/50">
                                            <div className="mb-6">
                                              <h4 className="text-2xl font-bold text-white mb-1">Panoramica</h4>
                                              <p className="text-sm text-gray-400">Vista generale della tua attività</p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 mb-6">
                                              <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-4">
                                                <div className="text-2xl font-bold text-white mb-1">1.250</div>
                                                <div className="text-xs text-gray-400">Canzoni</div>
                                              </div>
                                              <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4">
                                                <div className="text-2xl font-bold text-green-400 mb-1">Attivo</div>
                                                <div className="text-xs text-gray-400">Locale Rock</div>
                                              </div>
                                              <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-4">
                                                <div className="text-2xl font-bold text-white mb-1">12</div>
                                                <div className="text-xs text-gray-400">Prenotazioni</div>
                                              </div>
                                            </div>
                                            <div className="bg-gray-800/50 border border-purple-800/30 rounded-xl p-4">
                                              <div className="text-sm font-medium text-white mb-3">QR Code Personale</div>
                                              <div className="w-24 h-24 bg-white rounded-lg mx-auto flex items-center justify-center">
                                                <QrCode className="w-16 h-16 text-gray-900" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Left Arrow */}
                <button
                  onClick={prevSlide}
                  className="
                    absolute left-0 top-1/2 -translate-y-1/2
                    -translate-x-1/2
                    w-14 h-14
                    bg-gray-800/90 hover:bg-gray-700
                    border border-purple-800/40
                    rounded-full
                    flex items-center justify-center
                    transition
                    z-10
                  "
                >
                  <ChevronLeft className="w-7 h-7 text-purple-400" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextSlide}
                  className="
                    absolute right-0 top-1/2 -translate-y-1/2
                    translate-x-1/2
                    w-14 h-14
                    bg-gray-800/90 hover:bg-gray-700
                    border border-purple-800/40
                    rounded-full
                    flex items-center justify-center
                    transition
                    z-10
                  "
                >
                  <ChevronRight className="w-7 h-7 text-purple-400" />
                </button>

                {/* Navigation Buttons */}
                {/* <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 bg-gray-800 hover:bg-gray-700 border border-purple-800/30 rounded-full flex items-center justify-center transition"
                  >
                    <ChevronLeft className="w-6 h-6 text-purple-400" />
                  </button>

                  <div className="flex gap-2">
                    {slides.map((slide, index) => (
                      <button
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                          currentSlide === index 
                            ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-600' 
                            : 'w-2 bg-gray-700 hover:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 bg-gray-800 hover:bg-gray-700 border border-purple-800/30 rounded-full flex items-center justify-center transition"
                  >
                    <ChevronRight className="w-6 h-6 text-purple-400" />
                  </button>
                </div> */}

                {/* Step Counter */}
                <div className="text-center mt-6">
                  <span className="text-gray-400">
                    Step <span className="text-white font-bold">{currentSlide + 1}</span> di <span className="text-white font-bold">{slides.length}</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          {/* <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Un Solo Piano: Tutto Incluso
                </h2>
              </div>

              <div className="max-w-2xl mx-auto mb-16">
                <div className="p-10 bg-gradient-to-br from-purple-900/70 to-pink-900/70 border-4 border-purple-500 relative overflow-hidden shadow-2xl rounded-2xl">
                  <div className="absolute -right-12 top-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-16 py-2 rotate-45 font-bold text-sm shadow-lg">
                    SEMPRE GRATIS
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 animate-pulse" />
                  
                  <div className="relative">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <Sparkles className="w-9 h-9 text-white" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-white">Karaokati</h3>
                        <p className="text-purple-200 font-medium">Tutte le funzionalità incluse</p>
                      </div>
                    </div>

                    <div className="text-center mb-8">
                      <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text mb-2">
                        100% GRATIS
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 border border-green-600 rounded-full mb-3">
                        <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
                        <span className="text-lg font-bold text-green-300">Per Sempre</span>
                      </div>
                      <p className="text-purple-200 text-sm">
                        Nessun costo nascosto • Nessuna carta richiesta • Sempre gratuito
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      {[
                        "Locali illimitati",
                        "Fino a 80.000 titoli",
                        "Importazione massiva Excel",
                        "Generazione catalogo automatica",
                        "QR Code personalizzati",
                        "Esportazione dati",
                        "Chatbot integrato"
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-purple-900/40 backdrop-blur-sm rounded-xl p-3 border border-purple-700/30">
                          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-green-400" />
                          </div>
                          <span className="text-gray-100 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link to={createPageUrl("Register")}>
                      <a className="block w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-7 text-xl font-bold shadow-2xl rounded-lg text-center transition">
                        <span className="inline-flex items-center justify-center gap-2">
                          <Sparkles className="w-6 h-6 animate-pulse" />
                          Inizia Gratis Ora
                          <ArrowRight className="w-6 h-6" />
                        </span>
                      </a>
                    </Link>

                    <div className="mt-4 text-center">
                      <p className="text-xs text-purple-300">
                        💜 Supporto volontario disponibile per chi vuole aiutare il progetto
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Support Section */}
              {/* <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-purple-600/30 p-10 rounded-2xl">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-6">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Vuoi sostenerci?
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Karaokati rimarrà sempre <strong className="text-purple-300">100% gratuito</strong> per tutti. 
                      Se apprezzi il progetto e vuoi aiutarci a mantenerlo attivo, puoi sostenerci con una donazione volontaria.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-600/30 p-6 rounded-xl text-center opacity-60">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Coffee className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Buy Me a Coffee</h4>
                      <p className="text-gray-300 text-sm">In arrivo</p>
                    </div>
                    <a href="#" className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-600/50 p-6 rounded-xl hover:border-blue-500 transition text-center block">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">PayPal</h4>
                      <p className="text-gray-300 text-sm">Disponibile ora</p>
                    </a>
                  </div>

                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Completamente facoltativo</strong> - il servizio resta identico con o senza donazione</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Tu decidi quanto</strong> - nessun importo minimo o consigliato</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Nessuna funzionalità premium</strong> - tutti hanno accesso a tutto</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm leading-relaxed mt-8">
                      💜 Il futuro di Karaokati dipende dalla community. Se ci sarà interesse, 
                      la piattaforma continuerà a crescere e migliorare. 
                      Sempre con <strong className="text-purple-300">trasparenza</strong> e <strong className="text-purple-300">rispetto</strong> per chi la usa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* Pricing Section */}
          {/* <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Un Solo Piano: Tutto Incluso
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                
                <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 border-4 border-purple-500 relative overflow-hidden shadow-2xl rounded-2xl p-8 lg:p-10">
                  <div className="absolute -right-12 top-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-16 py-2 rotate-45 font-bold text-sm shadow-lg">
                    SEMPRE GRATIS
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 animate-pulse" />
                  
                  <div className="relative">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <Sparkles className="w-9 h-9 text-white" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-white">Karaokati</h3>
                        <p className="text-purple-200 font-medium">Tutte le funzionalità incluse</p>
                      </div>
                    </div>

                    <div className="text-center mb-8">
                      <div className="text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text mb-2">
                        100% GRATIS
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 border border-green-600 rounded-full mb-3">
                        <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
                        <span className="text-lg font-bold text-green-300">Per Sempre</span>
                      </div>
                      <p className="text-purple-200 text-sm">
                        Nessun costo nascosto • Nessuna carta richiesta • Sempre gratuito
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {[
                        "Locali illimitati",
                        "Fino a 80.000 titoli",
                        "Importazione massiva Excel",
                        "Generazione catalogo automatica",
                        "QR Code personalizzati",
                        "Esportazione dati",
                        "Chatbot integrato"
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-purple-900/40 backdrop-blur-sm rounded-xl p-3 border border-purple-700/30">
                          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-green-400" />
                          </div>
                          <span className="text-gray-100 font-medium text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link to={createPageUrl("Register")}>
                      <a className="block w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-6 text-xl font-bold shadow-2xl rounded-lg text-center transition">
                        <span className="inline-flex items-center justify-center gap-2">
                          <Sparkles className="w-6 h-6 animate-pulse" />
                          Inizia Gratis Ora
                          <ArrowRight className="w-6 h-6" />
                        </span>
                      </a>
                    </Link>

                    <div className="mt-4 text-center">
                      <p className="text-xs text-purple-300">
                        💜 Supporto volontario disponibile per chi vuole aiutare il progetto
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-purple-600/30 p-8 lg:p-10 rounded-2xl h-fit">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-6">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Vuoi sostenerci?
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Karaokati rimarrà sempre <strong className="text-purple-300">100% gratuito</strong> per tutti. 
                      Se apprezzi il progetto e vuoi aiutarci a mantenerlo attivo, puoi sostenerci con una donazione volontaria.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <a href="#" className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-600/50 p-4 rounded-xl hover:border-blue-500 transition text-center block">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-white">PayPal</h4>
                      </div>
                      <p className="text-gray-500 text-xs opacity-70">Disponibile ora</p>
                    </a>
                    <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-600/30 p-4 rounded-xl opacity-60 text-center">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
                          <Coffee className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Buy Me a Coffee</h4>
                      </div>
                      <p className="text-gray-500 text-xs opacity-70">In arrivo</p>
                    </div>
                  </div>

                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm"><strong className="text-white">Completamente facoltativo</strong> - il servizio resta identico con o senza donazione</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm"><strong className="text-white">Tu decidi quanto</strong> - nessun importo minimo o consigliato</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm"><strong className="text-white">Nessuna funzionalità premium</strong> - tutti hanno accesso a tutto</span>
                    </li>
                  </ul>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-sm leading-relaxed">
                      💜 Il futuro di Karaokati dipende dalla community. Se ci sarà interesse, 
                      la piattaforma continuerà a crescere e migliorare. 
                      Sempre con <strong className="text-purple-300">trasparenza</strong> e <strong className="text-purple-300">rispetto</strong> per chi la usa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Un Solo Piano: Tutto Incluso
                </h2>
                <p className="text-xl text-gray-400">
                  Karaokati è completamente gratuito per tutti. Sempre.
                </p>
              </div>

              {/* Desktop: Card principale centrata, supporto sotto */}
              <div className="max-w-xl mx-auto space-y-12">
                
                {/* Card Pricing - Piano Unico Gratuito */}
                <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 border-4 border-purple-500 relative overflow-hidden shadow-2xl rounded-2xl p-8 lg:p-12">
                  <div className="absolute -right-12 top-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-16 py-2 rotate-45 font-bold text-sm shadow-lg">
                    SEMPRE GRATIS
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 animate-pulse" />
                  
                  <div className="relative">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <Sparkles className="w-9 h-9 text-white" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-white">Karaokati</h3>
                        <p className="text-purple-200 font-medium">Piano Unico - Tutte le funzionalità incluse</p>
                      </div>
                    </div>

                    <div className="text-center mb-8">
                      <div className="text-5xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text mb-5">
                        GRATIS
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 border border-green-600 rounded-full mb-3">
                        <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
                        <span className="text-lg font-bold text-green-300">Per Sempre</span>
                      </div>
                      <p className="text-purple-200 text-sm">
                        Nessun costo nascosto • Nessuna carta richiesta • Nessun piano premium
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {[
                        "Locali illimitati",
                        "Fino a 80.000 titoli",
                        "Importazione massiva Excel",
                        "Generazione catalogo automatica",
                        "QR Code personalizzati",
                        "Chatbot integrato"
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-purple-900/40 backdrop-blur-sm rounded-xl p-3 border border-purple-700/30">
                          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-green-400" />
                          </div>
                          <span className="text-gray-100 font-medium text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link to={createPageUrl("Register")}>
                      <a className="block w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-6 text-xl font-bold shadow-2xl rounded-lg text-center transition">
                        <span className="inline-flex items-center justify-center gap-2">
                          <Sparkles className="w-6 h-6 animate-pulse" />
                          Inizia Gratis Ora
                          <ArrowRight className="w-6 h-6" />
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>

                {/* Separatore visivo */}
                <div className="flex items-center justify-center py-8">
                  <div className="border-t border-gray-700 flex-1 max-w-32"></div>
                  <div className="px-6 text-gray-500 text-sm font-medium">Supporto volontario</div>
                  <div className="border-t border-gray-700 flex-1 max-w-32"></div>
                </div>

                {/* Card Support - Sezione separata */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-gray-600/30 p-8 lg:p-10 rounded-2xl">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full mb-6">
                      <Heart className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      💜 Vuoi sostenere il progetto?
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed max-w-2xl mx-auto">
                      Karaokati è e rimarrà sempre <strong className="text-green-400">100% gratuito</strong>. 
                      Se il progetto ti piace e vuoi aiutarci a mantenerlo attivo e in crescita, 
                      ogni supporto volontario è molto apprezzato (ma mai richiesto!).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-6 max-w-md mx-auto">
                    <a href="#" className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-2 border-blue-600/50 p-4 rounded-xl hover:border-blue-500 transition text-center block">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-white">PayPal</h4>
                      </div>
                      <p className="text-blue-300 text-xs">Donazione facoltativa</p>
                    </a>
                    
                    <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-600/30 p-4 rounded-xl opacity-60 text-center">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
                          <Coffee className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Buy Me a Coffee</h4>
                      </div>
                      <p className="text-yellow-300 text-xs opacity-70">Prossimamente</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
                      <strong className="text-gray-300">Nessuna funzionalità premium:</strong> chi dona e chi non dona hanno accesso 
                      esattamente alle stesse funzioni. Il supporto serve solo a mantenere i server attivi e migliorare la piattaforma per tutti.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 bg-gray-900/50">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white p-12 md:p-16 text-center border-none rounded-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Pronto a rivoluzionare le tue serate?
                </h2>
                <p className="text-xl mb-8 text-purple-100">
                  Unisciti a centinaia di DJ che hanno già scelto Karaokati
                </p>
                <Link to={createPageUrl("Register")}>
                  <a className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-lg px-10 py-6 rounded-lg transition">
                    Registrati Ora - È Gratis
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer (responsive - full content on both mobile and desktop) */}
      <footer className="bg-gray-950 text-white py-12 px-6 border-t border-purple-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Mic2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Karaokati</span>
              </div>
              <p className="text-gray-400 text-sm">
                La piattaforma italiana numero uno per DJ karaoke professionisti
              </p>
            </div>
            
            {/* Mobile: Stack vertically, Desktop: Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:col-span-3">
              <div>
                <h4 className="font-bold mb-4">Prodotto</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition">Funzionalità</a></li>
                  <li><Link to={createPageUrl("Register")} className="hover:text-white transition">Registrati</Link></li>
                  <li><Link to={createPageUrl("Access")} className="hover:text-white transition">Accedi</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Supporto</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link to={createPageUrl("Support")} className="hover:text-white transition">Fai una donazione</Link></li>
                  <li><Link to={createPageUrl("Suggestions")} className="hover:text-white transition">Suggerimenti</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Informazioni</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link to={createPageUrl("TermsOfService")} className="hover:text-white transition">Termini di servizio</Link></li>
                  <li><Link to={createPageUrl("TermsOfService")} className="hover:text-white transition">Contatti</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="text-sm">© 2025 Karaokati. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
