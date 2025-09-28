// src/app/api/contact/route.ts
// Proxy serveur -> Formspree, avec logs propres et sans variables inutilisées.

import { NextResponse } from "next/server";

// Lis depuis l'env si dispo, sinon fallback sur ton ID
const FORMSPREE_ID = process.env.FORMSPREE_ID ?? "xvgwzyen";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ ok: true, msg: "API prête" });
}

export async function POST(req: Request) {
  try {
    // 1) Parse JSON
    const data = (await req.json().catch(() => ({}))) as Record<string, string>;
    const { name, email, subject, message } = data;

    // 2) Validations
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

    // 3) Appel Formspree
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

    if (!upstream.ok) {
      console.error("[/api/contact] Formspree error:", upstream.status, payload);
    }

    // 4) Renvoie tel quel au client
    return NextResponse.json(payload, { status: upstream.status });
  } catch (error) {
    // ✅ on utilise la variable 'error' → plus d'avertissement ESLint
    console.error("[/api/contact] Exception:", error);
    return NextResponse.json({ error: "Erreur proxy côté serveur." }, { status: 500 });
  }
}
