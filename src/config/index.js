require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  email: {
    host: process.env.SMTP_HOST || 'server375',
    port: parseInt(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || 'contact@vaultstring.com',
    pass: process.env.SMTP_PASS,
    fromEmail: process.env.FROM_EMAIL || 'contact@vaultstring.com',
    toEmail: process.env.TO_EMAIL || 'vaultstring@gmail.com'
  },
  security: {
    allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
    credentials: true
  }
};