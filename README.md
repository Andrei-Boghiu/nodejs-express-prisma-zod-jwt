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
git clone https://github.com/your-username/nodejs-express-prisma-zod-jwt

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Initialize Prisma
npx prisma generate
npx prisma migrate dev --name init

# Run the server
npm run dev
```

---

## 📂 Folder Structure (Simplified)

```
src/
├── controllers/
├── middlewares/
├── routes/
├── models/ (Prisma schema)
├── utils/
├── app.js
└── server.js
```

---

## 🧪 Testing the API

**Postman** for testing endpoints.
Auth-protected routes require a Bearer token from the login response.
