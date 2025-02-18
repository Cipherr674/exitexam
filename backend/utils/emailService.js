const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    },
    pool: true,
    rateLimit: true,
    maxConnections: 1,
    maxMessages: 5
  });
};

module.exports = { createTransporter }; 