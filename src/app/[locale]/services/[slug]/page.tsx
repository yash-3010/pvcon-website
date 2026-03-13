import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services/config";
import { routing } from "@/i18n/routing";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import GeometricBg from "@/components/GeometricBg";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import CtaCard from "@/components/CtaCard";
import SubServiceCard from "@/components/SubServiceCard";
import { FiShield, FiLock, FiCloud, FiFileText, FiCpu, FiGlobe, FiClock, FiGitBranch, FiDatabase, FiZap } from "react-icons/fi";

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllServiceSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const tMeta = await getTranslations({ locale, namespace: `metadata.services.${slug}` });
  const canonical = getCanonicalUrl(locale, `/services/${slug}`);

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls(`/services/${slug}`),
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

const whyPointKeys = ["01", "02", "03"] as const;
const featureIcons = [FiCpu, FiGlobe, FiClock, FiGitBranch, FiDatabase, FiZap];
const certIcons = [FiShield, FiFileText, FiShield, FiShield];
const securityIcons = [FiLock, FiShield, FiCloud, FiFileText];

export default async function ServiceDetailPage({ params: { locale, slug } }: Props) {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: `services.${slug}` });
  const tMeta = await getTranslations({ locale, namespace: `metadata.services.${slug}` });
  const canonical = getCanonicalUrl(locale, `/services/${slug}`);

  const isProduct = service.isProduct === true;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
      logo: `${siteDetails.siteUrl}/images/logo.webp`,
    },
    {
      "@context": "https://schema.org",
      "@type": isProduct ? "SoftwareApplication" : "Service",
      name: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
      ...(isProduct
        ? { applicationCategory: "BusinessApplication", operatingSystem: "Web" }
        : {}),
      provider: {
        "@type": "Organization",
        name: siteDetails.siteName,
        url: siteDetails.siteUrl,
      },
    },
  ];

  /* ── PSMF Manager Product Page ─────────────────────────── */
  if (isProduct) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Hero */}
        <PageHero label={t("hero.tagline")} heading={t("hero.title")} subtitle={t("hero.subtitle")} />

        {/* Overview */}
        <section className="relative py-16 lg:py-28 px-5 overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInView>
              <SectionLabel center>{t("overview.tag")}</SectionLabel>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-8">
                {t("overview.heading")}
              </h2>
            </FadeInView>
            <FadeInView delay={0.15}>
              <p className="text-foreground-accent text-base leading-relaxed mb-5">{t("overview.p1")}</p>
              <p className="text-foreground-accent text-base leading-relaxed">{t("overview.p2")}</p>
            </FadeInView>
          </div>
        </section>

        {/* Features — alternating left/right layout */}
        <section className="relative py-16 lg:py-28 px-5 overflow-hidden bg-gray-50">
          <GeometricBg />
          <div className="max-w-7xl mx-auto">
            <FadeInView>
              <SectionLabel center>{t("features.tag")}</SectionLabel>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-16">
                {t("features.heading")}
              </h2>
            </FadeInView>

            <div className="space-y-8">
              {(["01", "02", "03", "04", "05", "06"] as const).map((key, i) => {
                const Icon = featureIcons[i];
                const isEven = i % 2 === 0;
                return (
                  <FadeInView key={key} delay={i * 0.08}>
                    <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all`}>
                      <div className="lg:w-1/6 flex justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className="lg:w-5/6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl font-bold text-primary/20">{key}</span>
                          <h3 className="text-lg font-bold uppercase tracking-tight">{t(`features.items.${key}.title`)}</h3>
                        </div>
                        <p className="text-foreground-accent text-sm leading-relaxed">{t(`features.items.${key}.description`)}</p>
                      </div>
                    </div>
                  </FadeInView>
                );
              })}
            </div>
          </div>
        </section>

        {/* Compliance & Security */}
        <section className="relative py-16 lg:py-28 px-5 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <FadeInView>
              <SectionLabel center>{t("compliance.tag")}</SectionLabel>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-16">
                {t("compliance.heading")}
              </h2>
            </FadeInView>

            {/* Certifications */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {(["01", "02", "03", "04"] as const).map((key, i) => {
                const Icon = certIcons[i];
                return (
                  <FadeInView key={`cert-${key}`} delay={i * 0.08}>
                    <div className="text-center p-6 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/30 transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                        <Icon className="w-6 h-6 text-secondary group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-tight mb-2">{t(`compliance.certifications.${key}.title`)}</h3>
                      <p className="text-foreground-accent text-xs leading-relaxed">{t(`compliance.certifications.${key}.description`)}</p>
                    </div>
                  </FadeInView>
                );
              })}
            </div>

            {/* Security */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(["01", "02", "03", "04"] as const).map((key, i) => {
                const Icon = securityIcons[i];
                return (
                  <FadeInView key={`sec-${key}`} delay={i * 0.08}>
                    <div className="text-center p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-tight mb-2">{t(`compliance.security.${key}.title`)}</h3>
                      <p className="text-foreground-accent text-xs leading-relaxed">{t(`compliance.security.${key}.description`)}</p>
                    </div>
                  </FadeInView>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA — product-specific with two buttons */}
        <section className="px-5 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden py-16 sm:py-24 px-8">
              <div
                className="absolute inset-0 -z-10 bg-[#202f63] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:5rem_5rem]"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,#92b35320,transparent)]" />
              </div>
              <div className="flex flex-col items-center text-center text-white">
                <FadeInView>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-2xl">
                    {t("cta.heading")}
                  </h2>
                  <p className="mx-auto max-w-xl md:px-5 text-white/70 mb-8">{t("cta.text")}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/#cta"
                      className="inline-flex bg-primary hover:bg-primary-accent text-black font-semibold px-8 py-3 rounded-full transition-colors"
                    >
                      {t("cta.button")}
                    </a>
                    <a
                      href={t("cta.secondaryUrl")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3 rounded-full transition-colors"
                    >
                      {t("cta.secondaryButton")} ↗
                    </a>
                  </div>
                </FadeInView>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ── Standard Service Detail Page ──────────────────────── */
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
              <p className="text-foreground-accent text-base leading-relaxed">{t("overview.p1")}</p>
              <p className="text-foreground-accent text-base leading-relaxed">{t("overview.p2")}</p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="relative py-16 lg:py-28 px-5 overflow-hidden bg-gray-50">
        <GeometricBg />
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <SectionLabel center>{t("subcategories.sectionLabel")}</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-16">
              {t("subcategories.heading")}
            </h2>
          </FadeInView>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.subcategories.map((sub, i) => (
              <SubServiceCard
                key={sub.id}
                index={i}
                title={t(`subcategories.${sub.id}.title`)}
                description={t(`subcategories.${sub.id}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PVCON */}
      <section className="relative py-16 lg:py-28 px-5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <SectionLabel center>{t("whyPvcon.tag")}</SectionLabel>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-16">
              {t("whyPvcon.heading")}
            </h2>
          </FadeInView>
          <div className="grid md:grid-cols-3 gap-8">
            {whyPointKeys.map((key, i) => (
              <FadeInView key={key} delay={i * 0.1}>
                <div className="relative p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group h-full">
                  <span className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">{key}</span>
                  <h3 className="text-xl font-bold uppercase tracking-tight mt-4 mb-3">{t(`whyPvcon.points.${key}.title`)}</h3>
                  <p className="text-foreground-accent text-sm leading-relaxed">{t(`whyPvcon.points.${key}.description`)}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <CtaCard heading={t("cta.heading")} description={t("cta.text")} ctaLabel={t("cta.button")} ctaHref="/#cta" />
        </div>
      </section>
    </>
  );
}
