const saleRepository = require('../repositories/saleRepository');

const saleService = {
  createSale: async (data, userId) => {
    if (!data.amount || !data.category) {
      throw new Error('Amount and category are required');
    }
    const saleData = { ...data, userId };
    return await saleRepository.create(saleData);
  },

  getAllSales: async (userId) => await saleRepository.findAll(userId),

  getSaleById: async (id, userId) => await saleRepository.findById(id, userId),

  updateSale: async (id, data, userId) =>
    await saleRepository.update(id, data, userId),

  deleteSale: async (id, userId) => await saleRepository.delete(id, userId),

  getTotalSales: async (userId, startDate, endDate) => {
    const result = await saleRepository.aggregateTotal(
      userId,
      startDate,
      endDate
    );
    return result[0]?.total || 0;
  },

  getSalesChartData: async (userId, startDate, endDate) => {
    const result = await saleRepository.aggregateSalesByStoreAndMonth(
      userId,
      startDate,
      endDate
    );

    return result;
  },

  getSalesByCategory: async (userId, startDate, endDate) => {
    return await saleRepository.aggregateSalesByCategory(
      userId,
      startDate,
      endDate
    );
  },

  getSalesByCountry: async (userId, startDate, endDate) => {
    return await saleRepository.aggregateSalesByCountry(
      userId,
      startDate,
      endDate
    );
  },

  getSalesCountChartData: async (userId, startDate, endDate) => {
    return await saleRepository.aggregateSalesCountByStoreAndMonth(
      userId,
      startDate,
      endDate
    );
  },
};

module.exports = saleService;
