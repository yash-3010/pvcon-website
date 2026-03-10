import { routing } from "@/i18n/routing";
import { siteDetails } from "@/data/siteDetails";

/** Resolves the site base URL from env or siteDetails fallback. */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || siteDetails.siteUrl;
}

/**
 * Builds hreflang alternate URLs for a given path.
 * Used in generateMetadata for all locale pages.
 *
 * @param path - The page path WITHOUT locale prefix (e.g. "", "/about", "/blog")
 * @returns Record of locale → absolute URL for use in metadata.alternates.languages
 */
export function getAlternateUrls(path: string): Record<string, string> {
  const { locales, defaultLocale } = routing;
  const base = getSiteUrl();
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    const url =
      locale === defaultLocale
        ? `${base}${path}`
        : `${base}/${locale}${path}`;
    languages[locale] = url;
  }

  // x-default points to the English (default) version
  languages["x-default"] = `${base}${path}`;

  return languages;
}

/**
 * Returns the canonical URL for a given locale and path.
 */
export function getCanonicalUrl(locale: string, path: string): string {
  const base = getSiteUrl();
  return locale === routing.defaultLocale
    ? `${base}${path}`
    : `${base}/${locale}${path}`;
}
