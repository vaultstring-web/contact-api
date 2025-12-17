const config = require('../config');
const axios = require('axios');

/**
 * Middleware to verify reCAPTCHA token
 */
const verifyRecaptcha = async (req, res, next) => {
  try {
    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: 'Security verification required. Please refresh and try again.'
      });
    }

    // Verify with Google's reCAPTCHA API
    const verificationUrl = `${config.recaptcha.apiUrl}?secret=${config.recaptcha.secretKey}&response=${recaptchaToken}`;
    
    const response = await axios.post(verificationUrl);

    const { success, score, action, 'error-codes': errorCodes } = response.data;

    console.log('reCAPTCHA Verification:', {
      success,
      score,
      action,
      clientIp: req.ip,
      timestamp: new Date().toISOString()
    });

    if (!success) {
      console.error('reCAPTCHA failed:', errorCodes);
      return res.status(400).json({
        success: false,
        message: 'Security verification failed. Please try again.',
        error: 'Invalid reCAPTCHA token'
      });
    }

    // For reCAPTCHA v3, check score threshold
    if (score !== undefined && score < config.recaptcha.scoreThreshold) {
      console.warn(`reCAPTCHA score too low: ${score} (threshold: ${config.recaptcha.scoreThreshold})`);
      return res.status(400).json({
        success: false,
        message: 'Security verification failed. Please try again.',
        error: 'Low reCAPTCHA score'
      });
    }

    // Check action if needed
    if (action && action !== 'contact') {
      console.warn(`reCAPTCHA action mismatch: ${action} (expected: contact)`);
    }

    // Remove token from body to avoid storing it
    delete req.body.recaptchaToken;
    
    next();
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Security verification service unavailable. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { verifyRecaptcha };