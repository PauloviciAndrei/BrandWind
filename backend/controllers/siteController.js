const siteService = require('../services/siteService');

const siteController = {
  getAllSites: async (req, res) => {
    try {
      const sites = await siteService.getAllSites(req.user.id);
      res.json(sites);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSiteById: async (req, res) => {
    try {
      const site = await siteService.getSiteById(req.params.id, req.user.id);
      if (!site) return res.status(404).json({ message: 'Site not found' });
      res.json(site);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createSite: async (req, res) => {
    try {
      const site = await siteService.createSite(req.body, req.user.id);
      res.status(201).json(site);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateSite: async (req, res) => {
    try {
      const site = await siteService.updateSite(
        req.params.id,
        req.body,
        req.user.id
      );
      if (!site) return res.status(404).json({ message: 'Site not found' });
      res.json(site);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteSite: async (req, res) => {
    try {
      const site = await siteService.deleteSite(req.params.id, req.user.id);
      if (!site) return res.status(404).json({ message: 'Site not found' });
      res.json({ message: 'Site deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getConversionRate(req, res) {
    try {
      const data = await siteService.getConversionRate(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getActiveUsers(req, res) {
    try {
      const data = await siteService.getActiveUsers(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getActiveUsersInRange(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({ message: 'startDate and endDate are required' });
      }

      const data = await siteService.getActiveUsersInRange(
        req.user.id,
        startDate,
        endDate
      );
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = siteController;
