import "./CardBar.css";
import Card from "../Card";

var myCards = [
  { type: "water", number: 5, colour: "rgb(197, 27, 56)" },
  { type: "water", number: 3, colour: "rgb(161, 231, 236)" },
  { type: "fire", number: 9, colour: "rgb(255, 236, 127)" },
  { type: "grass", number: 4, colour: "rgb(197, 27, 56)" },
  { type: "fire", number: 7, colour: "rgb(197, 27, 56)" },
];

function CardBar(props) {
  return (
    <div className="card-bar">
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
