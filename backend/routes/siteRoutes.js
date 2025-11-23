const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, siteController.getAllSites);
router.get(
  '/conversion-rate',
  authMiddleware,
  siteController.getConversionRate
);
router.get('/active-users', authMiddleware, siteController.getActiveUsers);
router.get(
  '/active-users-range',
  authMiddleware,
  siteController.getActiveUsersInRange
);
router.get('/:id', authMiddleware, siteController.getSiteById);
router.post('/', authMiddleware, siteController.createSite);
router.put('/:id', authMiddleware, siteController.updateSite);
router.delete('/:id', authMiddleware, siteController.deleteSite);

module.exports = router;
