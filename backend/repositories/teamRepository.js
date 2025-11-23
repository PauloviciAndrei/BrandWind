const Team = require('../models/Team');

const teamRepository = {
  findAll: () => Team.find(),
  findById: (id) => Team.findById(id),
  create: (data) => Team.create(data),
  update: (id, data) => Team.findByIdAndUpdate(id, data, { new: true }),
  delete: (id) => Team.findByIdAndDelete(id),
};

module.exports = teamRepository;
