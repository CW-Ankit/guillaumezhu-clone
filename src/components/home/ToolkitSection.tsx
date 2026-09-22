"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

interface CardItem {
  id: string;
  src: string;
  alt: string;
  isFlip?: boolean;
  backSrc?: string;
  backAlt?: string;
}

const FRONTEND_CARDS: CardItem[] = [
  { id: "js", src: "/home/toolkit/frontend/en/javascript.svg", alt: "JavaScript" },
  { id: "three", src: "/home/toolkit/frontend/en/threejs.svg", alt: "Three.js" },
  { id: "glsl", src: "/home/toolkit/frontend/en/glsl.svg", alt: "GLSL" },
  { id: "gsap", src: "/home/toolkit/frontend/en/gsap.svg", alt: "GSAP" },
  { id: "vue", src: "/home/toolkit/frontend/en/vuejs.svg", alt: "Vue.js" },
  { id: "react", src: "/home/toolkit/frontend/en/react.svg", alt: "React" },
  { id: "webflow", src: "/home/toolkit/frontend/en/webflow.svg", alt: "Webflow" },
  {
    id: "shopify-figma",
    src: "/home/toolkit/frontend/en/shopify.svg",
    alt: "Shopify",
    isFlip: true,
    backSrc: "/home/toolkit/art-direction/en/figma.svg",
    backAlt: "Figma",
  },
];

const ART_DIRECTION_CARDS: CardItem[] = [
  { id: "figma", src: "/home/toolkit/art-direction/en/figma.svg", alt: "Figma" },
  { id: "photoshop", src: "/home/toolkit/art-direction/en/photoshop.svg", alt: "Photoshop" },
  { id: "illustrator", src: "/home/toolkit/art-direction/en/illustrator.svg", alt: "Illustrator" },
  { id: "indesign", src: "/home/toolkit/art-direction/en/indesign.svg", alt: "InDesign" },
  { id: "ae", src: "/home/toolkit/art-direction/en/aftereffects.svg", alt: "After Effects" },
  { id: "capcut", src: "/home/toolkit/art-direction/en/capcut.svg", alt: "CapCut" },
  { id: "lightroom", src: "/home/toolkit/art-direction/en/lightroom.svg", alt: "Lightroom" },
  { id: "transition", src: "/home/toolkit/art-direction/en/transition.png", alt: "Transition" },
];

export function ToolkitSection() {
  const { language } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frontendWheelRef = useRef<HTMLDivElement>(null);
  const artWheelRef = useRef<HTMLDivElement>(null);
  const flipperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const feWheel = frontendWheelRef.current;
    const artWheel = artWheelRef.current;
    const flipper = flipperRef.current;
    if (!container || !feWheel || !artWheel) return;

    // Initial positioning of wheel slots
    const feSlots = feWheel.querySelectorAll(".toolkit__slot");
    const artSlots = artWheel.querySelectorAll(".toolkit__slot");

    feSlots.forEach((slot, idx) => {
      gsap.set(slot, {
        rotation: (idx - (feSlots.length - 1) / 2) * 6,
        transformOrigin: "50% 120%",
      });
    });

    artSlots.forEach((slot, idx) => {
      gsap.set(slot, {
        rotation: (idx - (artSlots.length - 1) / 2) * 6,
        transformOrigin: "50% 120%",
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=3500",
        pin: true,
        scrub: 1,
      },
    });

    // Frontend wheel rotation & entrance
    tl.fromTo(
      feWheel,
      { y: "60vh", opacity: 0 },
      { y: "20vh", opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Flip card trigger
    if (flipper) {
      tl.to(flipper, {
        rotationY: 180,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }

    // Switch from Frontend to Art Direction wheel
    tl.to(feWheel, { opacity: 0, y: "-20vh", duration: 0.8 }, "+=0.2");
    tl.fromTo(
      artWheel,
      { opacity: 0, y: "60vh" },
      { opacity: 1, y: "20vh", duration: 0.8, ease: "power2.out" },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="toolkit relative w-full bg-dark text-cream overflow-hidden" id="toolkit">
      <div ref={containerRef} className="toolkit__container relative w-full h-screen flex flex-col items-center justify-start pt-24 overflow-hidden">
        <div className="text-center z-20">
          <h2 className="font-cabinet text-5xl md:text-7xl font-bold tracking-tight">Toolkit</h2>
          <div className="mt-4 flex gap-8 justify-center font-cabinet text-xl md:text-2xl font-light opacity-80">
            <span>Creative Front-end</span>
            <span>·</span>
            <span>Art Direction</span>
          </div>
        </div>

        {/* Frontend Wheel Deck */}
        <div
          ref={frontendWheelRef}
          className="toolkit__wheel absolute top-1/2 left-1/2 -translate-x-1/2 w-[160vw] md:w-[100vw] aspect-square pointer-events-auto"
        >
          {FRONTEND_CARDS.map((card) => (
            <div key={card.id} className="toolkit__slot absolute inset-0 flex justify-center items-start">
              {card.isFlip ? (
                <div className="toolkit-card w-44 md:w-56 aspect-[295/417] perspective-[1000px]">
                  <div
                    ref={flipperRef}
                    className="w-full h-full relative transition-transform duration-500 preserve-3d"
                  >
                    <div className="absolute inset-0 backface-hidden">
                      <Image
                        src={card.src.replace("/en/", `/${language}/`)}
                        alt={card.alt}
                        fill
                        className="object-contain drop-shadow-xl"
                        unoptimized
                      />
                    </div>
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <Image
                        src={(card.backSrc || card.src).replace("/en/", `/${language}/`)}
                        alt={card.backAlt || card.alt}
                        fill
                        className="object-contain drop-shadow-xl"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="toolkit-card w-44 md:w-56 aspect-[295/417] relative hover:-translate-y-4 hover:scale-105 transition-transform duration-300">
                  <Image
                    src={card.src.replace("/en/", `/${language}/`)}
                    alt={card.alt}
                    fill
                    className="object-contain drop-shadow-xl"
                    unoptimized
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Art Direction Wheel Deck */}
        <div
          ref={artWheelRef}
          className="toolkit__wheel absolute top-1/2 left-1/2 -translate-x-1/2 w-[160vw] md:w-[100vw] aspect-square pointer-events-auto opacity-0"
        >
          {ART_DIRECTION_CARDS.map((card) => (
            <div key={card.id} className="toolkit__slot absolute inset-0 flex justify-center items-start">
              <div className="toolkit-card w-44 md:w-56 aspect-[295/417] relative hover:-translate-y-4 hover:scale-105 transition-transform duration-300">
                <Image
                  src={card.src.replace("/en/", `/${language}/`)}
                  alt={card.alt}
                  fill
                  className="object-contain drop-shadow-xl"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
