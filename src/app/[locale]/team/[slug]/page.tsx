import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { getTeamMemberBySlug, getAllTeamSlugs } from "@/data/team/config";
import { routing } from "@/i18n/routing";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import GeometricBg from "@/components/GeometricBg";
import SectionLabel from "@/components/SectionLabel";
import CtaCard from "@/components/CtaCard";

interface Props {
  params: { locale: string; slug: string };
}

/* ── Static Params ──────────────────────────────────────── */
export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllTeamSlugs().map((slug) => ({ locale, slug })),
  );
}

/* ── SEO Metadata ───────────────────────────────────────── */
export async function generateMetadata({
  params: { locale, slug },
}: Props): Promise<Metadata> {
  const member = getTeamMemberBySlug(slug);
  if (!member) return {};

  const t = await getTranslations({ locale, namespace: "team" });
  const canonical = getCanonicalUrl(locale, `/team/${slug}`);

  const title = t(`members.${slug}.meta.title`);
  const description = t(`members.${slug}.meta.description`);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getAlternateUrls(`/team/${slug}`),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteDetails.siteName,
      type: "profile",
      locale,
      images: [
        {
          url: `${siteDetails.siteUrl}${member.imageSrc}`,
          width: 400,
          height: 400,
          alt: t(`members.${slug}.name`),
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`${siteDetails.siteUrl}${member.imageSrc}`],
    },
    robots: { index: true, follow: true },
  };
}

/* ── Page Component ─────────────────────────────────────── */
export default async function TeamMemberPage({
  params: { locale, slug },
}: Props) {
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  const t = await getTranslations({ locale, namespace: "team" });
  const tCta = await getTranslations({ locale, namespace: "company" });
  const canonical = getCanonicalUrl(locale, `/team/${slug}`);

  const name = t(`members.${slug}.name`);
  const role = t(`members.${slug}.role`);
  const organization = t(`members.${slug}.organization`);
  const fullBio = t(`members.${slug}.fullBio`);
  const experience = t.raw(`members.${slug}.experience`) as Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  const skills = t.raw(`members.${slug}.skills`) as string[];
  const qualifications = t.raw(`members.${slug}.qualifications`) as string[];
  const languages = t.raw(`members.${slug}.languages`) as string[];

  /* ── JSON-LD Person Schema for Google Knowledge Panel ── */
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": canonical,
    name,
    jobTitle: role,
    url: canonical,
    image: `${siteDetails.siteUrl}${member.imageSrc}`,
    description: t(`members.${slug}.meta.description`),
    worksFor: {
      "@type": "Organization",
      name: "PVCON Consulting Pvt Ltd",
      url: siteDetails.siteUrl,
      logo: `${siteDetails.siteUrl}/images/logo.webp`,
    },
    memberOf: {
      "@type": "Organization",
      name: "PVCON Consulting Pvt Ltd",
    },
    nationality: {
      "@type": "Country",
      name: member.nationality,
    },
    knowsLanguage: languages,
    knowsAbout: skills,
    alumniOf: qualifications
      .filter(
        (q) =>
          q.includes("University") ||
          q.includes("MSc") ||
          q.includes("HND") ||
          q.includes("PhD"),
      )
      .map((q) => ({
        "@type": "EducationalOrganization",
        name: q,
      })),
    ...(member.linkedIn ? { sameAs: [member.linkedIn] } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteDetails.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Company",
        item: `${siteDetails.siteUrl}/company`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: canonical,
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: t(`members.${slug}.meta.title`),
    description: t(`members.${slug}.meta.description`),
    url: canonical,
    mainEntity: { "@id": canonical },
    isPartOf: {
      "@type": "WebSite",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            personJsonLd,
            breadcrumbJsonLd,
            webPageJsonLd,
          ]),
        }}
      />
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-5 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <GeometricBg variant="hero" />
          {/* Back link */}
          <FadeInView>
            <Link
              href="/company"
              className="inline-flex items-center gap-2 text-sm text-foreground-accent hover:text-primary transition-colors mb-10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t("backToTeam")}
            </Link>
          </FadeInView>
          <div className="flex flex-col-reverse lg:flex-row items-center">
            {/* ── Text column (left) ─────────────────────────────── */}
            <div className="lg:w-1/2 px-8 py-16 text-center lg:text-left lg:px-0 lg:py-28 flex flex-col justify-center">
              <FadeInView>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground uppercase tracking-tight leading-[0.95] mb-4">
                  {name}
                </h1>
                <p className="text-primary font-semibold text-lg md:text-xl mb-2">
                  {role}
                </p>
                <p className="text-foreground-accent text-sm mb-6">
                  {organization} {member.location && `· ${member.location}`}
                </p>

                {/* LinkedIn */}
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground-accent hover:text-primary transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn Profile
                  </a>
                )}
              </FadeInView>
            </div>

            {/* ── Photo column (right) ───────────────────────────── */}
            <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
              <FadeInView>
                <div className="relative w-72 h-72 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] rounded-3xl overflow-hidden bg-secondary">
                  <Image
                    src={member.imageSrc}
                    alt={name}
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
        </div>
      </section>

      {/* ── About / Full Bio ─────────────────────────────── */}
      <section className="py-16 lg:py-24 px-5 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <FadeInView>
            <SectionLabel>{t("about")}</SectionLabel>
            <p className="text-foreground-accent leading-relaxed text-base mt-4">
              {fullBio}
            </p>
          </FadeInView>
        </div>
      </section>

      {/* ── Professional Experience ──────────────────────── */}
      <section className="relative py-16 lg:py-24 px-5 overflow-hidden bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <FadeInView>
            <SectionLabel>{t("experience")}</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-10 mt-2">
              {t("experience")}
            </h2>
          </FadeInView>

          <div className="space-y-0">
            {experience.map((exp, i) => (
              <FadeInView key={i} delay={i * 0.05}>
                <div className="relative pl-8 pb-10 border-l-2 border-gray-200 last:border-l-0 last:pb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-[-7px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-white" />

                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-1">
                    {exp.period}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mb-0.5">
                    {exp.title}
                  </h3>
                  <p className="text-sm font-semibold text-secondary mb-2">
                    {exp.company}
                  </p>
                  <p className="text-foreground-accent text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Expertise & Qualifications ──────────────── */}
      <section className="py-16 lg:py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Skills */}
            <FadeInView>
              <div className="group block h-full p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all bg-white">
                <SectionLabel>{t("skills")}</SectionLabel>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6 mt-2">
                  {t("skills")}
                </h2>
                <ul className="space-y-3">
                  {skills.map((skill, i) => (
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
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>

            {/* Qualifications */}
            <FadeInView delay={0.1}>
              <div className="group block h-full p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all bg-white">
                <SectionLabel>{t("qualifications")}</SectionLabel>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6 mt-2">
                  {t("qualifications")}
                </h2>
                <ul className="space-y-3">
                  {qualifications.map((qual, i) => (
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>
          </div>

          {/* Languages */}
          <FadeInView delay={0.15}>
            <div className="mt-12 pt-10 border-t border-gray-100">
              <h3 className="text-lg font-bold text-foreground mb-4">
                {t("languages")}
              </h3>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-foreground-accent border border-gray-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="px-5 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <CtaCard
            heading={tCta("cta.heading")}
            description={tCta("cta.text")}
            ctaLabel={tCta("buttons.getInTouch")}
            ctaHref="/#cta"
          />
        </div>
      </section>
    </>
  );
}
