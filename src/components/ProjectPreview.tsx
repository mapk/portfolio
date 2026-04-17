"use client";

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
      className="flex flex-col gap-4"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.title}`}
        tabIndex={0}
      >
        <div className="w-[clamp(640px,calc(100vw-800px),1280px)] max-w-none overflow-hidden rounded-[4px]">
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

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
        className="max-w-[416px] text-sm leading-relaxed text-zinc-400 pl-3"
      >
        {project.previewDescription}
      </motion.p>

      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.55 }}
        className="inline-flex items-center gap-1 text-sm text-white hover:text-[#eeff0d] transition-colors w-fit pl-3"
        aria-label={`Visit ${project.title}`}
        tabIndex={0}
      >
        Visit {project.title} &rarr;
      </motion.a>
    </motion.div>
  );
};

export default ProjectPreview;
export type { Project };
