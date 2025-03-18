
const UserRepository = require("./src/infrastructure/database/repositories/UserRepository");
const OTPService = require("./src/application/services/OtpService");
const AuthController = require("./src/presentation/controllers/AuthController");
const SignUpUseCase = require("./src/application/use-cases/signUpUseCase");
const LoginUseCase = require("./src/application/use-cases/loginUsecase");
const SendOtpCase = require("./src/application/use-cases/sendOtp");
const UpdatePassword = require("./src/application/use-cases/updatePasswordCase")
const UpdateUser = require("./src/application/use-cases/updateUser")
const VerifyOtp = require("./src/application/use-cases/VerifyOtpCase");
const  Emailservice= require("./src/infrastructure/email/EmailService")
const MessageBroker = require("./src/infrastructure/RabitMq/MessageBroker");
const GenericConsumer = require("./src/infrastructure/RabitMq/consumer")
const UserPaymentUpdate = require("./src/application/use-cases/userUpdate_Payment")
const ImageUploadService = require("./src/application/services/ImageUploadService")

//const UpdatePasswordUseCase = require("./src/application/use-cases/updatePasswordCase")
const imageUploadService= new ImageUploadService()
const userRepository = new UserRepository()
const emailservice= new Emailservice()
const messageBroker = new MessageBroker()
const updatePasswordcase= new UpdatePassword(userRepository)
const updateUsercase= new UpdateUser(userRepository)
const userPaymentUpdate = new UserPaymentUpdate(userRepository)

///const updatePasswordUseCase = new UpdatePasswordUseCase(userRepository)

const updatePassword = new GenericConsumer("password_updated", "password_queue", updatePasswordcase);
const updateUser = new GenericConsumer("user_updated","auth_queue1",updateUsercase)
const IspremiumUpdate = new GenericConsumer("IsPremiumUpdate","IspremiumUpdateAuth",userPaymentUpdate)

const otpService = new OTPService(emailservice)

const signUpUseCase = new SignUpUseCase(userRepository,messageBroker,imageUploadService)
const loginUseCase = new LoginUseCase(userRepository)
const sendOtpCase = new SendOtpCase(otpService)
const verifyOtp = new VerifyOtp(otpService)



const authController = new AuthController({signUpUseCase, loginUseCase, sendOtpCase, verifyOtp })

console.log('signUpUseCase:', signUpUseCase);
console.log('loginUseCase:', loginUseCase);
console.log('authController:', authController);


  

module.exports ={
    messageBroker,
    emailservice,
    userRepository,
    otpService,
    signUpUseCase,
    loginUseCase,
    sendOtpCase,
    authController,
    verifyOtp,
    updatePassword,updateUser,IspremiumUpdate
}