const AWS = require('aws-sdk');
require("dotenv").config(); // Load .env variables


class ImageUploadService {
    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
    }

    async uploadImage(file) {
        const params = {
            Bucket: "bucketletsconnect",
            Key: `users/${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype
        };

        const uploadResult = await this.s3.upload(params).promise();
        return uploadResult.Location; // Return the uploaded file's URL
    }
}

module.exports = ImageUploadService;