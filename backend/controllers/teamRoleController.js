const teamRoleService = require('../services/teamRoleService');

const teamRoleController = {
  getRoles: async (req, res) => {
    try {
      const roles = await teamRoleService.getAllRoles();
      res.json(roles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getRoleById: async (req, res) => {
    try {
      const role = await teamRoleService.getRoleById(req.params.id);
      if (!role)
        return res.status(404).json({ message: 'Team role not found' });
      res.json(role);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createRole: async (req, res) => {
    try {
      const newRole = await teamRoleService.createRole(req.body);
      res.status(201).json(newRole);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateRole: async (req, res) => {
    try {
      const updatedRole = await teamRoleService.updateRole(
        req.params.id,
        req.body
      );
      if (!updatedRole)
        return res.status(404).json({ message: 'Team role not found' });
      res.json(updatedRole);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteRole: async (req, res) => {
    try {
      const deletedRole = await teamRoleService.deleteRole(req.params.id);
      if (!deletedRole)
        return res.status(404).json({ message: 'Team role not found' });
      res.json({ message: 'Team role deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = teamRoleController;
