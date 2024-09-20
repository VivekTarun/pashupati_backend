const { S3Client} = require("@aws-sdk/client-s3");
const { BUCKETREGION, ACCESSKEY, SECRETACCESSKEY } = require('../config/server.config');

const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETACCESSKEY
    },
    region: BUCKETREGION
});

module.exports = s3;