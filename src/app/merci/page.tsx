// src/app/merci/page.tsx
// ✅ Page de remerciement (utilise next/link au lieu de <a> pour un lien interne)
import Link from "next/link";

export default function MerciPage() {
  return (
    <section className="card mx-auto max-w-xl text-center">
      <h1 className="text-2xl font-bold">Merci !</h1>
      <p className="mt-2 text-sm text-foreground/80">
        Votre message a bien été envoyé. Nous revenons vers vous très vite.
      </p>
      {/* ✅ Link interne Next.js */}
      <Link href="/" className="btn-secondary mt-4 inline-block">
        Retour à l’accueil
      </Link>
    </section>
  );
}
