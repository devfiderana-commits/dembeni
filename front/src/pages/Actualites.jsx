import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import NewsSection from './NewsSection';
import EventsSection from './EventsSection';
import './Actualites.css';

const defaultNews = [
  {
    _id: 'default-1',
    title: 'Inauguration du Centre Communautaire',
    excerpt: 'Le nouveau centre communautaire a été inauguré en présence des autorités locales et nationales.',
    content: 'Un nouvel espace dédié aux activités culturelles et sociales pour les habitants de Dembéni.',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=60&w=400',
    publishedAt: '2026-05-10T00:00:00.000Z',
  },
  {
    _id: 'default-2',
    title: 'Programme de Collecte d\'Encombrants Étendu',
    excerpt: 'Suite au succès du programme initial, la collecte s\'étend à trois nouveaux quartiers.',
    content: 'Les habitants peuvent maintenant bénéficier du service dans tous les secteurs de la commune.',
    category: 'Environnement',
    image: 'https://images.unsplash.com/photo-1559027615-cd3628902d4a?auto=format&fit=crop&q=60&w=400',
    publishedAt: '2026-05-05T00:00:00.000Z',
  },
  {
    _id: 'default-3',
    title: 'Nouveaux Services en Ligne pour l\'État Civil',
    excerpt: 'Demandez vos actes d\'état civil en ligne et recevez-les par courrier sécurisé.',
    content: 'Simplification des démarches administratives pour plus de commodité.',
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4d8520337?auto=format&fit=crop&q=60&w=400',
    publishedAt: '2026-05-01T00:00:00.000Z',
  },
];

const defaultEvents = [
  {
    _id: 'event-1',
    title: 'Fête de la Culture Locale',
    excerpt: 'Musique, artisanat et cuisine traditionnelle pendant tout un weekend.',
    location: 'Parc Municipal de Dembéni',
    date: '2026-06-12',
    time: '14h00 - 20h00',
    image: 'https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&q=60&w=400',
  },
  {
    _id: 'event-2',
    title: 'Forum Jeunesse et Emploi',
    excerpt: 'Rencontrez des conseillers emploi et découvrez les formations locales.',
    location: 'Maison des Jeunes',
    date: '2026-06-20',
    time: '09h00 - 15h00',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=60&w=400',
  },
  {
    _id: 'event-3',
    title: 'Nettoyage Collectif du Littoral',
    excerpt: 'Participez à la préservation de notre environnement côtier.',
    location: 'Plage de Dembéni',
    date: '2026-06-28',
    time: '08h00 - 12h00',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=60&w=400',
  },
];

export default function Actualites() {
  const [news, setNews] = useState(defaultNews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/news');
        const fetchedNews = response.data.news || [];
        setNews(fetchedNews.length ? fetchedNews : defaultNews);
      } catch {
        setError('Impossible de charger les actualités. Affichage du contenu par défaut.');
        setNews(defaultNews);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = ['Tous', ...Array.from(new Set(news.map((item) => item.category)))];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero actualites-hero">
        <div className="hero-bg"></div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">
              <i className="fas fa-newspaper"></i> Restez Informé
            </div>
            <h1>
              Actualités de <strong>Dembéni</strong>
            </h1>
            <p>
              Découvrez les dernières nouvelles, annonces et mises à jour de votre commune.
            </p>
            <div className="hero-actions">
              <a href="#news" className="btn-hero-primary">
                <i className="fas fa-arrow-right"></i> Lire les actualités
              </a>
              <Link to="/contact" className="btn-hero-ghost" aria-label="S'abonner aux alertes">
                <i className="fas fa-bell" aria-hidden="true"></i> S'abonner aux alertes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <section className="section section-loading">
          <div className="section-header center">
            <h2 className="section-title">Chargement des actualités...</h2>
            <div className="divider"></div>
          </div>
        </section>
      )}

      {/* NEWS SECTION */}
      <section className="section" id="news">
        <div className="section-header center">
          <span className="section-tag"><i className="fas fa-bullhorn"></i> Nouvelles</span>
          <h2 className="section-title">Dernières Actualités</h2>
          <div className="divider"></div>
          <p className="section-subtitle mt-2">
            Restez à jour avec les derniers développements de Dembéni.
          </p>
        </div>
        {error && <div className="alert-message">{error}</div>}

        {/* FILTER BUTTONS */}
        <div className="categories-filter">
          {categories.map((cat, idx) => (
            <button key={idx} className={`filter-btn ${idx === 0 ? 'active' : ''}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* NEWS GRID */}
        <div className="news-grid">
          {news.map((article) => (
            <article key={article._id} className="news-card">
              <div className="news-image">
                <img src={article.image || 'https://images.unsplash.com/photo-1509474520651-8b7d4a95d8ef?auto=format&fit=crop&q=60&w=400'} alt={article.title} />
                <span className="news-category">{article.category}</span>
              </div>
              <div className="news-body">
                <div className="news-date">
                  <i className="fas fa-calendar"></i>
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <button
                  type="button"
                  className="btn-read-more"
                  aria-label={`Lire l'article : ${article.title}`}
                >
                  Voir plus <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
              <div className="notch-container">
                <button
                  type="button"
                  className="action-btn"
                  aria-label={`Voir l'article ${article.title}`}
                >
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="load-more-container">
          <button className="btn-load-more">
            <i className="fas fa-redo"></i> Charger plus d'actualités
          </button>
        </div>
      </section>

      {/* EVENTS SECTION COMPONENT */}
      <EventsSection defaultEvents={defaultEvents} />

      {/* NEWS SECTION COMPONENT */}
      <NewsSection />

      {/* NEWSLETTER SECTION */}
      <section className="section section-newsletter">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Restez Informé</h2>
            <p>Abonnez-vous à notre newsletter pour recevoir les mises à jour directement dans votre boîte mail.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Entrez votre email" required />
              <button type="submit" className="btn-subscribe">
                <i className="fas fa-paper-plane"></i> S'abonner
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}