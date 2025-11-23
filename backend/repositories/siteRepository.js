const Site = require('../models/Site');

const siteRepository = {
  findAll: (userId) => Site.find({ userId }),

  findById: (id, userId) => Site.findOne({ _id: id, userId }),

  create: (data) => Site.create(data),

  update: (id, data, userId) =>
    Site.findOneAndUpdate({ _id: id, userId }, data, { new: true }),

  updatePhoto: (userId, photoPath) =>
    User.findByIdAndUpdate(userId, { photo: photoPath }, { new: true }),

  delete: (id, userId) => Site.findOneAndDelete({ _id: id, userId }),
};

module.exports = siteRepository;
