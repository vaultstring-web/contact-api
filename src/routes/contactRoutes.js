const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContactForm } = require('../middleware/validation');
const { verifyRecaptcha } = require('../middleware/recaptcha');

router.get('/health', contactController.healthCheck);


router.post('/contact', 
  validateContactForm,
  verifyRecaptcha,
  contactController.handleContactForm
);

module.exports = router;