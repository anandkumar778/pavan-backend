const Facility = require('../models/Facility');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createFacility = asyncHandler(async (req, res) => {
  // Support bulk creation if an array of facility items is sent
  if (Array.isArray(req.body)) {
    if (req.body.length === 0) {
      throw new ApiError(400, 'Please provide at least one facility item in the array.');
    }
    const facilities = await Facility.insertMany(req.body);
    return res.status(201).json(new ApiResponse(201, facilities, `${facilities.length} Facilities added successfully.`));
  }

  let image = req.body.image || '';
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  const title = req.body.title || 'School Facility';
  const description = req.body.description || 'Facility details and infrastructure.';

  const facility = await Facility.create({
    ...req.body,
    title,
    description,
    image: image || req.body.image || '',
  });

  res.status(201).json(new ApiResponse(201, facility, 'Facility created successfully.'));
});

const getActiveFacilities = asyncHandler(async (req, res) => {
  const facilities = await Facility.find({ isActive: true });
  res.status(200).json(new ApiResponse(200, facilities, 'Facilities retrieved successfully'));
});

const getFacilityById = asyncHandler(async (req, res) => {
  const facility = await Facility.findById(req.params.id);
  if (!facility) {
    throw new ApiError(404, 'Facility not found');
  }
  res.status(200).json(new ApiResponse(200, facility, 'Facility details retrieved'));
});

const updateFacility = asyncHandler(async (req, res) => {
  let updateData = { ...req.body };
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const facility = await Facility.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!facility) {
    throw new ApiError(404, 'Facility not found');
  }

  res.status(200).json(new ApiResponse(200, facility, 'Facility updated successfully'));
});

const deleteFacility = asyncHandler(async (req, res) => {
  const facility = await Facility.findByIdAndDelete(req.params.id);
  if (!facility) {
    throw new ApiError(404, 'Facility not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Facility deleted successfully'));
});

module.exports = {
  createFacility,
  getActiveFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
};
