/**
 * Footer simple et clair
 * - Zone de contact
 * - Copyright
 * - Facile à enrichir (réseaux sociaux, liens légaux)
 */
export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="mx-auto max-w-6xl p-6 text-sm text-gray-600">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>
            <span className="font-semibold">MCBC.ACI</span> — Expertise &amp; Réalisations
          </p>
          <p>
            Contact :{" "}
            <a
              href="mailto:contact@mcbc.aci"
              className="text-blue-600 hover:underline"
            >
              contact@mcbc.aci
            </a>
          </p>
        </div>
        <p className="mt-2 text-xs text-gray-400">&copy; {new Date().getFullYear()} MCBC.ACI. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
