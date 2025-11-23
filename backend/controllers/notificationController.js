const notificationService = require('../services/notificationService');

const notificationController = {
  getNotifications: async (req, res) => {
    try {
      const notifications = await notificationService.getAllNotifications(
        req.user.id
      );
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getNotificationById: async (req, res) => {
    try {
      const notification = await notificationService.getNotificationById(
        req.params.id,
        req.user.id
      );
      if (!notification)
        return res.status(404).json({ message: 'Notification not found' });
      res.json(notification);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createNotification: async (req, res) => {
    try {
      const newNotification = await notificationService.createNotification(
        req.body,
        req.user.id
      );
      res.status(201).json(newNotification);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateNotification: async (req, res) => {
    try {
      const updatedNotification = await notificationService.updateNotification(
        req.params.id,
        req.body,
        req.user.id
      );
      if (!updatedNotification)
        return res.status(404).json({ message: 'Notification not found' });
      res.json(updatedNotification);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteNotification: async (req, res) => {
    try {
      const deletedNotification = await notificationService.deleteNotification(
        req.params.id,
        req.user.id
      );
      if (!deletedNotification)
        return res.status(404).json({ message: 'Notification not found' });
      res.json({ message: 'Notification deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = notificationController;
