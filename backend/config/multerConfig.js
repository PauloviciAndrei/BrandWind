const multer = require('multer');
const path = require('path');

const fs = require('fs');
const uploadDir = path.join(__dirname, '../uploads/profile_photos');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const userId = req.user?.id || 'unknown';
    cb(null, `${userId}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
