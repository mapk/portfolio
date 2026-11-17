"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import NameWithBlob from "@/components/NameWithBlob";
import ProjectPreview from "@/components/ProjectPreview";
import type { Project } from "@/components/ProjectPreview";
import type { ReadingSnippet } from "@/lib/curius";

const PROJECTS: Project[] = [
  {
    id: "data-backed-design",
    title: "Data Backed Design",
    listDescription: "Get evidence-backed answers to UI/UX questions.",
    previewDescription:
      "Ask a UI/UX or design-process question. Get one clear direction, the reasoning, cited evidence from named companies, and the tradeoffs.",
    url: "https://databacked.design/",
    screenshot: "/screenshots/databacked-studio-blk.mp4",
    shadow: true,
  },
  {
    id: "reactions",
    title: "Reactions",
    listDescription: "Collect early feedback from within your product.",
    previewDescription:
      "Collecting early product feedback from real users is difficult. Planning time with customers that already have busy schedules often leads to no-shows, rescheduling, and time lost. Reactions helps get early feature designs in front of users from within your product.",
    url: "https://getreactions.app/",
    screenshot: "/screenshots/reactions-studio-blk.mp4",
    shadow: true,
  },
  {
    id: "tolkovanye",
    title: "Tолкование",
    listDescription: "Read insightful commentary on Bible verses.",
    previewDescription:
      "A commentary platform for Bible chapters, offering deeper insights into Scripture through the perspective of the original Hebrew authors.",
    url: "https://tolkovanye.netlify.app/",
    screenshot: "/screenshots/tolkovanye-studio-blk.mp4",
    shadow: true,
  },
  {
    id: "word-upon-word",
    title: "Word Upon Word",
    listDescription: "Learn Russian through comprehensible input.",
    previewDescription:
      "An interactive language learning app that teaches Russian through comprehensible input, with inline word definitions and pronunciation guides.",
    url: "https://worduponword.app/",
    screenshot: "/screenshots/word-mobile.jpg",
  },
  {
    id: "eat-your-greens",
    title: "Eat Your Greens",
    listDescription: "Track food nutrients by color.",
    previewDescription:
      "A nutrition tracking app that encourages a balanced diet by categorizing food by color for a more intuitive approach to healthy eating.",
    url: "https://eatyourgreens.app/",
    screenshot: "/screenshots/greens-mobile.jpg",
  },
  {
    id: "yeshuas-purpose",
    title: "Yeshua\u2019s Purpose",
    listDescription: "Follow a timeline about the promised Messiah.",
    previewDescription:
      "A narrative biblical timeline exploring the purpose of Yeshua as the Messiah who reunites a divided kingdom.",
    url: "https://v0-yeshua-timeline.vercel.app/",
    screenshot: "/screenshots/yeshua.jpg",
  },
  {
    id: "covenants",
    title: "\u05D1\u05E8\u05D9\u05EA\u05D5\u05EA",
    listDescription: "Review covenant details throughout history.",
    previewDescription:
      "An interactive visualization mapping the covenants throughout biblical history, showing how they build upon each other.",
    url: "https://codepen.io/mapk/full/VwKeqeB",
    screenshot: "/screenshots/covenants.jpg",
  },
  {
    id: "typefaces",
    title: "Typefaces",
    listDescription: "Check out a few typefaces I designed.",
    previewDescription:
      "A collection of custom-designed typefaces exploring geometric forms and modular letter construction.",
    url: "https://mapk.gumroad.com/",
    typeSpecimen: true,
  },
];

type Talk = { year: string; title: string; url?: string };

