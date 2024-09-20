const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT : process.env.PORT || 3000,
    NODE_ENV : process.env.NODE_ENV,
    DB_URL : process.env.DB_URL,
    BUCKETNAME : process.env.BUCKET_NAME,
    BUCKETREGION : process.env.BUCKET_REGION,
    ACCESSKEY : process.env.ACCESS_KEY,
    SECRETACCESSKEY : process.env.SECRET_ACCESS_KEY,
    API_KEY : process.env.API_KEY
}