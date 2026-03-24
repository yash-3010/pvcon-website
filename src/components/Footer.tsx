import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteDetails } from "@/data/common/siteDetails";
import { footerDetails } from "@/data/common/footer";
import { getPlatformIconByName } from "@/utils";

const Footer: React.FC = async () => {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const quickLinks = [
    { text: tNav("services"), url: "/services" },
    { text: tNav("about"), url: "/about" },
    { text: tNav("blog"), url: "/blog" },
  ];

  const legalLinks = [
    { text: t("legalLinks.privacy"), url: "/privacy-policy" },
    { text: t("legalLinks.terms"), url: "/terms-of-service" },
    { text: t("legalLinks.cookies"), url: "/cookie-policy" },
    { text: t("legalLinks.disclaimer"), url: "/disclaimer" },
    { text: t("legalLinks.impressum"), url: "/impressum" },
  ];

  return (
    <footer className="bg-[#202f63] text-white py-14">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.webp"
              width={38}
              height={28}
              quality={85}
              loading="lazy"
              alt={`${siteDetails.siteName} logo`}
              className="flex items-center mb-0.5 gap-2 invert"
            />
            <span className="text-xl font-semibold cursor-pointer">
              {siteDetails.siteName}
            </span>
          </Link>
          <p className="mt-3.5 text-white/60 text-sm leading-relaxed">
            {t("subheading")}
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-5 text-white/70">
            {t("quickLinksTitle")}
          </h2>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.text} className="mb-2.5">
                <Link href={link.url} className="text-white/70 hover:text-white text-sm transition-colors">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-5 text-white/70">
            {t("legalTitle")}
          </h2>
          <ul>
            {legalLinks.map((link) => (
              <li key={link.url} className="mb-2.5">
                <Link href={link.url} className="text-white/70 hover:text-white text-sm transition-colors">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-5 text-white/70">
            {t("contactTitle")}
          </h2>
          {footerDetails.email && (
            <a
              href={`mailto:${footerDetails.email}`}
              className="block text-white/70 hover:text-white text-sm transition-colors mb-2"
            >
              {footerDetails.email}
            </a>
          )}
          {footerDetails.telephone && (
            <a
              href={`tel:${footerDetails.telephone}`}
              className="block text-white/70 hover:text-white text-sm transition-colors"
            >
              {footerDetails.telephone}
            </a>
          )}
          {footerDetails.socials && (
            <div className="mt-5 flex items-center gap-4 flex-wrap">
              {Object.keys(footerDetails.socials).map((platformName) => {
                if (platformName && footerDetails.socials[platformName]) {
                  return (
                    <Link
                      href={footerDetails.socials[platformName]}
                      key={platformName}
                      aria-label={platformName}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {getPlatformIconByName(platformName)}
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 md:text-center text-white/80 text-sm px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. {t("copyright")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
