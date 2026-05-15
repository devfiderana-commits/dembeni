import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../api/axios';
import './Admin.css';

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Infrastructure',
    image: '',
    publishedAt: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [status, setStatus] = useState('');
  const categories = ['Infrastructure', 'Environnement', 'Services', 'Gouvernance', 'Santé', 'Événements'];

  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/news');
      setNews(response.data.news || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les actualités');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image valide.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setForm((prev) => ({ ...prev, image: base64Image }));
      setImagePreview(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({
      title: '',
      excerpt: '',
      content: '',
      category: 'Infrastructure',
      image: '',
      publishedAt: '',
    });
    setImagePreview('');
    setEditingId(null);
    setError('');
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      publishedAt: form.publishedAt || new Date().toISOString(),
    };

    try {
      if (editingId) {
        const response = await api.put(`/api/news/${editingId}`, payload);
        setNews((prev) => prev.map((item) => (item._id === editingId ? response.data.news : item)));
        setStatus('Actualité mise à jour avec succès.');
      } else {
        const response = await api.post('/api/news', payload);
        setNews((prev) => [response.data.news, ...prev]);
        setStatus('Actualité ajoutée avec succès.');
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
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      image: item.image,
      publishedAt: item.publishedAt ? item.publishedAt.split('T')[0] : '',
    });
    setImagePreview(item.image || '');
    setError('');
    setStatus('');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette actualité ?')) return;
    try {
      await api.delete(`/api/news/${id}`);
      setNews((prev) => prev.filter((item) => item._id !== id));
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
            <h2>Gestion des actualités</h2>
            <p className="admin-subtitle">Ajoutez, modifiez ou supprimez les actualités qui apparaissent sur le site.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="btn-primary" onClick={() => setShowForm((prev) => !prev)}>
              {showForm ? 'Masquer le formulaire' : editingId ? 'Modifier une actualité' : 'Ajouter une actualité'}
            </button>
          </div>
        </div>

        <div className="admin-summary">
          <div className="summary-item">
            <span>Total d’actualités</span>
            <strong>{news.length}</strong>
          </div>
          <div className="summary-item">
            <span>Dernière publication</span>
            <strong>{news[0] ? new Date(news[0].publishedAt).toLocaleDateString('fr-FR') : '-'}</strong>
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
                  <span>Accroche</span>
                  <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Accroche" required />
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
                  <span>Image (URL)</span>
                  <input name="image" value={form.image} onChange={handleChange} placeholder="URL de l'image" />
                </label>
                <label>
                  <span>Upload image</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </label>
                <label>
                  <span>Date de publication</span>
                  <input name="publishedAt" value={form.publishedAt} onChange={handleChange} type="date" />
                </label>
              </div>

              {imagePreview && (
                <div className="image-preview-box">
                  <div className="image-preview-frame">
                    <img src={imagePreview} alt="Aperçu" />
                  </div>
                  <div>
                    <strong>Aperçu de l'image</strong>
                    <p>Vous pouvez remplacer l’image en téléversant un nouveau fichier.</p>
                  </div>
                </div>
              )}

              <label className="full-width">
                <span>Contenu complet</span>
                <textarea name="content" value={form.content} onChange={handleChange} rows="5" placeholder="Contenu complet" required />
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
          <p>Chargement des actualités...</p>
        ) : news.length === 0 ? (
          <p>Aucune actualité disponible.</p>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Catégorie</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="item-title-cell">
                        {item.image && <img src={item.image} alt={item.title} />}
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td>{item.category}</td>
                    <td>{new Date(item.publishedAt).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <button className="delete-btn" type="button" onClick={() => handleEdit(item)}>
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
