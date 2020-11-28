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

function getOpponentMove(cards) {
  console.log("opponent move");
  return Math.floor(Math.random() * cards.length);
}

function getResult(player, opponent) {
  if (player.type == opponent.type) {
    return player.number > opponent.type
      ? "player"
      : player.number < opponent.number
      ? "opponent"
      : "tie";
  } else if (player.type == "snow") {
    return opponent.type == "water" ? "player" : "opponent";
  } else if (player.type == "water") {
    return opponent.type == "fire" ? "player" : "opponent";
  } else {
    return opponent.type == "snow" ? "player" : "opponent";
  }
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

  var playerCards = [];
  var opponentCards = [];

  for (let i = 0; i < 5; i++) {
    playerCards.push(generateNewCard());
    opponentCards.push(generateNewCard());
  }

  const match = new Match({
    player: req.body.player,
    playerCards,
    opponentCards,
    playerStacks: new Stack(),
    opponentStacks: new Stack(),
    winner: null,
  });

  match
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      if (isMongoError(error)) {
        res.status(500).send("internal server error");
      } else {
        console.log(error);
        res.status(400).send("Bad Request");
      }
    });
});

/**
 * Returns the match.
 */
app.post("/get-match", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  Match.findById(req.body.match_id)
    .then((match) => {
      if (!match) {
        res.status(404).send("resource not found");
      } else {
        res.send(match);
      }
    })
    .catch(() => {
      res.status(500).send("internal server error");
    });
});

app.post("/opponent-card", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  Match.findById(req.body.match_id)
    .then((match) => {
      if (!match) {
        res.status(404).send("resource not found");
      } else {
        var card = match.opponentCards.pop(
          getOpponentMove(match.opponentCards)
        );
        console.log("opponent card", card);
        match
          .save()
          .then(() => {
            res.send(card);
          })
          .catch((error) => {
            if (isMongoError(error)) {
              res.status(500).send("internal server error");
            } else {
              res.status(400).send("bad request");
            }
          });
      }
    })
    .catch((error) => {
      res.status(500).send("internal server error");
    });
});

/**
 * Plays the card the player chooses.
 */
app.post("/play-card", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  Match.findById(req.body.match_id)
    .then((match) => {
      if (!match) {
        res.status(404).send("resource not found");
      } else {
        console.log(match.playerCards);
        console.log("popping index", req.body.index);
        match.playerCards.splice(req.body.index, 1);
        console.log(match.playerCards);
        match
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            if (isMongoError(error)) {
              res.status(500).send("internal server error");
            } else {
              res.status(400).send("bad request");
            }
          });
      }
    })
    .catch((error) => {
      res.status(500).send("internal server error");
    });
});

/**
 * Get and store the winner of the round.
 */
app.post("/get-round-result", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  var result = getResult(req.body.player, req.body.opponent);
  console.log("result!!!!!!!!!!!!!!!!", result);

  Match.findById(req.body.match_id)
    .then((match) => {
      if (!match) {
        res.status(404).send("resource not found");
      } else {
        if (result == "player") {
          match.playerStacks[req.body.player.type].push(req.body.player.colour);
        } else if (result == "opponent") {
          match.opponentStacks[req.body.opponent.type].push(
            req.body.opponent.colour
          );
        }
        console.log("resultyyyyyyy", result);

        match
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            if (isMongoError(error)) {
              res.status(500).send("internal server error :(");
            } else {
              res.status(400).send("bad request");
            }
          });
      }
    })
    .catch((error) => {
      res.status(500).send("internal server error");
    });
});

/**
 * Generate and return new cards for the players of a match.
 */
app.get("/deal-card", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  Match.findById(req.body.match_id)
    .then((match) => {
      if (!match) {
        res.status(404).send("resource not found");
      } else {
        match.playerCards.push(generateNewCard());
        match.opponentCards.push(generateNewCard());

        match
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            if (isMongoError(error)) {
              res.status(500).send("internal server error");
            } else {
              res.status(400).send("Bad Request");
            }
          });
      }
    })
    .catch((error) => {
      res.status(500).send("internal server error");
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
        res.status(500).send("internal server error");
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
