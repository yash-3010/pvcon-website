import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { companyConfig } from "@/data/company/config";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import GeometricBg from "@/components/GeometricBg";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import CtaCard from "@/components/CtaCard";
import WorldMapSvg from "@/components/WorldMapSvg";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const tMeta = await getTranslations({ locale, namespace: "metadata.company" });
  const canonical = getCanonicalUrl(locale, "/company");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls("/company"),
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
          url: `${siteDetails.siteUrl}/images/company-og.webp`,
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
      images: [`${siteDetails.siteUrl}/images/company-og.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CompanyPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "company" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.company" });
  const canonical = getCanonicalUrl(locale, "/company");

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
      "@type": "WebPage",
      name: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
    },
  ];

  /* Extract credential keys from the translation — the array is 0-indexed */
  const credentialKeys = companyConfig.teamMembers.length
    ? Array.from(
        { length: 6 },
        (_, i) => i,
      )
    : [];

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

      {/* ── CEO / Leadership Hero — Name left, Photo right ──── */}
      <section className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          {/* ── Text column (left) ─────────────────────────────── */}
          <div className="lg:w-1/2 px-8 py-16 lg:px-16 lg:py-28 flex flex-col justify-center">
            <FadeInView>
              <SectionLabel>{t("leadership.tag")}</SectionLabel>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-4 leading-tight">
                {t("leadership.ceo.name")}
              </h2>
              <p className="text-foreground-accent text-base md:text-lg">
                {t("leadership.ceo.title")}
              </p>
            </FadeInView>
          </div>

          {/* ── Photo column (right) ───────────────────────────── */}
          <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <FadeInView delay={0.1}>
              <div className="relative w-72 h-72 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] rounded-3xl overflow-hidden bg-secondary">
                <Image
                  src={companyConfig.ceoImageSrc}
                  alt={t("leadership.ceo.name")}
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 352px, 416px"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ── CEO Bio & Credentials ─────────────────────────────── */}
      <section className="relative py-16 lg:py-24 px-5 overflow-hidden border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <FadeInView>
            <div className="space-y-5 mb-12">
              <p className="text-foreground-accent leading-relaxed text-base">
                {t("leadership.ceo.message")}
              </p>
              <p className="text-foreground-accent leading-relaxed text-base">
                {t("leadership.ceo.message2")}
              </p>
            </div>
          </FadeInView>

          <FadeInView delay={0.15}>
            <ul className="space-y-3 border-t border-gray-100 pt-10">
              {credentialKeys.map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-foreground-accent text-sm"
                >
                  <svg
                    className="w-4 h-4 text-primary mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {t(`leadership.ceo.credentials.${i}`)}
                </li>
              ))}
            </ul>
          </FadeInView>
        </div>
      </section>

      {/* ── Global Presence Section ───────────────────────────── */}
      <section className="relative py-16 lg:py-28 px-5 overflow-hidden">
        <GeometricBg />

        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <SectionLabel center>{t("globalPresence.tag")}</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-4">
              {t("globalPresence.heading")}
            </h2>
            <p className="text-foreground-accent text-center max-w-2xl mx-auto mb-14 text-sm leading-relaxed">
              {t("globalPresence.subtitle")}
            </p>
          </FadeInView>

          <FadeInView delay={0.15}>
            <WorldMapSvg />
          </FadeInView>

          {/* Stat cards */}
          <FadeInView delay={0.25}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 max-w-3xl mx-auto">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <p className="text-4xl md:text-5xl font-extrabold text-secondary mb-1">
                    {t(`globalPresence.stats.${i}.value`)}
                  </p>
                  <p className="text-foreground-accent text-sm">
                    {t(`globalPresence.stats.${i}.label`)}
                  </p>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── Team Section ──────────────────────────────────────── */}
      <section className="relative py-16 lg:py-28 px-5 overflow-hidden ">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <SectionLabel center>{t("team.tag")}</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-4">
              {t("team.heading")}
            </h2>
            <p className="text-foreground-accent text-center max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
              {t("team.subtitle")}
            </p>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
            {companyConfig.teamMembers.map((member, i) => (
              <FadeInView key={member.id} delay={i * 0.1}>
                <div className="flex flex-col items-center p-8 rounded-2xl bg-white border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all text-center">
                  {/* Photo / Placeholder */}
                  <div
                    className="w-[300px] h-[300px] rounded-lg overflow-hidden mb-5 border-2 border-gray-100"
                    style={{ backgroundColor: member.color }}
                  >
                    <Image
                      src={member.imageSrc}
                      alt={t(`team.members.${member.id}.name`)}
                      width={300}
                      height={300}
                      sizes="300px"
                      quality={80}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight mb-1">
                    {t(`team.members.${member.id}.name`)}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-3">
                    {t(`team.members.${member.id}.role`)}
                  </p>
                  <p className="text-foreground-accent text-sm leading-relaxed">
                    {t(`team.members.${member.id}.bio`)}
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
