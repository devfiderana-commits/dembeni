# 🚀 Système de Gestion des Utilisateurs - Fullstack

## 📌 Description
Une application fullstack de gestion des utilisateurs avec authentification JWT et contrôle d'accès basé sur les rôles. Le système comprend un site public accessible à tous, une authentification sécurisée, et un tableau de bord admin pour la gestion des utilisateurs.

### Fonctionnalités principales
- ✅ Site public accessible sans connexion
- 🔐 Authentification JWT (login/register)
- 👑 Tableau de bord admin (gestion utilisateurs, actualités et services)
- 📰 Gestion des actualités avec upload d'image
- 🛠️ Gestion des services avec prévisualisation et icônes
- 🛡️ Contrôle d'accès basé sur les rôles
- 📱 Interface responsive

---

## ⚙️ Stack technique

### Frontend
- **React 19** + **Vite**
- **React Router DOM** (navigation)
- **Axios** (requêtes API)
- **Context API** (gestion état auth)
- **localStorage** (persistence JWT)
- **Tailwind CSS** (responsive)

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** (authentification)
- **bcryptjs** (hash mots de passe)
- **CORS** + **dotenv**

---

## 📁 Structure du projet

```
1anty/
├── back/                    # Backend Node.js/Express
│   ├── src/
│   │   ├── server.js       # Point d'entrée serveur
│   │   ├── config/         # Configuration DB
│   │   ├── controllers/    # Logique métier
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Schémas MongoDB
│   │   ├── routes/         # Routes API
│   │   ├── utils/          # Utilitaires
│   │   └── config/
│   ├── package.json
│   └── .env               # Variables d'environnement
│
├── front/                  # Frontend React/Vite
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── context/        # AuthContext
│   │   ├── pages/          # Pages (Home, Login, Admin)
│   │   ├── api/            # Configuration Axios
│   │   └── assets/         # Images, icônes
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── readme.md              # Documentation
```

---

## 🚀 Installation & Démarrage

### Prérequis
- Node.js (v16+)
- MongoDB (local ou Atlas)
- npm ou yarn

### 1. Cloner le projet
```bash
git clone <repository-url>
cd 1anty
```

### 2. Backend
```bash
cd back
npm install
# Configurer .env (voir section Configuration)
npm run dev  # Démarre sur http://localhost:5000
```

### 3. Frontend
```bash
cd ../front
npm install
npm run dev  # Démarre sur http://localhost:5173
```

### 4. Accès
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## ⚙️ Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user_management
JWT_SECRET=votre_secret_jwt_super_securise
NODE_ENV=development
```

### Base de données
Le système utilise MongoDB avec un schéma utilisateur simple :
```javascript
{
  username: String,
  email: String,
  password: String (hashé),
  role: String ('user' ou 'admin')
}
```

---

## 🔌 API Endpoints

### Authentification
```
POST /api/auth/register
- Body: { username, email, password }
- Response: { message: "User created" }

POST /api/auth/login
- Body: { email, password }
- Response: { token, user: { _id, username, email, role } }
```

### Utilisateurs (protégés)
```
GET /api/users/me
- Headers: Authorization: Bearer <token>
- Response: { user: { _id, username, email, role } }

GET /api/users (ADMIN ONLY)
- Headers: Authorization: Bearer <token>
- Response: { users: [...] }

DELETE /api/users/:id (ADMIN ONLY)
- Headers: Authorization: Bearer <token>
- Response: { message: "User deleted" }
```

### Actualités (ADMIN ONLY)
```
GET /api/news
- Response: { news: [...] }

POST /api/news
- Headers: Authorization: Bearer <token>
- Body: { title, excerpt, content, category, image, publishedAt }
- Response: { news: {...} }

PUT /api/news/:id
- Headers: Authorization: Bearer <token>
- Body: { title, excerpt, content, category, image, publishedAt }
- Response: { news: {...} }

DELETE /api/news/:id
- Headers: Authorization: Bearer <token>
- Response: { message: "News deleted" }
```

### Services (ADMIN ONLY)
```
GET /api/services
- Response: { services: [...] }

