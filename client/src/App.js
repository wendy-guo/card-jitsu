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

  return fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getOpponentCard = (match_id) => {
  const request = new Request("/opponent-card", {
    method: "post",
    body: JSON.stringify({ match_id }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  console.log("getting opponent move...");

  return fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        return res.json();
      }
    })
    .then((json) => {
      console.log("opponeent's card", json);
      return json;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getRoundResults = (player, opponent) => {
  const request = new Request("/opponent-card", {
    method: "post",
    body: JSON.stringify({ match_id }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  console.log("getting opponent move...");

  return fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        return res.json();
      }
    })
    .then((json) => {
      console.log("opponeent's card", json);
      return json;
    })
    .catch((error) => {
      console.log(error);
    });
}

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

function App() {
  // at the beginning of the game, make api call to get starting cards for player

  const [match, setMatch] = useState(null);
  const [opponentPlayedCard, setOpponentPlayedCard] = useState(null);
  const [playerPlayedCard, setPlayerPlayedCard] = useState(null);
  const [playable, setPlayable] = useState(true);
  const [playableOp, setPlayableOp] = useState(true);
  const [roundResult, setRoundResult] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [newGame, setNewGame] = useState(true);

  const setUpCards = () => {
    if (gameStarted && newGame) {
      setNewGame(false);
      startMatch().then((match) => {
        console.log("hai", match._id);
        setMatch(match);
      });
    } else if (gameStarted) {
    }
  };

  const getOpponentMove = (match) => {
    if (match && playableOp) {
      setPlayableOp(false);
      getOpponentCard(match).then((card) => {
        setOpponentPlayedCard(card);
        console.log(card);
      });
    }
  };

  const evaluateRound = () => {
    if (playerPlayedCard && opponentPlayedCard) {
      getRoundResults(playerPlayedCard, opponentPlayedCard).then((result) => {
        setRoundResult(result);
        setPlayerPlayedCard(null);
        setOpponentPlayedCard(null);
      });
    }
  };

  setUpCards();
  getOpponentMove(match);
  evaluateRound();

  return (
    <div className="App">
      hallo world
      {match ? (
        <div>
          play a card
          {roundResult ? (
            <div>hallo</div>
          ) : (
            <PlayedCards
              id="played-cards"
              playerCard={playerPlayedCard}
              opponentCard={opponentPlayedCard}
            />
          )}
          <CardBar
            id="card-bar"
            cards={match.playerCards}
            playable={playable}
            onCardClick={(index) => {
              if (playable) {
                setPlayerPlayedCard(match.playerCards[index]);
                setPlayable(false);
                console.log(index, "clicked");
              }
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
