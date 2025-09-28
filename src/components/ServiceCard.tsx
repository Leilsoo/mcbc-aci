/**
 * Carte Service
 * - Affiche un titre + description courte
 * - Utilisée dans la liste des services
 */
export default function ServiceCard({ title, desc }: { title: string; desc: string }) {
  return (
    <article className="rounded-2xl border p-6 shadow-sm transition hover:shadow">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </article>
  )
}
