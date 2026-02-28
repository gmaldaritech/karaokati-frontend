import React, { useState } from "react";
import { Play, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import LazyVideo from "@/components/LazyVideo";

const tutorials = [
  {
    id: 1,
    title: "⚡ IMPORTA i tuoi titoli da EXCEL e crea il catalogo",
    description: "Scopri come configurare il tuo account e iniziare a usare la piattaforma",
    duration: "1:50",
    thumbnail: "/tutorials/catalogo_importa_massivamente.png",
    videoUrl: "/tutorials/catalogo_importa_massivamente.mp4"
  },
  {
    id: 2,
    title: " 🚀 GENERA il catalogo AUTOMATICAMENTE partendo dalle tue basi karaoke (POPOLARE) 🚀",
    description: "Impara a creare i tuoi locali e attivarli per le serate karaoke",
    duration: "3:21",
    thumbnail: "/tutorials/catalogo_genera_automaticamente.png",
    videoUrl: "/tutorials/catalogo_genera_automaticamente.mp4"
  }
];

export default function VideoTutorialSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="space-y-6">
      <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Video Tutorial</h2>
          <p className="text-gray-400">Impara a usare Karaokati con i nostri video tutorial passo dopo passo</p>
      </div>

      {/* Video Player attivo */}
      {activeVideo && (
        <Card className="p-6 bg-gray-900 max-w-6xl mx-auto w-full">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-1">{activeVideo.title}</h3>
          </div>

          <LazyVideo
            src={activeVideo.videoUrl}
            poster={activeVideo.thumbnail}
            title={activeVideo.title}
          />

          <div className="mt-4 text-center">
            <button
              onClick={() => setActiveVideo(null)}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              ← Torna alla lista
            </button>
          </div>
        </Card>
      )}

      {/* Grid Tutorial — stile YouTube */}
      {!activeVideo && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="cursor-pointer group"
              onClick={() => setActiveVideo(tutorial)}
            >
              {/* Thumbnail */}
              <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-800">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay play visibile solo su hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>
                {/* Durata */}
                <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white font-medium">
                  {tutorial.duration}
                </div>
              </div>
              <div className="flex gap-3 mt-3 items-center">
                <h3 className="text-base font-semibold text-white leading-snug group-hover:text-purple-400 transition line-clamp-2">
                  {tutorial.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}