import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Fallback to default locale if locale is not valid
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const [common, home, about, blog] = await Promise.all([
    import(`../data/common/messages/${locale}.json`),
    import(`../data/home/messages/${locale}.json`),
    import(`../data/about/messages/${locale}.json`),
    import(`../data/blog/messages/${locale}.json`),
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      ...home.default,
      ...about.default,
      ...blog.default,
    },
  };
});
