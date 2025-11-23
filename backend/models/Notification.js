const moongose = require('mongoose');

const notificationSchema = new moongose.Schema(
  {
    message: { type: String, required: true },
    seen: { type: Boolean, default: false },
    userId: {
      type: moongose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: 'date', updatedAt: false } }
);

module.exports = moongose.model('Notification', notificationSchema);
