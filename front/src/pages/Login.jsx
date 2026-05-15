import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === 'admin' ? '/admin' : '/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!username || !email || !password) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      setLoading(true);
      try {
        await api.post('/api/auth/register', {
          username,
          email,
          password,
        });

        setError('');
        setMode('login');
        setUsername('');
        setEmail('');
        setPassword('');
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const { token, user: loggedUser } = response.data;

      login(token, loggedUser);
      navigate(loggedUser.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="left-panel">
        <div className="logo">
          <span>DEMBÉNI</span>
        </div>

        <div className="left-content">
          <h1>Bienvenue<br />{mode === 'register' ? 'nouveau citoyen' : 'de retour'}...</h1>
          <p>
            {mode === 'register' ? (
              <>
                Déjà inscrit ?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#d13030',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '0.95rem',
                  }}
                >
                  Se connecter
                </button>
              </>
            ) : (
              <>
                Nouveau citoyen ?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#d13030',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '0.95rem',
                  }}
                >
                  S'inscrire ici
                </button>
              </>
            )}
          </p>
        </div>

        <div className="footer-note">© 2026 Admin Dembeni</div>

        <div className="arc-dark"></div>
        <div className="arc-light"></div>
      </div>

      <div className="right-panel">
        <div className="mesh-bg"></div>
        <div className="glass-card">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FDE8E8', color: '#A01B1B', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.8rem', borderRadius: '50px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem' }}>
            <i className="fas fa-shield-alt"></i> Accès sécurisé
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            {['login', 'register'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMode(tab)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '999px',
                  border: mode === tab ? '2px solid #1C6B35' : '1px solid #D6F0DF',
                  background: mode === tab ? '#1C6B35' : '#F7F8FA',
                  color: mode === tab ? '#FFFFFF' : '#374140',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab === 'register' ? 'Inscription' : 'Connexion'}
              </button>
            ))}
          </div>

          {mode === 'login' && (
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
              {['user', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '999px',
                    border: role === r ? '2px solid #1C6B35' : '1px solid #D6F0DF',
                    background: role === r ? '#1C6B35' : '#F7F8FA',
                    color: role === r ? '#FFFFFF' : '#374140',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {r === 'admin' ? 'Admin' : 'Citoyen'}
                </button>
              ))}
            </div>
          )}

          <h2>{mode === 'register' ? 'Créer un compte citoyen' : `Connexion ${role === 'admin' ? 'Admin' : 'Citoyen'}`}</h2>
          <p style={{ textAlign: 'center', fontSize: '0.88rem', color: '#718096', marginBottom: '1.5rem' }}>
            {mode === 'register'
              ? 'Créez votre compte pour accéder au portail.'
              : role === 'admin'
              ? 'Entrez vos identifiants admin.'
              : 'Entrez vos identifiants pour accéder à votre espace citoyen.'}
          </p>

          {error && (
            <div style={{
              background: '#FDE8E8',
              color: '#A01B1B',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 500,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374140', marginBottom: '0.45rem' }}>
                  Nom complet
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Votre nom complet"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: '#f7f8fa',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '0.8rem 1rem',
                    fontSize: '0.9rem',
                    color: '#1a202c',
                    outline: 'none',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1C6B35';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(28,107,53,.10)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.background = '#f7f8fa';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374140', marginBottom: '0.45rem' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-envelope" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0', fontSize: '0.85rem' }}></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dembeni.fr"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: '#f7f8fa',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '0.8rem 1rem 0.8rem 2.6rem',
                    fontSize: '0.9rem',
                    color: '#1a202c',
                    outline: 'none',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1C6B35';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(28,107,53,.10)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.background = '#f7f8fa';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374140', marginBottom: '0.45rem' }}>
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0', fontSize: '0.85rem', zIndex: 1 }}></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: '#f7f8fa',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '0.8rem 1rem 0.8rem 3rem',
                    fontSize: '0.9rem',
                    color: '#1a202c',
                    outline: 'none',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                    position: 'relative',
                    zIndex: 2,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1C6B35';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(28,107,53,.10)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.background = '#f7f8fa';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #155228, #237A3E)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '0.9rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 4px 16px rgba(21,82,40,.30)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '0.5rem',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(21,82,40,.40)';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(21,82,40,.30)';
              }}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Vérification...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> {mode === 'register' ? "S'inscrire" : 'Connexion'}
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#718096', fontSize: '0.82rem' }}>
            <Link to="/" style={{ color: '#1C6B35', textDecoration: 'none', fontWeight: 600 }}>
              <i className="fas fa-arrow-left"></i> Retour au portail citoyen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
