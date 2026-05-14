# UML Diagrams

This file combines the use case, class, and sequence UML artifacts for the current `social-app` implementation. The diagrams use Mermaid, so they render only in Markdown viewers that support Mermaid.

## Use Case Diagram

```mermaid
flowchart LR
    student([Student User])
    business([Business User])
    system((UTRGV Match))

    uc1([Register account])
    uc2([Log in])
    uc3([Create or update profile])
    uc4([Browse discover feed])
    uc5([Swipe like or pass])
    uc6([View mutual matches])
    uc7([Open conversation])
    uc8([Send message])
    uc9([Log out])

    student --> uc1
    student --> uc2
    student --> uc3
    student --> uc4
    student --> uc5
    student --> uc6
    student --> uc7
    student --> uc8
    student --> uc9

    business --> uc1
    business --> uc2
    business --> uc3
    business --> uc4
    business --> uc5
    business --> uc6
    business --> uc7
    business --> uc8
    business --> uc9

    uc1 --- system
    uc2 --- system
    uc3 --- system
    uc4 --- system
    uc5 --- system
    uc6 --- system
    uc7 --- system
    uc8 --- system
    uc9 --- system
```

## Class Diagram

This project is not class-based in the OO sense, so the most accurate Markdown-friendly version is a Mermaid `classDiagram` showing the main data entities and backend/frontend modules.

```mermaid
classDiagram
    class User {
      +id: integer
      +email: string
      +fullName: string
      +phone: string
      +role: string
      +password: string
      +createdAt: datetime
    }

    class StudentProfile {
      +id: integer
      +userId: integer
      +major: string
      +classification: string
      +bio: string
      +createdAt: datetime
    }

    class BusinessProfile {
      +id: integer
      +userId: integer
      +projectName: string
      +industry: string
      +needs: string
      +createdAt: datetime
    }

    class Swipe {
      +id: integer
      +swiperId: integer
      +swipedId: integer
      +direction: like|pass
      +createdAt: datetime
    }

    class Match {
      +id: integer
      +user1Id: integer
      +user2Id: integer
      +createdAt: datetime
    }

    class Message {
      +id: integer
      +matchId: integer
      +senderId: integer
      +content: string
      +createdAt: datetime
    }

    class AppRouter {
      +routes()
    }

    class LoginPage {
      +submitLogin()
    }

    class SignUpPage {
      +submitRegistration()
    }

    class StudentProfilePage {
      +submitStudentProfile()
    }

    class BusinessProfilePage {
      +submitBusinessProfile()
    }

    class HomePage {
      +fetchProfiles()
      +handleSwipe()
    }

    class MatchesPage {
      +fetchMatches()
      +handleMessage()
    }

    class MessagesPage {
      +fetchMatches()
      +fetchMessages()
      +handleSend()
    }

    class ExpressApp {
      +createApp()
    }

    class AuthService {
      +registerUser()
      +loginUser()
    }

    class UserRepository {
      +createUser()
      +findUserWithPasswordByEmail()
    }

    class ProfileRepository {
      +upsertStudentProfile()
      +upsertBusinessProfile()
      +getStudentProfile()
      +getBusinessProfile()
    }

    class MatchRepository {
      +getDiscoverProfiles()
      +recordSwipe()
      +getMatches()
      +getMessages()
      +sendMessage()
    }

    class Database {
      +initializeDatabase()
      +resolveDbPath()
    }

    User "1" --> "0..1" StudentProfile : has
    User "1" --> "0..1" BusinessProfile : has
    User "1" --> "0..*" Swipe : makes
    User "1" --> "0..*" Match : participates in
    User "1" --> "0..*" Message : sends
    Match "1" --> "0..*" Message : contains

    AppRouter --> LoginPage
    AppRouter --> SignUpPage
    AppRouter --> StudentProfilePage
    AppRouter --> BusinessProfilePage
    AppRouter --> HomePage
    AppRouter --> MatchesPage
    AppRouter --> MessagesPage

    LoginPage --> ExpressApp : POST /login
    SignUpPage --> ExpressApp : POST /register
    StudentProfilePage --> ExpressApp : POST /profile/student
    BusinessProfilePage --> ExpressApp : POST /profile/business
    HomePage --> ExpressApp : GET /discover, POST /swipe
    MatchesPage --> ExpressApp : GET /matches
    MessagesPage --> ExpressApp : GET /messages, POST /messages

    ExpressApp --> AuthService
    ExpressApp --> ProfileRepository
    ExpressApp --> MatchRepository
    ExpressApp --> Database
    AuthService --> UserRepository
    AuthService --> ProfileRepository
```

## Sequence Diagram

## Login And Profile Routing

```mermaid
sequenceDiagram
    actor User
    participant LoginPage as React Login Page
    participant API as Express API
    participant Auth as Auth Service
    participant UserRepo as User Repository
    participant ProfileRepo as Profile Repository
    participant DB as SQLite DB

    User->>LoginPage: Submit email + password
    LoginPage->>API: POST /login
    API->>Auth: loginUser(payload)
    Auth->>UserRepo: findUserWithPasswordByEmail(email)
    UserRepo->>DB: SELECT user + password
    DB-->>UserRepo: user row
    UserRepo-->>Auth: account
    Auth->>ProfileRepo: getStudentProfile() or getBusinessProfile()
    ProfileRepo->>DB: SELECT profile
    DB-->>ProfileRepo: profile row
    ProfileRepo-->>Auth: profile
    Auth-->>API: ok + merged user/profile
    API-->>LoginPage: 200 { ok, user }
    LoginPage->>LoginPage: Save user to localStorage
    alt Missing student profile
        LoginPage-->>User: Redirect to /StudentProfile
    else Missing business profile
        LoginPage-->>User: Redirect to /BusinessProfile
    else Profile already exists
        LoginPage-->>User: Redirect to /home
    end
```

## Swipe To Match

```mermaid
sequenceDiagram
    actor User
    participant HomePage as React Home Page
    participant API as Express API
    participant MatchRepo as Match Repository
    participant DB as SQLite DB

    User->>HomePage: Click Like or Pass
    HomePage->>API: POST /swipe
    API->>MatchRepo: recordSwipe(swiperId, swipedId, direction)
    MatchRepo->>DB: INSERT OR IGNORE into swipes
    alt direction = like
        MatchRepo->>DB: SELECT reverse like
        alt reverse like exists
            MatchRepo->>DB: INSERT OR IGNORE into matches
            MatchRepo-->>API: matched = true
        else no reverse like
            MatchRepo-->>API: matched = false
        end
    else direction = pass
        MatchRepo-->>API: matched = false
    end
    API-->>HomePage: { ok, matched }
    HomePage-->>User: Advance to next profile
```

## Send Message

```mermaid
sequenceDiagram
    actor User
    participant MessagesPage as React Messages Page
    participant API as Express API
    participant MatchRepo as Match Repository
    participant DB as SQLite DB

    User->>MessagesPage: Enter text and press Send
    MessagesPage->>API: POST /messages
    API->>MatchRepo: sendMessage(matchId, senderId, content)
    MatchRepo->>DB: INSERT into messages
    DB-->>MatchRepo: new message id
    MatchRepo-->>API: saved message
    API-->>MessagesPage: 201 { ok, message }
    MessagesPage->>API: GET /messages/:matchId
    API->>MatchRepo: getMessages(matchId)
    MatchRepo->>DB: SELECT messages ORDER BY created_at
    DB-->>MatchRepo: message list
    MatchRepo-->>API: messages
    API-->>MessagesPage: { ok, messages }
    MessagesPage-->>User: Updated conversation thread
```
