import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import '../pages/Home.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    subject: '',
    message: '',
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
      await api.post('/api/messages', {
        name: formData.nom,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setStatus('✓ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      setFormData({ nom: '', email: '', telephone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    {
      title: 'Mairie',
      address: 'Place du Président Kaspa, Dembéni 97660',
      phone: '02 69 12 00 00',
      email: 'contact@dembeni.fr',
      hours: 'Lun–Ven : 8h–12h, 13h30–16h30',
    },
    {
      title: 'Services Techniques',
      address: 'Route de Labattoir, Dembéni',
      phone: '02 69 12 34 56',
      email: 'technique@dembeni.fr',
      hours: 'Lun–Ven : 7h–15h30',
    },
    {
      title: 'Action Sociale',
      address: 'Rue de la Solidarité, Dembéni',
      phone: '02 69 12 78 90',
      email: 'ccas@dembeni.fr',
      hours: 'Lun–Ven : 8h–16h',
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
            <span>Contact</span>
          </div>
          <h1><i className="fas fa-envelope" style={{ opacity: 0.8, marginRight: 10 }}></i>Nous Contacter</h1>
          <p>Notre équipe est à votre écoute pour répondre à vos questions et vous accompagner dans vos démarches.</p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {contacts.map((contact, idx) => (
            <div key={idx} style={{ background: 'var(--blanc)', border: '1px solid var(--gris-200)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--vert-700)' }}><i className="fas fa-map-marker-alt" style={{ marginRight: '10px' }}></i>{contact.title}</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                <strong>Adresse:</strong><br />{contact.address}
              </p>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                <strong>Téléphone:</strong><br /><a href={`tel:${contact.phone}`} style={{ color: 'var(--vert-600)', textDecoration: 'none' }}>{contact.phone}</a>
              </p>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                <strong>Email:</strong><br /><a href={`mailto:${contact.email}`} style={{ color: 'var(--vert-600)', textDecoration: 'none' }}>{contact.email}</a>
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--gris-500)' }}>
                <i className="far fa-clock" style={{ marginRight: '5px' }}></i>{contact.hours}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="section section-fullwidth" style={{ backgroundColor: 'var(--vert-50)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>Envoyez-nous un message</h2>
            <p style={{ color: 'var(--gris-500)' }}>Nous vous répondrons dans les meilleurs délais.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Nom</label>
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--gris-200)', fontSize: '0.9rem' }} />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--gris-200)', fontSize: '0.9rem' }} />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Téléphone</label>
              <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--gris-200)', fontSize: '0.9rem' }} />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Sujet</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--gris-200)', fontSize: '0.9rem' }} />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--gris-200)', fontSize: '0.9rem', fontFamily: 'inherit' }}></textarea>
            </div>
            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, var(--vert-800), var(--vert-600))', color: 'var(--blanc)', border: 'none', padding: '0.9rem 2rem', borderRadius: 'var(--radius-pill)', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
              <i className="fas fa-paper-plane"></i> {loading ? 'Envoi...' : 'Envoyer'}
            </button>
            {status && <p style={{ marginTop: '1rem', color: '#A5D6A7', fontSize: '0.88rem', fontWeight: 600 }}><i className="fas fa-check-circle"></i> {status}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
