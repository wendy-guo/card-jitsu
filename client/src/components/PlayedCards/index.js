import "./style.css";
import Card from "../Card";

function PlayedCards(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        height: "100%",
        margin: "0px auto 60px auto",
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
        <div className="placeholder-card"> waiting for opponent </div>
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
        <div className="placeholder-card"> play a card </div>
      )}
    </div>
  );
}

export default PlayedCards;
