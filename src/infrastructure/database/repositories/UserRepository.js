const UserModel = require("../models/UserModel");
const IUserRepository = require("../../../application/interfaces/IUserRepository");
const { DataBaseError } = require("../../Errors/connectionError");
class UserRepository extends IUserRepository {
  async findByEmail(email) {
    return await UserModel.findOne({ emailId: email });
  }
  async save(user) {
    const newUser = new UserModel(user);
    return await newUser.save();
  }
  async updatePassword(userId, password) {
    return await UserModel.findOneAndUpdate(
      { userId: userId },
      { $set: { password: password } },
      { new: true }
    );
  }
  async updateUser(user, userId) {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: user },
        { new: true }
      );

      if (!updatedUser) {
        throw new DataBaseError("User not found");
      }
      return updatedUser;
    } catch (err) {
      console.error("Update error:", err);
      console.log(err);
      throw new DataBaseError("Error updating user: " + err.message);
    }
  }
  async find(userId) {
    try {
      return await UserModel.findById(userId);
    } catch (err) {
      throw new Error(" error state");
    }
  }
}

module.exports = UserRepository;
