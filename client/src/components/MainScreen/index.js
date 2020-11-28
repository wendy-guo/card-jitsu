import { NavLink } from "react-router-dom";

function MainScreen(props) {
  return (
    <div>
      <NavLink to="/match">
        <button onClick={props.onStartClick}>start game</button>
      </NavLink>
    </div>
  );
}

export default MainScreen;
