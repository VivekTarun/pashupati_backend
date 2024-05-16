const upload = require('./multer.config');
const { bucket } = require('./gcs.config');
const connectToDB = require('./db.config');

module.exports = {
  upload,
  bucket,
  connectToDB
};
