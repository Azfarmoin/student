# 🎓 AcademiaBase — Student Management System

A full-stack Student Management System built with **Node.js + Express** (backend) and **HTML/CSS/Vanilla JS** (frontend).
**No database required** — all data is stored in server memory.

---

## 📁 Folder Structure

```
student-management-system/
├── server/
│   ├── server.js        ← Express backend (all API routes + in-memory data)
│   └── package.json     ← Node dependencies
│
├── client/
│   └── index.html       ← Frontend (HTML + CSS + JS in one file)
│
└── README.md
```

---

## ✅ Features

| Feature | Status |
|---|---|
| Add student | ✅ |
| View all students | ✅ |
| Edit/Update student | ✅ |
| Delete student (with confirmation) | ✅ |
| Search by name or email | ✅ |
| Filter by course | ✅ |
| Duplicate email detection | ✅ |
| Beautiful dark-mode UI | ✅ |
| Toast notifications | ✅ |
| Pre-loaded sample data | ✅ |

---

## 🚀 How to Run

### Step 1 — Prerequisites

Make sure **Node.js** is installed:
```bash
node --version   # Should be v14 or higher
```
Download from https://nodejs.org if needed.

---

### Step 2 — Install backend dependencies

```bash
cd student-management-system/server
npm install
```

This installs `express` and `cors`.

---

### Step 3 — Start the backend server

```bash
node server.js
```

You should see:
```
✅  Server running at http://localhost:5000
📚  5 sample students loaded
```

---

### Step 4 — Open the frontend

**Option A — Just open the file directly:**
Open `client/index.html` in your browser by double-clicking it.

**Option B — Serve it (optional, avoids any CORS quirks):**
```bash
# In a new terminal, from the project root:
npx serve client
# Then visit http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/students` | Get all students |
| GET | `/students?search=alice` | Search students |
| GET | `/students?course=Physics` | Filter by course |
| POST | `/students` | Create a student |
| PUT | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |
| GET | `/courses` | Get all unique courses |

### Example — Create a student with curl:
```bash
curl -X POST http://localhost:5000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@test.com","course":"Biology"}'
```

---

## 📝 Notes

- Data is **not persistent** — it resets when the server restarts.
- 5 sample students are pre-loaded on startup.
- The backend runs on port **5000**; the frontend points to `http://localhost:5000`.

---

## 🛠 Troubleshooting

| Problem | Fix |
|---|---|
| `Cannot reach server` toast | Make sure `node server.js` is running |
| `npm: command not found` | Install Node.js from nodejs.org |
| Port 5000 in use | Edit `PORT` in `server.js` and `API` in `index.html` to another port (e.g. 5001) |
| Blank table | Check browser console; server may not be running |
