"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--bg2)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 relative flex items-center justify-center md:justify-between">
        {/* Logo — centrato su mobile, sinistra su desktop */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Prima del Verbo"
            width={46}
            height={46}
            className="opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span
            className="text-lg md:text-xl tracking-widest uppercase"
            style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
          >
            Prima del Verbo
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" },
            { href: "/opere", label: "Opere" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-widest uppercase transition-colors"
              style={{ color: "var(--text2)", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text2)")}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/test"
            className="text-sm tracking-widest uppercase transition-opacity"
            style={{ color: "var(--gold)", letterSpacing: "0.15em", border: "0.5px solid var(--gold-muted)", padding: "4px 12px" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Test
          </Link>
        </div>

        {/* Mobile hamburger — assoluto a destra */}
        <button
          className="absolute right-6 md:hidden p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ color: "var(--gold)" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-6 py-5 flex flex-col items-center gap-6"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg2)" }}
        >
          {[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" },
            { href: "/opere", label: "Opere" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase"
              style={{ color: "var(--text2)", letterSpacing: "0.15em" }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/test"
            onClick={() => setOpen(false)}
            className="text-sm tracking-widest uppercase"
            style={{ color: "var(--gold)", letterSpacing: "0.15em", border: "0.5px solid var(--gold-muted)", padding: "4px 14px" }}
          >
            Test
          </Link>
        </div>
      )}
    </nav>
  );
}
