import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Prima del Verbo",
  description: "Riflessioni su linguaggio, ontologia e pensiero filosofico.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 md:py-20">
      {/* Header */}
      <div className="mb-10 md:mb-16">
        <p
          className="text-sm tracking-[0.25em] uppercase mb-3"
          style={{ color: "var(--gold-muted)" }}
        >
          Blog
        </p>
        <h1
          className="text-4xl md:text-5xl font-light"
          style={{ color: "var(--gold)" }}
        >
          Riflessioni
        </h1>
        <div
          className="mt-4 w-12 h-px"
          style={{ backgroundColor: "var(--gold-muted)" }}
        />
      </div>

      {/* Post list */}
      <div className="flex flex-col gap-0">
        {posts.map((post, i) => (
          <article
            key={post.slug}
            className="border-t py-6 md:py-8"
            style={{ borderColor: "var(--border)" }}
          >
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                <time
                  className="text-sm tracking-widest uppercase flex-shrink-0"
                  style={{ color: "var(--text3)" }}
                >
                  {new Date(post.date).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2
                  className="text-xl md:text-2xl lg:text-3xl font-light leading-snug"
                  style={{ color: "var(--gold)" }}
                >
                  {post.title}
                </h2>
              </div>
              <p
                className="mt-3 text-xl leading-loose"
                style={{ color: "var(--text2)" }}
              >
                {post.excerpt}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 border tracking-wide"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text3)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span
                className="inline-block mt-4 text-sm tracking-widest uppercase"
                style={{ color: "var(--gold-muted)" }}
              >
                Leggi →
              </span>
            </Link>
          </article>
        ))}
        <div className="border-t" style={{ borderColor: "var(--border)" }} />
      </div>

      {posts.length === 0 && (
        <p className="text-center py-20" style={{ color: "var(--text3)" }}>
          Nessun articolo ancora. Presto.
        </p>
      )}
    </div>
  );
}