POST /api/services
- Headers: Authorization: Bearer <token>
- Body: { title, description, icon, hours, contact, email, image }
- Response: { service: {...} }

PUT /api/services/:id
- Headers: Authorization: Bearer <token>
- Body: { title, description, icon, hours, contact, email, image }
- Response: { service: {...} }

DELETE /api/services/:id
- Headers: Authorization: Bearer <token>
- Response: { message: "Service deleted" }
```

---

## 🎨 Fonctionnalités Frontend

### 🏠 Page Publique (/)
- Accessible sans connexion
- Contenu marketing/général
- Navigation vers login/register

### 🔐 Authentification
- **Login**: Formulaire email/mot de passe
- **Register**: Création compte
- Persistance JWT dans localStorage
- Redirections automatiques selon rôle

### 👑 Tableau Admin (/admin)
- **Accès restreint**: role === 'admin' uniquement
- Liste tous les utilisateurs (table)
- Bouton suppression par utilisateur
- Actualisation automatique après suppression

### 🧭 Navigation
- Navbar responsive
- Liens conditionnels selon statut auth
- Redirections sécurisées

---

## 🔒 Sécurité
- **JWT**: Tokens signés côté serveur
- **Hash passwords**: bcryptjs
- **CORS**: Configuration appropriée
- **Middleware auth**: Vérification tokens
- **Role-based access**: Contrôle admin

---

## 📱 Interface Utilisateur
- Design clean et moderne
- Responsive (mobile/desktop)
- Messages d'erreur informatifs
- États de chargement
- Confirmations d'actions (suppression)

---

## 🧪 Tests
```bash
# Backend
cd back
npm test

# Frontend
cd front
npm run build  # Vérification build
```

---

## 🚀 Déploiement
### Backend
```bash
cd back
npm run build
npm start
```

### Frontend
```bash
cd front
npm run build
# Servir le dossier dist/
```

### Variables production
- Configurer JWT_SECRET fort
- Utiliser HTTPS
- Configurer MongoDB Atlas
- Variables d'environnement sécurisées

---

## 🤝 Contribution
1. Fork le projet
2. Créer une branche feature
3. Commits descriptifs
4. Pull request

---

## 📄 Licence
MIT License - voir LICENSE pour plus de détails.

---

## 📞 Support
Pour questions ou problèmes :
- Ouvrir une issue GitHub
- Vérifier la console pour erreurs
- S'assurer que MongoDB est démarré

---

* Middleware de protection

---

## 🧂 Password Security

* Hash bcrypt
* Salt automatique
* Jamais stocker mot de passe en clair

---

## 🚧 Middleware Auth

* Vérifie token
* Bloque accès si non authentifié
* Extrait user depuis token

---

## 👑 Role-Based Access (RBAC)

* user
* admin
* contrôle des routes selon rôle

---

# 🧠 4. Base de données (MongoDB)

## 📌 User Model

* username
* email
* password
* role
* createdAt

---

# 🔌 5. API REST

## Auth routes

* POST `/api/auth/register`
* POST `/api/auth/login`

## User routes

* GET `/api/users/me`
* PUT `/api/users/me`
* DELETE `/api/users/me`

## Admin routes

* GET `/api/users`
* DELETE `/api/users/:id`

---

# ⚙️ 6. Architecture backend

```
src/
├── config/        (MongoDB connection)
├── controllers/   (logique métier)
├── models/        (schemas MongoDB)
├── routes/        (API endpoints)
├── middleware/    (auth JWT)
├── utils/         (helpers token, hash)
└── server.js
```

---

# 🚀 7. Fonctionnalités avancées (optionnel)

* 🔄 Refresh token
* 📧 Email verification
* 🔒 Reset password
* 📊 Pagination + filtre users
* 🧾 Logs utilisateurs
* ⚡ Rate limiting (anti brute force)

---

# 🧭 Résumé simple

Ton projet =

👉 Système complet de gestion utilisateur sécurisé

* inscription
* connexion
* profil
* CRUD user
* admin control
* JWT security

---

## 💡 Prochaine étape logique

Je peux maintenant te faire :

👉 **le backend complet codé (100% prêt à lancer)**
ou
👉 **on construit ensemble étape par étape**

Dis juste :

* “code backend complet”
* ou “on code étape par étape”





Voici un **README.md propre et clair** que tu peux donner à Copilot (ou garder comme documentation de projet). Il résume **tout ce qui fonctionne déjà + remarques techniques**.

---

# 📄 README.md — Projet Gestion Utilisateurs (Fullstack)

```md
# 🚀 Projet Fullstack - Gestion d'Utilisateurs

