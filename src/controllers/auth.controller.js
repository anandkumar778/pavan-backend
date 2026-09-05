const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/auth.service');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { admin, token } = await authService.loginAdmin(email, password);

  res.status(200).json(
    new ApiResponse(200, { user: admin, token }, 'Logged in successfully')
  );
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const { admin, token } = await authService.registerAdmin({ name, email, password, role });

  res.status(201).json(
    new ApiResponse(201, { user: admin, token }, 'Admin registered successfully')
  );
});

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { user: req.user }, 'Profile retrieved successfully')
  );
});

module.exports = {
  login,
  register,
  getProfile,
};
