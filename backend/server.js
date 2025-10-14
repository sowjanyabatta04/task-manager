require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Test route
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok' });
});

// Add other routes here, e.g., /api/books

// Serve React frontend (catch-all)
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
