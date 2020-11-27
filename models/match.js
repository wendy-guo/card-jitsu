"use strict";

const mongoose = require("mongoose");
const { CardSchema } = require("./card");

const MatchSchema = new mongoose.Schema({
  player: String,
  playerCards: [CardSchema],
  opponentCards: [CardSchema],
  playerStacks: [String],
  opponentStacks: [String],
  winner: String,
});

const Match = mongoose.model("Match", MatchSchema);
module.exports = { Match };
