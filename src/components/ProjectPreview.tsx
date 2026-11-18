"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import TypeSpecimen from "@/components/TypeSpecimen";
import { GLYPHS } from "@/components/GlitchScramble";

type Project = {
  id: string;
  title: string;
  /** e.g. "Live". Shown with year and role on one meta line in the preview. */
  status: string;
  /** Launch year, shown as "Launched YYYY" in place of status; omit to show status. */
  year?: string;
  /** Who made it, e.g. "solo, design + build". */
  role: string;
  listDescription: string;
  previewDescription: string;
  url: string;
  screenshot?: string;
  /** Render the live typeface specimen instead of a screenshot. */
  typeSpecimen?: boolean;
  shadow?: boolean;
  /** Video aspect ratio (width / height), reserved while it loads. Defaults to 1656×1080. */
  aspect?: string;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const LOADER_DELAY_MS = 200;
const SCRAMBLE_MS = 90;

type Glyph = { ch: string; tone?: "accent" | "dim" };

/** Mono label that keeps a couple of its characters flickering through glyphs. */
const ScrambleLabel = ({ text, animate }: { text: string; animate: boolean }) => {
  const [glyphs, setGlyphs] = useState<Glyph[] | null>(null);

  useEffect(() => {
    if (!animate) return;
    const slots = [...text]
      .map((ch, i) => (ch.trim() ? i : -1))
      .filter((i) => i >= 0);
    const id = window.setInterval(() => {
      const next: Glyph[] = [...text].map((ch) => ({ ch }));
      const count = 1 + Math.floor(Math.random() * 2);
      for (let n = 0; n < count; n++) {
        const i = slots[Math.floor(Math.random() * slots.length)];
        next[i] = {
          ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          tone: Math.random() < 0.5 ? "accent" : "dim",
        };
      }
      setGlyphs(next);
    }, SCRAMBLE_MS);
    return () => window.clearInterval(id);
  }, [text, animate]);

  if (!animate || !glyphs) return <span aria-hidden="true">{text}</span>;

  return (
    <span aria-hidden="true">
      {glyphs.map((g, i) => (
        <span
          key={i}
          className={
            g.tone === "accent"
              ? "text-[#eeff0d]"
              : g.tone === "dim"
                ? "text-zinc-700"
                : undefined
          }
        >
          {g.ch}
        </span>
      ))}
    </span>
  );
};

const LOADER_CELLS = 12;
const LOADER_BLOCK = 3;
const LOADER_STEP_MS = 90;

/** Indeterminate text progress bar: a block of █ bouncing through ░ cells. */
const AsciiLoader = ({
  errored,
  animate,
}: {
  errored: boolean;
  animate: boolean;
}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (errored || !animate) return;
    const id = window.setInterval(() => setStep((s) => s + 1), LOADER_STEP_MS);
    return () => window.clearInterval(id);
  }, [errored, animate]);

  if (errored) {
    return (
      <span className="text-xs tracking-widest text-zinc-600" aria-hidden="true">
        [ ERR ]
      </span>
    );
  }

  // Ping-pong the block's start position between both ends.
  const span = LOADER_CELLS - LOADER_BLOCK;
  const phase = animate ? step % (span * 2) : -1;
  const start = phase < 0 ? -1 : phase <= span ? phase : span * 2 - phase;
  const isFilled = (i: number) =>
    start >= 0 && i >= start && i < start + LOADER_BLOCK;

  return (
    <span className="text-xs text-zinc-500" aria-hidden="true">
      [
      {Array.from({ length: LOADER_CELLS }, (_, i) =>
        isFilled(i) ? (
          <span key={i} className="text-[#eeff0d]">
            █
          </span>
        ) : (
          <span key={i} className="text-zinc-700">
            ░
          </span>
        ),
      )}
      ]
    </span>
  );
};

type VideoWithLoaderProps = {
  src: string;
  title: string;
  aspect: string;
};

