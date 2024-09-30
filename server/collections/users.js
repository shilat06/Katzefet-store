const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: String },
  fullName: { type: String },
  password: { type: String },
});

module.exports = { UserSchema, UserModel: mongoose.model("users", UserSchema) };
