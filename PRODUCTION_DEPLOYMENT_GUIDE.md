# Production Deployment Guide - Frontend/Backend Connectivity Fix

## ✅ Changes Implemented

### 1. **Frontend API Configuration** (COMPLETED)

#### File: `front/src/api/axios.js`
- ✅ Updated baseURL from `http://localhost:5000` to `https://dembeni-back.onrender.com/api`
- ✅ Added explicit `Content-Type: application/json` header
- ✅ Maintained authentication token interceptor for JWT Bearer tokens

**Current Configuration:**
```javascript
const api = axios.create({
  baseURL: 'https://dembeni-back.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### API Path Updates (All 12 Frontend Files Updated)
All `/api/` prefixes removed from API calls since baseURL now includes `/api`:

| File | API Calls Updated |
|------|-------------------|
| `Login.jsx` | `/auth/register`, `/auth/login` |
| `Register.jsx` | `/auth/register` |
| `Contact.jsx` | `/messages` |
| `Admin.jsx` | `/users`, `/users/${id}` |
| `Actualites.jsx` | `/news` |
| `Services.jsx` | `/services` |
| `Projet.jsx` | `/projects` |
| `AdminMessages.jsx` | `/messages`, `/messages/${id}` |
| `Dashboard.jsx` | `/users`, `/news`, `/services`, `/projects`, `/messages` |
| `AdminProjets.jsx` | `/projects`, `/projects/${id}` |
| `AdminNews.jsx` | `/news`, `/news/${id}` |
| `AdminServices.jsx` | `/services`, `/services/${id}` |

**API Call Pattern:**
- OLD: `api.post('/api/auth/login', {...})`
- NEW: `api.post('/auth/login', {...})`

### 2. **Backend CORS Configuration** (COMPLETED)

#### File: `back/src/server.js`
- ✅ Replaced permissive `cors()` with explicit whitelist
- ✅ Configured for both development and production
- ✅ Added credentials support for authentication

**Current Configuration:**
```javascript
const allowedOrigins = [
  'http://localhost:3000',           // Local development (React Vite)
  'http://127.0.0.1:3000',           // Local development
  'https://fiderana.github.io',      // GitHub Pages root
  'https://fiderana.github.io/',     // GitHub Pages root with trailing slash
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 🚀 Deployment Steps

### Step 1: Update Render Backend Environment

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service (`dembeni-back`)
3. Go to **Settings** → **Environment**
4. Verify these environment variables are set:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `PORT` - Optional (defaults to 5000)
   - `NODE_ENV` - Set to `production`

5. Deploy the backend with updated CORS:
   ```bash
   git push  # Render will auto-deploy
   ```

### Step 2: Build and Deploy Frontend to GitHub Pages

1. Build the React application:
   ```bash
   cd front
   npm install  # If needed
   npm run build
   ```

2. Verify the build output is in `front/dist/`

3. Deploy to GitHub Pages:
   ```bash
   # Option A: Using gh-pages package
   npm run deploy
   
   # Option B: Manual push
   # Commit dist folder to gh-pages branch
   git add dist/
   git commit -m "Production build"
   git push origin main
   ```

4. Verify deployment at: `https://fiderana.github.io/`

### Step 3: Test Production Connectivity

1. **Test Registration:**
   - Open: `https://fiderana.github.io/dembeni/`
   - Go to Login page
   - Click Register
   - Fill form and submit
   - Should see success message

2. **Test Login:**
   - Use registered credentials
   - Should redirect to home page
   - Token should be stored in localStorage

3. **Test Admin Functions:**
   - Login with admin account
   - Go to Admin Dashboard
   - Test all CRUD operations

4. **Browser Console:**
   - Open DevTools (F12)
   - Check Network tab for API requests
   - Verify all requests go to `https://dembeni-back.onrender.com/api/...`
   - Check for CORS errors

---

## 🔧 Troubleshooting

### Issue 1: CORS Error in Browser Console
```
Access to XMLHttpRequest at 'https://dembeni-back.onrender.com/api/auth/login' 
from origin 'https://fiderana.github.io' has been blocked by CORS policy
```

**Solution:** Update `allowedOrigins` in `back/src/server.js`:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://fiderana.github.io',  // Update with your actual GitHub Pages URL
  'https://fiderana.github.io/',
  'https://yourdomain.com',      // If using custom domain
];
```

### Issue 2: 404 Errors on API Calls
- Ensure all `/api/` prefixes are removed from frontend calls
- Backend routes start with `/api/`, but baseURL includes `/api/`
- Example: GET `/users` becomes `GET https://dembeni-back.onrender.com/api/users` ✅

### Issue 3: Timeout Errors
- Check if Render backend is active (might be sleeping on free tier)
- Add a ping endpoint or upgrade plan to prevent cold starts
- Monitor backend logs in Render dashboard

### Issue 4: 401 Unauthorized
- Verify token is saved in localStorage after login
- Check `Authorization` header is being sent: `Bearer <token>`
- Verify JWT secret is consistent across deployments
- Check token expiration time

### Issue 5: MongoDB Connection Issues
- Verify `MONGODB_URI` in Render environment
- Ensure MongoDB Atlas allows connections from Render IPs
- Check IP whitelist in MongoDB Atlas: Add `0.0.0.0/0` for Render

---

## 📋 Pre-Production Checklist

- [ ] **Frontend**
  - [ ] All localhost URLs replaced with Render URL
  - [ ] API paths updated (no `/api/` duplicates)
  - [ ] Build succeeds without errors (`npm run build`)
  - [ ] .env or config file has production values
  - [ ] GitHub Pages deployment working

- [ ] **Backend**
  - [ ] CORS configuration updated with correct GitHub Pages URL
  - [ ] Environment variables set in Render
  - [ ] Database connection tested
  - [ ] JWT secret configured
  - [ ] Error handling properly logs issues

- [ ] **Testing**
  - [ ] Registration flow works end-to-end
  - [ ] Login flow works end-to-end
  - [ ] Admin dashboard loads and functions
  - [ ] Token is properly stored and sent
  - [ ] No CORS errors in browser console
  - [ ] No 404 or 500 errors in API calls

---

## 📝 Environment Variables

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
PORT=5000
NODE_ENV=production
JWT_SECRET=your_secret_key
```

### Frontend
No secrets needed in frontend. All dynamic values are in `src/api/axios.js`

---

## 🔐 Security Notes

1. **CORS:** Now restricted to specific origins (GitHub Pages + localhost)
2. **Authentication:** JWT tokens in localStorage (standard for SPAs)
3. **Credentials:** Include `credentials: true` for cookie-based auth support
4. **HTTPS:** All production URLs use HTTPS
5. **Environment:** Keep secrets only in backend environment variables

---

## 📞 Support References

- **Render Docs:** https://render.com/docs
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **CORS Explained:** https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

## 🎉 Success Indicators

When deployment is successful, you should see:

✅ No CORS errors in browser console
✅ Registration/Login redirects working
✅ Admin dashboard fully functional
✅ API requests showing in Network tab with 200 status
✅ Token visible in Application → LocalStorage
✅ Database records created/updated on form submissions

---

**Last Updated:** May 22, 2026
**Backend URL:** https://dembeni-back.onrender.com
**Frontend URL:** https://fiderana.github.io/dembeni/
