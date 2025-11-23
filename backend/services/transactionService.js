const transactionRepository = require('../repositories/transactionRepository');

const transactionService = {
  createTransaction: async (data, userId) => {
    if (!data.name || !data.amount) {
      throw new Error('Name, email, and amount are required');
    }
    const transactionData = { ...data, userId };
    return await transactionRepository.create(transactionData);
  },

  getAllTransactions: async (userId, startDate, endDate, status) =>
    await transactionRepository.findAll(userId, startDate, endDate, status),

  getTransactionById: async (id, userId) =>
    await transactionRepository.findById(id, userId),

  updateTransaction: async (id, data, userId) =>
    await transactionRepository.update(id, data, userId),

  deleteTransaction: async (id, userId) =>
    await transactionRepository.delete(id, userId),

  getTransactionsByStatus: async (userId, status, startDate, endDate) => {
    return await transactionRepository.findByStatus(
      userId,
      status,
      startDate,
      endDate
    );
  },
};

module.exports = transactionService;
