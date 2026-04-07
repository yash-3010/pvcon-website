import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'zh', 'ja', 'fr', 'es'],
  defaultLocale: 'en',
  // English stays at /, /about, /blog — other locales get /de/, /zh/, etc.
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
