const Admin = require('../models/Admin');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().select('-password');
  res.status(200).json(new ApiResponse(200, admins, 'Admins retrieved successfully'));
});

const updateAdminStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive, role } = req.body;

  const admin = await Admin.findById(id);
  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  if (isActive !== undefined) admin.isActive = isActive;
  if (role) admin.role = role;

  await admin.save();
  res.status(200).json(new ApiResponse(200, admin, 'Admin updated successfully'));
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findByIdAndDelete(id);
  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Admin deleted successfully'));
});

module.exports = {
  getAllAdmins,
  updateAdminStatus,
  deleteAdmin,
};
