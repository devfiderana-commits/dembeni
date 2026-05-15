import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../api/axios';
import './Admin.css';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: 'fas fa-concierge-bell',
    hours: '',
    contact: '',
    email: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [status, setStatus] = useState('');
  const [iconPreview, setIconPreview] = useState('');
  const iconOptions = [
    'fas fa-concierge-bell',
    'fas fa-hand-holding-heart',
    'fas fa-tree',
    'fas fa-toolbox',
    'fas fa-hands-helping',
  ];

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/services');
      setServices(response.data.services || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      icon: 'fas fa-concierge-bell',
      hours: '',
      contact: '',
      email: '',
      image: '',
    });
    setIconPreview('');
    setEditingId(null);
    setError('');
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (editingId) {
        const response = await api.put(`/api/services/${editingId}`, form);
        setServices((prev) => prev.map((item) => (item._id === editingId ? response.data.service : item)));
        setStatus('Service mis à jour avec succès.');
      } else {
        const response = await api.post('/api/services', form);
        setServices((prev) => [response.data.service, ...prev]);
        setStatus('Service ajouté avec succès.');
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon,
      hours: item.hours,
      contact: item.contact,
      email: item.email,
      image: item.image,
    });
    setError('');
    setStatus('');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce service ?')) return;
    try {
      await api.delete(`/api/services/${id}`);
      setServices((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de supprimer');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-box">
        <div className="admin-section-header">
          <div>
            <p className="admin-tag">Tableau de bord Admin</p>
            <h2>Gestion des services</h2>
            <p className="admin-subtitle">Ajoutez, modifiez ou supprimez les services présentés sur le site.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="btn-primary" onClick={() => setShowForm((prev) => !prev)}>
              {showForm ? 'Masquer le formulaire' : editingId ? 'Modifier un service' : 'Ajouter un service'}
            </button>
          </div>
        </div>

        <div className="admin-summary">
          <div className="summary-item">
            <span>Total de services</span>
            <strong>{services.length}</strong>
          </div>
          <div className="summary-item">
            <span>Services actifs</span>
            <strong>{services.filter((service) => service.title).length}</strong>
          </div>
        </div>

        {status && (
          <div className="admin-alert success" style={{ marginBottom: '1.5rem' }}>
            {status}
          </div>
        )}

        {error && (
          <div className="admin-alert error" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {showForm && (
          <div className="admin-card" style={{ marginBottom: '2rem' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  <span>Titre</span>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" required />
                </label>
                <label>
                  <span>Icône</span>
                  <select name="icon" value={form.icon} onChange={(e) => {
                    handleChange(e);
                    setIconPreview(e.target.value);
                  }}>
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Horaires</span>
                  <input name="hours" value={form.hours} onChange={handleChange} placeholder="Horaires" />
                </label>
                <label>
                  <span>Téléphone</span>
                  <input name="contact" value={form.contact} onChange={handleChange} placeholder="Téléphone" />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                </label>
                <label>
                  <span>Image (URL)</span>
                  <input name="image" value={form.image} onChange={handleChange} placeholder="URL de l'image" />
                </label>
              </div>

              {(form.image || iconPreview) && (
                <div className="service-preview-card">
                  {form.image ? (
                    <img src={form.image} alt="Aperçu service" />
                  ) : (
                    <div className="preview-icon"><i className={iconPreview || form.icon} /></div>
                  )}
                  <div>
                    <strong>Aperçu du service</strong>
                    <p>{form.title || 'Titre du service'}</p>
                  </div>
                </div>
              )}

              <label className="full-width">
                <span>Description</span>
                <textarea name="description" value={form.description} onChange={handleChange} rows="5" placeholder="Description" required />
              </label>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Ajouter'}
                </button>
                {editingId && (
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p>Chargement des services...</p>
        ) : services.length === 0 ? (
          <p>Aucun service disponible.</p>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="service-item-card">
                        {item.image ? (
                          <img src={item.image} alt={item.title} />
                        ) : (
                          <div className="service-icon"><i className={item.icon || 'fas fa-concierge-bell'} /></div>
                        )}
                        <div className="service-item-wrap">
                          <strong>{item.title}</strong>
                          <p>{item.description}</p>
                          <div className="service-meta">
                            {item.hours && <span>{item.hours}</span>} 
                            {item.contact && <span>{item.contact}</span>} 
                            {item.email && <span>{item.email}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.contact || '-'}</td>
                    <td>{item.email || '-'}</td>
                    <td>
                      <button className="btn-secondary" type="button" onClick={() => handleEdit(item)}>
                        Modifier
                      </button>
                      <button className="delete-btn" type="button" onClick={() => handleDelete(item._id)} style={{ marginLeft: '0.75rem', background: '#ef4444' }}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
