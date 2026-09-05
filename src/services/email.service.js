const nodemailer = require('nodemailer');
const env = require('../config/env');

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port == 465,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: env.smtp.from,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    // Silent fail/log so request lifecycle isn't broken if SMTP is unconfigured
    return null;
  }
};

module.exports = {
  sendEmail,
};
