const emailService = require('../services/emailService');

const contactController = {
  async handleContactForm(req, res) {
    try {
      const formData = req.body;
      
      // Send emails
      const emailResults = await emailService.sendContactEmail(formData);
      
      console.log('Emails sent successfully:', emailResults);
      
      res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully. A confirmation has been sent to your email.',
        data: {
          name: formData.name,
          email: formData.email,
          category: formData.category,
          submittedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  healthCheck(req, res) {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Contact API'
    });
  }
};

module.exports = contactController;