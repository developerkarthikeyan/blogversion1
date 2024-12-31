const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/UserProfile/"); // Destination folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Middleware function to handle single file uploads
const profileuploadHandler1 = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        console.log(req)
        if (err) {
            // Handle errors during file upload
            return res.status(400).send({ error: "File upload failed", details: err.message });
        }
        // Proceed to the next middleware or route handler if no errors
        next();
    });
};

module.exports = { profileuploadHandler1 };
