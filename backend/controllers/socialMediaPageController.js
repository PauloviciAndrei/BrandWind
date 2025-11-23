const socialMediaService = require('../services/socialMediaPageService');

const socialMediaController = {
  getAllPages: async (req, res) => {
    try {
      const pages = await socialMediaService.getAllPages(req.user.id);
      res.json(pages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getPageById: async (req, res) => {
    try {
      const page = await socialMediaService.getPageById(
        req.params.id,
        req.user.id
      );
      if (!page) return res.status(404).json({ message: 'Page not found' });
      res.json(page);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createPage: async (req, res) => {
    try {
      const data = { ...req.body, userId: req.user.id };
      const page = await socialMediaService.createPage(data);
      res.status(201).json(page);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updatePage: async (req, res) => {
    try {
      const page = await socialMediaService.updatePage(
        req.params.id,
        req.body,
        req.user.id
      );
      if (!page)
        return res
          .status(404)
          .json({ message: 'Page not found or not authorized' });
      res.json(page);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deletePage: async (req, res) => {
    try {
      const page = await socialMediaService.deletePage(
        req.params.id,
        req.user.id
      );
      if (!page)
        return res
          .status(404)
          .json({ message: 'Page not found or not authorized' });
      res.json({ message: 'Page deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = socialMediaController;
