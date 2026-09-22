import { HomeLoader } from "@/components/home/HomeLoader";
import { HeroThree } from "@/components/home/HeroThree";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { TrajectorySection } from "@/components/home/TrajectorySection";
import { ToolkitSection } from "@/components/home/ToolkitSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { NextSection } from "@/components/home/NextSection";

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen bg-cream">
      <HomeLoader />
      <HeroThree />
      <ManifestoSection />
      <TrajectorySection />
      <ToolkitSection />
      <ProjectsSection />
      <NextSection />
    </main>
  );
}
