"use client";

export default function DownloadTesiButton() {
  return (
    <a
      href="/tesi.pdf"
      download
      className="inline-flex items-center gap-3 border px-5 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
      style={{ borderColor: "var(--gold-muted)", color: "var(--gold)" }}
      onClick={() => window.plausible?.("Download Tesi")}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1v9M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      Download PDF
    </a>
  );
}
