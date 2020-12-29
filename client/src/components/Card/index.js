import "./style.css";
import { GiWaterDrop } from "react-icons/gi";
import { AiFillFire } from "react-icons/ai";
import { IoIosSnow } from "react-icons/io";
import ruby from "../../villagers/ruby.png";
import marina from "../../villagers/marina.png";
import apple from "../../villagers/apple.png";
import aurora from "../../villagers/aurora.png";

const getIcon = (type, size) => {
  console.log(type);
  switch (type) {
    case "snow":
      return <IoIosSnow size={size} fill="white" />;
    case "water":
      return <GiWaterDrop size={size} fill="rgb(133, 193, 197)" />;
    case "fire":
      return <AiFillFire size={size} fill="rgb(172, 32, 32)" />;
    default:
      return;
  }
};

const getVillager = (colour, height, width) => {
  switch (colour) {
    case "d95252": // red
      return (
        <img
          class="villager-image"
          height={height}
          width={width}
          src={apple}
          alt="apple"
        />
      );
    case "ffd4d4": // pink
      return (
        <img
          class="villager-image"
          height={height}
          width={width}
          src={ruby}
          alt="ruby"
        />
      );
    case "ab86b6": // purple
      return (
        <img
          class="villager-image"
          height={height}
          width={width}
          src={marina}
          alt="marina"
        />
      );
    case "a1e9ff": //blue
      return (
        <img
          class="villager-image"
          height={height}
          width={width}
          src={aurora}
          alt="aurora"
        />
      );
    default:
      return (
        <img
          class="villager-image"
          height={height}
          width={width}
          src={ruby}
          alt="ruby"
        />
      );
  }
};

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
          width: "45px",
          height: "80px",
          fontSize: "30px",
          fontWeight: 600,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ height: "30px" }}>{getIcon(props.card.type, "35px")}</div>
        <div style={props.card.number > 9 ? {} : { marginLeft: "20%" }}>
          {props.card.number}
        </div>
      </div>
      {getVillager(props.card.colour, props.height, props.width)}
    </div>
  ) : (
    <div
      className="card"
      style={{ height: props.height, width: props.width, opacity: 0 }}
    ></div>
  );
}

export default Card;
