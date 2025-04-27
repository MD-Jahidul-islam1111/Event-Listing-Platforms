const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'waitlisted'],
    default: 'pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  checkInTime: {
    type: Date
  },
  ticketType: {
    type: String,
    enum: ['regular', 'vip', 'early-bird'],
    default: 'regular'
  },
  additionalInfo: {
    type: Map,
    of: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
registrationSchema.index({ user: 1, event: 1 }, { unique: true });
registrationSchema.index({ event: 1, status: 1 });

// Virtual for calculating registration duration
registrationSchema.virtual('registrationDuration').get(function() {
  if (this.checkInTime) {
    return this.checkInTime - this.registrationDate;
  }
  return null;
});

// Method to check if registration is active
registrationSchema.methods.isActive = function() {
  return this.status === 'confirmed' || this.status === 'pending';
};

// Static method to get registration count for an event
registrationSchema.statics.getEventRegistrationCount = async function(eventId) {
  return this.countDocuments({ event: eventId, status: { $in: ['pending', 'confirmed'] } });
};

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration; 