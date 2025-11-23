const leadRepository = require('../repositories/leadRepository');

const leadService = {
  createLead: async (data, userId) => {
    if (!data.firstName || !data.lastName || !data.email) {
      throw new Error('First name, last name, and email are required');
    }
    const leadData = { ...data, userId };
    return await leadRepository.create(leadData);
  },

  getAllLeads: async (userId) => await leadRepository.findAll(userId),

  getLeadById: async (id, userId) => await leadRepository.findById(id, userId),

  updateLead: async (id, data, userId) =>
    await leadRepository.update(id, data, userId),

  deleteLead: async (id, userId) => await leadRepository.delete(id, userId),

  getPendingLeads: async (userId) =>
    await leadRepository.countByStatus(userId, ['In Progress', 'Open']),
};

module.exports = leadService;
