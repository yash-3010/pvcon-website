import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import LegalPage from "@/components/LegalPage";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const tMeta = await getTranslations({ locale, namespace: "metadata.terms" });
  const canonical = getCanonicalUrl(locale, "/terms-of-service");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls("/terms-of-service"),
    },
    openGraph: {
      title: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
      siteName: siteDetails.siteName,
      type: "website",
      locale,
    },
    robots: { index: true, follow: true },
  };
}

export default async function TermsOfServicePage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.terms" });
  const canonical = getCanonicalUrl(locale, "/terms-of-service");
  const sections = t.raw("sections") as Array<{ title: string; content: string }>;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
      inLanguage: locale,
      isPartOf: {
        "@type": "WebSite",
        name: siteDetails.siteName,
        url: siteDetails.siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteDetails.siteUrl },
        { "@type": "ListItem", position: 2, name: "Terms of Service", item: canonical },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalPage
        label={t("hero.label")}
        heading={t("hero.heading")}
        subtitle={t("hero.subtitle")}
        lastUpdated={t("lastUpdated")}
        sections={sections}
      />
    </>
  );
}
