const Faculty = require('../models/Faculty');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createFaculty = asyncHandler(async (req, res) => {
  // Support bulk creation if an array of faculty members is sent
  if (Array.isArray(req.body)) {
    if (req.body.length === 0) {
      throw new ApiError(400, 'Please provide at least one faculty member in the array.');
    }
    const facultyList = await Faculty.insertMany(req.body);
    return res.status(201).json(new ApiResponse(201, facultyList, `${facultyList.length} Faculty members added successfully.`));
  }

  let image = req.body.image || '';
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  const faculty = await Faculty.create({
    ...req.body,
    image,
  });

  res.status(201).json(new ApiResponse(201, faculty, 'Faculty member added successfully.'));
});

const getFacultyList = asyncHandler(async (req, res) => {
  const list = await Faculty.find({ isActive: true }).sort({ displayOrder: 1, name: 1 });
  res.status(200).json(new ApiResponse(200, list, 'Faculty list retrieved'));
});

const getFacultyById = asyncHandler(async (req, res) => {
  const faculty = await Faculty.findById(req.params.id);
  if (!faculty) {
    throw new ApiError(404, 'Faculty member not found');
  }
  res.status(200).json(new ApiResponse(200, faculty, 'Faculty member details retrieved'));
});

const updateFaculty = asyncHandler(async (req, res) => {
  let updateData = { ...req.body };
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const faculty = await Faculty.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!faculty) {
    throw new ApiError(404, 'Faculty member not found');
  }

  res.status(200).json(new ApiResponse(200, faculty, 'Faculty updated successfully'));
});

const deleteFaculty = asyncHandler(async (req, res) => {
  const faculty = await Faculty.findByIdAndDelete(req.params.id);
  if (!faculty) {
    throw new ApiError(404, 'Faculty member not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Faculty member deleted'));
});

module.exports = {
  createFaculty,
  getFacultyList,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
