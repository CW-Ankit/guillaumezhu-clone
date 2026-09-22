import React from "react";
import Link from "next/link";

export default function GhibliCreditsPage() {
  return (
    <div className="credits-page min-h-screen w-full bg-dark text-cream pt-28 pb-32 px-6 md:px-16">
      <Link
        href="/projects/memories-of-ghibli/"
        className="fixed top-8 left-8 z-50 px-4 py-2 border border-cream rounded-full font-satoshi text-sm hover:bg-cream hover:text-dark transition-colors"
      >
        Back to project
      </Link>

      <main className="max-w-4xl mx-auto flex flex-col gap-16">
        <header className="flex flex-col gap-4">
          <p className="font-satoshi text-sm uppercase tracking-widest opacity-60">
            Memories of Ghibli
          </p>
          <h1 className="font-cabinet text-6xl md:text-8xl font-bold tracking-tight leading-none">
            Credits<br />&amp; licenses
          </h1>
          <p className="font-satoshi text-lg md:text-xl opacity-80 mt-4 leading-relaxed">
            Experimental, non-commercial student project inspired by the films of Hayao Miyazaki.
            This unofficial creation is neither affiliated with nor endorsed by Studio Ghibli.
          </p>

          <nav className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-cream/20 font-satoshi text-sm">
            <a href="#models" className="hover:underline opacity-80 hover:opacity-100">3D Models</a>
            <a href="#audio" className="hover:underline opacity-80 hover:opacity-100">Music &amp; Sound</a>
            <a href="#typography" className="hover:underline opacity-80 hover:opacity-100">Typography</a>
            <a href="#data" className="hover:underline opacity-80 hover:opacity-100">TMDB</a>
          </nav>
        </header>

        {/* 3D Models Section */}
        <section id="models" className="flex flex-col gap-6 border-t border-cream/20 pt-12">
          <h2 className="font-cabinet text-3xl font-bold">3D Models</h2>
          <p className="font-satoshi text-base opacity-80">
            External 3D models were curated, adapted and optimized in Blender for integration into a WebGL experience.
          </p>
          <ul className="flex flex-col gap-4 font-satoshi">
            <li className="flex justify-between items-center py-2 border-b border-cream/10">
              <span className="font-medium">Noface1446812 by Feurum</span>
              <span className="text-xs uppercase px-2 py-1 border border-cream/40 rounded">CC BY 4.0</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-cream/10">
              <span className="font-medium">Soot Sprite by quentin.rossi</span>
              <span className="text-xs uppercase px-2 py-1 border border-cream/40 rounded">CC BY 4.0</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-cream/10">
              <span className="font-medium">Calcifer by glenatron</span>
              <span className="text-xs uppercase px-2 py-1 border border-cream/40 rounded">CC BY 4.0</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-cream/10">
              <span className="font-medium">Totoro by artstoff</span>
              <span className="text-xs uppercase px-2 py-1 border border-cream/40 rounded">CC BY 4.0</span>
            </li>
          </ul>
        </section>

        {/* Audio Section */}
        <section id="audio" className="flex flex-col gap-6 border-t border-cream/20 pt-12 font-satoshi">
          <h2 className="font-cabinet text-3xl font-bold">Music &amp; Sound</h2>
          <p className="opacity-80">
            Ambient soundscape, wind harmonics and acoustic piano melodies composed in homage to Joe Hisaishi.
          </p>
        </section>

        {/* Typography Section */}
        <section id="typography" className="flex flex-col gap-6 border-t border-cream/20 pt-12 font-satoshi">
          <h2 className="font-cabinet text-3xl font-bold">Typography</h2>
          <p className="opacity-80">
            Featuring Satoshi and Cabinet Grotesk by Indian Type Foundry.
          </p>
        </section>
      </main>
    </div>
  );
}
