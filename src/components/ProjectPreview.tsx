"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Project = {
  id: string;
  title: string;
  listDescription: string;
  previewDescription: string;
  url: string;
  screenshot: string;
};

type ProjectPreviewProps = {
  project: Project;
};

const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  const shotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [shotHeight, setShotHeight] = useState<number>();

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
          className="w-[clamp(640px,calc(100vw-800px),1280px)] max-w-none overflow-hidden rounded-[4px]"
        >
          <motion.img
            src={project.screenshot}
            alt={`Screenshot of ${project.title}`}
            className="block w-full h-auto"
            initial={{ opacity: 0, filter: "grayscale(1) blur(6px)" }}
            animate={{ opacity: 1, filter: "grayscale(0) blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </a>

      <p
        ref={textRef}
        className="glitch-in max-w-[416px] text-sm leading-[var(--baseline)] text-zinc-400 pl-3"
        style={{ animationDelay: "0.45s" }}
      >
        {project.previewDescription}
      </p>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ animationDelay: "0.5s" }}
        className="glitch-in external-link inline-flex items-center gap-1 text-sm text-white hover:text-[#eeff0d] transition-colors w-fit pl-3"
        aria-label={`Visit ${project.title}`}
        tabIndex={0}
      >
        Visit {project.title}
      </a>
    </motion.div>
  );
};

export default ProjectPreview;
export type { Project };
