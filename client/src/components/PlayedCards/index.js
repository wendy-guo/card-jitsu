import "./PlayedCards.css";
import Card from "../Card";

function PlayedCards(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {props.opponentCard ? (
        <Card
          index={-1}
          card={props.opponentCard}
          height="300px"
          width="210px"
          onCardClick={(index) => null}
        />
      ) : (
        <div className="played-card"> waiting for opponent </div>
      )}
      {props.playerCard ? (
        <Card
          index={-1}
          card={props.playerCard}
          height="300px"
          width="210px"
          onCardClick={(index) => -1}
        />
      ) : (
        <div className="played-card"> play a card </div>
      )}
    </div>
  );
}

export default PlayedCards;
