const TeamRole = require('../models/TeamRole');

const teamRoleRepository = {
  findAll: () => TeamRole.find(),
  findById: (id) => TeamRole.findById(id),
  create: (data) => TeamRole.create(data),
  update: (id, data) => TeamRole.findByIdAndUpdate(id, data, { new: true }),
  delete: (id) => TeamRole.findByIdAndDelete(id),
};

module.exports = teamRoleRepository;
