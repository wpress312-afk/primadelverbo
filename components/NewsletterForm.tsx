"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Qualcosa non ha funzionato.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      (window as any).plausible?.("Iscrizione Newsletter");
    } catch {
      setErrorMsg("Errore di rete. Riprova.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p style={{ fontSize: "1rem", color: "var(--gold-muted)", lineHeight: 1.7 }}>
        Sei nella soglia. Ti scrivo presto.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="la tua email"
        required
        disabled={status === "loading"}
        className="flex-1 px-4 py-3 text-sm bg-transparent border outline-none"
        style={{
          borderColor: "var(--border)",
          color: "var(--white)",
          backgroundColor: "var(--surface)",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 text-sm tracking-widest uppercase border transition-opacity"
        style={{
          borderColor: "var(--gold)",
          color: "var(--gold)",
          letterSpacing: "0.15em",
          backgroundColor: "transparent",
          opacity: status === "loading" ? 0.5 : 1,
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? "..." : "Iscriviti"}
      </button>

      {status === "error" && (
        <p className="w-full text-sm mt-2" style={{ color: "#c07070" }}>
          {errorMsg}
        </p>
      )}
    </form>
  );
}
