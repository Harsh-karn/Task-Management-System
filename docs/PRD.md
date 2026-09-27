# Product Requirements Document

## Product
Task Management System

## Problem
Users need a simple, authenticated place to create, track, and manage their
personal tasks — with a title, description, status, and due date — instead
of relying on scattered notes or memory.

## Target Users
Individual users who register an account and manage their own tasks (single
personal task list per user; no team/sharing features specified).

## Goal
Build a full-stack Task Management System where a user can register, log
in, and perform full CRUD on their own tasks, each with a title,
description, status, and due date.

## Core Features
1. Authentication — register, log in, JWT-based sessions with a refresh
   token mechanism for persistence.
2. Task Dashboard — list of the logged-in user's tasks.
3. Task Management — add, edit, delete a task; mark a task as completed.
4. Responsive Design — works on mobile and desktop (tablet not required).

## MVP
- Registration page.
- Login page.
- JWT-based login session with refresh-token renewal.
- Task dashboard listing the user's tasks.
- Create a task (title, description, status, due date).
- Edit a task.
- Delete a task.
- Mark a task as completed.
- Responsive layout on mobile and desktop.

## Out of Scope
- Tablet-specific layout (explicitly not required).
- Multi-user task sharing/collaboration (not mentioned in the brief).
- Deployment (marked optional).
- Automated tests (optional, though noted as carrying evaluation weight).

## Success Criteria
A user should be able to:
1. Register a new account.
2. Log in and remain logged in via refresh-token renewal without
   re-entering credentials every session.
3. View a dashboard listing their tasks.
4. Create a task with a title, description, status, and due date.
5. Edit an existing task.
6. Delete a task.
7. Mark a task as completed.
8. Use the app comfortably on both mobile and desktop screens.

## Deliverables (per assignment brief)
- Source code for both frontend and backend.
- A README file with setup instructions.
- Deployed application URL (optional).

## Evaluation Emphasis (from the brief)
- Correct CRUD behavior for tasks, scoped to the authenticated user.
- Working JWT authentication with refresh-token-based persistent sessions.
- TypeScript used for type safety on both frontend and backend.
- Request validation and error handling on the backend.
- A sensible relational schema (users/tasks) with relationships and
  constraints.
- Responsive UI (mobile + desktop).
- Advanced/optional items (transactions, query optimization, indexing,
  tests, deployment) as bonus weight, not core requirements.
