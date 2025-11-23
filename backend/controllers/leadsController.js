const leadService = require('../services/leadService');

const leadController = {
  getLeads: async (req, res) => {
    try {
      const leads = await leadService.getAllLeads(req.user.id);
      res.json(leads);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getLeadById: async (req, res) => {
    try {
      const lead = await leadService.getLeadById(req.params.id, req.user.id);
      if (!lead) return res.status(404).json({ message: 'Lead not found' });
      res.json(lead);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createLead: async (req, res) => {
    try {
      const newLead = await leadService.createLead(req.body, req.user.id);
      res.status(201).json(newLead);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateLead: async (req, res) => {
    try {
      const updatedLead = await leadService.updateLead(
        req.params.id,
        req.body,
        req.user.id
      );
      if (!updatedLead)
        return res.status(404).json({ message: 'Lead not found' });
      res.json(updatedLead);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteLead: async (req, res) => {
    try {
      const deletedLead = await leadService.deleteLead(
        req.params.id,
        req.user.id
      );
      if (!deletedLead)
        return res.status(404).json({ message: 'Lead not found' });
      res.json({ message: 'Lead deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getPendingLeads: async (req, res) => {
    try {
      const count = await leadService.getPendingLeads(req.user.id);
      res.json({ count });
    } catch (err) {
      console.error('getPendingLeads error:', err);
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = leadController;
