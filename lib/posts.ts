import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  chapter?: string;
  readTime?: string;
  coverImage?: string;
  serie?: string;
  asse?: number;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => getPostMeta(slug))
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostMeta(slug: string): PostMeta | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    chapter: data.chapter,
    readTime: data.readTime,
    coverImage: data.coverImage,
    serie: data.serie,
    asse: data.asse,
  };
}

export function getSeriesNavigation(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
  serie: string | null;
  total: number;
} {
  const current = getPostMeta(slug);
  if (!current?.serie || current.asse == null) {
    return { prev: null, next: null, serie: null, total: 0 };
  }

  const seriesArticles = getAllPosts()
    .filter((p) => p.serie === current.serie && p.asse != null)
    .sort((a, b) => (a.asse ?? 0) - (b.asse ?? 0));

  const idx = seriesArticles.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? seriesArticles[idx - 1] : null,
    next: idx < seriesArticles.length - 1 ? seriesArticles[idx + 1] : null,
    serie: current.serie,
    total: seriesArticles.length,
  };
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    chapter: data.chapter,
    readTime: data.readTime,
    coverImage: data.coverImage,
    serie: data.serie,
    asse: data.asse,
    content: processed.toString(),
  };
}
