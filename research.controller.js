const Research = require('../models/research.model');
const { generateResearchReport } = require('../services/llm.service');
const { createPdf } = require('../services/pdf.service');
const { ApiError } = require('../utils/errors');

// Get all research projects for a user
exports.getAllResearch = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const research = await Research.find({ user: userId })
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

// Get a specific research project by ID
exports.getResearchById = async (req, res, next) => {
  try {
    const research = await Research.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!research) {
      return next(new ApiError('Research not found', 404));
    }
    
    res.status(200).json({
      success: true,
      data: research
    });
  } catch (error) {
    next(error);
  }
};

// Create a new research project
exports.createResearch = async (req, res, next) => {
  try {
    // Add user ID to request body
    req.body.user = req.user.id;
    
    // Create research entry
    const research = await Research.create(req.body);
    
    // Start the research process asynchronously
    startResearchProcess(research._id);
    
    res.status(201).json({
      success: true,
      data: research
    });
  } catch (error) {
    next(error);
  }
};

// Update a research project
exports.updateResearch = async (req, res, next) => {
  try {
    let research = await Research.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!research) {
      return next(new ApiError('Research not found', 404));
    }
    
    // Don't allow updates if research is already in progress or completed
    if (research.status !== 'pending') {
      return next(new ApiError('Cannot update research that is already in progress or completed', 400));
    }
    
    research = await Research.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: research
    });
  } catch (error) {
    next(error);
  }
};

// Delete a research project
exports.deleteResearch = async (req, res, next) => {
  try {
    const research = await Research.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!research) {
      return next(new ApiError('Research not found', 404));
    }
    
    await research.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// Get research results
exports.getResearchResults = async (req, res, next) => {
  try {
    const research = await Research.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!research) {
      return next(new ApiError('Research not found', 404));
    }
    
    if (research.status !== 'completed') {
      return next(new ApiError('Research results not available yet', 400));
    }
    
    res.status(200).json({
      success: true,
      data: research.results
    });
  } catch (error) {
    next(error);
  }
};

// Download research as PDF
exports.downloadResearchPdf = async (req, res, next) => {
  try {
    const research = await Research.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!research) {
      return next(new ApiError('Research not found', 404));
    }
    
    if (research.status !== 'completed') {
      return next(new ApiError('Research not completed yet', 400));
    }
    
    // If PDF already exists, return the URL
    if (research.pdfUrl) {
      return res.status(200).json({
        success: true,
        data: {
          pdfUrl: research.pdfUrl
        }
      });
    }
    
    // Generate PDF
    const pdfUrl = await createPdf(research);
    
    // Update research with PDF URL
    research.pdfUrl = pdfUrl;
    await research.save();
    
    res.status(200).json({
      success: true,
      data: {
        pdfUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to start the research process asynchronously
async function startResearchProcess(researchId) {
  try {
    // Get the research from database
    const research = await Research.findById(researchId);
    
    if (!research) {
      console.error(`Research with ID ${researchId} not found`);
      return;
    }
    
    // Update status to in-progress
    research.status = 'in-progress';
    research.progress = 10;
    await research.save();
    
    // Generate research report using LLM service
    const results = await generateResearchReport(research);
    
    // Update research with results
    research.results = results;
    research.status = 'completed';
    research.progress = 100;
    await research.save();
    
    // Generate PDF
    const pdfUrl = await createPdf(research);
    research.pdfUrl = pdfUrl;
    await research.save();
    
  } catch (error) {
    console.error(`Error processing research ${researchId}:`, error);
    
    // Update research status to failed
    try {
      await Research.findByIdAndUpdate(researchId, {
        status: 'failed',
        progress: 0
      });
    } catch (updateError) {
      console.error(`Error updating research status:`, updateError);
    }
  }
}
