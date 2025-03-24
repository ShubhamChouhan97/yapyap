const fs = require("fs");
const path = require("path");
const multer = require("multer");

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
        const uploadPath = path.join(__dirname, "..", "uploads", "image");
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
exports.uploadFile = upload.single("image");

exports.uploadPic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }


        const imageUrl = `/uploads/image/${req.file.filename}`;
        res.json({ success: true, imageUrl });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ success: false, message: "Error uploading image" });
    }
};
