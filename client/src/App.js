import React, { useState } from "react";
import "./App.css";
import CardBar from "./components/CardBar";
import PlayedCards from "./components/PlayedCards";
import Card from "./components/Card";

const startMatch = () => {
  const request = new Request("/start-match", {
    method: "post",
    body: JSON.stringify({ player: "wendy" }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  return fetch(request, { mode: "cors" })
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        return res.json();
      }
    })
    .then((json) => {
      console.log("yay a match");
      console.log(json);
      return json;
    })
    .catch((error) => {
      console.log(error);
    });
};

// pass with global context?
const colours = [
  "rgb(197, 27, 56)",
  "rgb(161, 231, 236)",
  "rgb(255, 236, 127)",
];

var myCards = [
  { type: "water", number: 5, colour: "rgb(197, 27, 56)" },
  { type: "water", number: 3, colour: "rgb(161, 231, 236)" },
  { type: "fire", number: 9, colour: "rgb(255, 236, 127)" },
  { type: "grass", number: 4, colour: "rgb(197, 27, 56)" },
  { type: "fire", number: 7, colour: "rgb(197, 27, 56)" },
];

var opponentCards = [
  { type: "water", number: 5, colour: "rgb(197, 27, 56)" },
  { type: "water", number: 3, colour: "rgb(161, 231, 236)" },
  { type: "fire", number: 9, colour: "rgb(255, 236, 127)" },
  { type: "grass", number: 4, colour: "rgb(197, 27, 56)" },
  { type: "fire", number: 7, colour: "rgb(197, 27, 56)" },
];

const setOpponentCards = () => {
  // make requeeset to backend for generating opponent card
};

const getOpponentCard = () => {
  // make requeeset to backend for opponent card
};

function App() {
  // at the beginning of the game, make api call to get starting cards for player

  const [match, setMatch] = useState(null);
  const [opponentPlayedCard, setOpponentPlayedCard] = useState({
    type: "water",
    number: 5,
    colour: "rgb(197, 27, 56)",
  });
  const [playerPlayedCard, setPlayerPlayedCard] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [newGame, setNewGame] = useState(true);

  if (gameStarted && newGame) {
    setNewGame(false);
    startMatch().then((match) => {
      console.log("hai", match._id);
      setMatch(match);
    });
  } else if (gameStarted) {
    console.log("game has started");
  }

  return (
    <div className="App">
      hallo world
      {match ? (
        <div>
          play a card
          <CardBar
            id="card-bar"
            cards={match.playerCards}
            onCardClick={(index) => {
              setPlayerPlayedCard(match.playerCards[index]);
              console.log(index, "clicked");
            }}
          />
        </div>
      ) : (
        <button onClick={() => setGameStarted(true)}>start game</button>
      )}
    </div>
  );
}

/**
  <PlayedCards
        id="played-cards"
        playerCard={playerPlayedCard}
        opponentCard={opponentPlayedCard}
      />
      <CardBar
        id="card-bar"
        cards={playerCards}
        onCardClick={(index) => {
          setPlayerPlayedCard(playerCards[index]);
          console.log(index, "clicked");
        }}
      />
 */

export default App;
