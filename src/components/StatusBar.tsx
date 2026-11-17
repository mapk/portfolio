"use client";

import { useEffect, useState } from "react";

type StatusBarProps = {
  projects: number;
  talks: number;
  underlined: number;
  /** When the page (and its Curius highlights) was last generated. */
  generatedAt?: string;
};

const TICK_MS = 30_000;

const relativeTime = (from: number, now: number) => {
  const mins = Math.max(0, Math.round((now - from) / 60_000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
};

const clock = (now: number) =>
  new Date(now).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const Sep = () => (
  <span className="text-zinc-700" aria-hidden="true">
    │
  </span>
);

/** Vim/tmux-style status line pinned to the bottom of the page. */
const StatusBar = ({
  projects,
  talks,
  underlined,
  generatedAt,
}: StatusBarProps) => {
  // Time-dependent text only renders on the client, so it can't mismatch the server HTML.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const id = window.setInterval(update, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const synced = generatedAt ? Date.parse(generatedAt) : NaN;

  return (
    <footer className="status-bar glitch-in text-xs" aria-label="Status">
      <span className="bg-[#eeff0d] px-[1ch] text-[#1f1f23]">NORMAL</span>
      <span className="truncate text-zinc-400">mapk@portfolio:~</span>
      <span className="status-bar-counts">
        <Sep />
        <span className="truncate">
          {projects} projects · {talks} talks · {underlined} underlined
        </span>
      </span>
      <span className="ml-auto flex shrink-0 gap-[1ch]">
        {now !== null && !Number.isNaN(synced) && (
          <>
            <span className="status-bar-counts">
              synced {relativeTime(synced, now)}
            </span>
            <span className="status-bar-counts">
              <Sep />
            </span>
          </>
        )}
        <span className="tabular-nums text-zinc-400">
          {now !== null ? clock(now) : "--:--"}
        </span>
      </span>
    </footer>
  );
};

export default StatusBar;
