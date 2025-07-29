# nodejs-express-prisma-zod-jwt

A simple REST API built with Node.js and Express to manage **Users, Projects, and Tasks**.  
It demonstrates a backend implementation including **authentication**, **input validation**, and **ORM** integration.

---

## 📌 Use Case

This API manages three main entities:

- **Users**: Can register, log in, and create projects.
- **Projects**: Belong to users. Each project can contain multiple tasks.
- **Tasks**: Linked to projects and assigned to users. Tasks have a status (e.g., completed or not).

Use case: A lightweight project and task management system, similar to a simplified version of Trello or Asana.

---

## 🧱 Tech Stack

| Layer          | Technology            | Purpose                          |
| -------------- | --------------------- | -------------------------------- |
| **Runtime**    | Node.js               | JavaScript server runtime        |
| **Framework**  | Express.js            | Server framework & routing       |
| **ORM**        | Prisma                | Database schema & queries        |
| **Validation** | Zod                   | Runtime input validation (DTOs)  |
| **Auth**       | JSON Web Tokens (JWT) | Secure user authentication       |
| **Database**   | PostgreSQL            | Persistent data storage          |
| **Security**   | bcrypt, helmet        | Password hashing, secure headers |
| **Utils**      | dotenv, cors          | Env configs, CORS handling       |
| **Dev Tools**  | nodemon               | Auto-reload during development   |

---

## 🧭 But Why?

This project is part of a personal challenge to build the same app using different tech stacks. The goal is to deepen my understanding beyond just syntax, but rather focusing on architecture, tooling, and real-world development practices.

For this first version, I intentionally chose a less comfortable stack (JavaScript without TypeScript) to expose its weaknesses and better appreciate the strengths of statically typed environments. The lack of type safety and compile-time checks definitely made development harder and more error-prone, but it also made me value tools like TypeScript and languages like Java even more.

As I complete the same app with other stacks, I’ll update this documentation with links and insights.

---

## 🚀 Features

- ✅ User registration & login with hashed passwords
- 🔐 JWT-based authentication
- 📁 CRUD operations for Projects and Tasks
- ✅ Request validation with Zod
- 🔄 Relational logic using Prisma (1:N and N:1)
- 🌐 Environment configuration with dotenv

---

## 📦 Setup

```bash
# Clone the repo
git clone https://github.com/Andrei-Boghiu/nodejs-express-prisma-zod-jwt

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Initialize Prisma
npm run prisma:dev
## or
npm run prisma:prod

# Run the server
npm run dev
```

---

## 🧪 Testing the API

**Postman** for testing endpoints.
Auth-protected routes require a Bearer token from the login response.
