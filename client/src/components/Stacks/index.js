import "./style.css";
import { GiWaterDrop } from "react-icons/gi";
import { AiFillFire } from "react-icons/ai";
import { IoIosSnow } from "react-icons/io";

function SnowCard(props) {
  console.log(props.last);
  return (
    <div
      className={props.last ? "stack-card last" : "stack-card"}
      style={{
        backgroundColor: "#".concat(props.colour),
        bottom: (props.offset * 25).toString().concat("px"),
      }}
    >
      <IoIosSnow size="40px" fill="white" />
    </div>
  );
}

function WaterCard(props) {
  return (
    <div
      className={props.last ? "stack-card last" : "stack-card"}
      style={{
        backgroundColor: "#".concat(props.colour),
        bottom: (props.offset * 25).toString().concat("px"),
      }}
    >
      <GiWaterDrop size="40px" fill="rgb(133, 193, 197)" />
    </div>
  );
}

function FireCard(props) {
  return (
    <div
      className={props.last ? "stack-card last" : "stack-card"}
      style={{
        backgroundColor: "#".concat(props.colour),
        bottom: (props.offset * 25).toString().concat("px"),
      }}
    >
      <AiFillFire size="40px" fill="rgb(172, 32, 32)" />
    </div>
  );
}

function Stacks(props) {
  console.log(props.newest);
  return (
    <div className="stacks">
      <div className="stack">
        {props.stacks["snow"].map((colour, i) => (
          <SnowCard
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
          <WaterCard
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
          <FireCard
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
