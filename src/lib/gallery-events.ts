// src/lib/gallery-events.ts
import eventsData from "@/data/gallery/events.json";
import imagesData from "@/data/gallery/images.json";
import type {
  GalleryEvent,
  HydratedEvent,
  HydratedImage,
  YearGroup,
} from "@/types/gallery";

const RAIL_START_YEAR = 2012;
const RAIL_END_YEAR = 2025;

type RawImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  title: string;
};

const imageIndex: Map<string, RawImage> = new Map(
  (imagesData as RawImage[]).map((img) => [img.src, img])
);

function hydrateImage(src: string, alt: string): HydratedImage {
  const found = imageIndex.get(src);
  if (!found) {
    // Fallback to safe defaults if metadata missing
    return { src, alt, width: 1200, height: 800, blurDataURL: "" };
  }
  return {
    src,
    alt,
    width: found.width,
    height: found.height,
    blurDataURL: found.blurDataURL,
  };
}

export function getHydratedEvents(): HydratedEvent[] {
  const raw = eventsData as GalleryEvent[];
  return raw
    .map((e) => ({
      ...e,
      featuredImage: hydrateImage(e.featuredImage, e.title.en),
      images: e.images.map((img) => hydrateImage(img.src, img.alt)),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // descending
}

/**
 * Returns one entry per year from RAIL_END_YEAR down to RAIL_START_YEAR.
 * Years with no events have an empty `events` array (rendered dimmed).
 */
export function getYearGroups(events: HydratedEvent[]): YearGroup[] {
  const byYear = new Map<number, HydratedEvent[]>();
  for (const event of events) {
    const list = byYear.get(event.year) ?? [];
    list.push(event);
    byYear.set(event.year, list);
  }
  const groups: YearGroup[] = [];
  for (let y = RAIL_END_YEAR; y >= RAIL_START_YEAR; y--) {
    groups.push({ year: y, events: byYear.get(y) ?? [] });
  }
  return groups;
}
