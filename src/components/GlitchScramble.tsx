"use client";

import { useEffect } from "react";

/*
 * Character-scramble glitch. Text decodes left to right out of random glyphs,
 * a few of them flashed in yellow or dimmed. Runs once for every `.glitch-in`
 * element as its CSS intro animation starts, and again on text-link hover.
 *
 * Only Text node values are touched (and restored exactly), so React's DOM
 * stays intact. Per-character colour uses the CSS Custom Highlight API, which
 * colours ranges without inserting elements; browsers without it just get
 * the scramble in the text's own colour.
 */

export const GLYPHS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>?@$=_~";
const FRAME_MS = 45; // how often unresolved glyphs re-roll
// Text links, plus the project list buttons (which read as links).
const LINK_SELECTOR = "a:not(:has(img, picture, svg)), [data-project-button]";

type HighlightName =
  | "glitch-accent"
  | "glitch-dim"
  | "glitch-bright"
  | "glitch-gap";

const HIGHLIGHT_NAMES: HighlightName[] = [
  "glitch-accent",
  "glitch-dim",
  "glitch-bright",
  "glitch-gap",
];

// Only plain printable ASCII is scrambled: every glyph swapped in has the same
// monospace width, so nothing reflows. Spaces and symbols like ╯°□ stay put.
const SCRAMBLABLE = /[!-~]/;

const active = new Set<Text>();

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

function getHighlights() {
  if (typeof CSS === "undefined" || !("highlights" in CSS)) return null;
  const map = {} as Record<HighlightName, Highlight>;
  for (const name of HIGHLIGHT_NAMES) {
    let h = CSS.highlights.get(name);
    if (!h) {
      h = new Highlight();
      CSS.highlights.set(name, h);
    }
    map[name] = h;
  }
  return map;
}

function textNodesOf(el: Element) {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.nodeValue?.trim()) nodes.push(node);
  }
  return nodes;
}

type ScrambleOptions = {
  duration: number;
  /** Highlight used for the coloured glyphs. */
  accent: HighlightName;
};

function scramble(el: Element, { duration, accent }: ScrambleOptions) {
  const nodes = textNodesOf(el);
  if (!nodes.length || nodes.some((n) => active.has(n))) return;

  const originals = nodes.map((n) => n.nodeValue ?? "");
  const written = [...originals];
  const total = originals.reduce((sum, s) => sum + s.length, 0);
  // Each character resolves at its position along the line, plus jitter,
  // so the front edge is ragged rather than a clean wipe.
  const resolveAt = originals.map((s, ni) => {
    const offset = originals.slice(0, ni).reduce((a, x) => a + x.length, 0);
    const times: number[] = [];
    for (let ci = 0; ci < s.length; ci++) {
      const t = (offset + ci) / Math.max(total, 1);
      times.push(Math.min(1, t * 0.75 + Math.random() * 0.25));
    }
    return times;
  });

  const highlights = getHighlights();
  let ranges: Range[] = [];
  const clearRanges = () => {
    if (highlights) {
      for (const r of ranges) {
        for (const name of HIGHLIGHT_NAMES) highlights[name].delete(r);
      }
    }
    ranges = [];
  };

  nodes.forEach((n) => active.add(n));
  const start = performance.now();
  let lastFrame = 0;
  let raf = 0;

  const finish = () => {
    cancelAnimationFrame(raf);
    clearRanges();
    nodes.forEach((n, i) => {
      // If React rewrote the node mid-scramble, leave its value alone.
      if (n.nodeValue === written[i]) n.nodeValue = originals[i];
      active.delete(n);
    });
  };

  const tick = (now: number) => {
    const p = (now - start) / duration;
    if (p >= 1 || !el.isConnected) return finish();
    if (now - lastFrame < FRAME_MS) {
      raf = requestAnimationFrame(tick);
      return;
    }
    lastFrame = now;
    clearRanges();

    nodes.forEach((node, ni) => {
      if (node.nodeValue !== written[ni]) return; // React changed it; skip
      const src = originals[ni];
      const coloured: [number, HighlightName][] = [];
      let out = "";
      for (let ci = 0; ci < src.length; ci++) {
        const ch = src[ci];
        if (!SCRAMBLABLE.test(ch) || p >= resolveAt[ni][ci]) {
          out += ch;
          continue;
        }
        out += randomGlyph();
        // Far-from-resolved characters thin out into gaps, like the reference.
        // Gaps are invisible glyphs, not spaces: runs of spaces collapse in
        // HTML, which would shrink the text and shift everything after it.
        const distance = resolveAt[ni][ci] - p;
        if (Math.random() < distance * 0.6) {
          coloured.push([ci, "glitch-gap"]);
          continue;
        }
        const roll = Math.random();
        if (roll < 0.3) coloured.push([ci, accent]);
        else if (roll < 0.55) coloured.push([ci, "glitch-dim"]);
      }
      node.nodeValue = out;
      written[ni] = out;

      if (highlights) {
        for (const [ci, name] of coloured) {
          const r = new Range();
          r.setStart(node, ci);
          r.setEnd(node, ci + 1);
          highlights[name].add(r);
          ranges.push(r);
        }
      }
    });

    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
}

function parseTime(value: string) {
  const first = value.split(",")[0].trim();
  if (first.endsWith("ms")) return parseFloat(first);
  if (first.endsWith("s")) return parseFloat(first) * 1000;
  return 0;
}

export default function GlitchScramble() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers = new Set<number>();
    const seen = new WeakSet<Element>();

    // Start each line's scramble when its CSS glitch-in animation begins.
    const intro = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      const delay = parseTime(getComputedStyle(el).animationDelay);
      const length = el.textContent?.length ?? 0;
      const duration = Math.min(900, 300 + length * 4);
      const id = window.setTimeout(() => {
        timers.delete(id);
        scramble(el, { duration, accent: "glitch-accent" });
      }, delay);
      timers.add(id);
    };

    const scan = (root: ParentNode) =>
      root.querySelectorAll(".glitch-in").forEach(intro);
    scan(document);

    // Project previews mount later; catch their .glitch-in lines too.
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(".glitch-in")) intro(node);
          scan(node);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // One scramble per hover: it resolves to the link's yellow hover colour and
    // stops. Hovered links are already yellow, so glyphs flash white instead.
    const onEnter = (event: Event) => {
      const link = (event.target as Element | null)?.closest?.(LINK_SELECTOR);
      if (!link) return;
      const related = (event as PointerEvent).relatedTarget as Node | null;
      if (related && link.contains(related)) return;
      scramble(link, { duration: 280, accent: "glitch-bright" });
    };
    document.addEventListener("pointerover", onEnter);
    document.addEventListener("focusin", onEnter);

    return () => {
      timers.forEach((id) => clearTimeout(id));
      observer.disconnect();
      document.removeEventListener("pointerover", onEnter);
      document.removeEventListener("focusin", onEnter);
    };
  }, []);

  // Lives here, not globals.css: Turbopack's CSS parser rejects ::highlight().
  return (
    <style>{`
      ::highlight(glitch-accent) { color: #eeff0d; }
      ::highlight(glitch-dim) { color: #52525b; }
      ::highlight(glitch-bright) { color: #fff; }
      ::highlight(glitch-gap) { color: transparent; }
    `}</style>
  );
}
