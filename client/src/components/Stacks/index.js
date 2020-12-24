import "./style.css";
import { GiWaterDrop } from "react-icons/gi";
import { AiFillFire } from "react-icons/ai";
import { IoIosSnow } from "react-icons/io";

const getIcon = (type, size) => {
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

function StackCard(props) {
  console.log(props.last);
  return (
    <div
      className={props.last ? "stack-card last" : "stack-card"}
      style={{
        backgroundColor: "#".concat(props.colour),
        bottom: (props.offset * 30).toString().concat("px"),
        zIndex: 99 - props.offset,
      }}
    >
      {getIcon(props.type, props.size)}
    </div>
  );
}

function Stacks(props) {
  return (
    <div className="stacks">
      <div className="stack">
        {props.stacks["snow"].map((colour, i) => (
          <StackCard
            type="snow"
            size="50px"
            colour={colour}
            offset={i}
            last={
              i === props.stacks["snow"].length - 1 && props.newest === "snow"
            }
          />
        ))}
      </div>
      <div className="stack">
        {props.stacks["water"].map((colour, i) => (
          <StackCard
            type="water"
            size="50px"
            colour={colour}
            offset={i}
            last={
              i === props.stacks["water"].length - 1 && props.newest === "water"
            }
          />
        ))}
      </div>
      <div className="stack">
        {props.stacks["fire"].map((colour, i) => (
          <StackCard
            type="fire"
            size="50px"
            colour={colour}
            offset={i}
            last={
              i === props.stacks["fire"].length - 1 && props.newest === "fire"
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Stacks;
export { StackCard };
