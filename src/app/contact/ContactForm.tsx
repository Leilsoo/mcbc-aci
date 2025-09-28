// src/app/contact/ContactForm.tsx
"use client";

import { useState } from "react";

/**
 * Formulaire de contact (client)
 * - Envoie vers /api/contact
 * - Redirige vers /merci si l'API renvoie un "next"
 * - Anti-spam: champ caché "website" + délai minimal via "t0"
 * - Nettoyage: panneau DEBUG retiré (tu peux le remettre si besoin)
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // ⚠️ garder la ref avant tout await

    setStatus("sending");
    setErrorMsg(null);

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // On lit le texte puis on tente JSON
      const bodyText = await res.text();
      let json: any = null;
      try { json = JSON.parse(bodyText); } catch {}

      if (res.ok) {
        setStatus("ok");
        form.reset(); // ✅ reset via la ref

        // ➜ Si l'API renvoie une URL "next" (Formspree), on redirige
      // ✅ On force une redirection locale cohérente
if (json?.ok) window.location.href = "/merci";

      } else {
        setErrorMsg(
          json?.errors?.[0]?.message ||
          json?.error ||
          "Impossible d'envoyer le message pour le moment."
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erreur réseau. Vérifiez votre connexion.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="md:col-span-2 card" aria-live="polite">
      {/* 🕵️ Honeypot: champs cachés que les humains ne remplissent pas */}
      <input type="hidden" name="t0" defaultValue={Date.now().toString()} />
      <div className="hidden" aria-hidden="true">
        <label>Ne pas remplir ce champ <input name="website" autoComplete="off" tabIndex={-1} /></label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Nom</label>
          <input
            id="name"
            name="name"
            required
            placeholder="Jean Dupont"
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jean.dupont@email.com"
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
          <input
            id="subject"
            name="subject"
            placeholder="Refonte site vitrine / Création e-commerce…"
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Décrivez votre besoin, votre budget estimatif, et l’échéance souhaitée."
            className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" disabled={status === "sending"} className="btn-primary">
          {status === "sending" ? "Envoi en cours…" : "Envoyer"}
        </button>

        {status === "ok" && (
          <span className="text-sm text-green-600">
            Merci ! Votre message a bien été envoyé.
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-600">
            {errorMsg ?? "Oups, une erreur est survenue. Réessayez."}
          </span>
        )}
      </div>
    </form>
  );
}
