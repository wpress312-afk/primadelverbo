"use client";

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
          <p className="text-xl leading-relaxed italic text-center md:text-left" style={{ color: "var(--text2)" }}>
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

        {/* Quote + Social */}
        <div className="flex flex-col justify-center items-center gap-6">
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

          <div className="flex items-center gap-5">
            {[
              {
                href: "https://www.instagram.com/primadelverbo",
                label: "Instagram",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                href: "https://www.youtube.com/@primadelverbo",
                label: "YouTube",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="4" />
                    <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                href: "https://t.me/dallaseparazionealuno",
                label: "Telegram",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                  </svg>
                ),
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors"
                style={{ color: "var(--text3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
              >
                {icon}
              </a>
            ))}
          </div>
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
