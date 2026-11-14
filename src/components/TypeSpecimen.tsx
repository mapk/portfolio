import type { CSSProperties } from "react";

type Specimen = {
  name: string;
  fontFamily: string;
  // Sizes are in cqw (percent of the card's width) so the specimen scales with the preview.
  fontSize: number;
  letterSpacing: number; // em
  lineHeight: number;
  rows: string[];
};

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "1234567890";

const SPECIMENS: Specimen[] = [
  {
    name: "Cyber Plate",
    fontFamily: "var(--font-cyber-plate)",
    fontSize: 3.17,
    letterSpacing: 0.354,
    lineHeight: 1.24,
    rows: [UPPER.slice(0, 13), UPPER.slice(13), DIGITS],
  },
  {
    name: "Fat Pixel",
    fontFamily: "var(--font-fat-pixel)",
    fontSize: 2.99,
    letterSpacing: 0.373,
    lineHeight: 1.22,
    rows: [UPPER, LOWER, DIGITS],
  },
  {
    name: "Level",
    fontFamily: "var(--font-level)",
    fontSize: 3.28,
    letterSpacing: 0.272,
    lineHeight: 1.25,
    rows: [UPPER, DIGITS],
  },
  {
    name: "Shashki",
    fontFamily: "var(--font-shashki)",
    fontSize: 4.13,
    letterSpacing: 0.262,
    lineHeight: 0.9,
    rows: [UPPER, LOWER, DIGITS],
  },
];

// Shrinks every specimen uniformly; letter spacing is in em so it follows.
const SIZE_SCALE = 0.85;

// Wait for the panel to slide in, then reveal one glyph at a time, font after font.
const START_DELAY = 0.3; // s
const LETTER_STEP = 0.02; // s between glyphs
const FONT_PAUSE = 0.15; // s after a font's title before its first glyph

// Precomputed reveal timeline: each font's title, then its glyphs one by one.
const TIMELINE = (() => {
  let t = START_DELAY;
  return SPECIMENS.map((specimen) => {
    const titleDelay = t;
    t += FONT_PAUSE;
    const rows = specimen.rows.map((row) =>
      Array.from(row).map((char) => {
        const delay = t;
        t += LETTER_STEP;
        return { char, delay };
      }),
    );
    return { specimen, titleDelay, rows };
  });
})();

const TypeSpecimen = () => (
  // The card is the size container; padding lives on the child so cqw resolves against the card.
  <div className="@container rounded-[4px] bg-[#1b1b1b]">
    <div className="flex flex-col gap-[3.5cqw] px-[5.6cqw] py-[5cqw]">
      {TIMELINE.map(({ specimen, titleDelay, rows }) => (
        <div key={specimen.name}>
          <p
            className="glitch-in mb-[1cqw] text-sm leading-[var(--baseline)] text-zinc-400"
            style={{ animationDelay: `${titleDelay}s` }}
          >
            {specimen.name}
          </p>
          <div
            role="img"
            aria-label={`${specimen.name} specimen: ${specimen.rows.join(" ")}`}
            className="whitespace-nowrap text-zinc-200"
            style={{
              fontFamily: specimen.fontFamily,
              fontSize: `${specimen.fontSize * SIZE_SCALE}cqw`,
              lineHeight: specimen.lineHeight,
            }}
          >
            {rows.map((glyphs, r) => (
              <div key={r} aria-hidden="true">
                {glyphs.map(({ char, delay }) => (
                  <span
                    key={char}
                    className="glitch-in inline-block"
                    style={
                      {
                        animationDelay: `${delay.toFixed(3)}s`,
                        marginRight: `${specimen.letterSpacing}em`,
                        lineHeight: "inherit",
                      } as CSSProperties
                    }
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TypeSpecimen;
