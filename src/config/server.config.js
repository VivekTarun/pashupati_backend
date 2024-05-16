const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT : process.env.PORT || 3000,
    NODE_ENV : process.env.NODE_ENV,
    DB_URL : process.env.DB_URL,
    PROJECT_ID : process.env.PROJECT_ID,
    BUCKET_NAME : process.env.BUCKET_NAME,
    KEY_FILE_NAME : process.env.KEY_FILE_NAME
}