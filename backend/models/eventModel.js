const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['Conference', 'Workshop', 'Seminar', 'Networking', 'Other'],
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  registeredUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for checking if event is full
eventSchema.virtual('isFull').get(function() {
  return this.registeredUsers.length >= this.capacity;
});

// Method to register a user for an event
eventSchema.methods.registerUser = function(userId) {
  if (this.isFull) {
    throw new Error('Event is already full');
  }
  if (this.registeredUsers.includes(userId)) {
    throw new Error('User is already registered for this event');
  }
  this.registeredUsers.push(userId);
  return this.save();
};

// Method to unregister a user from an event
eventSchema.methods.unregisterUser = function(userId) {
  this.registeredUsers = this.registeredUsers.filter(id => id.toString() !== userId.toString());
  return this.save();
};

module.exports = mongoose.model('Event', eventSchema); 