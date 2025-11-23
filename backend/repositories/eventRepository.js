const Event = require('../models/Event');

const eventRepository = {
  findAll: (userId) => Event.find({ userId }),
  findById: (id, userId) => Event.findOne({ _id: id, userId }),
  create: (data) => Event.create(data),
  update: (id, data, userId) =>
    Event.findOneAndUpdate({ _id: id, userId }, data, { new: true }),
  delete: (id, userId) => Event.findOneAndDelete({ _id: id, userId }),
};

module.exports = eventRepository;
