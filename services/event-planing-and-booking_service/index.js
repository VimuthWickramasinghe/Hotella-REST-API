require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookings');
const eventRoutes = require('./routes/events');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5003;
// Uses a separate logical database "hotella_bookings" in the same MongoDB cluster
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotella_bookings';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Event Planning & Booking Service: Connected to MongoDB'))
  .catch((err) => console.error('Event Planning & Booking Service: MongoDB connection error:', err));

// Health check MUST be before general routes to avoid catching /health as an :id
app.get('/api/bookings/health', (req, res) => {
    res.json({ service: 'event-planing-and-booking-service', status: 'OK', db_connected: mongoose.connection.readyState === 1 });
});

// Routes
// Note: API Gateway forwards requests from /api/bookings to this service.
// Let's add /events here as well, we may need to adjust gateway mapping for events if needed.
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
    console.log(`event-planing-and-booking-service running on port ${PORT}`);
});