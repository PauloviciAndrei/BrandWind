const Transaction = require('../models/Transaction');

const transactionRepository = {
  findAll: (userId, startDate, endDate, status) => {
    const filter = { userId };

    if (status) {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    return Transaction.find(filter);
  },
  findById: (id, userId) => Transaction.findOne({ _id: id, userId }),
  create: (data) => Transaction.create(data),
  update: (id, data, userId) =>
    Transaction.findOneAndUpdate({ _id: id, userId }, data, { new: true }),
  delete: (id, userId) => Transaction.findOneAndDelete({ _id: id, userId }),
  findByStatus: (userId, status, startDate, endDate) => {
    const filter = { userId, status };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    return Transaction.find(filter);
  },
};

module.exports = transactionRepository;
