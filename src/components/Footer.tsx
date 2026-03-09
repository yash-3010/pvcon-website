import Link from "next/link";
import React from "react";
import { getTranslations } from "next-intl/server";
import { siteDetails } from "@/data/siteDetails";
import { footerDetails } from "@/data/footer";
import { getPlatformIconByName } from "@/utils";
import Image from "next/image";

const Footer: React.FC = async () => {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const quickLinks = [
    { text: tNav("services"), url: "/#services" },
    { text: tNav("about"), url: "/about" },
    { text: tNav("blog"), url: "/blog" },
  ];

  return (
    <footer className="bg-hero-background text-foreground py-10">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
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
            <span className="text-xl font-semibold text-foreground cursor-pointer">
              {siteDetails.siteName}
            </span>
          </Link>
          <p className="mt-3.5 text-foreground-accent">{t("subheading")}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">{t("quickLinksTitle")}</h2>
          <ul className="text-foreground-accent">
            {quickLinks.map((link) => (
              <li key={link.text} className="mb-2">
                <Link href={link.url} className="hover:text-foreground">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">{t("contactTitle")}</h2>
          {footerDetails.email && (
            <a href={`mailto:${footerDetails.email}`} className="block text-foreground-accent hover:text-foreground">
              {t("emailLabel")}: {footerDetails.email}
            </a>
          )}
          {footerDetails.telephone && (
            <a href={`tel:${footerDetails.telephone}`} className="block text-foreground-accent hover:text-foreground">
              {t("phoneLabel")}: {footerDetails.telephone}
            </a>
          )}
          {footerDetails.socials && (
            <div className="mt-5 flex items-center gap-5 flex-wrap">
              {Object.keys(footerDetails.socials).map((platformName) => {
                if (platformName && footerDetails.socials[platformName]) {
                  return (
                    <Link href={footerDetails.socials[platformName]} key={platformName} aria-label={platformName}>
                      {getPlatformIconByName(platformName)}
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 md:text-center text-foreground-accent px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. {t("copyright")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
