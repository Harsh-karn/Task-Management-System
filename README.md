# Task Management System

A full-stack, aesthetically-driven Task Management application featuring a custom brutalist design inspired by Aramb.ai. It includes secure JWT authentication, robust CRUD operations, advanced task filtering, and responsive UI.

## 🚀 Tech Stack

### Frontend
- **React 18** with **TypeScript**
- **Vite** for blazing fast builds
- **Axios** for API communication (with automatic 401 interceptors for refresh tokens)
- Custom CSS (No external libraries, entirely raw structural styling)
- **Vitest & React Testing Library** for unit testing

### Backend
- **Node.js** & **Express** with **TypeScript**
- **TypeORM** for database interaction
- **PostgreSQL** as the relational database
- **express-validator** for request payload validation
- **jsonwebtoken** & **bcrypt** for secure authentication
- **Jest & ts-jest** for backend unit testing

---

## 🎨 Features
- **JWT Authentication:** Secure user registration and login with an implementation of Access Tokens (15 min) and Refresh Tokens (7 days).
- **Task Management:** Create, read, update, and delete tasks dynamically.
- **Advanced Filtering & Pagination:** Filter tasks by status, due date, category, or search by title. Pagination is handled securely on the backend via SQL `limit` and `offset`.
- **Database Optimization:** Active B-Tree indexes on `status` and `user_id` to guarantee extremely fast queries at scale.
- **Brutalist UI:** A high-end editorial interface utilizing custom typography (Playfair Display, JetBrains Mono, Inter) and structural CSS grids.

---

## 🛠️ Local Setup

### 1. Database Setup
Ensure you have PostgreSQL installed and running locally, or use a remote URL. 

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory:
```env
PORT=5001
JWT_ACCESS_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_super_refresh_key
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=task_management
# Or alternatively, just provide a DATABASE_URL
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `/frontend` directory (optional for local dev):
```env
VITE_API_URL=http://localhost:5001/api
```

Run the frontend:
```bash
npm run dev
```

---

## 🧪 Testing

This project features robust unit tests for both environments.

**Backend (Jest):**
```bash
cd backend
npm run test
```

**Frontend (Vitest):**
```bash
cd frontend
npm run test
```

---

## 🌐 Deployment
- **Database & API:** Hosted dynamically on [Render](https://render.com/).
- **Frontend Client:** Deployed globally on [Vercel](https://vercel.com/). 
*(Check the respective dashboards for live URLs)*
