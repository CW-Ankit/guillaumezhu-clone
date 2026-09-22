"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useI18n } from "@/lib/i18n";
import { useLenis } from "./SmoothScrollProvider";

export function SiteHeader() {
  const { language, setLanguage, t } = useI18n();
  const { lenis } = useLenis();
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 80) {
        if (isHidden.current) {
          isHidden.current = false;
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.3, ease: "power3.out" });
        }
      } else if (diff > 10 && !isHidden.current) {
        isHidden.current = true;
        gsap.to(headerRef.current, { yPercent: -110, duration: 0.5, ease: "power3.inOut" });
      } else if (diff < -10 && isHidden.current) {
        isHidden.current = false;
        gsap.to(headerRef.current, { yPercent: 0, duration: 0.35, ease: "power3.out" });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (target && lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: 0 });
      }
    }
  };

  return (
    <header ref={headerRef} className="site-header">
      <Link href="/" className="site-header__logo" aria-label={t("header.backHome")}>
        <span className="site-header__logo-mark" aria-hidden="true" />
      </Link>

      <nav className="site-header__nav" aria-label={t("header.mainNavigation")}>
        <Link
          href="/#parcours"
          onClick={(e) => handleNavClick(e, "#parcours")}
          className="site-header__link site-header__link--secondary"
        >
          {t("header.journey")}
        </Link>

        <Link
          href="/#toolkit"
          onClick={(e) => handleNavClick(e, "#toolkit")}
          className="site-header__link site-header__link--secondary"
        >
          {t("header.toolkit")}
        </Link>

        <Link
          href="/#projects"
          onClick={(e) => handleNavClick(e, "#projects")}
          className="site-header__link"
        >
          {t("header.projects")}
        </Link>

        <Link href="/playground/" className="site-header__link site-header__link--playground">
          {t("header.playground")}
        </Link>

        <Link href="/contact/" className="site-header__link">
          {t("header.contact")}
        </Link>

        <button
          type="button"
          onClick={toggleLanguage}
          className="site-header__language-switch"
          aria-label={t("header.languageSwitchLabel")}
        >
          <span className={language === "en" ? "is-active" : ""} aria-hidden="true">
            EN
          </span>
          <span aria-hidden="true">/</span>
          <span className={language === "fr" ? "is-active" : ""} aria-hidden="true">
            FR
          </span>
        </button>
      </nav>

      <div className="w-12 hidden md:block" />
    </header>
  );
}
