"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Placeholder: integra con Mailchimp / ConvertKit / Resend
    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="la tua email"
        required
        className="flex-1 px-4 py-3 text-sm bg-transparent border outline-none"
        style={{
          borderColor: "var(--border)",
          color: "var(--white)",
          backgroundColor: "var(--surface)",
        }}
      />
      <button
        type="submit"
        className="px-6 py-3 text-sm tracking-widest uppercase border transition-colors"
        style={{
          borderColor: "var(--gold)",
          color: "var(--gold)",
          letterSpacing: "0.15em",
          backgroundColor: "transparent",
        }}
      >
        Iscriviti
      </button>

      {status === "success" && (
        <p
          className="w-full text-sm text-center mt-2"
          style={{ color: "var(--gold-muted)" }}
        >
          Iscritto. Ci vediamo nella soglia.
        </p>
      )}
    </form>
  );
}
