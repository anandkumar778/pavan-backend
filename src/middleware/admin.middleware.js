const ApiError = require('../utils/ApiError');

const requireAdmin = (roles = ['superadmin', 'admin']) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'Access denied. Insufficient permissions.');
    }

    next();
  };
};

module.exports = { requireAdmin };
