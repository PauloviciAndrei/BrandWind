const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, saleController.getSales);
router.get('/total', authMiddleware, saleController.getTotalSales);
router.get('/chart-data', authMiddleware, saleController.getSalesChartData);
router.get(
  '/chart-data-count',
  authMiddleware,
  saleController.getSalesCountChartData
);
router.get(
  '/sales-by-category',
  authMiddleware,
  saleController.getSalesByCategory
);
router.get(
  '/sales-by-country',
  authMiddleware,
  saleController.getSalesByCountry
);
router.get('/:id', authMiddleware, saleController.getSaleById);
router.post('/', authMiddleware, saleController.createSale);
router.put('/:id', authMiddleware, saleController.updateSale);
router.delete('/:id', authMiddleware, saleController.deleteSale);

module.exports = router;
