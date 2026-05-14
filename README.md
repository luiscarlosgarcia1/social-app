# social-app
next step for senior project 
* ai for the matching algo
* ai as a chat box that can help with intervies 

## Collaboration

Credits:

- Luis Garcia - backend
- Emiliano Prado - frontend and backend
- Josue Torres - frontend

## Project Overview

`social-app` is a Tinder-style matching app for University of Texas Rio Grande Valley students.

Users can swipe left to dislike or right to heart profiles. The platform is designed to connect:

- **Inventors**: students who have project or app ideas
- **Builders**: software engineering/computer science students who want to implement ideas

If both users heart each other, it becomes a match and direct messages can open so they can discuss the project in more depth.

During account creation, users can set filters and profile details such as role type, experience, degree level, and school year so the app can recommend relevant matches.

The current working scope is a React/Vite frontend with login and signup pages, plus an Express + SQLite backend that handles auth through JSON APIs.

## Getting Started

Prerequisites:

- Node.js 18+
- npm

Installation:

```bash
git clone <repo-url>
cd social-app

cd app
npm install

cd ../server
npm install
```

Configuration:

- No `.env` file is currently required
- The backend creates its SQLite database automatically at `server/.local/auth.db`

Troubleshooting:

- The frontend uses the default Vite development server
- The backend listens on port `3000`
- If signup or login appears to do nothing, open the browser developer console first. The current frontend handlers still log backend responses there rather than showing UI messages on screen

## Running the Project

Usage:

Frontend:

```bash
cd app
npm run dev
```

Backend:

```bash
cd server
npm start
```

After the backend starts, visit `http://localhost:3000` to confirm the smoke response:

```json
{"message":"Server running"}
```

Available scripts:

App (`app/package.json`):

- `npm run dev` - start the Vite development server
- `npm run build` - build the frontend for production
- `npm run lint` - run ESLint on the frontend
- `npm run preview` - preview the built frontend locally

Server (`server/package.json`):

- `npm start` - start the Express auth backend

## Project Structure

Top-level folders:

- `app/` - React frontend
- `server/` - Express + SQLite auth backend
- `docs/` - planning and implementation notes

Helpful frontend files:

- `app/src/pages/Login.jsx` - login page UI
- `app/src/pages/SignUp.jsx` - signup page UI
- `app/src/pages/Loginauth.jsx` - login request handler
- `app/src/pages/SignUpAuth.jsx` - signup request handler

Helpful backend files:

- `server/server.js` - backend entrypoint
- `server/app.js` - Express app and route wiring
- `server/auth-service.js` - shared auth use cases
- `server/db.js` - SQLite bootstrap and DB path handling

## Next Steps

### Already implemented

- User registration (email, password, phone number, full name, role)
- User login with role-based redirect
- Password hashing
- SQLite user table with schema
- Business profile creation (frontend form + backend persistence)
- Student profile creation (frontend form + backend persistence)

### Builder profile fields to implement

- Bio
- Links
- Images
- Experience
- Skills
- Degree
- School year (education level)

### Inventor profile fields to implement

- Bio
- Project/idea concept
- What kind of builders they're looking for (frontend, backend, ML, etc.)
- Their background (business student, designer, etc.)
- Timeline / how serious they are
- Links (pitch deck, Figma, etc.)

### Backend response contract (reference)

- Register success: `201` with `{ ok: true, user }`
- Register validation failure: `400` with `{ ok: false, code: 'VALIDATION_ERROR' }`
- Register duplicate email: `409` with `{ ok: false, code: 'EMAIL_TAKEN' }`
- Login success: `200` with `{ ok: true, user }`
- Login validation failure: `400` with `{ ok: false, code: 'VALIDATION_ERROR' }`
- Login invalid credentials: `401` with `{ ok: false, code: 'INVALID_CREDENTIALS' }`

## Sprint Plan

- Sprint 1: Define MVP scope, roles, and backlog
- Sprint 2: Set up project structure and core UI layout
- Sprint 3: Build sign up/login flow
- Sprint 4: Build inventor/builder profile creation
- Sprint 5: Add swipe interactions
- Sprint 6: Implement filter-based recommendations
- Sprint 7: Add mutual match logic and match list
- Sprint 8: Open DMs for matched users
- Sprint 9: Improve UX and fix core bugs
- Sprint 10: Final testing, docs, and release prep

## User Stories

1. As a user, I want to see a home feed of profiles matched to my role so that I can browse potential collaborators.
2. As an inventor, I want to specify what kind of builders I need (frontend, backend, ML, etc.) so that my profile attracts the most relevant collaborators.
3. As a registered user, I want to log in with my email and password so that I can access my profile and matches.
4. As a user, I want to swipe right on a profile I'm interested in so that I can express that I want to connect.
5. As a builder, I want to create a profile with my bio, skills, degree, and school year so that inventors can evaluate whether I'm a good fit for their project.
6. As a user, I want to be notified when another user and I have both swiped right so that I know we have a mutual match.
7. As a student, I want to register with my email, name, phone number, and password so that I can create an account on the platform.
8. As a user, I want to swipe left on a profile I'm not interested in so that I can move on to the next one.
9. As an inventor, I want to create a profile with my project idea, the type of builders I need, and my background so that relevant students can find and consider working with me.
10. As a matched user, I want to send direct messages to my match so that we can discuss the project in more detail.

