"use strict";
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://wendy:foJX6oTOtREPfekG@cluster0.pdj9z.mongodb.net/card-jitsu?retryWrites=true&w=majority" ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/Card-Jitsu",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

module.exports = { mongoose };
