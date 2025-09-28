// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";                 // ✅ importer les styles globaux une seule fois
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// -- Fonts Next (chargées en variables CSS) --
// NOTE: on applique les variables sur <html> (et non <body>) pour éviter un flash de styles
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// -- SEO basique --
// NOTE: on pourra enrichir plus tard (OpenGraph, images sociales, etc.)
export const metadata: Metadata = {
  title: { default: "MCBC.ACI — Expertise & Réalisations", template: "%s | MCBC.ACI" },
  description: "Entreprise MCBC.ACI — Services & Réalisations",
};

/**
 * Layout racine de l'app (App Router)
 * - Injecte la Navbar et le Footer sur toutes les pages
 * - <main id="content">{children}</main> = contenu spécifique à chaque route
 * - Ajout d’un lien "skip link" pour l’accessibilité (aller directement au contenu)
 * - Conteneur centralisé (max-w-6xl) avec padding latéral pour une lecture confortable
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* 
        NOTE:
        - min-h-dvh: hauteur min = 100% de la fenêtre (bon pour footer collé en bas)
        - antialiased: adoucit le rendu des polices
      */}
      <body className="min-h-dvh bg-white text-gray-900 antialiased">
        {/* Lien "aller au contenu" visible au focus (accessibilité clavier) */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow"
        >
          Aller au contenu principal
        </a>

        {/* ✅ barre de navigation globale */}
        <Navbar />

        {/* 
          Contenu des pages
          - max-w-6xl: largeur idéale pour du contenu lisible
          - px-4 sm:px-6 lg:px-8: marges internes responsives
          - py-8: respiration verticale
          - id="content": cible du lien d’accessibilité ci-dessus
        */}
        <main id="content" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* ✅ pied de page global */}
        <Footer />
      </body>
    </html>
  );
}
