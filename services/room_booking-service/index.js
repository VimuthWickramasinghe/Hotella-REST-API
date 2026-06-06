require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const roomRoutes = require('./routes/rooms');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5002;
// Uses a separate logical database "hotella_rooms" in the same MongoDB cluster
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotella_rooms';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Room Booking Service: Connected to MongoDB'))
  .catch((err) => console.error('Room Booking Service: MongoDB connection error:', err));

// Health check MUST be before general routes to avoid catching /health as an :id
app.get('/api/rooms/health', (req, res) => {
    res.json({ service: 'room-booking-service', status: 'OK', db_connected: mongoose.connection.readyState === 1 });
});

// Routes
// Note: The API Gateway forwards requests from /api/rooms to this service.
app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
    console.log(`room-booking-service running on port ${PORT}`);
});