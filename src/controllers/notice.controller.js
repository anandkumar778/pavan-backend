const Notice = require('../models/Notice');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createNotice = asyncHandler(async (req, res) => {
  let attachmentUrl = '';
  if (req.file) {
    attachmentUrl = `/uploads/${req.file.filename}`;
  }

  const notice = await Notice.create({
    ...req.body,
    attachmentUrl: attachmentUrl || req.body.attachmentUrl,
  });

  res.status(201).json(new ApiResponse(201, notice, 'Notice created successfully'));
});

const getActiveNotices = asyncHandler(async (req, res) => {
  const notices = await Notice.find({ isActive: true }).sort({ publishDate: -1 });
  res.status(200).json(new ApiResponse(200, notices, 'Active notices retrieved'));
});

const getAllNotices = asyncHandler(async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, notices, 'All notices retrieved'));
});

const updateNotice = asyncHandler(async (req, res) => {
  let updateData = { ...req.body };
  if (req.file) {
    updateData.attachmentUrl = `/uploads/${req.file.filename}`;
  }

  const notice = await Notice.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!notice) {
    throw new ApiError(404, 'Notice not found');
  }

  res.status(200).json(new ApiResponse(200, notice, 'Notice updated successfully'));
});

const deleteNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findByIdAndDelete(req.params.id);
  if (!notice) {
    throw new ApiError(404, 'Notice not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Notice deleted successfully'));
});

module.exports = {
  createNotice,
  getActiveNotices,
  getAllNotices,
  updateNotice,
  deleteNotice,
};
