"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type BeforeAfterProps = {
  before: string;
  after: string;
  /** Short name for the screen, used in alt text and the caption. */
  label: string;
  /** Image aspect ratio (width / height). Both images must share it. */
  aspect?: string;
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

type SideButtonProps = {
  text: string;
  /** Percent of the frame this side currently fills. */
  share: number;
  /** Fill from the right edge (the "after" side). */
  fromRight?: boolean;
  onClick: () => void;
  transition: string;
};

/**
 * Caption word that jumps the slider fully to its side. A bright copy of the
 * word and a thin yellow bar fill in step with how much of the frame that
 * side currently shows.
 */
const SideButton = ({
  text,
  share,
  fromRight,
  onClick,
  transition,
}: SideButtonProps) => {
  const hidden = `${100 - share}%`;
  const clipPath = fromRight ? `inset(0 0 0 ${hidden})` : `inset(0 ${hidden} 0 0)`;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show all of ${text}`}
      aria-pressed={share === 100}
      className="relative cursor-pointer transition-colors hover:text-zinc-400"
    >
      {text}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-white"
        style={{ clipPath, transition }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[#eeff0d]"
        style={{ clipPath, transition }}
      />
    </button>
  );
};

/**
 * Before/after comparison. The "after" image is the base layer; the "before"
 * image sits on top, clipped to the left of the divider. Drag anywhere on the
 * image (mouse or touch), use the arrow keys on the handle, or jump to either
 * side with the caption buttons.
 */
const BeforeAfter = ({
  before,
  after,
  label,
  aspect = "1440 / 900",
}: BeforeAfterProps) => {
  // Percent of the width showing the "before" image.
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const posFromPointer = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || !rect.width) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    posFromPointer(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) posFromPointer(e.clientX);
  };

  const stopDragging = () => setDragging(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const next =
      e.key === "ArrowLeft"
        ? pos - step
        : e.key === "ArrowRight"
          ? pos + step
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    setPos(clamp(next));
  };

  // Jumps (caption buttons, a click) ease; dragging tracks the pointer 1:1.
  const ease = (prop: string) => (dragging ? "none" : `${prop} 0.4s ease`);
  const rounded = Math.round(pos);

  return (
    <figure className="flex flex-col gap-[var(--baseline)]">
      <div
        ref={frameRef}
        className={`relative w-full select-none overflow-hidden rounded-[4px] bg-[#0a0a0b] ${
          dragging ? "cursor-grabbing" : "cursor-ew-resize"
        }`}
        style={{ aspectRatio: aspect, touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after}
          alt={`${label}, after the redesign`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
            transition: ease("clip-path"),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={before}
            alt={`${label}, before the redesign`}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.88]"
            draggable={false}
          />
        </div>

        {/* Corner tags fade out as their side is covered. */}
        <span
          className="pointer-events-none absolute left-2 top-2 bg-zinc-950/85 px-1.5 text-xs uppercase tracking-widest text-zinc-300 transition-opacity"
          style={{ opacity: pos < 12 ? 0 : 1 }}
          aria-hidden="true"
        >
          Before
        </span>
        <span
          className="pointer-events-none absolute right-2 top-2 bg-zinc-950/85 px-1.5 text-xs uppercase tracking-widest text-zinc-300 transition-opacity"
          style={{ opacity: pos > 88 ? 0 : 1 }}
          aria-hidden="true"
        >
          After
        </span>

        {/* Divider + handle */}
        <div
          className="absolute inset-y-0"
          style={{
            left: `${pos}%`,
            transition: ease("left"),
          }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] -translate-x-1/2 bg-[#eeff0d]" />
          <button
            type="button"
            role="slider"
            aria-label={`${label}: compare before and after`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={rounded}
            aria-valuetext={`${rounded}% before, ${100 - rounded}% after`}
            onKeyDown={handleKeyDown}
            className="absolute left-0 top-1/2 flex h-8 -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 border border-[#eeff0d] bg-zinc-950 px-1.5 text-xs text-[#eeff0d] outline-offset-2"
          >
            <span aria-hidden="true">◂</span>
            <span aria-hidden="true">▸</span>
          </button>
        </div>
      </div>

      <figcaption className="list-row pl-3 text-sm">
        <span className="text-zinc-600" aria-hidden="true">
          └─
        </span>
        <span className="flex flex-wrap gap-x-[2ch]">
          <span className="text-zinc-400">{label}</span>
          <span className="text-zinc-600">
            <SideButton
              text="before"
              share={pos}
              onClick={() => setPos(100)}
              transition={ease("clip-path")}
            />
            {" / "}
            <SideButton
              text="after"
              share={100 - pos}
              fromRight
              onClick={() => setPos(0)}
              transition={ease("clip-path")}
            />
          </span>
        </span>
      </figcaption>
    </figure>
  );
};

export default BeforeAfter;
