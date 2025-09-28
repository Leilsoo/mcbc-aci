/**
 * Page Mentions légales (obligatoire en France)
 * - Remplis les champs ENTREPRISE/CONTACT/HÉBERGEUR avec tes vraies infos
 * - Garde une structure claire (titres <h2>, <h3>)
 */
export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray">
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        <strong>MCBC.ACI</strong><br />
        Forme juridique : (ex. SAS / Auto-entreprise)<br />
        Capital social : (le cas échéant)<br />
        SIREN / SIRET : (à compléter)<br />
        Siège social : 00 rue Exemple, 75000 Paris, France<br />
        Email : contact@mcbc-aci.fr<br />
        Téléphone : 01 23 45 67 89
      </p>

      <h2>Directeur / Directrice de la publication</h2>
      <p>Nom Prénom</p>

      <h2>Hébergement</h2>
      <p>
        Hébergeur : Vercel Inc.<br />
        Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
        Site : https://vercel.com
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Le présent site et l’ensemble de son contenu (textes, images, logos, etc.) sont la propriété
        de MCBC.ACI ou de leurs auteurs respectifs. Toute reproduction, représentation, modification,
        publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le
        procédé utilisé, est interdite sans autorisation écrite préalable.
      </p>

      <h2>Responsabilité</h2>
      <p>
        MCBC.ACI s’efforce d’assurer l’exactitude et la mise à jour des informations diffusées sur le site,
        sans toutefois pouvoir garantir l’absence d’erreurs ou d’omissions. L’utilisateur reconnaît
        utiliser ces informations sous sa responsabilité exclusive.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Les informations collectées via le formulaire de contact sont traitées afin de répondre à vos
        demandes. Pour plus d’informations, consultez notre <a href="/confidentialite">Politique de confidentialité</a>.
      </p>

      <h2>Crédits</h2>
      <p>
        Design & développement : MCBC.ACI. Images libres de droits ou utilisées avec autorisation.
      </p>
    </div>
  )
}
