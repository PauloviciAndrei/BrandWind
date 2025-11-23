const Sale = require('../models/Sale');

const buildMatchStage = (userId, startDate, endDate) => {
  const match = { 'store.userId': userId };
  let start, end;

  if (startDate || endDate) {
    match.date = {};
    if (startDate) {
      start = new Date(startDate);
      start.setUTCHours(0, 0, 0, 0);
      match.date.$gte = start;
    }
    if (endDate) {
      end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999);
      match.date.$lte = end;
    }
  }

  return { $match: match };
};

const saleRepository = {
  findAll: (userId) =>
    Sale.aggregate([
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      { $unwind: '$store' },
      { $match: { 'store.userId': userId } },
      { $project: { store: { name: 1 }, amount: 1, category: 1, date: 1 } },
    ]),

  findById: (id, userId) =>
    Sale.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      { $unwind: '$store' },
      { $match: { 'store.userId': userId } },
      { $project: { store: { name: 1 }, amount: 1, category: 1, date: 1 } },
    ]),

  create: (data) => Sale.create(data),

  update: async (id, data, userId) => {
    const sale = await Sale.findById(id).populate('store', 'userId');
    if (!sale) return null;

    if (sale.store.userId.toString() !== userId.toString()) {
      return null;
    }
    Object.assign(sale, data);
    return await sale.save();
  },

  delete: async (id, userId) => {
    const sale = await Sale.findById(id).populate('store', 'userId');
    if (!sale) return null;

    if (sale.store.userId.toString() !== userId.toString()) {
      return null;
    }

    return await Sale.findByIdAndDelete(id);
  },

  deleteByStore: ({ store: id }) => Sale.deleteMany({ store: id }),

  aggregateTotal: (userId, startDate, endDate) => {
    const matchStage = buildMatchStage(userId, startDate, endDate);

    return Sale.aggregate([
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      { $unwind: '$store' },
      matchStage,
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);
  },

  aggregateSalesByStoreAndMonth: (userId, startDate, endDate) => {
    const matchStage = buildMatchStage(userId, startDate, endDate);

    return Sale.aggregate([
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      { $unwind: '$store' },
      matchStage,
      {
        $group: {
          _id: {
            store: '$store.name',
            month: { $month: '$date' },
            year: { $year: '$date' },
          },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          store: '$_id.store',
          month: '$_id.month',
          year: '$_id.year',
          totalAmount: 1,
        },
      },
      { $sort: { year: 1, month: 1, store: 1 } },
    ]);
  },

  aggregateSalesByCategory: (userId, startDate, endDate) => {
    const matchStage = buildMatchStage(userId, startDate, endDate);

    return Sale.aggregate([
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      { $unwind: '$store' },
      matchStage,
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1,
        },
      },
    ]);
  },

  aggregateSalesByCountry: (userId, startDate, endDate) =>
    Sale.aggregate([
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      { $unwind: '$store' },
      buildMatchStage(userId, startDate, endDate),
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          country: '$_id',
          count: 1,
        },
      },
    ]),

  aggregateSalesCountByStoreAndMonth: (userId, startDate, endDate) =>
    Sale.aggregate([
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      { $unwind: '$store' },
      buildMatchStage(userId, startDate, endDate),
      {
        $group: {
          _id: {
            store: '$store.name',
            month: { $month: '$date' },
            year: { $year: '$date' },
          },
          salesCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          store: '$_id.store',
          month: '$_id.month',
          year: '$_id.year',
          salesCount: 1,
        },
      },
      { $sort: { year: 1, month: 1, store: 1 } },
    ]),
};

module.exports = saleRepository;
