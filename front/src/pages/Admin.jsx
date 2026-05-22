import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import api from '../api/axios';
import './Admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase().trim();
    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  });

  const totalAdmins = users.filter((u) => u.role === 'admin').length;
  const totalCitizens = users.filter((u) => u.role === 'user').length;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data.users || []);
      } catch (err) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          logout();
          navigate('/login');
          return;
        }
        setError(err.response?.data?.message || 'Unable to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [logout, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) {
      return;
    }

    setDeleteId(id);
    setError('');

    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete user');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-box">
        <div className="admin-section-header">
          <div>
            <p className="admin-tag">Tableau de bord Admin</p>
            <h2>Gestion des utilisateurs</h2>
            <p className="admin-subtitle">Consultez, recherchez et gérez tous les comptes utilisateurs.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
              Actualiser
            </button>
          </div>
        </div>

        <div className="admin-summary">
          <div className="summary-item">
            <span>Total utilisateurs</span>
            <strong>{users.length}</strong>
          </div>
          <div className="summary-item">
            <span>Administrateurs</span>
            <strong>{totalAdmins}</strong>
          </div>
          <div className="summary-item">
            <span>Citoyens</span>
            <strong>{totalCitizens}</strong>
          </div>
        </div>

        <div className="admin-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, email ou rôle..."
          />
        </div>

        {error && (
          <div className="admin-alert error" style={{ marginBottom: '1.5rem' }}>
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#1C6B35', marginBottom: '1rem' }}></i>
            <p>Chargement des utilisateurs...</p>
          </div>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Date d'inscription</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                      {loading ? 'Chargement des utilisateurs...' : 'Aucun utilisateur trouvé pour cette recherche.'}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <strong>{user.username}</strong>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span style={{
                          background: user.role === 'admin' ? '#FDE8E8' : '#E6FFFA',
                          color: user.role === 'admin' ? '#A01B1B' : '#1C6B35',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '50px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          display: 'inline-block',
                        }}>
                          {user.role === 'admin' ? '👑 Admin' : '👤 Citoyen'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.9rem', color: '#718096' }}>
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(user._id)}
                          disabled={deleteId === user._id}
                        >
                          {deleteId === user._id ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i> Suppression...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-trash"></i> Supprimer
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
