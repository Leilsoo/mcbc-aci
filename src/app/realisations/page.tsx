// app/realisations/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

/**
 * NOTE SEO
 */
export const metadata: Metadata = {
  title: "Réalisations",
  description: "Quelques réalisations et projets menés par MCBC.ACI.",
};

/**
 * Page /realisations
 * - Grille d’images + titre + courte description
 * - Remplace les images par tes vraies (place-les dans /public)
 */
export default function RealisationsPage() {
  // 🧱 Données mock (à remplacer par tes projets)
  const works = [
    {
      title: "Site vitrine artisan",
      img: "/work-1.jpg", // ➜ place un fichier /public/work-1.jpg
      desc: "Branding simple, pages services et formulaire de contact.",
    },
    {
      title: "E-commerce textile",
      img: "/work-2.jpg",
      desc: "Catalogue produits, filtres, panier et paiement sécurisé.",
    },
    {
      title: "Dashboard interne",
      img: "/work-3.jpg",
      desc: "Suivi d’activité, exports CSV et rôles utilisateurs.",
    },
    {
      title: "Landing page événement",
      img: "/work-4.jpg",
      desc: "Page promo, compte à rebours et collecte d’emails.",
    },
    {
      title: "Refonte SEO/Perf",
      img: "/work-5.jpg",
      desc: "Amélioration Core Web Vitals et structure sémantique.",
    },
    {
      title: "Intranet d’équipe",
      img: "/work-6.jpg",
      desc: "Espace privé, gestion de documents et authentification.",
    },
  ];

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Réalisations</h1>
        <p className="text-gray-600">
          Un aperçu de ce que nous avons livré. D’autres exemples sur demande.
        </p>
      </header>

      {/* Grille responsive d’images */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w) => (
          <li key={w.title} className="group overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="relative aspect-[4/3]">
              {/* 
                ⚠️ Remplace les images par de vraies images dans /public
                Si tu n’as pas encore d’images, laisse tel quel: image cassée = normal en dev
              */}
              <Image
                src={w.img}
                alt={w.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold">{w.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{w.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
