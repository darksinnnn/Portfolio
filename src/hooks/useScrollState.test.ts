import { describe, it, expect } from "vitest";
import { deriveScrollState } from "./useScrollState";

const TRACK_WIDTH = 5000;

describe("deriveScrollState", () => {
  it("returns origin zone at progress 0", () => {
    const state = deriveScrollState(0, TRACK_WIDTH);
    expect(state.activeZone).toBe("origin");
    expect(state.activeProject).toBeNull();
    expect(state.scrollX).toBe(0);
    expect(state.progress).toBe(0);
  });

  it("returns vault zone and hashcracker project at progress 0.3", () => {
    const state = deriveScrollState(0.3, TRACK_WIDTH);
    expect(state.activeZone).toBe("vault");
    expect(state.activeProject).toBe("hashcracker");
    expect(state.scrollX).toBe(1500);
  });

  it("returns ledger zone and paypipe project at progress 0.5", () => {
    const state = deriveScrollState(0.5, TRACK_WIDTH);
    expect(state.activeZone).toBe("ledger");
    expect(state.activeProject).toBe("paypipe");
    expect(state.scrollX).toBe(2500);
  });

  it("returns edge zone and inventag project at progress 0.7", () => {
    const state = deriveScrollState(0.7, TRACK_WIDTH);
    expect(state.activeZone).toBe("edge");
    expect(state.activeProject).toBe("inventag");
    expect(state.scrollX).toBe(3500);
  });

  it("returns command zone at progress 0.9", () => {
    const state = deriveScrollState(0.9, TRACK_WIDTH);
    expect(state.activeZone).toBe("command");
    expect(state.activeProject).toBeNull();
  });

  it("returns command zone at progress 1.0", () => {
    const state = deriveScrollState(1.0, TRACK_WIDTH);
    expect(state.activeZone).toBe("command");
    expect(state.activeProject).toBeNull();
    expect(state.scrollX).toBe(TRACK_WIDTH);
  });

  it("clamps progress below 0 to 0", () => {
    const state = deriveScrollState(-0.5, TRACK_WIDTH);
    expect(state.progress).toBe(0);
    expect(state.activeZone).toBe("origin");
    expect(state.scrollX).toBe(0);
  });

  it("clamps progress above 1 to 1", () => {
    const state = deriveScrollState(1.5, TRACK_WIDTH);
    expect(state.progress).toBe(1);
    expect(state.activeZone).toBe("command");
    expect(state.scrollX).toBe(TRACK_WIDTH);
  });

  it("handles zone boundary at exactly 0.2 (vault start)", () => {
    const state = deriveScrollState(0.2, TRACK_WIDTH);
    expect(state.activeZone).toBe("vault");
    expect(state.activeProject).toBe("hashcracker");
  });

  it("handles zone boundary at exactly 0.4 (ledger start)", () => {
    const state = deriveScrollState(0.4, TRACK_WIDTH);
    expect(state.activeZone).toBe("ledger");
    expect(state.activeProject).toBe("paypipe");
  });

  it("handles zone boundary at exactly 0.6 (edge start)", () => {
    const state = deriveScrollState(0.6, TRACK_WIDTH);
    expect(state.activeZone).toBe("edge");
    expect(state.activeProject).toBe("inventag");
  });

  it("handles zone boundary at exactly 0.8 (command start)", () => {
    const state = deriveScrollState(0.8, TRACK_WIDTH);
    expect(state.activeZone).toBe("command");
    expect(state.activeProject).toBeNull();
  });

  it("computes scrollX proportionally to progress and track width", () => {
    const state = deriveScrollState(0.25, 8000);
    expect(state.scrollX).toBe(2000);
  });
});
