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
  const pinHeightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  useEffect(() => {
    const pinHeight = pinHeightRef.current;
    const container = containerRef.current;
    if (!pinHeight || !container) return;

    const st = ScrollTrigger.create({
      trigger: pinHeight,
      start: "top top",
      end: "bottom bottom",
      pin: container,
      scrub: 1,
      onUpdate: (self) => {
        if (self.progress > 0.1 && self.progress < 0.9) {
          document.body.dataset.interfaceColor = "dark";
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section className="projects" id="projects">
      <div ref={pinHeightRef} className="projects__pin-height">
        <div ref={containerRef} className="projects__container">
          <h2 className="projects__title">{t("home.projectsTitle")}</h2>

          <nav className="projects__list" aria-label="Projects">
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
