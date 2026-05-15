import { Link } from 'react-router-dom';
import '../pages/Home.css';

export default function Demarches() {
  const demarches = [
    {
      id: 1,
      title: 'Demander un acte d\'état civil',
      description: 'Obtenir une copie d\'acte de naissance, mariage ou décès.',
      icon: 'fas fa-file-alt',
      steps: ['Vous présenter à la mairie', 'Fournir les justificatifs requis', 'Récupérer l\'acte sous 48h'],
      documents: ['Pièce d\'identité', 'Justificatif de domicile'],
    },
    {
      id: 2,
      title: 'Inscription scolaire',
      description: 'Inscrire votre enfant à l\'école maternelle ou élémentaire.',
      icon: 'fas fa-graduation-cap',
      steps: ['Remplir le formulaire d\'inscription', 'Fournir les documents demandés', 'Valider auprès du directeur'],
      documents: ['Livret de famille', 'Carnet de vaccination', 'Justificatif de domicile'],
    },
    {
      id: 3,
      title: 'Permis de construire',
      description: 'Demander une autorisation de construction ou de rénovation.',
      icon: 'fas fa-home',
      steps: ['Déposer un dossier complet', 'Consultation publique (30 jours)', 'Retrait de l\'autorisation'],
      documents: ['Plans du projet', 'Étude d\'impact', 'Certificat d\'urbanisme'],
    },
    {
      id: 4,
      title: 'Allocation personnalisée d\'autonomie',
      description: 'Bénéficier d\'aides pour les personnes en perte d\'autonomie.',
      icon: 'fas fa-wheelchair',
      steps: ['Demander l\'APA', 'Évaluation par une assistante sociale', 'Mise en place du plan d\'aide'],
      documents: ['Avis d\'imposition', 'Certificat médical', 'Justificatif de domicile'],
    },
    {
      id: 5,
      title: 'Demande de logement social',
      description: 'Postuler pour accéder à un logement social.',
      icon: 'fas fa-building',
      steps: ['Compléter le dossier de candidature', 'Transmission au gestionnaire', 'Classement sur liste d\'attente'],
      documents: ['Avis d\'imposition', 'Contrat de travail', 'Justificatif de domicile'],
    },
    {
      id: 6,
      title: 'Aide alimentaire d\'urgence',
      description: 'Accéder rapidement à une aide alimentaire en situation difficile.',
      icon: 'fas fa-shopping-cart',
      steps: ['Contacter le CCAS', 'Justifier la situation d\'urgence', 'Recevoir l\'aide rapidement'],
      documents: ['Justificatif de domicile', 'Justificatif de revenu récent'],
    },
  ];

  return (
    <>
      {/* BANNER */}
      <section className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb">
            <Link to="/"><i className="fas fa-home"></i> Accueil</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Démarches</span>
          </div>
          <h1><i className="fas fa-list-check" style={{ opacity: 0.8, marginRight: 10 }}></i>Démarches Administratives</h1>
          <p>Découvrez toutes les démarches administratives et accédez aux services municipaux en ligne.</p>
        </div>
      </section>

      {/* DEMARCHES GRID */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {demarches.map((demarche) => (
            <div key={demarche.id} style={{ background: 'var(--blanc)', border: '1px solid var(--gris-200)', borderRadius: 'var(--radius-lg)', padding: '2rem', transition: 'var(--transition)' }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--vert-50)', border: '1px solid var(--vert-100)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--vert-600)', marginBottom: '1rem' }}>
                <i className={demarche.icon}></i>
              </div>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--vert-800)' }}>{demarche.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--gris-500)', marginBottom: '1.5rem' }}>{demarche.description}</p>
              
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--vert-700)' }}>Étapes :</h4>
              <ol style={{ fontSize: '0.82rem', color: 'var(--gris-600)', marginBottom: '1.5rem', marginLeft: '1.2rem' }}>
                {demarche.steps.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: '0.3rem' }}>{step}</li>
                ))}
              </ol>

              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--vert-700)' }}>Documents requis :</h4>
              <ul style={{ fontSize: '0.82rem', color: 'var(--gris-600)', marginLeft: '1.2rem' }}>
                {demarche.documents.map((doc, idx) => (
                  <li key={idx} style={{ marginBottom: '0.2rem' }}>{doc}</li>
                ))}
              </ul>

              <Link to="/contact" className="btn-scn-main" style={{ marginTop: '1.5rem' }}>
                <i className="fas fa-question-circle"></i> Besoin d'aide ?
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* HELP SECTION */}
      <section className="section">
        <div style={{ background: 'linear-gradient(135deg, var(--vert-800), var(--vert-600))', borderRadius: 'var(--radius-xl)', padding: '3.5rem', textAlign: 'center', color: 'var(--blanc)' }}>
          <h2 style={{ color: 'var(--blanc)', fontSize: '1.8rem', marginBottom: '0.8rem' }}>
            Vous avez des questions ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Notre équipe est disponible pour vous aider dans vos démarches.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              <i className="fas fa-envelope"></i> Nous contacter
            </Link>
            <a href="tel:02 69 12 00 00" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.2)', border: '1.5px solid rgba(255, 255, 255, 0.4)', color: 'var(--blanc)', padding: '1rem 2.5rem', borderRadius: 'var(--radius-pill)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', transition: 'var(--transition)' }}>
              <i className="fas fa-phone"></i> Appeler
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
