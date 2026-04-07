import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import PageHero from "@/components/PageHero";
import GeometricBg from "@/components/GeometricBg";
import GalleryTimeline from "@/components/gallery/GalleryTimeline";
import { getHydratedEvents } from "@/lib/gallery-events";
import type { EventLocale } from "@/types/gallery";
import galleryImages from "@/data/gallery/images.json";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const tMeta = await getTranslations({ locale, namespace: "metadata.gallery" });
  const canonical = getCanonicalUrl(locale, "/gallery");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls("/gallery"),
    },
    openGraph: {
      title: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
      siteName: siteDetails.siteName,
      type: "website",
      locale,
      images: [
        {
          url: `${siteDetails.siteUrl}/images/gallery-og.webp`,
          width: 1200,
          height: 630,
          alt: tMeta("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tMeta("title"),
      description: tMeta("description"),
      images: [`${siteDetails.siteUrl}/images/gallery-og.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function GalleryPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "gallery" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.gallery" });
  const canonical = getCanonicalUrl(locale, "/gallery");

  const events = getHydratedEvents();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
      logo: siteDetails.siteLogoUrl,
      description: tMeta("description"),
      sameAs: ["https://www.linkedin.com/company/pvcon-consulting"],
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
      image: galleryImages.map((img) => ({
        "@type": "ImageObject",
        url: `${siteDetails.siteUrl}${img.src}`,
        width: img.width,
        height: img.height,
        name: img.title,
        description: img.description || img.title,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        label={t("hero.tagline")}
        heading={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="relative py-12 lg:py-24 overflow-hidden">
        <GeometricBg />
        <GalleryTimeline
          events={events}
          locale={locale as EventLocale}
          scrollHintLabel={t("timeline.scrollHint")}
          emptyStateLabel={t("timeline.emptyState")}
        />
      </section>
    </>
  );
}
