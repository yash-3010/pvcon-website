// src/components/gallery/useInfiniteEvents.ts
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const INITIAL_BATCH = 2;
const STEP = 1;
const ROOT_MARGIN = "600px 0px"; // start mounting before reaching the bottom

export function useInfiniteEvents(totalCount: number) {
  const [renderedCount, setRenderedCount] = useState(
    Math.min(INITIAL_BATCH, totalCount)
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const setSentinel = useCallback((node: HTMLDivElement | null) => {
    sentinelRef.current = node;
  }, []);

  useEffect(() => {
    if (renderedCount >= totalCount) return;
    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRenderedCount((c) => Math.min(c + STEP, totalCount));
        }
      },
      { rootMargin: ROOT_MARGIN }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [renderedCount, totalCount]);

  return { renderedCount, setSentinel };
}
