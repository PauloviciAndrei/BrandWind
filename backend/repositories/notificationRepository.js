const Notification = require('../models/Notification');

const notificationRepository = {
  findAll: (userId) => Notification.find({ userId }),
  findById: (id, userId) => Notification.findOne({ _id: id, userId }),
  create: (data) => Notification.create(data),
  update: (id, data, userId) =>
    Notification.findOneAndUpdate({ _id: id, userId }, data, { new: true }),
  delete: (id, userId) => Notification.findOneAndDelete({ _id: id, userId }),
};

module.exports = notificationRepository;
