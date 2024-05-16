const { Storage } = require('@google-cloud/storage');
const { PROJECT_ID, KEY_FILE_NAME, BUCKET_NAME } = require('./server.config');

const storage = new Storage({
  projectId: PROJECT_ID,
  keyFilename: KEY_FILE_NAME
});

const bucket = storage.bucket(BUCKET_NAME);

module.exports = { bucket };
