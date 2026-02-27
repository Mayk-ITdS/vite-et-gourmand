# Vite & Gourmand

Project of digitalization of a premium catering platform built as an ECF evaluation at Studi Digital Education (France).

## Table of Contents

- Architectural Philosophy
- Business Context
- Technology Overview
- Functional Scope
- Security Model
- Development Environment Setup
- Charte Graphique

## Architecture decicions

DB-first + client-side state layer

Although the project was developed in an academic context, I deliberately treated the database layer as if it were part of a real-world system.

Instead of relying only on application-level validation, I chose to push a significant part of the logic and integrity controls directly into PostgreSQL. The goal was to simulate production-oriented constraints: protecting data at the lowest possible level of a system to prevent inconsistent states, and reducing the risk of invalid or malicious input.

For example, the ingest_stock function encapsulates structured stock ingestion logic inside the database, validating input modes and payload structure before any write operation is performed. By centralizing this logic, the system avoids exposing raw insert operations directly to the application layer.
This was a deliberate decision to simulate real-world database design practices and to understand better how logic can be safely embedded inside low level layers.

This approach reflects an intention to simulate real-world database design practices and to deepen understanding of data integrity and performance considerations.

---

## Security, scalability and architectural consistency

With a database-first layer defined as the foundation of the system, the idea naturally emerged to establish a second core structure on the client side.

If PostgreSQL represents the central logic and integrity layer on the backend, Redux Toolkit plays a similar structural role on the frontend. It acts as the second “heart” of the application, organizing and controlling global state.

The possibilities offered by Redux Toolkit made it possible to structure authentication, role management and reservation flows in a centralized and predictable way. This approach ensures that complex interactions are handled consistently across the application rather than scattered across isolated components.

Redux works particularly well together with TypeScript, reinforcing type safety and making data flow more explicit. React remains responsible for smaller, localized state transitions, while Redux manages the broader application state.

From a security perspective, storing the authentication token within the Redux state layer instead of directly manipulating localStorage aligns with the overall architectural goal: keeping control mechanisms centralized, structured and predictable.

---

# Live Demo

http://51.20.182.243/menus

## Project Management

Trello board
https://trello.com/b/G02hHQge/vite-gourmand

### Additional Documentation

Detailed project building stages, AWS deployment process, architecture diagrams, database modeling and UI wireframes are available in the PDF documentation included in this repository.

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Redux Toolkit + redux-persist
- TailwindCSS
- Radix UI
- shadcn/ui
- MUI

## Backend

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- Layered Architecture (Controller → Service → Repository)

## Database layer

- PostgreSQL 16
- MongoDB 7
- ENUM types
- CHECK constraints
- Triggers
- Stored procedures (SECURITY DEFINER)
- Built in functions
- Indexation
- pgcrypto
- citext

## Infrastructure

- Docker
- Docker Compose
- Nginx reverse proxy

---

## Deployment Architecture

Frontend → REST API → PostgreSQL & MongoDB

All services are containerized and exposed through Nginx on port 80.

Four containers:

- frontend
- backend
- postgres
- mongo

Database schema initializes automatically during container startup.

---

## Development Environment Setup

## Prerequisites

- Node.js 20+

- Docker & Docker Compose

- Git

## Clone the repository

```bash
git clone https://github.com/Mayk-ITdS/vite-et-gourmand.git
cd vite-et-gourmand
```

# Backend Environment Configuration

## Create the following file:

```
backend/.env.develop

```

## With the following variables:

```DB_HOST=postgres
DB_PORT=5432
DB_USER=app
DB_PASSWORD=app
DB_NAME=vites

MONGO_URI=mongodb://admin:root@mongo:27017

JWT_SECRET=your_secret_key
PORT=3000
NODE_ENV=development
```

### Important notes:

- The filename must match the env_file defined in docker-compose.yaml

- PostgreSQL credentials must match the values defined in the postgres service:

- POSTGRES_USER=app

- POSTGRES_PASSWORD=app

- POSTGRES_DB=vites

- MongoDB root credentials must match:

- username: admin

- password: root

- If environment variables are modified, containers must be rebuilt.

# Start the application:

```bash
docker compose up --build
```

## Frontend will be available at:

`http://localhost/menus`

## Backend at:

`http://localhost:3000`

- PostgreSQL (16)

- MongoDB (7)

