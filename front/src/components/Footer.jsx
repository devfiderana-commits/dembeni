import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col brand-col">
          <div className="logo-wrapper">
            <span className="logo-box">D</span>
            <span className="logo-text">
              DEMBÉNI<span className="text-dot">.</span>
            </span>
          </div>
          <p className="brand-desc">
            Portail citoyen officiel de la commune de Dembéni, Mayotte. Simplifiez vos démarches administratives en ligne, en toute sécurité.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>NAVIGATION</h3>
          <ul className="link-list">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/demarches">Démarches</Link></li>
            <li><Link to="/collecte">Collecte</Link></li>
            <li><Link to="/services">Service public</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>SERVICES</h3>
          <ul className="link-list">
            <li><a href="#">État civil</a></li>
            <li><a href="#">Documents officiels</a></li>
            <li><a href="#">Urbanisme</a></li>
            <li><a href="#">Crèche</a></li>
            <li><a href="#">Encombrants</a></li>
          </ul>
        </div>

        <div className="footer-col info-col">
          <h3>INFORMATIONS</h3>
          <ul className="contact-list">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>Mairie de Dembéni, Mayotte<br />97680</span>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <span>+262 269 XX XX XX</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>dembenimairie@gmail.com</span>
            </li>
            <li>
              <i className="far fa-clock"></i>
              <span>Lun-Ven · 8h00 - 16h30</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © 2026 Mairie de Dembéni — Tous droits réservés
        </div>
        <ul className="legal-links">
          <li><a href="#">Mentions légales</a></li>
          <li><a href="#">Confidentialité</a></li>
          <li><a href="#">Accessibilité</a></li>
        </ul>
      </div>
    </footer>
  );
}
