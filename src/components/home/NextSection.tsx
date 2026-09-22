"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export function NextSection() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const orbRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const footer = footerRef.current;
    const orb = orbRef.current;
    const path = pathRef.current;
    if (!container || !footer || !orb || !path) return;

    const pathLength = path.getTotalLength();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
      },
    });

    // Animate orb along path
    tl.to(
      {},
      {
        duration: 1,
        onUpdate: function () {
          const p = this.progress();
          const point = path.getPointAtLength(p * pathLength);
          gsap.set(orb, { attr: { cx: point.x, cy: point.y }, autoAlpha: 1 });
        },
      }
    );

    // Expand footer circular clip-path
    tl.fromTo(
      footer,
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(100% at 50% 50%)", duration: 1, ease: "power2.inOut" },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="next-section relative w-full h-screen bg-dark text-cream overflow-hidden" id="contact">
      {/* Intro */}
      <div className="next-section__intro absolute top-24 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="font-cabinet text-4xl md:text-6xl font-bold tracking-tight">
          {t("home.nextIntro")}
        </p>
        <Link
          href="/playground/"
          className="next-section__playground-link mt-4 inline-flex items-center gap-2 font-satoshi text-lg md:text-xl font-medium hover:opacity-80 transition-opacity"
        >
          <span>{t("home.playgroundLink")}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      {/* SVG Path with animated text and orb */}
      <svg
        className="next-section__svg absolute top-1/2 left-0 -translate-y-1/2 w-[250vw] h-auto pointer-events-none z-10"
        fill="none"
        viewBox="0 0 3898 891"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="nextTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="80%" stopColor="#f6c177" />
            <stop offset="85%" stopColor="#9b7cff" />
            <stop offset="100%" stopColor="#ff6b4a" />
          </linearGradient>
        </defs>

        <path
          ref={pathRef}
          id="nextPath"
          d="M0.398438 611.016C175.398 377.517 857.398 -285.484 1461.4 139.638C1911.53 456.46 2114.4 805.516 2679.4 611.016C3088.4 470.219 3704.54 -33.3124 4354.9 781.516C4700.9 1215.02 5305.6 1466.52 6108.4 328.516"
        />

        <text className="font-cabinet text-[160px] md:text-[220px] font-medium tracking-tight">
          <textPath href="#nextPath" textAnchor="start">
            <tspan fill="#f5e7df">{t("home.nextTextCream")}</tspan>{" "}
            <tspan fill="url(#nextTextGradient)">{t("home.nextTextGradient")}</tspan>
          </textPath>
        </text>

        <circle ref={orbRef} id="nextOrb" cx="0" cy="0" r="16" fill="#ff6b4a" />
      </svg>

      {/* Footer Revealed via Circular Clip Path */}
      <footer
        ref={footerRef}
        className="next-footer absolute inset-4 md:inset-8 rounded-[18px] overflow-hidden z-20 pointer-events-auto"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/shared/footer/background.webp)" }}
        />
        <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" />

        <div className="relative z-10 w-full h-full p-8 md:p-16 flex flex-col justify-between text-cream">
          <div className="max-w-4xl">
            <p className="font-cabinet text-3xl sm:text-5xl md:text-7xl font-medium leading-tight">
              <span>{t("home.footerLine1")}</span><br />
              <span>{t("home.footerLine2")}</span><br />
              <span className="opacity-75 text-2xl sm:text-4xl md:text-5xl">{t("home.footerLine3")}</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-8 border-t border-cream/20 font-satoshi">
            <div className="flex flex-col sm:flex-row gap-6 text-sm md:text-base opacity-80">
              <Link href="/mentions-legales/" className="hover:opacity-100 transition-opacity">
                {t("home.legalNotice")}
              </Link>
              <span>© 2026 Guillaume Zhu</span>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-12 text-base md:text-lg">
              <div className="flex flex-col gap-2">
                <span className="font-cabinet text-xl font-bold opacity-60">{t("home.footerExplore")}</span>
                <Link href="/#parcours" className="hover:underline">{t("home.footerJourney")}</Link>
                <Link href="/#toolkit" className="hover:underline">Toolkit</Link>
                <Link href="/#projects" className="hover:underline">{t("home.footerProjects")}</Link>
                <Link href="/playground/" className="hover:underline">Playground</Link>
                <Link href="/contact/" className="hover:underline">Contact</Link>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-cabinet text-xl font-bold opacity-60">Contact</span>
                <a href="https://www.linkedin.com/in/guillaume-zhu/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                <a href="https://github.com/guillaume-zhu" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                <a href="mailto:contact@guillaumezhu.com" className="hover:underline">Email</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
