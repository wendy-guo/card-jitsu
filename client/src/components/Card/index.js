import "./style.css";

function Card(props) {
  return props.card ? (
    <div
      className={
        props.played
          ? "card card-leave"
          : props.dealt
          ? "card card-enter"
          : "card"
      }
      style={{
        borderColor: "#".concat(props.card.colour),
        height: props.height,
        width: props.width,
      }}
      onClick={() => {
        props.onCardClick(props.index);
      }}
    >
      <div
        className="card-number"
        style={{
          backgroundColor: "#".concat(props.card.colour),
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
    <div
      className="card"
      style={{ height: props.height, width: props.width, opacity: 0 }}
    ></div>
  );
}

export default Card;
