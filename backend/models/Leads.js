const moongose = require('mongoose');

const leadsSchema = new moongose.Schema(
  {
    email: { type: String },
    photo: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: String,
    assignedTo: String,
    userId: {
      type: moongose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = moongose.model('Leads', leadsSchema);
