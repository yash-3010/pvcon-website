import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getAllSlugs, getPostBySlug } from "@/lib/blogs";
import { siteDetails } from "@/data/common/siteDetails";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";
import PageWrapper from "@/components/PageWrapper";

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const { routing } = await import("@/i18n/routing");
  return routing.locales.flatMap((locale) =>
    slugs.map(({ slug }) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    return {};
  }

  const absoluteOgImage = `${siteDetails.siteUrl}${post.ogImage}`;
  const canonical = getCanonicalUrl(locale, `/blog/${slug}`);

  return {
    title: `${post.title} | ${siteDetails.siteName}`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical,
      languages: getAlternateUrls(`/blog/${slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: siteDetails.siteName,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: absoluteOgImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteOgImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params: { locale, slug } }: Props) {
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });

  const absoluteOgImage = `${siteDetails.siteUrl}${post.ogImage}`;
  const postUrl = getCanonicalUrl(locale, `/blog/${slug}`);
  const blogUrl = locale === "en" ? "/blog" : `/${locale}/blog`;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: absoluteOgImage,
    url: postUrl,
    author: {
      "@type": "Organization",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteDetails.siteUrl}/images/logo.webp`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    keywords: post.tags.join(", "),
  };

  const homeUrl = locale === "en" ? "/" : `/${locale}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageWrapper ariaLabel={post.title} id={post.slug} as="article" className="max-w-3xl">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-foreground-accent">
            <li>
              <Link href={homeUrl} className="hover:text-primary transition-colors">
                {t("home")}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={blogUrl} className="hover:text-primary transition-colors">
                {t("blogLabel")}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground truncate max-w-xs" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* ── Tags ───────────────────────────────────────────────────── */}
        <div className="flex gap-2 flex-wrap mb-4" role="list" aria-label="Post tags">
          {post.tags.map((tag) => (
            <span key={tag} role="listitem" className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* ── Title ──────────────────────────────────────────────────── */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

        {/* ── Description ────────────────────────────────────────────── */}
        <p className="text-foreground-accent text-lg mb-6 leading-relaxed">{post.description}</p>

        {/* ── Post Meta ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 text-sm text-foreground-accent mb-8 pb-8 border-b border-gray-200">
          <span className="font-medium text-foreground">{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          {post.updatedAt !== post.publishedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {t("updatedLabel")} <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </span>
            </>
          )}
        </div>

        {/* ── Hero Image ─────────────────────────────────────────────── */}
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-10">
          <Image src={post.ogImage} alt={post.title} fill priority quality={85} className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
        </div>

        {/* ── MDX Content ────────────────────────────────────────────── */}
        <div className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* ── Post Footer ────────────────────────────────────────────── */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex gap-2 flex-wrap mb-8" role="list" aria-label="Post tags">
            {post.tags.map((tag) => (
              <span key={tag} role="listitem" className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
          <Link href={blogUrl} className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 text-sm font-medium transition-colors">
            <span aria-hidden="true">←</span>
            {t("backToAll")}
          </Link>
        </footer>

      </PageWrapper>
    </>
  );
}
