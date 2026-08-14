"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    xTo.current = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || !xTo.current || !yTo.current) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo.current((e.clientX - cx) * strength);
      yTo.current((e.clientY - cy) * strength);
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    xTo.current = null;
    yTo.current = null;
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
