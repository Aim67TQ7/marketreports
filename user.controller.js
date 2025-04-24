const User = require('../models/user.model');
const { ApiError } = require('../utils/errors');

// Register a new user
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError('User with this email already exists', 400));
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });
    
    // Generate token
    const token = user.generateAuthToken();
    
    // Remove password from response
    user.password = undefined;
    
    res.status(201).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError('Invalid credentials', 401));
    }
    
    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ApiError('Invalid credentials', 401));
    }
    
    // Generate token
    const token = user.generateAuthToken();
    
    // Remove password from response
    user.password = undefined;
    
    res.status(200).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return next(new ApiError('User not found', 404));
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    // Don't allow password updates through this route
    if (req.body.password) {
      delete req.body.password;
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Get user's research history
exports.getUserResearch = async (req, res, next) => {
  try {
    const Research = require('../models/research.model');
    
    const research = await Research.find({ user: req.user.id })
      .select('-results') // Exclude large results data
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: research.length,
      data: research
    });
  } catch (error) {
    next(error);
  }
};
