const storeService = require('../services/storeService');

const storeController = {
  getStores: async (req, res) => {
    try {
      const stores = await storeService.getAllStores(req.user.id);
      res.json(stores);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getStoreById: async (req, res) => {
    try {
      const store = await storeService.getStoreById(req.params.id, req.user.id);
      if (!store) return res.status(404).json({ message: 'Store not found' });
      res.json(store);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createStore: async (req, res) => {
    try {
      const newStore = await storeService.createStore(req.body, req.user.id);
      res.status(201).json(newStore);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateStore: async (req, res) => {
    try {
      const updatedStore = await storeService.updateStore(
        req.params.id,
        req.body,
        req.user.id
      );
      if (!updatedStore)
        return res.status(404).json({ message: 'Store not found' });
      res.json(updatedStore);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteStore: async (req, res) => {
    try {
      const deletedStore = await storeService.deleteStore(
        req.params.id,
        req.user.id
      );
      if (!deletedStore)
        return res.status(404).json({ message: 'Store not found' });
      res.json({ message: 'Store deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = storeController;
