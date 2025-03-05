 const User = require("../../domain/entities/User")
 const  SignUpValidator = require("../validators/validateSignUpdata")
 const {ValidationError}= require("../errors/customError")


 class signUpUseCase{
    constructor(userRepository,messageBroker){
       this.userRepository = userRepository;
       this.messageBroker = messageBroker;
    }


    async execute(userData){

    

        const validate = new SignUpValidator(userData)
        validate.validate()
      
        
        const  existingUser = await  this.userRepository.findByEmail(userData.emailId)
        if(existingUser){
            throw new ValidationError("existing user")
        }
        const user = new User(userData);
        user.validate();
        await user.hashPassword();


       const savedUser =await this.userRepository.save(user)
       console.log("saved",savedUser)
      
       const userDataToSend = {
         firstName: savedUser.firstName,
         lastName: savedUser.lastName,
         emailId: savedUser.emailId,
         password: savedUser.password,
         photoUrl: savedUser.photoUrl,
         skills: savedUser.skills,
         age: savedUser.age,
         about: savedUser.about,
         gender: savedUser.gender,
         userId: savedUser._id ,
         isPremium: savedUser.isPremium,
         memberShipType: savedUser.memberShipType

     };
     
     
     await this.messageBroker.publish("user_created", {
         eventType: "UserCreatedFROM AUTH",
         data: userDataToSend
     });
     
     return { user: savedUser };
    }
 }
 module.exports = signUpUseCase   