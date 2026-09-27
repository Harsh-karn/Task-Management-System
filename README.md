# Task Management System

A full-stack Task Management System built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Features
- **JWT Authentication**: Register, login, and robust refresh token mechanism for persistent sessions.
- **Task Management**: Create, read, update, and delete tasks seamlessly.
- **Modern UI**: Fully responsive, glassmorphism-inspired design with premium aesthetics.
- **Type Safety**: End-to-end TypeScript implementation.
- **Database**: PostgreSQL with TypeORM.

## Requirements
- Node.js (v16+)
- PostgreSQL (running locally or remote)
- npm or yarn

## Setup Instructions

### 1. Database Setup
Ensure PostgreSQL is running. Create a new database named `task_management` (or any name you prefer).

### 2. Backend Setup
Navigate to the backend directory and configure the environment:
```bash
cd backend
npm install
```

Create or update the `.env` file in the `backend` directory with your PostgreSQL credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_DATABASE=task_management
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Start the backend development server:
```bash
npm run dev
```
TypeORM will automatically synchronize the database schema on start.

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

### 4. Access the App
Open your browser and navigate to `http://localhost:5173`. You can now register an account and start managing your tasks!

## Project Structure
- `/backend`: Node.js, Express, TypeORM API.
- `/frontend`: React, Vite, Axios client application.
- `/docs`: Project planning and documentation (PRD, Architecture, Rules, etc).
