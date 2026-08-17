"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 3D perspective entrance — keep as-is
      gsap.fromTo(
        section,
        { rotateX: 4, z: -60, scale: 0.96, opacity: 0.5, transformPerspective: 1200 },
        {
          rotateX: 0, z: 0, scale: 1, opacity: 1, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 95%", end: "top 25%", scrub: 0.8 },
        }
      );

      // Title chars
      if (titleRef.current) {
        gsap.from(titleRef.current.querySelectorAll(".char"), {
          y: 80, rotateX: -90, opacity: 0, duration: 1, stagger: 0.03, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      // Divider
      gsap.from("[data-exp-line]", {
        scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: "[data-exp-line]", start: "top 85%", toggleActions: "play none none none" },
      });

      // Main card
      gsap.from("[data-exp-card]", {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: "[data-exp-card]", start: "top 80%", toggleActions: "play none none none" },
      });

      // Bullets stagger
      gsap.from("[data-exp-bullet]", {
        x: -30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: "[data-exp-bullet]", start: "top 80%", toggleActions: "play none none none" },
      });

      // Bottom mini-cards
      gsap.from("[data-bottom-card]", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: "[data-bottom-card]", start: "top 88%", toggleActions: "play none none none" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ willChange: "transform, opacity" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  const exp = PROFILE.experience[0];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a08 0%, #18140f 50%, #0a0a08 100%)",
        transformOrigin: "center top",
        willChange: "transform, opacity",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, rgba(212,165,116,0.08), transparent 70%)", animation: "glow-pulse 7s ease-in-out infinite" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold tracking-[-0.02em] uppercase mb-5"
          style={{ fontFamily: "var(--font-syncopate), Syncopate, sans-serif", color: "#f0ece4", perspective: "600px" }}
        >
          {splitChars("Experience")}
        </h2>
        <div data-exp-line className="mb-12 origin-left" style={{ height: "1px", width: "80px", background: "linear-gradient(90deg, #d4a574, transparent)" }} />

        {/* ── Main card ── */}
        <div
          data-exp-card
          className="rounded-2xl overflow-hidden mb-5"
          style={{ border: "1px solid rgba(212,165,116,0.08)", background: "linear-gradient(145deg, rgba(212,165,116,0.03), rgba(10,10,8,0.97))" }}
        >
          {/* Top accent line */}
          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(212,165,116,0.3), transparent)" }} />

          <div className="p-8 md:p-10">
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-7">
              <div>
                <h3
                  className="text-3xl md:text-4xl font-bold leading-tight"
                  style={{ color: "#f0ece4", letterSpacing: "-0.02em" }}
                >
                  {exp.company}
                </h3>
                <p className="text-xs font-mono tracking-[0.2em] uppercase mt-1.5" style={{ color: "rgba(212,165,116,0.6)" }}>
                  {exp.role}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <span
                  className="text-[11px] font-mono tracking-wider px-4 py-1.5 rounded-full"
                  style={{ border: "1px solid rgba(212,165,116,0.12)", color: "rgba(240,236,228,0.3)", background: "rgba(212,165,116,0.04)" }}
                >
                  {exp.dates}
                </span>
                {/* Stat pills */}
                <div className="flex gap-2 flex-wrap justify-end">
                  {["10K+ Users", "Android + iOS", "Go Automation"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider px-3 py-1 rounded-full"
                      style={{ background: "rgba(212,165,116,0.06)", color: "rgba(212,165,116,0.5)", border: "1px solid rgba(212,165,116,0.08)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Thin divider */}
            <div className="mb-7 h-px" style={{ background: "linear-gradient(90deg, rgba(212,165,116,0.15), transparent)" }} />

            {/* Accomplishments — 2-col on md+ */}
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {exp.accomplishments.map((item, j) => (
                <li
                  key={j}
                  data-exp-bullet
                  className="group flex items-start gap-3"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 group-hover:scale-150" style={{ background: "#d4a574", opacity: 0.5 }} />
                  <span
                    className="text-sm leading-relaxed transition-colors duration-300 group-hover:text-[#f0ece4]"
                    style={{ color: "rgba(240,236,228,0.45)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Achievements + Leadership ── */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Achievements */}
          <div
            data-bottom-card
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{ border: "1px solid rgba(232,139,139,0.07)", background: "linear-gradient(145deg, rgba(232,139,139,0.03), rgba(10,10,8,0.97))" }}
          >
            <div className="h-px w-full absolute top-0 left-0" style={{ background: "linear-gradient(90deg, transparent, rgba(232,139,139,0.2), transparent)" }} />
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#E88B8B", boxShadow: "0 0 8px rgba(232,139,139,0.4)", animation: "breathe 3s ease-in-out infinite" }} />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "rgba(232,139,139,0.5)" }}>Achievements</span>
            </div>
            <ul className="space-y-3">
              {PROFILE.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(240,236,228,0.4)" }}>
                  <span className="mt-1 w-3 h-px shrink-0" style={{ background: "rgba(232,139,139,0.35)" }} />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Leadership */}
          <div
            data-bottom-card
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{ border: "1px solid rgba(212,165,116,0.07)", background: "linear-gradient(145deg, rgba(212,165,116,0.03), rgba(10,10,8,0.97))" }}
          >
            <div className="h-px w-full absolute top-0 left-0" style={{ background: "linear-gradient(90deg, transparent, rgba(212,165,116,0.2), transparent)" }} />
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#d4a574", boxShadow: "0 0 8px rgba(212,165,116,0.4)", animation: "breathe 3s ease-in-out infinite 1.5s" }} />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "rgba(212,165,116,0.5)" }}>Leadership</span>
            </div>
            <ul className="space-y-3">
              {PROFILE.leadership.map((l, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(240,236,228,0.4)" }}>
                  <span className="mt-1 w-3 h-px shrink-0" style={{ background: "rgba(212,165,116,0.35)" }} />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
