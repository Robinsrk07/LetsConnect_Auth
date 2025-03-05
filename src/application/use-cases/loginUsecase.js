const {ValidationError,NotFoundError}= require("../errors/customError")
const User = require("../../domain/entities/User")



class LoginUseCase{
    constructor(userRepository){
       this.userRepository = userRepository 
    }
    async execute(emailId, password){
        const userData = await this.userRepository.findByEmail(emailId)
        if(!userData){
            throw new NotFoundError("invalid credentials")
        }
         //user hydration thorugh entity..to get methodes
        const user=User.fromDatabase(userData)

        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid){
            throw new ValidationError("invalid credentials")
        }
         const token  = user.generateJWT()
         // only send neccesary dat check front end what need
           return {user,token}
    }
}

module.exports = LoginUseCase