const userService = require('../services/userService');

const userController = {
  // Get all users
  getUsers: async (req, res) => {
    try {
      const { teamId } = req.query;
      const users = await userService.getAllUsers(teamId);
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get a single user by ID
  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser)
        return res.status(404).json({ message: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getMe: async (req, res) => {
    try {
      const user = await userService.getUserById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateMe: async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.user.id, req.body);
      if (!updatedUser)
        return res.status(404).json({ message: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateProfilePhoto: async (req, res) => {
    try {
      const updatedUser = await userService.updateProfilePhoto(
        req.user.id,
        req.file
      );
      res.json({ message: 'Profile photo updated', photo: updatedUser.photo });
    } catch (err) {
      console.error('Controller: updateProfilePhoto failed:', err);
      res
        .status(500)
        .json({ message: err.message || 'Failed to update profile photo' });
    }
  },
};

module.exports = userController;
