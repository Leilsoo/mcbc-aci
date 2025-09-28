// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "./ContactForm"; // ✅ on importe le composant client

/**
 * NOTE SEO
 * - Ici on peut exporter `metadata` car CE FICHIER est un Server Component (pas de "use client")
 */
export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez MCBC.ACI pour votre projet web.",
};

/**
 * Page /contact (Server Component)
 * - Structure + contenu statique
 * - Le formulaire interactif est délégué à <ContactForm /> (Client Component)
 */
export default function ContactPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1>Contact</h1>
        <p className="text-ink-600">
          Décrivez votre besoin, on vous répond rapidement avec une proposition claire.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <aside className="card">
          <h2 className="text-lg font-semibold">Coordonnées</h2>
          <ul className="mt-3 space-y-1 text-sm text-ink-700">
            <li><span className="font-medium">Email :</span> contact@mcbc.aci</li>
            <li><span className="font-medium">Zone :</span> Paris & alentours (remote possible)</li>
          </ul>

          <h3 className="mt-6 font-semibold">Délai & process</h3>
          <p className="mt-2 text-sm text-ink-600">
            On planifie un appel de 15–20 min, puis on vous envoie un devis + planning.
          </p>
        </aside>

        <ContactForm />
      </div>
    </section>
  );
}