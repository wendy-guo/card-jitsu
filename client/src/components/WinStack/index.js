import "./style.css";
import { StackCard } from "../Stacks";

function WinStack(props) {
  console.log(props);
  return (
    <div className="win-stack">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {props.cards.map((card) => (
          <StackCard
            type={card.type}
            size="70px"
            colour={card.colour}
            offset={0}
            last={true}
          />
        ))}
      </div>
      {props.winner === "player" ? (
        <div className="result">you win!!!</div>
      ) : (
        <div className="result">you lost :(</div>
      )}
    </div>
  );
}

export default WinStack;
