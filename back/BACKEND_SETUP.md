# User Management Backend API

Un backend complet pour gérer les utilisateurs avec authentification JWT, construit avec Node.js, Express et MongoDB.

## 🚀 Démarrage Rapide

### 1. Installation des dépendances

Les dépendances requises sont déjà listées dans `package.json`:
```bash
npm install
```

### 2. Configuration MongoDB

Assure-toi que MongoDB est en cours d'exécution:

**Option 1: MongoDB localement**
```bash
# Sur Ubuntu/Linux
sudo systemctl start mongod

# Sur macOS avec Homebrew
brew services start mongodb-community
```

**Option 2: MongoDB Atlas (cloud)**
- Crée un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Obtiens ta chaîne de connexion
- Mets à jour `MONGODB_URI` dans `.env`

### 3. Configuration .env

Copie `.env.example` vers `.env` et configure:

```bash
cp .env.example .env
```

Édite `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your_very_secure_secret_key_here_change_in_production
JWT_EXPIRE=1d
NODE_ENV=development
PORT=5000
```

### 4. Démarrage du serveur

**Mode développement (avec auto-reload):**
```bash
npm run dev
```

**Mode production:**
```bash
npm start
```

Le serveur démarre sur **http://localhost:5000**

---

## 📁 Structure du Projet

```
src/
├── config/
│   └── db.js                    # Configuration MongoDB
├── controllers/
│   ├── auth.controller.js       # Logique authentification
│   └── user.controller.js       # Logique utilisateur
├── middleware/
│   └── auth.middleware.js       # JWT verification
├── models/
│   └── user.model.js            # Schéma Mongoose User
├── routes/
│   ├── auth.routes.js           # Routes /api/auth
│   └── user.routes.js           # Routes /api/users
├── utils/
│   └── generateToken.js         # Génération JWT
└── server.js                    # Point d'entrée Express
```

---

## 🔐 Endpoints API

### 🔑 Authentication (`/api/auth`)

#### Inscription
```
POST /api/auth/register

Body:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### Connexion
```
POST /api/auth/login

Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 👤 Users (`/api/users`) - Routes Protégées

#### Profil de l'utilisateur connecté
```
GET /api/users/me

Headers:
Authorization: Bearer <JWT_TOKEN>

Response (200):
{
  "success": true,
  "user": {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### Mettre à jour le profil
```
PUT /api/users/me

Headers:
Authorization: Bearer <JWT_TOKEN>

Body:
{
  "username": "john_new",
  "email": "john_new@example.com"
}

Response (200):
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

#### Supprimer le compte
```
DELETE /api/users/me

Headers:
Authorization: Bearer <JWT_TOKEN>

Response (200):
{
  "success": true,
  "message": "Account deleted successfully"
}
```

### 👑 Admin Only (`/api/users`) - Routes Admin

#### Lister tous les utilisateurs
```
GET /api/users

Headers:
Authorization: Bearer <ADMIN_JWT_TOKEN>

Response (200):
{
  "success": true,
  "count": 5,
  "users": [ ... ]
}
```

#### Supprimer un utilisateur
```
DELETE /api/users/:id

Headers:
Authorization: Bearer <ADMIN_JWT_TOKEN>

Response (200):
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 🔒 Authentification JWT

### Comment ça marche

1. **Inscription** → Password hashé et stocké
2. **Connexion** → Password vérifié, JWT généré
3. **Requêtes protégées** → JWT envoyé dans le header `Authorization: Bearer <token>`
4. **Middleware** → Valide le JWT et attache l'utilisateur à `req.user`

### Token JWT

Le JWT contient:
```javascript
{
  "id": "user_id",
  "email": "user@example.com",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234654290  // Expire dans 1 jour
}
```

---

## 🛡️ Sécurité

### Password Hashing
- ✅ Utilise **bcrypt** avec 10 rounds de salt
- ✅ Password jamais stocké en clair
- ✅ Password jamais retourné en API

### JWT Security
- ✅ Secret signé dans `JWT_SECRET`
- ✅ Expiration 1 jour par défaut
- ✅ Validation sur chaque requête protégée

### Validation
- ✅ Email unique
- ✅ Username unique et minimum 3 caractères
- ✅ Password minimum 6 caractères
- ✅ Email validation regex

---

## 📊 User Model

```javascript
{
  username: String (required, unique, min 3)
  email: String (required, unique, valid email)
  password: String (required, min 6, hashed)
  role: String (enum: ['user', 'admin'], default: 'user')
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

---

## 🧪 Tester l'API

### Avec cURL

```bash
# Inscription
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Connexion
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Profil (remplace TOKEN par le JWT reçu)
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer TOKEN"
```

### Avec Postman

1. Ouvre Postman
2. Crée une nouvelle requête POST: `http://localhost:5000/api/auth/register`
3. Body → raw → JSON:
   ```json
   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123"
   }
   ```
4. Click Send
5. Copie le token reçu
6. Crée une nouvelle requête GET: `http://localhost:5000/api/users/me`
7. Headers → Ajoute: `Authorization: Bearer <ton_token>`
8. Click Send

---

## 🔧 Middleware Personnalisé

### `protect` Middleware
Vérifie le JWT et attache l'utilisateur à la requête:

```javascript
// Usage:
router.get('/me', protect, getProfile);
```

### `admin` Middleware
Vérifie que l'utilisateur est admin:

```javascript
// Usage:
router.get('/', protect, admin, getAllUsers);
```

---

## 📝 Gestion des Erreurs

Le backend retourne des réponses cohérentes:

```javascript
// Succès
{
  "success": true,
  "message": "...",
  "data": { ... }
}

// Erreur
{
  "success": false,
  "message": "Error description"
}
```

Codes HTTP utilisés:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## 🚀 Déploiement

### Préparation production

1. **Génère un JWT_SECRET fort:**
   ```bash
   openssl rand -base64 32
   ```

2. **Configure MongoDB Atlas** pour production

3. **Mets à jour .env:**
   ```env
   NODE_ENV=production
   MONGODB_URI=<atlas_connection_string>
   JWT_SECRET=<strong_secret>
   ```

4. **Build & déploiement:**
   ```bash
   npm install
   npm start
   ```

### Hébergement recommandé
- **Heroku** - Facile, gratuit pour les petits projets
- **Railway** - Meilleure alternative à Heroku
- **Render** - Gratuit et simple
- **AWS/Google Cloud** - Pour les gros projets

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Vérifie que MongoDB est en cours d'exécution
- Vérifie `MONGODB_URI` dans `.env`
- Test la connexion: `mongosh "mongodb://localhost:27017"`

### "JWT is not defined"
- Assure-toi que `require('jsonwebtoken')` est au top du fichier

### "CORS blocked"
- CORS est déjà activé dans `server.js`
- Pour ajouter des origins spécifiques:
  ```javascript
  app.use(cors({
    origin: 'http://localhost:5173'
  }));
  ```

### "Token invalid or expired"
- Régénère un nouveau token via `/api/auth/login`
- Vérifie que le JWT_SECRET est identique

---

## 📚 Ressources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

---

**Ton backend est prêt! 🎉**
