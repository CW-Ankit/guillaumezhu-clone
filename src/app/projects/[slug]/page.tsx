import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "@/lib/projects-data";

export function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    notFound();
  }

  const isDark = project.theme === "dark";

  return (
    <div
      className={`project-page min-h-screen w-full ${
        isDark ? "bg-dark text-cream" : "bg-cream text-dark"
      }`}
      data-project={project.slug}
      data-theme={project.theme}
    >
      {/* Back Button */}
      <Link
        href="/#projects"
        className="fixed top-8 left-8 z-50 p-2 text-current hover:opacity-75 transition-opacity"
        aria-label="Back to project list"
      >
        <svg
          width="62"
          height="15"
          viewBox="0 0 62 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M60.3018 7.37256L2.30176 7.37256"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7.26025 13.7279L1.07307 7.54074C0.975439 7.44311 0.975439 7.28482 1.07307 7.18718L7.26025 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Link>

      <main className="w-full pt-28 pb-32 px-6 md:px-16 flex flex-col gap-28 max-w-7xl mx-auto">
        {/* Intro Section */}
        <section className="flex flex-col gap-8">
          <h1 className="font-cabinet text-6xl md:text-9xl font-bold tracking-tight whitespace-pre-line leading-none">
            {project.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/10">
              <video
                src={project.introVideoPrimary}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            {project.introVideoSecondary ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/10">
                <video
                  src={project.introVideoSecondary}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            ) : project.introImageSecondary ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/10">
                <Image
                  src={project.introImageSecondary}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : null}
          </div>
        </section>

        {/* Context Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-current/20 pt-16 font-satoshi">
          <div className="flex flex-wrap md:flex-col gap-3">
            {project.categories.map((cat, idx) => (
              <span
                key={idx}
                className="px-4 py-2 border border-current rounded-full text-sm font-medium w-fit"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="md:col-span-2 flex flex-col gap-6 text-xl md:text-2xl font-normal leading-relaxed opacity-90">
            <p>{project.context1}</p>
            <p>{project.context2}</p>

            <div className="flex flex-wrap gap-6 pt-4">
              {project.experienceUrl && (
                <a
                  href={project.experienceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link font-medium hover:underline inline-flex items-center gap-1"
                >
                  View the experience <span>↗</span>
                </a>
              )}
              {project.creditsUrl && (
                <Link
                  href={project.creditsUrl}
                  className="text-link font-medium hover:underline inline-flex items-center gap-1"
                >
                  Credits & licenses
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Ellipse Visual */}
        <section className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={project.ellipseVisual}
            alt={project.ellipseAlt}
            fill
            className="object-cover"
            unoptimized
          />
        </section>

        {/* Gallery Section */}
        <section className="flex flex-col gap-12">
          <h2 className="font-cabinet text-4xl md:text-5xl font-bold">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-black/5"
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt || ""}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Up Next Section */}
        <section className="border-t border-current/20 pt-20 pb-16 flex flex-col items-center text-center gap-6">
          <span className="font-satoshi text-lg uppercase tracking-wider opacity-60">Up next</span>
          <Link
            href={`/projects/${project.nextProject.slug}/`}
            className="font-cabinet text-5xl md:text-8xl font-bold italic hover:scale-105 transition-transform"
          >
            {project.nextProject.name}
          </Link>
        </section>
      </main>
    </div>
  );
}
