const saleService = require('../services/saleService');

const saleController = {
  getSales: async (req, res) => {
    try {
      const sales = await saleService.getAllSales(req.user.id);
      res.json(sales);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSaleById: async (req, res) => {
    try {
      const sale = await saleService.getSaleById(req.params.id, req.user.id);
      if (!sale) return res.status(404).json({ message: 'Sale not found' });
      res.json(sale);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createSale: async (req, res) => {
    try {
      const newSale = await saleService.createSale(req.body, req.user.id);
      res.status(201).json(newSale);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateSale: async (req, res) => {
    try {
      const updatedSale = await saleService.updateSale(
        req.params.id,
        req.body,
        req.user.id
      );
      if (!updatedSale)
        return res.status(404).json({ message: 'Sale not found' });
      res.json(updatedSale);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteSale: async (req, res) => {
    try {
      const deletedSale = await saleService.deleteSale(
        req.params.id,
        req.user.id
      );
      if (!deletedSale)
        return res.status(404).json({ message: 'Sale not found' });
      res.json({ message: 'Sale deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getTotalSales: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const total = await saleService.getTotalSales(
        req.user.id,
        startDate,
        endDate
      );
      res.json({ total });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSalesChartData: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const data = await saleService.getSalesChartData(
        req.user.id,
        startDate,
        endDate
      );

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSalesByCategory: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const salesByCategory = await saleService.getSalesByCategory(
        req.user.id,
        startDate,
        endDate
      );
      res.json(salesByCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSalesByCountry: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const salesByCountry = await saleService.getSalesByCountry(
        req.user.id,
        startDate,
        endDate
      );
      res.json(salesByCountry);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSalesCountChartData: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const data = await saleService.getSalesCountChartData(
        req.user.id,
        startDate,
        endDate
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = saleController;
