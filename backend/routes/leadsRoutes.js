const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, leadController.getLeads);
router.get('/pending', authMiddleware, leadController.getPendingLeads);
router.get('/:id', authMiddleware, leadController.getLeadById);
router.post('/', authMiddleware, leadController.createLead);
router.put('/:id', authMiddleware, leadController.updateLead);
router.delete('/:id', authMiddleware, leadController.deleteLead);

module.exports = router;
