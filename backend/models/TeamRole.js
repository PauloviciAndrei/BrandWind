const mongoose = require('mongoose');

const teamRoleSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamRole', teamRoleSchema);
