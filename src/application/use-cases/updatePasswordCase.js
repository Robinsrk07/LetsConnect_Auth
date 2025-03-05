class UpdatePassword{
    constructor(userRepository){
    this.userRepository= userRepository
    }

    async execute(data){
        const {userId,password} = data
        const user = await this.userRepository.updatePassword(userId,password)
        if(!user){
            throw new Error("invalid user")
        }
        user.password = password
        return user
    }
}

module.exports= UpdatePassword