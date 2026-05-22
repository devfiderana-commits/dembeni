import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import api from '../api/axios';
import './Home.css';

export default function Projet() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [categoryFilter, setCategoryFilter] = useState('Toutes');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        // Fallback vers les données statiques en cas d'erreur
        setProjects([
          {
            _id: 1,
            title: 'Rénovation du centre-ville',
            description: 'Modernisation des infrastructures urbaines et amélioration de l\'espace public.',
            status: 'En cours',
            budget: '2.5M €',
            completion: 75,
            category: 'Urbanisme',
            startDate: '2024-01-15',
            endDate: '2025-06-30',
          },
          {
            _id: 2,
            title: 'École primaire verte',
            description: 'Construction d\'une nouvelle école respectueuse de l\'environnement.',
            status: 'Planification',
            budget: '4.2M €',
            completion: 15,
            category: 'Éducation',
            startDate: '2024-03-01',
            endDate: '2026-12-31',
          },
          {
            _id: 3,
            title: 'Parc solaire communautaire',
            description: 'Installation de panneaux solaires pour produire de l\'énergie renouvelable.',
            status: 'Terminé',
            budget: '1.8M €',
            completion: 100,
            category: 'Énergie',
            startDate: '2023-06-01',
            endDate: '2024-02-28',
          },
          {
            _id: 4,
            title: 'Aménagement du parc municipal',
            description: 'Création d\'espaces verts et d\'aires de jeux pour les familles.',
            status: 'En cours',
            budget: '950K €',
            completion: 45,
            category: 'Environnement',
            startDate: '2024-04-01',
            endDate: '2025-09-30',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Terminé': return '#10b981';
      case 'En cours': return '#f59e0b';
      case 'Planification': return '#6b7280';
      case 'Suspendu': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Terminé': return 'fas fa-check-circle';
      case 'En cours': return 'fas fa-clock';
      case 'Planification': return 'fas fa-calendar-alt';
      case 'Suspendu': return 'fas fa-pause-circle';
      default: return 'fas fa-question-circle';
    }
  };

  // Filtrage et tri des projets
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Tous' || project.status === statusFilter;
      const matchesCategory = categoryFilter === 'Toutes' || project.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'completion':
          return b.completion - a.completion;
        case 'budget':
          const aBudget = parseFloat(a.budget.replace(/[^\d.]/g, ''));
          const bBudget = parseFloat(b.budget.replace(/[^\d.]/g, ''));
          return bBudget - aBudget;
        case 'status':
          const statusOrder = { 'Terminé': 4, 'En cours': 3, 'Planification': 2, 'Suspendu': 1 };
          return statusOrder[b.status] - statusOrder[a.status];
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchTerm, statusFilter, categoryFilter, sortBy]);

  // Obtenir les options uniques pour les filtres
  const statusOptions = ['Tous', ...new Set(projects.map(p => p.status))];
  const categoryOptions = ['Toutes', ...new Set(projects.map(p => p.category))];

  const SkeletonLoader = () => (
    <div className="projects-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="project-card skeleton">
          <div className="project-image skeleton-shimmer"></div>
          <div className="project-content">
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text skeleton-description"></div>
            <div className="skeleton-text skeleton-details"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="page-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Projets Municipaux</h1>
            <p>Chargement des projets...</p>
          </div>
        </section>
        <section className="content-section">
          <div className="container">
            <SkeletonLoader />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Projets Municipaux</h1>
          <p>Découvrez les initiatives et projets en cours pour améliorer notre commune</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                {categoryOptions.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="title">Trier par titre</option>
                <option value="completion">Trier par avancement</option>
                <option value="budget">Trier par budget</option>
                <option value="status">Trier par statut</option>
              </select>
            </div>
          </div>

          <div className="results-info">
            <span>{filteredAndSortedProjects.length} projet{filteredAndSortedProjects.length !== 1 ? 's' : ''} trouvé{filteredAndSortedProjects.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="content-section">
        <div className="container">
          <div className="section-intro">
            <h2>Nos Projets</h2>
            <p>La commune s'engage dans des projets ambitieux pour le bien-être de tous les habitants.</p>
          </div>

          {filteredAndSortedProjects.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>Aucun projet trouvé</h3>
              <p>Essayez de modifier vos critères de recherche.</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredAndSortedProjects.map((projet, index) => (
                <div
                  key={projet._id}
                  className="service-card-new project-card-enhanced"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="project-image">
                    <div className="project-placeholder">
                      <i className="fas fa-project-diagram"></i>
                    </div>
                    <div className="project-status" style={{ backgroundColor: getStatusColor(projet.status) }}>
                      <i className={getStatusIcon(projet.status)}></i>
                      <span>{projet.status}</span>
                    </div>
                  </div>

                  <div className="service-card-head">
                    <div className="service-icon-circle" style={{ backgroundColor: getStatusColor(projet.status) + '20', color: getStatusColor(projet.status) }}>
                      <i className={getStatusIcon(projet.status)}></i>
                    </div>
                    <div className="service-card-meta">
                      <div className="project-category">{projet.category}</div>
                      <h3>{projet.title}</h3>
                    </div>
                  </div>

                  <p className="service-card-desc">{projet.description}</p>

                  <div className="project-details">
                    <div className="detail-item">
                      <span className="detail-label">Budget:</span>
                      <span className="detail-value">{projet.budget || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Avancement:</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${projet.completion}%` }}
                        ></div>
                      </div>
                      <span className="detail-value">{projet.completion}%</span>
                    </div>
                    {projet.startDate && (
                      <div className="detail-item">
                        <span className="detail-label">Début:</span>
                        <span className="detail-value">{new Date(projet.startDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    )}
                    {projet.endDate && (
                      <div className="detail-item">
                        <span className="detail-label">Fin prévue:</span>
                        <span className="detail-value">{new Date(projet.endDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Participez à nos projets</h2>
            <p>Vos idées et suggestions sont précieuses pour l'avenir de notre commune.</p>
            <Link to="/contact" className="cta-button">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}