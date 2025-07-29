<div align="center">
  <h1>🧠 Attendance Tracker Backend</h1>
  <p>A TypeScript-powered REST API using Express.js and MongoDB for managing attendance data, enabling CRUD operations and monthly statistics generation with clean architecture and clear data flow.</p>

  <p>
    <a href="https://deepwiki.com/md-saqib06/attendance-tracker-backend">Documentation</a>
    ·
    <a href="https://github.com/md-saqib06/attendance-tracker-backend/issues">Report Bug</a>
  </p>
</div>

---

## 🔧 Features

- 🧾 CRUD operations for attendance records
- 📊 Monthly statistics processing
- 📡 RESTful API using Express.js
- 🗃️ MongoDB persistence with Mongoose
- ⚡ Fast dev runtime using Bun
- ☁️ CORS, JSON middleware, modular routes
- 🧼 Clean architecture with layered separation

---

## 🛠 Tech Stack

| Layer         | Technology            |
|--------------|------------------------|
| Runtime       | Bun (dev), Node.js (prod) |
| Language      | TypeScript             |
| Web Framework | Express.js             |
| Database      | MongoDB + Mongoose     |
| Config        | dotenv                 |
| Client Comm   | Axios                  |

---

## 📂 Project Structure

```

├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.ts
├── .env
├── package.json
├── tsconfig.json

````

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/md-saqib06/attendance-tracker-backend.git
cd attendance-tracker-backend
````

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Create a `.env` file:

```bash
touch .env
```

Add your MongoDB URI:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

### 4. Start the development server

```bash
bun --hot src/app.ts
```

---

## 🧱 Production Build

```bash
bunx tsc     # Compile TypeScript
node dist/app.js   # Run compiled JS
```

---

## 📘 Documentation

Explore the full backend architecture, controller logic, database schema, and flow diagrams at:

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/md-saqib06/attendance-tracker-backend)

---

## 📄 License

MIT License © [md-saqib06](https://github.com/md-saqib06)
