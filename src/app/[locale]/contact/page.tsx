import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/common/siteDetails";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import FadeInView from "@/components/FadeInView";
import GeometricBg from "@/components/GeometricBg";
import ContactForm from "@/components/ContactForm";

/* ------------------------------------------------------------------ */
/*  Config — swap these for your real keys                             */
/* ------------------------------------------------------------------ */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "xwpkvqbj";
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAABkr3FWBGxH_yTjl";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

interface Props {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const tMeta = await getTranslations({
    locale,
    namespace: "metadata.contact",
  });
  const canonical = getCanonicalUrl(locale, "/contact");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls("/contact"),
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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ContactPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const tMeta = await getTranslations({
    locale,
    namespace: "metadata.contact",
  });
  const canonical = getCanonicalUrl(locale, "/contact");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: tMeta("title"),
      description: tMeta("description"),
      url: canonical,
      mainEntity: {
        "@type": "Organization",
        name: siteDetails.siteName,
        url: siteDetails.siteUrl,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@pvcon.in",
          availableLanguage: [
            "English",
            "German",
            "French",
            "Japanese",
            "Chinese",
          ],
        },
      },
    },
  ];

  const labels = {
    name: t("form.name"),
    company: t("form.company"),
    designation: t("form.designation"),
    email: t("form.email"),
    phone: t("form.phone"),
    message: t("form.message"),
    namePlaceholder: t("form.namePlaceholder"),
    companyPlaceholder: t("form.companyPlaceholder"),
    designationPlaceholder: t("form.designationPlaceholder"),
    emailPlaceholder: t("form.emailPlaceholder"),
    phonePlaceholder: t("form.phonePlaceholder"),
    messagePlaceholder: t("form.messagePlaceholder"),
    submit: t("form.submit"),
    submitting: t("form.submitting"),
    successHeading: t("form.successHeading"),
    successMessage: t("form.successMessage"),
    errorHeading: t("form.errorHeading"),
    errorMessage: t("form.errorMessage"),
    sendAnother: t("form.sendAnother"),
    required: t("form.required"),
    invalidEmail: t("form.invalidEmail"),
    captchaLabel: t("form.captchaLabel"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Full-height side-by-side layout ──────────────────── */}
      <section className="relative min-h-screen w-full max-w-7xl mx-auto flex flex-col lg:flex-row overflow-hidden px-3">
        <GeometricBg variant="hero" />

        {/* ── LEFT: Text / Info ──────────────────────────────── */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center max-md:items-center max-md:text-center max-md:pt-20">
          <FadeInView>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              {t("hero.tagline")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight mb-4 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-foreground-accent text-sm leading-relaxed max-w-md mb-10">
              {t("hero.subtitle")}
            </p>
          </FadeInView>

          {/* Contact info cards */}
          <FadeInView delay={0.15}>
            <div className="space-y-4 max-w-sm max-md:hidden">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">
                    {t("info.emailLabel")}
                  </p>
                  <a
                    href="mailto:info@pvcon.in"
                    className="text-sm text-foreground-accent hover:text-primary transition-colors"
                  >
                    info@pvcon.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">
                    {t("info.phoneLabel")}
                  </p>
                  <a
                    href="tel:+919967555213"
                    className="text-sm text-foreground-accent hover:text-primary transition-colors"
                  >
                    +91 99675 55213 | +91 99208 66833
                  </a>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>

        {/* ── RIGHT: Form ────────────────────────────────────── */}
        <div className="w-full lg:w-[58%] flex justify-end items-center lg:mt-20">
          <div className="w-full max-w-2xl mx-auto lg:mx-0">
            <FadeInView delay={0.1}>
              <ContactForm
                formspreeId={FORMSPREE_ID}
                turnstileSiteKey={TURNSTILE_SITE_KEY}
                labels={labels}
              />
            </FadeInView>
          </div>
        </div>
        <div className=" lg:hidden flex w-full justify-center mt-10">
          <FadeInView delay={0.15}>
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">
                    {t("info.emailLabel")}
                  </p>
                  <a
                    href="mailto:info@pvcon.in"
                    className="text-sm text-foreground-accent hover:text-primary transition-colors"
                  >
                    info@pvcon.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">
                    {t("info.phoneLabel")}
                  </p>
                  <a
                    href="tel:+919967555213"
                    className="text-sm text-foreground-accent hover:text-primary transition-colors"
                  >
                    +91 99675 55213 | +91 99208 66833
                  </a>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
