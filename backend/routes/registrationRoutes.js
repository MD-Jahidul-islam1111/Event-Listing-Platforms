const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getEventRegistrations,
  getUserRegistrations,
  updateRegistrationStatus,
  checkInUser,
  getRegistrationStats
} = require('../controllers/registrationController');

// Public routes
router.get('/event/:eventId', getEventRegistrations);

// Protected routes
router.get('/user', protect, getUserRegistrations);
router.get('/event/:eventId/stats', protect, authorize('organizer', 'admin'), getRegistrationStats);
router.patch('/:id/status', protect, authorize('organizer', 'admin'), updateRegistrationStatus);
router.post('/:id/checkin', protect, authorize('organizer', 'admin'), checkInUser);

module.exports = router; 