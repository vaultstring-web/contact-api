const nodemailer = require('nodemailer');
const config = require('../config');
const { adminEmailTemplate, userConfirmationTemplate } = require('../utils/templates');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendContactEmail(formData) {
    const { name, email, company, phone, category, message } = formData;
    
    // Prepare admin email
    const adminTemplate = adminEmailTemplate(formData);
    const adminMailOptions = {
      from: config.email.fromEmail,
      to: config.email.toEmail,
      subject: adminTemplate.subject,
      html: adminTemplate.html,
      text: adminTemplate.text
    };
    
    // Prepare user confirmation email
    const userTemplate = userConfirmationTemplate(formData);
    const userMailOptions = {
      from: config.email.fromEmail,
      to: email,
      subject: userTemplate.subject,
      html: userTemplate.html
    };
    
    // Send both emails
    const [adminResult, userResult] = await Promise.all([
      this.transporter.sendMail(adminMailOptions),
      this.transporter.sendMail(userMailOptions)
    ]);
    
    return {
      admin: adminResult.messageId,
      user: userResult.messageId
    };
  }

  testConnection() {
    return this.transporter.verify();
  }
}

module.exports = new EmailService();