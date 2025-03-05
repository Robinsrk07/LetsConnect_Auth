class updateUser{
    constructor(userRepository){
        this.userRepository= userRepository
    }
    async execute(user){
         
        const ownUser = await this.userRepository.find(user.data.savedUser.userId) 
        console.log("userId fron case",ownUser)
        if(!ownUser){
            throw new Error("not found")
        }


        console.log("Received user data:", user.data.savedUser);
      console.log("userId:", userId);
      const {
        firstName,
        lastName,
        emailId,
        photoUrl,
        skills,
        age,
        about,
        gender,
        password,
      } = user.data.savedUser;

      const updateData = {
        firstName,
        lastName,
        emailId,
        photoUrl,
        skills,
        age,
        about,
        gender,
        password,
      };
        await this.userRepository.updateUser(updateData,ownUser._id)
    }
}

module.exports= updateUser