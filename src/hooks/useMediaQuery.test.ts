import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let listeners: Map<string, (e: MediaQueryListEvent) => void>;
  let matchesMap: Map<string, boolean>;

  beforeEach(() => {
    listeners = new Map();
    matchesMap = new Map();

    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => {
        const mql = {
          matches: matchesMap.get(query) ?? false,
          media: query,
          addEventListener: vi.fn((_: string, handler: (e: MediaQueryListEvent) => void) => {
            listeners.set(query, handler);
          }),
          removeEventListener: vi.fn(),
        };
        return mql;
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns false by default (SSR-safe)", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    // After effect runs, it reads matchMedia which defaults to false
    expect(result.current).toBe(false);
  });

  it("returns true when media query matches", () => {
    matchesMap.set("(max-width: 768px)", true);
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("updates when media query changes", () => {
    matchesMap.set("(max-width: 768px)", false);
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);

    // Simulate a change event
    act(() => {
      const handler = listeners.get("(max-width: 768px)");
      handler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });
});
