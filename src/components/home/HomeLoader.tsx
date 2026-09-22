"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export function HomeLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if loader was already shown this session
    const alreadyShown = sessionStorage.getItem("gz_loader_shown");
    if (alreadyShown) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setFading(true);
      sessionStorage.setItem("gz_loader_shown", "true");
      setTimeout(() => {
        setVisible(false);
      }, 600);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-cream flex items-center justify-center pointer-events-none transition-opacity duration-600 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 animate-pulse">
        <Image
          src="/brand/logo-guillaume-zhu.svg"
          alt="Guillaume Zhu"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
