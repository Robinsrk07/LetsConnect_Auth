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
      const {
        name,
        photoUrl,
        pincode,
        town,
        dob,
        about,
        gender
      } = user.data.savedUser;

      const updateData = {
        name,
        photoUrl,
        pincode,
        town,
        dob,
        about,
        gender
      };
       const updated_User = await this.userRepository.updateUser(updateData,ownUser._id)

       console.log("updated_User",updated_User);
       
    }
}

module.exports= updateUser