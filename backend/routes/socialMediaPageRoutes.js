const express = require('express');
const router = express.Router();
const socialMediaController = require('../controllers/socialMediaPageController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, socialMediaController.getAllPages);
router.get('/:id', authMiddleware, socialMediaController.getPageById);
router.post('/', authMiddleware, socialMediaController.createPage);
router.put('/:id', authMiddleware, socialMediaController.updatePage);
router.delete('/:id', authMiddleware, socialMediaController.deletePage);

module.exports = router;
