import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const blogsDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  ogImage: string;
  featured: boolean;
  readingTime: string;
  content: string;
}

// get all posts for listing page
export function getAllPosts(): Omit<BlogPost, "content">[] {
  const files = fs.readdirSync(blogsDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const fullPath = path.join(blogsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        author: data.author,
        tags: data.tags ?? [],
        ogImage: data.ogImage,
        featured: data.featured ?? false,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1)); // newest first
}

// get single post for post page
export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    author: data.author,
    tags: data.tags ?? [],
    ogImage: `/images/blog/${slug}.webp`,
    featured: data.featured ?? false,
    readingTime: readingTime(content).text,
    content,
  };
}

// for generateStaticParams
export function getAllSlugs() {
  return fs
    .readdirSync(blogsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(".mdx", "") }));
}