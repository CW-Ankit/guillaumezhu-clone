"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "fr";

const TRANSLATIONS = {
  en: {
    header: {
      journey: "journey",
      toolkit: "toolkit",
      projects: "projects",
      playground: "playground",
      contact: "contact",
      languageSwitchLabel: "Switch language between English and French",
      backHome: "Back to home",
      mainNavigation: "Main navigation",
    },
    home: {
      description: "Portfolio of Guillaume Zhu, Front Creative Developer & Art Director, specializing in immersive web experiences, interactive interfaces and art direction.",
      manifesto: "I create experiences at the intersection of design and code.",
      trajectoryTitle: "My journey",
      trajectorySentence1: "First",
      trajectorySentence2Line1: "art",
      trajectorySentence2Line2: "direction.",
      trajectorySentence3: "Then",
      trajectorySentence4Line1: "front-end",
      trajectorySentence4Line2: "development.",
      trajectorySentence5: "Today",
      trajectorySentence6: "I bridge",
      trajectorySentence7: "the two.",
      projectsTitle: "Projects",
      nextIntro: "What’s next?",
      playgroundLink: "A detour through the Playground",
      nextTextCream: "If our visions align,",
      nextTextGradient: "let’s shape what’s next together",
      footerLine1: "Open to joining",
      footerLine2: "a creative team",
      footerLine3: "Apprenticeship · October 2026",
      legalNotice: "Legal notice",
      footerExplore: "Explore",
      footerJourney: "Journey",
      footerProjects: "Projects",
    },
    contact: {
      title: "Contact — Guillaume Zhu",
      description: "Contact Guillaume Zhu for creative development, immersive experiences and interactive front-end work. Available for an apprenticeship in Paris from October 2026.",
      headingLine1: "Let’s create",
      headingLine2: "something worth",
      headingLine3: "remembering",
      availability: "Available for an apprenticeship",
      availabilityMeta: "October 2026 · Paris",
      serviceCreativeDevelopment: "creative development",
      serviceImmersiveExperiences: "immersive experiences",
      serviceInteractiveInterfaces: "front-end craft",
      email: "contact@guillaumezhu.com",
    },
    legal: {
      title: "Legal Notice | Guillaume Zhu",
      description: "Legal notice for Guillaume Zhu’s portfolio: publisher, hosting, intellectual property and personal data.",
      backHome: "Back to home",
      heroTitleLine1: "Legal",
      heroTitleLine2: "Notice",
      heroIntro: "Information regarding the publication, hosting, intellectual property and use of data on this portfolio.",
      navigationLabel: "Legal notice sections",
      navigationPublisher: "Publisher",
      navigationHosting: "Hosting",
      navigationProperty: "Intellectual Property",
      navigationData: "Personal Data",
      publisherTitle: "Website Publisher",
      publisherIntro: "This website is a personal and professional portfolio showcasing projects in art direction, digital design and front-end development.",
      publisherMeta: "Art Direction · Digital Design · Front-end Development",
      publisherWebsite: "Website: guillaumezhu.com",
      publisherLegal: "Publication manager: Guillaume Zhu.",
      hostingTitle: "Hosting",
      hostingIntro: "The website is deployed through Vercel. The domain name is registered with OVHcloud.",
      hostingDescription: "Technical hosting provider for the website.",
      domainTitle: "Domain Name",
      domainDescription: "The website’s domain name is registered with OVHcloud.",
      propertyTitle: "Intellectual Property",
      propertyIntro: "The content presented on this website is protected by intellectual property law.",
      websiteContentTitle: "Website Content",
      websiteContentParagraph1: "Unless otherwise stated, all content featured on this website is the property of Guillaume Zhu, including texts, interfaces, animations, graphic elements, art direction, integrations and front-end development.",
      websiteContentParagraph2: "Any reproduction, representation, modification, distribution or full or partial use of this content without prior authorization is prohibited.",
      externalResourcesTitle: "Projects, Images & External Resources",
      externalResourcesParagraph1: "Some projects may incorporate external resources, generated, composited or retouched elements, as well as creations produced within fictional, experimental, educational or personal contexts.",
      externalResourcesParagraph2: "Where necessary, specific credits are provided directly on the relevant project pages.",
      personalDataTitle: "Personal Data",
      personalDataIntro: "This portfolio does not provide user accounts, registration forms or newsletters.",
      emailTitle: "Contact by Email",
      emailParagraph1: "If you contact the website publisher by email, the information you provide will be used solely to respond to your request.",
      emailParagraph2: "You may request access to, correction or deletion of information concerning you by writing to the contact address provided on this page.",
      cookiesIntro: "The website prioritizes a simple experience without targeted advertising or marketing tracking.",
      cookiesAnalyticsTitle: "Cookies & Analytics",
      cookiesParagraph1: "This website does not use advertising cookies.",
      cookiesParagraph2: "At present, no audience measurement tool requiring prior consent is integrated into the website.",
      cookiesLegal: "If an analytics tool is added in the future, this page will be updated to explain how it operates.",
      updatesTitle: "Updates",
      updatesIntro: "This page may be updated depending on the tools integrated into the website.",
      lastUpdatedTitle: "Last Updated",
      lastUpdatedDate: "July 2026",
      englishNotice: "This English version is provided for informational purposes. In case of discrepancy, the French version prevails.",
      footerLabel: "End of Legal Notice",
      footerBack: "Back to home",
    },
  },
  fr: {
    header: {
      journey: "parcours",
      toolkit: "toolkit",
      projects: "projets",
      playground: "playground",
      contact: "contact",
      languageSwitchLabel: "Changer de langue entre anglais et français",
      backHome: "Retour à l’accueil",
      mainNavigation: "Navigation principale",
    },
    home: {
      description: "Portfolio de Guillaume Zhu, Développeur Front Créatif & Directeur Artistique, spécialisé dans les expériences web immersives, les interfaces interactives et la direction artistique.",
      manifesto: "Je crée des expériences à la croisée du design et du code.",
      trajectoryTitle: "Mon parcours",
      trajectorySentence1: "D’abord",
      trajectorySentence2Line1: "la direction",
      trajectorySentence2Line2: "artistique.",
      trajectorySentence3: "Puis",
      trajectorySentence4Line1: "le développement",
      trajectorySentence4Line2: "front-end.",
      trajectorySentence5: "Aujourd’hui",
      trajectorySentence6: "je lie",
      trajectorySentence7: "les deux.",
      projectsTitle: "Projets",
      nextIntro: "Et après ?",
      playgroundLink: "Un détour par le Playground",
      nextTextCream: "Si nos visions se croisent,",
      nextTextGradient: "imaginons la suite ensemble",
      footerLine1: "Ouvert à intégrer",
      footerLine2: "une équipe créative",
      footerLine3: "Alternance · Octobre 2026",
      legalNotice: "Mentions légales",
      footerExplore: "Explorer",
      footerJourney: "Parcours",
      footerProjects: "Projets",
    },
    contact: {
      title: "Contact — Guillaume Zhu",
      description: "Contactez Guillaume Zhu pour vos projets de développement créatif, d'expériences immersives et d'interfaces web interactives.",
      headingLine1: "Créons ensemble",
      headingLine2: "quelque chose dont",
      headingLine3: "on se souviendra",
      availability: "Disponible en alternance",
      availabilityMeta: "Octobre 2026 · Paris",
      serviceCreativeDevelopment: "développement créatif",
      serviceImmersiveExperiences: "expériences immersives",
      serviceInteractiveInterfaces: "artisanat front-end",
      email: "contact@guillaumezhu.com",
    },
    legal: {
      title: "Mentions Légales | Guillaume Zhu",
      description: "Mentions légales du portfolio de Guillaume Zhu : éditeur, hébergement, propriété intellectuelle et données personnelles.",
      backHome: "Retour à l’accueil",
      heroTitleLine1: "Mentions",
      heroTitleLine2: "Légales",
      heroIntro: "Informations relatives à l’édition, l’hébergement, la propriété intellectuelle et l’utilisation des données de ce portfolio.",
      navigationLabel: "Sections des mentions légales",
      navigationPublisher: "Éditeur",
      navigationHosting: "Hébergement",
      navigationProperty: "Propriété intellectuelle",
      navigationData: "Données personnelles",
      publisherTitle: "Éditeur du site",
      publisherIntro: "Ce site est un portfolio personnel et professionnel présentant des projets de direction artistique, de design numérique et de développement front-end.",
      publisherMeta: "Direction artistique · Design numérique · Développement front-end",
      publisherWebsite: "Site web : guillaumezhu.com",
      publisherLegal: "Directeur de la publication : Guillaume Zhu.",
      hostingTitle: "Hébergement",
      hostingIntro: "Le site est déployé via Vercel. Le nom de domaine est enregistré chez OVHcloud.",
      hostingDescription: "Hébergeur technique du site.",
      domainTitle: "Nom de domaine",
      domainDescription: "Le nom de domaine du site est enregistré auprès d’OVHcloud.",
      propertyTitle: "Propriété intellectuelle",
      propertyIntro: "Les contenus présentés sur ce site sont protégés par le droit de la propriété intellectuelle.",
      websiteContentTitle: "Contenu du site",
      websiteContentParagraph1: "Sauf mention contraire, l’ensemble des contenus présents sur ce site est la propriété de Guillaume Zhu, incluant les textes, interfaces, animations, éléments graphiques, directions artistiques, intégrations et développements front-end.",
      websiteContentParagraph2: "Toute reproduction, représentation, modification, diffusion ou exploitation totale ou partielle de ces contenus sans autorisation préalable est interdite.",
      externalResourcesTitle: "Projets, images & ressources externes",
      externalResourcesParagraph1: "Certains projets peuvent intégrer des ressources externes, des éléments générés, composites ou retouchés, ainsi que des réalisations conçues dans un cadre fictif, expérimental, pédagogique ou personnel.",
      externalResourcesParagraph2: "Le cas échéant, les crédits spécifiques sont mentionnés directement sur les pages des projets concernés.",
      personalDataTitle: "Données personnelles",
      personalDataIntro: "Ce portfolio ne propose aucun compte utilisateur, formulaire d’inscription ou newsletter.",
      emailTitle: "Contact par e-mail",
      emailParagraph1: "En cas de prise de contact par e-mail avec l’éditeur du site, les informations transmises sont exclusivement utilisées pour répondre à votre demande.",
      emailParagraph2: "Vous pouvez demander l’accès, la rectification ou la suppression des données vous concernant en écrivant à l’adresse de contact indiquée sur cette page.",
      cookiesIntro: "Le site privilégie une navigation sobre sans publicité ciblée ni traçage marketing.",
      cookiesAnalyticsTitle: "Cookies & statistiques",
      cookiesParagraph1: "Ce site n’utilise aucun cookie publicitaire.",
      cookiesParagraph2: "À ce jour, aucun outil de mesure d’audience nécessitant un consentement préalable n’est intégré au site.",
      cookiesLegal: "Si un outil d’analyse venait à être intégré ultérieurement, cette page sera mise à jour afin d’en détailler le fonctionnement.",
      updatesTitle: "Mises à jour",
      updatesIntro: "Cette page pourra être actualisée en fonction de l’évolution des outils intégrés au site.",
      lastUpdatedTitle: "Dernière mise à jour",
      lastUpdatedDate: "Juillet 2026",
      englishNotice: "Cette version anglaise est fournie à titre indicatif. En cas de divergence, la version française prévaut.",
      footerLabel: "Fin des mentions légales",
      footerBack: "Retour à l’accueil",
    },
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("gz_language") as Language;
    if (saved === "fr" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("gz_language", lang);
  };

  const t = (path: string): string => {
    const parts = path.split(".");
    let current: unknown = TRANSLATIONS[language];
    for (const part of parts) {
      if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return path;
      }
    }
    return typeof current === "string" ? current : path;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
