// controllers/authController.js
const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const SALT_ROUNDS = 10;

const authController = {
  register: async (req, res) => {
    try {
      const { email, password, name, title, location } = req.body;

      // Check if user already exists
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const newUser = await userRepository.create({
        email,
        password: hashedPassword,
        name,
        title,
        location,
      });

      // Create JWT token
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );

      // Hide password in response
      newUser.password = undefined;

      res.status(201).json({ user: newUser, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Create JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      user.password = undefined;

      res.json({ user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) return res.status(400).json({ message: 'Email is required' });

      const user = await userRepository.findByEmail(email);
      if (!user) {
        return res.json({
          message: 'If the email exists, a reset link has been sent',
        });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 15 * 60 * 1000;

      await userRepository.updateResetToken(
        user._id,
        resetToken,
        resetTokenExpiry
      );

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      // Configure email sender
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"BrandWind" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset.</p>
          <p>Click the link below to reset your password (expires in 15 minutes):</p>
          <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        `,
      };

      await transporter.sendMail(mailOptions);

      res.json({ message: 'If the email exists, a reset link has been sent' });
    } catch (err) {
      console.error('Error in forgotPassword:', err);
      res.status(500).json({ message: 'Error sending password reset email' });
    }
  },

  //  Reset Password
  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res
          .status(400)
          .json({ message: 'Token and new password are required' });
      }

      const user = await userRepository.findByResetToken(token);
      if (!user || user.resetTokenExpiry < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

      await userRepository.updatePasswordAndClearToken(
        user._id,
        hashedPassword
      );

      res.json({ message: 'Password successfully reset' });
    } catch (err) {
      console.error('Error in resetPassword:', err);
      res.status(500).json({ message: 'Error resetting password' });
    }
  },
};

module.exports = authController;
