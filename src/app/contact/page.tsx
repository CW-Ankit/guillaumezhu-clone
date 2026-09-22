"use client";

import React, { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle interactive ambient canvas on contact page
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const mouse = { x: width * 0.5, y: height * 0.5, targetX: width * 0.5, targetY: height * 0.5 };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Ambient floating particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Radial mouse glow
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        Math.min(width, height) * 0.5
      );
      gradient.addColorStop(0, "rgba(245, 231, 223, 0.06)");
      gradient.addColorStop(0.5, "rgba(245, 231, 223, 0.02)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 231, 223, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[100dvh] bg-cream p-2 sm:p-3 md:p-4 overflow-hidden">
      {/* Dark Framed Inner Card */}
      <div className="relative w-full h-full bg-dark text-cream rounded-[18px] flex flex-col justify-between overflow-hidden shadow-2xl p-6 sm:p-10 md:p-14 lg:p-16">
        {/* Interactive Ambient Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
          aria-hidden="true"
        />

        {/* Top spacer (leaves room for fixed SiteHeader capsule) */}
        <div className="h-16 md:h-20" />

        {/* Center: Hero Heading and Availability */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
          <h1 className="font-cabinet text-4xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] font-bold leading-[0.85] tracking-tight uppercase max-w-5xl">
            <span className="block">{t("contact.headingLine1")}</span>
            <span className="block">{t("contact.headingLine2")}</span>
            <span className="block">{t("contact.headingLine3")}</span>
          </h1>

          <div className="mt-8 md:mt-12 text-center font-satoshi">
            <p className="text-base sm:text-lg md:text-xl font-medium text-cream">
              {t("contact.availability")}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-cream/60 mt-1">
              {t("contact.availabilityMeta")}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Services & Direct Contact Link */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-6 font-satoshi">
          {/* Services Offered */}
          <div className="flex flex-col text-xs sm:text-sm text-cream/70 leading-relaxed">
            <span className="text-[11px] uppercase tracking-wider text-cream/40 mb-1">
              {t("contact.servicesLabel") || "Expertise"}
            </span>
            <span>{t("contact.serviceCreativeDevelopment")}</span>
            <span>{t("contact.serviceImmersiveExperiences")}</span>
            <span>{t("contact.serviceInteractiveInterfaces")}</span>
          </div>

          {/* Direct Email Link */}
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[11px] uppercase tracking-wider text-cream/40 mb-1">
              Direct Contact
            </span>
            <a
              href="mailto:contact@guillaumezhu.com"
              className="text-sm sm:text-base md:text-lg font-medium text-cream hover:underline hover:opacity-80 transition-opacity flex items-center gap-1.5"
            >
              {t("contact.email")}
              <span className="text-xs opacity-60">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
