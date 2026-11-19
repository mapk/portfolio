"use client";

import { motion } from "motion/react";
import BeforeAfter from "@/components/BeforeAfter";

type Comparison = {
  /** Screen name, e.g. "Workflow board". */
  label: string;
  before: string;
  after: string;
  /** Shared aspect ratio of both images. Defaults to 1440 / 900. */
  aspect?: string;
};

type Stat = {
  /** Short figure, e.g. "290+". */
  value: string;
  label: string;
};

/** Leadership work, opened from the intro bio and its own list section. */
type Story = {
  id: string;
  title: string;
  /** Title in the list, when it should differ from the panel title. */
  listTitle?: string;
  /** One short line under the title in the list. */
  listDescription: string;
  /** One line under the title, e.g. role. */
  meta: string;
  url: string;
  comparisons?: Comparison[];
  /** Single still, shown where comparisons would be. */
  image?: { src: string; alt: string; aspect: string };
  /** Headline numbers, shown as cards under the comparisons. */
  stats?: Stat[];
  /** Summary text; blank lines ("\n\n") split paragraphs. */
  description: string;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** Stagger for the text lines, matching ProjectPreview's timing. */
const delay = (s: number) => ({ animationDelay: `${s}s` });

const StoryPreview = ({ story }: { story: Story }) => (
  <motion.div
    key={story.id}
    initial={{ opacity: 0, scale: 1.02 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, filter: "blur(16px)", scale: 0.97 }}
    transition={{ duration: 0.5, ease: EASE }}
    className="flex flex-col gap-[var(--baseline)] split:pr-[var(--gutter)]"
  >
    <div className="max-w-[416px] text-sm">
      <h2 className="glitch-in text-white" style={delay(0.3)}>
        {story.title}
      </h2>
      <p className="glitch-in text-zinc-500" style={delay(0.35)}>
        {story.meta}
      </p>
    </div>

    {story.comparisons?.map((c) => (
      <motion.div
        key={c.label}
        className="w-full max-w-[1280px]"
        initial={{ opacity: 0, filter: "grayscale(1) blur(6px)" }}
        animate={{ opacity: 1, filter: "grayscale(0) blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <BeforeAfter
          label={c.label}
          before={c.before}
          after={c.after}
          aspect={c.aspect}
        />
      </motion.div>
    ))}

    {story.image && (
      <motion.div
        className="w-full max-w-[1280px]"
        initial={{ opacity: 0, filter: "grayscale(1) blur(6px)" }}
        animate={{ opacity: 1, filter: "grayscale(0) blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.image.src}
          alt={story.image.alt}
          className="block w-full rounded-[4px] bg-[#0a0a0b]"
          style={{ aspectRatio: story.image.aspect }}
        />
      </motion.div>
    )}

    {story.stats && (
      <ul className="grid w-full max-w-[1280px] grid-cols-1 gap-x-3 gap-y-[var(--baseline)] min-[30rem]:grid-cols-2 min-[60rem]:grid-cols-4">
        {story.stats.map((s, i) => (
          <li
            key={s.value}
            className="glitch-in flex flex-col rounded-[4px] border border-[#1f1f23] px-3 py-[calc(var(--baseline)-1px)]"
            style={delay(0.4 + i * 0.05)}
          >
            <div className="text-2xl leading-[calc(var(--baseline)*2)] text-white">
              {s.value}
            </div>
            <p className="text-sm text-zinc-400">{s.label}</p>
          </li>
        ))}
      </ul>
    )}

    <div
      className="glitch-in max-w-[548px] space-y-[var(--baseline)] text-sm text-zinc-400"
      style={delay(0.6)}
    >
      {story.description.split("\n\n").map((para) => (
        <p key={para}>{para}</p>
      ))}
    </div>

    {/* Wrapper carries the intro glitch so the link's hover glitch doesn't replay it. */}
    <div className="glitch-in" style={delay(0.65)}>
      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="external-link w-fit text-sm text-white transition-colors hover:text-[#eeff0d]"
      >
        Visit {story.title}
      </a>
    </div>
  </motion.div>
);

export default StoryPreview;
export type { Story };
