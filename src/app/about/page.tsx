import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import { pageMetadata } from "@/data/pageMetadata";
import PageWrapper from "@/components/PageWrapper";

const page = pageMetadata.about;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: page.canonical,
  },
  openGraph: {
    title: page.title,
    description: page.description,
    url: page.canonical,
    siteName: siteDetails.siteName,
    type: "website",
    locale: siteDetails.locale,
    images: [
      {
        url: page.ogImage,
        width: 1200,
        height: 630,
        alt: page.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
    images: [page.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteDetails.siteName,
    url: siteDetails.siteUrl,
    logo: `${siteDetails.siteUrl}/images/logo.webp`,
    description: page.description,
    sameAs: ["https://linkedin.com/company/pvcon"],
  },
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: page.title,
    description: page.description,
    url: page.canonical,
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageWrapper ariaLabel="About PVCON" id="about" as="section">
        <h1 className="text-4xl font-bold mb-6">About PVCON</h1>
        <p className="text-lg text-foreground-accent mb-4">
          PVCON is a specialized pharmacovigilance consulting and audit firm...
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Our Mission</h2>
        <p className="text-lg text-foreground-accent">
          We empower life sciences organizations with regulatory excellence...
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">What We Do</h2>
        <p className="text-lg text-foreground-accent">
          From QPPV services to PSMF management and signal detection...
        </p>
      </PageWrapper>
    </>
  );
}
