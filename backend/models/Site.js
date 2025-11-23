const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  signupSource: { type: String },
  converted: { type: Boolean },
  activities: [userActivitySchema],
});

const siteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [userSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Site', siteSchema);
