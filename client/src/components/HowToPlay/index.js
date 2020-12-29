import { NavLink } from "react-router-dom";
import "./style.css";
import background from "../../assets/background.png";
import page1 from "../../assets/page1.png";
import page2 from "../../assets/page3.png";
import page3 from "../../assets/page4.png";
import Carousel from "react-bootstrap/Carousel";

function Page(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ width: "50%" }}
          src={props.image}
          alt="visual instruction"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "200px",
        }}
      >
        <div
          className="dialogue-box"
          style={{ backgroundImage: `url(${background})` }}
        >
          {props.text}
        </div>
      </div>
    </div>
  );
}

function HowToPlay(_) {
  return (
    <div className="instructions">
      {
        // back button to main screen
      }
      <Carousel>
        <Carousel.Item>
          <Page
            image={page1}
            text="Each card has three attributes: value (ranges from 2-12), element (water, snow, or fire), and colour (pink, red, blue, purple, orange, or green)."
          />
        </Carousel.Item>
        <Carousel.Item>
          <Page
            image={page2}
            text="Each element defeats another. Water puts out fire, fire melts snow, while snow freezes water. If the elements are the same, the higher number wins, otherwise it's a tie."
          />
        </Carousel.Item>
        <Carousel.Item>
          <Page
            image={page3}
            text="The objective of the game is to collect three cards of different colours; either of one element, or one of each element. "
          />
        </Carousel.Item>
      </Carousel>
        <button style={{ marginTop: "10%" }}>
          <NavLink to="/">
            <span className="button-text">back</span>
          </NavLink>
        </button>
    </div>
  );
}

export default HowToPlay;
