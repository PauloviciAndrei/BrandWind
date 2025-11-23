const eventRepository = require('../repositories/eventRepository');

const eventService = {
  createEvent: async (data, userId) => {
    if (!data.title || !data.startTime || !data.endTime) {
      throw new Error('Title, start time, and end time are required');
    }
    const eventData = { ...data, userId };
    return await eventRepository.create(eventData);
  },

  getAllEvents: async (userId) => await eventRepository.findAll(userId),
  getEventById: async (id, userId) =>
    await eventRepository.findById(id, userId),
  updateEvent: async (id, data, userId) =>
    await eventRepository.update(id, data, userId),
  deleteEvent: async (id, userId) => await eventRepository.delete(id, userId),
};

module.exports = eventService;
