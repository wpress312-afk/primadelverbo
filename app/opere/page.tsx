import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opere — Prima del Verbo",
  description: "La tesi di laurea e le future opere di Prima del Verbo.",
};

export default function OpérePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 md:py-20">
      {/* Header */}
      <div className="mb-10 md:mb-16">
        <p
          className="text-xs tracking-[0.25em] uppercase mb-3"
          style={{ color: "var(--gold-muted)" }}
        >
          Opere
        </p>
        <h1
          className="text-4xl md:text-5xl font-light"
          style={{ color: "var(--gold)" }}
        >
          Testi e scritti
        </h1>
        <div
          className="mt-4 w-12 h-px"
          style={{ backgroundColor: "var(--gold-muted)" }}
        />
      </div>

      {/* Tesi */}
      <section className="mb-12 md:mb-20">
        <div
          className="border p-5 md:p-10"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Icon */}
            <div
              className="flex-shrink-0 w-14 h-14 border flex items-center justify-center mt-1"
              style={{ borderColor: "var(--gold-muted)" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                style={{ color: "var(--gold)" }}
              >
                <rect x="6" y="4" width="20" height="24" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <line x1="11" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.2" />
                <line x1="11" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="1.2" />
                <line x1="11" y1="18" x2="17" y2="18" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>

            <div className="flex-1">
              <p
                className="text-xs tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--gold-muted)" }}
              >
                Tesi filosofica · 2026
              </p>
              <h2
                className="text-2xl md:text-3xl font-light mb-4"
                style={{ color: "var(--gold)" }}
              >
                Il silenzio come condizione del linguaggio
              </h2>
              <p
                className="text-lg leading-loose mb-2"
                style={{ color: "var(--white)" }}
              >
                Un attraversamento in undici capitoli: dal sonno della coscienza ordinaria al riconoscimento
                dell&rsquo;Uno come fondamento mai perduto. In dialogo con Plotino, la Qabbalah,
                l&rsquo;Advaita Vedānta, il Taoismo e la via apofatica.
              </p>
              {/* Download */}
              <a
                href="/tesi.pdf"
                download
                className="inline-flex items-center gap-3 border px-5 py-3 text-sm tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{ borderColor: "var(--gold-muted)", color: "var(--gold)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v9M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Future opere */}
      <section>
        <h2
          className="text-2xl font-light mb-8"
          style={{ color: "var(--gold)" }}
        >
          In preparazione
        </h2>

        <div className="flex flex-col gap-6">
          {[
            {
              label: "Saggio breve",
              title: "Linguaggio e dimenticanza",
              desc: "Sul modo in cui le parole ordinarie ci allontanano dall'esperienza viva delle cose.",
              stato: "In lavorazione",
            },
            {
              label: "Raccolta",
              title: "Prose filosofiche",
              desc: "Frammenti di pensiero a cavallo tra filosofia e letteratura.",
              stato: "Concetto",
            },
          ].map(({ label, title, desc, stato }) => (
            <div
              key={title}
              className="border p-6 flex gap-5 items-start"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <div
                className="flex-shrink-0 w-1 self-stretch"
                style={{ backgroundColor: "var(--border)" }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <p
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ color: "var(--gold-muted)" }}
                  >
                    {label}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 border"
                    style={{ borderColor: "var(--border)", color: "var(--text3)" }}
                  >
                    {stato}
                  </span>
                </div>
                <h3
                  className="text-lg font-light mb-2"
                  style={{ color: "var(--white)" }}
                >
                  {title}
                </h3>
                <p className="text-base leading-loose" style={{ color: "var(--text2)" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
