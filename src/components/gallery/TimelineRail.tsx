// src/components/gallery/TimelineRail.tsx
"use client";

import React from "react";
import type { YearGroup } from "@/types/gallery";

interface TimelineRailProps {
  groups: YearGroup[];
  activeYear: number | null;
}

/**
 * Sticky left rail. Renders one year marker per row.
 * Years with no events are dimmed. The active year (currently in viewport)
 * is highlighted in the brand foreground color.
 */
const TimelineRail: React.FC<TimelineRailProps> = ({ groups, activeYear }) => {
  return (
    <aside
      aria-hidden
      className="hidden lg:flex flex-col sticky top-24 h-fit pr-8"
    >
      <div className="flex flex-col gap-10">
        {groups.map((g) => {
          const isEmpty = g.events.length === 0;
          const isActive = g.year === activeYear;
          return (
            <div key={g.year} className="flex items-center gap-3">
              <span
                className={[
                  "block h-2 w-2 rounded-full",
                  isEmpty
                    ? "bg-foreground/15"
                    : isActive
                      ? "bg-primary"
                      : "bg-foreground/40",
                ].join(" ")}
              />
              <span
                className={[
                  "font-serif tabular-nums tracking-tight transition-colors",
                  isEmpty
                    ? "text-foreground/20 text-2xl"
                    : isActive
                      ? "text-primary text-4xl"
                      : "text-foreground/50 text-3xl",
                ].join(" ")}
              >
                {g.year}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default TimelineRail;
