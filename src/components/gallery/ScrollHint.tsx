// src/components/gallery/ScrollHint.tsx
"use client";

import React, { useEffect, useState } from "react";

interface ScrollHintProps {
  label: string;
}

const ScrollHint: React.FC<ScrollHintProps> = ({ label }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      setVisible(distanceFromBottom > 700);
      console.log(distanceFromBottom)
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={[
        "fixed bottom-6 right-16 -translate-x-1/2 z-30",
        "flex flex-col items-center gap-2 pointer-events-none animate-bounce",
        "transition-opacity duration-500",
        visible ? "opacity-60" : "opacity-0",
      ].join(" ")}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-foreground/60">
        {label}
      </span>
    </div>
  );
};

export default ScrollHint;
