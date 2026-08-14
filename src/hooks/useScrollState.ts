"use client";

import { useState, useEffect, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Types ───────────────────────────────────────────────────────────────────

export interface ScrollState {
  progress: number;
  activeZone: string;
  activeProject: string | null;
  scrollX: number;
  scrollY: number;
}

// ── Zone / project boundaries ───────────────────────────────────────────────

const ZONE_BOUNDARIES: [number, number, string][] = [
  [0, 0.2, "origin"],
  [0.2, 0.4, "vault"],
  [0.4, 0.6, "ledger"],
  [0.6, 0.8, "edge"],
  [0.8, 1.0, "command"],
];

const PROJECT_MAP: Record<string, string> = {
  vault: "hashcracker",
  ledger: "paypipe",
  edge: "inventag",
};

// ── Pure derivation (testable without React / GSAP) ─────────────────────────

export function deriveScrollState(
  progress: number,
  totalTrackWidth: number,
): ScrollState {
  const p = Math.max(0, Math.min(1, progress));

  let activeZone = "origin";
  for (const [start, end, zone] of ZONE_BOUNDARIES) {
    if (p >= start && (p < end || (end === 1.0 && p <= 1.0))) {
      activeZone = zone;
      break;
    }
  }

  const activeProject = PROJECT_MAP[activeZone] ?? null;

  return {
    progress: p,
    activeZone,
    activeProject,
    scrollX: Math.round(p * totalTrackWidth),
    scrollY: typeof window !== "undefined" ? Math.round(window.scrollY) : 0,
  };
}

// ── React hook ──────────────────────────────────────────────────────────────

export function useScrollState(
  trackRef: RefObject<HTMLDivElement | null>,
): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    activeZone: "origin",
    activeProject: null,
    scrollX: 0,
    scrollY: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const triggers = ScrollTrigger.getAll();
      const trigger = triggers.find((t) => t.trigger === track);
      const progress = trigger?.progress ?? 0;
      const totalWidth = track.scrollWidth;
      setState(deriveScrollState(progress, totalWidth));
    };

    ScrollTrigger.addEventListener("refresh", update);
    const tickerId = () => update();
    // Use a GSAP ticker so we update every frame while scrolling
    const gsapModule = require("gsap").default ?? require("gsap");
    gsapModule.ticker.add(tickerId);

    return () => {
      ScrollTrigger.removeEventListener("refresh", update);
      gsapModule.ticker.remove(tickerId);
    };
  }, [trackRef]);

  return state;
}
