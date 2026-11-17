import type { CSSProperties } from "react";

type SectionHeaderProps = {
  title?: string;
  /** Dim shell command shown above the header, e.g. "ls ~/projects". */
  prompt?: string;
  promptStyle?: CSSProperties;
  titleStyle?: CSSProperties;
};

// Long enough to fill any column; the overflow is clipped.
const RULE = "─".repeat(160);

/** Box-drawing section header: `── TITLE ─────────`, with an optional prompt line above. */
const SectionHeader = ({
  title,
  prompt,
  promptStyle,
  titleStyle,
}: SectionHeaderProps) => (
  <>
    {prompt && (
      <p
        className="glitch-in text-sm text-zinc-600"
        style={promptStyle}
        aria-hidden="true"
      >
        $ {prompt}
      </p>
    )}
    {title && (
      <h2
        className="glitch-in mb-[var(--baseline)] flex gap-[1ch] text-sm uppercase"
        style={titleStyle}
      >
        <span className="shrink-0 text-zinc-700" aria-hidden="true">
          ──
        </span>
        <span className="shrink-0">{title}</span>
        <span
          className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-zinc-700"
          aria-hidden="true"
        >
          {RULE}
        </span>
      </h2>
    )}
  </>
);

export default SectionHeader;
