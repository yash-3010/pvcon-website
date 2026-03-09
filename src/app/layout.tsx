import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Plus_Jakarta_Sans } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteDetails } from '@/data/siteDetails';

import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteDetails.siteUrl),
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    siteName: siteDetails.siteName,
    locale: siteDetails.locale,
    type: 'website',
    images: [
      {
        url: '/images/hero.webp',
        width: 1200,
        height: 630,
        alt: siteDetails.metadata.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ['/images/hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased flex flex-col min-h-screen`}
      >
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
