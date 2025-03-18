const User = require("../../domain/entities/User");
const SignUpValidator = require("../validators/validateSignUpdata");
const { ValidationError } = require("../errors/customError");
const AWS = require('aws-sdk');
require("dotenv").config(); // Load .env variables



AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

class signUpUseCase {
    constructor(userRepository, messageBroker, imageUploadService) {
        this.userRepository = userRepository;
        this.messageBroker = messageBroker;
        this.imageUploadService = imageUploadService;
    }

    async execute(userData, files) {
        const validate = new SignUpValidator(userData);
        validate.validate();

        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new ValidationError("Existing user");
        }

        // Upload files to S3 and get URLs
        const fileUrls = await Promise.all(
            files.map(async (file) => {
                const fileName = `photo_${Date.now()}.${file.originalname.split('.').pop()}`;
                const params = {
                    Bucket: "bucketletsconnect",
                    Key: `uploads/${fileName}`,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };

                const data = await s3.upload(params).promise();
                return data.Location; // Return the S3 URL
            })
        );

        console.log("userData", userData);
        console.log("imageUrls", fileUrls);

        // Create a new User instance with the image URLs
        const user = new User({
            ...userData,
            photoUrl: fileUrls, // Pass the array of image URLs
        });

        // Validate and hash the password
        user.validate();
        await user.hashPassword();

        // Save the user to the database
        const savedUser = await this.userRepository.save(user);
        console.log("saved", savedUser);

        // Prepare user data for the message broker
        const userDataToSend = {
            name: savedUser.name,
            emailId: savedUser.emailId,
            password: savedUser.password,
            photoUrl: savedUser.photoUrl,
            about: savedUser.about,
            gender: savedUser.gender,
            userId: savedUser._id,
            isPremium: savedUser.isPremium,
            memberShipType: savedUser.memberShipType,
            town:savedUser.town ,
            pincode: savedUser.pincode,
            dob:savedUser.dob
        };

        // Publish the user creation event
        await this.messageBroker.publish("user_created", {
            eventType: "UserCreatedFROM AUTH",
            data: userDataToSend
        });

        return { user: savedUser };
    }
}

module.exports = signUpUseCase;