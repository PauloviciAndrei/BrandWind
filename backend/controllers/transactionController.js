const transactionService = require('../services/transactionService');

const transactionController = {
  getTransactions: async (req, res) => {
    try {
      const { startDate, endDate, status } = req.query;

      const transactions = await transactionService.getAllTransactions(
        req.user.id,
        startDate,
        endDate,
        status
      );

      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getTransactionById: async (req, res) => {
    try {
      const transaction = await transactionService.getTransactionById(
        req.params.id,
        req.user.id
      );
      if (!transaction)
        return res.status(404).json({ message: 'Transaction not found' });
      res.json(transaction);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createTransaction: async (req, res) => {
    try {
      const newTransaction = await transactionService.createTransaction(
        req.body,
        req.user.id
      );
      res.status(201).json(newTransaction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateTransaction: async (req, res) => {
    try {
      const updatedTransaction = await transactionService.updateTransaction(
        req.params.id,
        req.body,
        req.user.id
      );
      if (!updatedTransaction)
        return res.status(404).json({ message: 'Transaction not found' });
      res.json(updatedTransaction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const deletedTransaction = await transactionService.deleteTransaction(
        req.params.id,
        req.user.id
      );
      if (!deletedTransaction)
        return res.status(404).json({ message: 'Transaction not found' });
      res.json({ message: 'Transaction deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getPaidTransactions: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const transactions = await transactionService.getTransactionsByStatus(
        req.user.id,
        'paid',
        startDate,
        endDate
      );
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getPendingTransactions: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const transactions = await transactionService.getTransactionsByStatus(
        req.user.id,
        'pending',
        startDate,
        endDate
      );
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = transactionController;
