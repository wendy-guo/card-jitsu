"use strict";

const mongoose = require("mongoose");

const StackSchema = new mongoose.Schema({
  type: String,
  colours: [String]
});

const Stack = mongoose.model("Stack", StackSchema);
module.exports = { Stack };
