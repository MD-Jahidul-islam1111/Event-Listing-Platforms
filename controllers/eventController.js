const Event = require('../models/eventModel');
const asyncHandler = require('express-async-handler');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, category, capacity } = req.body;

  if (!title || !description || !date || !location || !category || !capacity) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const event = await Event.create({
    title,
    description,
    date,
    location,
    category,
    capacity,
    organizer: req.user._id
  });

  res.status(201).json(event);
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const { category, status, search } = req.query;
  let query = {};

  if (category) {
    query.category = category;
  }

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const events = await Event.find(query)
    .populate('organizer', 'name email')
    .sort({ date: 1 });

  res.json(events);
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate('organizer', 'name email')
    .populate('registeredUsers', 'name email');

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  res.json(event);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if user is the organizer
  if (event.organizer.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this event');
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(updatedEvent);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if user is the organizer
  if (event.organizer.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this event');
  }

  await event.remove();
  res.json({ message: 'Event removed' });
});

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if event is full
  if (event.registeredUsers.length >= event.capacity) {
    res.status(400);
    throw new Error('Event is full');
  }

  // Check if user is already registered
  if (event.registeredUsers.includes(req.user._id)) {
    res.status(400);
    throw new Error('User already registered for this event');
  }

  event.registeredUsers.push(req.user._id);
  await event.save();

  res.json({ message: 'Successfully registered for event' });
});

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent
}; 