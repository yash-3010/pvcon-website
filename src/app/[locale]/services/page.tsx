import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { serviceCategories } from "@/data/services/config";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import GeometricBg from "@/components/GeometricBg";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import CtaCard from "@/components/CtaCard";
import ServiceCard from "@/components/ServiceCard";



interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const tMeta = await getTranslations({ locale, namespace: "metadata.services" });
  const canonical = getCanonicalUrl(locale, "/services");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls("/services"),
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

const statKeys = ["01", "02", "03", "04"] as const;

export default async function ServicesPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "services" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.services" });
  const canonical = getCanonicalUrl(locale, "/services");

  /* Only the 4 service categories (not the product) */
  const services = serviceCategories.filter((s) => !s.isProduct);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
      logo: `${siteDetails.siteUrl}/images/logo.svg`,
      description: tMeta("description"),
      sameAs: ["https://www.linkedin.com/company/pvcon-consulting"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <PageHero
        label={t("hero.tagline")}
        heading={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* ── Service Categories — 2×2 grid ────────────────────── */}
      <section className="relative py-20 lg:py-32 px-5 overflow-hidden">
        <GeometricBg />

        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <SectionLabel center>{t("categories.sectionLabel")}</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-4">
              {t("categories.heading")}
            </h2>
            <p className="text-foreground-accent text-center max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
              {t("categories.subtitle")}
            </p>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                icon={service.icon}
                title={t(`${service.slug}.title`)}
                description={t(`${service.slug}.description`)}
                subcategories={service.subcategories.map((sub) =>
                  t(`${service.slug}.subcategories.${sub.id}.title`)
                )}
                learnMoreLabel={t("learnMore")}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-5 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <CtaCard
            heading={t("servicesPageCta.heading")}
            description={t("servicesPageCta.text")}
            ctaLabel={t("servicesPageCta.button")}
            ctaHref="/contact"
          />
        </div>
      </section>
    </>
  );
}
