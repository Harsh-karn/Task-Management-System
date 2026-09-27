# Architecture

## Frontend
React + TypeScript.

## Backend
Node.js + TypeScript + Express.

## Database
A relational database — PostgreSQL or MySQL (brief allows either; PostgreSQL
is chosen here). Accessed via a database client/ORM such as Sequelize or
TypeORM (brief allows either; TypeORM is chosen here for first-class
TypeScript support).

## Authentication
JWT-based authentication:
- Access token: short-lived, sent with each authenticated request.
- Refresh token: longer-lived, used to obtain a new access token so the
  user's session persists without re-logging in.

## Communication
Frontend calls the backend via Axios (brief allows Axios or Fetch API; Axios
is chosen here).

## High-Level Flow

```
User
  ↓
React UI (TypeScript)
  ↓ Axios (HTTP)
Express API (TypeScript)
  ↓ TypeORM
PostgreSQL
```

## Folder Structure

```
frontend/
├── src/
│   ├── app/            # routes/pages (login, register, dashboard)
│   ├── components/     # reusable UI (task list, task form, task item)
│   ├── features/       # auth, tasks — feature-scoped hooks/logic
│   ├── services/       # Axios API client calls
│   ├── lib/            # shared helpers
│   ├── types/           # shared TypeScript interfaces/types
│   └── utils/

backend/
├── src/
│   ├── routes/          # /auth, /tasks
│   ├── controllers/     # request handling per route
│   ├── services/        # business logic, DB access via TypeORM
│   ├── entities/         # TypeORM entities (User, Task)
│   ├── middleware/      # JWT auth check, validation, error handling
│   ├── types/
│   └── utils/
```

## Database Schema (high level)

**users**
- id (PK)
- email (unique)
- password_hash
- created_at

**tasks**
- id (PK)
- user_id (FK → users.id)
- title
- description
- status
- due_date
- created_at
- updated_at

Relationship: one user has many tasks; a task belongs to exactly one user.
Deleting a user's tasks (or cascading behavior) and any additional
constraints are an implementation decision to be made in Phase 2 (see
TASKS.md), since the brief does not specify cascade behavior.

**refresh_tokens** (or a token field/table, implementation detail)
- Needed to support the refresh-token mechanism; exact storage approach
  (DB table vs. hashed token column on `users`) is a Phase 2 decision.

## Architectural Rules
- UI components should not contain API-calling or database logic directly —
  use `services/` on the frontend and `services/` on the backend.
- Every task endpoint must verify the JWT and scope the operation to the
  authenticated user's own tasks — a user must never be able to read/edit/
  delete another user's task.
- Password hashing (never store plaintext passwords) is required.
- Request validation and error handling belong in backend middleware, not
  duplicated per-controller.
- Reusable UI should be placed in `components/`.
- Business logic should remain separate from UI and from raw route
  handlers.
- Secrets (JWT signing keys, DB credentials) are read from environment
  variables, never hard-coded.
