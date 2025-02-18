const express = require('express');
const router = express.Router();
const OTP = require('../models/Otp');
const rateLimit = require('express-rate-limit');



module.exports = (transporter) => {

  router.post('/send-otp', async (req, res) => {
    try {
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Save OTP to database
      await OTP.findOneAndUpdate(
        { email },
        { otp, createdAt: Date.now() },
        { upsert: true, new: true }
      );

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Your Verification Code</h2>
            <p>Use the following code to verify your email:</p>
            <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">
              ${otp}
            </div>
            <p>This code will expire in 5 minutes.</p>
          </div>
        `
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  });

  
  router.post('/verify-otp', async (req, res) => {
    try {
      const { email, otp } = req.body;
      const validOTP = await OTP.findOneAndDelete({ email, otp });

      if (!validOTP) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }

      // Check if OTP is expired
      if (Date.now() - validOTP.createdAt > 5 * 60 * 1000) {
        return res.status(400).json({ success: false, message: 'OTP expired' });
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({ message: 'Verification failed' });
    }
  });

  return router;
};
