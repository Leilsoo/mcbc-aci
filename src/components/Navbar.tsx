"use client";
import Link from "next/link";
import { useState } from "react";

/**
 * Navbar réutilisable + responsive
 * - Menu desktop (liens visibles)
 * - Menu mobile (bouton burger -> ouvre/ferme)
 * - Composant "client" car on utilise un state (useState)
 */
export default function Navbar() {
  // État local pour ouvrir/fermer le menu mobile
  const [open, setOpen] = useState(false);

  // Liste des liens du menu (facile à modifier/étendre plus tard)
  const links = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/realisations", label: "Réalisations" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        {/* Logo / Nom du site */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          aria-label="Retour à l'accueil MCBC.ACI"
        >
          MCBC<span className="text-blue-600">.ACI</span>
        </Link>

        {/* Bouton burger visible en mobile */}
        <button
          className="md:hidden inline-flex items-center rounded-lg border px-3 py-2 text-sm"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Ouvrir/fermer le menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Icône burger simple en CSS (3 barres) */}
          <span className="flex flex-col gap-1">
            <span className="block h-0.5 w-5 bg-current"></span>
            <span className="block h-0.5 w-5 bg-current"></span>
            <span className="block h-0.5 w-5 bg-current"></span>
          </span>
        </button>

        {/* Liens Desktop */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu Mobile (seulement quand open === true) */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t">
          <ul className="mx-auto flex max-w-6xl flex-col p-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setOpen(false)} // ferme le menu après clic
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
