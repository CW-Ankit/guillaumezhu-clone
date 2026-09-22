"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  theme: "cream" | "dark";
  preview: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "ghibli",
    slug: "memories-of-ghibli",
    name: "memories of ghibli",
    theme: "cream",
    preview: "/projects/memories-of-ghibli/previews/ghibli-01-square.webp",
  },
  {
    id: "mirage",
    slug: "mirage",
    name: "mirage",
    theme: "cream",
    preview: "/projects/mirage/previews/mirage-01-square.webp",
  },
  {
    id: "pulse",
    slug: "pulse-festival",
    name: "pulse festival",
    theme: "dark",
    preview: "/projects/pulse-festival/previews/pulse-01-portrait.webp",
  },
  {
    id: "ornate",
    slug: "ornate",
    name: "ornate",
    theme: "cream",
    preview: "/projects/ornate/previews/ornate-01-portrait.webp",
  },
  {
    id: "webflow",
    slug: "mae-webflow",
    name: "maë webflow",
    theme: "dark",
    preview: "/projects/mae-webflow/previews/webflow-01-square.webp",
  },
];

export function ProjectsSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const list = listRef.current;
    if (!section || !container || !list) return;

    // Interface color toggle on section view
    const colorSt = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => {
        document.body.dataset.interfaceColor = "dark";
      },
      onEnterBack: () => {
        document.body.dataset.interfaceColor = "dark";
      },
      onLeave: () => {
        document.body.dataset.interfaceColor = "cream";
      },
      onLeaveBack: () => {
        document.body.dataset.interfaceColor = "cream";
      },
    });

    // Staggered entrance animation for project links
    const links = list.querySelectorAll(".projects__link");
    gsap.set(links, { opacity: 0, y: 35 });
    const revealSt = ScrollTrigger.create({
      trigger: container,
      start: "top 75%",
      onEnter: () => {
        gsap.to(links, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      },
    });

    // Scroll velocity letter skew effect
    let velocityTween: gsap.core.Tween | null = null;
    const letters = list.querySelectorAll(".project-letter__content");
    const velSt = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const vel = self.getVelocity() / 300;
        const clampedVel = Math.max(-12, Math.min(12, vel));
        if (velocityTween) velocityTween.kill();
        velocityTween = gsap.to(letters, {
          y: clampedVel,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    return () => {
      colorSt.kill();
      revealSt.kill();
      velSt.kill();
      if (velocityTween) velocityTween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects" id="projects">
      <div className="projects__pin-height">
        <div ref={containerRef} className="projects__container">
          <h2 className="projects__title">{t("home.projectsTitle")}</h2>

          <nav ref={listRef} className="projects__list" aria-label="Projects">
            {PROJECTS.map((project) => {
              const isHovered = hoveredProjectId === project.id;
              const words = project.name.split(" ");

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}/`}
                  className="projects__link"
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  <span className="flex items-center gap-4">
                    {words.map((word, wIdx) => (
                      <span key={wIdx} className="inline-flex">
                        {word.split("").map((char, cIdx) => {
                          const isMiddleLetter = wIdx === 0 && cIdx === Math.floor(word.length / 2);

                          return (
                            <span key={cIdx} className="project-letter">
                              <span className="project-letter__content">{char}</span>
                              {isMiddleLetter && (
                                <span
                                  className={`project-letter__image ${
                                    isHovered ? "is-active" : ""
                                  }`}
                                >
                                  <Image
                                    src={project.preview}
                                    alt={project.name}
                                    width={120}
                                    height={120}
                                    className="object-cover rounded-[1vw] shadow-xl"
                                    unoptimized
                                  />
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </span>
                    ))}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
