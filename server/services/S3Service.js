const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');

class S3Service {
  constructor() {
    this.s3Client = new S3Client({
      region: 'ap-southeast-2',
      credentials: {
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey,
      },
    });
  }

  async uploadImages(files, bucketName, folderName, key) {
    try {
      let imageLocations = [];
      const uploadPromises = files.images.map(async (image, index) => {
        const fullPath = `${folderName}/${key}/${index}`;
        const uploadParams = {
          Bucket: bucketName,
          Key: fullPath,
          Body: image.buffer,
          ContentType: image.mimetype,
          ACL: 'public-read',
        };
        const command = new PutObjectCommand(uploadParams);
        await this.s3Client.send(command);
        const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fullPath}`;
        imageLocations.push(fileUrl);
      });
      await Promise.all(uploadPromises);
      return imageLocations;
    } catch (error) {
      throw new Error(`Failed to upload files to S3: ${error.message}`);
    }
  }

  async uploadVideos(files, bucketName, folderName, key) {
    try {
      let videosLocations = [];
      const uploadPromises = files.videos.map(async (video, index) => {
        const fullPath = `${folderName}/${key}/${index}`;
        const uploadParams = {
          Bucket: bucketName,
          Key: fullPath,
          Body: video.buffer,
          ContentType: video.mimetype,
          ACL: 'public-read',
        };
        const command = new PutObjectCommand(uploadParams);
        await this.s3Client.send(command);
        const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fullPath}`;
        videosLocations.push(fileUrl);
      });
      await Promise.all(uploadPromises);
      return videosLocations;
    } catch (error) {
      throw new Error(`Failed to upload videos to S3: ${error.message}`);
    }
  }
}

module.exports = S3Service;
