import { getPost, getAllPostSlugs } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Prima del Verbo`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-0 py-10 md:py-20">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm tracking-widest uppercase mb-8 md:mb-12 transition-colors"
        style={{ color: "var(--text3)" }}
      >
        ← Blog
      </Link>

      {/* Header */}
      <header className="mb-8 md:mb-12">
        <time
          className="text-sm tracking-widest uppercase block mb-4"
          style={{ color: "var(--text3)" }}
        >
          {new Date(post.date).toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <h1
          className="text-3xl md:text-5xl font-light leading-tight mb-6"
          style={{ color: "var(--gold)" }}
        >
          {post.title}
        </h1>
        <p
          className="text-xl leading-loose italic"
          style={{ color: "var(--text2)" }}
        >
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-2 py-0.5 border tracking-wide"
                style={{ borderColor: "var(--border)", color: "var(--text3)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="mt-8 w-full h-px"
          style={{ backgroundColor: "var(--border)" }}
        />
      </header>

      {/* Content */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer nav */}
      <div
        className="mt-16 pt-8 border-t flex justify-between items-center"
        style={{ borderColor: "var(--border)" }}
      >
        <Link
          href="/blog"
          className="text-base tracking-widest uppercase"
          style={{ color: "var(--text3)" }}
        >
          ← Tutti gli articoli
        </Link>
      </div>
    </div>
  );
}
