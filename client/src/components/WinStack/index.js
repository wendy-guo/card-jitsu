import "./style.css";
import { StackCard } from "../Stacks";

function WinStack(props) {
  console.log(props);
  return (
    <div className="win-stack">
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
  );
}

export default WinStack;
