"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GREETINGS = [
  { text: "Hola", lang: "Spanish" },
  { text: "Bonjour", lang: "French" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "Hallo", lang: "German" },
  { text: "Ciao", lang: "Italian" },
  { text: "Hello", lang: "English" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "你好", lang: "Chinese" },
  { text: "안녕", lang: "Korean" },
  { text: "Olá", lang: "Portuguese" },
  { text: "مرحبا", lang: "Arabic" },
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const greetingsRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const greetings = greetingsRef.current;
    const nameEl = nameRef.current;
    const progressBar = progressRef.current;
    if (!container || !greetings || !nameEl || !progressBar) return;

    // Prevent body scroll during preloader
    document.body.style.overflow = "hidden";

    const greetingEls = greetings.querySelectorAll<HTMLElement>("[data-greeting]");
    const nameChars = nameEl.querySelectorAll<HTMLElement>(".char");

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    // Progress bar ticks across the full duration
    tl.to(progressBar, {
      scaleX: 1,
      duration: 2.2, // Reduced from 3.8
      ease: "power2.inOut",
    }, 0);

    // Phase 1: All greetings appear simultaneously with depth-of-field stagger
    // They start invisible, pop in at staggered times with varying opacities
    tl.fromTo(
      greetingEls,
      {
        y: (i) => 40 + i * 8,
        opacity: 0,
        scale: 0.9,
        filter: "blur(8px)",
      },
      {
        y: 0,
        opacity: (i) => {
          // Center items are brighter, edges are dimmer (depth-of-field)
          const center = (GREETINGS.length - 1) / 2;
          const dist = Math.abs(i - center) / center;
          return 0.15 + (1 - dist) * 0.5;
        },
        scale: 1,
        filter: (i) => {
          const center = (GREETINGS.length - 1) / 2;
          const dist = Math.abs(i - center) / center;
          return `blur(${dist * 3}px)`;
        },
        duration: 0.8, // Reduced from 1.2
        stagger: 0.03, // Reduced from 0.05
        ease: "power3.out",
      },
      0.1 // Reduced from 0.2
    );

    // Phase 2: After a beat, all greetings converge to center
    tl.to(
      greetingEls,
      {
        y: 0,
        opacity: 0,
        scale: 0.7,
        filter: "blur(12px)",
        duration: 0.5, // Reduced from 0.8
        stagger: {
          each: 0.02, // Reduced from 0.03
          from: "edges",
        },
        ease: "power3.in",
      },
      "+=0.2" // Reduced from +=0.4
    );

    // Phase 3: Name morphs in
    tl.fromTo(
      nameEl,
      { opacity: 0 },
      { opacity: 1, duration: 0.01 },
      "-=0.2"
    );

    tl.fromTo(
      nameChars,
      {
        y: 40,
        opacity: 0,
        scale: 1.3,
        filter: "blur(6px)",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.5, // Reduced from 0.8
        stagger: 0.03, // Reduced from 0.04
        ease: "power3.out",
      },
      "-=0.1" // Reduced from -=0.15
    );

    // Phase 4: Hold the name briefly, then curtain split
    tl.to({}, { duration: 0.25 }); // Reduced from 0.5

    // Fade out name
    tl.to(nameEl, {
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
      duration: 0.3, // Reduced from 0.4
      ease: "power2.in",
    });

    // Split curtain — top half goes up, bottom half goes down
    tl.to(
      "[data-curtain-top]",
      {
        yPercent: -100,
        duration: 0.8, // Reduced from 1
        ease: "power4.inOut",
      },
      "-=0.1"
    );
    tl.to(
      "[data-curtain-bottom]",
      {
        yPercent: 100,
        duration: 0.8, // Reduced from 1
        ease: "power4.inOut",
      },
      "<"
    );

    // Force re-render to ensure refs
    setTick(1);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ willChange: "transform, opacity, filter" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-auto">
      {/* Top curtain half */}
      <div
        data-curtain-top
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#0a0a08]"
        style={{ willChange: "transform" }}
      />
      {/* Bottom curtain half */}
      <div
        data-curtain-bottom
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0a0a08]"
        style={{ willChange: "transform" }}
      />

      {/* Content layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Stacked greetings */}
        <div
          ref={greetingsRef}
          className="flex flex-col items-center gap-1"
        >
          {GREETINGS.map((g, i) => (
            <div
              key={i}
              data-greeting
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider"
              style={{
                fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
                color: "#f0ece4",
                willChange: "transform, opacity, filter",
              }}
            >
              {g.text}
            </div>
          ))}
        </div>

        {/* Final greeting — hidden initially */}
        <div
          ref={nameRef}
          className="absolute text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.15em] uppercase opacity-0 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
            color: "#f0ece4",
          }}
        >
          {splitChars("LET'S EXPLORE")}
        </div>
      </div>

      {/* Thin progress bar at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-px overflow-hidden">
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        <div
          ref={progressRef}
          className="h-full rounded-full origin-left"
          style={{
            transform: "scaleX(0)",
            background: "linear-gradient(90deg, #E88B8B, #d4a574)",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}
