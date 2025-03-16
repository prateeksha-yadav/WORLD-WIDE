const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    trim: true,
    username: [true, "Username must be unique"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: [true, "Email is already in use."],
    lowercase: [true, "Email must be lowercase."],
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long."],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("name") || this.username) next();

  let baseUsername = this.name.toLowerCase().replace(/\s+/g, "");
  let randomNum = Math.floor(100 + Math.random() * 900);
  let newUsername = baseUsername + randomNum;

  let isUnique = false;
  while (!isUnique) {
    const existingUser = await mongoose
      .model("User")
      .findOne({ username: newUsername });
    if (!existingUser) {
      isUnique = true;
    } else {
      randomNum = Math.floor(100 + Math.random() * 900);
      newUsername = baseUsername + randomNum;
    }
  }

  this.username = newUsername;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
