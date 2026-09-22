export interface ProjectGalleryItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  description?: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  theme: "cream" | "dark";
  categories: string[];
  context1: string;
  context2: string;
  experienceUrl?: string;
  creditsUrl?: string;
  introVideoPrimary: string;
  introVideoSecondary?: string;
  introImageSecondary?: string;
  introDescription: string;
  ellipseVisual: string;
  ellipseAlt: string;
  gallery: ProjectGalleryItem[];
  nextProject: {
    slug: string;
    name: string;
    previews: string[];
    logo?: string;
  };
}

export const PROJECTS_DATA: Record<string, ProjectData> = {
  "memories-of-ghibli": {
    slug: "memories-of-ghibli",
    title: "Memories\nof Ghibli",
    theme: "cream",
    categories: ["Creative Development", "Three.js", "Creative Lead"],
    context1: "An interactive journey through Miyazaki’s worlds, conceived as a hunt for hidden memories.",
    context2:
      "Art direction, creative coordination and 3D scene design: 32 interactive objects and more than 50 assets curated and optimized in Blender, reducing geometric complexity sixfold while preserving visual richness and performance.",
    experienceUrl: "https://memories-of-ghibli.netlify.app/",
    creditsUrl: "/projects/memories-of-ghibli/credits/",
    introVideoPrimary: "/projects/memories-of-ghibli/media/ghibli-intro1.mp4",
    introVideoSecondary: "/projects/memories-of-ghibli/media/ghibli-intro2.mp4",
    introDescription:
      "Experience preview: a loading screen featuring a poem that invites visitors to begin the journey, followed by the main 3D scene with a picnic table beneath a tree at the edge of a cliff.",
    ellipseVisual: "/projects/memories-of-ghibli/media/ghibli-ellipse1.webp",
    ellipseAlt: "View of a distant cliff populated by characters integrated into the 3D scene.",
    gallery: [
      { type: "image", src: "/projects/memories-of-ghibli/media/ghibli-gallery1.webp", alt: "Close-up view of a castle in the distance, resting on the water." },
      { type: "image", src: "/projects/memories-of-ghibli/media/ghibli-gallery2.webp", alt: "Close-up view of a forest scene from the 3D experience." },
      { type: "image", src: "/projects/memories-of-ghibli/media/ghibli-gallery3.webp", alt: "Calcifer at the center of a campfire in the 3D scene." },
      { type: "image", src: "/projects/memories-of-ghibli/media/ghibli-gallery4.webp", alt: "Yubaba and Warawara in the foreground, with the cliff in the distance." },
      { type: "image", src: "/projects/memories-of-ghibli/media/ghibli-gallery5.webp", alt: "Haku’s dragon tail crossing the sky." },
      { type: "image", src: "/projects/memories-of-ghibli/media/ghibli-gallery6.webp", alt: "Quiz interface with a reference image and multiple answer choices." },
      { type: "image", src: "/projects/memories-of-ghibli/media/ghibli-gallery7.webp", alt: "Trivia panel displayed after a correct quiz answer." },
      { type: "image", src: "/projects/memories-of-ghibli/media/ghibli-gallery8.webp", alt: "Close-up view of the picnic table in the grass." },
    ],
    nextProject: {
      slug: "mirage",
      name: "mirage",
      previews: [
        "/projects/mirage/previews/mirage-01-square.webp",
        "/projects/mirage/previews/mirage-07-square.webp",
        "/projects/mirage/previews/mirage-02-square.webp",
        "/projects/mirage/previews/mirage-06-portrait.webp",
      ],
      logo: "/projects/mirage/logos/mirage-logo.png",
    },
  },
  mirage: {
    slug: "mirage",
    title: "Mirage",
    theme: "cream",
    categories: ["Art Direction", "Creative Development", "AI Exploration"],
    context1: "Creation of Mirage, a fashion studio conceived as a space for visual exploration.",
    context2:
      "Art direction, identity, website and campaigns unfold within a minimal and dreamlike universe, from concept development to image creation, at the boundary between reality and dream.",
    experienceUrl: "https://mirage-portfolio.vercel.app/",
    introVideoPrimary: "/projects/mirage/media/mirage-intro1.mp4",
    introVideoSecondary: "/projects/mirage/media/mirage-intro2.mp4",
    introDescription: "Preview of Mirage’s universe: a minimal, dreamlike website.",
    ellipseVisual: "/projects/mirage/media/mirage-ellipse1.webp",
    ellipseAlt: "Mirage mood image featuring blurred model silhouettes in a smoky haze.",
    gallery: [
      { type: "video", src: "/projects/mirage/media/mirage-gallery9.mp4", description: "Website animation presenting Mirage’s creative projects." },
      { type: "image", src: "/projects/mirage/media/mirage-gallery2.webp", alt: "Mirage campaign featuring a man carrying a leather bag." },
      { type: "image", src: "/projects/mirage/media/mirage-gallery3.webp", alt: "Mirage editorial photograph." },
      { type: "image", src: "/projects/mirage/media/mirage-gallery4.webp", alt: "Fashion portrait with surreal lighting." },
      { type: "image", src: "/projects/mirage/media/mirage-gallery5.webp", alt: "Studio silhouette against dusk light." },
      { type: "image", src: "/projects/mirage/media/mirage-gallery6.webp", alt: "Mirage garment detail." },
      { type: "image", src: "/projects/mirage/media/mirage-gallery7.webp", alt: "Lookbook layout spread." },
      { type: "image", src: "/projects/mirage/media/mirage-gallery8.webp", alt: "Studio emblem embossed on luxury paper." },
    ],
    nextProject: {
      slug: "pulse-festival",
      name: "pulse festival",
      previews: [
        "/projects/pulse-festival/previews/pulse-01-portrait.webp",
        "/projects/pulse-festival/previews/pulse-02-square.webp",
        "/projects/pulse-festival/previews/pulse-03-portrait.webp",
      ],
    },
  },
  "pulse-festival": {
    slug: "pulse-festival",
    title: "Pulse\nfestival",
    theme: "dark",
    categories: ["Art Direction", "3D & Motion", "Freelance"],
    context1:
      "Art direction for three editions of Pulse Festival, deployed across more than 200 touchpoints: visual identity, posters, digital campaigns, signage and motion design.",
    context2:
      "A bold visual universe blending festive energy, electronic culture and industrial aesthetics, designed to bring together 14,000 festivalgoers and strengthen the festival’s reach.",
    introVideoPrimary: "/projects/pulse-festival/media/pulse-intro1.mp4",
    introVideoSecondary: "/projects/pulse-festival/media/pulse-intro2.mp4",
    introDescription: "Preview of three editions of Pulse Festival.",
    ellipseVisual: "/projects/pulse-festival/media/pulse-ellipse1.webp",
    ellipseAlt: "Variant of the main artwork for the first edition of Pulse Festival.",
    gallery: [
      { type: "image", src: "/projects/pulse-festival/media/pulse-gallery1.webp", alt: "Main artwork for second edition." },
      { type: "image", src: "/projects/pulse-festival/media/pulse-gallery2.webp", alt: "Urban poster display." },
      { type: "image", src: "/projects/pulse-festival/media/pulse-gallery3.webp", alt: "Artist spotlight visual." },
      { type: "video", src: "/projects/pulse-festival/media/pulse-gallery4.mp4", description: "Fluids appearing across the grid." },
      { type: "image", src: "/projects/pulse-festival/media/pulse-gallery5.webp", alt: "Artist announcement visual." },
      { type: "image", src: "/projects/pulse-festival/media/pulse-gallery6.webp", alt: "Festival map." },
      { type: "image", src: "/projects/pulse-festival/media/pulse-gallery7.webp", alt: "Translucent bubbles visual." },
      { type: "image", src: "/projects/pulse-festival/media/pulse-gallery8.webp", alt: "First edition visual identity." },
    ],
    nextProject: {
      slug: "ornate",
      name: "ornate",
      previews: [
        "/projects/ornate/previews/ornate-01-portrait.webp",
        "/projects/ornate/previews/ornate-02-square.webp",
        "/projects/ornate/previews/ornate-03-square.webp",
      ],
    },
  },
  ornate: {
    slug: "ornate",
    title: "Ornate",
    theme: "cream",
    categories: ["Art Direction", "Brand Identity", "Personal Project"],
    context1:
      "Creation of Ornate’s visual identity, conceived for an architecture studio and extended across a 360° ecosystem: logo, brand guidelines, print, web design and motion.",
    context2:
      "A luxurious and dreamlike universe where classical references, mineral textures and architectural structures meet a contemporary aesthetic.",
    introVideoPrimary: "/projects/ornate/media/ornate-intro1.mp4",
    introImageSecondary: "/projects/ornate/media/ornate-intro2.webp",
    introDescription: "Preview of Ornate’s identity.",
    ellipseVisual: "/projects/ornate/media/ornate-ellipse1.webp",
    ellipseAlt: "Main Ornate artwork combining a classical statue with a rose-gold grid.",
    gallery: [
      { type: "image", src: "/projects/ornate/media/ornate-gallery1.webp", alt: "Atmospheric image in deep aqua green." },
      { type: "image", src: "/projects/ornate/media/ornate-gallery2.webp", alt: "Letterhead stationery context." },
      { type: "video", src: "/projects/ornate/media/ornate-gallery3.mp4", description: "Trophy fluid transformation." },
      { type: "image", src: "/projects/ornate/media/ornate-gallery4.webp", alt: "Case Studies magazine mockup." },
      { type: "image", src: "/projects/ornate/media/ornate-gallery5.webp", alt: "Architectural brochure spread." },
      { type: "image", src: "/projects/ornate/media/ornate-gallery6.webp", alt: "Business cards foil stamped." },
      { type: "video", src: "/projects/ornate/media/ornate-gallery7.mp4", description: "Motion identity reel." },
    ],
    nextProject: {
      slug: "mae-webflow",
      name: "maë webflow",
      previews: [
        "/projects/mae-webflow/previews/webflow-01-square.webp",
        "/projects/mae-webflow/previews/webflow-02-square.webp",
        "/projects/mae-webflow/previews/webflow-03-portrait.webp",
      ],
    },
  },
  "mae-webflow": {
    slug: "mae-webflow",
    title: "Maë\nwebflow",
    theme: "dark",
    categories: ["Design & Creative Development", "Webflow & GSAP", "Freelance"],
    context1: "Design and development of Maë’s portfolio, from visual direction to interactions.",
    context2:
      "Driven by a series of GSAP animations, the site turns navigation into a narrative journey highlighting her personality, skills and projects, while providing an autonomous Webflow foundation that is easy to maintain and evolve.",
    experienceUrl: "https://mae-portfolio.webflow.io/",
    introVideoPrimary: "/projects/mae-webflow/media/webflow-intro1.mp4",
    introVideoSecondary: "/projects/mae-webflow/media/webflow-intro2.mp4",
    introDescription: "Preview of Maë’s portfolio.",
    ellipseVisual: "/projects/mae-webflow/media/webflow-ellipse1.webp",
    ellipseAlt: "Glass-effect cards over signature gradient.",
    gallery: [
      { type: "image", src: "/projects/mae-webflow/media/webflow-gallery1.webp", alt: "Portfolio project selection interface." },
      { type: "image", src: "/projects/mae-webflow/media/webflow-gallery2.webp", alt: "Signature gradient visual." },
      { type: "video", src: "/projects/mae-webflow/media/webflow-gallery3.mp4", description: "Animated areas of expertise." },
      { type: "video", src: "/projects/mae-webflow/media/webflow-gallery4.mp4", description: "Text animated with GSAP reveal." },
      { type: "image", src: "/projects/mae-webflow/media/webflow-gallery5.webp", alt: "Responsive mobile mockup." },
      { type: "image", src: "/projects/mae-webflow/media/webflow-gallery6.webp", alt: "Interactive typography system." },
    ],
    nextProject: {
      slug: "memories-of-ghibli",
      name: "memories of ghibli",
      previews: [
        "/projects/memories-of-ghibli/previews/ghibli-01-square.webp",
        "/projects/memories-of-ghibli/previews/ghibli-02-square.webp",
      ],
    },
  },
};
