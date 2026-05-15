import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const services = [
    {
      id: 1,
      title: 'État Civil',
      description: 'Naissances, mariages, décès, livrets de famille. Délivrance d\'actes et apostilles officielles.',
      icon: 'fas fa-landmark',
      hours: 'Lun–Ven 8h–16h30',
      stats: [
        { label: 'Actes', value: '1200+' },
        { label: 'Délai', value: '48h' },
        { label: 'Demandes', value: '95%' },
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=60&w=400',
      link: '/demarches',
    },
    {
      id: 2,
      title: 'Vie Scolaire',
      description: 'Inscriptions, périscolaire, cantine municipale et transport scolaire pour les enfants.',
      icon: 'fas fa-school',
      hours: 'Lun–Ven 8h–12h',
      stats: [
        { label: 'Enfants', value: '850+' },
        { label: 'Écoles', value: '6' },
        { label: 'Satisfaction', value: '98%' },
      ],
      image: 'https://images.unsplash.com/photo-1427504494785-cdec1a0d8c66?auto=format&fit=crop&q=60&w=400',
      link: '/contact',
    },
    {
      id: 3,
      title: 'Action Sociale',
      description: 'Accompagnement des familles, aide aux personnes âgées/handicapées et aides d\'urgence.',
      icon: 'fas fa-hands-helping',
      hours: 'Lun–Ven 8h–16h',
      stats: [
        { label: 'Familles', value: '320+' },
        { label: 'Aides', value: '450K€' },
        { label: 'Projets', value: '12' },
      ],
      image: 'https://images.unsplash.com/photo-1516534775068-bb79dbc2e9a0?auto=format&fit=crop&q=60&w=400',
      link: '/contact',
    },
  ];

  const faqItems = [
    {
      question: 'Comment obtenir un acte d\'état civil ?',
      answer: 'Vous pouvez demander un acte en ligne ou vous présenter directement à la mairie. Délai de traitement : 48 heures.',
    },
    {
      question: 'Quels sont les horaires de la mairie ?',
      answer: 'Lundi à vendredi : 8h–12h et 13h30–16h30. Fermée le week-end et jours fériés.',
    },
    {
      question: 'Comment s\'inscrire à la collecte d\'encombrants ?',
      answer: 'Accédez à la page "Collecte" et remplissez le formulaire avant J-3 du passage prévu.',
    },
    {
      question: 'Quels objets sont acceptés à la collecte ?',
      answer: 'Meubles, électroménager, literie, cartons. Refusés : gravats, déchets verts, produits chimiques, pneus.',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">
              <i className="fas fa-star"></i> Bienvenue au portail citoyen
            </div>
            <h1>
              Dembéni — Votre <strong>Portail Citoyen</strong> Officiel
            </h1>
            <p>
              Accédez à tous les services municipaux, démarches administratives et informations pratiques de la commune de Dembéni, Mayotte.
            </p>
            <div className="hero-actions">
              <a href="#services" className="btn-hero-primary">
                <i className="fas fa-arrow-right"></i> Découvrir les services
              </a>
              <a href="#faq" className="btn-hero-ghost">
                <i className="fas fa-question-circle"></i> Questions fréquentes
              </a>
            </div>
          </div>
          <div className="hero-stats">
            <h3>Chiffres Clés</h3>
            <div className="hero-stat-row">
              <div className="stat-icon"><i className="fas fa-people-carry"></i></div>
              <div className="info">
                <div className="num">6,500+</div>
                <div className="lbl">Habitants</div>
              </div>
            </div>
            <div className="hero-stat-row">
              <div className="stat-icon"><i className="fas fa-handshake"></i></div>
              <div className="info">
                <div className="num">98%</div>
                <div className="lbl">Satisfaction</div>
              </div>
            </div>
            <div className="hero-stat-row">
              <div className="stat-icon"><i className="fas fa-rocket"></i></div>
              <div className="info">
                <div className="num">24/7</div>
                <div className="lbl">Disponible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section" id="services">
        <div className="section-header center">
          <span className="section-tag"><i className="fas fa-concierge-bell"></i> Municipal</span>
          <h2 className="section-title">Nos Services Principaux</h2>
          <div className="divider"></div>
          <p className="section-subtitle mt-2">
            Découvrez l'ensemble des services proposés aux habitants de Dembéni.
          </p>
        </div>

        <div className="services-grid" style={{ marginTop: '2rem' }}>
          {services.map((service) => (
            <div key={service.id} className="service-card-new">
              <div className="scn-img">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="scn-body">
                <div className="scn-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="scn-stats">
                  {service.stats.map((stat, idx) => (
                    <div key={idx} className="scn-stat">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="scn-actions">
                  <a href={service.link} className="scn-action-btn">
                    <i className="fas fa-info-circle"></i>
                    <span>Info</span>
                  </a>
                  <a href="/contact" className="scn-action-btn">
                    <i className="fas fa-phone"></i>
                    <span>Contacter</span>
                  </a>
                  <a href="/demarches" className="scn-action-btn">
                    <i className="fas fa-file-alt"></i>
                    <span>Démarches</span>
                  </a>
                </div>
                <a href={service.link} className="btn-scn-main">
                  <i className="fas fa-arrow-right"></i> Plus de détails
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COLLECTE HIGHLIGHT */}
      <section className="section">
        <div className="highlight-row">
          <div className="highlight-img">
            <img
              src="https://images.unsplash.com/photo-1559772264-b4b73514b66e?auto=format&fit=crop&q=60&w=500"
              alt="Collecte d'encombrants"
            />
          </div>
          <div className="highlight-content">
            <h2><i className="fas fa-recycle" style={{ marginRight: '10px' }}></i>Collecte d'Encombrants Décentralisée</h2>
            <p>
              Service 100% gratuit pour les habitants de Dembéni. Deux passages par mois dans votre quartier avec possibilité d'inscription en ligne.
            </p>
            <ul className="checklist">
              <li><i className="fas fa-check"></i> <strong>2 fois par mois</strong> — Calendrier régulier</li>
              <li><i className="fas fa-check"></i> <strong>100% gratuit</strong> — Sans frais supplémentaires</li>
              <li><i className="fas fa-check"></i> <strong>6 quartiers</strong> — Couverture complète</li>
              <li><i className="fas fa-check"></i> <strong>48h confirmation</strong> — Rapide et efficace</li>
            </ul>
            <Link to="/collecte" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              <i className="fas fa-calendar"></i> Voir le calendrier
            </Link>
          </div>
        </div>
      </section>

      {/* LOISIRS SECTION */}
      <section className="section section-fullwidth" style={{ backgroundColor: 'var(--vert-50)' }}>
        <div className="section-header center">
          <span className="section-tag"><i className="fas fa-smile"></i> Loisirs</span>
          <h2 className="section-title">Activités & Loisirs</h2>
          <div className="divider"></div>
        </div>

        <div className="activities-grid mt-3">
          <div className="activity-card">
            <i className="fas fa-tennis-ball fa-2x"></i>
            <span>Sports</span>
          </div>
          <div className="activity-card">
            <i className="fas fa-paint-brush fa-2x"></i>
            <span>Arts</span>
          </div>
          <div className="activity-card">
            <i className="fas fa-music fa-2x"></i>
            <span>Musique</span>
          </div>
          <div className="activity-card">
            <i className="fas fa-book fa-2x"></i>
            <span>Bibliothèque</span>
          </div>
          <div className="activity-card">
            <i className="fas fa-gamepad fa-2x"></i>
            <span>Jeux</span>
          </div>
          <div className="activity-card">
            <i className="fas fa-graduation-cap fa-2x"></i>
            <span>Formation</span>
          </div>
          <div className="activity-card">
            <i className="fas fa-film fa-2x"></i>
            <span>Cinéma</span>
          </div>
          <div className="activity-card">
            <i className="fas fa-utensils fa-2x"></i>
            <span>Gastronomie</span>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section" id="faq">
        <div className="section-header center">
          <span className="section-tag"><i className="fas fa-lightbulb"></i> Aide</span>
          <h2 className="section-title">Questions Fréquentes</h2>
          <div className="divider"></div>
        </div>

        <div className="faq-grid mt-3">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-card">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section">
        <div style={{
          background: 'linear-gradient(135deg, var(--vert-800), var(--vert-600))',
          borderRadius: 'var(--radius-xl)',
          padding: '3.5rem',
          textAlign: 'center',
          color: 'var(--blanc)',
        }}>
          <h2 style={{ color: 'var(--blanc)', fontSize: '1.8rem', marginBottom: '0.8rem' }}>
            Besoin d'aide ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Notre équipe est disponible pour répondre à toutes vos questions et vous orienter vers le bon service.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              <i className="fas fa-envelope"></i> Nous contacter
            </Link>
            <Link to="/demarches" className="btn btn-secondary btn-lg">
              <i className="fas fa-list"></i> Toutes les démarches
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
