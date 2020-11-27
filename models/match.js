"use strict";

const mongoose = require("mongoose");
const { CardSchema } = require("./card");
const { StackSchema } = require("./stack");

const MatchSchema = new mongoose.Schema({
  player: String,
  playerCards: [CardSchema],
  opponentCards: [CardSchema],
  playerStacks: StackSchema,
  opponentStacks: StackSchema,
  winner: String,
});

const Match = mongoose.model("Match", MatchSchema);
module.exports = { Match };
