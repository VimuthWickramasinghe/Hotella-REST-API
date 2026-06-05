const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: {
    type: String, // Simplified as string, could be ObjectId referencing Auth Service User
    required: true
  },
  roomId: {
    type: String, // String referencing Room Service Room ID
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);