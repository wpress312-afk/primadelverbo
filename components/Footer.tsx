import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="border-t mt-12 md:mt-20"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg2)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Prima del Verbo" width={28} height={28} className="opacity-70" />
            <span className="tracking-widest uppercase text-sm" style={{ color: "var(--gold-muted)" }}>
              Prima del Verbo
            </span>
          </div>
          <p className="text-sm leading-relaxed italic" style={{ color: "var(--text3)" }}>
            Non stai cercando risposte.<br />Stai ricordando.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold-muted)" }}>
            Navigazione
          </p>
          {[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" },
            { href: "/opere", label: "Opere" },
            { href: "/test", label: "Test" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm transition-colors"
              style={{ color: "var(--text2)" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Quote */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <blockquote
            className="text-base italic leading-relaxed border-l-2 pl-4 text-left"
            style={{ color: "var(--text2)", borderColor: "var(--gold-muted)" }}
          >
            &ldquo;Dall&rsquo;Uno non ci siamo mai realmente separati. Se vi è stato un allontanamento,
            esso non ha avuto luogo nell&rsquo;essere — ma nella coscienza che si è lasciata
            ipnotizzare dalle proprie forme.&rdquo;
            <footer className="mt-2 text-xs not-italic" style={{ color: "var(--text3)" }}>
              — Yan Pastushenko
            </footer>
          </blockquote>
        </div>
      </div>

      <div
        className="border-t max-w-5xl mx-auto px-6 py-4 text-xs text-center md:text-left"
        style={{ borderColor: "var(--border)", color: "var(--text3)" }}
      >
        © {new Date().getFullYear()} Prima del Verbo — Tutti i diritti riservati
      </div>
    </footer>
  );
}
