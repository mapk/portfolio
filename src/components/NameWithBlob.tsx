"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const DOT_SIZE = 12;

export default function NameWithBlob() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHoveringName, setIsHoveringName] = useState(false);

  const handleDotClick = useCallback(() => {
    if (isFollowing) return;
    setIsFollowing(true);
  }, [isFollowing]);

  const handlePlaceholderClick = useCallback(() => {
    if (isFollowing) {
      setIsFollowing(false);
    }
  }, [isFollowing]);

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

  const showPlaceholder = isFollowing && isHoveringName;
  const slotWidth = isFollowing ? (showPlaceholder ? DOT_SIZE + 12 : 0) : DOT_SIZE + 12;

  return (
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
  );
}
