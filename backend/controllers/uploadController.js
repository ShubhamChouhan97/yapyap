const fs = require("fs");
const path = require("path");
const multer = require("multer");
const User = require("../models/User"); // Ensure this is the correct User model path

const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "..", "uploads", "profile");
        ensureDirExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        if (!file || !file.originalname) {
            return cb(new Error("Invalid file upload: file or filename missing"), false);
        }
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Middleware for handling file upload
const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
exports.uploadMiddleware = upload.single("profilePic");

exports.uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const imageUrl = `/uploads/profile/${req.file.filename}`;

        // Update the user profile with the new image URL
        const updatedUser = await User.updateOne({ email }, { $set: { dp: imageUrl } });

        if (updatedUser.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, imageUrl });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ success: false, message: "Error uploading image" });
    }
};
