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
      {
        // if props.reveal, flip the Card component below
        props.opponentCard ? (
          <div className="opponent-card">
            <div className={props.reveal ? "inner-card reveal" : "inner-card"}>
              <div className="card-back"></div>
              <div className="card-front">
                <Card
                  index={-1}
                  card={props.opponentCard}
                  height="300px"
                  width="210px"
                  onCardClick={(_) => null}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="placeholder-card"> waiting for opponent </div>
        )
      }
      {props.playerCard ? (
        <Card
          index={-1}
          card={props.playerCard}
          height="300px"
          width="210px"
          onCardClick={(_) => -1}
        />
      ) : (
        <div className="placeholder-card"> play a card </div>
      )}
    </div>
  );
}

export default PlayedCards;
