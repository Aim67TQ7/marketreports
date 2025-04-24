const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  focusAreas: [{
    type: String,
    trim: true
  }],
  timeframe: {
    type: String,
    enum: ['current', 'short-term', 'medium-term', 'long-term'],
    default: 'current'
  },
  depth: {
    type: String,
    enum: ['overview', 'standard', 'comprehensive', 'expert'],
    default: 'comprehensive'
  },
  visualizations: {
    type: Boolean,
    default: true
  },
  competitors: [{
    type: String,
    trim: true
  }],
  additionalNotes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'failed'],
    default: 'pending'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  results: {
    summary: String,
    sections: [{
      title: String,
      content: String
    }],
    visualizations: {
      marketSize: {
        years: [Number],
        values: [Number],
        cagr: Number
      },
      competitors: [{
        name: String,
        share: Number
      }],
      trends: [{
        name: String,
        data: [Number]
      }]
    }
  },
  pdfUrl: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
researchSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Research = mongoose.model('Research', researchSchema);

module.exports = Research;
