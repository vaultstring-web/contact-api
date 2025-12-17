const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContactForm } = require('../middleware');

// Health check endpoint
router.get('/health', contactController.healthCheck);

// Contact form endpoint
router.post('/contact', validateContactForm, contactController.handleContactForm);

module.exports = router;