- Backend (Node + Express)

- Frontend (React served via Nginx)

### Run seed manually:

`docker exec -it <backend_container_name> npm run seed`

## Note: if the database was not automatically initialized

#### Health check

```

http://localhost:3000/health
```

---

### Database initialization (PostgreSQL & MongoDB)

1. **Start all containers:**

   ```bash
   docker compose up -d
   ```

   This will start PostgreSQL, MongoDB, backend, and frontend containers. The MongoDB database (empty) will be created automatically by Docker Compose.

2. **Initialize PostgreSQL schema (if not created automatically):**

   ```bash
   docker compose exec -T postgres psql -U app -d vites -f /docker-entrypoint-initdb.d/001_database_schema.sql
   ```

   This command creates all tables and types defined in `backend/src/config/001_database_schema.sql`.

3. **Seed databases with initial data:**
   ```bash
   docker exec -it <backend_container_name> npm run seed
   ```
   This will populate PostgreSQL with test data and create initial collections/documents in MongoDB if needed by the app.

> **Note:**
>
> - MongoDB is created as an empty database when the container starts (step 1).
> - Collections and data for MongoDB are created during the seed process (step 3), if your backend uses them.

---

## Functional Scope

The system is structured around role-based access control (RBAC).

### User

- Browse menus

- Create reservations

- Access private dashboard

### Employee (Architecture Implemented – UI in Progress)

- Validate reservations

- Update status

### Admin (Architecture Implemented – UI in Progress)

- Manage menus

- Supervise themes

- Oversee stock

### UI Preview

#####

Welcome page

<img src='./frontend/src/assets/homepage.png'></img>

##### Menu Overview

<img class='height:300px;' src="./frontend/src/assets/menus-g.png"></img>

<>

Private Dashboard <>

## Roadmap

Planned extensions include:

- Full administrative dashboard with MongoDB-powered analytics
- Progressive accessibility improvements aligned with WCAG recommendations (keyboard navigation, ARIA attributes, contrast validation and screen reader support)
- Automated workflow simulation engine for continuous system activity and stress testing
- Distance-based delivery pricing using external geolocation API
- Advanced stock monitoring with automated alert system
- Extended RBAC policy with fine-grained permission control

## Academic Context

Developed as an academic project with emphasis on:

- architectural layering

- database integrity

- security-by-design

- scalable engineering practices

## Charte Graphique

## Palette de couleurs

| Nom            | HEX     | HSL           | RGBA                | OKLCH                     | Usage                                  |
| -------------- | ------- | ------------- | ------------------- | ------------------------- | -------------------------------------- |
| Bordeaux       | #7a1622 | 345, 65%, 28% | rgba(122,22,34,1)   | oklch(0.32 0.18 20)       | Fond, boutons principaux, accents wine |
| Bordeaux foncé | #4a0c13 | 345, 70%, 16% | rgba(74,12,19,1)    | oklch(0.18 0.13 20)       | Header, footer, overlays               |
| Beige clair    | #e8dfcf | 40, 38%, 88%  | rgba(232,223,207,1) | oklch(0.95 0.03 90)       | Texte sur fond foncé, bordures         |
| Bleu profond   | #070c14 | 225, 80%, 6%  | rgba(7,12,20,1)     | oklch(0.13 0.028 261.692) | Dashboard, cartes techniques           |
| Or             | #c4a07a | 36, 39%, 62%  | rgba(196,160,122,1) |                           | Accents, graphiques, highlights        |
| Gris argent    | #e6edf5 | 213, 38%, 91% | rgba(230,237,245,1) |                           | Surlignage PieChart                    |

_Exemple :_

- Bordeaux : Utilisé pour les boutons principaux et le fond des sections gastronomiques.
- Bleu profond : Utilisé pour les dashboards et les parties techniques.

## Typographie

- **Font principale** : Inter, sans-serif
  - `font-family: 'Inter', Arial, sans-serif;`
  - Poids : 400 (normal), 500 (medium), 700 (bold)
  - Exemples : titres (700), paragraphes (400), boutons (500)
- **Font alternative** : Roboto, Arial, sans-serif (pour fallback)

## Exemples d’utilisation

- Thème "wine-bordeaux" : parties gastronomiques, présentation, pages d’accueil, événements.
- Thème "bleu profond" : dashboard, statistiques, administration, widgets techniques.

---
