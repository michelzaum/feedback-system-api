# Impruv — Backend

Impruv is a customer feedback management platform designed to help companies collect, organize, and turn customer feedback into meaningful product improvements.

This repository contains the backend application, responsible for exposing the REST API, enforcing business rules, handling authentication and authorization, and managing data persistence.

## Features

- **Authentication:** Account registration and login with cookie-based authentication.
- **User management:** Create, retrieve, update, and delete user accounts.
- **Organization management:** Create and manage organizations.
- **Membership management:** Associate users with organizations and manage organization-specific roles.
- **Role-based access control:** Enforce permissions based on user membership and role.
- **Project management:** Organize projects within organizations.
- **Feedback management:** Handle customer feedback associated with projects.
- **Public feedback submission:** Support feedback submissions through project-specific public identifiers.
- **Data integrity:** Apply database constraints and transactional operations to protect relationships between users, organizations, projects, and feedback.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| TypeScript | Static typing and maintainable application code |
| Express | HTTP server and REST API routing |
| Prisma ORM | Database access, schema modeling, and migrations |
| PostgreSQL | Relational database |
| JSON Web Tokens (JWT) | Authentication, where applicable in the current implementation |
| HTTP-only cookies | Protect authentication credentials from direct JavaScript access |
| Neon | Managed PostgreSQL hosting |
| Render | Backend application hosting |

## Architecture

The backend uses a layered architecture that separates HTTP handling, business logic, and data access.

### Request flow

```text
HTTP Request
     |
     v
Express Routes
     |
     v
Controllers
     |
     v
Use Cases
     |
     v
Repository Interfaces
     |
     v
Repository Implementations
     |
     v
Prisma ORM
     |
     v
PostgreSQL
```

Each layer has a specific responsibility:

- **Routes:** Define API endpoints and connect requests to their handlers and middleware.
- **Controllers:** Handle HTTP-specific concerns, extract request data, and return appropriate responses.
- **Use cases:** Encapsulate business rules and coordinate application operations.
- **Repository interfaces:** Define the data access contracts required by the application logic.
- **Repository implementations:** Execute database operations using Prisma.
- **Prisma ORM:** Maps application operations to database queries and supports schema migrations.
- **PostgreSQL:** Stores application data and maintains relational integrity.

This separation helps keep business logic independent of HTTP concerns and makes individual application behaviors easier to test and maintain.

## Domain Model

The application is organized around the following core entities:

- **User:** Represents an account and its authentication-related information.
- **Organization:** Represents a company or workspace.
- **Membership:** Connects users to organizations and stores organization-specific roles.
- **Project:** Represents a project that belongs to an organization.
- **Feedback:** Represents customer feedback associated with a project.

### Organization membership and roles

Users and organizations have a many-to-many relationship through the `Membership` entity.

A membership stores the user's role within a specific organization, such as `ADMIN` or `MEMBER`. This allows the same user to have different roles across different organizations.

For example, a user can be an administrator in one organization and a regular member in another.

### Data integrity

The application relies on relational constraints and appropriate transactional operations to preserve consistency across related entities.

Destructive operations, such as account deletion and membership removal, must account for organization ownership, administrative permissions, and dependent records to avoid leaving organizations in an invalid state.

## Authentication and Authorization

Authentication and authorization are handled by the backend.

- **Authentication:** Validates user credentials and establishes the authenticated session using the application's cookie-based authentication flow.
- **HTTP-only cookies:** Help prevent client-side JavaScript from reading authentication credentials.
- **Authorization:** Validates whether an authenticated user is permitted to perform an operation.
- **Organization-scoped permissions:** Determine access based on the user's membership and role within the relevant organization.
- **Public endpoints:** Allow customers to submit feedback through designated public project routes without requiring an internal dashboard account, where permitted by the application rules.

Authorization is enforced on the server rather than relying exclusively on frontend navigation or hidden interface controls.

## API Design

The backend exposes a REST API organized around application resources.

Representative resource groups include:

| Resource | Responsibility |
|---|---|
| `/users` | User account operations |
| `/organizations` | Organization management |
| `/organizations/:organizationId/members` | Organization membership management |
| `/organizations/:organizationId/projects` | Organization-scoped project operations |
| Project feedback routes | Feedback retrieval and management |
| Public project routes | Customer feedback submission |

The exact endpoints and supported HTTP methods are defined by the implementation.

The API uses HTTP status codes and JSON responses to communicate results and errors to the frontend.

## Database and Migrations

Prisma is used to define the database schema and interact with PostgreSQL.

The database schema describes entity relationships, identifiers, uniqueness constraints, and other integrity requirements.

Database migrations are used to version schema changes and apply them consistently across environments.

The production database is hosted on Neon.

## Getting Started

### Prerequisites

- Node.js
- npm
- A PostgreSQL database
- Access to the required environment variables

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/michelzaum/feedback-system-api.git
cd feedback-system-api
npm install
```

### Environment Variables

Create a local `.env` file using the environment variables expected by the application.

Example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

Configure any additional variables required by the implementation, such as authentication secrets, cookie settings, or the frontend's allowed origin.

Use your local database credentials during development. Never commit real credentials, production secrets, or private connection strings to version control.

### Database Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply existing migrations to the development database:

```bash
npx prisma migrate dev
```

Use the production migration command when deploying an existing migration history:

```bash
npx prisma migrate deploy
```

### Run Locally

Start the backend using the development script defined in `package.json`. For example, if the project uses `tsx`:

```bash
npm run dev
```

Check the project's scripts to confirm the exact command and configured port.

## Deployment

The backend is deployed on Render, with PostgreSQL hosted on Neon.

The deployment process requires the appropriate environment variables, database connectivity, and application build configuration.

Production deployments should apply committed database migrations before relying on schema changes. Sensitive environment variables should be configured through the hosting provider rather than stored in the repository.

## Engineering Principles

The project emphasizes:

- Separation of concerns through layered architecture.
- Explicit business rules in use cases.
- Repository abstractions for data access.
- Server-side authentication and authorization.
- Relational integrity and transactional data operations.
- Independent frontend and backend deployment.
- Maintainable TypeScript code and incremental product development.

## Project Goals

Impruv aims to help teams transform customer feedback into actionable product improvements.

The backend provides the foundation for this workflow through a structured API, organization-scoped access control, and reliable data management.

## License

No license has been specified yet. All rights are reserved by the project owner unless a license is added to this repository.
