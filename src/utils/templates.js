const adminEmailTemplate = (data) => {
  const { name, email, company, phone, category, message } = data;
  
  return {
    subject: `New Contact Form: ${category} - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 12px; border: 1px solid #ddd;">
              <a href="mailto:${email}">${email}</a>
            </td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Company:</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${company || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${phone || 'Not provided'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Category:</td>
            <td style="padding: 12px; border: 1px solid #ddd;">
              <span style="background-color: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px;">
                ${category}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 12px; border: 1px solid #ddd; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p>Submitted: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}
Category: ${category}

Message:
${message}

Submitted: ${new Date().toLocaleString()}
    `
  };
};

const userConfirmationTemplate = (data) => {
  const { name, email, category, message } = data;
  
  return {
    subject: 'Thank you for contacting VaultString',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4CAF50;">✓ Message Received</h1>
        </div>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for contacting <strong>VaultString</strong>. We have received your inquiry regarding <strong>${category}</strong>.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
          <p style="margin: 0; font-style: italic;">"${message.substring(0, 150)}${message.length > 150 ? '...' : ''}"</p>
        </div>
        
        <p>Our team will review your message and respond within <strong>24-48 hours</strong>.</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p><strong>VaultString Support Team</strong></p>
          <p>Email: vaultstring@gmail.com</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    `
  };
};

module.exports = { adminEmailTemplate, userConfirmationTemplate };