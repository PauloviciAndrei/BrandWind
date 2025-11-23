const storeRepository = require('../repositories/storeRepository');
const saleRepository = require('../repositories/saleRepository');

const storeService = {
  createStore: async (data, userId) => {
    if (!data.name) throw new Error('Store name is required');
    const storeData = { ...data, userId };
    return await storeRepository.create(storeData);
  },

  getAllStores: async (userId) => await storeRepository.findAll(userId),

  getStoreById: async (id, userId) =>
    await storeRepository.findById(id, userId),

  updateStore: async (id, data, userId) =>
    await storeRepository.update(id, data, userId),

  deleteStore: async (id, userId) => {
    await saleRepository.deleteByStore({ store: id });
    return await storeRepository.delete(id, userId);
  },
};

module.exports = storeService;
