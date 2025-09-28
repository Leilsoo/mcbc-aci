// src/app/contact/ContactForm.tsx
"use client";

import { useState } from "react";

// ✅ On décrit le format possible de la réponse Formspree
type FormspreeResponse = {
  ok?: boolean;
  next?: string; // ex: "/thanks"
  error?: string;
  errors?: { message?: string }[];
};

/**
 * Formulaire de contact
 * - Envoie vers /api/contact (proxy serveur)
 * - Corrige le 'any' : typage explicite FormspreeResponse
 * - Corrige le reset du form (event pooling React)
 * - Redirige vers /merci (ou vers json.next si fourni)
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
      // 1) Récupère les champs du formulaire
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries()); // { name, email, subject, message, ... }

      // 2) Appel à l’API locale
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 3) Lit la réponse (texte → JSON typé)
      const bodyText = await res.text();
      let json: FormspreeResponse | null = null;
      try {
        json = JSON.parse(bodyText) as FormspreeResponse;
      } catch {
        json = null; // pas grave si ce n’est pas du JSON
      }

      // 4) Succès vs erreur
      if (res.ok) {
        setStatus("ok");
        form.reset();

        // Redirection : priorise le "next" si fourni, sinon /merci
        const nextUrl =
          (json?.next && typeof json.next === "string" ? json.next : "/merci");
        window.location.href = nextUrl;
      } else {
        const message =
          json?.errors?.[0]?.message ??
          (typeof json?.error === "string" ? json.error : null) ??
          "Impossible d'envoyer le message pour le moment.";
        setErrorMsg(message);
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erreur réseau. Vérifiez votre connexion.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="md:col-span-2 card" aria-live="polite">
      {/* (facultatif) champs anti-spam si tu les avais : t0 / website */}

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
