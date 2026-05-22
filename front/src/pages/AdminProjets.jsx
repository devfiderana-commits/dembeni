import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../api/axios';
import './Admin.css';

export default function AdminProjets() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [filterCategory, setFilterCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Urbanisme',
    image: '',
    status: 'Planification',
    budget: '',
    completion: 0,
    startDate: '',
    endDate: '',
    location: '',
    responsible: '',
    details: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [status, setStatus] = useState('');
  const categories = ['Urbanisme', 'Éducation', 'Environnement', 'Énergie', 'Culture', 'Santé', 'Sport', 'Social'];
  const statuses = ['Planification', 'En cours', 'Terminé', 'Suspendu'];

  const filteredProjects = projects.filter((project) => {
    const query = search.toLowerCase().trim();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.location?.toLowerCase().includes(query) ||
      project.responsible?.toLowerCase().includes(query);

    const matchesStatus = filterStatus === 'Tous' || project.status === filterStatus;
    const matchesCategory = filterCategory === 'Tous' || project.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalInProgress = projects.filter((p) => p.status === 'En cours').length;
  const totalCompleted = projects.filter((p) => p.status === 'Terminé').length;
  const totalSuspended = projects.filter((p) => p.status === 'Suspendu').length;
  const averageCompletion = projects.length
    ? Math.round(projects.reduce((sum, project) => sum + (project.completion || 0), 0) / projects.length)
    : 0;

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      setProjects(response.data.projects || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les projets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'completion' ? parseInt(value) || 0 : value });
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      category: 'Urbanisme',
      image: '',
      status: 'Planification',
      budget: '',
      completion: 0,
      startDate: '',
      endDate: '',
      location: '',
      responsible: '',
      details: '',
    });
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
        const response = await api.put(`/projects/${editingId}`, form);
        setProjects((prev) => prev.map((item) => (item._id === editingId ? response.data.project : item)));
        setStatus('Projet mis à jour avec succès.');
      } else {
        const response = await api.post('/projects', form);
        setProjects((prev) => [response.data.project, ...prev]);
        setStatus('Projet ajouté avec succès.');
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      status: item.status,
      budget: item.budget,
      completion: item.completion,
      startDate: item.startDate ? item.startDate.split('T')[0] : '',
      endDate: item.endDate ? item.endDate.split('T')[0] : '',
      location: item.location,
      responsible: item.responsible,
      details: item.details,
    });
    setError('');
    setStatus('');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    try {
      await api.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de supprimer');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Terminé': return '#10b981';
      case 'En cours': return '#f59e0b';
      case 'Planification': return '#6b7280';
      case 'Suspendu': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '');
  };

  return (
    <AdminLayout>
      <div className="admin-box">
        <div className="admin-section-header">
          <div>
            <p className="admin-tag">Tableau de bord Admin</p>
            <h2>Gestion des projets</h2>
            <p className="admin-subtitle">Ajoutez, modifiez ou supprimez les projets municipaux affichés sur le site.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="btn-primary" onClick={() => setShowForm((prev) => !prev)}>
              {showForm ? 'Masquer le formulaire' : editingId ? 'Modifier un projet' : 'Ajouter un projet'}
            </button>
          </div>
        </div>

        <div className="admin-summary">
          <div className="summary-item">
            <span>Total de projets</span>
            <strong>{projects.length}</strong>
          </div>
          <div className="summary-item">
            <span>En cours</span>
            <strong>{totalInProgress}</strong>
          </div>
          <div className="summary-item">
            <span>Terminés</span>
            <strong>{totalCompleted}</strong>
          </div>
          <div className="summary-item">
            <span>Suspendus</span>
            <strong>{totalSuspended}</strong>
          </div>
          <div className="summary-item">
            <span>Progression moyenne</span>
            <strong>{averageCompletion}%</strong>
          </div>
        </div>

        <div className="admin-search-grid">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un projet, lieu ou responsable..."
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option>Tous</option>
            {statuses.map((statusOption) => (
              <option key={statusOption} value={statusOption}>{statusOption}</option>
            ))}
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option>Tous</option>
            {categories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>{categoryOption}</option>
            ))}
          </select>
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
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Titre du projet" required />
                </label>
                <label>
                  <span>Catégorie</span>
                  <select name="category" value={form.category} onChange={handleChange} required>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Statut</span>
                  <select name="status" value={form.status} onChange={handleChange} required>
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Budget</span>
                  <input name="budget" value={form.budget} onChange={handleChange} placeholder="Ex: 2.5M €" />
                </label>
                <label>
                  <span>Avancement (%)</span>
                  <input
                    name="completion"
                    type="number"
                    min="0"
                    max="100"
                    value={form.completion}
                    onChange={handleChange}
                    placeholder="0-100"
                  />
                </label>
                <label>
                  <span>Image (URL)</span>
                  <input name="image" value={form.image} onChange={handleChange} placeholder="URL de l'image" />
                </label>
                <label>
                  <span>Date de début</span>
                  <input name="startDate" value={form.startDate} onChange={handleChange} type="date" />
                </label>
                <label>
                  <span>Date de fin</span>
                  <input name="endDate" value={form.endDate} onChange={handleChange} type="date" />
                </label>
                <label>
                  <span>Lieu</span>
                  <input name="location" value={form.location} onChange={handleChange} placeholder="Lieu du projet" />
                </label>
                <label>
                  <span>Responsable</span>
                  <input name="responsible" value={form.responsible} onChange={handleChange} placeholder="Responsable du projet" />
                </label>
              </div>

              <label className="full-width">
                <span>Description</span>
                <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Description du projet" required />
              </label>

              <label className="full-width">
                <span>Détails supplémentaires</span>
                <textarea name="details" value={form.details} onChange={handleChange} rows="3" placeholder="Détails supplémentaires" />
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
          <p>Chargement des projets...</p>
        ) : projects.length === 0 ? (
          <p>Aucun projet disponible.</p>
        ) : filteredProjects.length === 0 ? (
          <p>Aucun projet ne correspond aux filtres sélectionnés.</p>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Projet</th>
                  <th>Catégorie</th>
                  <th>Statut</th>
                  <th>Avancement</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="item-title-cell">
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.description}</p>
                          <p className="project-meta">
                            {item.location && <span>📍 {item.location}</span>}
                            {item.responsible && <span>👤 {item.responsible}</span>}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <span className={`status-badge status-${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="progress-cell">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${item.completion}%`, background: getStatusColor(item.status) }} />
                        </div>
                        <span>{item.completion || 0}%</span>
                      </div>
                    </td>
                    <td>
                      <button className="btn-secondary" type="button" onClick={() => handleEdit(item)} style={{ marginRight: '0.5rem' }}>
                        Modifier
                      </button>
                      <button className="delete-btn" type="button" onClick={() => handleDelete(item._id)}>
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