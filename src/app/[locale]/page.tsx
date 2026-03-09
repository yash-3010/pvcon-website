import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import { siteDetails } from "@/data/siteDetails";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: getCanonicalUrl(locale, ""),
      languages: getAlternateUrls(""),
    },
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  const tPricing = await getTranslations({ locale, namespace: "pricing" });
  const tTestimonials = await getTranslations({ locale, namespace: "testimonials" });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
      logo: `${siteDetails.siteUrl}/images/logo.webp`,
      description: siteDetails.metadata.description,
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@pvcon.in",
        contactType: "customer service",
      },
      sameAs: ["https://www.linkedin.com/company/pvcon"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
      description: siteDetails.metadata.description,
      serviceType: [
        "Pharmacovigilance Consulting",
        "GxP Auditing",
        "QPPV Services",
        "PSMF Management",
        "Regulatory Compliance",
        "Signal Detection",
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Logos />
      <Container>
        <Benefits />

        <Section
          id="pricing"
          title={tPricing("sectionTitle")}
          description={tPricing("sectionDescription")}
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title={tTestimonials("sectionTitle")}
          description={tTestimonials("sectionDescription")}
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
      </Container>
    </>
  );
}
