"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface PlaygroundItem {
  id: number;
  title: string;
  meta: string;
  type: "video" | "image";
  src: string;
  poster?: string;
}

const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  { id: 1, title: "Solvea Commerce", meta: "Shopify · Student project · 2026", type: "video", src: "/playground/media/playground-solvea-shopify.mp4", poster: "/playground/posters/playground-solvea-shopify.webp" },
  { id: 2, title: "Eclosia I", meta: "Interface design · Student project · 2026", type: "video", src: "/playground/media/playground-eclosia1.mp4", poster: "/playground/posters/playground-eclosia1.webp" },
  { id: 3, title: "Cosmic Orb", meta: "AI visual experiment · 2026", type: "video", src: "/playground/media/playground-video-generation-orb.mp4", poster: "/playground/posters/playground-video-generation-orb.webp" },
  { id: 4, title: "Galaxy Field", meta: "Three.js shader study · 2026", type: "video", src: "/playground/media/playground-shader-galaxy.mp4", poster: "/playground/posters/playground-shader-galaxy.webp" },
  { id: 5, title: "Exil", meta: "Visual artwork · 2020", type: "image", src: "/playground/media/playground-exil.webp" },
  { id: 6, title: "Pulse in Motion", meta: "Motion design study · 2020", type: "video", src: "/playground/media/playground-pulse-experiment.mp4", poster: "/playground/posters/playground-pulse-experiment.webp" },
  { id: 7, title: "Raging Sea — Night", meta: "Three.js shader study · 2026", type: "video", src: "/playground/media/playground-shader-dark-sea.mp4", poster: "/playground/posters/playground-shader-dark-sea.webp" },
  { id: 8, title: "Bouche à Oreille", meta: "Web design · Student project · 2026", type: "video", src: "/playground/media/playground-bouche-oreille.mp4", poster: "/playground/posters/playground-bouche-oreille.webp" },
  { id: 9, title: "Blooming Orb", meta: "AI visual experiment · 2026", type: "video", src: "/playground/media/playground-video-generation-flower.mp4", poster: "/playground/posters/playground-video-generation-flower.webp" },
  { id: 10, title: "Fluid Form", meta: "Cinema 4D study · 2019", type: "image", src: "/playground/media/playground-3d-fluid-linkedin.webp" },
  { id: 11, title: "Biomimicry Cards", meta: "Game & interface design · 2026", type: "video", src: "/playground/media/playground-biomimetism-game.mp4", poster: "/playground/posters/playground-biomimetism-game.webp" },
  { id: 12, title: "Raging Sea", meta: "Three.js shader study · 2026", type: "video", src: "/playground/media/playground-shader-cloud-sea.mp4", poster: "/playground/posters/playground-shader-cloud-sea.webp" },
  { id: 13, title: "Eclosia II", meta: "Interface design · Student project · 2026", type: "video", src: "/playground/media/playground-eclosia2.mp4", poster: "/playground/posters/playground-eclosia2.webp" },
  { id: 14, title: "Digital Globe", meta: "Three.js shader study · 2026", type: "video", src: "/playground/media/playground-shader-globe.mp4", poster: "/playground/posters/playground-shader-globe.webp" },
  { id: 15, title: "Music genre visualizer", meta: "3D data visualization · 2026", type: "video", src: "/playground/media/playground-music-data-visualizer.mp4", poster: "/playground/posters/playground-music-data-visualizer.webp" },
  { id: 16, title: "Foot Locker Challenge", meta: "Interactive game · 2026", type: "video", src: "/playground/media/playground-footlocker.mp4", poster: "/playground/posters/playground-footlocker.webp" },
  { id: 17, title: "Particle Trail", meta: "Three.js shader study · 2026", type: "video", src: "/playground/media/playground-shader-canvas2D.mp4", poster: "/playground/posters/playground-shader-canvas2D.webp" },
  { id: 18, title: "Blue Study", meta: "Web design · Student project · 2019", type: "video", src: "/playground/media/playground-bleu.mp4", poster: "/playground/posters/playground-bleu.webp" },
  { id: 19, title: "Solvea Identity", meta: "Brand identity · 2026", type: "image", src: "/playground/media/playground-solvea.webp" },
  { id: 20, title: "Vault Sessions", meta: "Motion design · 2019", type: "video", src: "/playground/media/playground-vault.mp4", poster: "/playground/posters/playground-vault.webp" },
  { id: 21, title: "Capture × Grand Palais", meta: "Art direction · 2020", type: "image", src: "/playground/media/playground-capture.webp" },
  { id: 22, title: "Exil Study II", meta: "Cinema 4D study · 2020", type: "image", src: "/playground/media/playground-exil-lab2.webp" },
  { id: 23, title: "Exil Study I", meta: "Cinema 4D study · 2020", type: "image", src: "/playground/media/playground-exil-lab1.webp" },
  { id: 24, title: "Forest Orb", meta: "AI visual experiment · 2026", type: "video", src: "/playground/media/playground-forest.mp4", poster: "/playground/posters/playground-forest.webp" },
];

export default function PlaygroundPage() {
  const [activeItem, setActiveItem] = useState<PlaygroundItem>(PLAYGROUND_ITEMS[0]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleFocus = (item: PlaygroundItem, idx: number) => {
    setActiveItem(item);
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === idx) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  };

  return (
    <div className="playground min-h-screen w-full bg-dark text-cream pt-28 pb-32 px-6 md:px-12 flex flex-col items-center">
      <header className="text-center max-w-2xl mb-16">
        <h1 className="font-cabinet text-5xl md:text-7xl font-bold tracking-tight">
          Playground
        </h1>
        <p className="font-satoshi text-lg opacity-80 mt-3">
          Creative explorations: interfaces, shader studies, motion design, 3D experiments and visual research.
        </p>
      </header>

      {/* Grid of 24 explorations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {PLAYGROUND_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            onMouseEnter={() => handleFocus(item, idx)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-cream/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            {item.type === "video" ? (
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />
            )}

            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <h3 className="font-cabinet text-lg font-bold">{item.title}</h3>
              <p className="font-satoshi text-xs opacity-75">{item.meta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Persistent Bottom Caption Bar */}
      <div className="fixed bottom-6 z-40 bg-dark/80 border border-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4 text-center font-satoshi shadow-2xl">
        <span className="font-bold text-cream">{activeItem.title}</span>
        <span className="opacity-40">·</span>
        <span className="text-sm opacity-80">{activeItem.meta}</span>
      </div>
    </div>
  );
}
