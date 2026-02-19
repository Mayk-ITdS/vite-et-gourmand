# Vite & Gourmand

Digital platform for premium catering management.  
Full-stack academic project designed with production-oriented architecture.

Vite & Gourmand is not a simple ordering website.  
It is a structured catering management system built using a **Database-First** and **Security-by-Design** approach.

The objective was to design a scalable, secure and maintainable digital ecosystem capable of evolving into a production-grade catering platform.

# demo
http://51.20.182.243/menus
# trello
https://trello.com/b/G02hHQge/vite-gourmand
---

## Tech Stack

### Frontend

React, TypeScript, Vite  
Redux Toolkit + redux-persist  
TailwindCSS  
Radix UI  
shadcn/ui  
MUI

### Backend

Node.js  
Express.js  
TypeScript  
JWT Authentication  
Layered Architecture (Controller → Service → Repository)

### Database

PostgreSQL  
ENUM types  
CHECK constraints  
Triggers  
Stored procedures (SECURITY DEFINER)  
pgcrypto  
citext

### Infrastructure

Docker  
Docker Compose  
Nginx reverse proxy

---

## Architecture Overview

Client–Server architecture with strict separation:

Frontend => REST API => PostgreSQL

All services are containerized and exposed through Nginx on port 80.

Four containers:

- frontend
- backend
- PostgreSQL
- MongoDB

Database schema initializes automatically via Docker on startup.

---

## Security Model

Multi-layer security implementation:

- JWT authentication
- Role-based access control (roles + user_roles)
- Backend middleware verification
- PostgreSQL constraints and foreign keys
- ENUM types preventing invalid states
- Data normalization via triggers
- Stored procedures encapsulating sensitive logic
- Strict TypeScript typing (compile-time validation)

### Example: ENUM Constraint

```sql
CREATE TYPE reservation_status_enum AS ENUM
('pending','confirmed','cancelled','completed');

```

## Example: Typed Async Thunk

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

- Both input and output are strictly typed

### State Management

# Redux Toolkit ensures:

- Predictable global state

- Memoized selectors

- Controlled persistence

- Secure token handling inside the store

- Authentication token is managed via Redux + redux-persist (not directly manipulated in localStorage inside components).

### Running the Project

```
docker-compose up --build

```

# Application available at:

```
http://localhost

```

### User Roles

User

- Browse menus

- Create reservations

- Access private dashboard

Employee (Architecture Implemented – UI in Progress)

- Validate reservations

- Update status

Admin (Architecture Implemented – UI in Progress)

- Manage menus

- Supervise themes

- Oversee stock

### UI Preview

Landing Page

Menu Overview

Private Dashboard

### Roadmap

- Full Admin UI industrialization

- Advanced stock analytics module

- Google API integration (logistics & geolocation)

- Extended RBAC policy model

- Business intelligence extension

### Academic Context

Developed as an academic project with emphasis on:

- architectural layering

- database integrity

- security-by-design

- scalable engineering practices

The project is conceived as a foundation for a production-ready catering management system.
