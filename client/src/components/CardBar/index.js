import "./style.css";
import Card from "../Card";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function CardBar(props) {
  return (
    <div>
      <TransitionGroup
        className={props.playable ? "card-bar playable" : "card-bar"}
      >
        {props.cards.map((card, i) => (
          <CSSTransition key={i} timeout={500} classNames="card">
            <Card
              index={i}
              key={i}
              card={card}
              height="200px"
              width="140px"
              onCardClick={(index) => props.onCardClick(index)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default CardBar;
