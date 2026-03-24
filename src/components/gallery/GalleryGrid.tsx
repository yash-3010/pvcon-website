"use client";

import React, { useState } from "react";
import Image from "next/image";
import GalleryLightbox from "./GalleryLightbox";

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

interface GalleryGridProps {
  images: GalleryImage[];
}

/**
 * Masonry-style gallery grid.
 *
 * Uses CSS Grid with a fixed row height (10px increments).
 * Each image's row-span is calculated from its aspect ratio so portraits
 * naturally span more rows while landscapes stay compact.
 * A 6px gap between items creates the "frame" effect.
 */
const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-center text-foreground-accent py-20">
        No images available yet. Check back soon!
      </p>
    );
  }

  return (
    <>
      <div
        className="gallery-masonry"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gridAutoRows: "8px",
          gap: "6px",
        }}
      >
        {images.map((image, index) => {
          // Calculate row span based on aspect ratio
          // Lower aspect ratio = taller image = more rows
          // Base column width ~300px, row height 8px, gap 6px
          const columnWidth = 300;
          const imageHeight = columnWidth / image.aspectRatio;
          const rowSpan = Math.ceil(imageHeight / (8 + 6)) + 1;

          return (
            <div
              key={image.slug}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              style={{ gridRowEnd: `span ${rowSpan}` }}
              onClick={() => setSelectedIndex(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${image.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedIndex(index);
                }
              }}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={image.width}
                height={image.height}
                placeholder="blur"
                blurDataURL={image.blurDataURL}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    {image.title}
                  </p>
                  {image.description && (
                    <p className="text-white/70 text-xs mt-1 line-clamp-2">
                      {image.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <GalleryLightbox
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  );
};

export default GalleryGrid;
