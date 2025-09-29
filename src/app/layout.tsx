// src/app/layout.tsx
// 🧭 Layout racine (App Router)
// - Injecte Navbar & Footer sur toutes les pages
// - Centralise le SEO global (OpenGraph, Twitter, Canonical)
// - Lit l'URL publique depuis NEXT_PUBLIC_SITE_URL (env)

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// -- Fonts Next (variables CSS pour Tailwind) --
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// -- URL de base du site pour générer des liens absolus (robots/sitemap/OG) --
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * SEO global
 * NOTE:
 * - metadataBase permet d'avoir des URLs absolues correctes en og:, canonical, etc.
 * - On garde ton template de titre existant.
 * - Pour une image OG: place par ex. /public/og.jpg puis dé-commente la ligne images.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MCBC.ACI — Expertise & Réalisations",
    template: "%s | MCBC.ACI",
  },
  description: "Entreprise MCBC.ACI — Services & Réalisations",

  // Canonical global (la plupart des pages héritent de / ; on ajustera si besoin par page)
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    siteName: "MCBC.ACI",
    url: siteUrl,
    title: "MCBC.ACI — Expertise & Réalisations",
    description:
      "Développement web & accompagnement : services, réalisations, contact.",
    // images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "MCBC.ACI" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "MCBC.ACI — Expertise & Réalisations",
    description:
      "Développement web & accompagnement : services, réalisations, contact.",
    // images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-white text-gray-900 antialiased`}
      >
        <Navbar />       {/* barre de navigation globale */}
        <main>{children}</main>
        <Footer />       {/* pied de page global */}
      </body>
    </html>
  );
}
