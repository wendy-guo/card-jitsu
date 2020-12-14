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
  const [cards, set] = useState(props.cards);

  const dealCards = (match_id) => {
    getDealedCards(match_id).then((card) => {
      cards[cards.findIndex((card) => card === null)] = card;
      set(cards);
      console.log("cards have been dealt");
      props.onDealCards();
    });
  };

  const handleCardClick = (i) => {
    if (props.playable) {
      props.onCardClick(cards[i]);
      cards[i] = null;
      console.log(cards);
      set(cards);
    }
  };

  if (props.dealCards && cards.includes(null)) {
    dealCards(props.match);
  }

  return (
    <div className={props.playable ? "card-bar playable" : "card-bar"}>
      {cards.map((card, i) => (
        <Card
          style={props}
          key={i}
          index={i}
          card={card}
          height="200px"
          width="140px"
          onCardClick={(i) => handleCardClick(i)}
        />
      ))}
    </div>
  );
}

export default CardBar;