const TALKS: Talk[] = [
  { year: "2025", title: "The Influence of Language on Worldviews" },
  { year: "2024", title: "Too Much Function, Not Enough Form" },
  { year: "2023", title: "You say potato, I say GHOUGHPHTHEIGHTTEEAU" },
  { year: "2023", title: "ECHOS Design Leadership Firesession" },
  {
    year: "2020",
    title: "Disrupting Innovation",
    url: "https://wordpress.tv/2020/05/30/mark-uraine-gutenberg-and-how-its-disrupting-wordpress/",
  },
  {
    year: "2019",
    title: "Disrupting Innovation",
    url: "https://www.youtube.com/watch?v=8R8x7Oj9f5w",
  },
  {
    year: "2019",
    title: "Designing in the Open, Remotely",
    url: "https://wordpress.tv/2019/09/08/mark-uraine-designing-in-the-open-remotely/",
  },
  {
    year: "2019",
    title: "Panelist: Growing Beyond Gutenberg",
    url: "https://wordpress.tv/2019/09/05/panel-growing-beyond-gutenberg-from-block-based-editing-to-site-administration/",
  },
  {
    year: "2018",
    title: "Designing with the API",
    url: "https://wordpress.tv/2018/08/17/mark-uraine-designing-with-the-api-p1-of-3/",
  },
  {
    year: "2017",
    title: "Visual Data Using the WordPress API",
    url: "https://europe.wordcamp.org/2017/session/workshop-visual-data-using-the-wordpress-api/",
  },
  {
    year: "2017",
    title: "Visual Data + Computational Design",
    url: "https://speakerdeck.com/mapk/visual-data-plus-computational-design",
  },
  {
    year: "2017",
    title: "Designing in the Open",
    url: "https://wordpress.tv/2017/05/09/mark-uraine-designing-in-the-open/",
  },
  {
    year: "2016",
    title: "Design for Telepathy",
    url: "https://wordpress.tv/2016/10/08/mark-uraine-design-for-telepathy/",
  },
  {
    year: "2016",
    title: "Design Thinking",
    url: "https://wordpress.tv/2016/06/06/mark-uraine-design-thinking-thinking-like-a-designer/",
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/uraine/" },
  { label: "Github", url: "https://github.com/mapk" },
  { label: "ADPList", url: "https://adplist.org/mentors/mark-uraine" },
];

/** Dim gutter glyph (tree branch, year) in a list row. */
const Marker = ({ children }: { children: React.ReactNode }) => (
  <span className="text-zinc-600" aria-hidden="true">
    {children}
  </span>
);

type PortfolioGridProps = {
  readingSnippets?: ReadingSnippet[];
};

const PortfolioGrid = ({ readingSnippets = [] }: PortfolioGridProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const selectedProject =
    PROJECTS.find((p) => p.id === selectedProjectId) ?? null;

  const handleProjectClick = useCallback((id: string) => {
    setSelectedProjectId((prev) => (prev === id ? null : id));
  }, []);

  const panelRef = useRef<HTMLDivElement>(null);

  const handleOverlayClose = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  const handleOverlayKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") handleOverlayClose();
    },
    [handleOverlayClose],
  );

  useEffect(() => {
    if (!selectedProjectId) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (panelRef.current?.contains(target)) return;
      if (target.closest("[data-project-button]")) return;
      setSelectedProjectId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedProjectId]);

  // Each line gets the next slot in the load-in stagger, in document order.
  let lineIndex = 0;
  const nextLine = () => ({ "--i": lineIndex++ }) as CSSProperties;

  return (
    <>
      <div className="portfolio-grid grid min-h-screen gap-0">
        {/* Left Column — Bio & Links */}
        <div className="portfolio-col-left w-full min-w-0 pt-12">
          <div>
            <NameWithBlob nameStyle={nextLine()} />

            <p
              className="glitch-in mb-[calc(var(--baseline)*2)] text-sm"
              style={nextLine()}
            >
              Founder of{" "}
              <a
                href="https://lastpicked.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Last Picked
              </a>
              , where I build products that help product teams build
              products.(╯°□°)╯ ┻━┻ I&apos;m also a Sr. Manager of Product Design
              at{" "}
              <a
                href="https://www.shopmonkey.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shopmonkey
              </a>{" "}
              where I built{" "}
              <a
                href="https://shopmonkey-playground.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shopmonkey Playground
              </a>
              , an AI vibe coding tool that allows us to share early prototypes
              with customers, and makes the hand-off to development smooth and
              seamless. Previously, I led design teams at{" "}
              <a
                href="https://automattic.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Automattic
              </a>{" "}
              and{" "}
              <a
                href="https://wordpress.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WordPress
              </a>
              , and helped several startups go from 0 to 1.
            </p>
          </div>

          <section>
            <ul className="text-sm">
              {SOCIAL_LINKS.map((link, i) => (
                <li
                  key={link.url}
                  className="glitch-in list-row"
                  style={nextLine()}
                >
                  <Marker>{i === SOCIAL_LINKS.length - 1 ? "└─" : "├─"}</Marker>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link w-fit"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {readingSnippets.length > 0 && (
            <section className="mt-[calc(var(--baseline)*2)]">
              <h2
                className="glitch-in mb-[var(--baseline)] text-sm uppercase"
                style={nextLine()}
              >
                Highlighted Reading
              </h2>
              <ul className="space-y-[var(--baseline)] text-sm">
                {readingSnippets.map((snippet) => (
                  <li
                    key={snippet.id}
                    className="glitch-in"
                    style={nextLine()}
                  >
                    <blockquote className="text-zinc-400">
                      &ldquo;{snippet.highlight}&rdquo;
                    </blockquote>
                    <div className="list-row">
                      <Marker>└─</Marker>
                      <div className="min-w-0">
                        <a
                          href={snippet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="external-link"
                        >
                          {snippet.title}
                        </a>
                        {snippet.author && (
                          <>
                            <br />
                            <span className="text-zinc-500">
                              {snippet.author}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Middle Column — Projects & Talks */}
        <div
          className="portfolio-col-right divider-in w-full min-w-0 pb-12"
          style={nextLine()}
        >
          <section>
            <h2
              className="glitch-in mb-[var(--baseline)] text-sm uppercase"
              style={nextLine()}
            >
              Projects
            </h2>
            <ul className="space-y-[var(--baseline)] text-sm">
              {PROJECTS.map((project) => {
                const isActive = selectedProjectId === project.id;
                return (
                  <li key={project.id} className="glitch-in" style={nextLine()}>
                    <button
                      type="button"
                      data-project-button
                      onClick={() => handleProjectClick(project.id)}
                      className={`cursor-pointer text-left transition-colors ${
                        isActive
                          ? "text-[#eeff0d]"
                          : "text-white hover:text-[#eeff0d]"
                      }`}
                      aria-label={`Preview ${project.title}`}
                      aria-pressed={isActive}
                      tabIndex={0}
                    >
                      <span
                        className={
                          project.id === "tolkovanye"
                            ? "text-xs leading-[var(--baseline)]"
                            : ""
                        }
                      >
                        {project.title}
                      </span>
                      <br />
                      <span
                        className={`text-sm ${
                          isActive ? "text-[#eeff0d]" : "text-zinc-400"
                        }`}
                      >
                        {project.listDescription}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-[calc(var(--baseline)*2)]">
            <h2
              className="glitch-in mb-[var(--baseline)] text-sm uppercase"
              style={nextLine()}
            >
              Talks
            </h2>
            <ul className="text-sm">
              {TALKS.map((talk) => (
                <li
                  key={`${talk.year}-${talk.title}-${talk.url ?? ""}`}
                  className="glitch-in list-row talk-row"
                  style={nextLine()}
                >
                  <span>{talk.year}</span>
                  {talk.url ? (
                    <a
                      href={talk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link w-fit"
                    >
                      {talk.title}
                    </a>
                  ) : (
                    <span>{talk.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Preview Panel — docked beside the content at split+, slide-over below */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end split:pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onKeyDown={handleOverlayKeyDown}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 block split:hidden"
              onClick={handleOverlayClose}
              aria-label="Close preview"
              role="button"
              tabIndex={0}
              onKeyDown={handleOverlayKeyDown}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={panelRef}
              className="preview-overlay-panel pointer-events-auto relative z-10 flex h-full w-[min(90vw,810px)] split:w-[calc(100vw-var(--main-w))] flex-col overflow-y-auto overflow-x-clip bg-zinc-950 border-l border-[#1f1f23] p-6 pt-12 split:pl-[var(--gutter)] split:pr-0"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
            >
              <button
                type="button"
                onClick={handleOverlayClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-zinc-400 hover:text-white transition-colors split:hidden"
                aria-label="Close preview"
                tabIndex={0}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>

              <ProjectPreview
                key={selectedProject.id}
                project={selectedProject}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioGrid;
