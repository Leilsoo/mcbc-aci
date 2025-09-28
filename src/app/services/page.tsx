// app/services/page.tsx
import type { Metadata } from "next";

/**
 * NOTE SEO:
 * - On définit un titre spécifique pour cette page.
 * - Next.js fusionne avec le template défini dans le layout.
 */
export const metadata: Metadata = {
  title: "Services",
  description: "Découvrez les services proposés par MCBC.ACI.",
};

/**
 * Page /services
 * - Présente 3 à 6 services de façon lisible
 * - Utilise une grille responsive Tailwind
 * - Tout est statique pour l’instant (facile à éditer)
 */
export default function ServicesPage() {
  // 🧱 Données de services en local (facile à modifier)
  const services = [
    {
      title: "Sites vitrines & corporate",
      desc:
        "Création de sites clairs, modernes et responsifs. Idéal pour présenter votre activité et générer des contacts.",
    },
    {
      title: "E-commerce (Woo/Shopify)",
      desc:
        "Mise en place d’une boutique en ligne fiable, paiement sécurisé, catalogues produits, et suivi des commandes.",
    },
    {
      title: "Web Apps & back-office",
      desc:
        "Applications web sur mesure (tableaux de bord, CRM, intranet) avec une base de données solide.",
    },
    {
      title: "SEO & performance",
      desc:
        "Optimisation du référencement, de la vitesse, et des bonnes pratiques techniques pour gagner en visibilité.",
    },
    {
      title: "Maintenance & support",
      desc:
        "Mises à jour, sauvegardes, corrections, et petites évolutions pour garder votre site sain et sécurisé.",
    },
    {
      title: "Conseil & audit",
      desc:
        "Audit technique/UX, feuille de route et accompagnement pour faire évoluer votre présence digitale.",
    },
  ];

  return (
    <section className="space-y-8">
      {/* Titre de page */}
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Nos services</h1>
        <p className="text-gray-600">
          Une offre claire, orientée résultat. Choisissez un bloc, on s’occupe du reste.
        </p>
      </header>

      {/* Grille de cartes services */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li
            key={s.title}
            className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
