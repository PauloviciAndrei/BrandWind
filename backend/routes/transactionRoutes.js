const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, transactionController.getTransactions);
router.get(
  '/pending',
  authMiddleware,
  transactionController.getPendingTransactions
);
router.get('/paid', authMiddleware, transactionController.getPaidTransactions);
router.get('/:id', authMiddleware, transactionController.getTransactionById);
router.post('/', authMiddleware, transactionController.createTransaction);
router.put('/:id', authMiddleware, transactionController.updateTransaction);
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;
