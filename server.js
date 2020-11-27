"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { mongoose } = require("./db/mongoose");
const { Match } = require("./models/match");
const { Card } = require("./models/card");
const { Stack } = require("./models/stack");
const { User } = require("./models/user");

const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

const card_types = ["snow", "water", "fire"];
const card_colours = ["red", "green", "blue", "pink", "purple", "orange"];

function isMongoError(error) {
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
}

function generateNewCard() {
  return new Card({
    type: card_types[Math.floor(Math.random() * 3)],
    number: Math.floor(Math.random() * 11) + 2,
    colour: card_colours[Math.floor(Math.random() * 6)],
  });
}

app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000,
      httpOnly: true,
    },
  })
);

/**
 * Start a new match of card-jitsu.
 */
app.post("/start-match", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  console.log("starting a match...");

  var playerCards = [];
  var opponentCards = [];

  for (let i = 0; i < 5; i++){
    playerCards.push(generateNewCard());
    opponentCards.push(generateNewCard());
  }

  const match = new Match({
    player: req.body.player,
    playerCards,
    opponentCards,
    playerStacks: [],
    opponentStacks: [],
    winner: null,
  });

  console.log(match);

  match
    .save()
    .then((result) => {
      res.send(result);
      console.log(result._id);
    })
    .catch((error) => {
      if (isMongoError(error)) {
        res.status(500).send("Internal server error");
      } else {
        console.log(error);
        res.status(400).send("Bad Request");
      }
    });
});

/**
 * Generate a new card for a player and return it.
 */
app.get("/deal-cards", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  Match.findById(req.body.match_id)
    .then((match) => {
      if (!match) {
        res.status(404).send("Resource not found");
      } else {
        for (let i = 0; i < req.body.num_cards; i++) {
          match.playerCards.push(generateNewCard());
          match.opponentCards.push(generateNewCard());
        }

        match
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            if (isMongoError(error)) {
              res.status(500).send("Internal server error");
            } else {
              res.status(400).send("Bad Request");
            }
          });
      }
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

/**
 * Get stacks for players.
 */
app.get("/new-card", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  const card = new Card({
    type: card_types[Math.floor(Math.random() * 3)],
    number: Math.floor(Math.random() * 11) + 2,
    colour: card_colours[Math.floor(Math.random() * 6)],
  });

  card
    .save()
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((error) => {
      if (isMongoError(error)) {
        res.status(500).send("Internal server error");
      } else {
        console.log(error);
        res.status(400).send("Bad Request");
      }
    });
});

// me express server

// start with blank file

// generateCards -> generate sets of random cards for player and opponent, write to file, called at start of game

// getPlayerCards -> reads from file and returns player cards

// playCard -> writes a played card to file

// playOpponentCard -> read from file current stacks, and decide move for computer

// setPlayedCards -> write to file the played cards for player and computer for that round

// checkWinner -> read current stacks and determine if there is a winner; called after every round

// generateNewCard -> called when player/opponent have three cards left

// get player cards start of game
// 1. generate random cards for player and opponent
// 2. store in json file
// 3. send info

// post player played card
// 1. get index of card
// 2. update json for player cards
// 3. update json for game played card

// get round result
// 1. check json of cards played by player and opponent
// 2. check who won
// 3. store result
// 4. send result

app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
