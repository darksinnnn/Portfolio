"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use quickTo for ultra-smooth tracking
    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(dot, { opacity: 1, duration: 0.3 });
      gsap.to(ring, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(dot, { opacity: 0, duration: 0.3 });
      gsap.to(ring, { opacity: 0, duration: 0.3 });
    };

    // Scale up ring on hoverable elements
    const handleHoverIn = () => {
      gsap.to(ring, { scale: 1.8, borderColor: "rgba(232,139,139,0.3)", duration: 0.35, ease: "power2.out" });
      gsap.to(dot, { scale: 0.5, duration: 0.35, ease: "power2.out" });
    };

    const handleHoverOut = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(240,236,228,0.15)", duration: 0.35, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.35, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Observe hoverable elements
    const hoverablesSelector = "a, button, [data-hoverable], [data-skill], [data-contact-card], [data-exp-card], [data-project-card]";
    let currentHoverables: NodeListOf<Element> | [] = [];

    const attachListeners = () => {
      currentHoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      currentHoverables = document.querySelectorAll(hoverablesSelector);
      currentHoverables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverIn);
        el.addEventListener("mouseleave", handleHoverOut);
      });
    };

    attachListeners();

    // Re-observe on DOM changes
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      currentHoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none opacity-0 hidden md:block"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#E88B8B",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99] pointer-events-none opacity-0 hidden md:block"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid rgba(240,236,228,0.15)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}
