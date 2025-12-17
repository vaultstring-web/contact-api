const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const contactRoutes = require('./routes/contactRoutes');
const { errorHandler, notFoundHandler } = require('./middleware');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.security.allowedOrigin,
  credentials: config.security.credentials
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', contactRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;