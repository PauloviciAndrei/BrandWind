const userRepository = require('../repositories/userRepository');
const fs = require('fs');
const path = require('path');

const userService = {
  // Create a new user
  createUser: async (data) => {
    // Check required fields
    if (!data.email || !data.password || !data.name) {
      throw new Error('Email, password, and name are required.');
    }

    // Save user using repository
    return await userRepository.create(data);
  },

  // Get all users
  getAllUsers: async (teamId) => {
    return await userRepository.findAll(teamId);
  },

  // Get a single user by ID
  getUserById: async (id) => {
    return await userRepository.findById(id);
  },

  // Update user
  updateUser: async (id, data) => {
    return await userRepository.update(id, data);
  },
  //Update profile photo
  async updateProfilePhoto(userId, file) {
    if (!file) throw new Error('No file uploaded');

    let user;
    try {
      user = await userRepository.findById(userId);
      if (!user) throw new Error('User not found');
    } catch (err) {
      console.error('Error fetching user:', err);
      throw err;
    }

    if (user.photo && !user.photo.includes('default-avatar')) {
      const oldPhotoPath = path.join(
        __dirname,
        '../',
        user.photo.replace(/^\//, '')
      );
      try {
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        } else {
        }
      } catch (err) {}
    }

    const photoPath = `/uploads/profile_photos/${file.filename}`;

    let updatedUser;
    try {
      updatedUser = await userRepository.updatePhoto(userId, photoPath);
    } catch (err) {
      console.error('Error updating user photo in DB:', err);
      throw err;
    }

    return updatedUser;
  },

  // Delete user
  deleteUser: async (id) => {
    return await userRepository.delete(id);
  },
};

module.exports = userService;
