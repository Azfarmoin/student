/**
 * ============================================================
 *  Student Management System — Backend Server
 *  Stack : Node.js + Express
 *  Storage: In-memory array (no database required)
 * ============================================================
 */

const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());          // Allow requests from the frontend
app.use(express.json());  // Parse incoming JSON request bodies

// ─── In-Memory Data Store ─────────────────────────────────────
// All students are kept here while the server is running.
// Data resets when the server restarts (no persistence).
let students = [
  { id: 1, name: 'Alice Johnson',  email: 'alice@example.com',   course: 'Computer Science' },
  { id: 2, name: 'Bob Martinez',   email: 'bob@example.com',     course: 'Mathematics'      },
  { id: 3, name: 'Clara Nguyen',   email: 'clara@example.com',   course: 'Physics'          },
  { id: 4, name: 'David Kim',      email: 'david@example.com',   course: 'Engineering'      },
  { id: 5, name: 'Eva Patel',      email: 'eva@example.com',     course: 'Computer Science' },
];

// Auto-increment counter for unique IDs
let nextId = students.length + 1;

// ─── Helper ───────────────────────────────────────────────────
// Validate that required fields are present and non-empty
function validateStudent(body) {
  const { name, email, course } = body;
  if (!name  || !name.trim())   return 'Name is required';
  if (!email || !email.trim())  return 'Email is required';
  if (!course|| !course.trim()) return 'Course is required';

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))  return 'Invalid email format';

  return null; // null means valid
}

// ─── Routes ───────────────────────────────────────────────────

// GET /students — Retrieve all students
app.get('/students', (req, res) => {
  // Optional query params for search & filter
  const { search, course } = req.query;
  let result = [...students];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s => s.name.toLowerCase().includes(q) ||
                                s.email.toLowerCase().includes(q));
  }

  if (course && course !== 'All') {
    result = result.filter(s => s.course === course);
  }

  res.json({ success: true, count: result.length, data: result });
});

// POST /students — Create a new student
app.post('/students', (req, res) => {
  const error = validateStudent(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const { name, email, course } = req.body;

  // Check for duplicate email
  const duplicate = students.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (duplicate) {
    return res.status(409).json({ success: false, message: 'Email already exists' });
  }

  const newStudent = {
    id: nextId++,
    name:   name.trim(),
    email:  email.trim().toLowerCase(),
    course: course.trim(),
  };

  students.push(newStudent);
  res.status(201).json({ success: true, data: newStudent });
});

// PUT /students/:id — Update an existing student
app.put('/students/:id', (req, res) => {
  const id    = parseInt(req.params.id, 10);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  const error = validateStudent(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const { name, email, course } = req.body;

  // Check duplicate email — allow same student to keep their own email
  const duplicate = students.find(
    s => s.email.toLowerCase() === email.toLowerCase() && s.id !== id
  );
  if (duplicate) {
    return res.status(409).json({ success: false, message: 'Email already used by another student' });
  }

  // Merge changes
  students[index] = {
    ...students[index],
    name:   name.trim(),
    email:  email.trim().toLowerCase(),
    course: course.trim(),
  };

  res.json({ success: true, data: students[index] });
});

// DELETE /students/:id — Remove a student
app.delete('/students/:id', (req, res) => {
  const id    = parseInt(req.params.id, 10);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  const removed = students.splice(index, 1)[0];
  res.json({ success: true, data: removed, message: 'Student deleted successfully' });
});

// GET /courses — Return all unique course names (for filter dropdown)
app.get('/courses', (req, res) => {
  const courses = [...new Set(students.map(s => s.course))].sort();
  res.json({ success: true, data: courses });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  Server running at http://localhost:${PORT}`);
  console.log(`📚  ${students.length} sample students loaded`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET    /students`);
  console.log(`  POST   /students`);
  console.log(`  PUT    /students/:id`);
  console.log(`  DELETE /students/:id`);
  console.log(`  GET    /courses\n`);
});
