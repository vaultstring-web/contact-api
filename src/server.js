const app = require('./app');
const config = require('./config');
const emailService = require('./services/emailService');

const PORT = config.server.port;

// Test email connection on startup
emailService.testConnection()
  .then(() => {
    console.log('✅ Email service connected successfully');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`✅ Contact API server running on port ${PORT}`);
      console.log(`📧 SMTP configured for: ${config.email.user}`);
      console.log(`🌐 Allowed origin: ${config.security.allowedOrigin}`);
      console.log(`🚀 Environment: ${config.server.nodeEnv}`);
    });
  })
  .catch(error => {
    console.error('❌ Email service connection failed:', error.message);
    console.error('Please check your SMTP configuration in .env file');
    process.exit(1);
  });

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});