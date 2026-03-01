import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // all files go to /uploads folder
    },
    filename: (req, file, cb) => {
        // generate unique filename: timestamp-random.extension
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // preserve file extension
        cb(null, uniqueSuffix + ext);
    },
});


// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"));
    }
};


// Multer upload instance
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

export default upload;