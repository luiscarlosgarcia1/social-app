# social-app

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

The backend already returns stable JSON response codes that the frontend can use for branching. The next frontend step is to stop only logging the result in the browser console and start showing UI feedback or navigating based on the returned code.

Current backend response contract:

- Register success: `201` with `{ ok: true, user }`
- Register validation failure: `400` with `{ ok: false, code: 'VALIDATION_ERROR' }`
- Register duplicate email: `409` with `{ ok: false, code: 'EMAIL_TAKEN' }`
- Login success: `200` with `{ ok: true, user }`
- Login validation failure: `400` with `{ ok: false, code: 'VALIDATION_ERROR' }`
- Login invalid credentials: `401` with `{ ok: false, code: 'INVALID_CREDENTIALS' }`

Basic branching pattern:

```js
const response = await fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})

const data = await response.json()

if (response.ok && data.ok) {
  // success path
  // example: navigate to the next page or store the returned user
} else if (data.code === 'INVALID_CREDENTIALS') {
  // show login error
} else if (data.code === 'VALIDATION_ERROR') {
  // prompt the user to complete required fields
} else if (data.code === 'EMAIL_TAKEN') {
  // show signup duplicate-email message
} else {
  // fallback for unexpected errors
}
```

Suggested frontend branches:

- `EMAIL_TAKEN` -> show a signup message like "That email is already in use."
- `INVALID_CREDENTIALS` -> show a login message like "Invalid email or password."
- `VALIDATION_ERROR` -> show a message asking the user to complete all required fields
- `ok: true` -> navigate, update local state, or render success feedback with the returned `user`

Current status note:

- The frontend still logs the backend response in the browser console from `Loginauth.jsx` and `SignUpAuth.jsx`
- Implementing on-screen error handling and success branching is the next logical frontend task

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
