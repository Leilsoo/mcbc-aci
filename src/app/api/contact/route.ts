// src/app/api/contact/route.ts
// Proxy serveur -> Formspree, avec anti-spam simple (honeypot + envoi trop rapide)

import { NextResponse } from "next/server";

// ⛳ Lis depuis l'env si dispo, sinon fallback sur ton ID actuel
const FORMSPREE_ID = process.env.FORMSPREE_ID ?? "xvgwzyen";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Ping simple (debug) */
export function GET() {
  return NextResponse.json({ ok: true, msg: "API prête" });
}

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({} as Record<string, string>));
    const { name, email, subject, message, website, t0 } = data || {};
    // ^ 'website' = honeypot (doit rester VIDE), 't0' = timestamp de rendu côté client

    // 1) Anti-spam: si le champ caché est rempli -> on ignore (on renvoie 202 « accepté »)
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    // 2) Anti-spam: si envoi trop rapide (< 800ms depuis le rendu) -> on ignore
    const now = Date.now();
    const t0Num = Number(t0);
    if (!Number.isNaN(t0Num) && now - t0Num < 800) {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    // 3) Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs requis manquants (name, email, message)." },
        { status: 400 }
      );
    }
    if (!FORMSPREE_ID) {
      return NextResponse.json(
        { error: "Configuration serveur manquante (FORMSPREE_ID)." },
        { status: 500 }
      );
    }

    // 4) Envoi à Formspree
    const upstream = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
      cache: "no-store",
    });

    const payload = await upstream.json().catch(() => ({}));

    // 5) Si Formspree propose une redirection (next), on la laisse telle quelle
    return NextResponse.json(payload, { status: upstream.status });
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur proxy côté serveur." },
      { status: 500 }
    );
  }
}
