import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { getSubServiceById, getAllSubServiceParams } from "@/data/services/config";
import { routing } from "@/i18n/routing";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import CtaCard from "@/components/CtaCard";

interface Props {
  params: { locale: string; slug: string; subSlug: string };
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllSubServiceParams().map(({ slug, subSlug }) => ({ locale, slug, subSlug }))
  );
}

export async function generateMetadata({ params: { locale, slug, subSlug } }: Props): Promise<Metadata> {
  const subService = getSubServiceById(slug, subSlug);
  if (!subService) return {};

  const tMeta = await getTranslations({ locale, namespace: `metadata.services.${slug}.sub.${subSlug}` });
  const canonical = getCanonicalUrl(locale, `/services/${slug}/${subSlug}`);

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls(`/services/${slug}/${subSlug}`),
    },
    openGraph: {
      title: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
      siteName: siteDetails.siteName,
      type: "website",
      locale,
      images: [{ url: `${siteDetails.siteUrl}/images/og-image.webp`, width: 1200, height: 630, alt: tMeta("title") }],
    },
    twitter: {
      card: "summary_large_image",
      title: tMeta("title"),
      description: tMeta("description"),
      images: [`${siteDetails.siteUrl}/images/og-image.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function SubServicePage({ params: { locale, slug, subSlug } }: Props) {
  const subService = getSubServiceById(slug, subSlug);
  if (!subService) notFound();

  const t = await getTranslations({ locale, namespace: `services.${slug}.subPages.${subSlug}` });
  const tMeta = await getTranslations({ locale, namespace: `metadata.services.${slug}.sub.${subSlug}` });
  const canonical = getCanonicalUrl(locale, `/services/${slug}/${subSlug}`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
      logo: siteDetails.siteLogoUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
      provider: {
        "@type": "Organization",
        name: siteDetails.siteName,
        url: siteDetails.siteUrl,
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero label={t("hero.tagline")} heading={t("hero.title")} subtitle={t("hero.subtitle")} />

      {/* Overview */}
      <section className="relative py-16 lg:py-28 px-5 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <FadeInView>
            <SectionLabel>{t("overview.tag")}</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold uppercase tracking-tight mb-8">
              {t("overview.heading")}
            </h2>
          </FadeInView>
          <FadeInView delay={0.15}>
            <div className="space-y-5">
              <p className="text-foreground-accent text-base leading-relaxed">
                {t.rich("overview.p1", { strong: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong> })}
              </p>
              <p className="text-foreground-accent text-base leading-relaxed">
                {t.rich("overview.p2", { strong: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong> })}
              </p>
              <p className="text-foreground-accent text-base leading-relaxed">
                {t.rich("overview.p3", { strong: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong> })}
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <CtaCard heading={t("cta.heading")} description={t("cta.text")} ctaLabel={t("cta.button")} ctaHref="/contact" />
        </div>
      </section>
    </>
  );
}
