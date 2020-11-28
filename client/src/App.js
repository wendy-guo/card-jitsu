import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import CardBar from "./components/CardBar";
import PlayedCards from "./components/PlayedCards";
import MainScreen from "./components/MainScreen";

// requests to backend

/**
 * Start a new match.
 */
const startMatch = async () => {
  const request = new Request("/start-match", {
    method: "post",
    body: JSON.stringify({ player: "wendy" }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  try {
    const res = await fetch(request);
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get match information.
 * @param {String} match_id
 */
const getMatch = async (match_id) => {
  const request = new Request("/get-match", {
    method: "post",
    body: JSON.stringify({ match_id }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  try {
    const res = await fetch(request);
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get opponent card for this match.
 * @param {String} match_id
 */
const getOpponentCard = async (match_id) => {
  const request = new Request("/opponent-card", {
    method: "post",
    body: JSON.stringify({ match_id }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  console.log("getting opponent move...");

  try {
    const res = await fetch(request);
    if (res.status === 200) {
      console.log(res);
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get results of this round.
 * @param {String} match_id
 * @param {Card} player
 * @param {Card} opponent
 */
const getRoundResults = async (match_id, player, opponent) => {
  const request = new Request("/get-round-result", {
    method: "post",
    body: JSON.stringify({ match_id, player, opponent }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  try {
    const res = await fetch(request);
    if (res.status === 200) {
      return res.json();
    }
    const json = undefined;
    console.log("round result", json);
    return json;
  } catch (error) {
    console.log("huhhhhhhhhhhhhhhhh");
    console.log(error);
  }
};

function App() {
  const [match, setMatch] = useState(null);
  const [opponentPlayedCard, setOpponentPlayedCard] = useState(null);
  const [playerPlayedCard, setPlayerPlayedCard] = useState(null);
  const [playerStacks, setPlayerStacks] = useState(null);
  const [opponentStacks, setOpponentStacks] = useState(null);

  const [playable, setPlayable] = useState(true);
  const [playableOp, setPlayableOp] = useState(true);
  const [roundResult, setRoundResult] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [newGame, setNewGame] = useState(true);
  const [roundEvaluated, setRoundEvaluated] = useState(false);

  const setUpCards = () => {
    if (gameStarted && newGame) {
      setNewGame(false);
      startMatch().then((match) => {
        console.log("hai", match._id);
        setMatch(match);
        setPlayerStacks(match.playerStacks);
        setOpponentStacks(match.opponentStacks);
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
    if (!playerPlayedCard || !opponentPlayedCard || roundEvaluated) {
      return;
    }
    setRoundEvaluated(true);
    setTimeout(() => {
      console.log("hallo?????");
      getRoundResults(match, playerPlayedCard, opponentPlayedCard).then(
        (result) => {
          setRoundResult(result.winner);
          console.log("------------ round result:", result);
          if (result === "player") {
            playerStacks[playerPlayedCard.type].push(playerPlayedCard.colour);
            setPlayerStacks(playerStacks);
          } else if (result === "opponent") {
            opponentStacks[opponentPlayedCard.type].push(
              opponentPlayedCard.colour
            );
            setOpponentStacks(opponentStacks);
          }
          setPlayerPlayedCard(null);
          setOpponentPlayedCard(null);
          setTimeout(() => {
            console.log(playerStacks);
            console.log(opponentStacks);
          }, 500);
        }
      );
    }, 1000);
  };

  setUpCards();
  getOpponentMove(match);
  evaluateRound(playerPlayedCard, opponentPlayedCard);

  // front end stuff
  const getMainScreen = () => {
    console.log("getting main screen");
    return <MainScreen onStartClick={() => setGameStarted(true)} />;
  };

  const getGameScreen = () => {
    if (match) {
      return (
        <div>
          play a card
          {roundResult ? (
            <div>{roundResult} wins!!!!!!!!!</div>
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
                setPlayable(false);
                setPlayerPlayedCard(match.playerCards[index]);
                match.playerCards.splice(index, 1);
                console.log(index, "clicked");
              }
            }}
          />
        </div>
      );
    } else {
      return (
        <div
          style={{ width: "500px", height: "500px", backgroundColor: "red" }}
        >
          loading
        </div>
      );
    }
  };

  return (
    <div className="App">
      hallo world
      <BrowserRouter>
        <Switch>
          <Route path="/" render={getMainScreen} exact />
          <Route path="/match" render={getGameScreen} exact />
        </Switch>
      </BrowserRouter>
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
