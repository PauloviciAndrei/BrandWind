const mongoose = require('mongoose');

const socialMediaPageSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  pageViews: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SocialMediaPage', socialMediaPageSchema);
