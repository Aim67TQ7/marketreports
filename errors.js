// Error handling utilities
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(err);

  // Handle mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new ApiError(message, 400);
  }

  // Handle mongoose duplicate key errors
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ApiError(message, 400);
  }

  // Handle mongoose cast errors
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ApiError(message, 404);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again.';
    error = new ApiError(message, 401);
  }

  // Handle JWT expired errors
  if (err.name === 'TokenExpiredError') {
    const message = 'Your token has expired. Please log in again.';
    error = new ApiError(message, 401);
  }

  // Send response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = {
  ApiError,
  errorHandler
};
