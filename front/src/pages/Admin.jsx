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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/users');
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
      await api.delete(`/api/users/${id}`);
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: 0, color: '#1a202c' }}>Gestion des utilisateurs</h2>
          <div style={{ fontSize: '0.9rem', color: '#718096' }}>
            Total: <strong>{users.length}</strong> utilisateur(s)
          </div>
        </div>

        {error && (
          <div style={{
            background: '#FDE8E8',
            color: '#A01B1B',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
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
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
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
