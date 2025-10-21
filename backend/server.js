require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// -------------------- Middleware --------------------
app.use(cors());
app.use(express.json());

// -------------------- MongoDB --------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// -------------------- API Routes --------------------
app.use('/tasks', taskRoutes);

// -------------------- SERVE REACT FRONTEND --------------------
// ADD THIS PART HERE, AFTER API ROUTES
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
