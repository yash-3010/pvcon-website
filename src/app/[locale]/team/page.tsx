import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { companyConfig } from "@/data/company/config";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import PageHero from "@/components/PageHero";
import CtaCard from "@/components/CtaCard";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const tMeta = await getTranslations({ locale, namespace: "metadata.team" });
  const canonical = getCanonicalUrl(locale, "/team");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls("/team"),
    },
    openGraph: {
      title: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
      siteName: siteDetails.siteName,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: tMeta("title"),
      description: tMeta("description"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function TeamPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "company" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.team" });
  const canonical = getCanonicalUrl(locale, "/team");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
      logo: `${siteDetails.siteUrl}/images/logo.svg`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        label={t("team.tag")}
        heading={t("team.heading")}
        subtitle={t("team.subtitle")}
      />

      {/* ── Team Grid ──────────────────────────────────────────── */}
      <section className="relative py-16 lg:pb-28 lg:pt-0 px-5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {companyConfig.teamMembers.map((member, i) => (
              <FadeInView key={member.id} delay={i * 0.1}>
                <Link
                  href={`/team/${member.id}`}
                  className="group flex flex-col items-center p-8 rounded-2xl bg-white border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all text-center"
                >
                  <div
                    className="w-[220px] h-[220px] rounded-xl overflow-hidden mb-5 border-2 border-gray-100 group-hover:border-primary/20 transition-colors"
                    style={{ backgroundColor: member.color }}
                  >
                    <Image
                      src={member.imageSrc}
                      alt={t(`team.members.${member.id}.name`)}
                      width={220}
                      height={220}
                      sizes="220px"
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
                  <p className="text-foreground-accent text-sm leading-relaxed mb-4">
                    {t(`team.members.${member.id}.bio`)}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    {t("team.viewProfile")}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
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
