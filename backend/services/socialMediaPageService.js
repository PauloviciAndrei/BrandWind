const socialMediaRepository = require('../repositories/socialMediaPageRepository');

const socialMediaService = {
  getAllPages: (userId) => socialMediaRepository.findAll(userId),

  getPageById: (id, userId) => socialMediaRepository.findById(id, userId),

  createPage: (data) => socialMediaRepository.create(data),

  updatePage: (id, data, userId) =>
    socialMediaRepository.update(id, data, userId),

  deletePage: (id, userId) => socialMediaRepository.delete(id, userId),
};

module.exports = socialMediaService;
