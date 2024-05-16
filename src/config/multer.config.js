const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage to handle the file in memory
const upload = multer({ storage: storage });

module.exports = upload;
