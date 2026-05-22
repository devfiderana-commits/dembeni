import { useState } from 'react';
import './NewsSection.css';

export default function NewsSection() {
  // === DONNÉES DES ARTICLES (Dembéni) ===
  const mainArticles = [
    {
      id: 'main1',
      tag: 'municipale',
      tagLabel: 'Vie municipale',
      tagColor: '#dfff00',
      date: '20 Mai 2026',
      title: 'Réouverture du marché couvert de Dembéni',
      image: 'https://picsum.photos/800/400?random=10',
      large: true,
    },
    {
      id: 'main2',
      tag: 'travaux',
      tagLabel: 'Travaux',
      tagColor: '#7fffd4',
      date: '18 Mai 2026',
      title: 'Chantier de la nouvelle école maternelle',
      image: 'https://picsum.photos/400/300?random=11',
      large: false,
    },
    {
      id: 'main3',
      tag: 'evenements',
      tagLabel: 'Événements',
      tagColor: '#f0a3ff',
      date: '14 Mai 2026',
      title: 'Fête du village sur la place de Dembéni',
      image: 'https://picsum.photos/400/300?random=12',
      large: false,
    },
    {
      id: 'main4',
      tag: 'culture',
      tagLabel: 'Culture',
      tagColor: '#7fc8ff',
      date: '10 Mai 2026',
      title: 'Atelier danse traditionnelle au foyer rural',
      image: 'https://picsum.photos/400/300?random=13',
      large: false,
    },
    {
      id: 'main5',
      tag: 'travaux',
      tagLabel: 'Travaux',
      tagColor: '#7fffd4',
      date: '05 Mai 2026',
      title: 'Rénovation de la route de Hajangoua',
      image: 'https://picsum.photos/800/400?random=14',
      large: true,
    },
    {
      id: 'main6',
      tag: 'municipale',
      tagLabel: 'Vie municipale',
      tagColor: '#dfff00',
      date: '28 Avril 2026',
      title: 'Conseil de quartier : bilan et perspectives',
      image: 'https://picsum.photos/400/300?random=15',
      large: false,
    },
  ];

  const sidebarArticles = [
    {
      id: 'side1',
      tag: 'travaux',
      tagLabel: 'Travaux',
      tagColor: '#7fffd4',
      title: 'Nouvel éclairage public sur la place du marché',
      date: '16 Mai 2026',
      excerpt: 'La mairie a installé 24 nouveaux lampadaires solaires autour du marché couvert pour améliorer la sécurité et les animations en soirée.',
      icon: '💡',
    },
    {
      id: 'side2',
      tag: 'culture',
      tagLabel: 'Culture',
      tagColor: '#7fc8ff',
      title: 'Exposition des artisans de Dembéni à la MJC',
      date: '08 Mai 2026',
      excerpt: 'Vannerie, poterie et bijoux : les artisans locaux exposent leurs créations ce week-end à la Maison des Jeunes et de la Culture.',
      icon: '🧺',
    },
    {
      id: 'side3',
      tag: 'evenements',
      tagLabel: 'Événements',
      tagColor: '#f0a3ff',
      title: 'Tournoi de football inter-quartiers',
      date: '01 Mai 2026',
      excerpt: 'Le stade de Dembéni accueille le tournoi annuel réunissant les jeunes des villages voisins. Inscriptions ouvertes jusqu\'au 25 avril.',
      icon: '⚽',
    },
    {
      id: 'side4',
      tag: 'municipale',
      tagLabel: 'Vie municipale',
      tagColor: '#dfff00',
      title: 'Distribution de composteurs gratuits',
      date: '22 Avril 2026',
      excerpt: 'Dans le cadre du plan de réduction des déchets, la mairie met à disposition des composteurs pour les habitants de Dembéni.',
      icon: '🌱',
    },
  ];

  const [currentFilter, setCurrentFilter] = useState('tous');
  const [filteredMain, setFilteredMain] = useState(mainArticles.slice(0, 3));
  const [filteredSide, setFilteredSide] = useState(sidebarArticles.slice(0, 3));

  // === LOGIQUE DE FILTRAGE ===
  const filterArticles = (filterKey) => {
    setCurrentFilter(filterKey);

    let newFilteredMain;
    if (filterKey === 'tous') {
      newFilteredMain = mainArticles.slice(0, 3);
    } else {
      newFilteredMain = mainArticles.filter(a => a.tag === filterKey);
      if (newFilteredMain.length > 3) {
        newFilteredMain = newFilteredMain.slice(0, 3);
      }
    }

    let newFilteredSide;
    if (filterKey === 'tous') {
      newFilteredSide = sidebarArticles.slice(0, 3);
    } else {
      newFilteredSide = sidebarArticles.filter(a => a.tag === filterKey);
    }

    setFilteredMain(newFilteredMain);
    setFilteredSide(newFilteredSide);
  };

  const handleArticleClick = (article) => {
    alert(
      `📰 Article sélectionné :\n\n« ${article.title} »\nCatégorie : ${article.tagLabel}\nDate : ${article.date}\n\n(ID : ${article.id})`
    );
  };

  const handleSidebarClick = (article) => {
    alert(
      `📰 Article sélectionné :\n\n« ${article.title} »\nCatégorie : ${article.tagLabel}\nDate : ${article.date}\n\n${article.excerpt}`
    );
  };

  return (
    <section className="section news-section">
      <div className="news-header">
        <span className="section-tag"><i className="fas fa-newspaper"></i> Actualités</span>
        <h2>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          Actualités de Dembéni
        </h2>
        <p>Retrouvez toute l'actualité du village de Dembéni : marché couvert, travaux d'aménagement, événements
          culturels et vie associative. Restez informés de ce qui fait vibrer notre commune.</p>

        <div className="news-filters">
          <button className={`news-filter-btn ${currentFilter === 'tous' ? 'active' : ''}`} onClick={() => filterArticles('tous')}>Tous</button>
          <button className={`news-filter-btn ${currentFilter === 'municipale' ? 'active' : ''}`} onClick={() => filterArticles('municipale')}>Vie municipale</button>
          <button className={`news-filter-btn ${currentFilter === 'travaux' ? 'active' : ''}`} onClick={() => filterArticles('travaux')}>Travaux</button>
          <button className={`news-filter-btn ${currentFilter === 'evenements' ? 'active' : ''}`} onClick={() => filterArticles('evenements')}>Événements</button>
          <button className={`news-filter-btn ${currentFilter === 'culture' ? 'active' : ''}`} onClick={() => filterArticles('culture')}>Culture</button>
        </div>
      </div>

      <div className="news-content-wrapper">
        <div className="news-left-grid">
          {filteredMain.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px', gridColumn: 'span 2' }}>
              Aucune actualité pour cette catégorie.
            </p>
          ) : (
            filteredMain.map((article, index) => (
              <div
                key={article.id}
                className={`news-card ${article.large ? 'large' : ''}`}
                style={{ animationDelay: `${index * 0.07}s` }}
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.image} alt={article.title} loading="lazy" />
                <div className="news-card-overlay">
                  <div className="news-card-meta">
                    <span className="news-tag" style={{ backgroundColor: article.tagColor }}>
                      {article.tagLabel}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="news-card-title">{article.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="news-right-sidebar">
          <h3>À lire aussi</h3>
          {filteredSide.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
              Aucune suggestion pour cette catégorie.
            </p>
          ) : (
            filteredSide.map((article, index) => (
              <div
                key={article.id}
                className="news-sidebar-item"
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => handleSidebarClick(article)}
              >
                <div className="news-sidebar-icon">{article.icon}</div>
                <div className="news-sidebar-content">
                  <div>
                    <span className="news-tag" style={{ backgroundColor: article.tagColor }}>
                      {article.tagLabel}
                    </span>
                  </div>
                  <h4 className="news-sidebar-title">{article.title}</h4>
                  <div className="news-sidebar-meta">{article.date}</div>
                  <p className="news-sidebar-excerpt">{article.excerpt}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
