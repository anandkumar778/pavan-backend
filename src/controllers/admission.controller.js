const Admission = require('../models/Admission');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { createAdmissionApplication } = require('../services/admission.service');
const { sendAdmissionConfirmation } = require('../services/notification.service');

const submitAdmission = asyncHandler(async (req, res) => {
  let documents = [];
  if (req.files && req.files.length > 0) {
    documents = req.files.map((file) => ({
      name: file.originalname,
      url: `/uploads/${file.filename}`,
    }));
  }

  const admission = await createAdmissionApplication({
    ...req.body,
    documents,
  });

  // Attempt async email confirmation
  sendAdmissionConfirmation(admission).catch(console.error);

  res.status(201).json(new ApiResponse(201, admission, 'Admission application submitted successfully'));
});

const getAllAdmissions = asyncHandler(async (req, res) => {
  const admissions = await Admission.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, admissions, 'Admissions retrieved successfully'));
});

const getAdmissionById = asyncHandler(async (req, res) => {
  const admission = await Admission.findById(req.params.id);
  if (!admission) {
    throw new ApiError(404, 'Admission record not found');
  }
  res.status(200).json(new ApiResponse(200, admission, 'Admission details retrieved'));
});

const updateAdmissionStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;
  const admission = await Admission.findById(req.params.id);

  if (!admission) {
    throw new ApiError(404, 'Admission record not found');
  }

  if (status) admission.status = status;
  if (notes) admission.notes = notes;

  await admission.save();
  res.status(200).json(new ApiResponse(200, admission, 'Admission status updated'));
});

module.exports = {
  submitAdmission,
  getAllAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
};
