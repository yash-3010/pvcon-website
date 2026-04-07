// src/components/gallery/GalleryTimeline.tsx
"use client";

import React from "react";
import EventBlock from "./EventBlock";
import ScrollHint from "./ScrollHint";
import { useInfiniteEvents } from "./useInfiniteEvents";
import type { HydratedEvent, EventLocale } from "@/types/gallery";

interface GalleryTimelineProps {
  events: HydratedEvent[]; // already sorted descending
  locale: EventLocale;
  scrollHintLabel: string;
  emptyStateLabel: string;
}

/**
 * Editorial vertical timeline.
 * - Year acts as a header on the left for the first event of each year group.
 * - A continuous vertical line runs through a dedicated dot column.
 * - Each event has a pulsing dot on the line, with content on the right.
 * - Empty years are not rendered.
 */
const GalleryTimeline: React.FC<GalleryTimelineProps> = ({
  events,
  locale,
  scrollHintLabel,
  emptyStateLabel,
}) => {
  const { renderedCount, setSentinel } = useInfiniteEvents(events.length);

  if (events.length === 0) {
    return (
      <p className="text-center text-foreground/60 py-32">{emptyStateLabel}</p>
    );
  }

  const visibleEvents = events.slice(0, renderedCount);

  // Group consecutive events by year (descending order preserved).
  const yearGroups: { year: number; events: HydratedEvent[] }[] = [];
  for (const event of visibleEvents) {
    const last = yearGroups[yearGroups.length - 1];
    if (last && last.year === event.year) {
      last.events.push(event);
    } else {
      yearGroups.push({ year: event.year, events: [event] });
    }
  }

  return (
    <>
      <div className="relative max-w-5xl mx-auto px-5 lg:px-10 border-b-2 border-t-2 border-secondary/80">
        {yearGroups.flatMap((group) =>
          group.events.map((event, idx) => (
            <div
              key={event.id}
              className="relative grid grid-cols-[3rem_2rem_1fr] lg:grid-cols-[7rem_3rem_1fr]"
            >
              {/* Col 1: Year label, only on the first event of each year */}
              <div className="flex items-start justify-end pr-0 lg:pr-4 pt-1">
                {idx === 0 && (
                  <span className="font-serif font-bold leading-none text-right text-2xl lg:text-5xl text-secondary">
                    {group.year}
                  </span>
                )}
              </div>

              {/* Col 2: Vertical line + pulsing dot */}
              <div className="relative flex justify-center pt-1 lg:pt-6">
                {/* Continuous vertical line through this column's center */}
                <div
                  aria-hidden
                  className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-black"
                />
                {/* Pulsing dot */}
                <span
                  aria-hidden
                  className="relative z-10 mt-2 lg:mt-0.5 flex h-3 w-3 lg:h-4 lg:w-4"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary" />
                  <span className="relative inline-flex h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-primary" />
                </span>
              </div>

              {/* Col 3: Event content */}
              <div className="pl-4 lg:pl-8 min-w-0 pb-20 lg:pb-28 pt-2 lg:pt-6">
                <EventBlock event={event} locale={locale} />
              </div>
            </div>
          )),
        )}

        {renderedCount < events.length && (
          <div ref={setSentinel} aria-hidden className="h-10" />
        )}
      </div>
      <ScrollHint label={scrollHintLabel} />
    </>
  );
};

export default GalleryTimeline;
