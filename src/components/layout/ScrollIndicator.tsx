"use client";

import React, { useEffect, useState } from "react";
import { useLenis } from "./SmoothScrollProvider";

interface SectionItem {
  id: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: "hero", label: "Hero" },
  { id: "manifesto", label: "Manifesto" },
  { id: "parcours", label: "Journey" },
  { id: "toolkit", label: "Toolkit" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Next and footer" },
];

export function ScrollIndicator() {
  const { lenis } = useLenis();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const sectionElements = SECTIONS.map((s) => document.getElementById(s.id));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPos) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el);
    }
  };

  return (
    <nav className="scroll-indicator" aria-label="Section navigation">
      {SECTIONS.map((section, idx) => {
        const isActive = idx === activeIndex;
        const isNeighbor = Math.abs(idx - activeIndex) === 1;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleClick(e, section.id)}
            className={`scroll-indicator__item ${isActive ? "is-active" : ""} ${
              isNeighbor ? "is-neighbor" : ""
            }`}
            aria-label={section.label}
            aria-current={isActive ? "location" : undefined}
          >
            <span className="scroll-indicator__bar" aria-hidden="true" />
          </a>
        );
      })}
    </nav>
  );
}
