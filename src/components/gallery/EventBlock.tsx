// src/components/gallery/EventBlock.tsx
"use client";

import React, { useState } from "react";
import FeaturedPhotoLayout from "./FeaturedPhotoLayout";
import GalleryLightbox from "./GalleryLightbox";
import type { GalleryImage } from "./GalleryGrid";
import type { HydratedEvent, EventLocale, HydratedImage } from "@/types/gallery";

interface EventBlockProps {
  event: HydratedEvent;
  locale: EventLocale;
}

function pickLocalized(
  value: { en: string } & Partial<Record<EventLocale, string>>,
  locale: EventLocale
) {
  return value[locale] ?? value.en;
}

function formatDate(dateIso: string, locale: EventLocale) {
  try {
    return new Date(dateIso)
      .toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  } catch {
    return dateIso;
  }
}

/**
 * One event row: eyebrow (date · location), title, description, photo layout.
 * Maintains its own lightbox state. The lightbox sees only this event's photos.
 */
const EventBlock: React.FC<EventBlockProps> = ({ event, locale }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allPhotos: HydratedImage[] = [event.featuredImage, ...event.images];
  const lightboxImages: GalleryImage[] = allPhotos.map((p) => ({
    src: p.src,
    width: p.width,
    height: p.height,
    aspectRatio: p.height ? p.width / p.height : 1.5,
    blurDataURL: p.blurDataURL,
    slug: p.src,
    title: p.alt,
    description: "",
  }));

  return (
    <article data-event-year={event.year} className="py-16 lg:py-24 first:pt-0">
      <p className="text-xs lg:text-sm uppercase tracking-[0.2em] text-primary font-medium">
        {formatDate(event.date, locale)} · {event.location}
      </p>
      <h2 className="mt-4 font-serif text-3xl lg:text-5xl leading-tight text-foreground">
        {pickLocalized(event.title, locale)}
      </h2>
      <p className="mt-5 max-w-2xl text-base lg:text-lg text-foreground/70 leading-relaxed">
        {pickLocalized(event.description, locale)}
      </p>

      {allPhotos.length > 0 && (
        <FeaturedPhotoLayout
          featured={event.featuredImage}
          thumbnails={event.images}
          onPhotoClick={(idx) => setLightboxIndex(idx)}
        />
      )}

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onNavigate={(i) => setLightboxIndex(i)}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </article>
  );
};

export default EventBlock;
