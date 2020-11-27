"use strict";

const mongoose = require("mongoose");

const StackSchema = new mongoose.Schema({
  snow: [String],
  water: [String],
  fire: [String]
});

const Stack = mongoose.model("Stack", StackSchema);
module.exports = { Stack, StackSchema };
