"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  }, []);

  return (
    <div
      ref={cardRef}
      data-project-card
      className="relative flex-shrink-0 w-[75vw] md:w-[65vw] h-[75vh] rounded-2xl border border-white/[0.06] overflow-hidden group"
      style={{
        background: `linear-gradient(160deg, ${project.accent}08, rgba(10,10,8,0.97) 40%)`,
        boxShadow: `0 0 100px ${project.accent}06`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-follow spotlight */}
      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${project.accent}0a, transparent 70%)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}30, transparent)`,
        }}
      />
      {/* Left glow */}
      <div
        className="absolute top-0 left-0 bottom-0 w-px"
        style={{
          background: `linear-gradient(180deg, transparent, ${project.accent}20, transparent)`,
        }}
      />

      <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
        {/* Top section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border"
              style={{
                borderColor: `${project.accent}25`,
                color: project.accent,
                background: `${project.accent}08`,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-green-500/15 text-green-400/70 hover:text-green-400 transition-colors"
              >
                ● Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono opacity-25 hover:opacity-60 transition-opacity ml-auto"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Source
              </a>
            )}
          </div>

          <h3
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {project.title}
          </h3>
          <p className="text-sm md:text-base opacity-35 mb-8">
            {project.subtitle}
          </p>

          <div
            className="w-16 h-0.5 rounded-full mb-8"
            style={{ background: project.accent, opacity: 0.4 }}
          />

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-3 py-1.5 rounded-lg font-mono border"
                style={{
                  borderColor: `${project.accent}15`,
                  background: `${project.accent}06`,
                  color: `${project.accent}cc`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bullets at bottom */}
        <ul className="space-y-3">
          {project.bullets.map((bullet, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-sm text-white/50"
            >
              <span
                className="mt-1 flex-shrink-0"
                style={{ color: `${project.accent}80` }}
              >
                ▹
              </span>
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Large faded project number */}
      <div
        className="absolute -bottom-8 -right-4 text-[20rem] font-bold opacity-[0.02] leading-none pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-syncopate), sans-serif",
          color: project.accent,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    const title = titleRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Title split-text
      if (title) {
        const chars = title.querySelectorAll(".char");
        gsap.from(chars, {
          y: 50,
          rotateX: -60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Horizontal scroll with pin
      const horizontalTween = gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progress) {
              progress.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Card animations tied to the horizontal scroll
      gsap.utils
        .toArray<HTMLElement>("[data-project-card]")
        .forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.75, opacity: 0, rotateY: -8, z: -200 },
            {
              scale: 1,
              opacity: 1,
              rotateY: 0,
              z: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 95%",
                end: "left 50%",
                scrub: 1,
              },
            }
          );
        });
    }, section);

    return () => ctx.revert();
  }, []);

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
      id="projects"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a08 0%, #16120e 50%, #0a0a08 100%)",
      }}
    >
      {/* Section header */}
      <div className="absolute top-8 left-8 z-20">
        <p className="text-xs font-mono tracking-[0.4em] uppercase opacity-20 mb-2">
          // work
        </p>
        <h2
          ref={titleRef}
          className="text-2xl md:text-3xl font-bold tracking-wide opacity-30"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            perspective: "600px",
          }}
        >
          {splitChars("Projects")}
        </h2>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-8 right-8 z-20">
        <div className="h-px bg-white/5 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              width: "0%",
              willChange: "width",
              background: "linear-gradient(90deg, #E88B8B, #d4a574)",
            }}
          />
        </div>
      </div>

      {/* Warm ambient glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #E88B8B, transparent 70%)",
          animation: "glow-pulse 8s ease-in-out infinite",
        }}
      />

      {/* Horizontal track — reduced width for tighter end spacing */}
      <div
        ref={trackRef}
        className="flex items-center h-screen gap-8 pl-[10vw] pr-[5vw]"
        style={{
          width: `${PROJECTS.length * 75 + 15}vw`,
          perspective: "1200px",
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
