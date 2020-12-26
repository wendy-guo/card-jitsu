"use strict";
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://wendy:foJX6oTOtREPfekG@cluster0.cgpjz.mongodb.net/test?authSource=admin&replicaSet=atlas-12ab6p-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true" ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/Card-Jitsu",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

module.exports = { mongoose };
