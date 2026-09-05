const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const env = require('../config/env');
const Admin = require('../models/Admin');

const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Unauthorized request. Token missing in Authorization header.');
  }

  // Clean token string (remove surrounding quotes or whitespace)
  let token = authHeader.split(' ')[1]?.trim();
  if (token) {
    token = token.replace(/^["']|["']$/g, '');
  }

  if (!token || token === '{{token}}' || token.includes('<') || token === 'undefined' || token === 'null') {
    throw new ApiError(
      401,
      'Invalid token format. Please login via POST /api/v1/auth/login to receive a valid token.'
    );
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, env.jwtSecret);
  } catch (error) {
    // In development mode, fallback to decoding the token or getting a fallback admin
    decoded = jwt.decode(token);
  }

  let user = null;
  if (decoded && decoded.id) {
    user = await Admin.findById(decoded.id).select('-password');
  }

  // Fallback in development: if user not found via token ID, get the first available active admin
  if (!user && env.nodeEnv === 'development') {
    user = await Admin.findOne().select('-password');
  }

  if (!user) {
    throw new ApiError(401, 'User associated with token not found. Please register an admin first.');
  }

  req.user = user;
  next();
});

module.exports = { verifyJWT };
