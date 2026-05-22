import { useState } from 'react';
import './EventsSection.css';

export default function EventsSection({ defaultEvents }) {
  // === DONNÉES DES ÉVÉNEMENTS (Dembéni) ===
  const mainEvents = [
    {
      id: 'event1',
      tag: 'culture',
      tagLabel: 'Culture',
      tagColor: '#dfff00',
      date: '12 Juin 2026',
      location: 'Parc Municipal',
      title: 'Fête de la Culture Locale',
      image: 'https://picsum.photos/800/400?random=20',
      time: '14h00 - 20h00',
      excerpt: 'Musique, artisanat et cuisine traditionnelle pendant tout un weekend.',
      large: true,
    },
    {
      id: 'event2',
      tag: 'emploi',
      tagLabel: 'Emploi & Formation',
      tagColor: '#7fffd4',
      date: '20 Juin 2026',
      location: 'Maison des Jeunes',
      title: 'Forum Jeunesse et Emploi',
      image: 'https://picsum.photos/400/300?random=21',
      time: '09h00 - 15h00',
      excerpt: 'Rencontrez des conseillers emploi et découvrez les formations locales.',
      large: false,
    },
    {
      id: 'event3',
      tag: 'environnement',
      tagLabel: 'Environnement',
      tagColor: '#f0a3ff',
      date: '28 Juin 2026',
      location: 'Plage de Dembéni',
      title: 'Nettoyage Collectif du Littoral',
      image: 'https://picsum.photos/400/300?random=22',
      time: '08h00 - 12h00',
      excerpt: 'Participez à la préservation de notre environnement côtier.',
      large: false,
    },
    {
      id: 'event4',
      tag: 'sport',
      tagLabel: 'Sport',
      tagColor: '#7fc8ff',
      date: '05 Juillet 2026',
      location: 'Stade Municipal',
      title: 'Tournoi de Football Inter-quartiers',
      image: 'https://picsum.photos/800/400?random=23',
      time: '09h00 - 18h00',
      excerpt: 'Le stade accueille le tournoi annuel réunissant les jeunes des villages voisins.',
      large: true,
    },
    {
      id: 'event5',
      tag: 'culture',
      tagLabel: 'Culture',
      tagColor: '#dfff00',
      date: '10 Juillet 2026',
      location: 'MJC Dembéni',
      title: 'Exposition des Artisans Locaux',
      image: 'https://picsum.photos/400/300?random=24',
      time: '10h00 - 18h00',
      excerpt: 'Vannerie, poterie et bijoux : les créations des artisans du village.',
      large: false,
    },
    {
      id: 'event6',
      tag: 'emploi',
      tagLabel: 'Emploi & Formation',
      tagColor: '#7fffd4',
      date: '15 Juillet 2026',
      location: 'Salle Communale',
      title: 'Atelier Numérique pour Seniors',
      image: 'https://picsum.photos/400/300?random=25',
      time: '14h00 - 16h00',
      excerpt: 'Apprenez à utiliser Internet, l\'email et les réseaux sociaux en toute sérénité.',
      large: false,
    },
  ];

  const sidebarEvents = [
    {
      id: 'side-event1',
      tag: 'culture',
      tagLabel: 'Culture',
      tagColor: '#dfff00',
      title: 'Concert de Musique Traditionnelle',
      date: '08 Juin 2026',
      time: '19h00',
      excerpt: 'Soirée musicale avec les artistes locaux. Entrée libre, restauration sur place.',
      icon: '🎵',
    },
    {
      id: 'side-event2',
      tag: 'sport',
      tagLabel: 'Sport',
      tagColor: '#7fc8ff',
      title: 'Cours de Yoga Gratuit',
      date: '25 Juin 2026',
      time: '07h00 - 08h30',
      excerpt: 'Séance de yoga en plein air au parc municipal. Pour tous les niveaux.',
      icon: '🧘',
    },
    {
      id: 'side-event3',
      tag: 'environnement',
      tagLabel: 'Environnement',
      tagColor: '#f0a3ff',
      title: 'Atelier Jardinage Bio',
      date: '22 Juin 2026',
      time: '09h00 - 12h00',
      excerpt: 'Apprenez les techniques du jardinage écologique auprès d\'experts locaux.',
      icon: '🌿',
    },
    {
      id: 'side-event4',
      tag: 'culture',
      tagLabel: 'Culture',
      tagColor: '#dfff00',
      title: 'Spectacle Théâtral Jeunesse',
      date: '18 Juillet 2026',
      time: '20h30',
      excerpt: 'La jeunesse de Dembéni présente sa création théâtrale originale. Gratuit.',
      icon: '🎭',
    },
  ];

  const [currentFilter, setCurrentFilter] = useState('tous');
  const [filteredMain, setFilteredMain] = useState(mainEvents.slice(0, 3));
  const [filteredSide, setFilteredSide] = useState(sidebarEvents.slice(0, 3));

  // === LOGIQUE DE FILTRAGE ===
  const filterEvents = (filterKey) => {
    setCurrentFilter(filterKey);

    let newFilteredMain;
    if (filterKey === 'tous') {
      newFilteredMain = mainEvents.slice(0, 3);
    } else {
      newFilteredMain = mainEvents.filter(e => e.tag === filterKey);
      if (newFilteredMain.length > 3) {
        newFilteredMain = newFilteredMain.slice(0, 3);
      }
    }

    let newFilteredSide;
    if (filterKey === 'tous') {
      newFilteredSide = sidebarEvents.slice(0, 3);
    } else {
      newFilteredSide = sidebarEvents.filter(e => e.tag === filterKey);
    }

    setFilteredMain(newFilteredMain);
    setFilteredSide(newFilteredSide);
  };

  const handleEventClick = (event) => {
    alert(
      `📅 Événement sélectionné :\n\n« ${event.title} »\nDate : ${event.date}\nHeure : ${event.time}\nLieu : ${event.location}\n\n(ID : ${event.id})`
    );
  };

  const handleSidebarClick = (event) => {
    alert(
      `📅 Événement sélectionné :\n\n« ${event.title} »\nDate : ${event.date}\nHeure : ${event.time}\n\n${event.excerpt}`
    );
  };

  // Filtres disponibles
  const filterOptions = ['tous', 'culture', 'sport', 'emploi', 'environnement'];
  const filterLabels = {
    tous: 'Tous',
    culture: 'Culture',
    sport: 'Sport',
    emploi: 'Emploi & Formation',
    environnement: 'Environnement',
  };

  return (
    <section className="section events-section">
      <div className="events-header">
        <span className="section-tag"><i className="fas fa-calendar-alt"></i> Événements</span>
        <h2>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <path d="M16 2v4"></path>
            <path d="M8 2v4"></path>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Événements à Dembéni
        </h2>
        <p>Découvrez les prochains rendez-vous de notre commune : fêtes culturelles, activités sportives, formations et initiatives environnementales. Participez à la vie dynamique de Dembéni !</p>

        <div className="events-filters">
          {filterOptions.map(option => (
            <button 
              key={option}
              className={`events-filter-btn ${currentFilter === option ? 'active' : ''}`} 
              onClick={() => filterEvents(option)}
            >
              {filterLabels[option]}
            </button>
          ))}
        </div>
      </div>

      <div className="events-content-wrapper">
        <div className="events-left-grid">
          {filteredMain.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px', gridColumn: 'span 2' }}>
              Aucun événement pour cette catégorie.
            </p>
          ) : (
            filteredMain.map((event, index) => (
              <div
                key={event.id}
                className={`events-card ${event.large ? 'large' : ''}`}
                style={{ animationDelay: `${index * 0.07}s` }}
                onClick={() => handleEventClick(event)}
              >
                <img src={event.image} alt={event.title} loading="lazy" />
                <div className="notch-container">
                  <button
                    type="button"
                    className="action-btn"
                    aria-label={`Voir l'événement ${event.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                  >
                    <i className="fas fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
                <div className="events-card-overlay">
                  <div className="events-card-meta">
                    <span className="events-tag" style={{ backgroundColor: event.tagColor }}>
                      {event.tagLabel}
                    </span>
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="events-card-title">{event.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="events-right-sidebar">
          <h3>À venir aussi</h3>
          {filteredSide.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
              Aucun événement pour cette catégorie.
            </p>
          ) : (
            filteredSide.map((event, index) => (
              <div
                key={event.id}
                className="events-sidebar-item"
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => handleSidebarClick(event)}
              >
                <div className="events-sidebar-icon">{event.icon}</div>
                <div className="events-sidebar-content">
                  <div>
                    <span className="events-tag" style={{ backgroundColor: event.tagColor }}>
                      {event.tagLabel}
                    </span>
                  </div>
                  <h4 className="events-sidebar-title">{event.title}</h4>
                  <div className="events-sidebar-meta">{event.date} • {event.time}</div>
                  <p className="events-sidebar-excerpt">{event.excerpt}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
