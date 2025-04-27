const Registration = require('../models/registrationModel');
const Event = require('../models/eventModel');
const asyncHandler = require('express-async-handler');

// @desc    Get all registrations for an event
// @route   GET /api/registrations/event/:eventId
// @access  Public
const getEventRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({ event: req.params.eventId })
    .populate('user', 'name email')
    .sort('-registrationDate');

  res.status(200).json({
    success: true,
    count: registrations.length,
    data: registrations
  });
});

// @desc    Get all registrations for logged in user
// @route   GET /api/registrations/user
// @access  Private
const getUserRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({ user: req.user.id })
    .populate('event', 'title date location')
    .sort('-registrationDate');

  res.status(200).json({
    success: true,
    count: registrations.length,
    data: registrations
  });
});

// @desc    Update registration status
// @route   PATCH /api/registrations/:id/status
// @access  Private/Admin
const updateRegistrationStatus = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    res.status(404);
    throw new Error('Registration not found');
  }

  // Check if user is event organizer or admin
  const event = await Event.findById(registration.event);
  if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update this registration');
  }

  registration.status = req.body.status;
  await registration.save();

  res.status(200).json({
    success: true,
    data: registration
  });
});

// @desc    Check in user for event
// @route   POST /api/registrations/:id/checkin
// @access  Private/Admin
const checkInUser = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    res.status(404);
    throw new Error('Registration not found');
  }

  // Check if user is event organizer or admin
  const event = await Event.findById(registration.event);
  if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to check in users');
  }

  if (registration.status !== 'confirmed') {
    res.status(400);
    throw new Error('Cannot check in unconfirmed registration');
  }

  registration.checkInTime = Date.now();
  await registration.save();

  res.status(200).json({
    success: true,
    data: registration
  });
});

// @desc    Get registration statistics for an event
// @route   GET /api/registrations/event/:eventId/stats
// @access  Private/Admin
const getRegistrationStats = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if user is event organizer or admin
  if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to view registration stats');
  }

  const stats = await Registration.aggregate([
    { $match: { event: event._id } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalRegistrations = await Registration.countDocuments({ event: event._id });
  const checkedInCount = await Registration.countDocuments({
    event: event._id,
    checkInTime: { $exists: true }
  });

  res.status(200).json({
    success: true,
    data: {
      totalRegistrations,
      checkedInCount,
      statusBreakdown: stats
    }
  });
});

module.exports = {
  getEventRegistrations,
  getUserRegistrations,
  updateRegistrationStatus,
  checkInUser,
  getRegistrationStats
}; 