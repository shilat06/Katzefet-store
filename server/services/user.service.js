const { UserModel } = require("../collections/users");

class UserService {
  static async findById(userId) {
    try {
      const user = await UserModel.findOne({
        _id: userId,
      });
      user.password = undefined;

      return user;
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  static async findByIdAndPassword(userId, password) {
    try {
      const user = await UserModel.findOne({
        userId,
        password,
      });

      if (user) {
        user.password = undefined;
      }

      return user;
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  static async create(user) {
    try {
      const userModel = new UserModel(user);
      const savedUser = await userModel.save();

      return savedUser;
    } catch (err) {
      console.error(err);
    }

    return null;
  }
}

module.exports = UserService;
