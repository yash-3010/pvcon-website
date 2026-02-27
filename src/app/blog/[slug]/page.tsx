import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";

import { getAllSlugs, getPostBySlug } from "@/lib/blogs";
import { siteDetails } from "@/data/siteDetails";
import PageWrapper from "@/components/PageWrapper";

// ─── Types ─────────────────────────────────────────────────────────────────
interface Props {
  params: { slug: string };
}

// ─── Date formatter ─────────────────────────────────────────────────────────
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

// ─── Dynamic Metadata ───────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    return {};
  }

  const absoluteOgImage = `${siteDetails.siteUrl}${post.ogImage}`;

  return {
    title: `${post.title} | ${siteDetails.siteName}`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${siteDetails.siteUrl}/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteDetails.siteUrl}/blog/${params.slug}`,
      siteName: siteDetails.siteName,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteOgImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ─── Static Params (pre-render all posts at build time) ────────────────────
export async function generateStaticParams() {
  return getAllSlugs();
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function BlogPostPage({ params }: Props) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const absoluteOgImage = `${siteDetails.siteUrl}${post.ogImage}`;
  const postUrl = `${siteDetails.siteUrl}/blog/${params.slug}`;

  // ── JSON-LD Structured Data ────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: absoluteOgImage,   // must be absolute URL
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageWrapper
        ariaLabel={post.title}
        id={post.slug}           // slug not title — IDs with spaces are invalid HTML
        as="article"
        className="max-w-3xl"   // narrower for blog readability
      >

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-foreground-accent">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
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
            <span
              key={tag}
              role="listitem"
              className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Title ──────────────────────────────────────────────────── */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {post.title}
        </h1>

        {/* ── Description ────────────────────────────────────────────── */}
        <p className="text-foreground-accent text-lg mb-6 leading-relaxed">
          {post.description}
        </p>

        {/* ── Post Meta ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 text-sm text-foreground-accent mb-8 pb-8 border-b border-gray-200">
          <span className="font-medium text-foreground">{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          {/* show updated date if different from published */}
          {post.updatedAt !== post.publishedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </span>
            </>
          )}
        </div>

        {/* ── Hero Image ─────────────────────────────────────────────── */}
        {/* Visible on page AND matches schema image — Google cross-references both */}
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-10">
          <Image
            src={post.ogImage}
            alt={post.title}
            fill
            priority              // LCP element — always priority for hero image
            quality={85}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* ── MDX Content ────────────────────────────────────────────── */}
        <div className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* ── Post Footer ────────────────────────────────────────────── */}
        <footer className="mt-16 pt-8 border-t border-gray-200">

          {/* Tags again at bottom for SEO internal linking */}
          <div className="flex gap-2 flex-wrap mb-8" role="list" aria-label="Post tags">
            {post.tags.map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 text-sm font-medium transition-colors"
          >
            <span aria-hidden="true">←</span>
            Back to all posts
          </Link>

        </footer>

      </PageWrapper>
    </>
  );
}