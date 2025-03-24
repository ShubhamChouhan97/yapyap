// module.exports = router;
const express = require('express');
const multer = require("multer");
const { uploadFile,uploadPic} = require("../controllers/imgController");
const { uploadProfilePic, uploadMiddleware } = require('../controllers/uploadController');
const authenticate = require('../middleware/authMiddleware'); // Import authentication middleware
const router = express.Router();

// Print incoming request (useful for debugging)
// router.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });
// Configure multer
const upload = multer({
  dest: "uploads/image", // Folder to store the files
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
});

// Define the POST route for file uploads
router.post("/uploadPic",uploadFile,uploadPic);
router.post('/uploadProfilePic',uploadMiddleware, uploadProfilePic);

module.exports = router;
