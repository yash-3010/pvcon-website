// src/types/gallery.ts
export type EventLocale = "en" | "de" | "es" | "fr" | "ja" | "zh";

export type LocalizedString = Partial<Record<EventLocale, string>> & { en: string };

export type EventImageRef = {
  /** Path matching an entry in src/data/gallery/images.json `src` field */
  src: string;
  alt: string;
};

export type GalleryEvent = {
  id: string;
  date: string; // YYYY-MM-DD
  year: number;
  location: string;
  title: LocalizedString;
  description: LocalizedString;
  featuredImage: string; // path matching images.json src
  images: EventImageRef[];
};

/** Image enriched with width/height/blurDataURL from images.json */
export type HydratedImage = EventImageRef & {
  width: number;
  height: number;
  blurDataURL: string;
};

export type HydratedEvent = Omit<GalleryEvent, "featuredImage" | "images"> & {
  featuredImage: HydratedImage;
  images: HydratedImage[];
};

/** A row in the rail: either an event group with hydrated events, or an empty year placeholder */
export type YearGroup = {
  year: number;
  events: HydratedEvent[]; // empty array means dimmed marker
};

/** Shape consumed by GalleryLightbox (kept stable for the existing component). */
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  blurDataURL: string;
  slug: string;
  title: string;
  description: string;
}
