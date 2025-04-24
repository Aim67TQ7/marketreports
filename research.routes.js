const express = require('express');
const router = express.Router();
const researchController = require('../controllers/research.controller');

// Get all research projects
router.get('/', researchController.getAllResearch);

// Get a specific research project by ID
router.get('/:id', researchController.getResearchById);

// Create a new research project
router.post('/', researchController.createResearch);

// Update a research project
router.put('/:id', researchController.updateResearch);

// Delete a research project
router.delete('/:id', researchController.deleteResearch);

// Get research results
router.get('/:id/results', researchController.getResearchResults);

// Download research as PDF
router.get('/:id/download', researchController.downloadResearchPdf);

module.exports = router;
