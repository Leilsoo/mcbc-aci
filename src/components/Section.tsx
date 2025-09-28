/**
 * Section générique
 * - Standardise marges + titres pour toutes les sections
 * - Réutilisable (Services, Contact, FAQ, etc.)
 */
export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  )
}
