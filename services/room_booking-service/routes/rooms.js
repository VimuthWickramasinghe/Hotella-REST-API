const express = require('express');
const Room = require('../models/Room');

const router = express.Router();

// Get all rooms (with optional query filters like ?status=available)
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const rooms = await Room.find(filters);
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving rooms' });
  }
});

// Get a single room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving room' });
  }
});

// Create a new room (Staff/Admin only ideally, but omitting auth middleware for now to keep it simple)
router.post('/', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
        return res.status(400).json({ message: 'Room number already exists' });
    }
    res.status(500).json({ message: 'Server error creating room' });
  }
});

// Update a room (e.g., change status to maintenance)
router.put('/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(updatedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating room' });
  }
});

// Delete a room
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting room' });
  }
});

module.exports = router;