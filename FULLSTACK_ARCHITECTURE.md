# 🚀 Architecture Complète - User Management System

## 📊 Vue d'ensemble du projet

Ton système de gestion d'utilisateurs est maintenant **100% complet** avec:
- ✅ **Frontend** React + Vite (déjà créé)
- ✅ **Backend** Node.js + Express + MongoDB (vient d'être créé)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Port 5173)                     │
│                    React + Vite + Router                    │
├─────────────────────────────────────────────────────────────┤
│  Pages:                                                      │
│  • Login.jsx      - Formulaire de connexion                 │
│  • Register.jsx   - Formulaire d'inscription                │
│  • Dashboard.jsx  - Profil utilisateur (protégé)           │
│  • Navbar.jsx     - Navigation dynamique                    │
├─────────────────────────────────────────────────────────────┤
│  Features:                                                   │
│  • JWT Authentication                                        │
│  • Protected Routes                                          │
│  • Axios with JWT Interceptor                              │
│  • Clean CSS Styling                                        │
└─────────────────────────────────────────────────────────────┘
           │
           │  HTTP Requests (CORS enabled)
           │  Authorization: Bearer <JWT>
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Backend (Port 5000)                      │
│               Node.js + Express + Mongoose                  │
├─────────────────────────────────────────────────────────────┤
│  Routes:                                                     │
│  • POST   /api/auth/register   - Inscription               │
│  • POST   /api/auth/login      - Connexion (JWT)           │
│  • GET    /api/users/me        - Profil (protégé)          │
│  • PUT    /api/users/me        - Mettre à jour             │
│  • DELETE /api/users/me        - Supprimer compte          │
│  • GET    /api/users           - Lister (admin)            │
│  • DELETE /api/users/:id       - Supprimer (admin)         │
├─────────────────────────────────────────────────────────────┤
│  Security:                                                   │
│  • JWT Authentication                                        │
│  • Password Hashing (bcrypt)                                │
│  • Role-Based Access (user/admin)                          │
│  • Input Validation                                         │
│  • CORS Protection                                          │
└─────────────────────────────────────────────────────────────┘
           │
           │  Mongoose ODM
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                         │
│                   user-management (local)                   │
├─────────────────────────────────────────────────────────────┤
│  Collections:                                                │
│  • users: { username, email, password, role, ... }         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Structure Complète du Projet

```
/1anty/
├── front/                          # Frontend React + Vite
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js           # HTTP client + JWT
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Page connexion
│   │   │   ├── Register.jsx       # Page inscription
│   │   │   ├── Dashboard.jsx      # Page protégée
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation
│   │   │   ├── ProtectedRoute.jsx # Route protection
│   │   │   └── Navbar.css
│   │   ├── App.jsx                # App principale
│   │   ├── main.jsx               # Entry point
│   │   └── CSS files
│   ├── package.json               # axios, react-router-dom
│   └── README.md
│
├── back/                           # Backend Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── models/
│   │   │   └── user.model.js      # Mongoose schema
│   │   ├── controllers/
│   │   │   ├── auth.controller.js # Register/Login logic
│   │   │   └── user.controller.js # User CRUD logic
│   │   ├── middleware/
│   │   │   └── auth.middleware.js # JWT verification
│   │   ├── routes/
│   │   │   ├── auth.routes.js     # Auth endpoints
│   │   │   └── user.routes.js     # User endpoints
│   │   ├── utils/
│   │   │   └── generateToken.js   # JWT generation
│   │   └── server.js              # Express app
│   ├── .env                       # Configuration
│   ├── .env.example
│   ├── package.json               # Express, Mongoose, JWT, etc
│   └── BACKEND_SETUP.md
│
├── readme.md                       # Description du projet
├── FRONTEND_SETUP.md              # Guide frontend
├── FRONTEND_COMPLETE.md           # Résumé frontend
├── BACKEND_COMPLETE.md            # Résumé backend
└── FULLSTACK_ARCHITECTURE.md      # Ce fichier
```

---

## 🔄 Flux d'Authentification Complet

### 1. **Inscription**
```
Frontend (Register.jsx)
         ↓
POST /api/auth/register { username, email, password }
         ↓
Backend (auth.controller.js)
  • Valide l'input
  • Hash le password avec bcrypt
  • Sauvegarde l'utilisateur
  • Retourne l'utilisateur créé
         ↓
Frontend (redirect to login)
```

### 2. **Connexion**
```
Frontend (Login.jsx)
         ↓
POST /api/auth/login { email, password }
         ↓
Backend (auth.controller.js)
  • Trouve l'utilisateur
  • Compare le password
  • Génère JWT token
  • Retourne { token, user }
         ↓
Frontend
  • Sauvegarde token dans localStorage
  • Stocke user dans AuthContext
  • Redirect au Dashboard
  • Ajoute Authorization header
```

### 3. **Requête Protégée**
```
Frontend (Dashboard.jsx)
         ↓
GET /api/users/me
Header: Authorization: Bearer <JWT_TOKEN>
         ↓
Backend (auth.middleware.js)
  • Lit le token du header
  • Vérifie la signature JWT
  • Valide l'expiration
  • Attache l'utilisateur à req.user
         ↓
Backend (user.controller.js)
  • Récupère l'utilisateur
  • Retourne les données (sans password)
         ↓
Frontend
  • Affiche le profil utilisateur
```

---

## 🔐 Sécurité Détaillée

### Password Hashing
```javascript
// Backend (model/user.model.js)
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
```
- ✅ Bcrypt 10 rounds
- ✅ Password jamais retourné
- ✅ Comparaison sécurisée

### JWT Token
```javascript
// Backend (utils/generateToken.js)
jwt.sign(
  { id, email, role },
  JWT_SECRET,
  { expiresIn: '1d' }
)
```
- ✅ Signé avec secret
- ✅ Expire après 1 jour
- ✅ Vérifié à chaque requête

### Middleware Protection
```javascript
// Backend (middleware/auth.middleware.js)
router.get('/me', protect, getProfile);
```
- ✅ Tous les routes sensibles protégées
- ✅ JWT validé avant d'atteindre le controller
- ✅ Utilisateur attaché à req.user

---

## 🧪 Workflow Complet - Tester de Bout en Bout

### Étape 1: Démarrer MongoDB
```bash
# Linux
sudo systemctl start mongod

# macOS
brew services start mongodb-community
```

### Étape 2: Démarrer le Backend
```bash
cd /home/fiderana/1anty/back
npm install
npm run dev
```

Résultat attendu:
```
✅ Server running on port 5000
MongoDB Connected: localhost
```

### Étape 3: Démarrer le Frontend
```bash
cd /home/fiderana/1anty/front
npm install
npm run dev
```

Résultat attendu:
```
  VITE v8.0.10  ready in 1234 ms
  ➜  Local:   http://localhost:5173/
```

### Étape 4: Tester dans le Browser

1. **Ouvre** http://localhost:5173/
2. **Voir** la page Login (redirection auto)
3. **Clique** "Register here"
4. **Remplis** le formulaire (username, email, password)
5. **Click** Register
6. **Connecté** automatiquement à Login
7. **Remplis** email et password
8. **Click** Login
9. **Voir** Dashboard avec profil
10. **Click** Logout → retour à Login

---

## 📡 Endpoints et Réponses

### POST /api/auth/register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "pass123"
  }'
