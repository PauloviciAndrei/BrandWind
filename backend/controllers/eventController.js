const eventService = require('../services/eventService');

const eventController = {
  getEvents: async (req, res) => {
    try {
      const events = await eventService.getAllEvents(req.user.id);
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await eventService.getEventById(req.params.id, req.user.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json(event);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createEvent: async (req, res) => {
    try {
      const newEvent = await eventService.createEvent(req.body, req.user.id);
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const updatedEvent = await eventService.updateEvent(
        req.params.id,
        req.body,
        req.user.id
      );
      if (!updatedEvent)
        return res.status(404).json({ message: 'Event not found' });
      res.json(updatedEvent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const deletedEvent = await eventService.deleteEvent(
        req.params.id,
        req.user.id
      );
      if (!deletedEvent)
        return res.status(404).json({ message: 'Event not found' });
      res.json({ message: 'Event deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = eventController;
