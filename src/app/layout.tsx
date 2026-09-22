import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://guillaumezhu.com"),
  title: "Guillaume Zhu — Creative Front-End Developer & Art Director",
  description:
    "Portfolio of Guillaume Zhu, Front Creative Developer & Art Director, specializing in immersive web experiences, interactive interfaces and art direction.",
  icons: {
    icon: "/brand/logo-guillaume-zhu.svg",
  },
  openGraph: {
    title: "Guillaume Zhu — Front Creative Developer & Art Director",
    description:
      "Portfolio of Guillaume Zhu, Front Creative Developer & Art Director, specializing in immersive web experiences, interactive interfaces and art direction.",
    url: "https://guillaumezhu.com/",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Guillaume Zhu’s 3D logo featuring the titles Front Creative Developer and Art Director",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-dark selection:text-cream">
        <I18nProvider>
          <SmoothScrollProvider>
            <PageTransition />
            <SiteHeader />
            <ScrollIndicator />
            {children}
          </SmoothScrollProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