```

Réponse:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-05-07T12:00:00.000Z",
    "updatedAt": "2026-05-07T12:00:00.000Z"
  }
}
```

### POST /api/auth/login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "pass123"
  }'
```

Réponse:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### GET /api/users/me
```bash
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Réponse:
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-05-07T12:00:00.000Z",
    "updatedAt": "2026-05-07T12:00:00.000Z"
  }
}
```

---

## 🛠️ Stack Technique

### Frontend
- React 19.2.5
- Vite 8.0.10
- React Router DOM 7.15.0
- Axios 1.16.0
- CSS pur (pas de librairie)

### Backend
- Node.js
- Express 5.2.1
- Mongoose 9.6.1
- bcrypt 6.0.0
- jsonwebtoken 9.0.3
- dotenv 17.4.2
- cors 2.8.6

### Database
- MongoDB 5.0+ (local ou Atlas)

---

## 🚀 Déploiement

### Frontend (Netlify/Vercel)
```bash
cd front
npm run build
# Upload le dossier "dist" sur Netlify/Vercel
```

### Backend (Railway/Render)
```bash
cd back
git push heroku main
# Ou upload sur Railway/Render avec MongoDB Atlas
```

---

## ⚙️ Configuration Production

### Backend .env
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/user-management
JWT_SECRET=your_very_secure_random_string_here
JWT_EXPIRE=1d
NODE_ENV=production
PORT=5000
```

### Frontend .env (optionnel)
```env
VITE_API_URL=https://your-backend.onrender.com
```

