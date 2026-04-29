# Admin Dashboard - Full-Stack Authentication System

A modern, secure, and production-ready admin dashboard with a comprehensive authentication system. Built with React, Express.js, MongoDB, and featuring JWT-based authentication, password recovery, and email verification.

## 🎯 Problems Solved

### **Security & Access Control**
- **Unauthorized Access Prevention**: Protects sensitive dashboard resources with JWT-based authentication and protected routes
- **Password Security**: Implements bcryptjs hashing to securely store user passwords, preventing plain-text exposure
- **Token Validation**: Middleware-based token verification ensures only authenticated users can access protected endpoints

### **User Account Management**
- **Account Recovery**: Password reset functionality through email links prevents permanent account lockouts
- **User Registration**: Streamlined signup process with validation and duplicate email prevention
- **Session Management**: Secure logout mechanism that clears authentication tokens

### **Developer Experience**
- **Separation of Concerns**: Decoupled frontend and backend architecture for scalability and maintainability
- **State Management**: Centralized auth state using Zustand for predictable state updates
- **API Integration**: Axios with credential support for seamless client-server communication

---

## ✨ Features

- ✅ **User Authentication** - Secure signup, login, and logout with JWT tokens
- ✅ **Protected Routes** - Frontend route protection with automatic redirects
- ✅ **Forgot Password** - Secure password recovery via email tokens
- ✅ **Reset Password** - Token-based password reset with expiration validation
- ✅ **Session Persistence** - Automatic session verification on app load
- ✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- ✅ **Smooth Animations** - Interactive UI elements with Framer Motion
- ✅ **Error Handling** - Comprehensive error messages and validation
- ✅ **CORS Enabled** - Secure cross-origin communication
- ✅ **Password Strength Meter** - Real-time password validation feedback

---

## 🏗️ Tech Stack

### **Frontend**
- **React 18.3** - UI library
- **Vite 5.3** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Zustand 4.5** - Lightweight state management
- **Axios 1.7** - HTTP client with credential support
- **Framer Motion 11.3** - Animation library
- **React Router DOM 6.26** - Client-side routing
- **React Hot Toast 2.4** - Toast notifications
- **Lucide React 0.424** - Icon library

### **Backend**
- **Express.js 5.2** - Web framework
- **Node.js** - Runtime environment
- **MongoDB** - NoSQL database
- **Mongoose 9.2** - MongoDB ODM
- **JWT 9.0** - Token-based authentication
- **bcryptjs 3.0** - Password hashing
- **Mailtrap 4.4** - Email delivery service
- **Dotenv 17.3** - Environment variable management
- **CORS 2.8** - Cross-origin resource sharing
- **Cookie Parser 1.4** - Cookie parsing middleware

---

## 📁 Project Structure

```
Admin-dashboard/
├── backend/
│   ├── controllers/
│   │   └── auth.controller.js       # Authentication logic
│   ├── routes/
│   │   └── auth.route.js            # API endpoints
│   ├── middlewares/
│   │   └── verifyToken.js           # JWT verification
│   ├── models/
│   │   └── user.model.js            # MongoDB user schema
│   ├── db/
│   │   └── connectDB.js             # Database connection
│   ├── utils/
│   │   └── generateTokenAndSetCookie.js  # Token utilities
│   └── index.js                     # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SignUpPage.jsx       # User registration
│   │   │   ├── LoginPage.jsx        # User login
│   │   │   ├── DashboardPage.jsx    # Protected dashboard
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   └── ResetPasswordPage.jsx
│   │   ├── components/
│   │   │   ├── Input.jsx            # Reusable input component
│   │   │   ├── PasswordStrengthMeter.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── FloatingShape.jsx    # Animated background
│   │   ├── store/
│   │   │   └── authStore.js         # Zustand auth state
│   │   ├── utils/
│   │   │   └── date.js              # Date utilities
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** v16+ and npm
- **MongoDB** local instance or MongoDB Atlas connection
- **Mailtrap Account** (for email functionality)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   # Backend Configuration
   PORT=8800
   NODE_ENV=development
   
   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/admin-dashboard
   # or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/admin-dashboard
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   
   # Email Service (Mailtrap)
   MAILTRAP_TOKEN=your_mailtrap_token
   MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/
   ```

