// src/app/thanks/page.tsx
// ✅ Page serveur qui redirige /thanks vers /merci
import { redirect } from "next/navigation";

export default function ThanksAlias() {
  // redirection immédiate côté serveur (pas de "use client")
  redirect("/merci");
}