Puis update `src/api/axios.js`:
```javascript
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

---

## 📊 Données Utilisateur

### Stockées en Base de Données

```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (bcrypt hash),
  role: String ("user" | "admin"),
  createdAt: Date,
  updatedAt: Date
}
```

### Jamais Retournées par API
- ❌ password
- ✅ tout le reste

---

## 🔄 Interactions Frontend-Backend

```
Frontend                        Backend
  |                               |
  |--- POST /auth/register ------>|
  |<--- { success, user } --------|
  |                               |
  |--- POST /auth/login --------->|
  |<--- { success, token } -------|
  |  (sauve token en localStorage)|
  |                               |
  |--- GET /users/me ------------>|
  |     (Bearer token en header)   |
  |<--- { success, user } --------|
  |  (affiche le profil)          |
```

---

## ✅ Checklist d'Installation

- [ ] Node.js installé
- [ ] MongoDB installé et en cours
- [ ] Backend: `npm install && npm run dev`
- [ ] Frontend: `npm install && npm run dev`
- [ ] Test: http://localhost:5173
- [ ] Créer un compte → fonctionner
- [ ] Se connecter → JWT obtenu
- [ ] Dashboard → profil affiché

---

## 📚 Documentation Complète

- **FRONTEND_SETUP.md** - Guide détaillé frontend
- **FRONTEND_COMPLETE.md** - Résumé avec commandes
- **BACKEND_SETUP.md** - API documentation complète
- **BACKEND_COMPLETE.md** - Résumé avec démarrage
- **front/README.md** - Frontend documentation
- **back/BACKEND_SETUP.md** - Backend documentation

---

## 🎯 Fonctionnalités Implémentées

### Phase 1: Authentification ✅
- [x] Register with validation
- [x] Login with JWT
- [x] Password hashing (bcrypt)
- [x] Token storage (localStorage)
- [x] JWT verification middleware
- [x] Protected routes

### Phase 2: Profil Utilisateur ✅
- [x] Get user profile
- [x] Update profile
- [x] Delete account
- [x] Logout

### Phase 3: Admin (Optionnel)
- [x] List all users
- [x] Delete user by ID
- [x] Role-based access control

### Phase 4: Frontend Integration ✅
- [x] Registration form
- [x] Login form
- [x] Dashboard (protected)
- [x] Navbar with auth state
- [x] Protected routes

---

## 🐛 Support & Troubleshooting

### Backend ne démarre pas?
1. Vérifie MongoDB: `mongosh`
2. Vérifie .env: cat .env
3. Vérifie le port: `lsof -i :5000`
4. Logs: `npm run dev` (affiche les erreurs)

### Frontend ne se connecte pas?
1. Vérifiez CORS: `curl -X OPTIONS http://localhost:5000`
2. Vérifier token: DevTools → localStorage
3. Vérifier API URL: `src/api/axios.js`

### Token expiré?
- Se reconnecter
- Ou implémenter refresh token (optionnel)

---

## 🚀 Prochaines Étapes (Optionnel)

1. **Refresh Token** - Token de renouvellement automatique
2. **Email Verification** - Vérifier l'email après inscription
3. **Reset Password** - Formulaire oublié du mot de passe
4. **Profile Picture** - Upload d'image utilisateur
5. **2FA** - Two-factor authentication
6. **Social Login** - Google/GitHub OAuth
7. **API Tests** - Jest + Supertest
8. **Caching** - Redis pour les sessions

---

## 📝 Notes Importantes

⚠️ **Production:**
- Utilise un JWT_SECRET très sécurisé
- Active HTTPS pour tout
- Use MongoDB Atlas (cloud)
- Implémente un rate limiting
- Ajoute des logs
- Monitore les erreurs (Sentry)

🎯 **Best Practices:**
- Ne commit jamais le .env
- Use environment variables
- Hash les passwords (fait ✅)
- Valide les inputs (fait ✅)
- Protect les routes sensibles (fait ✅)

---

## 🎉 Conclusion

Ton **système de gestion d'utilisateurs fullstack complet** est maintenant prêt!

- ✅ Frontend React + Vite avec authentification JWT
- ✅ Backend Node.js + Express avec API sécurisée
- ✅ MongoDB pour la persistance des données
- ✅ Validation et gestion d'erreurs
- ✅ Documentation complète

**Prêt à lancer? 🚀**

```bash
# Terminal 1
cd back && npm run dev

# Terminal 2
cd front && npm run dev

# Browser
open http://localhost:5173
```

**C'est parti! 🎊**
