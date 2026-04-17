import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import NewsletterForm from "@/components/NewsletterForm";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-6 py-12 md:py-24 overflow-hidden"
        style={{ backgroundColor: "var(--bg)" }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(199,186,140,0.06) 0%, transparent 70%)",
          }}
        />

        <Image
          src="/logo_hero.png"
          alt="Prima del Verbo"
          width={160}
          height={160}
          className="mb-8 md:mb-10 opacity-90 w-[140px] md:w-[160px] h-auto"
          priority
        />

        <p
          className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--gold-muted)" }}
        >
          Prima del Verbo
        </p>

        <h1
          className="text-3xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 md:mb-8 max-w-3xl"
          style={{ color: "var(--gold)", fontStyle: "italic" }}
        >
          Non stai cercando risposte.<br />Stai ricordando.
        </h1>

        <p
          className="text-lg md:text-xl max-w-xl leading-loose mb-10 md:mb-12"
          style={{ color: "var(--text2)" }}
        >
          Un luogo di filosofia, linguaggio e pensiero — per chi sente che le domande più
          profonde non aspettano risposta, ma riconoscimento.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
          <Link
            href="/blog"
            className="w-full sm:w-auto text-center px-8 py-3 text-sm tracking-widest uppercase border transition-colors"
            style={{
              borderColor: "var(--gold)",
              color: "var(--gold)",
              letterSpacing: "0.2em",
            }}
          >
            Esplora il blog
          </Link>
          <Link
            href="/opere"
            className="w-full sm:w-auto text-center px-8 py-3 text-sm tracking-widest uppercase transition-colors"
            style={{ color: "var(--text2)", letterSpacing: "0.2em" }}
          >
            Le opere →
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
          <div className="w-px h-12 opacity-30 mx-auto" style={{ backgroundColor: "var(--gold)" }} />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section
        className="py-12 md:py-24 px-6 border-t border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg2)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-sm tracking-[0.25em] uppercase mb-6"
            style={{ color: "var(--gold-muted)" }}
          >
            Il progetto
          </p>
          <p
            className="text-xl md:text-2xl leading-loose font-light"
            style={{ color: "var(--white)" }}
          >
            Prima del Verbo nasce dall&rsquo;urgenza di pensare prima di parlare. È un archivio
            di riflessioni sul linguaggio, sull&rsquo;ontologia, sulla scrittura come pratica
            filosofica. Non un manifesto — una soglia.
          </p>
          <div
            className="mt-8 md:mt-10 w-12 h-px mx-auto"
            style={{ backgroundColor: "var(--gold-muted)" }}
          />
        </div>
      </section>

      {/* ── ULTIMI ARTICOLI ── */}
      <section className="py-12 md:py-24 px-6 max-w-5xl mx-auto w-full">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p
              className="text-sm tracking-[0.25em] uppercase mb-2"
              style={{ color: "var(--gold-muted)" }}
            >
              Dal blog
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light"
              style={{ color: "var(--gold)" }}
            >
              Ultime riflessioni
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm tracking-widest uppercase hidden sm:block"
            style={{ color: "var(--text3)" }}
          >
            Tutti gli articoli →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-4 md:p-6 border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <time
                className="text-sm tracking-widest uppercase block mb-3"
                style={{ color: "var(--text3)" }}
              >
                {new Date(post.date).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h3
                className="text-2xl lg:text-3xl mb-3 leading-snug"
                style={{ color: "var(--gold)" }}
              >
                {post.title}
              </h3>
              <p className="text-xl leading-loose" style={{ color: "var(--text2)" }}>
                {post.excerpt}
              </p>
              <span
                className="inline-block mt-4 text-sm tracking-widest uppercase"
                style={{ color: "var(--gold-muted)" }}
              >
                Leggi →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="text-sm" style={{ color: "var(--text3)" }}>
            Tutti gli articoli →
          </Link>
        </div>
      </section>

      {/* ── TESI DOWNLOAD ── */}
      <section
        className="py-12 md:py-24 px-6 border-t border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg2)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
            {/* Icon */}
            <div
              className="flex-shrink-0 w-20 h-20 border flex items-center justify-center"
              style={{ borderColor: "var(--gold-muted)" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                style={{ color: "var(--gold)" }}
              >
                <rect x="6" y="4" width="20" height="24" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <line x1="11" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.2" />
                <line x1="11" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="1.2" />
                <line x1="11" y1="18" x2="17" y2="18" stroke="currentColor" strokeWidth="1.2" />
                <path d="M16 22 L16 28 M13 25 L16 28 L19 25" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>

            <div className="flex-1 text-center md:text-left">
              <p
                className="text-sm tracking-[0.25em] uppercase mb-2"
                style={{ color: "var(--gold-muted)" }}
              >
                Opera
              </p>
              <h2
                className="text-2xl md:text-3xl font-light mb-3"
                style={{ color: "var(--gold)" }}
              >
                Dalla separazione all&rsquo;Uno
              </h2>
              <p className="text-xl leading-loose mb-6" style={{ color: "var(--text2)" }}>
                Il testo fondativo del progetto. Un&rsquo;indagine sul linguaggio, l&rsquo;essere e
                il silenzio come condizione del pensiero filosofico. Disponibile gratuitamente.
              </p>
              <Link
                href="/opere"
                className="inline-flex items-center gap-2 px-6 py-3 border text-sm tracking-widest uppercase"
                style={{ borderColor: "var(--gold)", color: "var(--gold)", letterSpacing: "0.15em" }}
              >
                Scopri e scarica
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p
            className="text-sm tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--gold-muted)" }}
          >
            Newsletter
          </p>
          <h2
            className="text-3xl lg:text-5xl font-light mb-4"
            style={{ color: "var(--gold)" }}
          >
            Rimani nella soglia
          </h2>
          <p className="text-xl leading-loose mb-8 md:mb-10" style={{ color: "var(--text2)" }}>
            Riflessioni periodiche via email. Niente spam — solo pensieri che meritano spazio.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
