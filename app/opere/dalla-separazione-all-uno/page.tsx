import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import type React from "react";
import { remark } from "remark";
import html from "remark-html";
import ShareButtons from "@/components/ShareButtons";
import DownloadTesiButton from "@/components/DownloadTesiButton";

const URL_PAGE = "https://primadelverbo.it/opere/dalla-separazione-all-uno";
const TITLE = "Dalla separazione all’Uno";
const DESCRIPTION =
  "Tesi filosofica di Yan Pastushenko. Sul sonno dell’essere umano, sul linguaggio che divide e sul risveglio come ricongiungimento all’intero.";

export const metadata: Metadata = {
  title: `${TITLE} — Prima del Verbo`,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_PAGE,
    siteName: "Prima del Verbo",
    locale: "it_IT",
    type: "article",
    authors: ["Yan Pastushenko"],
  },
  alternates: { canonical: URL_PAGE },
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function getTesi() {
  const file = path.join(process.cwd(), "content/opere/dalla-separazione-all-uno.md");
  const raw = fs.readFileSync(file, "utf8");
  const processed = await remark().use(html).process(raw);
  const toc: { id: string; text: string }[] = [];
  const content = processed.toString().replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const id = slugify(text);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { content, toc };
}

export default async function TesiPage() {
  const { content, toc } = await getTesi();

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
        <Link
          href="/opere"
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase mb-8 md:mb-12"
          style={{ color: "var(--text3)" }}
        >
          ← Opere
        </Link>

        <header className="mb-8 md:mb-12">
          <p className="text-sm tracking-widest uppercase block mb-4" style={{ color: "var(--text3)" }}>
            Tesi filosofica · Yan Pastushenko · 2026
          </p>
          <h1 className="text-3xl md:text-5xl font-light leading-tight mb-4" style={{ color: "var(--gold)" }}>
            {TITLE}
          </h1>
          <p className="text-xl italic mb-4" style={{ color: "var(--gold-muted)" }}>
            Non una strada, ma un ritorno.
          </p>
          <p className="text-xl leading-loose italic" style={{ color: "var(--text2)" }}>
            Sul sonno dell&rsquo;essere umano, sul linguaggio che divide e sul risveglio come
            ricongiungimento all&rsquo;intero.
          </p>
          <div className="mt-6">
            <DownloadTesiButton />
          </div>

          <nav
            className="mt-10 border p-5 md:p-6"
            style={{ borderColor: "var(--border)" }}
            aria-label="Indice"
          >
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--gold-muted)" }}>
              Indice
            </p>
            <ol className="flex flex-col gap-2">
              {toc.map(({ id, text }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-base leading-snug"
                    style={{
                      color: text.includes("movimento") ? "var(--gold-muted)" : "var(--text2)",
                      textTransform: text.includes("movimento") ? "uppercase" : "none",
                      letterSpacing: text.includes("movimento") ? "0.15em" : "normal",
                      fontSize: text.includes("movimento") ? "0.8rem" : undefined,
                      display: "block",
                      marginTop: text.includes("movimento") ? "0.75rem" : 0,
                    }}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-8 w-full h-px" style={{ backgroundColor: "var(--border)" }} />
        </header>

        <div className="prose tesi" dangerouslySetInnerHTML={{ __html: content }} />

        <div className="mt-12">
          <DownloadTesiButton />
        </div>

        <ShareButtons title={TITLE} url={URL_PAGE} />

        <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
          <Link href="/opere" className="text-base tracking-widest uppercase" style={{ color: "var(--text3)" }}>
            ← Tutte le opere
          </Link>
        </div>
      </div>
    </div>
  );
}
