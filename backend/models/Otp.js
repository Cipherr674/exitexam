const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  otp: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // Automatically delete after 5 minutes (300 seconds)
  }
});


module.exports = mongoose.model('OTP', otpSchema); 