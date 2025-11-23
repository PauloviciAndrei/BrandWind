const express = require('express');
const router = express.Router();
const teamRoleController = require('../controllers/teamRoleController');

router.get('/', teamRoleController.getRoles);
router.get('/:id', teamRoleController.getRoleById);
router.post('/', teamRoleController.createRole);
router.put('/:id', teamRoleController.updateRole);
router.delete('/:id', teamRoleController.deleteRole);

module.exports = router;
