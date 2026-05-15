import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'news', label: 'Actualités', path: '/admin', icon: 'fas fa-newspaper' },
    { id: 'dashboard', label: 'Tableau de bord', path: '/admin/dashboard', icon: 'fas fa-chart-line' },
    { id: 'users', label: 'Utilisateurs', path: '/admin/users', icon: 'fas fa-users' },
    { id: 'services', label: 'Services', path: '/admin/services', icon: 'fas fa-cog' },    { id: 'projets', label: 'Projets', path: '/admin/projets', icon: 'fas fa-project-diagram' },    { id: 'messages', label: 'Messages', path: '/admin/messages', icon: 'fas fa-envelope' },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>DEMBÉNI</h2>
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className={`fas fa-${sidebarOpen ? 'chevron-left' : 'chevron-right'}`}></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <i className={item.icon}></i>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info" style={{ display: sidebarOpen ? 'block' : 'none' }}>
            <p className="user-name">{user?.username}</p>
            <p className="user-role">{user?.role}</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div className="header-left">
            <button
              className="mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
            <h1>Tableau de bord Admin</h1>
          </div>
          <div className="header-right">
            <span className="user-badge">
              <i className="fas fa-user-circle"></i> {user?.username}
            </span>
            <button className="btn-ghost logout-topbar" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </div>
        </div>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
