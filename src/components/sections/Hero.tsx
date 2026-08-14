"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/lib/data";
import { GithubIcon, LinkedinIcon, MailIcon, FileTextIcon } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { icon: LinkedinIcon, href: PROFILE.linkedin, label: "LinkedIn" },
  { icon: GithubIcon, href: PROFILE.github, label: "GitHub" },
  { icon: MailIcon, href: `mailto:${PROFILE.email}`, label: "Email" },
  { icon: FileTextIcon, href: PROFILE.resumeUrl, label: "Resume" },
];

export default function Hero({ preloaderDone }: { preloaderDone: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!preloaderDone) return; // Wait for preloader to finish

    const section = sectionRef.current;
    const content = contentRef.current;
    const floating = floatingRef.current;
    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Master timeline — cinematic entrance after preloader
      const master = gsap.timeline({ delay: 0.15 });

      // Phase 2: Name reveals with clip-path wipe + subtle scale
      if (firstName) {
        const firstChars = firstName.querySelectorAll(".char");
        master.fromTo(
          firstName,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        );
        master.fromTo(
          firstChars,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: "power2.out",
          },
          "-=0.8"
        );
      }

      // Phase 3: Last name — slight delay, same wipe
      if (lastName) {
        const lastChars = lastName.querySelectorAll(".char");
        master.fromTo(
          lastName,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        );
        master.fromTo(
          lastChars,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.03,
            ease: "power2.out",
          },
          "-=0.7"
        );
      }

      // Phase 4: Supporting elements cascade in smoothly
      const supportElements = gsap.utils.toArray<HTMLElement>("[data-hero-anim]");
      master.fromTo(
        supportElements,
        { y: 25, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Floating shape drifts in
      if (floating) {
        master.fromTo(
          floating,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 0.09,
            duration: 2,
            ease: "power2.out",
          },
          "-=1.2"
        );
      }

      // Scroll parallax — Z-axis zoom out
      gsap.to(content, {
        scale: 1.6,
        opacity: 0,
        filter: "blur(12px)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "80% top",
          scrub: 0.8,
        },
      });

      // Parallax floating shape — contained within hero
      if (floating) {
        gsap.to(floating, {
          y: -200,
          x: 50,
          rotation: 15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
        gsap.to(floating, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "60% top",
            end: "90% top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [preloaderDone]);

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
    <section ref={sectionRef} id="hero" className="relative h-[180vh]">

      {/* Warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[30%] left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #E88B8B, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[25%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #d4a574, transparent 70%)",
          }}
        />
      </div>

      {/* Parallax floating shape */}
      <div
        ref={floatingRef}
        className="absolute top-[40%] right-[8%] w-[180px] h-[260px] pointer-events-none opacity-0"
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 200 300" fill="none">
          <path
            d="M100 10 C 150 50, 180 120, 160 180 C 140 240, 80 280, 60 250 C 40 220, 20 160, 40 100 C 60 40, 80 10, 100 10Z"
            fill="url(#float-grad)"
          />
          <defs>
            <linearGradient id="float-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E88B8B" />
              <stop offset="100%" stopColor="#d4a574" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          ref={contentRef}
          className="text-center px-8 max-w-6xl"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <p
            data-hero-anim
            className="text-[10px] md:text-xs font-mono tracking-[0.5em] uppercase opacity-35 mb-8"
          >
            {PROFILE.title}
          </p>

          <h1
            ref={firstNameRef}
            className="text-6xl sm:text-8xl md:text-[9rem] font-bold tracking-wider uppercase leading-[0.85]"
            style={{
              fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
              color: "#f0ece4",
              clipPath: "inset(0 0 100% 0)",
            }}
          >
            {splitChars(PROFILE.firstName)}
          </h1>
          <h1
            ref={lastNameRef}
            className="text-6xl sm:text-8xl md:text-[9rem] font-bold tracking-wider uppercase leading-[0.85]"
            style={{
              fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
              WebkitTextStroke: "1.5px rgba(232,139,139,0.3)",
              color: "transparent",
              clipPath: "inset(0 0 100% 0)",
            }}
          >
            {splitChars(PROFILE.lastName)}
          </h1>

          <div
            data-hero-anim
            className="mt-8 flex items-center justify-center gap-4 text-[10px] font-mono opacity-25"
          >
            <span
              className="w-16 h-px"
              style={{ background: "rgba(232,139,139,0.35)" }}
            />
            <span className="tracking-[0.4em] uppercase">
              {PROFILE.location}
            </span>
            <span
              className="w-16 h-px"
              style={{ background: "rgba(232,139,139,0.35)" }}
            />
          </div>

          <p
            data-hero-anim
            className="mt-5 text-sm opacity-40 max-w-md mx-auto leading-relaxed"
          >
            Building distributed systems, scalable APIs, and cloud-native
            applications.
          </p>

          <div
            data-hero-anim
            className="mt-8 flex items-center justify-center gap-2.5 flex-wrap"
          >
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <MagneticButton key={link.label} strength={0.3}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      border: "1px solid rgba(232,139,139,0.12)",
                      background: "rgba(232,139,139,0.04)",
                    }}
                    title={link.label}
                  >
                    <Icon
                      size={13}
                      className="opacity-45 group-hover:opacity-85 transition-opacity"
                      style={{ color: "#E88B8B" }}
                    />
                    <span className="text-[11px] font-mono opacity-45 group-hover:opacity-85 transition-opacity">
                      {link.label}
                    </span>
                  </a>
                </MagneticButton>
              );
            })}
          </div>

          <div
            data-hero-anim
            className="mt-14 flex flex-col items-center gap-2 opacity-20"
          >
            <span className="text-[9px] font-mono tracking-[0.5em]">
              SCROLL TO EXPLORE
            </span>
            <div
              className="w-px h-14"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(232,139,139,0.5), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
