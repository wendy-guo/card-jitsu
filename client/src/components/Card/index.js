import "./Card.css";

function Card(props) {
  return (
    <div
      className="card"
      style={{
        borderColor: props.card.colour,
        backgroundColor: "rgb(255, 230, 230)",
        height: props.height,
        width: props.width,
      }}
      onClick={() => props.onCardClick(props.index)}
    >
      <div
        className="card-number"
        style={{
          backgroundColor: props.card.colour,
          borderBottomRightRadius: "10px",
          width: "30px",
          height: "40px",
          fontSize: "30px",
          fontWeight: 600,
        }}
      >
        {props.card.number}
      </div>
      type {props.card.type}
    </div>
  );
}

export default Card;
