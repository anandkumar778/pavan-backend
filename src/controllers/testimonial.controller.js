const Testimonial = require('../models/Testimonial');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createTestimonial = asyncHandler(async (req, res) => {
  if (Array.isArray(req.body)) {
    if (req.body.length === 0) {
      throw new ApiError(400, 'Please provide at least one testimonial item.');
    }
    const testimonials = await Testimonial.insertMany(req.body);
    return res.status(201).json(new ApiResponse(201, testimonials, `${testimonials.length} Testimonials added successfully.`));
  }

  let photo = req.body.photo || '';
  if (req.file) {
    photo = `/uploads/${req.file.filename}`;
  }

  const testimonial = await Testimonial.create({
    ...req.body,
    photo,
  });

  res.status(201).json(new ApiResponse(201, testimonial, 'Testimonial created successfully.'));
});

const getActiveTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, testimonials, 'Testimonials list retrieved'));
});

const updateTestimonial = asyncHandler(async (req, res) => {
  let updateData = { ...req.body };
  if (req.file) {
    updateData.photo = `/uploads/${req.file.filename}`;
  }

  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!testimonial) {
    throw new ApiError(404, 'Testimonial not found');
  }

  res.status(200).json(new ApiResponse(200, testimonial, 'Testimonial updated'));
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    throw new ApiError(404, 'Testimonial not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Testimonial deleted'));
});

module.exports = {
  createTestimonial,
  getActiveTestimonials,
  updateTestimonial,
  deleteTestimonial,
};