### **Running the Application**

#### **Development Mode**
```bash
# Run both backend and frontend concurrently
npm run dev

# The application will be available at:
# Frontend: http://localhost:5173
# Backend: http://localhost:8800
```

#### **Production Build**
```bash
# Build frontend
cd frontend && npm run build && cd ..

# Start backend in production
NODE_ENV=production npm start
```

---

## 📚 API Endpoints

### **Authentication Routes** (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| POST | `/signup` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| POST | `/logout` | User logout | ✅ |
| POST | `/forgot-password` | Request password reset | ❌ |
| POST | `/reset-password/:token` | Reset password with token | ❌ |
| GET | `/check-auth` | Verify authentication status | ✅ |

### **Request/Response Examples**

**Sign Up**
```bash
curl -X POST http://localhost:8800/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Login**
```bash
curl -X POST http://localhost:8800/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

---

## 🔐 Authentication Flow

### **User Registration & Login**
1. User enters credentials in signup/login form
2. Frontend validates input locally
3. Request sent to backend with encrypted password
4. Backend verifies credentials and hashes password
5. JWT token generated and set as HTTP-only cookie
6. User redirected to dashboard on success

### **Protected Routes**
1. App checks authentication status on load
2. `verifyToken` middleware validates JWT
3. Unauthenticated users redirected to login
4. Authenticated users can access dashboard

### **Password Recovery**
1. User enters email in forgot password form
2. Backend generates unique reset token with expiration (1 hour)
3. Reset link sent via email (currently returns token for testing)
4. User clicks link and enters new password
5. Password updated and reset token cleared

---

## 🛠️ Development

### **Available Scripts**

**Root Directory**
```bash
npm run dev          # Start backend with nodemon
```

**Frontend Directory**
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### **Code Quality**

The project includes:
- **ESLint** - Code linting for React and JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Nodemon** - Auto-restart backend on file changes

---

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds (10)
- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Prevents XSS attacks
- **CORS Configuration**: Restricted to frontend origin
- **Token Expiration**: JWT tokens expire after set duration
- **Reset Token TTL**: Password reset tokens expire after 1 hour
- **Input Validation**: Server-side validation on all endpoints

---

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | 8800 |
| `NODE_ENV` | Environment mode | development/production |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/admin-dashboard |
| `JWT_SECRET` | Secret key for JWT signing | your_secret_key |
| `JWT_EXPIRE` | Token expiration time | 7d |
| `MAILTRAP_TOKEN` | Mailtrap API token | token_here |
| `MAILTRAP_ENDPOINT` | Mailtrap API endpoint | https://send.api.mailtrap.io/ |

---

## 🐛 Troubleshooting

### **MongoDB Connection Issues**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running locally: `mongod`
- Or update `MONGO_URI` to use MongoDB Atlas

### **CORS Errors**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
- Verify frontend URL matches `CORS origin` in backend
- Default: `http://localhost:5173`

### **JWT Token Errors**
```
Unauthorized - no token provided
```
- Clear browser cookies and login again
- Check JWT_SECRET is set correctly in `.env`

### **Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::8800
```
- Change `PORT` in `.env` or kill process using the port

---

## 🚢 Deployment

### **Heroku Deployment**

1. Create Heroku app: `heroku create app-name`
2. Set environment variables: `heroku config:set KEY=value`
3. Deploy: `git push heroku main`

### **Environment Checklist**
- ✅ Set `NODE_ENV=production`
- ✅ Configure MongoDB Atlas connection
- ✅ Set strong `JWT_SECRET`
- ✅ Configure Mailtrap credentials
- ✅ Set correct `CORS origin` for production domain

---

## 📄 License

This project is licensed under the ISC License - see LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a pull request

---

## 📧 Support

For issues, questions, or feature requests, please open an issue on the GitHub repository.

---

## 🙏 Acknowledgments

- **React** - UI library
- **Express.js** - Web framework
- **MongoDB** - Database
- **Tailwind CSS** - CSS framework
- **Zustand** - State management
- **Framer Motion** - Animation library

---

**Last Updated**: April 2026

