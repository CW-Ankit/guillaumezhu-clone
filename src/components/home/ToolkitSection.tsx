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
  const pinHeightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frontendWheelRef = useRef<HTMLDivElement>(null);
  const artWheelRef = useRef<HTMLDivElement>(null);
  const flipperRef = useRef<HTMLDivElement>(null);
  const subFrontRef = useRef<HTMLHeadingElement>(null);
  const subArtRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const pinHeight = pinHeightRef.current;
    const container = containerRef.current;
    const feWheel = frontendWheelRef.current;
    const artWheel = artWheelRef.current;
    const flipper = flipperRef.current;
    const subFront = subFrontRef.current;
    const subArt = subArtRef.current;

    if (!pinHeight || !container || !feWheel || !artWheel) return;

    // Distribute slots radially along top arc of the 300% wheel
    const feSlots = feWheel.querySelectorAll(".toolkit__slot");
    const artSlots = artWheel.querySelectorAll(".toolkit__slot");

    const angleStep = 7.5; // degrees between cards
    feSlots.forEach((slot, idx) => {
      const angle = (idx - (feSlots.length - 1) / 2) * angleStep;
      gsap.set(slot, { rotation: angle });
    });

    artSlots.forEach((slot, idx) => {
      const angle = (idx - (artSlots.length - 1) / 2) * angleStep;
      gsap.set(slot, { rotation: angle });
    });

    gsap.set(subArt, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        pin: container,
        scrub: 1,
        onUpdate: (self) => {
          if (self.progress > 0.05 && self.progress < 0.95) {
            document.body.dataset.interfaceColor = "dark";
          }
        },
      },
    });

    // 1. Rotate frontend wheel
    tl.to(feWheel, { rotation: -30, ease: "none", duration: 2 });

    // 2. Flip Shopify card to Figma near transition
    if (flipper) {
      tl.to(flipper, { rotationY: 180, duration: 0.8, ease: "power2.inOut" }, "-=1.0");
    }

    // 3. Switch subtitles: Front-end out, Art Direction in
    tl.to(subFront, { yPercent: -100, opacity: 0, duration: 0.6, ease: "power2.in" }, "-=0.8");
    tl.to(subArt, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "<");

    // 4. Crossfade to Art Direction wheel
    tl.to(feWheel, { opacity: 0, duration: 0.8 }, "-=0.4");
    tl.to(artWheel, { opacity: 1, duration: 0.8 }, "<");

    // 5. Rotate Art Direction wheel
    tl.fromTo(artWheel, { rotation: 25 }, { rotation: -25, ease: "none", duration: 2 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="toolkit" id="toolkit">
      <div ref={pinHeightRef} className="toolkit__pin-height">
        <div ref={containerRef} className="toolkit__container">
          {/* Header & Animated Subtitles */}
          <div className="toolkit__header">
            <h2 className="toolkit__title">Toolkit</h2>
            <div className="toolkit__subtitle-wrap">
              <h3 ref={subFrontRef} className="toolkit__subtitle toolkit__subtitle--front">
                Creative Front-end
              </h3>
              <h3 ref={subArtRef} className="toolkit__subtitle toolkit__subtitle--art">
                Art Direction
              </h3>
            </div>
          </div>

          {/* Frontend Wheel Deck (300% width, top: 58vh) */}
          <div ref={frontendWheelRef} className="toolkit__wheel toolkit__wheel--frontend">
            {FRONTEND_CARDS.map((card) => (
              <div key={card.id} className="toolkit__slot">
                {card.isFlip ? (
                  <div className="toolkit-card toolkit-card--flip">
                    <div ref={flipperRef} className="toolkit-card__flipper">
                      <div className="toolkit-card__face toolkit-card__face--front">
                        <Image
                          src={card.src.replace("/en/", `/${language}/`)}
                          alt={card.alt}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <div className="toolkit-card__face toolkit-card__face--back">
                        <Image
                          src={(card.backSrc || card.src).replace("/en/", `/${language}/`)}
                          alt={card.backAlt || card.alt}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="toolkit-card">
                    <Image
                      src={card.src.replace("/en/", `/${language}/`)}
                      alt={card.alt}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Art Direction Wheel Deck */}
          <div ref={artWheelRef} className="toolkit__wheel toolkit__wheel--art-direction">
            {ART_DIRECTION_CARDS.map((card) => (
              <div key={card.id} className="toolkit__slot">
                <div className="toolkit-card">
                  <Image
                    src={card.src.replace("/en/", `/${language}/`)}
                    alt={card.alt}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
