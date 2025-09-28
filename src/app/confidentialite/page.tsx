/**
 * Politique de confidentialité (RGPD)
 * - Version simple : explique ce qui est collecté, pourquoi, comment et tes droits
 * - Adapte selon tes outils (Analytics, formulaires, etc.)
 */
export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray">
      <h1>Politique de confidentialité</h1>

      <p>
        La présente politique décrit la manière dont MCBC.ACI collecte, utilise et protège vos
        données personnelles dans le cadre de l’utilisation de ce site.
      </p>

      <h2>Responsable de traitement</h2>
      <p>
        MCBC.ACI — contact@mcbc-aci.fr — 00 rue Exemple, 75000 Paris, France.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li><strong>Formulaire de contact</strong> : nom, adresse e-mail, message.</li>
        <li><strong>Mesure d’audience</strong> (si activée) : données techniques anonymisées (pages vues, appareil, etc.).</li>
      </ul>

      <h2>Finalités</h2>
      <ul>
        <li>Répondre à vos demandes via le formulaire de contact.</li>
        <li>Améliorer le site et l’expérience utilisateur (statistiques anonymisées).</li>
      </ul>

      <h2>Base légale</h2>
      <ul>
        <li>Intérêt légitime pour la gestion des demandes entrantes.</li>
        <li>Consentement pour les cookies/mesures d’audience, le cas échéant.</li>
      </ul>

      <h2>Conservation</h2>
      <p>
        Les messages reçus via le formulaire sont conservés le temps nécessaire au traitement, puis
        archivés ou supprimés. Les données analytiques anonymisées peuvent être conservées plus longtemps.
      </p>

      <h2>Partage des données</h2>
      <p>
        Vos données ne sont ni vendues ni louées. Elles peuvent être hébergées chez des prestataires
        techniques (hébergeur, e-mail) offrant des garanties adéquates (ex. Vercel, fournisseur e-mail).
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d’un droit d’accès, de rectification, d’opposition, d’effacement et à la
        limitation du traitement. Pour l’exercer : contact@mcbc-aci.fr. Vous pouvez également
        introduire une réclamation auprès de la CNIL.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site peut utiliser des cookies techniques indispensables. Pour la mesure d’audience,
        nous privilégions des solutions respectueuses de la vie privée. Vous pouvez paramétrer vos
        préférences via votre navigateur. (Ajoute une bannière si tu actives des cookies non essentiels.)
      </p>

      <h2>Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données
        contre tout accès, modification, divulgation ou destruction non autorisés.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative à cette politique : contact@mcbc-aci.fr
      </p>

      <h2>Mises à jour</h2>
      <p>
        Cette politique peut être mise à jour. Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}.
      </p>
    </div>
  )
}
