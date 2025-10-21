require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Serve frontend only if build folder exists
const frontendPath = path.join(__dirname, "../frontend/build");

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // Default route for backend-only deployment
  app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
  });
}

// Add your API routes here
// Example:
// const booksRouter = require('./routes/books');
// app.use('/api/books', booksRouter);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
