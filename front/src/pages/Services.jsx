import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import '../pages/Home.css';

const defaultServices = [
  {
    _id: 'default-1',
    title: 'État Civil',
    description: 'Naissances, mariages, décès, livrets de famille. Délivrance d\'actes et apostilles officielles.',
    icon: 'fas fa-landmark',
    hours: 'Lun–Ven 8h–16h30',
    contact: '02 69 12 34 56',
    email: 'etatcivil@dembeni.fr',
  },
  {
    _id: 'default-2',
    title: 'Vie Scolaire',
    description: 'Inscriptions, périscolaire, cantine municipale et transport scolaire pour les enfants.',
    icon: 'fas fa-school',
    hours: 'Lun–Ven 8h–12h',
    contact: '02 69 34 56 78',
    email: 'scolarite@dembeni.fr',
  },
  {
    _id: 'default-3',
    title: 'Action Sociale',
    description: 'Accompagnement des familles, aide aux personnes âgées/handicapées et aides d\'urgence.',
    icon: 'fas fa-hands-helping',
    hours: 'Lun–Ven 8h–16h',
    contact: '02 69 56 78 90',
    email: 'ccas@dembeni.fr',
  },
  {
    _id: 'default-4',
    title: 'Urbanisme',
    description: 'Permis de construire, déclarations de travaux, consultation du PLU et conseils.',
    icon: 'fas fa-city',
    hours: 'Mar & Jeu 9h–12h',
    contact: '02 69 11 22 33',
    email: 'urbanisme@dembeni.fr',
  },
  {
    _id: 'default-5',
    title: 'Hygiène & Propreté',
    description: 'Collecte des ordures, encombrants, nettoiement des espaces publics et déchetterie.',
    icon: 'fas fa-recycle',
    hours: '7j/7 — programmé',
    contact: '02 69 44 55 66',
    email: 'proprete@dembeni.fr',
  },
  {
    _id: 'default-6',
    title: 'Petite Enfance',
    description: 'Crèche municipale et centre de loisirs. Accueil des enfants de 2 mois à 12 ans.',
    icon: 'fas fa-baby',
    hours: 'Lun–Ven 7h30–18h',
    contact: '02 69 77 88 99',
    email: 'petiteenfance@dembeni.fr',
  },
];

export default function Services() {
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/api/services');
        const fetchedServices = response.data.services || [];
        setServices(fetchedServices.length ? fetchedServices : defaultServices);
      } catch (err) {
        setError('Impossible de charger les services. Affichage du contenu par défaut.');
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    const text = [
      service.title,
      service.description,
      service.hours,
      service.contact,
      service.email,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return text.includes(query);
  });

  return (
    <>
      {/* BANNER */}
      <section className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb">
            <Link to="/"><i className="fas fa-home"></i> Accueil</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Services</span>
          </div>
          <h1><i className="fas fa-concierge-bell" style={{ opacity: 0.8, marginRight: 10 }}></i>Services Municipaux</h1>
          <p>Tous les services municipaux à votre disposition. Accueil, information, accompagnement dans vos démarches du quotidien.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-intro">
          <p className="eyebrow">Nos services</p>
          <h2>Des services clairs et accessibles pour chaque besoin</h2>
          <p className="section-copy">Retrouvez les contacts, horaires et informations pratiques pour chaque service municipal. Vous pouvez également contacter directement la mairie via la page de contact.</p>
        </div>

        {error && (
          <div className="page-alert error" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <div className="services-filter-bar">
          <div className="filter-input-group">
            <i className="fas fa-search"></i>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un service, un contact ou un horaire"
            />
          </div>
          {search && (
            <button type="button" className="btn-outline" onClick={() => setSearch('')}>
              Effacer
            </button>
          )}
        </div>

        <div className="services-grid">
          {loading ? (
            <div className="loading-state">Chargement des services…</div>
          ) : filteredServices.length === 0 ? (
            <div className="loading-state">Aucun service ne correspond à votre recherche.</div>
          ) : (
            filteredServices.map((service) => (
              <div key={service._id || service.id} className="service-card-new service-card-enhanced">
                <div className="service-card-head">
                  <div className="service-icon-circle">
                    <i className={service.icon}></i>
                  </div>
                  <div>
                    <span className="service-label">Service municipal</span>
                    <h3>{service.title}</h3>
                  </div>
                </div>

                <p className="service-description">{service.description}</p>

                <div className="service-meta-grid">
                  {service.hours && (
                    <div className="service-meta-item">
                      <i className="far fa-clock"></i>
                      <span>{service.hours}</span>
                    </div>
                  )}
                  {service.contact && (
                    <div className="service-meta-item">
                      <i className="fas fa-phone"></i>
                      <span>{service.contact}</span>
                    </div>
                  )}
                  {service.email && (
                    <div className="service-meta-item">
                      <i className="fas fa-envelope"></i>
                      <span>{service.email}</span>
                    </div>
                  )}
                </div>

                <Link to="/contact" className="btn-scn-main service-card-button">
                  <i className="fas fa-paper-plane"></i> Contacter ce service
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
