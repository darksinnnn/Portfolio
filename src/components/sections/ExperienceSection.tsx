"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function SpotlightCard({
  children,
  className = "",
  style = {},
  dataAttr,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dataAttr?: string;
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

  const dataProps = dataAttr ? { [dataAttr]: true } : {};

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      {...dataProps}
    >
      <div
        ref={glowRef}
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,116,0.08), transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {children}
    </div>
  );
}

export default function ExperienceSection() {
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

      // Split-text title
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

      // Cards
      gsap.from("[data-exp-card]", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Bullets
      gsap.from("[data-exp-bullet]", {
        x: -40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 45%",
          toggleActions: "play none none none",
        },
      });

      // Divider line
      gsap.from("[data-exp-line]", {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none",
        },
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
      id="experience"
      className="relative py-40 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a08 0%, #18140f 50%, #0a0a08 100%)",
        transformOrigin: "center top",
        willChange: "transform, opacity",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute top-1/3 right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #d4a574, transparent 70%)",
          animation: "glow-pulse 7s ease-in-out infinite",
        }}
      />

      <div className="relative z-10">
        <div className="text-center mb-24">
          <p className="text-[10px] font-mono tracking-[0.5em] uppercase opacity-25 mb-4">
            // experience
          </p>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold tracking-wide"
            style={{
              fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
              perspective: "600px",
            }}
          >
            {splitChars("Experience")}
          </h2>
          <div
            data-exp-line
            className="mt-5 w-20 h-px mx-auto origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, #d4a574, transparent)",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          {PROFILE.experience.map((exp, i) => (
            <SpotlightCard
              key={i}
              dataAttr="data-exp-card"
              className="rounded-2xl"
              style={{
                border: "1px solid rgba(212,165,116,0.06)",
                background:
                  "linear-gradient(145deg, rgba(212,165,116,0.03), rgba(10,10,8,0.97))",
                boxShadow: "0 0 60px rgba(212,165,116,0.03)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(212,165,116,0.25), transparent)",
                }}
              />
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
                  <div>
                    <h3
                      className="text-2xl md:text-3xl font-bold"
                      style={{ color: "#f0ece4" }}
                    >
                      {exp.company}
                    </h3>
                    <p className="text-sm opacity-40 mt-1">{exp.role}</p>
                  </div>
                  <span
                    className="text-[10px] font-mono opacity-20 tracking-wider px-4 py-2 rounded-full"
                    style={{
                      border: "1px solid rgba(212,165,116,0.08)",
                      background: "rgba(212,165,116,0.04)",
                    }}
                  >
                    {exp.dates}
                  </span>
                </div>
                <div
                  className="w-16 h-px rounded-full mb-8"
                  style={{
                    background: "linear-gradient(90deg, #d4a574, transparent)",
                    opacity: 0.3,
                  }}
                />
                <ul className="space-y-4">
                  {exp.accomplishments.map((item, j) => (
                    <li
                      key={j}
                      data-exp-bullet
                      className="flex items-start gap-4 text-sm opacity-50"
                    >
                      <span
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "#d4a574" }}
                      >
                        ▹
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Achievements & Leadership */}
        <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-6">
          <SpotlightCard
            dataAttr="data-exp-card"
            className="rounded-2xl p-8"
            style={{
              border: "1px solid rgba(232,139,139,0.06)",
              background:
                "linear-gradient(145deg, rgba(232,139,139,0.03), rgba(10,10,8,0.95))",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: "#E88B8B",
                  boxShadow: "0 0 12px rgba(232,139,139,0.4)",
                  animation: "breathe 3s ease-in-out infinite",
                }}
              />
              <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">
                Achievements
              </h3>
            </div>
            <ul className="space-y-3">
              {PROFILE.achievements.map((a, i) => (
                <li
                  key={i}
                  data-exp-bullet
                  className="text-sm opacity-40 flex items-start gap-3"
                >
                  <span style={{ color: "#E88B8B" }} className="mt-0.5">
                    ◆
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </SpotlightCard>
          <SpotlightCard
            dataAttr="data-exp-card"
            className="rounded-2xl p-8"
            style={{
              border: "1px solid rgba(212,165,116,0.06)",
              background:
                "linear-gradient(145deg, rgba(212,165,116,0.03), rgba(10,10,8,0.95))",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: "#d4a574",
                  boxShadow: "0 0 12px rgba(212,165,116,0.4)",
                  animation: "breathe 3s ease-in-out infinite 1.5s",
                }}
              />
              <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">
                Leadership
              </h3>
            </div>
            <ul className="space-y-3">
              {PROFILE.leadership.map((l, i) => (
                <li
                  key={i}
                  data-exp-bullet
                  className="text-sm opacity-40 flex items-start gap-3"
                >
                  <span style={{ color: "#d4a574" }} className="mt-0.5">
                    ◆
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
