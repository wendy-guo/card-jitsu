import React, { useState } from "react";
import "./App.css";
import CardBar from "./components/CardBar";
import PlayedCards from "./components/PlayedCards";

const getNewCard = () => {
  const url = "/new-card";
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      console.log("yay a card");
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

  var card = getNewCard();
  console.log(card.type);

  const [playerCards, setPlayerCards] = useState([
    { type: "water", number: 5, colour: "rgb(197, 27, 56)" },
    { type: "water", number: 3, colour: "rgb(161, 231, 236)" },
    { type: "fire", number: 9, colour: "rgb(255, 236, 127)" },
    { type: "grass", number: 4, colour: "rgb(197, 27, 56)" },
    { type: "fire", number: 7, colour: "rgb(197, 27, 56)" },
  ]);
  const [opponentPlayedCard, setOpponentPlayedCard] = useState({
    type: "water",
    number: 5,
    colour: "rgb(197, 27, 56)",
  });
  const [playerPlayedCard, setPlayerPlayedCard] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [newGame, setNewGame] = useState(false);

  if (newGame) {
    setTimeout(1000, setOpponentCards());
  } else if (gameStarted) {
    setTimeout(1000, getOpponentCard());
  }

  return (
    <div className="App">
      hallo world
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
    </div>
  );
}

export default App;
