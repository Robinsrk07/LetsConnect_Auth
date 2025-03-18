const multer = require("multer");

// Store files in memory (since we upload to S3)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
