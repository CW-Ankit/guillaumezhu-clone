"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export function TrajectorySection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const pinHeightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const visualLeftRef = useRef<HTMLDivElement>(null);
  const visualRightRef = useRef<HTMLDivElement>(null);
  const sentencesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const pinHeight = pinHeightRef.current;
    const container = containerRef.current;
    const visualLeft = visualLeftRef.current;
    const visualRight = visualRightRef.current;
    const sentences = sentencesRef.current.filter(Boolean) as HTMLDivElement[];

    if (!pinHeight || !container || !visualLeft || !visualRight || sentences.length === 0) return;

    // Initial state: hide split visuals and non-first sentences
    gsap.set(visualLeft, { xPercent: -105, yPercent: -50 });
    gsap.set(visualRight, { xPercent: 105, yPercent: -50 });
    sentences.forEach((s, i) => {
      gsap.set(s, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
    });

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

    // Animate through each sentence sequentially
    for (let i = 0; i < sentences.length - 1; i++) {
      const current = sentences[i];
      const next = sentences[i + 1];

      tl.to(current, { opacity: 0, y: -40, duration: 0.8, ease: "power2.in" });
      tl.to(next, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, ">-0.2");
      tl.to({}, { duration: 0.6 }); // Pause on each sentence
    }

    // On final sentence ("the two."), slide in background visual panels
    tl.to(
      visualLeft,
      { xPercent: 0, duration: 1.2, ease: "power3.out" },
      "<"
    );
    tl.to(
      visualRight,
      { xPercent: 0, duration: 1.2, ease: "power3.out" },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="trajectory" id="parcours">
      {/* Title Entry */}
      <div className="container">
        <h2 className="title">{t("home.trajectoryTitle")}</h2>
      </div>

      {/* Sentences with 1100vh Pin Track */}
      <div className="trajectory-sentences">
        <div ref={pinHeightRef} className="trajectory-sentences__pin-height">
          <div ref={containerRef} className="trajectory-sentences__container">
            {/* Split Visual Panels */}
            <div className="trajectory-sentences__visuals" aria-hidden="true">
              <div ref={visualLeftRef} className="trajectory-sentences__visual trajectory-sentences__visual--left" />
              <div ref={visualRightRef} className="trajectory-sentences__visual trajectory-sentences__visual--right" />
            </div>

            {/* Sentences */}
            <div className="trajectory-sentences__center">
              <div ref={(el) => { sentencesRef.current[0] = el; }} className="trajectory-sentences__sentence">
                {t("home.trajectorySentence1")}
              </div>

              <div ref={(el) => { sentencesRef.current[1] = el; }} className="trajectory-sentences__sentence is-two-lines">
                <span>{t("home.trajectorySentence2Line1")}</span><br />
                <span>{t("home.trajectorySentence2Line2")}</span>
              </div>

              <div ref={(el) => { sentencesRef.current[2] = el; }} className="trajectory-sentences__sentence">
                {t("home.trajectorySentence3")}
              </div>

              <div ref={(el) => { sentencesRef.current[3] = el; }} className="trajectory-sentences__sentence is-two-lines">
                <span>{t("home.trajectorySentence4Line1")}</span><br />
                <span>{t("home.trajectorySentence4Line2")}</span>
              </div>

              <div ref={(el) => { sentencesRef.current[4] = el; }} className="trajectory-sentences__sentence">
                {t("home.trajectorySentence5")}
              </div>

              <div ref={(el) => { sentencesRef.current[5] = el; }} className="trajectory-sentences__sentence">
                {t("home.trajectorySentence6")}
              </div>

              <div ref={(el) => { sentencesRef.current[6] = el; }} className="trajectory-sentences__sentence">
                {t("home.trajectorySentence7")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
