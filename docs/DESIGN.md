# Design System

## Style
Clean, functional, task-list-first — the priority is a fast, clear
authentication flow and an easy-to-scan task dashboard, not decoration.

## Layout
- **Login page**: email/username + password fields, submit button, link to
  register.
- **Registration page**: fields required to create an account, submit
  button, link to login.
- **Task dashboard**: list of the user's tasks, each showing title, status,
  due date, and quick actions (edit, delete, mark complete); an "Add task"
  action.
- **Task form** (add/edit): title, description, status, due date fields.

## Typography
A single, readable sans-serif font, applied consistently across all pages.

## Colors
Not fixed by the assignment brief — choose one consistent palette and apply
it uniformly across pages, with a clearly distinct treatment for:
- Completed tasks (visually distinct from active tasks, e.g. muted/
  strikethrough).
- Overdue tasks (due date in the past and not completed) — visually flagged
  if this distinction is added.

## Components
- **Buttons**: primary (save/add task, log in, register), secondary
  (cancel), destructive (delete task).
- **Task item/card**: title, status, due date, and edit/delete/complete
  actions, in a consistent layout across the dashboard.
- **Forms**: consistent field styling and validation-error display across
  login, registration, and task forms.

## UX Requirements
- Responsive on mobile and desktop (tablet not required).
- Loading states while authenticating or loading/saving tasks.
- Empty state when the user has no tasks yet.
- Error states (invalid login, registration errors, failed task
  create/update/delete, expired session).
- Accessible forms (labeled inputs, keyboard-operable controls).
- Clear visual feedback when a task is marked completed.
