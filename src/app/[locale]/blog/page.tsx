import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/blogs";
import { siteDetails } from "@/data/siteDetails";
import { getAlternateUrls, getCanonicalUrl } from "@/lib/i18n-utils";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  const canonical = getCanonicalUrl(locale, "/blog");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: getAlternateUrls("/blog"),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: siteDetails.siteName,
      type: "website",
    },
  };
}

// ─── Small reusable tag pill ───────────────────────────────────────────────
const TagPill = ({ tag }: { tag: string }) => (
  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
    {tag}
  </span>
);

export default async function BlogPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "blog" });

  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((p) => p.featured);
  const recentPosts = allPosts.filter((p) => !p.featured);
  const heroPosts = featuredPosts[0] ?? allPosts[0];

  // Blog posts are in English — links always go to /blog/[slug] (no locale prefix needed
  // for blog posts since content is English-only; locale UI chrome is translated)
  const blogHref = (slug: string) =>
    locale === "en" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO BANNER ─────────────────────────────────────────────────── */}
      <section aria-label="Featured hero post" className="relative w-full h-[420px] overflow-hidden">
        <Image
          src={`/images/blog/${heroPosts.slug}.webp`}
          alt={heroPosts.title}
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
          {heroPosts.tags[0] && (
            <span className="inline-block bg-white text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              {heroPosts.tags[0]}
            </span>
          )}
          <Link href={blogHref(heroPosts.slug)}>
            <h1 className="text-white text-2xl md:text-3xl font-bold leading-snug hover:underline underline-offset-2">
              {heroPosts.title}
            </h1>
          </Link>
          <p className="text-white/80 text-sm mt-2 line-clamp-2">{heroPosts.description}</p>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">

        {/* ── FEATURED POSTS ────────────────────────────────────────────── */}
        {featuredPosts.length > 0 && (
          <section aria-labelledby="featured-heading" className="mb-16">
            <h2 id="featured-heading" className="text-2xl font-bold mb-8">
              {t("featuredHeading")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts[0] && (
                <article aria-label={featuredPosts[0].title} className="relative rounded-xl overflow-hidden h-72 md:h-full min-h-64">
                  <Image
                    src={`/images/blog/${featuredPosts[0].slug}.webp`}
                    alt={featuredPosts[0].title}
                    fill quality={85} loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 p-5">
                    {featuredPosts[0].tags[0] && (
                      <span className="inline-block bg-white text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                        {featuredPosts[0].tags[0]}
                      </span>
                    )}
                    <Link href={blogHref(featuredPosts[0].slug)}>
                      <h3 className="text-white font-bold text-lg leading-snug hover:underline underline-offset-2">
                        {featuredPosts[0].title}
                      </h3>
                    </Link>
                  </div>
                </article>
              )}
              <div className="flex flex-col gap-4">
                {featuredPosts.slice(1, 3).map((post) => (
                  <article key={post.slug} aria-label={post.title} className="flex gap-4 items-start">
                    <Link href={blogHref(post.slug)} className="flex-shrink-0">
                      <div className="relative w-28 h-20 rounded-lg overflow-hidden">
                        <Image src={`/images/blog/${post.slug}.webp`} alt={post.title} fill quality={85} loading="lazy" className="object-cover" sizes="112px" />
                      </div>
                    </Link>
                    <div className="flex-1">
                      {post.tags[0] && <TagPill tag={post.tags[0]} />}
                      <Link href={blogHref(post.slug)}>
                        <h3 className="text-sm font-semibold mt-1 leading-snug hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      </Link>
                      <p className="text-xs text-foreground-accent mt-1">{formatDate(post.publishedAt)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── RECENT POSTS ──────────────────────────────────────────────── */}
        {recentPosts.length > 0 && (
          <section aria-labelledby="recent-heading">
            <h2 id="recent-heading" className="text-2xl font-bold mb-8">
              {t("recentHeading")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <article key={post.slug} aria-label={post.title} className="group">
                  <Link href={blogHref(post.slug)}>
                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
                      <Image src={`/images/blog/${post.slug}.webp`} alt={post.title} fill quality={85} loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                  </Link>
                  <div>
                    {post.tags[0] && <TagPill tag={post.tags[0]} />}
                    <Link href={blogHref(post.slug)}>
                      <h3 className="text-sm font-semibold mt-1 leading-snug group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    </Link>
                    <p className="text-xs text-foreground-accent mt-1">{formatDate(post.publishedAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
