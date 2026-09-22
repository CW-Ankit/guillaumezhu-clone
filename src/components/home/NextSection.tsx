"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export function NextSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const pinHeightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const orbRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinHeight = pinHeightRef.current;
    const container = containerRef.current;
    const footer = footerRef.current;
    const orb = orbRef.current;
    const path = pathRef.current;
    const textPath = textPathRef.current;
    const intro = introRef.current;

    if (!pinHeight || !container || !footer || !orb || !path || !textPath) return;

    const pathLength = path.getTotalLength();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        pin: container,
        scrub: 1,
        onUpdate: (self) => {
          if (self.progress > 0.1) {
            document.body.dataset.interfaceColor = "dark";
          }
        },
      },
    });

    // 1. Intro fades out cleanly as scroll starts
    if (intro) {
      tl.to(intro, { opacity: 0, y: -40, duration: 0.4, ease: "power2.in" }, 0);
    }

    // 2. Animate orb & text along path
    tl.to(
      {},
      {
        duration: 2.5,
        onUpdate: function () {
          const p = this.progress();
          const point = path.getPointAtLength(p * pathLength);
          gsap.set(orb, { attr: { cx: point.x, cy: point.y }, autoAlpha: 1 });
          textPath.setAttribute("startOffset", `${-p * 60}%`);
        },
      },
      0
    );

    // 3. Expand footer circular clip-path
    tl.fromTo(
      footer,
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(150% at 50% 50%)", duration: 1.2, ease: "power2.inOut" },
      ">"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="next-section" id="contact">
      <div ref={pinHeightRef} className="next-section__pin-height">
        <div ref={containerRef} className="next-section__container">
          {/* Intro */}
          <div ref={introRef} className="next-section__intro">
            <p>{t("home.nextIntro")}</p>
            <Link href="/playground/" className="next-section__playground-link">
              <span>{t("home.playgroundLink")}</span>
              <span className="next-section__playground-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          {/* SVG Path with animated text and orb */}
          <svg
            className="next-section__svg"
            viewBox="0 0 6200 1200"
            fill="none"
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

            <text className="next-section__text">
              <textPath ref={textPathRef} href="#nextPath" startOffset="0%">
                <tspan fill="#f5e7df">{t("home.nextTextCream")} </tspan>
                <tspan fill="url(#nextTextGradient)">{t("home.nextTextGradient")}</tspan>
              </textPath>
            </text>

            <circle ref={orbRef} r="48" fill="#f5e7df" />
          </svg>

          {/* Next Footer revealed via circular clip-path */}
          <footer ref={footerRef} className="next-footer">
            <div className="next-footer__background" />
            <div className="next-footer__content">
              <div className="next-footer__inner">
                <div className="next-footer__main">
                  <p className="next-footer__headline">
                    <span>{t("home.footerLine1")}</span>
                    <br />
                    <span>{t("home.footerLine2")}</span>
                  </p>
                  <div className="next-footer__meta">
                    <span>{t("home.footerLine3")}</span>
                    <span>·</span>
                    <Link href="/mentions-legales/" className="hover:underline">
                      {t("home.legalNotice")}
                    </Link>
                  </div>
                </div>

                <nav className="next-footer__nav" aria-label="Footer navigation">
                  <div className="next-footer__group">
                    <span className="next-footer__group-title">{t("home.footerExplore")}</span>
                    <a href="#parcours">{t("home.footerJourney")}</a>
                    <a href="#projects">{t("home.footerProjects")}</a>
                    <Link href="/playground/">Playground</Link>
                  </div>
                  <div className="next-footer__group">
                    <span className="next-footer__group-title">Contact</span>
                    <a href="mailto:contact@guillaumezhu.com">Email ↗</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      LinkedIn ↗
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
