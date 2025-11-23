const Store = require('../models/Store');
const Sale = require('../models/Sale');

const storeRepository = {
  findAll: (userId) => Store.find({ userId }),
  findById: async (id, userId) => {
    const store = await Store.findOne({ _id: id, userId });
    if (!store) return null;
    const sales = await Sale.find({ store: store._id, userId });
    return { ...store.toObject(), sales };
  },
  create: (data) => Store.create(data),
  update: (id, data, userId) =>
    Store.findOneAndUpdate({ _id: id, userId }, data, { new: true }),
  delete: (id, userId) => Store.findOneAndDelete({ _id: id, userId }),
};

module.exports = storeRepository;
