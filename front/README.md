# User Management System - Frontend

A modern React + Vite frontend for a user management system with JWT authentication.

## Features

✨ **Authentication & Security**
- User registration and login
- JWT token-based authentication
- Secure token storage in localStorage
- Protected routes with automatic redirection

🎨 **User Interface**
- Clean, minimal design
- Responsive layout
- Form validation
- Error message handling
- Loading states

🚀 **Pages**
- **Login Page** - Secure login with email and password
- **Register Page** - User registration form
- **Dashboard** - Protected page showing user profile

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with interceptors
- **CSS** - Simple, clean styling (no frameworks)

## Project Structure

```
src/
├── api/
│   └── axios.js                 # Axios instance with JWT interceptor
├── pages/
│   ├── Login.jsx                # Login page
│   ├── Register.jsx             # Registration page
│   ├── Dashboard.jsx            # Protected dashboard
│   ├── Auth.css                 # Auth pages styling
│   └── Dashboard.css            # Dashboard styling
├── components/
│   ├── Navbar.jsx               # Navigation component
│   ├── ProtectedRoute.jsx       # Protected route wrapper
│   └── Navbar.css               # Navbar styling
├── context/
│   └── AuthContext.jsx          # Authentication context & hooks
├── App.jsx                      # Main app with routing
├── main.jsx                     # Entry point
├── App.css                      # Global styles
└── index.css                    # Global resets
```

## Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## Configuration

### API Base URL

The API base URL is configured in `src/api/axios.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend URL
});
```

Update `http://localhost:5000` to match your backend server address.

## API Integration

### JWT Token Handling

Tokens are automatically added to request headers via an Axios interceptor:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Endpoints Used

The frontend expects these API endpoints from the backend:

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/auth/register` | `{ username, email, password }` | `{ message, ... }` |
| POST | `/api/auth/login` | `{ email, password }` | `{ token }` |
| GET | `/api/users/me` | - | `{ username, email, role, ... }` |

## Authentication Context

Use the `useAuth()` hook to access authentication state and methods:

```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, token, isAuthenticated, login, logout, setUserData } = useAuth();
  
  // Use these methods and values in your component
}
```

### Context API

**Properties:**
- `user` - Current user object (null if not logged in)
- `token` - JWT token (null if not logged in)
- `isAuthenticated` - Boolean indicating if user is logged in
- `loading` - Loading state

**Methods:**
- `login(token)` - Save token and update auth state
- `logout()` - Clear token and user data
- `setUserData(userData)` - Update user profile
- `setLoading(bool)` - Update loading state

## Usage Example

### Protected Component

```javascript
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Protect a route
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

// Access auth in component
function Dashboard() {
  const { user, logout } = useAuth();
  
  return (
    <>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}
```

## Styling

The project uses **plain CSS** with a gradient color scheme:
- Primary gradient: `#667eea` to `#764ba2` (purple)
- Clean, minimal design
- Responsive layout for mobile and desktop

All styles are in individual CSS files per component for easy customization.

## Error Handling

The frontend handles errors gracefully:
- **Network errors** - Display user-friendly error messages
- **401 Unauthorized** - Automatically logout and redirect to login
- **Validation errors** - Show error messages on forms
- **Loading states** - Disable inputs during API calls

## Environment Setup

No environment variables are required for basic setup. The backend URL is hardcoded in `src/api/axios.js`.

To use environment variables, update the axios config:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});
```

Then create `.env`:
```
VITE_API_URL=http://localhost:5000
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Hot Module Replacement

The dev server supports HMR (Hot Module Replacement), so your changes will update instantly in the browser without full page reloads.

## Troubleshooting

### CORS Errors
If you see CORS errors when calling the backend, make sure your backend has CORS enabled:

```javascript
// In your backend (Express)
const cors = require('cors');
app.use(cors());
```

### Token Not Being Sent
Check that:
1. Token is stored in localStorage after login
2. Check browser DevTools → Application → localStorage for `token`
3. Verify API URL in `src/api/axios.js` is correct

### Protected Route Not Working
Ensure:
1. You're logged in (check localStorage)
2. `ProtectedRoute` wraps your component
3. `AuthProvider` wraps your app in `App.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

⚠️ **Production Considerations:**
1. **Never** commit tokens to version control
2. Use HTTPS in production
3. Implement token refresh mechanism
4. Consider using httpOnly cookies instead of localStorage
5. Implement CSRF protection for state-changing operations
6. Add rate limiting on the backend

## Contributing

Feel free to extend this frontend with additional features:
- User profile editing
- Password reset
- Role-based access control
- Additional pages and components

## License

ISC

---

**Ready to use!** Just make sure your backend is running at `http://localhost:5000` and the CORS is enabled.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
