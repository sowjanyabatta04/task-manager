// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ---------------- Middleware ----------------
app.use(cors());
app.use(express.json());

// ---------------- MongoDB Connection ----------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ---------------- Test Route ----------------
// Must come BEFORE the React catch-all route
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok' });
});

// ---------------- Example /api/books Routes ----------------
let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' }
];

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Add a new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const id = books.length + 1;
  const newBook = { id, title, author };
  books.push(newBook);
  res.json(newBook);
});

// Delete a book by id
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(book => book.id !== id);
  res.json({ message: `Book ${id} deleted` });
});

// ---------------- Serve React Frontend ----------------
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route for React frontend
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
