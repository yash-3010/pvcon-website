import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/services/psmf',
        destination: '/products/psmf-manager',
        permanent: true,
      },
      {
        source: '/:locale/services/psmf',
        destination: '/:locale/products/psmf-manager',
        permanent: true,
      },
      {
        source: '/company',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/:locale/company',
        destination: '/:locale/about',
        permanent: true,
      },
      {
        source: '/services/training-capability-development',
        destination: '/services/training-upskilling',
        permanent: true,
      },
      {
        source: '/:locale/services/training-capability-development',
        destination: '/:locale/services/training-upskilling',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
