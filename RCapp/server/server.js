const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Routes
const studentRoutes = require('./routes/studentRoutes');
const workerRoutes = require('./routes/workerRoutes');
const managerRoutes = require('./routes/managerRoutes');

// Routes Middleware
app.use('/api/students', studentRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/managers', managerRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Room Cleaning Management API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

