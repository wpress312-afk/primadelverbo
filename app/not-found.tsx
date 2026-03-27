import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <p
        className="text-xs tracking-[0.3em] uppercase mb-6"
        style={{ color: "var(--gold-muted)" }}
      >
        404
      </p>
      <h1
        className="text-4xl font-light mb-4"
        style={{ color: "var(--gold)", fontStyle: "italic" }}
      >
        Questa pagina non esiste.
      </h1>
      <p className="text-base mb-10" style={{ color: "var(--text2)" }}>
        Ma forse è ciò che stavi cercando.
      </p>
      <Link
        href="/"
        className="text-sm tracking-widest uppercase border px-6 py-3"
        style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
      >
        Torna all&rsquo;inizio
      </Link>
    </div>
  );
}
