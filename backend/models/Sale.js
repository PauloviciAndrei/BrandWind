const moongose = require('mongoose');

const saleSchema = new moongose.Schema(
  {
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    category: String,
    country: String,
    store: { type: moongose.Schema.Types.ObjectId, ref: 'Store' },
  },
  { timestamps: true }
);

module.exports = moongose.model('Sale', saleSchema);
