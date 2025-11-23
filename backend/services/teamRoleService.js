const teamRoleRepository = require('../repositories/teamRoleRepository');

const teamRoleService = {
  createRole: async (data) => {
    if (!data.role) {
      throw new Error('Role name is required');
    }
    return await teamRoleRepository.create(data);
  },

  getAllRoles: async () => await teamRoleRepository.findAll(),
  getRoleById: async (id) => await teamRoleRepository.findById(id),
  updateRole: async (id, data) => await teamRoleRepository.update(id, data),
  deleteRole: async (id) => await teamRoleRepository.delete(id),
};

module.exports = teamRoleService;
