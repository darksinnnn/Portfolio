"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_COLORS = ["#E88B8B", "#d4a574", "#c4917a", "#f0ece4"];

function SkillCard({
  skill,
  color,
}: {
  skill: string;
  color: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Subtle 3D tilt
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Move inner glow to cursor position
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      data-skill
      className="group relative px-5 py-4 rounded-xl cursor-default text-center"
      style={{
        border: `1px solid ${color}0a`,
        background: `linear-gradient(145deg, ${color}05, rgba(10,10,8,0.96))`,
        transformStyle: "preserve-3d",
        perspective: "800px",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Inner glow that follows cursor */}
      <div
        ref={glowRef}
        className="absolute w-[160px] h-[160px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${color}12, transparent 70%)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Top border glow on hover */}
      <div
        className="absolute top-0 left-[15%] right-[15%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-[30%] right-[30%] h-px opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:left-[15%] group-hover:right-[15%]"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
        }}
      />

      <span className="relative z-10 text-sm font-mono opacity-50 group-hover:opacity-90 transition-all duration-300">
        {skill}
      </span>
    </div>
  );
}

export default function TechArsenal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 3D perspective entrance — tilts toward viewer
      gsap.fromTo(
        section,
        { rotateX: 4, z: -60, scale: 0.96, opacity: 0.5, transformPerspective: 1200 },
        {
          rotateX: 0,
          z: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end: "top 25%",
            scrub: 0.8,
          },
        }
      );

      // Title split-text reveal
      if (title) {
        const chars = title.querySelectorAll(".char");
        gsap.from(chars, {
          y: 80,
          rotateX: -90,
          opacity: 0,
          duration: 1,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Category headers slide in
      gsap.from("[data-cat-header]", {
        x: -80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Skills stagger in with elastic pop
      gsap.from("[data-skill]", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: { each: 0.04, from: "random" },
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          toggleActions: "play none none none",
        },
      });

      // Animated divider lines — draw in
      gsap.from("[data-line]", {
        scaleX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const categories = Object.entries(PROFILE.skills);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ willChange: "transform, opacity" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="relative py-40 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a08 0%, #1a150f 50%, #0a0a08 100%)",
        transformOrigin: "center top",
        willChange: "transform, opacity",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,139,139,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #E88B8B, transparent 70%)",
          animation: "glow-pulse 6s ease-in-out infinite",
        }}
      />

      <div
        className="absolute bottom-[15%] left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #d4a574, transparent 70%)",
          animation: "glow-pulse 8s ease-in-out infinite 3s",
        }}
      />

      <div className="relative z-10">
        <div className="text-center mb-24">
          <p className="text-[10px] font-mono tracking-[0.5em] uppercase opacity-25 mb-4">
            // arsenal
          </p>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold tracking-wide"
            style={{
              fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
              perspective: "600px",
            }}
          >
            {splitChars("Tech Stack")}
          </h2>
          <div
            data-line
            className="mt-5 w-20 h-px mx-auto origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, #E88B8B, transparent)",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map(([category, skills], catIdx) => {
            const color = CATEGORY_COLORS[catIdx % 4];
            return (
              <div key={category}>
                <div data-cat-header className="flex items-center gap-4 mb-7">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      background: color,
                      boxShadow: `0 0 12px ${color}40`,
                      animation: "breathe 3s ease-in-out infinite",
                    }}
                  />
                  <h3 className="text-[11px] font-mono tracking-[0.3em] uppercase opacity-50">
                    {category}
                  </h3>
                  <div
                    data-line
                    className="flex-1 h-px origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${color}20, transparent)`,
                    }}
                  />
                  <span
                    className="text-[10px] font-mono opacity-15"
                    style={{ color }}
                  >
                    {String(skills.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {skills.map((skill) => (
                    <SkillCard key={skill} skill={skill} color={color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
