const Inquiry = require('../models/Inquiry');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.create(req.body);
  res.status(201).json(new ApiResponse(201, inquiry, 'Inquiry submitted successfully'));
});

const getAllInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, inquiries, 'Inquiries retrieved'));
});

const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) {
    throw new ApiError(404, 'Inquiry not found');
  }

  inquiry.status = status;
  await inquiry.save();
  res.status(200).json(new ApiResponse(200, inquiry, 'Inquiry status updated'));
});

const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) {
    throw new ApiError(404, 'Inquiry not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Inquiry deleted'));
});

module.exports = {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
};
