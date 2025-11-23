const User = require('../models/User');

const userRepository = {
  // Get all users
  findAll: (teamId) => {
    const query = teamId ? { teamID: teamId } : {};
    return User.find(query).populate('roleID', 'role');
  },

  // Get a single user by ID
  findById: (id) => {
    return User.findById(id).populate('roleID', 'role');
  },

  // Create a new user
  create: (data) => {
    return User.create(data);
  },

  // Update a user
  update: (id, data) => {
    return User.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete a user
  delete: (id) => {
    return User.findByIdAndDelete(id);
  },

  findByEmail: (email) => {
    return User.findOne({ email });
  },

  updatePhoto: async (id, photoPath) => {
    try {
      const updated = await User.findByIdAndUpdate(
        id,
        { photo: photoPath },
        { new: true }
      );
      return updated;
    } catch (err) {
      throw err;
    }
  },

  findByResetToken: (token) => {
    return User.findOne({ resetToken: token });
  },

  // Update reset token and expiry
  updateResetToken: async (id, token, expiry) => {
    return User.findByIdAndUpdate(
      id,
      {
        resetToken: token,
        resetTokenExpiry: new Date(expiry),
      },
      { new: true }
    );
  },

  // Update password and clear token
  updatePasswordAndClearToken: async (id, hashedPassword) => {
    return User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
      { new: true }
    );
  },
};

module.exports = userRepository;
