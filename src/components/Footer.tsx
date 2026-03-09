import Link from "next/link";
import React from "react";

import { siteDetails } from "@/data/siteDetails";
import { footerDetails } from "@/data/footer";
import { getPlatformIconByName } from "@/utils";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#202f63] text-white py-14">
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
            <span className="text-xl font-semibold cursor-pointer">
              {siteDetails.siteName}
            </span>
          </Link>
          <p className="mt-3.5 text-white/60 text-sm leading-relaxed">
            {footerDetails.subheading}
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-5 text-white/50">Quick Links</h2>
          <ul>
            {footerDetails.quickLinks.map((link) => (
              <li key={link.text} className="mb-2.5">
                <Link href={link.url} className="text-white/70 hover:text-white text-sm transition-colors">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-5 text-white/50">Contact Us</h2>

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
      <div className="mt-10 border-t border-white/10 pt-6 md:text-center text-white/40 text-sm px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
