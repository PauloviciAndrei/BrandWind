// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // fetch the user from DB and attach to req.user
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // attach minimal info
    req.user = {
      id: user._id,
      email: user.email,
      roleID: user.roleID,
    };

    next();
  } catch (err) {
    console.error('authMiddleware error:', err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
