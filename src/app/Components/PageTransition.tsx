"use client";

import { useEffect, useState } from "react";

export default function PageTransition() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cuando la ventana se carga por completo (fuentes, imágenes, estilos), iniciamos el fadeout del velo negro
    const handleLoad = () => {
      // Un pequeño delay de 100ms opcional para asegurar que todo se asiente
      setTimeout(() => setIsVisible(false), 100);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black z-[99999] transition-opacity duration-700 ease-out pointer-events-none
        ${isVisible ? "opacity-100" : "opacity-0"}`}
    />
  );
}   