/** Video that holds its frame and shows the text loader until the first frame is ready. */
const VideoWithLoader = ({ src, title, aspect }: VideoWithLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Only show the loader if loading is actually slow; cached videos never flash it.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
      setShowLoader(true);
    }, LOADER_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  const label = errored ? "VIDEO UNAVAILABLE" : "LOADING";

  return (
    <div
      className="relative w-full bg-[#0a0a0b]"
      style={{ aspectRatio: aspect }}
    >
      <motion.video
        src={src}
        aria-label={`Screen recording of ${title}`}
        className="absolute inset-0 block w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setLoaded(true)}
        onError={() => setErrored(true)}
        initial={{ opacity: 0, filter: "grayscale(1) blur(6px)" }}
        animate={
          loaded
            ? { opacity: 1, filter: "grayscale(0) blur(0px)" }
            : { opacity: 0, filter: "grayscale(1) blur(6px)" }
        }
        transition={{ duration: 0.7, ease: EASE }}
      />

      <AnimatePresence>
        {!loaded && (showLoader || errored) && (
          <motion.div
            key="loader"
            role="status"
            aria-label={errored ? `${title} video unavailable` : `Loading ${title} video`}
            className="absolute inset-0 grid place-items-center rounded-[4px] border border-[#1f1f23]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex flex-col items-center gap-4">
              <AsciiLoader errored={errored} animate={!reducedMotion} />
              <span className="text-xs tracking-widest text-zinc-500">
                <ScrambleLabel key={label} text={label} animate={!errored && !reducedMotion} />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type ProjectPreviewProps = {
  project: Project;
};

const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  const shotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [shotHeight, setShotHeight] = useState<number>();

  // "Launched 2026 · solo, design + build", or "Live · …" with no year
  const status = project.year ? `Launched ${project.year}` : project.status;
  const meta = `${status} · ${project.role}`;

  // Round the screenshot's block up to whole baselines so the text below stays on the grid
  useEffect(() => {
    const shot = shotRef.current;
    const text = textRef.current;
    if (!shot || !text) return;
    const observer = new ResizeObserver(() => {
      const baseline = parseFloat(getComputedStyle(text).lineHeight);
      const height = shot.offsetHeight;
      setShotHeight(baseline ? Math.ceil(height / baseline) * baseline : height);
    });
    observer.observe(shot);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: "blur(16px)", scale: 0.97 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex flex-col gap-[var(--baseline)]"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.title}`}
        tabIndex={0}
        style={{ height: shotHeight }}
      >
        <div
          ref={shotRef}
          className={`w-[min(640px,150%)] split:w-[clamp(640px,calc(100vw-800px),1280px)] max-w-none overflow-hidden rounded-[4px]${project.shadow ? " shadow-[0_24px_64px_rgba(0,0,0,0.95)]" : ""}`}
        >
          {project.typeSpecimen ? (
            <TypeSpecimen />
          ) : project.screenshot && /\.(mp4|webm)$/i.test(project.screenshot) ? (
            <VideoWithLoader
              key={project.screenshot}
              src={project.screenshot}
              title={project.title}
              aspect={project.aspect ?? "1656 / 1080"}
            />
          ) : (
            <motion.img
              src={project.screenshot}
              alt={`Screenshot of ${project.title}`}
              className="block w-full h-auto"
              initial={{ opacity: 0, filter: "grayscale(1) blur(6px)" }}
              animate={{ opacity: 1, filter: "grayscale(0) blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          )}
        </div>
      </a>

      <div className="max-w-[416px] pl-3 text-sm">
        <p
          className="glitch-in text-zinc-500"
          style={{ animationDelay: "0.4s" }}
        >
          {meta}
        </p>
        <p
          ref={textRef}
          className="glitch-in leading-[var(--baseline)] text-zinc-400"
          style={{ animationDelay: "0.45s" }}
        >
          {project.previewDescription}
        </p>
      </div>

      {/* Wrapper carries the intro glitch so the link's hover glitch doesn't replace (and replay) it. */}
      <div className="glitch-in" style={{ animationDelay: "0.5s" }}>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link inline-flex items-center gap-1 text-sm text-white hover:text-[#eeff0d] transition-colors w-fit pl-3"
          aria-label={`Visit ${project.title}`}
          tabIndex={0}
        >
          Visit {project.title}
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectPreview;
export type { Project };
