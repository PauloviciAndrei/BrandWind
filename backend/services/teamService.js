const teamRepository = require('../repositories/teamRepository');

const teamService = {
  createTeam: async (data) => {
    return await teamRepository.create(data);
  },

  getAllTeams: async () => await teamRepository.findAll(),
  getTeamById: async (id) => await teamRepository.findById(id),
  updateTeam: async (id, data) => await teamRepository.update(id, data),
  deleteTeam: async (id) => await teamRepository.delete(id),
};

module.exports = teamService;
