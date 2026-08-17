"use client";

import { useState } from "react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Hero from "@/components/sections/Hero";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import LiveWorks from "@/components/sections/LiveWorks";
import TechArsenal from "@/components/sections/TechArsenal";
import ContactSection from "@/components/sections/ContactSection";
import GrainOverlay from "@/components/GrainOverlay";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {/* Preloader — covers everything until done */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      <CustomCursor />
      <SectionNav />

      <SmoothScrollProvider>
        <div className="star-field" />
        <main className="relative z-10 text-[#f0ece4]">
          <Hero preloaderDone={preloaderDone} />
          <ExperienceSection />
          <ProjectsShowcase />
          <LiveWorks />
          <TechArsenal />
          <ContactSection />
        </main>
        <GrainOverlay />
      </SmoothScrollProvider>
    </>
  );
}
