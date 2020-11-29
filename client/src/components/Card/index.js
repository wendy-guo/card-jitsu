import "./style.css";

function Card(props) {
  return props.card ? (
    <div
      className="card"
      style={{
        borderColor: props.card.colour,
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
  ) : (
    <div className="card" style={{ height: props.height, width: props.width, opacity: 0 }}></div>
  );
}

export default Card;
