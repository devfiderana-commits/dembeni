import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import api from '../api/axios';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalCitizens: 0,
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/users');
        const users = response.data.users || [];

        const totalAdmins = users.filter(u => u.role === 'admin').length;
        const totalCitizens = users.filter(u => u.role === 'user').length;
        const recentUsers = users.slice(-5).reverse();

        setStats({
          totalUsers: users.length,
          totalAdmins,
          totalCitizens,
          recentUsers,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="dashboard">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <p className="stat-label">Utilisateurs totaux</p>
              <h3 className="stat-value">{stats.totalUsers}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon admins-icon">
              <i className="fas fa-crown"></i>
            </div>
            <div className="stat-content">
              <p className="stat-label">Administrateurs</p>
              <h3 className="stat-value">{stats.totalAdmins}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon citizens-icon">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="stat-content">
              <p className="stat-label">Citoyens</p>
              <h3 className="stat-value">{stats.totalCitizens}</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon connected-icon">
              <i className="fas fa-user-check"></i>
            </div>
            <div className="stat-content">
              <p className="stat-label">Connecté</p>
              <h3 className="stat-value">{user?.username || 'Admin'}</h3>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-card">
            <div className="welcome-header">
              <h2>👋 Bienvenue, {user?.username}!</h2>
              <p>Gérez votre plateforme depuis ce tableau de bord</p>
            </div>
            <div className="welcome-stats">
              <div className="welcome-stat">
                <span className="stat-number">{stats.totalUsers}</span>
                <span className="stat-text">Utilisateurs inscrits</span>
              </div>
              <div className="welcome-stat">
                <span className="stat-number">{Math.round((stats.totalAdmins / Math.max(stats.totalUsers, 1)) * 100)}%</span>
                <span className="stat-text">Administrateurs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        {!loading && stats.recentUsers.length > 0 && (
          <div className="recent-section">
            <h3 className="section-title">📝 Derniers utilisateurs inscrits</h3>
            <div className="recent-users-list">
              {stats.recentUsers.map((user) => (
                <div key={user._id} className="recent-user-item">
                  <div className="user-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="user-details">
                    <p className="user-name">{user.username}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <div className="user-role">
                    <span className={`role-badge ${user.role}`}>
                      {user.role === 'admin' ? '👑 Admin' : '👤 Citoyen'}
                    </span>
                  </div>
                  <div className="user-date">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3 className="section-title">⚡ Actions rapides</h3>
          <div className="actions-grid">
            <a href="/admin" className="action-card">
              <i className="fas fa-list"></i>
              <h4>Gérer les utilisateurs</h4>
              <p>Voir et gérer tous les utilisateurs</p>
            </a>
            <a href="/" className="action-card">
              <i className="fas fa-home"></i>
              <h4>Retour à l'accueil</h4>
              <p>Voir la page publique</p>
            </a>
            <a href="#" className="action-card">
              <i className="fas fa-cog"></i>
              <h4>Paramètres</h4>
              <p>Configurer votre profil admin</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
