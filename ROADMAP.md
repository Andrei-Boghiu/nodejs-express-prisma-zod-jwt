# 🗺️ Project Roadmap

A forward-looking plan for the `nodejs-express-prisma-zod-jwt` project.

> After completing each milestone, build or update the frontend to match backend changes.

---

## ✅ v1.0 - MVP

- ~~User registration and login~~
- ~~Password hashing with bcrypt~~
- ~~JWT-based authentication~~
- [ ] Implement refresh tokens
- ~~CRUD for Projects and Tasks~~
- ~~Zod validation for inputs~~
- ~~PostgreSQL via Prisma ORM~~
- ~~Secure headers via Helmet~~
- ~~Basic rate limiting~~
- ~~Introduce centralized error handler utility~~
- ~~Add pagination and limit/skip query support for list endpoints~~
- [ ] Add `comments` entity (e.g., tasks can have multiple comments)
- [ ] Expand the columns for `projects`, `tasks`, and `users` entities
- [ ] Add filtering and sorting capabilities

---

## 📦 v1.1 - Quality of Life & Tooling

- [ ] Add tests (unit, integration, E2E)
- [ ] Use ESLint + Prettier for consistent code style
- [ ] Add commit linting (`commitlint`, `husky`, `dotenvx ext precommit`)

---

## ⚡ v1.2 - Performance & DX

- [ ] Add Swagger/OpenAPI documentation
- [ ] Introduce in-memory caching for common queries (e.g., Redis or LRU)
- [ ] Add `.env.example` sync check during boot
- [ ] Add request logging middleware
- [ ] Setup CORS config for environments (dev/prod)
- [ ] Add `logger.js` with log levels (debug, error, warn)

---

## 🚧 v1.3 - API Maturity

- [ ] Standardize API response format (e.g., `{ data, meta, errors }`)
- [ ] Extract validation and middleware into `/middlewares` and `/validators` folders
- [ ] Add `milestones` entities (e.g., each project can have multiple milestones, each milestone can have multiple tasks)
- [ ] Add file attachments support to comments
- [ ] Add soft deletes
- [ ] Add ability to mark projects as Completed or Archived
- [ ] Add Full-text Search Support across projects, tasks, and comments (PostgreSQL’s tsvector or external search engines like Meilisearch)

---

## 🔄 v1.4 - Realtime & Collaboration

- [ ] Implement team-based collaboration
- [ ] Implement authorization levels
- [ ] Add dashboard for viewing, banning, promoting users
- [ ] Integrate WebSocket (e.g., `ws` or `socket.io`) for task/project updates
- [ ] Broadcast changes to relevant users in real-time
- [ ] Add presence tracking (online/offline status)
- [ ] Add profile picture for users
- [ ] Add in-app notification system for events (e.g., "You were assigned a new task")

---

## 🔐 v1.5 - Security Enhancements

- [ ] Add password reset flow (email-based)
- [ ] Add 2FA (TOTP-based)
- [ ] Add rate limiting per route (e.g., login vs API requests)
- [ ] Add activity logs / audit trails
- [ ] GDPR Compliance Utilities (e.g., right to data deletion, data export, consent tracking (if user data is sensitive).)

---

## 🌐 v1.6 - Deployment & Scalability

- [ ] Dockerize the application
- [ ] Add health checks (`/health`, `/ready`)
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Implement environment-based config loader
- [ ] Implement horizontal scaling preparation (e.g., clustered HTTP server)
- [ ] Add GraphQL endpoints

---

## 🧠 v2.0 - MCP (Machine-Contextual Processing)

- [ ] Integrate AI Agent (local or API-based)
- [ ] Auto-generate task lists from project descriptions
- [ ] Update tasks based on user text input
- [ ] Convert meeting notes into structured tasks

---

## Documentation & Community

- [ ] Improve project README with architecture overview
- [ ] Add codebase structure doc
- [ ] Add contribution guide
- [ ] Add changelog

---

## Very Nice-to-Have features

- [ ] Add multi-tenancy support (e.g., to serve multiple organizations or clients from one instance)
- [ ] Rate Limiting with Redis Store (e.g., to persist rate limiting across distributed environments.)

## 🏁 Final Notes

This roadmap is evolving. Features may be added, removed, or re-prioritized as development progresses.
