const SocialMediaPage = require('../models/socialMediaPage');

const socialMediaRepository = {
  findAll: (userId) => SocialMediaPage.find({ userId }),

  findById: (id, userId) => SocialMediaPage.findOne({ _id: id, userId }),

  create: (data) => SocialMediaPage.create(data),

  update: (id, data, userId) =>
    SocialMediaPage.findOneAndUpdate({ _id: id, userId }, data, { new: true }),

  delete: (id, userId) => SocialMediaPage.findOneAndDelete({ _id: id, userId }),
};

module.exports = socialMediaRepository;
