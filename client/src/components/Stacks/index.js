import "./style.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function SnowCard(props) {
  return (
    <CSSTransition timeout={500} className="snow-card">
      <div className="stack-card" style={{ backgroundColor: props.colour }}>
        snow
      </div>
    </CSSTransition>
  );
}

function WaterCard(props) {
  return (
    <div className="stack-card" style={{ backgroundColor: props.colour }}>
      water
    </div>
  );
}

function FireCard(props) {
  return (
    <div className="stack-card" style={{ backgroundColor: props.colour }}>
      fire
    </div>
  );
}

function Stacks(props) {
  return (
    <div className="stacks">
      <div className="stack">
        {props.stacks["snow"].map((colour) => (
          <SnowCard colour={colour} />
        ))}
      </div>
      <div className="stack">
        {props.stacks["water"].map((colour) => (
          <WaterCard colour={colour} />
        ))}
      </div>
      <div className="stack">
        {props.stacks["fire"].map((colour) => (
          <FireCard colour={colour} />
        ))}
      </div>
    </div>
  );
}

export default Stacks;
