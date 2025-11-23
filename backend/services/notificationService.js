const notificationRepository = require('../repositories/notificationRepository');

const notificationService = {
  createNotification: async (data, userId) => {
    if (!data.message) throw new Error('Message is required');

    const notifData = { ...data, userId };
    return await notificationRepository.create(notifData);
  },

  getAllNotifications: async (userId) =>
    await notificationRepository.findAll(userId),

  getNotificationById: async (id, userId) =>
    await notificationRepository.findById(id, userId),

  updateNotification: async (id, data, userId) =>
    await notificationRepository.update(id, data, userId),

  deleteNotification: async (id, userId) =>
    await notificationRepository.delete(id, userId),
};

module.exports = notificationService;
