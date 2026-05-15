import { Link } from 'react-router-dom';
import './Home.css';

export default function Solidarite() {
  const services = [
    {
      id: 1,
      title: 'Aide alimentaire',
      description: 'Distribution de repas et colis alimentaires pour les familles en difficulté.',
      icon: 'fas fa-utensils',
      contact: '02 98 XX XX XX',
      hours: 'Lundi au Vendredi, 9h-12h',
      category: 'Alimentation',
    },
    {
      id: 2,
      title: 'Centre médico-social',
      description: 'Consultations médicales, vaccinations et suivi de santé pour tous.',
      icon: 'fas fa-stethoscope',
      contact: '02 98 XX XX XX',
      hours: 'Lundi au Vendredi, 8h-18h',
      category: 'Santé',
    },
    {
      id: 3,
      title: 'Aide aux personnes âgées',
      description: 'Services d\'aide à domicile, portage de repas et accompagnement.',
      icon: 'fas fa-user-friends',
      contact: '02 98 XX XX XX',
      hours: 'Lundi au Samedi, 7h-20h',
      category: 'Personnes âgées',
    },
    {
      id: 4,
      title: 'Soutien psychologique',
      description: 'Écoute et accompagnement psychologique gratuit et confidentiel.',
      icon: 'fas fa-brain',
      contact: '02 98 XX XX XX',
      hours: 'Lundi au Vendredi, 9h-17h',
      category: 'Santé mentale',
    },
    {
      id: 5,
      title: 'Aide au logement',
      description: 'Accompagnement dans les démarches de logement social et d\'urgence.',
      icon: 'fas fa-home',
      contact: '02 98 XX XX XX',
      hours: 'Lundi au Vendredi, 9h-12h',
      category: 'Logement',
    },
    {
      id: 6,
      title: 'Insertion professionnelle',
      description: 'Accompagnement vers l\'emploi et formation professionnelle.',
      icon: 'fas fa-briefcase',
      contact: '02 98 XX XX XX',
      hours: 'Lundi au Vendredi, 9h-17h',
      category: 'Emploi',
    },
  ];

  const actions = [
    {
      title: 'Faire un don',
      description: 'Contribuez aux actions solidaires de la commune',
      icon: 'fas fa-hand-holding-heart',
      link: '/contact',
    },
    {
      title: 'Devenir bénévole',
      description: 'Rejoignez notre équipe de bénévoles',
      icon: 'fas fa-users',
      link: '/contact',
    },
    {
      title: 'Signaler une situation',
      description: 'Aidez-nous à identifier les besoins',
      icon: 'fas fa-exclamation-triangle',
      link: '/contact',
    },
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Solidarité & Santé</h1>
          <p>Services d'accompagnement et de soutien pour tous les habitants</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="content-section">
        <div className="container">
          <div className="section-intro">
            <h2>Nos Services Solidaires</h2>
            <p>La commune s'engage aux côtés des habitants pour garantir l'accès aux droits et à la santé pour tous.</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <div className="service-content">
                  <div className="service-category">{service.category}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-details">
                    <div className="detail-item">
                      <i className="fas fa-phone"></i>
                      <span>{service.contact}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-clock"></i>
                      <span>{service.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="content-section bg-light">
        <div className="container">
          <div className="section-intro">
            <h2>Comment nous aider ?</h2>
            <p>Plusieurs façons de contribuer aux actions solidaires de notre commune.</p>
          </div>

          <div className="actions-grid">
            {actions.map((action, index) => (
              <Link key={index} to={action.link} className="action-card-link">
                <div className="action-card">
                  <div className="action-icon">
                    <i className={action.icon}></i>
                  </div>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                  <div className="action-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="content-section">
        <div className="container">
          <div className="emergency-card">
            <div className="emergency-content">
              <div className="emergency-icon">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div>
                <h3>Urgence sociale</h3>
                <p>En cas d'urgence sociale ou médicale, contactez immédiatement les services compétents.</p>
                <div className="emergency-contacts">
                  <div className="emergency-contact">
                    <span className="contact-label">SAMU:</span>
                    <span className="contact-number">15</span>
                  </div>
                  <div className="emergency-contact">
                    <span className="contact-label">Police:</span>
                    <span className="contact-number">17</span>
                  </div>
                  <div className="emergency-contact">
                    <span className="contact-label">Pompiers:</span>
                    <span className="contact-number">18</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}