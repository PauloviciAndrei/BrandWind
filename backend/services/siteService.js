const siteRepository = require('../repositories/siteRepository');

const siteService = {
  getAllSites: async (userId) => {
    return await siteRepository.findAll(userId);
  },

  getSiteById: async (id, userId) => {
    return await siteRepository.findById(id, userId);
  },

  createSite: async (data, userId) => {
    const newSite = { ...data, userId };
    return await siteRepository.create(newSite);
  },

  updateSite: async (id, data, userId) => {
    return await siteRepository.update(id, data, userId);
  },

  deleteSite: async (id, userId) => {
    return await siteRepository.delete(id, userId);
  },

  async getConversionRate(userId) {
    const sites = await siteRepository.findAll(userId);

    if (!sites || sites.length === 0) return [];

    const users = sites.flatMap((site) => site.users);

    const grouped = {};
    users.forEach((user) => {
      const source = user.signupSource || 'unknown';
      if (!grouped[source]) grouped[source] = { total: 0, converted: 0 };
      grouped[source].total++;
      if (user.converted) grouped[source].converted++;
    });

    const result = Object.entries(grouped).map(([source, stats]) => {
      const conversionRate =
        stats.total > 0 ? (stats.converted / stats.total) * 100 : 0;
      return {
        signupSource: source,
        totalUsers: stats.total,
        convertedUsers: stats.converted,
        conversionRate: conversionRate.toFixed(2) + '%',
      };
    });

    return result;
  },

  async getActiveUsers(userId) {
    const sites = await siteRepository.findAll(userId);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    let activeCount = 0;

    for (const site of sites) {
      activeCount += site.users.filter(
        (u) => u.lastLogin && new Date(u.lastLogin) >= sevenDaysAgo
      ).length;
    }

    return { activeUsers: activeCount };
  },

  async getActiveUsersInRange(userId, startDate, endDate) {
    const sites = await siteRepository.findAll(userId);
    const start = new Date(startDate);
    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    const monthlyCounts = {};

    for (const site of sites) {
      for (const user of site.users) {
        const activeActivities = user.activities.filter((a) => {
          const date = new Date(a.createdAt);
          return date >= start && date <= end;
        });

        const uniqueMonths = new Set(
          activeActivities.map((a) => {
            const d = new Date(a.createdAt);
            return d.toLocaleString('default', { month: 'long' });
          })
        );

        uniqueMonths.forEach((month) => {
          monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
        });
      }
    }

    const monthOrder = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const result = Object.entries(monthlyCounts)
      .sort((a, b) => monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]))
      .map(([month, activeUsers]) => ({ month, activeUsers }));

    return result;
  },
};

module.exports = siteService;
