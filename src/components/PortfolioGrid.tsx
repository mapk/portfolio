"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NameWithBlob from "@/components/NameWithBlob";
import ProjectPreview from "@/components/ProjectPreview";
import type { Project } from "@/components/ProjectPreview";

const PROJECTS: Project[] = [
  {
    id: "tolkovanye",
    title: "Tолкование",
    listDescription: "Read insightful commentary on Bible verses.",
    previewDescription:
      "A commentary platform for Bible chapters, offering deeper insights into Scripture through the perspective of the original Hebrew authors.",
    url: "https://tolkovanye.netlify.app/",
    screenshot: "/screenshots/tolkovanye.jpg",
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
    id: "he-walks-with-us",
    title: "He Walks With Us",
    listDescription: "Access books and articles with Hebraic context.",
    previewDescription:
      "A publishing platform committed to producing literary works that align our understanding of the Word of God with the Hebrew authors.",
    url: "https://hewalkswith.us/",
    screenshot: "/screenshots/hewalks.jpg",
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
    screenshot: "/screenshots/type.jpg",
  },
];

const PortfolioGrid = () => {
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

  return (
    <>
      <div className="portfolio-grid grid min-h-screen gap-0">
        {/* Left Column — Bio & Links */}
        <div className="portfolio-col-left w-full min-w-0 pt-12">
          <div className="animate-fade-in-up">
            <NameWithBlob />

            <p className="mb-12 text-sm">
              Founder of{" "}
              <a
                href="https://lastpicked.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Last Picked
              </a>
              , a product company using AI to learn, build, and iterate on
              ideas. I&apos;m also a Sr. Manager of Product Design at{" "}
              <a
                href="https://www.shopmonkey.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shopmonkey
              </a>{" "}
              where I integrated AI into our design process and built{" "}
              <a
                href="https://shopmonkey-playground.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shopmonkey Playground
              </a>{" "}
              to share early prototypes with customers. Previously, I led design
              teams at{" "}
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

          <section className="animate-fade-in-up animate-fade-in-up-delay-1">
            <ul className="space-y-0 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/in/uraine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mapk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://adplist.org/mentors/mark-uraine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  ADPList
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Middle Column — Projects & Talks */}
        <div className="portfolio-col-right w-full min-w-0 pb-12">
          <section className="animate-fade-in-up animate-fade-in-up-delay-2">
            <h2 className="mb-6 text-sm uppercase">Projects</h2>
            <ul className="space-y-6 text-sm">
              {PROJECTS.map((project) => {
                const isActive = selectedProjectId === project.id;
                return (
                  <li key={project.id}>
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

          <section className="mt-12 animate-fade-in-up animate-fade-in-up-delay-3">
            <h2 className="mb-6 text-sm uppercase">Talks</h2>
            <ul className="space-y-0 text-sm">
              <li>2025: The Influence of Language on Worldviews</li>
              <li>2024: Too Much Function, Not Enough Form</li>
              <li>2023: You say potato, I say GHOUGHPHTHEIGHTTEEAU</li>
              <li>2023: ECHOS Design Leadership Firesession</li>
              <li>
                <a
                  href="https://wordpress.tv/2020/05/30/mark-uraine-gutenberg-and-how-its-disrupting-wordpress/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2020: Disrupting Innovation
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=8R8x7Oj9f5w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2019: Disrupting Innovation
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2019/09/08/mark-uraine-designing-in-the-open-remotely/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2019: Designing in the Open, Remotely
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2019/09/05/panel-growing-beyond-gutenberg-from-block-based-editing-to-site-administration/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2019: Panelist: Growing Beyond Gutenberg
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2018/08/17/mark-uraine-designing-with-the-api-p1-of-3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2018: Designing with the API
                </a>
              </li>
              <li>
                <a
                  href="https://europe.wordcamp.org/2017/session/workshop-visual-data-using-the-wordpress-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2017: Visual Data Using the WordPress API
                </a>
              </li>
              <li>
                <a
                  href="https://speakerdeck.com/mapk/visual-data-plus-computational-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2017: Visual Data + Computational Design
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2017/05/09/mark-uraine-designing-in-the-open/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2017: Designing in the Open
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2016/10/08/mark-uraine-design-for-telepathy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2016: Design for Telepathy
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.tv/2016/06/06/mark-uraine-design-thinking-thinking-like-a-designer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  2016: Design Thinking
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Preview Panel — fixed to the right of max-w-5xl on all sizes */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end lg:pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onKeyDown={handleOverlayKeyDown}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 block lg:hidden"
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
              className="preview-overlay-panel pointer-events-auto relative z-10 flex h-full w-[min(90vw,810px)] lg:w-[calc(100vw-64rem)] flex-col overflow-y-auto overflow-x-clip bg-zinc-950 border-l border-[#1f1f23] p-6 pt-12 lg:pl-12 lg:pr-0"
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
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-zinc-400 hover:text-white transition-colors lg:hidden"
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
