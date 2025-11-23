const Lead = require('../models/Leads');

const leadRepository = {
  findAll: (userId) =>
    Lead.find({ userId }).populate('assignedTo', 'name email'),
  findById: (id, userId) =>
    Lead.findOne({ _id: id, userId }).populate('assignedTo', 'name email'),
  create: (data) => Lead.create(data),
  update: (id, data, userId) =>
    Lead.findOneAndUpdate({ _id: id, userId }, data, { new: true }),
  delete: (id, userId) => Lead.findOneAndDelete({ _id: id, userId }),
  countByStatus: (userId, statuses) => {
    const statusFilters = statuses.map((s) => ({
      status: { $regex: `^${s}$`, $options: 'i' },
    }));
    return Lead.countDocuments({ userId, $or: statusFilters });
  },
};

module.exports = leadRepository;
