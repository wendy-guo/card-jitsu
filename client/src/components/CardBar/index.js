import "./CardBar.css";
import Card from "../Card";

function CardBar(props) {
  return (
    <div className={props.playable ? "card-bar playable" : "card-bar"}>
      {props.cards.map((card, i) => (
        <Card
          index={i}
          key={i}
          card={card}
          height="200px"
          width="140px"
          onCardClick={(index) => props.onCardClick(index)}
        />
      ))}
    </div>
  );
}

export default CardBar;
