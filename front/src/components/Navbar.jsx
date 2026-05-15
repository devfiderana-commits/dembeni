import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className={`${isActive('/')} nav-link`}>
          Accueil
        </Link>
        <Link to="/demarches" className={`${isActive('/demarches')} nav-link`}>
          Démarches
        </Link>
        <Link to="/services" className={`${isActive('/services')} nav-link`}>
          Services publics
        </Link>
        <Link to="/actualites" className={`${isActive('/actualites')} nav-link`}>
          Actualités
        </Link>
      </div>

      <Link to="/" className="brand">
        DEMBÉNI
      </Link>

      <div className="nav-right">
        <Link to="/projet" className={`${isActive('/projet')} nav-link`}>
          Projet
        </Link>
        <Link to="/culture" className={`${isActive('/culture')} nav-link`}>
          Culture & Patrimoine
        </Link>
        <Link to="/solidarite" className={`${isActive('/solidarite')} nav-link`}>
          Solidarité & Santé
        </Link>
        <Link to="/contact" className={`${isActive('/contact')} nav-link`}>
          Contact
        </Link>
        {!isAuthenticated && (
          <Link to="/login" className={`${isActive('/login')} nav-link`}>
            Connexion
          </Link>
        )}
        {isAuthenticated && (
          <>
            {user?.role === 'admin' && (
              <Link to="/admin" className={`${isActive('/admin')} nav-link`}>
                Admin
              </Link>
            )}
            <button onClick={handleLogout} className="logout-link">
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
