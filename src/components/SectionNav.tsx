"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "tech", label: "Tech Stack" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Show nav after scrolling past hero
    ScrollTrigger.create({
      trigger: document.body,
      start: "300px top",
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    // Track active section
    SECTIONS.forEach((section, index) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        // Only kill ScrollTriggers we created (nav-related)
        if (st.trigger === document.body || SECTIONS.some((s) => st.trigger === document.getElementById(s.id))) {
          st.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.to(nav, {
      opacity: isVisible ? 1 : 0,
      x: isVisible ? 0 : 20,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isVisible]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={navRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-5 opacity-0 hidden md:flex"
      style={{ willChange: "opacity, transform" }}
    >
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className="group flex items-center gap-3 cursor-pointer"
          title={section.label}
        >
          {/* Label — shows on hover */}
          <span
            className="text-[10px] font-mono tracking-wider uppercase opacity-0 group-hover:opacity-40 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
          >
            {section.label}
          </span>

          {/* Dot */}
          <div className="relative flex items-center justify-center">
            {/* Active ring pulse */}
            {activeIndex === i && (
              <div
                className="absolute w-5 h-5 rounded-full"
                style={{
                  border: "1px solid rgba(232,139,139,0.2)",
                  animation: "status-pulse 2.5s ease-in-out infinite",
                }}
              />
            )}
            <div
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                background:
                  activeIndex === i
                    ? "#E88B8B"
                    : "rgba(240,236,228,0.15)",
                boxShadow:
                  activeIndex === i
                    ? "0 0 8px rgba(232,139,139,0.4)"
                    : "none",
                transform: activeIndex === i ? "scale(1.3)" : "scale(1)",
              }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
