"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = transitionRef.current;
    if (!el) return;

    // Initial page enter animation
    gsap.fromTo(
      el,
      { xPercent: 0 },
      {
        xPercent: -100,
        duration: 0.85,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(el, { xPercent: 100 });
        },
      }
    );
  }, []);

  return (
    <div
      ref={transitionRef}
      className="page-transition page-transition--cream"
      aria-hidden="true"
    />
  );
}
