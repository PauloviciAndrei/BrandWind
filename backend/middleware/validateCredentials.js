const { isValidEmail, isStrongPassword } = require('../utils/validators');

const validateCredentials = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!password || !isStrongPassword(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters long, include uppercase, lowercase, and a number',
    });
  }

  next();
};

module.exports = validateCredentials;
