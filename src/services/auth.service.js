const Admin = require('../models/Admin');
const ApiError = require('../utils/ApiError');
const generateToken = require('../utils/generateToken');

const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    throw new ApiError(401, 'Invalid credentials');
  }

  if (!admin.isActive) {
    throw new ApiError(403, 'Account has been deactivated');
  }

  const isPasswordMatch = await admin.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken({ id: admin._id, role: admin.role });

  admin.password = undefined;

  return { admin, token };
};

const registerAdmin = async (adminData) => {
  const existing = await Admin.findOne({ email: adminData.email });
  if (existing) {
    throw new ApiError(400, 'Admin user already exists with this email');
  }

  const admin = await Admin.create(adminData);
  const token = generateToken({ id: admin._id, role: admin.role });
  
  admin.password = undefined;

  return { admin, token };
};

module.exports = {
  loginAdmin,
  registerAdmin,
};
