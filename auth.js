// Authentication middleware
const jwt = require('jsonwebtoken');
const { ApiError } = require('./errors');
const User = require('../models/user.model');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Check if token exists in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return next(new ApiError('Not authorized to access this route', 401));
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Check if user still exists
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new ApiError('User not found', 401));
      }
      
      // Add user to request object
      req.user = {
        id: user._id,
        email: user.email,
        role: user.role
      };
      
      next();
    } catch (error) {
      return next(new ApiError('Not authorized to access this route', 401));
    }
  } catch (error) {
    next(error);
  }
};

// Authorize by role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(`User role ${req.user.role} is not authorized to access this route`, 403));
    }
    next();
  };
};
