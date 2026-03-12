import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteDetails } from "@/data/common/siteDetails";
import { serviceCategories } from "@/data/services/config";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import GeometricBg from "@/components/GeometricBg";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import CtaCard from "@/components/CtaCard";
import ServiceCard from "@/components/ServiceCard";
import { FiArrowRight, FiCpu, FiFileText, FiClock, FiGlobe } from "react-icons/fi";

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
const spotlightIcons = [FiCpu, FiFileText, FiClock, FiGlobe];

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

      {/* ── Stats Banner ─────────────────────────────────────── */}
      <section className="relative -mt-8 z-10 px-5">
        <div className="max-w-5xl mx-auto">
          <FadeInView>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden shadow-lg">
              {statKeys.map((key) => (
                <div key={key} className="bg-secondary text-center py-8 px-4">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {t(`stats.${key}.value`)}
                  </div>
                  <div className="text-white/60 text-xs uppercase tracking-widest font-medium">
                    {t(`stats.${key}.label`)}
                  </div>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

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

      {/* ── PSMF Manager Product Spotlight ────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Navy background with grid pattern (matching CtaCard) */}
        <div
          className="absolute inset-0 -z-10 bg-[#202f63]
            bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
            bg-[size:5rem_5rem]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_50%,#92b35315,transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto px-5 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <div className="lg:w-3/5">
              <FadeInView>
                <div className="flex items-center gap-3 mb-6">
                  <SectionLabel light>{t("productSpotlight.tag")}</SectionLabel>
                  <span className="text-[10px] font-bold mb-3 uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full">
                    {t("productSpotlight.badge")}
                  </span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                  {t("productSpotlight.heading")}
                </h2>
                <p className="text-white/70 text-base leading-relaxed mb-8 max-w-xl">
                  {t("productSpotlight.description")}
                </p>
              </FadeInView>

              <FadeInView delay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {(["01", "02", "03", "04"] as const).map((key, i) => {
                    const Icon = spotlightIcons[i];
                    return (
                      <div key={key} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-white/90 text-sm font-medium">
                          {t(`productSpotlight.features.${key}`)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </FadeInView>

              <FadeInView delay={0.25}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/services/psmf"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-accent text-black font-semibold px-8 py-3 rounded-full transition-colors"
                  >
                    {t("productSpotlight.cta")}
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={t("productSpotlight.secondaryUrl")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3 rounded-full transition-colors"
                  >
                    {t("productSpotlight.secondaryCta")} ↗
                  </a>
                </div>
              </FadeInView>
            </div>

            {/* Visual column — platform preview mockup */}
            <div className="lg:w-2/5">
              <FadeInView delay={0.2}>
                <div className="relative">
                  {/* Browser-like mockup frame */}
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                      <div className="w-3 h-3 rounded-full bg-red-400/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                      <div className="w-3 h-3 rounded-full bg-green-400/60" />
                      <div className="ml-4 flex-1 h-6 rounded-md bg-white/10 flex items-center px-3">
                        <span className="text-white/40 text-[10px] font-mono">psmfmanager.com</span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {/* Mock dashboard content */}
                      <div className="flex items-center justify-between">
                        <div className="h-4 w-32 rounded bg-white/10" />
                        <div className="flex gap-2">
                          <div className="h-6 w-6 rounded bg-primary/30" />
                          <div className="h-6 w-6 rounded bg-white/10" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-16 rounded-lg bg-primary/15 flex flex-col items-center justify-center">
                          <div className="text-primary text-xs font-bold">98%</div>
                          <div className="text-white/30 text-[8px]">Compliance</div>
                        </div>
                        <div className="h-16 rounded-lg bg-white/10 flex flex-col items-center justify-center">
                          <div className="text-white/70 text-xs font-bold">v3.2</div>
                          <div className="text-white/30 text-[8px]">Current</div>
                        </div>
                        <div className="h-16 rounded-lg bg-white/10 flex flex-col items-center justify-center">
                          <div className="text-white/70 text-xs font-bold">24</div>
                          <div className="text-white/30 text-[8px]">Changes</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 rounded bg-white/10 w-full" />
                        <div className="h-3 rounded bg-white/10 w-4/5" />
                        <div className="h-3 rounded bg-primary/20 w-3/5" />
                        <div className="h-3 rounded bg-white/10 w-full" />
                        <div className="h-3 rounded bg-white/10 w-2/3" />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <div className="h-8 flex-1 rounded-lg bg-primary/25 flex items-center justify-center">
                          <span className="text-primary text-[10px] font-bold">Generate PDF</span>
                        </div>
                        <div className="h-8 flex-1 rounded-lg bg-white/10 flex items-center justify-center">
                          <span className="text-white/40 text-[10px] font-bold">Review Changes</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glow behind mockup */}
                  <div
                    className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                  />
                </div>
              </FadeInView>
            </div>
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
            ctaHref="/#cta"
          />
        </div>
      </section>
    </>
  );
}
