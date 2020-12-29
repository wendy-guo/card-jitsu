import "./style.css";
import Card from "../Card";
import { useState } from "react";

const getDealedCards = async (match_id) => {
  const request = new Request(`/deal-cards?match_id=${match_id}`, {
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

function CardBar(props) {
  const [cards, setCards] = useState(props.cards);
  const [played, setPlayed] = useState(-1);
  const [dealing, setDealing] = useState(false);
  const [dealt, setDealt] = useState(false);

  const dealCards = (match_id, empty) => {
    getDealedCards(match_id).then((card) => {
      setDealt(empty);
      cards[empty] = card;
      setCards(cards);
      props.onDealCards();
      setDealing(false);
    });
  };

  const handleCardClick = (i) => {
    if (props.playable) {
      console.log("playing card...");
      setPlayed(i);
      props.onCardClick(cards[i]);
    }
  };

  if (props.dealCards && !dealing && played !== -1) {
    console.log("getting new dealed card");
    setDealing(true);
    setTimeout(() => {
      cards[played] = null;
      setCards(cards);
      setPlayed(-1);
      dealCards(props.match, played);
    }, 600);
  }

  return (
    <div className={props.playable ? "card-bar playable" : "card-bar"}>
      {cards.map((card, i) => (
        <Card
          style={props}
          key={i}
          index={i}
          card={card}
          played={i === played}
          dealt={i === dealt}
          height="240px"
          width="168px"
          onCardClick={(i) => handleCardClick(i)}
        />
      ))}
    </div>
  );
}

export default CardBar;
