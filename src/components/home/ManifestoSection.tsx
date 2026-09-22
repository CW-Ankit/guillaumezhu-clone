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

    const totalDistance = () => text.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 1.8, 1400)}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > 0.8) {
            document.body.dataset.interfaceColor = "dark";
            section.classList.add("is-exiting");
          } else {
            document.body.dataset.interfaceColor = "cream";
            section.classList.remove("is-exiting");
          }
        },
      },
    });

    // Single performant horizontal translation
    tl.to(text, {
      x: () => -totalDistance(),
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, [manifestoText]);

  return (
    <section ref={sectionRef} className="manifesto" id="manifesto">
      <div ref={containerRef} className="container">
        <p ref={textRef} className="text">
          {manifestoText.split(" ").map((word, wIdx) => (
            <span key={wIdx} className="inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
