const validateContactForm = (req, res, next) => {
  const { name, email, category, message } = req.body;
  
  if (!name || !email || !category || !message) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, category, and message are required'
    });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }
  
 
  next();
};

module.exports = { validateContactForm };