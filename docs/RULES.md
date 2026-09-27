# Development Rules

## General
- Use TypeScript on both frontend and backend.
- Reuse existing components/services; do not duplicate logic.
- Keep functions small and single-purpose.
- Do not modify unrelated files when working a task.
- Apply TypeScript interfaces/types for all component props and state, and
  for backend request/response shapes.

## Before Coding
- Read PRD.md, ARCHITECTURE.md, and DESIGN.md before starting a new feature.
- Check MEMORY.md for current project status before picking up work.
- Inspect existing implementation before adding new code.
- Make a short plan before any change that touches more than one file.

## Authentication (project-specific)
- Implement JWT-based authentication with a short-lived access token.
- Implement a refresh-token mechanism so sessions persist without forcing
  re-login.
- Hash passwords before storing them — never store or log plaintext
  passwords.
- Every task endpoint must verify the JWT and operate only on the
  authenticated user's own tasks.

## Backend
- Validate all incoming request bodies/parameters before processing.
- Return consistent, meaningful error responses (status code + message) for
  validation failures, auth failures, and not-found resources.
- Use environment variables for configuration (DB connection, JWT secrets,
  ports) — never hard-code secrets.
- Use transactions for multi-step database operations where correctness
  depends on atomicity.
- Consider indexing frequently-queried columns (e.g. `tasks.user_id`) for
  performance (optional per the brief).

## Frontend
- Use React Hooks effectively (avoid unnecessary re-renders, keep state
  minimal and colocated).
- Keep API calls in a `services/` layer, not inline in components.
- Maintain responsive design (mobile and desktop; tablet not required).
- Include loading, error, and empty states for every data-driven view.

## Testing (optional but weighted in evaluation)
- Add unit tests for authentication logic and task CRUD endpoints if time
  allows.
- Run tests after implementation; fix failing tests before continuing.

## Git
- Make small, incremental commits.
- Use descriptive commit messages.

## Data Integrity
- A user must never be able to view, edit, or delete another user's tasks.
- Task status/completion changes must be persisted correctly and reflected
  immediately in the dashboard.
