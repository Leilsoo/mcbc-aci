import Image from "next/image";

/**
 * Hero (bannière d'accueil)
 * - Gros titre + sous-titre
 * - Boutons d'appel à l'action
 * - Image illustrative (remplace /public/hero.jpg par ton image)
 */
export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto grid max-w-6xl items-center gap-8 p-6 md:grid-cols-2">
        {/* Colonne texte */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Conception de sites web <span className="text-blue-600">clairs</span> & performants
          </h1>
          <p className="mt-4 text-gray-600 md:text-lg">
            MCBC.ACI vous accompagne de l’idée au déploiement : design, développement,
            SEO, et maintenance — le tout avec une exigence de qualité.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="/services"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Voir nos services
            </a>
            <a
              href="/contact"
              className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Nous contacter
            </a>
          </div>
        </div>

        {/* Colonne image (optionnelle) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow">
          {/* Remplace /hero.jpg par ton fichier dans /public */}
          <Image
            src="/hero.jpg"
            alt="Illustration de projets web MCBC.ACI"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
