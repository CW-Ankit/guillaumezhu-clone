"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function LegalNoticePage() {
  const { t } = useI18n();

  return (
    <div className="credits-page min-h-screen w-full bg-dark text-cream pt-28 pb-32 px-6 sm:px-10 md:px-16 lg:px-24">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="fixed top-8 left-6 sm:left-10 z-50 px-5 py-2.5 border border-cream/30 rounded-full font-satoshi text-xs sm:text-sm tracking-wide bg-dark/70 backdrop-blur-md hover:bg-cream hover:text-dark transition-all duration-300"
      >
        ← {t("legal.backHome")}
      </Link>

      <main className="max-w-4xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Hero Section */}
        <header className="flex flex-col gap-6 pt-8 md:pt-14">
          <p className="font-satoshi text-xs sm:text-sm uppercase tracking-widest text-cream/50">
            guillaumezhu.com
          </p>
          <h1 className="font-cabinet text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.88] uppercase">
            <span>{t("legal.heroTitleLine1")}</span>
            <br />
            <span>{t("legal.heroTitleLine2")}</span>
          </h1>
          <p className="font-satoshi text-base sm:text-lg md:text-xl text-cream/80 max-w-2xl leading-relaxed mt-2">
            {t("legal.heroIntro")}
          </p>

          {/* Quick Anchor Navigation */}
          <nav
            aria-label={t("legal.navigationLabel")}
            className="flex flex-wrap gap-3 sm:gap-4 mt-6 pt-8 border-t border-cream/15 font-satoshi text-xs sm:text-sm text-cream/70"
          >
            <a href="#editeur" className="px-3 py-1.5 rounded-full border border-cream/15 hover:border-cream hover:text-cream transition-colors">
              {t("legal.navigationPublisher")}
            </a>
            <a href="#hebergement" className="px-3 py-1.5 rounded-full border border-cream/15 hover:border-cream hover:text-cream transition-colors">
              {t("legal.navigationHosting")}
            </a>
            <a href="#propriete" className="px-3 py-1.5 rounded-full border border-cream/15 hover:border-cream hover:text-cream transition-colors">
              {t("legal.navigationProperty")}
            </a>
            <a href="#donnees" className="px-3 py-1.5 rounded-full border border-cream/15 hover:border-cream hover:text-cream transition-colors">
              {t("legal.navigationData")}
            </a>
            <a href="#cookies" className="px-3 py-1.5 rounded-full border border-cream/15 hover:border-cream hover:text-cream transition-colors">
              Cookies
            </a>
            <a href="#mise-a-jour" className="px-3 py-1.5 rounded-full border border-cream/15 hover:border-cream hover:text-cream transition-colors">
              {t("legal.updatesTitle")}
            </a>
          </nav>
        </header>

        {/* 1. Website Publisher */}
        <section id="editeur" className="flex flex-col gap-6 border-t border-cream/20 pt-12 md:pt-16">
          <h2 className="font-cabinet text-3xl sm:text-4xl font-bold uppercase tracking-tight">
            {t("legal.publisherTitle")}
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-cream/75 leading-relaxed">
            {t("legal.publisherIntro")}
          </p>
          <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-3 font-satoshi">
            <h3 className="text-xl font-bold text-cream">Guillaume Zhu</h3>
            <p className="text-sm text-cream/70">{t("legal.publisherMeta")}</p>
            <p className="text-sm text-cream/60">{t("legal.publisherWebsite")}</p>
            <div className="pt-2">
              <a
                href="mailto:contact@guillaumezhu.com"
                className="text-sm underline underline-offset-4 text-cream hover:text-cream/80"
              >
                contact@guillaumezhu.com
              </a>
            </div>
            <p className="text-xs text-cream/50 pt-2 border-t border-cream/10 mt-2">
              {t("legal.publisherLegal")}
            </p>
          </div>
        </section>

        {/* 2. Hosting */}
        <section id="hebergement" className="flex flex-col gap-6 border-t border-cream/20 pt-12 md:pt-16">
          <h2 className="font-cabinet text-3xl sm:text-4xl font-bold uppercase tracking-tight">
            {t("legal.hostingTitle")}
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-cream/75 leading-relaxed">
            {t("legal.hostingIntro")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-2 font-satoshi">
              <h3 className="text-lg font-bold text-cream">Vercel Inc.</h3>
              <p className="text-xs text-cream/60 leading-relaxed">
                440 N Barranca Ave #4133, Covina, CA 91723, United States
              </p>
              <p className="text-sm text-cream/75 mt-1">{t("legal.hostingDescription")}</p>
              <div className="pt-2 mt-auto">
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cream hover:underline flex items-center gap-1"
                >
                  vercel.com ↗
                </a>
              </div>
            </div>

            <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-2 font-satoshi">
              <h3 className="text-lg font-bold text-cream">{t("legal.domainTitle")}</h3>
              <p className="text-xs text-cream/60">guillaumezhu.com · OVHcloud</p>
              <p className="text-sm text-cream/75 mt-1">{t("legal.domainDescription")}</p>
            </div>
          </div>
        </section>

        {/* 3. Intellectual Property */}
        <section id="propriete" className="flex flex-col gap-6 border-t border-cream/20 pt-12 md:pt-16">
          <h2 className="font-cabinet text-3xl sm:text-4xl font-bold uppercase tracking-tight">
            {t("legal.propertyTitle")}
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-cream/75 leading-relaxed">
            {t("legal.propertyIntro")}
          </p>
          <div className="flex flex-col gap-6 font-satoshi">
            <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-cream">{t("legal.websiteContentTitle")}</h3>
              <p className="text-sm text-cream/75 leading-relaxed">
                {t("legal.websiteContentParagraph1")}
              </p>
              <p className="text-sm text-cream/60 leading-relaxed">
                {t("legal.websiteContentParagraph2")}
              </p>
            </div>

            <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-cream">{t("legal.externalResourcesTitle")}</h3>
              <p className="text-sm text-cream/75 leading-relaxed">
                {t("legal.externalResourcesParagraph1")}
              </p>
              <p className="text-sm text-cream/60 leading-relaxed">
                {t("legal.externalResourcesParagraph2")}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Personal Data */}
        <section id="donnees" className="flex flex-col gap-6 border-t border-cream/20 pt-12 md:pt-16">
          <h2 className="font-cabinet text-3xl sm:text-4xl font-bold uppercase tracking-tight">
            {t("legal.personalDataTitle")}
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-cream/75 leading-relaxed">
            {t("legal.personalDataIntro")}
          </p>
          <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-3 font-satoshi">
            <h3 className="text-lg font-bold text-cream">{t("legal.emailTitle")}</h3>
            <p className="text-sm text-cream/75 leading-relaxed">{t("legal.emailParagraph1")}</p>
            <p className="text-sm text-cream/60 leading-relaxed">{t("legal.emailParagraph2")}</p>
          </div>
        </section>

        {/* 5. Cookies */}
        <section id="cookies" className="flex flex-col gap-6 border-t border-cream/20 pt-12 md:pt-16">
          <h2 className="font-cabinet text-3xl sm:text-4xl font-bold uppercase tracking-tight">
            Cookies
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-cream/75 leading-relaxed">
            {t("legal.cookiesIntro")}
          </p>
          <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-3 font-satoshi">
            <h3 className="text-lg font-bold text-cream">{t("legal.cookiesAnalyticsTitle")}</h3>
            <p className="text-sm text-cream/75 leading-relaxed">{t("legal.cookiesParagraph1")}</p>
            <p className="text-sm text-cream/60 leading-relaxed">{t("legal.cookiesParagraph2")}</p>
            <p className="text-xs text-cream/40 pt-2 border-t border-cream/10 mt-2">
              {t("legal.cookiesLegal")}
            </p>
          </div>
        </section>

        {/* 6. Updates */}
        <section id="mise-a-jour" className="flex flex-col gap-6 border-t border-cream/20 pt-12 md:pt-16">
          <h2 className="font-cabinet text-3xl sm:text-4xl font-bold uppercase tracking-tight">
            {t("legal.updatesTitle")}
          </h2>
          <p className="font-satoshi text-base sm:text-lg text-cream/75 leading-relaxed">
            {t("legal.updatesIntro")}
          </p>
          <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-3 font-satoshi">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cream">{t("legal.lastUpdatedTitle")}</h3>
              <span className="text-xs text-cream/60">{t("legal.lastUpdatedDate")}</span>
            </div>
            <p className="text-xs text-cream/50 pt-2 border-t border-cream/10 mt-2">
              {t("legal.englishNotice")}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-16 border-t border-cream/20 font-satoshi">
          <p className="text-xs text-cream/40 uppercase tracking-wider">{t("legal.footerLabel")}</p>
          <Link
            href="/"
            className="text-sm font-medium text-cream hover:underline flex items-center gap-1.5"
          >
            {t("legal.footerBack")} ↗
          </Link>
        </footer>
      </main>
    </div>
  );
}
