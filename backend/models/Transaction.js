const moongose = require('mongoose');

const transactionSchema = moongose.Schema({
  photo: String,
  name: { type: String, required: true },
  email: String,
  location: String,
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: moongose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: String,
});

module.exports = moongose.model('Transaction', transactionSchema);
