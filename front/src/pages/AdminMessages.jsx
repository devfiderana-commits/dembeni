import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../api/axios';
import './Admin.css';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/messages');
      setMessages(response.data.messages || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/messages/${id}`, { status: newStatus });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, status: newStatus } : msg))
      );
      setStatus('Statut mis à jour avec succès');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!selectedMessage || !replyText.trim()) return;

    setSaving(true);
    try {
      await api.put(`/messages/${selectedMessage._id}`, {
        status: 'replied',
        reply: replyText,
      });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === selectedMessage._id
            ? { ...msg, status: 'replied', reply: replyText, repliedAt: new Date() }
            : msg
        )
      );
      setStatus('Réponse envoyée avec succès');
      setShowReplyForm(false);
      setReplyText('');
      setSelectedMessage(null);
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi de la réponse');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    try {
      await api.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      setStatus('Message supprimé avec succès');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de supprimer le message');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      unread: { class: 'badge-red', text: 'Non lu' },
      read: { class: 'badge-gray', text: 'Lu' },
      replied: { class: 'badge-green', text: 'Répondu' },
    };
    return badges[status] || badges.unread;
  };

  return (
    <AdminLayout>
      <div className="admin-box">
        <div className="admin-section-header">
          <div>
            <p className="admin-tag">Tableau de bord Admin</p>
            <h2>Gestion des messages</h2>
            <p className="admin-subtitle">Consultez et répondez aux messages des citoyens.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="btn-primary" onClick={loadMessages}>
              Actualiser
            </button>
          </div>
        </div>

        <div className="admin-summary">
          <div className="summary-item">
            <span>Total de messages</span>
            <strong>{messages.length}</strong>
          </div>
          <div className="summary-item">
            <span>Non lus</span>
            <strong>{messages.filter((m) => m.status === 'unread').length}</strong>
          </div>
          <div className="summary-item">
            <span>Répondus</span>
            <strong>{messages.filter((m) => m.status === 'replied').length}</strong>
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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#1C6B35', marginBottom: '1rem' }}></i>
            <p>Chargement des messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
            <i className="fas fa-envelope-open" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
            <p>Aucun message reçu pour le moment.</p>
          </div>
        ) : (
          <div className="messages-container">
            <div className="messages-list">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`message-item ${selectedMessage?._id === message._id ? 'selected' : ''} ${message.status === 'unread' ? 'unread' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === 'unread') {
                      handleStatusChange(message._id, 'read');
                    }
                  }}
                >
                  <div className="message-header">
                    <div className="message-sender">
                      <strong>{message.name}</strong>
                      <span className="message-email">{message.email}</span>
                    </div>
                    <div className="message-meta">
                      <span className={`badge ${getStatusBadge(message.status).class}`}>
                        {getStatusBadge(message.status).text}
                      </span>
                      <span className="message-date">
                        {new Date(message.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  <div className="message-subject">{message.subject}</div>
                  <div className="message-preview">
                    {message.message.length > 100
                      ? `${message.message.substring(0, 100)}...`
                      : message.message}
                  </div>
                </div>
              ))}
            </div>

            {selectedMessage && (
              <div className="message-detail">
                <div className="message-detail-header">
                  <h3>{selectedMessage.subject}</h3>
                  <div className="message-actions">
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => handleStatusChange(selectedMessage._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="unread">Non lu</option>
                      <option value="read">Lu</option>
                      <option value="replied">Répondu</option>
                    </select>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        setShowReplyForm(true);
                        setReplyText(selectedMessage.reply || '');
                      }}
                    >
                      <i className="fas fa-reply"></i> Répondre
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(selectedMessage._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                <div className="message-content">
                  <div className="sender-info">
                    <p><strong>De:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
                    <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString('fr-FR')}</p>
                  </div>
                  <div className="message-body">
                    {selectedMessage.message}
                  </div>
                </div>

                {selectedMessage.reply && (
                  <div className="message-reply">
                    <h4>Votre réponse:</h4>
                    <div className="reply-content">
                      {selectedMessage.reply}
                    </div>
                    <small>Répondu le {new Date(selectedMessage.repliedAt).toLocaleString('fr-FR')}</small>
                  </div>
                )}

                {showReplyForm && (
                  <div className="reply-form">
                    <h4>Répondre au message</h4>
                    <form onSubmit={handleReply}>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Tapez votre réponse ici..."
                        rows="6"
                        required
                      />
                      <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={saving}>
                          {saving ? 'Envoi...' : 'Envoyer la réponse'}
                        </button>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => {
                            setShowReplyForm(false);
                            setReplyText('');
                          }}
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}