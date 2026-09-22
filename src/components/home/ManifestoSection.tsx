"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export function ManifestoSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const manifestoText = t("home.manifesto");

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const text = textRef.current;
    if (!section || !container || !text) return;

    const letters = text.querySelectorAll(".letter");
    const totalDistance = () => text.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 2, totalDistance() * 1.5)}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > 0.85) {
            document.body.dataset.interfaceColor = "dark";
          } else {
            document.body.dataset.interfaceColor = "cream";
          }
        },
      },
    });

    // Horizontal text translation
    tl.to(text, {
      x: () => -totalDistance(),
      ease: "none",
    });

    // Randomized elastic letter displacements
    letters.forEach((letter) => {
      gsap.from(letter, {
        yPercent: (Math.random() - 0.5) * 120,
        rotation: (Math.random() - 0.5) * 45,
        ease: "elastic.out(1.2, 1)",
        scrollTrigger: {
          trigger: letter,
          containerAnimation: tl,
          start: "left 100%",
          end: "left 20%",
          scrub: 0.5,
        },
      });
    });

    return () => {
      tl.kill();
    };
  }, [manifestoText]);

  return (
    <section
      ref={sectionRef}
      className="manifesto relative w-full bg-cream overflow-hidden"
      id="manifesto"
    >
      <div
        ref={containerRef}
        className="container w-full h-screen flex items-center overflow-hidden"
      >
        <p
          ref={textRef}
          className="text whitespace-nowrap text-dark font-cabinet text-[10vw] font-bold leading-none select-none pl-[50vw] pr-[50vw]"
        >
          {manifestoText.split("").map((char, index) => (
            char === " " ? (
              <span key={index} className="inline-block">&nbsp;</span>
            ) : (
              <span key={index} className="letter inline-block">
                {char}
              </span>
            )
          ))}
        </p>
      </div>
    </section>
  );
}
