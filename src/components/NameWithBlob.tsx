"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

const DOT_SIZE = 12;

type PlacedDot = { x: number; y: number };

export default function NameWithBlob() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHoveringName, setIsHoveringName] = useState(false);
  const [placedDots, setPlacedDots] = useState<PlacedDot[]>([]);
  const placeholderRef = useRef<HTMLButtonElement>(null);
  const clickCountRef = useRef(0);

  const handleDotActivate = useCallback(() => {
    if (isFollowing) return;
    const formats: { src: string; type: string }[] = [
      { src: "/audio/11-uh-oh-whoah.mp3", type: "audio/mpeg" },
      { src: "/audio/11-uh-oh-whoah.wav", type: "audio/wav" },
      { src: "/audio/11-uh-oh-whoah.ogg", type: "audio/ogg" },
    ];

    const tryPlay = (index: number) => {
      if (index >= formats.length) return;
      const { src, type } = formats[index];
      const audio = new Audio();
      audio.volume = 1;
      audio.addEventListener("error", () => tryPlay(index + 1));
      audio.addEventListener("canplay", () => {
        audio.play().catch(() => tryPlay(index + 1));
      });
      audio.src = src;
      audio.load();
    };
    tryPlay(0);
  }, [isFollowing]);

  const handleDotClick = useCallback(() => {
    if (isFollowing) return;
    setIsFollowing(true);
  }, [isFollowing]);

  const playAudio = useCallback((filename: string) => {
    const base = filename.replace(/\.[^.]+$/, "");
    const formats: { src: string; type: string }[] = [
      { src: `/audio/${base}.mp3`, type: "audio/mpeg" },
      { src: `/audio/${base}.wav`, type: "audio/wav" },
      { src: `/audio/${base}.ogg`, type: "audio/ogg" },
    ];

    const tryPlay = (index: number) => {
      if (index >= formats.length) return;
      const { src } = formats[index];
      const audio = new Audio();
      audio.volume = 1;
      audio.addEventListener("error", () => tryPlay(index + 1));
      audio.addEventListener("canplay", () => {
        audio.play().catch(() => tryPlay(index + 1));
      });
      audio.src = src;
      audio.load();
    };
    tryPlay(0);
  }, []);

  const handlePlaceholderClick = useCallback(() => {
    if (isFollowing) {
      playAudio("11-uh-thankyou.mp3");
      setIsFollowing(false);
      setPlacedDots([]);
      clickCountRef.current = 0;
    }
  }, [isFollowing, playAudio]);

  const handleNameMouseEnter = useCallback(() => {
    if (isFollowing) {
      setIsHoveringName(true);
    }
  }, [isFollowing]);

  const handleNameMouseLeave = useCallback(() => {
    setIsHoveringName(false);
  }, []);

  useEffect(() => {
    if (!isFollowing) return;

    const styleId = "blob-cursor-style";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

    const applyCursor = (dataUrl: string) => {
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `html, body, html * { cursor: url("${dataUrl}") 8 8, auto !important; }`;
    };

    fetch("/blob-cursor.png")
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          applyCursor(reader.result as string);
        };
        reader.readAsDataURL(blob);
      })
      .catch(() => {
        applyCursor("/blob-cursor.png");
      });

    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, [isFollowing]);

  useEffect(() => {
    if (!isFollowing) return;

    const handleDocumentClick = (e: MouseEvent) => {
      if (placeholderRef.current?.contains(e.target as Node)) return;
      clickCountRef.current += 1;
      const count = clickCountRef.current;
      if (count === 5) playAudio("11-um-wow.mp3");
      else if (count === 15) playAudio("11-oh-dang.mp3");
      setPlacedDots((prev) => [...prev, { x: e.clientX, y: e.clientY }]);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isFollowing, playAudio]);

  const showPlaceholder = isFollowing && isHoveringName;
  const slotWidth = isFollowing ? (showPlaceholder ? DOT_SIZE + 12 : 0) : DOT_SIZE + 12;

  const dotsOverlay =
    placedDots.length > 0 &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        className="pointer-events-none fixed inset-0 z-50"
        aria-hidden
      >
        {placedDots.map((dot, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: dot.x - DOT_SIZE / 2,
              top: dot.y - DOT_SIZE / 2,
              width: DOT_SIZE,
              height: DOT_SIZE,
            }}
          >
            <Image
              src="/blob.png"
              alt=""
              width={DOT_SIZE}
              height={DOT_SIZE}
              className="size-3"
            />
          </div>
        ))}
      </div>,
      document.body
    );

  return (
    <>
      {dotsOverlay}
      <h1
        className={`mb-8 flex items-center text-lg font-medium tracking-tight uppercase text-white transition-all duration-300 ease-out sm:text-xl ${slotWidth === 0 ? "gap-0" : "gap-3"}`}
        onMouseEnter={handleNameMouseEnter}
        onMouseLeave={handleNameMouseLeave}
      >
      <div
        className="flex shrink-0 items-center justify-center overflow-hidden transition-all duration-300 ease-out"
        style={{ width: slotWidth, minWidth: slotWidth }}
      >
        {!isFollowing ? (
          <button
            type="button"
            onMouseDown={handleDotActivate}
            onTouchStart={handleDotActivate}
            onClick={handleDotClick}
            className="cursor-pointer touch-manipulation select-none"
            aria-label="Use blob as cursor"
          >
            <Image
              src="/blob.png"
              alt=""
              width={DOT_SIZE}
              height={DOT_SIZE}
              className="size-3 shrink-0 animate-wiggle"
            />
          </button>
        ) : showPlaceholder ? (
          <button
            ref={placeholderRef}
            type="button"
            onClick={handlePlaceholderClick}
            className="flex cursor-pointer items-center justify-center touch-manipulation select-none"
            aria-label="Return blob"
          >
            <div className="relative size-3 shrink-0">
              <Image
                src="/blob.png"
                alt=""
                width={DOT_SIZE}
                height={DOT_SIZE}
                className="size-3 opacity-40 transition-opacity hover:opacity-70"
              />
            </div>
          </button>
        ) : (
          <div className="size-3 shrink-0" />
        )}
      </div>

      <span className="transition-all duration-300 ease-out">
        Mark Uraine
      </span>
    </h1>
    </>
  );
}
