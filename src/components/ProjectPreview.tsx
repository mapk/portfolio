"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const PIXELATION_STEPS = [4, 8, 16, 32, 64, 128, 256];
const STEP_DURATION_MS = 60;

const PixelatedImage = ({ src, alt }: { src: string; alt: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pixelationComplete, setPixelationComplete] = useState(false);
  const stepIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const drawAtResolution = useCallback((resolution: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const aspect = img.naturalWidth / img.naturalHeight;
    const w = Math.max(resolution, 2);
    const h = Math.max(Math.round(w / aspect), 2);

    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, w, h);

    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
  }, []);

  const runPixelationSequence = useCallback(() => {
    stepIndexRef.current = 0;

    const step = () => {
      if (stepIndexRef.current >= PIXELATION_STEPS.length) {
        setPixelationComplete(true);
        return;
      }

      drawAtResolution(PIXELATION_STEPS[stepIndexRef.current]);
      stepIndexRef.current += 1;

      timeoutRef.current = setTimeout(() => {
        rafRef.current = requestAnimationFrame(step);
      }, STEP_DURATION_MS);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [drawAtResolution]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };
    img.src = src;

    return () => {
      img.onload = null;
    };
  }, [src]);

  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const img = imgRef.current;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    stepIndexRef.current = 0;
    runPixelationSequence();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [imageLoaded, runPixelationSequence]);

  return (
    <div className="relative w-[1280px] max-w-none overflow-hidden rounded-[4px] border border-[#27272A]">
      <canvas
        ref={canvasRef}
        className="block w-[1280px] h-auto"
        style={{ imageRendering: "pixelated" }}
        aria-hidden="true"
      />

      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 block w-[1280px] h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: pixelationComplete ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
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
      <PixelatedImage
        src={project.screenshot}
        alt={`Screenshot of ${project.title}`}
      />

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
        className="max-w-[416px] text-sm leading-relaxed text-zinc-400"
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
        className="inline-flex items-center gap-1 text-sm text-white hover:text-[#eeff0d] transition-colors w-fit"
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
