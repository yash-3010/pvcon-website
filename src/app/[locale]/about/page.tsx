import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { aboutConfig } from "@/data/about/config";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import GeometricBg from "@/components/GeometricBg";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import CtaCard from "@/components/CtaCard";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const tMeta = await getTranslations({ locale, namespace: "metadata.about" });
  const canonical = getCanonicalUrl(locale, "/about");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls("/about"),
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
          url: `${siteDetails.siteUrl}/images/about-og.webp`,
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
      images: [`${siteDetails.siteUrl}/images/about-og.webp`],
    },
    robots: { index: true, follow: true },
  };
}

const coreValueKeys = ["01", "02", "03", "04"] as const;

export default async function AboutPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "about" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.about" });
  const canonical = getCanonicalUrl(locale, "/about");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
      logo: `${siteDetails.siteUrl}/images/logo.webp`,
      description: tMeta("description"),
      sameAs: ["https://linkedin.com/company/pvcon"],
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
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

      {/* ── Hero Section ─────────────────────────────────────── */}
      <PageHero
        label={t("hero.tagline")}
        heading={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* ── Who We Are — Image Left, Text Right ──────────────── */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative items-center flex min-h-[400px] lg:min-h-[600px] lg:p-8 md:p-8">
            <Image
              src={aboutConfig.storyImageSrc}
              alt={t("images.aboutAlt")}
              width={384}
              height={200}
              quality={80}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover mx-auto"
              loading="lazy"
            />
          </div>

          <div className="lg:w-1/2 px-8 py-16 lg:px-16 lg:py-24 flex flex-col justify-center relative">
            <div
              className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full border border-white/10"
              aria-hidden="true"
            />

            <FadeInView>
              <SectionLabel>{t("whoWeAre.tag")}</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-10">
                {t("whoWeAre.heading")}
              </h2>
            </FadeInView>

            <FadeInView delay={0.15}>
              <div className="border-l-2 border-white/20 space-y-5">
                <p className="text-foreground-accent leading-relaxed text-base">
                  {t("whoWeAre.story.p1")}
                </p>
                <p className="text-foreground-accent leading-relaxed text-base">
                  {t("whoWeAre.story.p2")}
                </p>
                <p className="text-foreground-accent leading-relaxed text-base">
                  {t("whoWeAre.story.p3")}
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ── Our Approach — Text Left, Image Right ────────────── */}
      <section className="relative py-16 lg:py-28 px-5 overflow-hidden">
        <GeometricBg />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="flex-1">
            <FadeInView>
              <SectionLabel>{t("approach.tag")}</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
                {t("approach.heading")}
              </h2>
            </FadeInView>

            <FadeInView delay={0.15}>
              <div className="space-y-5">
                <p className="text-foreground-accent text-base leading-relaxed">
                  {t("approach.p1")}
                </p>
                <p className="text-foreground-accent text-base leading-relaxed">
                  {t("approach.p2")}
                </p>
                <p className="text-foreground-accent text-base leading-relaxed">
                  {t("approach.p3")}
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.25}>
              <div className="mt-8">
                <Link
                  href="/#cta"
                  className="inline-flex bg-secondary hover:bg-secondary/90 text-white font-semibold px-7 py-3 rounded-full transition-colors text-xs uppercase tracking-[0.15em]"
                >
                  {t("buttons.workWithUs")}
                </Link>
              </div>
            </FadeInView>
          </div>

          <div className="flex-1">
            <Image
              src={aboutConfig.approachImageSrc}
              alt={t("images.teamAlt")}
              width={800}
              height={600}
              quality={80}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-lg object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── Why Choose PVCON ─────────────────────────────────── */}
      <section className="relative py-16 lg:py-28 px-5 overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <SectionLabel center>{t("whyChoose.tag")}</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-6">
              {t("whyChoose.heading")}
            </h2>
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <p className="text-foreground-accent leading-relaxed text-sm">
                {t("whyChoose.intro.p1")}
              </p>
              <p className="text-foreground-accent leading-relaxed text-sm">
                {t("whyChoose.intro.p2")}
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
            {coreValueKeys.map((key, i) => (
              <FadeInView key={key} delay={i * 0.1}>
                <div className="relative p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                      {key}
                    </span>
                    <h3 className="text-2xl font-bold uppercase tracking-tight">
                      {t(`whyChoose.${key}.title`)}
                    </h3>
                  </div>
                  <p className="text-foreground-accent leading-relaxed text-sm">
                    {t(`whyChoose.${key}.description`)}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="px-5 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <CtaCard
            heading={t("cta.heading")}
            description={t("cta.text")}
            ctaLabel={t("buttons.getInTouch")}
            ctaHref="/#cta"
          />
        </div>
      </section>
    </>
  );
}
