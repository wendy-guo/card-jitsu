import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import CardBar from "./components/CardBar";
import PlayedCards from "./components/PlayedCards";
import MainScreen from "./components/MainScreen";
import Stacks from "./components/Stacks";
import WinStack from "./components/WinStack";

/**
 * Start a new match.
 */
const startMatch = async () => {
  var name = "bob";
  const request = new Request(`/start-match?player=${name}`, {
    method: "get",
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
  const request = new Request(`/opponent-card?match_id=${match_id}`, {
    method: "get",
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
 * Get results of this round.
 * @param {Card} player
 * @param {Card} opponent
 */
const getRoundResults = async (player, opponent) => {
  console.log(">:(", player, opponent);
  const request = new Request(
    `/get-round-result?player=${JSON.stringify(
      player
    )}&opponent=${JSON.stringify(opponent)}`,
    {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }
  );

  try {
    const res = await fetch(request);
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const getWinner = async (playerStacks, opponentStacks) => {
  const request = new Request(
    `/get-winner?playerStacks=${JSON.stringify(
      playerStacks
    )}&opponentStacks=${JSON.stringify(opponentStacks)}`,
    {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }
  );

  try {
    const res = await fetch(request);
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [match, setMatch] = useState(null);
  const [playerCards, setPlayerCards] = useState(null);
  const [opponentPlayedCard, setOpponentPlayedCard] = useState(null);
  const [playerPlayedCard, setPlayerPlayedCard] = useState(null);

  const [playerStacks, setPlayerStacks] = useState(null);
  const [opponentStacks, setOpponentStacks] = useState(null);
  const [stackNew, setStackNew] = useState({ player: null, type: null });

  const [playable, setPlayable] = useState(true);
  const [playableOp, setPlayableOp] = useState(true);
  const [roundResult, setRoundResult] = useState(null);
  const [dealCards, setDealCards] = useState(false);

  const [newGame, setNewGame] = useState(null);
  const [roundEvaluated, setRoundEvaluated] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningCards, setWinningCards] = useState(null);

  const setUpCards = () => {
    if (newGame) {
      setNewGame(false);
      startMatch().then((match) => {
        setPlayerStacks(match.playerStacks);
        setOpponentStacks(match.opponentStacks);
        setPlayerCards(match.playerCards);
        setMatch(match._id);
      });
    }
  };

  const getOpponentMove = (match) => {
    if (match && playableOp) {
      setPlayableOp(false);
      setTimeout(() => {
        getOpponentCard(match).then((card) => {
          setOpponentPlayedCard(card);
          console.log(card);
        });
      }, 1000);
    }
  };

  const handleCardClick = (card) => {
    setPlayable(false);
    setPlayerPlayedCard(card);
    console.log(card, "clicked");
  };

  const evaluateRound = () => {
    if (!playerPlayedCard || !opponentPlayedCard || roundEvaluated) {
      return;
    }
    setRoundEvaluated(true);
    setTimeout(() => {
      console.log("hallo?????");
      getRoundResults(playerPlayedCard, opponentPlayedCard).then((result) => {
        setRoundResult(result.winner);
        console.log("------------ round result:", result);
        if (result.winner === "player") {
          playerStacks[playerPlayedCard.type].push(playerPlayedCard.colour);
          setPlayerStacks(playerStacks);
          setStackNew({
            type: playerPlayedCard.type,
            player: "player",
          });
        } else if (result.winner === "opponent") {
          opponentStacks[opponentPlayedCard.type].push(
            opponentPlayedCard.colour
          );
          setOpponentStacks(opponentStacks);
          setStackNew({
            type: opponentPlayedCard.type,
            player: "opponent",
          });
        }
        setPlayerPlayedCard(null);
        setOpponentPlayedCard(null);
        getWinner(playerStacks, opponentStacks).then((result) => {
          if (result.winner) {
            console.log("winner", result.winner);
            console.log("cards", result.cards);
            setWinner(result.winner);
            setWinningCards(result.cards);
            // animate stack
          } else {
            setTimeout(resetRound(), 2000);
          }
        });
      });
    }, 1000);
  };

  const resetRound = () => {
    setRoundResult(null);
    setRoundEvaluated(false);
    // make a request to deal card if cards less than 3...then(set playable to true)
    setTimeout(() => {
      setDealCards(true);
      console.log("deal new card");
      //dealCards();
    }, 1000);
  };

  const startNewRound = () => {
    setDealCards(false);
    console.log("starting new round");
    setPlayable(true);
    setPlayableOp(true);
  };

  setUpCards();
  getOpponentMove(match);
  evaluateRound(playerPlayedCard, opponentPlayedCard);

  // front end stuff
  const getMainScreen = () => {
    console.log("getting main screen");
    return <MainScreen onStartClick={() => setNewGame(true)} />;
  };

  const getGameScreen = () => {
    return match ? (
      <div>
        play a card
        <div className="stacks-bar">
          <Stacks
            stacks={opponentStacks}
            newest={stackNew.player === "opponent" ? stackNew.type : null}
          />
          <Stacks
            stacks={playerStacks}
            newest={stackNew.player === "player" ? stackNew.type : null}
          />
        </div>
        {winner && winningCards ? (
          <WinStack cards={winningCards} winner={winner} />
        ) : (
          <div>no winner yet</div>
        )}
        {roundResult ? (
          <div style={{ fontWeight: "600", color: "pink" }}>
            {roundResult} wins this round.
          </div>
        ) : (
          <div>nothing</div>
        )}
        <PlayedCards
          id="played-cards"
          playerCard={playerPlayedCard}
          opponentCard={opponentPlayedCard}
        />
        <CardBar
          id="card-bar"
          match={match}
          cards={playerCards}
          playable={playable}
          newCard={!playerCards.includes(null)}
          onCardClick={(card) => handleCardClick(card)}
          dealCards={dealCards}
          onDealCards={startNewRound}
        />
      </div>
    ) : (
      <div style={{ width: "500px", height: "500px", backgroundColor: "red" }}>
        loading
      </div>
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" render={getMainScreen} exact />
          <Route path="/match" render={getGameScreen} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
