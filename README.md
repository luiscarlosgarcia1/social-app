# social-app

## Requirements

- Node.js 18+ (recommended)
- npm (comes with Node.js)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew --version
brew install node
node -v
npm -v
```

## Run Locally

1. Clone the repository and move into it.
2. Install dependencies.
3. Start the Vite development server.
4. While the server is running, press `h` then `Enter` to see Vite options (open browser, show URL, restart, quit, etc.).

```bash
git clone <repo-url>
cd social-app/app
npm install
npm run dev
```

## Project Description
This project is a Tinder-style matching app for University of Texas Rio Grande Valley students.

Users can swipe left to dislike or right to heart profiles. The platform is designed to connect:

- **Inventors**: students who have project or app ideas
- **Builders**: software engineering/computer science students who want to implement ideas

If both users heart each other, it becomes a match and direct messages (DMs) open so they can discuss the project in more depth.

During account creation, users can set filters and profile details, including:

- Role type (Inventor or Builder)
- Experience details (known programming languages)
- Degree level
- School year / education level (for example: Bachelor’s, Master’s, PhD)

The app uses these filters to recommend Inventors to Builders and Builders to Inventors.

## Agile Planning (10 Weeks)

- Sprint 1 (Week 1): Define MVP scope, roles, and backlog.
- Sprint 2 (Week 2): Set up project structure and core UI layout.
- Sprint 3 (Week 3): Build sign up/login flow.
- Sprint 4 (Week 4): Build Inventor/Builder profile creation.
- Sprint 5 (Week 5): Add swipe interactions (dislike/heart).
- Sprint 6 (Week 6): Implement filter-based recommendations.
- Sprint 7 (Week 7): Add mutual match logic and match list.
- Sprint 8 (Week 8): Open DMs for matched users.
- Sprint 9 (Week 9): Improve UX and fix core bugs.
- Sprint 10 (Week 10): Final testing, docs, and release prep.
