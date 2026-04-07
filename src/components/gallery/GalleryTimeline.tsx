// src/components/gallery/GalleryTimeline.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import EventBlock from "./EventBlock";
import TimelineRail from "./TimelineRail";
import ScrollHint from "./ScrollHint";
import { useInfiniteEvents } from "./useInfiniteEvents";
import type { HydratedEvent, YearGroup, EventLocale } from "@/types/gallery";

interface GalleryTimelineProps {
  events: HydratedEvent[]; // already sorted descending
  yearGroups: YearGroup[];
  locale: EventLocale;
  scrollHintLabel: string;
  emptyStateLabel: string;
}

const GalleryTimeline: React.FC<GalleryTimelineProps> = ({
  events,
  yearGroups,
  locale,
  scrollHintLabel,
  emptyStateLabel,
}) => {
  const { renderedCount, setSentinel } = useInfiniteEvents(events.length);
  const [activeYear, setActiveYear] = useState<number | null>(
    events[0]?.year ?? null
  );
  const eventRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Track which event is in the viewport center to update active year on the rail
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const yearAttr = (visible[0].target as HTMLElement).dataset.year;
          if (yearAttr) setActiveYear(Number(yearAttr));
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    eventRefs.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [renderedCount]);

  if (events.length === 0) {
    return (
      <p className="text-center text-foreground/60 py-32">{emptyStateLabel}</p>
    );
  }

  const visibleEvents = events.slice(0, renderedCount);

  return (
    <>
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <div className="lg:grid lg:grid-cols-[8rem_1fr] lg:gap-12">
          <TimelineRail groups={yearGroups} activeYear={activeYear} />
          <div className="min-w-0">
            {visibleEvents.map((event) => (
              <div
                key={event.id}
                data-year={event.year}
                ref={(el) => {
                  if (el) eventRefs.current.set(event.id, el);
                  else eventRefs.current.delete(event.id);
                }}
              >
                <EventBlock event={event} locale={locale} />
              </div>
            ))}
            {renderedCount < events.length && (
              <div ref={setSentinel} aria-hidden className="h-10" />
            )}
          </div>
        </div>
      </div>
      <ScrollHint label={scrollHintLabel} />
    </>
  );
};

export default GalleryTimeline;
