import { NavLink } from "react-router-dom";
import "./style.css";

const howToPlay = () => {
  console.log("here are the rules");
};

function MainScreen(props) {
  return (
    <div className="main-screen">
      <div className="title">
        <div>
          <span style={{ transform: "rotate(-10deg) translateY(4px)" }}>C</span>
          <span style={{ transform: "rotate(7deg) translateY(5px)" }}>a</span>
          <span style={{ transform: "rotate(4deg) translateY(2px)" }}>r</span>
          <span style={{ transform: "rotate(-3deg) translateY(1px)" }}>d</span>
        </div>
        <div>
          <span style={{ transform: "rotate(-8deg) translateY(3px)" }}>J</span>
          <span style={{ transform: "rotate(10deg) translateY(1px)" }}>i</span>
          <span style={{ transform: "rotate(5deg) translateY(4px)" }}>t</span>
          <span style={{ transform: "rotate(3deg) translateY(0px)" }}>s</span>
          <span style={{ transform: "rotate(9deg) translateY(5px)" }}>u</span>
        </div>
      </div>
      <button onClick={howToPlay()}>
        <span className="button-text">how to play</span>
      </button>

      <button onClick={props.onStartClick} style={{ marginBottom: "100px" }}>
        <NavLink to="/match">
          <span className="button-text">start game</span>
        </NavLink>
      </button>
    </div>
  );
}

export default MainScreen;
