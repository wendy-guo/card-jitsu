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
    return player.number > opponent.number
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
app.get("/start-match", (req, res) => {
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

  console.log("hallo", req.query.player);

  const match = new Match({
    playerCards,
    opponentCards,
    playerStacks: new Stack(),
    opponentStacks: new Stack(),
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

app.get("/opponent-card", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  Match.findById(req.query.match_id)
    .then((match) => {
      if (!match) {
        res.status(404).send("resource not found");
      } else {
        var card = match.opponentCards.pop(
          getOpponentMove(match.opponentCards)
        );
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
 * Get the result of the round.
 */
app.get("/get-round-result", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }

  var result = getResult(
    JSON.parse(req.query.player),
    JSON.parse(req.query.opponent)
  );
  res.send({ winner: result });
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

app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
