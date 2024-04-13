const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId,
  region: 'ap-southeast-2',
  correctClockSkew: true,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'claireawsbucket',
    acl: 'public-read',
    // specifies the metadata to be associated with each uploaded file
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    // generates the key (filename) for the uploaded file
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
