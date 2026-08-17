"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIVE_WORKS } from "@/lib/data";
import { ArrowUpRightIcon, GithubIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function BrowserMockup({ title, url, accent, accentBg, image }: {
  title: string; url: string; accent: string; accentBg: string; image?: string;
}) {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden shadow-2xl"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(240,236,228,0.06)" }}
    >
      {/* Browser chrome (macOS traffic lights + URL bar) */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "rgba(20,18,16,0.95)", borderBottom: "1px solid rgba(240,236,228,0.05)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div
          className="flex-1 mx-3 px-3 py-0.5 rounded text-[10px] font-mono truncate"
          style={{ background: "rgba(255,255,255,0.04)", color: "rgba(240,236,228,0.3)", border: "1px solid rgba(240,236,228,0.05)" }}
        >
          {url.replace("https://", "")}
        </div>
      </div>
      {/* Content — Real Screenshot filling the exact frame below the URL bar */}
      <div
        className="relative w-full aspect-[16/9] overflow-hidden bg-[#0d0d0b]"
        style={{ background: accentBg }}
      >
        {image ? (
          <div className="relative w-full h-full group/img overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* Subtle bottom gradient to blend seamlessly */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 30px rgba(10,10,8,0.35)",
              }}
            />
          </div>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 40%, ${accent}20, transparent 70%)` }} />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, rgba(240,236,228,1) 0px, rgba(240,236,228,1) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(240,236,228,1) 0px, rgba(240,236,228,1) 1px, transparent 1px, transparent 40px)",
              }}
            />
            <p
              className="relative text-xl md:text-2xl font-bold tracking-[0.12em] uppercase select-none"
              style={{ color: accent, opacity: 0.12, fontFamily: "var(--font-syncopate), sans-serif" }}
            >
              {title}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function LiveBadge() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80", animation: "status-pulse 2s ease-in-out infinite" }}
      />
      <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "#4ade80" }}>Live</span>
    </div>
  );
}

// ── Featured (wide) card ──────────────────────────────────────────────────────
function FeaturedCard({ work }: { work: (typeof LIVE_WORKS)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left}px`;
    glow.style.top = `${e.clientY - rect.top}px`;
  }, []);

  return (
    <div
      ref={cardRef}
      data-live-card
      className="group relative rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(240,236,228,0.06)", background: "rgba(255,255,255,0.015)", willChange: "transform" }}
      onMouseMove={handleMouseMove}
    >
      {/* Accent top line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${work.accent}50, transparent)` }} />

      {/* Spotlight glow */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${work.accent}0e, transparent 65%)`, transform: "translate(-50%, -50%)" }}
      />

      <div className="relative grid md:grid-cols-2 gap-0">
        {/* Left — info */}
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            <LiveBadge />
            <h3
              className="text-3xl md:text-4xl font-bold mt-4 mb-1 leading-tight"
              style={{ color: "#f0ece4", letterSpacing: "-0.02em" }}
            >
              {work.title}
            </h3>
            <p className="text-sm mb-6" style={{ color: "rgba(240,236,228,0.35)" }}>{work.subtitle}</p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(240,236,228,0.45)" }}>{work.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {work.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider"
                  style={{ background: "rgba(240,236,228,0.04)", border: "1px solid rgba(240,236,228,0.07)", color: "rgba(240,236,228,0.35)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            {work.githubUrl && (
              <a
                href={work.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300"
                style={{ border: "1px solid rgba(240,236,228,0.1)", color: "rgba(240,236,228,0.45)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f0ece4"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,236,228,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,236,228,0.45)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,236,228,0.1)"; }}
              >
                <GithubIcon size={13} />
                Source
              </a>
            )}
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300"
              style={{ background: `${work.accent}20`, border: `1px solid ${work.accent}50`, color: work.accent }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${work.accent}35`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${work.accent}20`; }}
            >
              Visit Live Site
              <ArrowUpRightIcon size={12} />
            </a>
          </div>
        </div>

        {/* Right — browser mockup */}
        <div className="relative p-6 md:p-8 flex items-center">
          <div className="w-full">
            <BrowserMockup title={work.title} url={work.liveUrl} accent={work.accent} accentBg={work.accentBg} image={work.image} />
            <div className="absolute left-8 right-8 bottom-4 h-10 blur-2xl opacity-15 rounded-full" style={{ background: work.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Compact card (used in 2-col row) ─────────────────────────────────────────
function CompactCard({ work }: { work: (typeof LIVE_WORKS)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left}px`;
    glow.style.top = `${e.clientY - rect.top}px`;
  }, []);

  return (
    <div
      ref={cardRef}
      data-live-card
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{ border: "1px solid rgba(240,236,228,0.06)", background: "rgba(255,255,255,0.015)", willChange: "transform" }}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${work.accent}40, transparent)` }} />

      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${work.accent}0d, transparent 65%)`, transform: "translate(-50%, -50%)" }}
      />

      {/* Mockup on top */}
      <div className="relative px-5 pt-5 pb-0">
        <BrowserMockup title={work.title} url={work.liveUrl} accent={work.accent} accentBg={work.accentBg} image={work.image} />
      </div>

      {/* Info below */}
      <div className="relative p-6 flex flex-col flex-1">
        <LiveBadge />
        <h3 className="text-xl font-bold mt-3 mb-1" style={{ color: "#f0ece4", letterSpacing: "-0.01em" }}>
          {work.title}
        </h3>
        <p className="text-xs mb-3" style={{ color: "rgba(240,236,228,0.3)" }}>{work.subtitle}</p>
        <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: "rgba(240,236,228,0.4)" }}>
          {work.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {work.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono"
              style={{ background: "rgba(240,236,228,0.03)", border: "1px solid rgba(240,236,228,0.07)", color: "rgba(240,236,228,0.3)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          {work.githubUrl && (
            <a
              href={work.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono transition-all duration-300"
              style={{ border: "1px solid rgba(240,236,228,0.08)", color: "rgba(240,236,228,0.35)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f0ece4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,236,228,0.35)"; }}
            >
              <GithubIcon size={11} /> Code
            </a>
          )}
          <a
            href={work.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono transition-all duration-300"
            style={{ background: `${work.accent}18`, border: `1px solid ${work.accent}40`, color: work.accent }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${work.accent}2e`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${work.accent}18`; }}
          >
            Visit <ArrowUpRightIcon size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function LiveWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { rotateX: 4, z: -60, scale: 0.96, opacity: 0.5, transformPerspective: 1200 },
        {
          rotateX: 0, z: 0, scale: 1, opacity: 1, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 95%", end: "top 25%", scrub: 0.8 },
        }
      );

      if (labelRef.current) {
        gsap.from(labelRef.current, {
          y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        gsap.from(chars, {
          y: 80, rotateX: -90, opacity: 0, duration: 1, stagger: 0.03, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      gsap.from("[data-live-card]", {
        y: 60, opacity: 0, scale: 0.96, duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none none" },
      });

      gsap.from("[data-live-line]", {
        scaleX: 0, duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%", toggleActions: "play none none none" },
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

  // Layout logic:
  // 1 project   → single full-width featured card
  // 2 projects  → two compact side-by-side
  // 3+ projects → first as featured (full-width), rest as compact 2-col
  const featured = LIVE_WORKS[0];
  const rest = LIVE_WORKS.slice(1);
  const useFeatureLayout = LIVE_WORKS.length >= 3;

  return (
    <section
      ref={sectionRef}
      id="live-works"
      className="relative py-40 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a08 0%, #16120e 50%, #0a0a08 100%)",
        transformOrigin: "center top",
        willChange: "transform, opacity",
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent)" }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Label */}
        <p ref={labelRef} className="text-[11px] font-mono tracking-[0.3em] uppercase mb-4" style={{ color: "#4ade80" }}>
          — Currently Deployed
        </p>

        {/* Title */}
        <div className="mb-4 overflow-hidden">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-[-0.02em] uppercase"
            style={{ fontFamily: "var(--font-syncopate), Syncopate, sans-serif", color: "#f0ece4" }}
          >
            {splitChars("Live Works")}
          </h2>
        </div>

        {/* Divider */}
        <div
          data-live-line
          className="mb-16 origin-left"
          style={{ height: "1px", background: "linear-gradient(90deg, rgba(240,236,228,0.15), transparent)" }}
        />

        {/* Cards — featured + compact layout */}
        {useFeatureLayout ? (
          <div className="space-y-5">
            {/* Hero card — full width */}
            <FeaturedCard work={featured} />
            {/* Compact grid — 2 col */}
            <div className="grid md:grid-cols-2 gap-5">
              {rest.map((work) => (
                <CompactCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        ) : LIVE_WORKS.length === 2 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {LIVE_WORKS.map((work) => (
              <CompactCard key={work.id} work={work} />
            ))}
          </div>
        ) : (
          <FeaturedCard work={featured} />
        )}
      </div>
    </section>
  );
}
