"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export function TrajectorySection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const sentencesPinRef = useRef<HTMLDivElement>(null);
  const visualLeftRef = useRef<HTMLDivElement>(null);
  const visualRightRef = useRef<HTMLDivElement>(null);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sentences = [
    { text: t("home.trajectorySentence1") },
    { line1: t("home.trajectorySentence2Line1"), line2: t("home.trajectorySentence2Line2") },
    { text: t("home.trajectorySentence3") },
    { line1: t("home.trajectorySentence4Line1"), line2: t("home.trajectorySentence4Line2") },
    { text: t("home.trajectorySentence5") },
    { text: t("home.trajectorySentence6") },
    { text: t("home.trajectorySentence7") },
  ];

  useEffect(() => {
    const pinHeight = sentencesPinRef.current;
    const visualLeft = visualLeftRef.current;
    const visualRight = visualRightRef.current;
    if (!pinHeight || !visualLeft || !visualRight) return;

    gsap.set(visualLeft, { xPercent: -101, yPercent: -50 });
    gsap.set(visualRight, { xPercent: 101, yPercent: -50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (self.progress > 0.15 && self.progress < 0.85) {
            document.body.dataset.interfaceColor = "dark";
          }
        },
      },
    });

    // Animate through sentences
    sentenceRefs.current.forEach((el, index) => {
      if (!el) return;

      if (index === 0) {
        tl.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
      } else {
        const prev = sentenceRefs.current[index - 1];
        if (prev) {
          tl.to(prev, { opacity: 0, y: -50, duration: 0.4 }, `+=0.2`);
        }
        tl.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });

        // Trigger visual panels for "the two"
        if (index === 6) {
          tl.to(visualLeft, { xPercent: -10, opacity: 0.9, duration: 0.6, ease: "power2.out" }, "<");
          tl.to(visualRight, { xPercent: 10, opacity: 0.9, duration: 0.6, ease: "power2.out" }, "<");
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="trajectory relative w-full bg-dark text-cream" id="parcours">
      <div className="entry w-full h-screen flex items-center justify-center">
        <h2 className="title font-cabinet text-[12vw] font-bold text-center tracking-tight">
          {t("home.trajectoryTitle")}
        </h2>
      </div>

      <div ref={sentencesPinRef} className="trajectory-sentences relative w-full h-screen overflow-hidden">
        {/* Background Visual Panels */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            ref={visualLeftRef}
            className="absolute top-1/2 left-0 w-[48vw] h-[60vh] bg-cover bg-no-repeat rounded-r-[24px]"
            style={{
              backgroundImage: "url(/home/trajectory/background.webp)",
              backgroundPosition: "left center",
            }}
          />
          <div
            ref={visualRightRef}
            className="absolute top-1/2 right-0 w-[48vw] h-[60vh] bg-cover bg-no-repeat rounded-l-[24px]"
            style={{
              backgroundImage: "url(/home/trajectory/background.webp)",
              backgroundPosition: "right center",
            }}
          />
        </div>

        {/* Center Sentences */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {sentences.map((s, idx) => (
            <div
              key={idx}
              ref={(el) => { sentenceRefs.current[idx] = el; }}
              className="absolute font-cabinet text-[9vw] font-bold text-center leading-none text-cream select-none px-6"
            >
              {"text" in s ? (
                <span>{s.text}</span>
              ) : (
                <>
                  <span>{s.line1}</span>
                  <br />
                  <span>{s.line2}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
