# Tasks

## Phase 1: Setup
- [ ] Initialize backend: Node.js project with TypeScript, Express.
- [ ] Initialize frontend: React project with TypeScript.
- [ ] Set up the relational database (PostgreSQL or MySQL) and connect via
      TypeORM/Sequelize.
- [ ] Configure environment variables (DB connection, JWT secrets, ports)
      for local development.
- [ ] Configure Git repository.

## Phase 2: Design Database Schema
- [ ] Create `users` table (id, email, password_hash, created_at, ...).
- [ ] Create `tasks` table (id, user_id FK, title, description, status,
      due_date, created_at, updated_at).
- [ ] Decide and implement refresh-token storage approach (dedicated table
      vs. column on `users`).
- [ ] Define relationships and constraints (FK from tasks → users, not-null
      constraints, etc.).
- [ ] Add indexes where useful (e.g. `tasks.user_id`) — optional.

## Phase 3: Backend — Authentication
- [ ] Set up Express server with TypeScript.
- [ ] Implement registration endpoint (hash password, create user).
- [ ] Implement login endpoint (verify password, issue access + refresh
      tokens).
- [ ] Implement refresh-token endpoint (issue new access token from a valid
      refresh token).
- [ ] Implement auth middleware to protect task endpoints.

## Phase 4: Backend — Task CRUD
- [ ] Create task endpoint (scoped to authenticated user).
- [ ] Read/list tasks endpoint (only the authenticated user's tasks).
- [ ] Update task endpoint (edit fields; mark completed).
- [ ] Delete task endpoint.
- [ ] Add request validation and consistent error handling across all
      endpoints.

## Phase 5: Frontend — Authentication
- [ ] Build login page and form.
- [ ] Build registration page and form.
- [ ] Store/manage access + refresh tokens on the client (persist session
      across reloads).
- [ ] Handle token refresh transparently (e.g. on 401, attempt refresh then
      retry).

## Phase 6: Frontend — Task Management
- [ ] Build task dashboard (list of tasks).
- [ ] Build add-task form/component.
- [ ] Build edit-task form/component.
- [ ] Build delete-task action (with confirmation).
- [ ] Build mark-as-completed action.
- [ ] Connect all of the above to the backend via Axios.

## Phase 7: Advanced Features
- [ ] Add request validation and error handling in the backend (if not
      already complete from Phase 4).
- [ ] Implement responsive design for mobile and desktop.
- [ ] Apply TypeScript interfaces/types consistently across frontend props/
      state and backend request/response shapes.
- [ ] Optimize queries and add indexing where useful (optional).
- [ ] Use database transactions where a task/user operation needs atomicity.

## Phase 8: Testing & Deployment (optional)
- [ ] Write unit tests for backend auth and task endpoints (optional, but
      weighted in evaluation).
- [ ] Write frontend unit tests for key components/hooks (optional).
- [ ] Deploy backend and frontend (e.g. Heroku, Vercel, or Netlify) —
      optional.

## Phase 9: Deliverables
- [ ] Finalize source code for frontend and backend.
- [ ] Write README.md with setup instructions.
- [ ] (Optional) Include deployed application URL.
