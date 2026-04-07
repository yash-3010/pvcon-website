// src/components/gallery/FeaturedPhotoLayout.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { HydratedImage } from "@/types/gallery";

interface FeaturedPhotoLayoutProps {
  featured: HydratedImage;
  thumbnails: HydratedImage[]; // up to 4 displayed
  onPhotoClick: (index: number) => void; // index 0 = featured, 1..N = thumbnails
}

/**
 * Layout: large hero on the left (60% width on lg+), 2x2 thumbnail grid on the right.
 * Stacks vertically on mobile. Click any photo invokes onPhotoClick.
 */
const FeaturedPhotoLayout: React.FC<FeaturedPhotoLayoutProps> = ({
  featured,
  thumbnails,
  onPhotoClick,
}) => {
  const visibleThumbs = thumbnails.slice(0, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mt-8">
      {/* Featured hero */}
      <button
        type="button"
        onClick={() => onPhotoClick(0)}
        className="lg:col-span-3 group relative overflow-hidden rounded-lg aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Image
          src={featured.src}
          alt={featured.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          placeholder={featured.blurDataURL ? "blur" : "empty"}
          blurDataURL={featured.blurDataURL || undefined}
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>

      {/* Thumbnail grid */}
      {visibleThumbs.length > 0 && (
        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          {visibleThumbs.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => onPhotoClick(i + 1)}
              className="group relative overflow-hidden rounded-lg aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                placeholder={img.blurDataURL ? "blur" : "empty"}
                blurDataURL={img.blurDataURL || undefined}
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedPhotoLayout;
