# ✅ Backend Setup Complete - Démarrage Rapide

## 🎉 Ce qui a été créé

Tout le backend Node.js/Express/MongoDB est maintenant complet et prêt à fonctionner!

### 📁 Fichiers Créés

**Configuration:**
- ✅ `.env` - Variables d'environnement
- ✅ `.env.example` - Exemple de configuration

**Code Backend:**
- ✅ `src/config/db.js` - Connexion MongoDB
- ✅ `src/models/user.model.js` - Schéma utilisateur
- ✅ `src/controllers/auth.controller.js` - Logique inscription/connexion
- ✅ `src/controllers/user.controller.js` - Logique profil utilisateur
- ✅ `src/middleware/auth.middleware.js` - JWT verification
- ✅ `src/utils/generateToken.js` - Génération JWT
- ✅ `src/routes/auth.routes.js` - Routes authentication
- ✅ `src/routes/user.routes.js` - Routes utilisateur
- ✅ `src/server.js` - Point d'entrée Express

**Documentation:**
- ✅ `BACKEND_SETUP.md` - Documentation complète

---

## 🚀 Démarrage du Backend

### Étape 1: Vérifier MongoDB

Le backend se connecte à MongoDB sur `mongodb://localhost:27017`

**Option A: MongoDB localement**

```bash
# Sur Ubuntu/Linux
sudo systemctl start mongod

# Sur macOS avec Homebrew
brew services start mongodb-community

# Vérifie que MongoDB fonctionne:
mongosh
# Devrais voir le prompt: "test> "
```

**Option B: MongoDB Atlas (Cloud)**

1. Crée un compte: https://www.mongodb.com/cloud/atlas
2. Crée un cluster gratuit
3. Copie la chaîne de connexion
4. Mets à jour `MONGODB_URI` dans `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-management
```

### Étape 2: Configurer .env

Le fichier `.env` est déjà créé avec les bonnes valeurs:

```env
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=1d
NODE_ENV=development
PORT=5000
```

💡 **En production**, génère un JWT_SECRET sécurisé:
```bash
openssl rand -base64 32
```

### Étape 3: Démarrer le Backend

**Mode développement (avec auto-reload):**
```bash
cd /home/fiderana/1anty/back
npm run dev
```

**Mode production:**
```bash
npm start
```

Après le démarrage, tu devrais voir:
```
✅ Server running on port 5000
MongoDB Connected: localhost
```

---

## 🧪 Tester le Backend

### Test 1: Vérifier que le serveur est actif

```bash
curl http://localhost:5000
```

Réponse attendue:
```json
{
  "message": "User Management API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

### Test 2: Inscription

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Réponse attendue:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": { ... }
}
```

### Test 3: Connexion

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Réponse attendue - **Copie le token**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### Test 4: Profil Utilisateur (Protégé)

```bash
# Remplace TOKEN par le JWT reçu ci-dessus
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer TOKEN"
```

Réponse attendue:
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "username": "testuser",
    "email": "test@example.com",
    "role": "user"
  }
}
```

---

## 🔐 Endpoints API

### 🔑 Authentification

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/auth/register` | Créer un compte |
| `POST` | `/api/auth/login` | Se connecter (obtient JWT) |

### 👤 Utilisateur (Protégé)

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/users/me` | Profil de l'utilisateur connecté |
| `PUT` | `/api/users/me` | Mettre à jour le profil |
| `DELETE` | `/api/users/me` | Supprimer le compte |

### 👑 Admin (Protégé + Admin)

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/users` | Lister tous les utilisateurs |
| `DELETE` | `/api/users/:id` | Supprimer un utilisateur |

---

## 📊 Structure User Model

```javascript
{
  username: String (unique, min 3)
  email: String (unique, valid email)
  password: String (hashed with bcrypt, never returned)
  role: String ("user" ou "admin", default: "user")
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

---

## 🛡️ Sécurité

✅ **Password Hashing**
- Bcrypt avec 10 rounds
- Password jamais stocké en clair
- Password jamais retourné par l'API

✅ **JWT Authentication**
- Token signé avec `JWT_SECRET`
- Expiration 1 jour par défaut
- Validation sur chaque requête protégée

✅ **Validation**
- Email unique et format valide
- Username unique, min 3 caractères
- Password minimum 6 caractères

---

## 🔗 Intégration avec le Frontend

Le frontend (React + Vite) est configuré pour utiliser ce backend:

```javascript
// src/api/axios.js
const api = axios.create({
  baseURL: 'http://localhost:5000',
});
```

Les deux peuvent fonctionner ensemble:
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5173

---

## 📝 Variables d'Environnement

```env
MONGODB_URI          # Chaîne de connexion MongoDB
JWT_SECRET           # Secret pour signer les JWT (change en production!)
JWT_EXPIRE           # Durée d'expiration du token (ex: "1d")
NODE_ENV             # "development" ou "production"
PORT                 # Port du serveur (défaut: 5000)
```

---

## 🐛 Troubleshooting

### ❌ "MongoDB Connected" ne s'affiche pas

**Vérifie que MongoDB fonctionne:**
```bash
# Linux
sudo systemctl status mongod

# macOS
brew services list | grep mongodb

# Windows
Get-Service MongoDB
```

**Si MongoDB n'est pas installé:**
```bash
# Ubuntu
sudo apt-get install -y mongodb

# macOS
brew install mongodb-community

# Windows
# Télécharge depuis: https://www.mongodb.com/try/download/community
```

### ❌ "JWT_SECRET not found"

Assure-toi que `.env` existe dans `/home/fiderana/1anty/back/`:
```bash
ls -la /home/fiderana/1anty/back/.env
```

Si absent, crée-le avec les bonnes valeurs.

### ❌ "Port 5000 already in use"

```bash
# Trouve le process
lsof -i :5000

# Tue-le
kill -9 <PID>

# Ou change le port dans .env:
PORT=5001
```

### ❌ "CORS errors"

CORS est déjà activé. Si tu as des problèmes:
```javascript
// src/server.js (déjà fait)
app.use(cors());
```

---

## ✅ Checklist de Démarrage

- [ ] MongoDB installé et en cours d'exécution
- [ ] `.env` configuré avec `MONGODB_URI` et `JWT_SECRET`
- [ ] Dépendances installées: `npm install`
- [ ] Nodemon installé: `npm install nodemon --save-dev`
- [ ] Backend démarre: `npm run dev` (pas d'erreurs)
- [ ] API répond: `curl http://localhost:5000`
- [ ] Inscription fonctionne: `POST /api/auth/register`
- [ ] Connexion fonctionne: `POST /api/auth/login`
- [ ] Profil protégé fonctionne: `GET /api/users/me`

---

## 🚀 Prochaines Étapes

1. ✅ **Backend créé et configuré**
2. ✅ **Frontend déjà prêt** (fait précédemment)
3. Démarre les deux serveurs en parallèle:
   - Terminal 1: `cd back && npm run dev` (port 5000)
   - Terminal 2: `cd front && npm run dev` (port 5173)
4. Ouvre http://localhost:5173 et teste l'app complète!

---

## 📚 Documentation

Pour plus de détails, consulte:
- **BACKEND_SETUP.md** - Documentation API complète
- **front/README.md** - Documentation Frontend

---

**Ton backend est prêt et complet! 🎉**

Besoin d'aide? Consulte BACKEND_SETUP.md pour la documentation détaillée de chaque endpoint.
