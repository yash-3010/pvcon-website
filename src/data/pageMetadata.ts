import { siteDetails } from './siteDetails';

export const pageMetadata = {
  about: {
    title: 'About PVCON | Expert Pharmacovigilance Consultants',
    description: 'Learn about PVCON\'s team of pharmacovigilance experts offering QPPV services, regulatory audits, and global drug safety consulting.',
    canonical: `${siteDetails.siteUrl}/about`,
    ogImage: '/images/about-og.webp',
  },
  blog: {
    title: 'Pharmacovigilance Blog | PVCON Insights',
    description: 'Expert articles on drug safety, QPPV services, PSMF management and regulatory compliance.',
    canonical: `${siteDetails.siteUrl}/blog`,
    ogImage: '/images/blog-og.webp',
  },
}
