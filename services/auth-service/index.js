require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotella_auth';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Auth Service: Connected to MongoDB'))
  .catch((err) => console.error('Auth Service: MongoDB connection error:', err));

// Health check MUST be before general routes to avoid catching /health as an :id
app.get('/api/auth/health', (req, res) => {
    res.json({ service: 'auth-service', status: 'OK', db_connected: mongoose.connection.readyState === 1 });
});

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`auth-service running on port ${PORT}`);
});