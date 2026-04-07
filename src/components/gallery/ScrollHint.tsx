// src/components/gallery/ScrollHint.tsx
"use client";

import React, { useEffect, useState } from "react";

interface ScrollHintProps {
  label: string;
}

const ScrollHint: React.FC<ScrollHintProps> = ({ label }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={[
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-30",
        "flex flex-col items-center gap-2 pointer-events-none",
        "transition-opacity duration-500",
        visible ? "opacity-60" : "opacity-0",
      ].join(" ")}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-foreground/60">
        {label}
      </span>
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary/30 animate-ping" />
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="relative text-primary"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
};

export default ScrollHint;
