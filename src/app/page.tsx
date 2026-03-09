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
    sameAs: [
      "https://www.linkedin.com/company/pvcon",
    ],
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

const HomePage: React.FC = () => {
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
          title="Pricing"
          description="Flexible plans tailored to your pharmacovigilance needs."
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
