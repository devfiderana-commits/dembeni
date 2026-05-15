import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import '../pages/Home.css';

export default function Collecte() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    quartier: 'Centre-Ville',
    description: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // Simulating form submission
      setTimeout(() => {
        setStatus('✓ Demande envoyée ! Vous serez contacté sous 48h.');
        setFormData({ nom: '', email: '', telephone: '', quartier: 'Centre-Ville', description: '' });
        setLoading(false);
      }, 1500);
    } catch (err) {
      setStatus('Erreur lors de l\'envoi. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const calendar = [
    { date: '08 Mai', quartier: 'Quartier Centre-Ville', hours: '7h00 – 14h00', status: 'Disponible' },
    { date: '12 Mai', quartier: 'Quartier Nord & RN4', hours: '7h00 – 14h00', status: 'Disponible' },
    { date: '19 Mai', quartier: 'Quartier Sud', hours: '7h00 – 14h00', status: 'Complet' },
    { date: '22 Mai', quartier: 'Quartier Ouest & Résidences', hours: '7h00 – 14h00', status: 'Disponible' },
  ];

  return (
    <>
      {/* BANNER */}
      <section className="page-banner">
        <div className="page-banner-inner">
          <div className="breadcrumb">
            <Link to="/"><i className="fas fa-home"></i> Accueil</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Collecte</span>
          </div>
          <h1><i className="fas fa-recycle" style={{ opacity: 0.8, marginRight: 10 }}></i>Collecte d'Encombrants</h1>
          <p>Planifiez la collecte de vos objets volumineux. Service 100% gratuit pour les habitants, deux fois par mois.</p>
        </div>
      </section>

      {/* STATS */}
      <div className="section section-sm">
        <div className="stats-strip">
          <div className="stat-box"><div className="stat-num">2×</div><div className="stat-label">Collectes par mois</div></div>
          <div className="stat-box"><div className="stat-num">100%</div><div className="stat-label">Gratuit habitants</div></div>
          <div className="stat-box"><div className="stat-num">48h</div><div className="stat-label">Délai confirmation</div></div>
          <div className="stat-box"><div className="stat-num">6</div><div className="stat-label">Quartiers desservis</div></div>
        </div>
      </div>

      {/* CALENDAR */}
      <section className="section">
        <div className="section-header center">
          <span className="section-tag"><i className="far fa-calendar-alt"></i> Planification</span>
          <h2 className="section-title">Calendrier des collectes — Mai/Juin 2026</h2>
          <div className="divider"></div>
          <p className="section-subtitle mt-2">Inscrivez-vous avant J-3 du passage prévu dans votre quartier.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem', marginTop: '2rem' }}>
          {calendar.map((item, idx) => (
            <div key={idx} style={{ background: 'var(--blanc)', border: '1px solid var(--gris-200)', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', transition: 'var(--transition)' }}>
              <div style={{ background: 'var(--vert-50)', border: '1px solid var(--vert-100)', borderRadius: 'var(--radius-md)', width: '62px', height: '62px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--vert-700)', lineHeight: 1, fontFamily: 'var(--font-head)' }}>{item.date.split(' ')[0]}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--vert-500)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.date.split(' ')[1]}</div>
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--vert-800)', marginBottom: '0.3rem' }}>{item.quartier}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--gris-500)' }}>{item.hours} · <span style={{ background: item.status === 'Complet' ? 'var(--rouge-100)' : 'var(--vert-50)', color: item.status === 'Complet' ? 'var(--rouge-600)' : 'var(--vert-700)', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600 }}>{item.status}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GUIDE */}
      <div style={{ background: 'var(--gris-100)', padding: '1px 0' }}>
        <section className="section">
          <div className="section-header center">
            <span className="section-tag"><i className="fas fa-info-circle"></i> Règles</span>
            <h2 className="section-title">Ce qui est accepté & refusé</h2>
            <div className="divider"></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ background: 'var(--blanc)', border: '1px solid var(--gris-200)', borderRadius: 'var(--radius-lg)', padding: '2rem', borderTop: '4px solid var(--vert-500)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-head)', marginBottom: '1.2rem', color: 'var(--vert-700)' }}>
                <i className="fas fa-check-circle"></i> Objets acceptés
              </h3>
              <ul style={{ listStyle: 'none' }}>
                {['Meubles (armoires, canapés, tables)', 'Électroménager (frigos, lave-linge, fours)', 'Literie (matelas, sommiers, oreillers)', 'Cartons et emballages en volume'].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.6rem 0', borderBottom: '1px solid var(--gris-100)', fontSize: '0.88rem', color: 'var(--gris-700)' }}>
                    <i className="fas fa-check" style={{ color: 'var(--vert-500)', fontSize: '0.82rem', flexShrink: 0 }}></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'var(--blanc)', border: '1px solid var(--gris-200)', borderRadius: 'var(--radius-lg)', padding: '2rem', borderTop: '4px solid var(--rouge-500)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-head)', marginBottom: '1.2rem', color: 'var(--rouge-600)' }}>
                <i className="fas fa-times-circle"></i> Objets refusés
              </h3>
              <ul style={{ listStyle: 'none' }}>
                {['Gravats et matériaux de construction', 'Déchets verts (branches, herbe, terre)', 'Produits chimiques et dangereux', 'Pneus et batteries automobiles'].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.6rem 0', borderBottom: '1px solid var(--gris-100)', fontSize: '0.88rem', color: 'var(--gris-700)' }}>
                    <i className="fas fa-times" style={{ color: 'var(--rouge-500)', fontSize: '0.82rem', flexShrink: 0 }}></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* FORM */}
      <section className="section">
        <div style={{ background: 'linear-gradient(135deg, var(--vert-800), var(--vert-600))', borderRadius: 'var(--radius-xl)', padding: '3rem', color: 'var(--blanc)' }}>
          <h2 style={{ color: 'var(--blanc)', fontSize: '1.6rem', marginBottom: '0.4rem' }}>
            <i className="fas fa-clipboard-list" style={{ marginRight: 10, opacity: 0.8 }}></i>S'inscrire à la collecte
          </h2>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Remplissez ce formulaire pour réserver votre créneau. Confirmation sous 48h par téléphone ou email.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,.85)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Nom</label>
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none', fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,.85)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none', fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,.85)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Téléphone</label>
              <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none', fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,.85)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Quartier</label>
              <select name="quartier" value={formData.quartier} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none', fontSize: '0.9rem' }}>
                <option>Centre-Ville</option>
                <option>Nord</option>
                <option>Sud</option>
                <option>Ouest</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: 'rgba(255,255,255,.85)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none', fontSize: '0.9rem', fontFamily: 'inherit' }}></textarea>
            </div>
            <button type="submit" disabled={loading} style={{ gridColumn: '1 / -1', background: 'var(--blanc)', color: 'var(--vert-700)', border: 'none', padding: '0.9rem 2.2rem', borderRadius: 'var(--radius-pill)', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', transition: 'var(--transition)', marginTop: '0.75rem' }}>
              <i className="fas fa-paper-plane"></i> {loading ? 'Envoi...' : 'Envoyer'}
            </button>
            {status && <p style={{ gridColumn: '1 / -1', color: '#A5D6A7', fontSize: '0.88rem', fontWeight: 600 }}><i className="fas fa-check-circle"></i> {status}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
