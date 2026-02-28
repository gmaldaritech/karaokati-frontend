import { useEffect, useRef, useState } from "react";


export default function LazyVideo({ src, poster, className = "", title = "Video tutorial" }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // carica una volta sola
        }
      },
      { threshold: 0.1 } // si attiva quando il 10% del video è visibile
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        <video
          controls
          preload="none"
          poster={poster}
          title={title}
          className="w-full rounded-xl"
        >
          <source src={src} type="video/mp4" />
          Il tuo browser non supporta la riproduzione video.
        </video>
      ) : (
        /* Placeholder mostrato finché il video non è in viewport */
        <div
          className="w-full aspect-video rounded-xl bg-gray-800/50 border border-purple-800/30 flex items-center justify-center"
          style={poster ? { backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
        >
          {!poster && (
            <div className="text-gray-500 text-sm">Caricamento video...</div>
          )}
        </div>
      )}
    </div>
  );
}
