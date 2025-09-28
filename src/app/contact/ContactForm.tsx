// src/app/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ pour rediriger proprement en client

// ✅ Format de réponse possible (utile si tu veux lire des erreurs renvoyées)
type FormspreeResponse = {
  ok?: boolean;
  next?: string;
  error?: string;
  errors?: { message?: string }[];
};

/**
 * Formulaire de contact
 * - Envoie vers /api/contact (proxy serveur -> Formspree)
 * - Corrige l’event pooling (on stocke la ref du <form>)
 * - ✅ Redirection forcée vers /merci (au lieu d’utiliser json.next)
 */
export default function ContactForm() {
  const router = useRouter(); // ✅ pour router.push('/merci')

  // 🧠 États d’UI
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ⚠️ Important : garder la ref du <form> avant tout await (sinon event pooling React)
    const form = e.currentTarget;

    setStatus("sending");
    setErrorMsg(null);

    try {
      // 1) Récupère les champs du formulaire
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries()); // { name, email, subject, message }

      // 2) Appel à notre API locale (même origine -> pas de CORS)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 3) Lecture tolérante de la réponse (texte -> JSON typé si possible)
      const bodyText = await res.text();
      let json: FormspreeResponse | null = null;
      try {
        json = JSON.parse(bodyText) as FormspreeResponse;
      } catch {
        json = null; // pas bloquant si ce n’est pas du JSON
      }

      // 4) Gestion succès/erreur
      if (res.ok) {
        setStatus("ok");
        form.reset();              // ✅ reset avec la ref
        router.push("/merci");     // ✅ redirection FORCÉE vers /merci (plus de /thanks)
        return;
      }

      // ❌ Cas erreur : on affiche un message utile
      const message =
        json?.errors?.[0]?.message ??
        (typeof json?.error === "string" ? json.error : null) ??
        "Impossible d'envoyer le message pour le moment.";
      setErrorMsg(message);
      setStatus("error");
    } catch {
      // ❌ Erreur réseau (ou autre exception inattendue)
      setErrorMsg("Erreur réseau. Vérifiez votre connexion.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="md:col-span-2 card" aria-live="polite">
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
