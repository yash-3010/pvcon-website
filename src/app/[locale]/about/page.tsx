import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/siteDetails";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import PageWrapper from "@/components/PageWrapper";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  const canonical = getCanonicalUrl(locale, "/about");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls("/about"),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: siteDetails.siteName,
      type: "website",
      locale,
      images: [
        {
          url: "/images/about-og.webp",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/about-og.webp"],
    },
    robots: { index: true, follow: true },
  };
}

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
      <PageWrapper ariaLabel={t("ariaLabel")} id="about" as="section">
        <h1 className="text-4xl font-bold mb-6">{t("heading")}</h1>
        <p className="text-lg text-foreground-accent mb-4">{t("intro")}</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">{t("missionTitle")}</h2>
        <p className="text-lg text-foreground-accent">{t("mission")}</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">{t("whatWeDoTitle")}</h2>
        <p className="text-lg text-foreground-accent">{t("whatWeDo")}</p>
      </PageWrapper>
    </>
  );
}
