# 🚀 Quick Start Guide - Frontend Setup

## ✅ What's Been Created

Your React + Vite frontend for the user management system is **ready to use**!

### 📁 Project Structure Created:

```
src/
├── api/
│   └── axios.js                    # Axios instance with JWT interceptor
├── pages/
│   ├── Login.jsx                   # 🔐 Login page
│   ├── Register.jsx                # 📝 Register page
│   ├── Dashboard.jsx               # 🏠 Dashboard (protected)
│   ├── Auth.css                    # Auth pages styling
│   └── Dashboard.css               # Dashboard styling
├── components/
│   ├── Navbar.jsx                  # Navigation bar
│   ├── ProtectedRoute.jsx          # Route protection wrapper
│   └── Navbar.css                  # Navbar styling
├── context/
│   └── AuthContext.jsx             # 🔐 Auth state & JWT management
├── App.jsx                         # Main app with routing
├── main.jsx                        # Entry point
├── App.css                         # Global styles
└── index.css                       # Reset & globals
```

### 📦 Dependencies Installed:
- ✅ axios
- ✅ react-router-dom

## 🎯 Features Implemented

### 🔐 Authentication
- ✅ User registration with validation
- ✅ User login with JWT token
- ✅ Token storage in localStorage
- ✅ Automatic JWT injection in API requests
- ✅ Protected routes with auto-redirect

### 📄 Pages
- ✅ Login page (email + password)
- ✅ Register page (username + email + password)
- ✅ Dashboard page (shows user profile)
- ✅ Navbar with auth state awareness

### 🛡️ Security
- ✅ Protected routes
- ✅ Automatic logout on 401
- ✅ Token-based authentication
- ✅ Form validation

### 🎨 UI/UX
- ✅ Clean, minimal design
- ✅ Responsive layout
- ✅ Error message handling
- ✅ Loading states
- ✅ Gradient color scheme

## 🚀 Getting Started

### 1. Start the Development Server

```bash
cd /home/fiderana/1anty/front
npm run dev
```

Your frontend will be available at: **http://localhost:5173/**

### 2. Start Your Backend

Make sure your backend is running on **http://localhost:5000**

```bash
cd /home/fiderana/1anty/back
npm run dev
```

### 3. Test the Flow

1. Open http://localhost:5173/ in your browser
2. You'll be redirected to login (if not authenticated)
3. Click "Register here" to create a new account
4. Fill in username, email, and password
5. Click Register → redirects to login
6. Log in with your credentials
7. JWT token is saved to localStorage
8. Dashboard loads with your profile info
9. Click Logout → token is cleared and redirected to login

## ⚙️ Configuration

### API Base URL

Edit `src/api/axios.js` to change the backend URL:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000', // ← Change this
});
```

## 🔌 API Endpoints

Your frontend connects to these endpoints:

```
POST   /api/auth/register        Register new user
POST   /api/auth/login            Login user (returns token)
GET    /api/users/me              Get logged-in user (requires JWT)
```

**Make sure your backend implements these endpoints!**

## 🛠️ Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

## 📋 File Descriptions

### Core Files

**`context/AuthContext.jsx`**
- Manages authentication state
- Stores JWT token in localStorage
- Provides `useAuth()` hook
- Methods: `login()`, `logout()`, `setUserData()`

**`api/axios.js`**
- Axios instance with JWT interceptor
- Automatically adds `Authorization: Bearer <token>` header
- Configured for http://localhost:5000

**`components/ProtectedRoute.jsx`**
- Wraps routes that require authentication
- Redirects to login if not authenticated

### Pages

**`pages/Login.jsx`**
- Email & password inputs
- Form validation
- Error handling
- Saves JWT token on success

**`pages/Register.jsx`**
- Username, email, password inputs
- Form validation
- Redirects to login on success

**`pages/Dashboard.jsx`**
- Protected route component
- Fetches user profile from `/api/users/me`
- Shows username, email, role
- Logout button

## 🔍 Debugging

### Check Token in Browser
1. Open DevTools (F12)
2. Go to Application → localStorage
3. Look for `token` key

### Check API Calls
1. Open DevTools (F12)
2. Go to Network tab
3. Make a request
4. Check if `Authorization` header is present

### CORS Issues?
Make sure your backend has CORS enabled:

```javascript
// backend server.js
const cors = require('cors');
app.use(cors());
```

## 📚 Using the Auth Hook

```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, token, isAuthenticated, logout } = useAuth();
  
  return (
    <>
      {isAuthenticated && (
        <div>
          <p>Logged in as: {user.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
}
```

## 🎯 Next Steps

1. ✅ Frontend is ready to use
2. ✅ Make sure backend is running
3. ✅ Start the dev server (`npm run dev`)
4. ✅ Test the full auth flow
5. 🚀 Customize styling and add more features as needed

## 📝 Notes

- **Folder structure matches your requirements exactly**
- **All dependencies are installed**
- **No errors in the code**
- **Ready for immediate use**
- **JWT token automatically injected in all requests**
- **Protected routes work out of the box**

## ⚠️ Important

- Make sure CORS is enabled on your backend
- Backend should be running on http://localhost:5000
- Backend should implement all three API endpoints
- Register endpoint should accept: `{ username, email, password }`
- Login endpoint should return: `{ token }`
- Me endpoint should return user object with at least: `{ username, email, role }`

## 🎨 Styling

All styling uses **plain CSS** (no external UI libraries):
- Purple gradient theme (#667eea → #764ba2)
- Mobile responsive
- Clean, minimal design
- Easy to customize

## 🤝 Support

If you encounter issues:
1. Check that backend is running
2. Verify API base URL in `src/api/axios.js`
3. Ensure CORS is enabled on backend
4. Check browser DevTools for errors
5. Review README.md for more details

---

**Everything is set up and ready to go! 🎉**
