import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import api from '../api/axios';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalCitizens: 0,
    totalNews: 0,
    totalServices: 0,
    totalProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
    recentMessages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [usersRes, newsRes, servicesRes, projectsRes, messagesRes] = await Promise.all([
          api.get('/users'),
          api.get('/news'),
          api.get('/services'),
          api.get('/projects'),
          api.get('/messages'),
        ]);

        const users = usersRes.data.users || [];
        const news = newsRes.data.news || [];
        const services = servicesRes.data.services || [];
        const projects = projectsRes.data.projects || [];
        const messages = messagesRes.data.messages || [];

        const totalAdmins = users.filter((u) => u.role === 'admin').length;
        const totalCitizens = users.filter((u) => u.role === 'user').length;
        const unreadMessages = messages.filter((m) => m.status === 'unread').length;
        const recentMessages = messages.slice(0, 5);

        setSummary({
          totalUsers: users.length,
          totalAdmins,
          totalCitizens,
          totalNews: news.length,
          totalServices: services.length,
          totalProjects: projects.length,
          totalMessages: messages.length,
          unreadMessages,
          recentMessages,
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <p className="dashboard-tag">Tableau de bord global</p>
            <h1>Résumé de gestion</h1>
            <p className="dashboard-description">
              Suivez les utilisateurs, actualités, services, projets et messages depuis une seule vue.
            </p>
          </div>
          <div className="dashboard-meta">
            <span>Connecté en tant que <strong>{user?.username || 'Admin'}</strong></span>
            <span>{new Date().toLocaleDateString('fr-FR')}</span>
          </div>
        </div>

        <div className="overview-grid">
          <div className="overview-card">
            <p>Total utilisateurs</p>
            <h2>{summary.totalUsers}</h2>
          </div>
          <div className="overview-card">
            <p>Actualités</p>
            <h2>{summary.totalNews}</h2>
          </div>
          <div className="overview-card">
            <p>Services</p>
            <h2>{summary.totalServices}</h2>
          </div>
          <div className="overview-card">
            <p>Projets</p>
            <h2>{summary.totalProjects}</h2>
          </div>
          <div className="overview-card">
            <p>Messages reçus</p>
            <h2>{summary.totalMessages}</h2>
          </div>
          <div className="overview-card unread-card">
            <p>Messages non lus</p>
            <h2>{summary.unreadMessages}</h2>
          </div>
        </div>

        <div className="summary-sections">
          <section className="summary-section">
            <div className="section-header">
              <h2>Statistiques principales</h2>
              <p>Indicateurs clés de la plateforme</p>
            </div>
            <div className="summary-grid">
              <div className="summary-item">
                <span>Administrateurs</span>
                <strong>{summary.totalAdmins}</strong>
              </div>
              <div className="summary-item">
                <span>Citoyens</span>
                <strong>{summary.totalCitizens}</strong>
              </div>
              <div className="summary-item">
                <span>Projets en cours</span>
                <strong>{summary.totalProjects}</strong>
              </div>
              <div className="summary-item">
                <span>Services actifs</span>
                <strong>{summary.totalServices}</strong>
              </div>
            </div>
          </section>

          <section className="summary-section">
            <div className="section-header">
              <h2>Derniers messages</h2>
              <p>Les 5 messages les plus récents envoyés par les utilisateurs</p>
            </div>
            <div className="messages-list">
              {loading ? (
                <p>Chargement des messages...</p>
              ) : summary.recentMessages.length === 0 ? (
                <p>Aucun message récent.</p>
              ) : (
                summary.recentMessages.map((message) => (
                  <div key={message._id} className="message-card">
                    <div className="message-card-left">
                      <p className="message-subject">{message.subject}</p>
                      <p className="message-author">{message.name} • {message.email}</p>
                    </div>
                    <div className="message-card-right">
                      <span className={`message-status ${message.status}`}>{message.status}</span>
                      <span className="message-date">{new Date(message.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="quick-actions">
          <h3 className="section-title">⚡ Actions rapides</h3>
          <div className="actions-grid">
            <Link to="/admin/users" className="action-card">
              <i className="fas fa-users"></i>
              <h4>Voir les utilisateurs</h4>
              <p>Accéder au gestionnaire de comptes</p>
            </Link>
            <Link to="/admin" className="action-card">
              <i className="fas fa-newspaper"></i>
              <h4>Gérer les actualités</h4>
              <p>Créer ou modifier les publications</p>
            </Link>
            <Link to="/admin/services" className="action-card">
              <i className="fas fa-cog"></i>
              <h4>Gérer les services</h4>
              <p>Mettre à jour les services publics</p>
            </Link>
            <Link to="/admin/projets" className="action-card">
              <i className="fas fa-project-diagram"></i>
              <h4>Gérer les projets</h4>
              <p>Suivre les initiatives de la commune</p>
            </Link>
            <Link to="/admin/messages" className="action-card">
              <i className="fas fa-envelope"></i>
              <h4>Voir les messages</h4>
              <p>Répondre aux demandes citoyennes</p>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
