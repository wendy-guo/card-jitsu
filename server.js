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

mongoose.connect(
  "mongodb+srv://wendy:foJX6oTOtREPfekG@cluster0.cgpjz.mongodb.net/test?authSource=admin&replicaSet=atlas-12ab6p-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Mongoose DB running")
);

const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

const card_types = ["snow", "water", "fire"];
const card_colours = [
  "d95252", // red
  "71bf60", // green
  "a1e9ff", // blue
  "ffd4d4", // pink
  "9987cc", // purple
  "ffc773", // orange
];

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

function checkWinner(playerStacks, opponentStacks) {
  console.log("-------------\n", opponentStacks, "\n-------\n");

  var winning_colours = [];
  var winning_cards = [];

  // check for player win of all snow cards
  for (let i = 0; i < playerStacks.snow.length; i++) {
    if (!winning_colours.includes(playerStacks.snow[i])) {
      winning_colours.push(playerStacks.snow[i]);
      winning_cards.push({ type: "snow", colour: playerStacks.snow[i] });
      console.log("ps", winning_cards);
      if (winning_cards.length == 3) {
        return { winner: "player", cards: winning_cards };
      }
    }
  }

  winning_colours = [];
  winning_cards = [];

  // check for player win of all water cards
  for (let i = 0; i < playerStacks.water.length; i++) {
    if (!winning_colours.includes(playerStacks.water[i])) {
      winning_colours.push(playerStacks.water[i]);
      winning_cards.push({ type: "water", colour: playerStacks.water[i] });
      console.log(winning_cards);
      if (winning_cards.length == 3) {
        return { winner: "player", cards: winning_cards };
      }
    }
  }

  winning_colours = [];
  winning_cards = [];

  // check for player win of all fire cards
  for (let i = 0; i < playerStacks.fire.length; i++) {
    if (!winning_colours.includes(playerStacks.fire[i])) {
      winning_colours.push(playerStacks.fire[i]);
      winning_cards.push({ type: "fire", colour: playerStacks.fire[i] });
      console.log(winning_cards);
      if (winning_cards.length == 3) {
        return { winner: "player", cards: winning_cards };
      }
    }
  }

  winning_colours = [];
  winning_cards = [];

  // check for opponent win of all snow cards
  for (let i = 0; i < opponentStacks.snow.length; i++) {
    if (!winning_colours.includes(opponentStacks.snow[i])) {
      winning_colours.push(opponentStacks.snow[i]);
      winning_cards.push({ type: "snow", colour: opponentStacks.snow[i] });
      console.log(winning_cards);
      console.log(winning_colours);
      if (winning_cards.length == 3) {
        return { winner: "opponent", cards: winning_cards };
      }
    }
  }

  winning_colours = [];
  winning_cards = [];

  // check for opponent win of all water cards
  for (let i = 0; i < opponentStacks.water.length; i++) {
    if (!winning_colours.includes(opponentStacks.water[i])) {
      winning_colours.push(opponentStacks.water[i]);
      winning_cards.push({ type: "water", colour: opponentStacks.water[i] });
      console.log(winning_cards);
      if (winning_cards.length == 3) {
        return { winner: "opponent", cards: winning_cards };
      }
    }
  }

  winning_colours = [];
  winning_cards = [];

  // check for opponent win of all fire cards
  for (let i = 0; i < opponentStacks.fire.length; i++) {
    if (!winning_colours.includes(opponentStacks.fire[i])) {
      winning_colours.push(opponentStacks.fire[i]);
      winning_cards.push({ type: "fire", colour: opponentStacks.fire[i] });
      console.log(winning_cards);
      console.log(winning_colours);
      if (winning_cards.length == 3) {
        return { winner: "opponent", cards: winning_cards };
      }
    }
  }

  // check for player win of different card types
  for (let i = 0; i < playerStacks.snow.length; i++) {
    for (let j = 0; j < playerStacks.water.length; j++) {
      if (playerStacks.snow[i] == playerStacks.water[j]) {
        continue;
      }
      for (let k = 0; k < playerStacks.fire.length; k++) {
        if (
          playerStacks.snow[i] !== playerStacks.fire[k] &&
          playerStacks.fire[k] !== playerStacks.water[j]
        ) {
          return {
            winner: "player",
            cards: [
              { type: "snow", colour: playerStacks.snow[i] },
              { type: "water", colour: playerStacks.water[j] },
              { type: "fire", colour: playerStacks.fire[k] },
            ],
          };
        }
      }
    }
  }

  // check for opponent win of different card types
  for (let i = 0; i < opponentStacks.snow.length; i++) {
    for (let j = 0; j < opponentStacks.water.length; j++) {
      if (opponentStacks.snow[i] == opponentStacks.water[j]) {
        continue;
      }
      for (let k = 0; k < opponentStacks.fire.length; k++) {
        if (
          opponentStacks.snow[i] !== opponentStacks.fire[k] &&
          opponentStacks.fire[k] !== opponentStacks.water[j]
        ) {
          return {
            winner: "opponent",
            cards: [
              { type: "snow", colour: opponentStacks.snow[i] },
              { type: "water", colour: opponentStacks.water[j] },
              { type: "fire", colour: opponentStacks.fire[k] },
            ],
          };
        }
      }
    }
  }
  return { winner: null };
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
    console.log(mongoose.connection);
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

  console.log(JSON.parse(req.query.player));
  console.log(JSON.parse(req.query.opponent));

  var result = getResult(
    JSON.parse(req.query.player),
    JSON.parse(req.query.opponent)
  );
  console.log(result);

  res.send({ winner: result });
});

/**
 * Generate one new card for the players of a match.
 */
app.get("/deal-cards", (req, res) => {
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
        match.opponentCards.push(generateNewCard());

        match
          .save()
          .then(() => {
            res.send(generateNewCard());
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

app.get("/get-winner", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    console.log("issue with mongoose connection");
    res.status(500).send("internal server error");
    return;
  }
  console.log("\n\ncheck for winner");

  console.log(JSON.parse(req.query.playerStacks));
  console.log(JSON.parse(req.query.opponentStacks));

  var results = checkWinner(
    JSON.parse(req.query.playerStacks),
    JSON.parse(req.query.opponentStacks)
  );

  if (results.winner) console.log(results);

  res.send(results);
});

app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
