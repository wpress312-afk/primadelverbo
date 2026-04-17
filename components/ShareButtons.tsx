"use client";

import { useState } from "react";

interface Props {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleNativeShare() {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await handleCopy();
    }
  }

  const btnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.55rem 1.2rem",
    border: "0.5px solid var(--border)",
    color: "var(--text2)",
    textDecoration: "none",
    fontSize: "0.8rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    fontFamily: "inherit",
    background: "transparent",
    cursor: "pointer",
    transition: "border-color 0.15s, color 0.15s",
  };

  return (
    <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "0.5px solid var(--border)" }}>
      <p style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold-muted)", marginBottom: "1rem" }}>
        Condividi
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          style={btnStyle}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold-muted)"; e.currentTarget.style.color = "var(--gold)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L0 24l6.302-1.51A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.884 0-3.652-.502-5.18-1.378l-.36-.214-3.742.897.933-3.64-.237-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          WhatsApp
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/share/url?url=${encoded}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          style={btnStyle}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold-muted)"; e.currentTarget.style.color = "var(--gold)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
          </svg>
          Telegram
        </a>

        {/* Copia link */}
        <button
          onClick={handleCopy}
          style={{ ...btnStyle, color: copied ? "var(--gold)" : "var(--text2)", borderColor: copied ? "var(--gold-muted)" : "var(--border)" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold-muted)"; e.currentTarget.style.color = "var(--gold)"; }}
          onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; } }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
          {copied ? "Copiato!" : "Copia link"}
        </button>

        {/* Condividi (native) */}
        <button
          onClick={handleNativeShare}
          style={btnStyle}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold-muted)"; e.currentTarget.style.color = "var(--gold)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Condividi
        </button>

      </div>
    </div>
  );
}
