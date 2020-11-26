"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  number: Number,
  bio: String,
  type: String,
  gender: String,
  birthday: Date,
  age: Number,
  height: Number,
  weight: Number,
  bodyFat: Number,
  muscleMass: Number,
  // followers/following
  focuses: [String],
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this;

  return User.findOne({ username: username }).then((user) => {
    if (!user) {
      return Promise.reject(); // username doesn't exist
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject(); // wrong password
        }
      });
    });
  });
};

UserSchema.statics.findByUsername = function (username) {
  const User = this;
  return User.findOne({ username: username }).then((user) => {
    if (!user) {
      return Promise.reject(); // username doesn't exist
    }
    return Promise.resolve(user);
  });
};

// check if username exists already

const User = mongoose.model("User", UserSchema);
module.exports = { User };
