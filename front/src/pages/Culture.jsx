import { Link } from 'react-router-dom';
import './Culture.css';

export default function Culture() {
  const heritageItems = [
    {
      id: 1,
      title: 'Architecture Traditionnelle',
      description: 'Découvrez l\'architecture unique de Dembéni avec ses maisons traditionnelles et bâtiments historiques.',
      icon: 'fas fa-gopuram',
      image: 'https://images.unsplash.com/photo-1577720600787-32a5a4a172db?auto=format&fit=crop&q=60&w=400',
    },
    {
      id: 2,
      title: 'Traditions Locales',
      description: 'Immergez-vous dans les traditions culturelles, fêtes et cérémonies de notre commune.',
      icon: 'fas fa-drum',
      image: 'https://images.unsplash.com/photo-1533356122544-f006fcf1e7ca?auto=format&fit=crop&q=60&w=400',
    },
    {
      id: 3,
      title: 'Arts et Artisanat',
      description: 'Explorez le savoir-faire local, les métiers traditionnels et les créations artisanales.',
      icon: 'fas fa-palette',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&q=60&w=400',
    },
    {
      id: 4,
      title: 'Gastronomie Locale',
      description: 'Savourez les saveurs authentiques de la cuisine traditionnelle de Mayotte.',
      icon: 'fas fa-utensils',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=60&w=400',
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Festival de la Culture',
      date: '15 Juin 2026',
      location: 'Place du Village',
      description: 'Célébration annuelle des traditions locales avec musique, danse et gastronomie.',
    },
    {
      id: 2,
      title: 'Exposition d\'Art Local',
      date: '22 Juin 2026',
      location: 'Mairie de Dembéni',
      description: 'Exposition mettant en avant les œuvres des artistes locaux.',
    },
    {
      id: 3,
      title: 'Visite Guidée du Patrimoine',
      date: 'Tous les samedis',
      location: 'Points de rendez-vous',
      description: 'Découvrez l\'histoire et l\'architecture de Dembéni avec nos guides.',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero culture-hero">
        <div className="hero-bg"></div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">
              <i className="fas fa-palette"></i> Richesse Culturelle
            </div>
            <h1>
              Culture et <strong>Patrimoine</strong> de Dembéni
            </h1>
            <p>
              Explorez la richesse historique, les traditions et la diversité culturelle de notre belle commune.
            </p>
            <div className="hero-actions">
              <a href="#heritage" className="btn-hero-primary">
                <i className="fas fa-arrow-right"></i> Découvrir le patrimoine
              </a>
              <a href="#events" className="btn-hero-ghost">
                <i className="fas fa-calendar"></i> Événements à venir
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HERITAGE SECTION */}
      <section className="section" id="heritage">
        <div className="section-header center">
          <span className="section-tag"><i className="fas fa-book"></i> Patrimoine</span>
          <h2 className="section-title">Notre Héritage Culturel</h2>
          <div className="divider"></div>
          <p className="section-subtitle mt-2">
            Découvrez les éléments clés qui définissent la culture de Dembéni.
          </p>
        </div>

        <div className="services-grid" style={{ marginTop: '2rem' }}>
          {heritageItems.map((item) => (
            <div key={item.id} className="service-card-new">
              <div className="scn-img">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="scn-body">
                <div className="scn-icon">
                  <i className={item.icon}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="section" id="events">
        <div className="section-header center">
          <span className="section-tag"><i className="fas fa-calendar-alt"></i> Événements</span>
          <h2 className="section-title">Événements Culturels</h2>
          <div className="divider"></div>
          <p className="section-subtitle mt-2">
            Participez aux événements et manifestations culturelles organisés par la commune.
          </p>
        </div>

        <div className="events-list" style={{ marginTop: '2rem' }}>
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-date">
                <i className="fas fa-calendar"></i>
                <span>{event.date}</span>
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p className="event-location">
                  <i className="fas fa-map-marker-alt"></i> {event.location}
                </p>
                <p className="event-description">{event.description}</p>
              </div>
              <Link to="/contact" className="btn-event">
                En savoir plus
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section section-cta">
        <div className="section-header center">
          <h2 className="section-title">Participez à la Vie Culturelle</h2>
          <p className="section-subtitle">
            Vous avez un événement culturel à proposer ou souhaitez nous aider ?
          </p>
          <Link to="/contact" className="btn-hero-primary">
            <i className="fas fa-envelope"></i> Nous Contacter
          </Link>
        </div>
      </section>
    </>
  );
}
