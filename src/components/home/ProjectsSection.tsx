"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  theme: "cream" | "dark";
  previews: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: "ghibli",
    slug: "memories-of-ghibli",
    name: "memories of ghibli",
    theme: "cream",
    previews: [
      "/projects/memories-of-ghibli/previews/ghibli-01-square.webp",
      "/projects/memories-of-ghibli/previews/ghibli-02-square.webp",
      "/projects/memories-of-ghibli/previews/ghibli-03-portrait.webp",
    ],
  },
  {
    id: "mirage",
    slug: "mirage",
    name: "mirage",
    theme: "cream",
    previews: [
      "/projects/mirage/previews/mirage-01-square.webp",
      "/projects/mirage/previews/mirage-02-square.webp",
      "/projects/mirage/previews/mirage-03-portrait.webp",
    ],
  },
  {
    id: "pulse",
    slug: "pulse-festival",
    name: "pulse festival",
    theme: "dark",
    previews: [
      "/projects/pulse-festival/previews/pulse-01-portrait.webp",
      "/projects/pulse-festival/previews/pulse-02-square.webp",
      "/projects/pulse-festival/previews/pulse-03-portrait.webp",
    ],
  },
  {
    id: "ornate",
    slug: "ornate",
    name: "ornate",
    theme: "cream",
    previews: [
      "/projects/ornate/previews/ornate-01-portrait.webp",
      "/projects/ornate/previews/ornate-02-square.webp",
      "/projects/ornate/previews/ornate-03-square.webp",
    ],
  },
  {
    id: "webflow",
    slug: "mae-webflow",
    name: "maë webflow",
    theme: "dark",
    previews: [
      "/projects/mae-webflow/previews/webflow-01-square.webp",
      "/projects/mae-webflow/previews/webflow-02-square.webp",
      "/projects/mae-webflow/previews/webflow-03-portrait.webp",
    ],
  },
];

export function ProjectsSection() {
  const { t } = useI18n();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleMouseEnter = (projId: string) => {
    setHoveredProject(projId);
    setPreviewIndex((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  return (
    <section className="projects relative w-full min-h-screen bg-cream text-dark py-32 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden" id="projects">
      <h2 className="projects__title font-cabinet text-5xl md:text-7xl font-bold tracking-tight mb-16 text-center">
        {t("home.projectsTitle")}
      </h2>

      <nav className="projects__list flex flex-col items-center gap-8 md:gap-14 w-full z-10" aria-label="Projects">
        {PROJECTS.map((project) => {
          const isHovered = hoveredProject === project.id;
          const activePreview = project.previews[previewIndex % project.previews.length];

          return (
            <div
              key={project.id}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/projects/${project.slug}/`}
                className="projects__link font-satoshiItalic text-4xl sm:text-6xl md:text-8xl italic font-normal tracking-tight transition-transform duration-300 group-hover:scale-105 inline-block"
              >
                {project.name}
              </Link>

              {/* Floating Preview Card on Hover */}
              {isHovered && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 w-44 md:w-64 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95 rotate-3">
                  <Image
                    src={activePreview}
                    alt={project.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </section>
  );
}
