# Requirements Specification

This document lists the functional and non-functional requirements for `social-app` based on the current project scope and implementation.

## Functional Requirements

Functional requirements describe what the system must do.

1. The system shall allow a new user to register with an email, full name, phone number, password, and role.
2. The system shall prevent registration when an email is already in use.
3. The system shall allow a registered user to log in with email and password.
4. The system shall reject invalid login credentials.
5. The system shall allow a student user to create or update a student profile.
6. The system shall allow a business user to create or update a business profile.
7. The system shall store student profile data including major, classification, and bio.
8. The system shall store business profile data including project name, industry, and needs.
9. The system shall route users without a completed profile to the correct profile setup page after login.
10. The system shall show a discover feed of opposite-role users.
11. The system shall allow a user to swipe right to like another profile.
12. The system shall allow a user to swipe left to pass on another profile.
13. The system shall prevent the same swipe from being recorded more than once for the same pair of users.
14. The system shall create a match when two users both like each other.
15. The system shall allow a user to view a list of their matches.
16. The system shall allow a matched user to open a conversation with another matched user.
17. The system shall allow a matched user to send messages in a conversation.
18. The system shall allow a user to retrieve message history for a match.
19. The system shall allow a user to log out by clearing the saved session data in the browser.
20. The backend shall return JSON responses for all supported API endpoints.

## Non-Functional Requirements

Non-functional requirements describe how the system should perform or what constraints it must satisfy.

1. The system shall use password hashing before storing user passwords.
2. The system shall store application data in SQLite.
3. The backend shall expose JSON-based HTTP endpoints using Express.
4. The frontend shall run as a React application built with Vite.
5. The system shall support separate frontend and backend local development environments.
6. The backend shall validate required input fields for registration, login, swipes, messages, and profile creation.
7. The backend shall return appropriate HTTP status codes for success, validation failures, authentication failures, and duplicate registrations.
8. The system shall persist user, profile, swipe, match, and message data between sessions.
9. The application shall maintain a consistent role-based flow between student and business users.
10. The application shall be usable in a modern desktop web browser.
11. The system shall support cross-origin requests between the local frontend and backend during development.
12. The codebase shall remain organized into separate frontend and backend folders.
13. The application should provide basic error handling when the backend cannot be reached.
14. The system should load discover profiles, matches, and messages within a reasonable time for a classroom-scale project.
15. The messaging page should refresh conversation data periodically while a conversation is open.

## Summary

- Functional requirements explain what features the app must provide.
- Non-functional requirements explain the technical constraints and quality expectations for the app.
