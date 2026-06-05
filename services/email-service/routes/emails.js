const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Configure the SMTP transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: process.env.SMTP_PORT || 2525,
  auth: {
    user: process.env.SMTP_USER || 'your_mailtrap_user',
    pass: process.env.SMTP_PASS || 'your_mailtrap_pass'
  }
});

// Endpoint to send an email
router.post('/send', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ message: 'Missing required email fields (to, subject, text/html)' });
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Hotella Admin" <no-reply@hotella.com>',
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);

    res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

module.exports = router;