import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Collecte from './pages/Collecte';
import Contact from './pages/Contact';
import Demarches from './pages/Demarches';
import Actualites from './pages/Actualites';
import Culture from './pages/Culture';
import CultureDetail from './pages/CultureDetail';
import Projet from './pages/Projet';
import Solidarite from './pages/Solidarite';
import Admin from './pages/Admin';
import AdminNews from './pages/AdminNews';
import AdminServices from './pages/AdminServices';
import AdminMessages from './pages/AdminMessages';
import AdminProjets from './pages/AdminProjets';
import Dashboard from './pages/Dashboard';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/culture/:id" element={<CultureDetail />} />
        <Route path="/projet" element={<Projet />} />
        <Route path="/solidarite" element={<Solidarite />} />
        <Route path="/services" element={<Services />} />
        <Route path="/collecte" element={<Collecte />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demarches" element={<Demarches />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes (protected) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminNews />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <AdminRoute>
              <AdminServices />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <AdminRoute>
              <AdminMessages />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/projets"
          element={
            <AdminRoute>
              <AdminProjets />
            </AdminRoute>
          }
        />
      </Routes>
      {!hideNavbar && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
