# Vite & Gourmand

Project built as an ECF evaluation at Studi DIgital Education, France

Bussiness aspect idea:

Digital platform for premium catering management.  
Full-stack academic project designed with production-oriented architecture.

Vite & Gourmand is not a simple ordering website.  
It is a structured catering management system built using a **Database-First** and **Security-by-Design** approach.

The objective was to design a scalable, accessible, secure and maintainable digital ecosystem capable of evolving into a production-grade catering platform.

# demo

http://51.20.182.243/menus

# trello

## https://trello.com/b/G02hHQge/vite-gourmand

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

# Architecture Overview

Client–Server architecture with strict separation:

Frontend → REST API → PostgreSQL & MongoDB

All services are containerized and exposed through Nginx on port 80.

Four containers:

- frontend
- backend
- postgres
- mongo

Database schema initializes automatically during container startup.

---

# Local installation

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

## Note: if the database was not automatically initialized

### Run seed manually:

`docker exec -it <backend_container_name> npm run seed`

```
health check
http://localhost:3000/health
```

---

## Security Model

Multi-layer security implementation:

- JWT authentication
- Role-based access control (roles + user_roles)
- Backend middleware verification
- PostgreSQL constraints, triggers and custom functions
- Indexes
- ENUM types preventing invalid states
- Data normalization via triggers
- Stored procedures encapsulating sensitive logic
- Strict TypeScript typing (compile-time validation)

### Example: ENUM Constraint

```sql
CREATE TYPE reservation_status_enum AS ENUM
('pending','confirmed','cancelled','completed');

```

## State Management

### Redux Toolkit chosen for:

- Predictable global state

- Memoized selectors

- Controlled persistence

- Secure token handling inside the store

- Authentication token is managed via Redux + redux-persist (not directly manipulated in localStorage inside components).

### Example: Typed Async Thunk

```export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginDTO,
  { rejectValue: ClientError }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(toClientError(error));
  }
});

```

### Both input and output are strictly typed

---

## User Roles

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

Landing Page <>

Menu Overview <>

Private Dashboard <>

## Roadmap

- Full Admin UI

- Advanced stock analytics module

- Google API integration (logistics & geolocation)

- Extended RBAC policy model

- Self automated users mouvement implementations
- Business intelligence extension

## Academic Context

Developed as an academic project with emphasis on:

- architectural layering

- database integrity

- security-by-design

- scalable engineering practices

The project is conceived as a foundation for a production-ready catering management system.
