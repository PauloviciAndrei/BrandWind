const teamService = require('../services/teamService');

const teamController = {
  getTeams: async (req, res) => {
    try {
      const Teams = await teamService.getAllTeams();
      res.json(Teams);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getTeamById: async (req, res) => {
    try {
      const Team = await teamService.getTeamById(req.params.id);
      if (!Team) return res.status(404).json({ message: 'Team not found' });
      res.json(Team);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createTeam: async (req, res) => {
    try {
      const newTeam = await teamService.createTeam(req.body);
      res.status(201).json(newTeam);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateTeam: async (req, res) => {
    try {
      const updatedTeam = await teamService.updateTeam(req.params.id, req.body);
      if (!updatedTeam)
        return res.status(404).json({ message: 'Team not found' });
      res.json(updatedTeam);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteTeam: async (req, res) => {
    try {
      const deletedTeam = await teamService.deleteTeam(req.params.id);
      if (!deletedTeam)
        return res.status(404).json({ message: 'Team not found' });
      res.json({ message: 'Team deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = teamController;