## 📌 Description
Application fullstack permettant :
- Inscription / Connexion utilisateur
- Authentification JWT
- Gestion des rôles (user / admin)
- Dashboard utilisateur
- Dashboard admin (liste utilisateurs)

Stack :
- Frontend : React + Vite
- Backend : Node.js + Express
- Base de données : MongoDB (Mongoose)
- Auth : JWT + bcrypt

---

# ✅ État actuel du projet

## 🟢 BACKEND (100% fonctionnel)

### 🔐 Authentification
- ✔ Register utilisateur
- ✔ Login utilisateur
- ✔ Hash password avec bcrypt
- ✔ Génération JWT
- ✔ Middleware d'authentification

### 👤 Gestion utilisateurs
- ✔ Création user en DB
- ✔ Récupération profil utilisateur (/me)
- ✔ Liste utilisateurs (admin)
- ✔ Structure role (user/admin)

### 🌐 API REST
Endpoints fonctionnels :

```

POST   /api/auth/register   ✔
POST   /api/auth/login      ✔
GET    /api/users/me       ✔ (protégé)
GET    /api/users          ✔ (admin)

```

### 🗄 Base de données
- ✔ MongoDB connecté
- ✔ Schéma User opérationnel
- ✔ Stockage sécurisé password

---

## 🟢 FRONTEND (fonctionnel)

### 🔐 Authentification UI
- ✔ Page Login
- ✔ Page Register
- ✔ Gestion token JWT (localStorage)
- ✔ Context Auth global

### 🧭 Navigation
- ✔ React Router configuré
- ✔ Routes protégées (ProtectedRoute)

### 📊 Dashboards
- ✔ User Dashboard (profil utilisateur)
- ✔ Admin Dashboard (liste users)

### 🎨 UI
- ✔ Interface simple et responsive
- ✔ Gestion erreurs API
- ✔ États de chargement basiques

---

# ⚙️ Architecture

```

backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js

frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── api/
│   └── App.jsx

```

---

# 🔐 Sécurité implémentée

- ✔ Password hash (bcrypt)
- ✔ JWT authentication
- ✔ Routes protégées middleware
- ✔ Role-based access (user/admin)

---

# ⚠️ Remarques / Points à améliorer

## Backend
- ⚠️ Ajouter refresh token (sécurité avancée)
- ⚠️ Ajouter validation (Joi / Zod)
- ⚠️ Améliorer gestion erreurs globale
- ⚠️ Logger système (morgan / winston)

## Frontend
- ⚠️ UI basique (pas encore design pro)
- ⚠️ Pas de gestion loading avancée
- ⚠️ Pas de pagination users (admin)
- ⚠️ Pas de confirmation delete/update

## Architecture
- ⚠️ Pas encore structure CLEAN ARCHITECTURE
- ⚠️ Pas de tests unitaires
- ⚠️ Pas de dockerisation

---

# 🚀 Fonctionnement global

## 1. Inscription
User → /register → MongoDB

## 2. Connexion
User → /login → JWT token

## 3. Accès protégé
Token → Middleware → accès API

## 4. Dashboard
- User → profil personnel
- Admin → liste utilisateurs

---

# 📌 Statut global

| Module       | Statut |
|-------------|--------|
| Backend      | ✅ OK |
| Auth         | ✅ OK |
| Database     | ✅ OK |
| Frontend UI  | ✅ OK (Tailwind CSS intégré) |
| Admin panel  | ✅ OK |
| Security     | ✅ OK (JWT + bcrypt) |

---

# 🎯 Prochaines améliorations possibles

- Dashboard admin avancé (CRUD users)
- UI moderne (Tailwind / MUI)
- Graphiques statistiques
- Refresh token system
- Deployment (VPS / Docker)
```

---


