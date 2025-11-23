const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    title: String,
    location: String,
    about: String,
    language: String,
    timezone: String,
    photo: String,
    lastActive: Date,
    roleID: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamRole' },
    teamID: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
