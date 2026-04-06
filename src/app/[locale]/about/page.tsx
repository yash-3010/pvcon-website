import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { aboutConfig } from "@/data/about/config";
import { companyConfig } from "@/data/company/config";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import GeometricBg from "@/components/GeometricBg";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import CtaCard from "@/components/CtaCard";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
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
  const tCompany = await getTranslations({ locale, namespace: "company" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.about" });
  const canonical = getCanonicalUrl(locale, "/about");

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

      {/* ── Leadership / CEO ────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          {/* Photo column (left) */}
          <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <FadeInView>
              
                <div className=" min-h-[400px] lg:min-h-[600px]">
                  <Image
                    src={companyConfig.ceoImageSrc}
                    alt={tCompany("leadership.ceo.name")}
                    width={384}
                    height={200}
                    quality={80}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover mx-auto"
                    loading="lazy"
                  />
                </div>
            </FadeInView>
          </div>

          {/* Bio & Credentials column (right) */}
          <div className="lg:w-1/2 px-8 py-16 lg:px-16 lg:py-24 flex flex-col justify-center">
            <FadeInView delay={0.1}>
              <SectionLabel>{tCompany("leadership.tag")}</SectionLabel>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-2 leading-tight">
                {tCompany("leadership.ceo.name")}
              </h2>
              <p className="text-foreground-accent text-base md:text-lg mb-8">
                {tCompany("leadership.ceo.title")}
              </p>
            </FadeInView>

            <FadeInView delay={0.2}>
              <div className="space-y-5 mb-10">
                <p className="text-foreground-accent leading-relaxed text-base">
                  {tCompany("leadership.ceo.message")}
                </p>
                <p className="text-foreground-accent leading-relaxed text-base">
                  {tCompany("leadership.ceo.message2")}
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <ul className="space-y-3 border-t border-gray-200 pt-8">
                {Array.from({ length: 6 }, (_, i) => (
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
                    {tCompany(`leadership.ceo.credentials.${i}`)}
                  </li>
                ))}
              </ul>
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
                  href="/contact"
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
            ctaHref="/contact"
          />
        </div>
      </section>
    </>
  );
}
