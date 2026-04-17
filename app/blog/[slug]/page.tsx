import { getPost, getAllPostSlugs, getSeriesNavigation } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type React from "react";
import ShareButtons from "@/components/ShareButtons";

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

  const url = `https://primadelverbo.it/blog/${slug}`;

  return {
    title: `${post.title} — Prima del Verbo`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Prima del Verbo",
      locale: "it_IT",
      type: "article",
      publishedTime: post.date,
      authors: ["Yan Pastushenko"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const manuscript: React.CSSProperties = {
    "--bg": "#f2e8d0",
    "--bg2": "#e8dcc0",
    "--surface": "#ddd0b0",
    "--border": "#c4a882",
    "--gold": "#5c3d0a",
    "--gold2": "#7a5210",
    "--gold-muted": "#8a6828",
    "--white": "#2a1f0e",
    "--text2": "#4a3520",
    "--text3": "#8a7050",
    backgroundColor: "#f2e8d0",
    color: "#2a1f0e",
    minHeight: "100%",
  } as React.CSSProperties;

  return (
    <div style={manuscript} className="manuscript">
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

      {/* Series navigation */}
      {(() => {
        const { prev, next, serie, total } = getSeriesNavigation(post.slug);
        if (!serie) return null;
        return (
          <div className="mt-16" style={{ borderTop: "0.5px solid var(--border)", paddingTop: "2.5rem" }}>
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold-muted)", marginBottom: "1.5rem" }}>
              Serie · {serie} · {post.asse} di {total}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="series-nav-link"
                  style={{ border: "0.5px solid var(--border)", padding: "1.25rem 1.5rem", display: "block", textDecoration: "none", transition: "border-color 0.15s" }}
                >
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text3)", marginBottom: "0.5rem" }}>
                    ← Precedente
                  </p>
                  <p style={{ fontSize: "1rem", color: "var(--gold)", lineHeight: 1.4, margin: 0, fontWeight: 300 }}>
                    {prev.title}
                  </p>
                </Link>
              ) : <div />}

              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="series-nav-link"
                  style={{ border: "0.5px solid var(--border)", padding: "1.25rem 1.5rem", display: "block", textDecoration: "none", textAlign: "right", transition: "border-color 0.15s" }}
                >
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text3)", marginBottom: "0.5rem" }}>
                    Successivo →
                  </p>
                  <p style={{ fontSize: "1rem", color: "var(--gold)", lineHeight: 1.4, margin: 0, fontWeight: 300 }}>
                    {next.title}
                  </p>
                </Link>
              ) : <div />}
            </div>
          </div>
        );
      })()}

      {/* Share */}
      <ShareButtons
        title={post.title}
        url={`https://primadelverbo.it/blog/${post.slug}`}
      />

      {/* Footer nav */}
      <div
        className="mt-8 pt-6 border-t flex justify-between items-center"
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
    </div>
  );
}
