const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');

router.get('/', userController.getUsers); // GET all users
router.get('/me', authMiddleware, userController.getMe); //GET logged in user
router.put('/me', authMiddleware, userController.updateMe); //Update current user
router.put(
  '/me/photo',
  authMiddleware,
  upload.single('photo'),
  userController.updateProfilePhoto
); // Update the profile photo
router.get('/:id', userController.getUserById); // GET user by ID
router.post('/', userController.createUser); // CREATE new user
router.put('/:id', authMiddleware, userController.updateUser); // UPDATE user
router.delete('/:id', userController.deleteUser); // DELETE user

module.exports = router;
