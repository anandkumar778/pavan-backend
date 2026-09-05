const Event = require('../models/Event');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createEvent = asyncHandler(async (req, res) => {
  let bannerImage = '';
  if (req.file) {
    bannerImage = `/uploads/${req.file.filename}`;
  }

  const event = await Event.create({
    ...req.body,
    bannerImage: bannerImage || req.body.bannerImage,
  });

  res.status(201).json(new ApiResponse(201, event, 'Event created successfully'));
});

const getActiveEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ isActive: true }).sort({ eventDate: 1 });
  res.status(200).json(new ApiResponse(200, events, 'Events list retrieved'));
});

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ eventDate: -1 });
  res.status(200).json(new ApiResponse(200, events, 'All events retrieved'));
});

const updateEvent = asyncHandler(async (req, res) => {
  let updateData = { ...req.body };
  if (req.file) {
    updateData.bannerImage = `/uploads/${req.file.filename}`;
  }

  const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!event) {
    throw new ApiError(404, 'Event not found');
  }
  res.status(200).json(new ApiResponse(200, event, 'Event updated successfully'));
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    throw new ApiError(404, 'Event not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Event deleted successfully'));
});

module.exports = {
  createEvent,
  getActiveEvents,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
