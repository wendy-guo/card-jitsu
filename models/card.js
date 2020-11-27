"use strict";

const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  type: String,
  number: Number,
  colour: String,
});

const Card = mongoose.model("Card", CardSchema);
module.exports = { Card, CardSchema };
