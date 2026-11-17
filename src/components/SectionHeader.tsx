import type { CSSProperties } from "react";

type SectionHeaderProps = {
  title: string;
  titleStyle?: CSSProperties;
};

// Long enough to fill any column; the overflow is clipped.
const RULE = "─".repeat(160);

/** Section header with a box-drawing rule: `TITLE ─────────`. */
const SectionHeader = ({ title, titleStyle }: SectionHeaderProps) => (
  <h2
    className="glitch-in mb-[var(--baseline)] flex gap-[1ch] text-sm uppercase"
    style={titleStyle}
  >
    <span className="shrink-0">{title}</span>
    <span
      className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-zinc-700"
      aria-hidden="true"
    >
      {RULE}
    </span>
  </h2>
);

export default SectionHeader;
