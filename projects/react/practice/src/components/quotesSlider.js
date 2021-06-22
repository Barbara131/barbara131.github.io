import React from "react";
import icon_next from "./images/icon_next.svg";
import pattern_quotes from "./images/pattern_quotes.svg";
// import image_tanya from "./images/image_tanya.jpg";
import icon_prev from "./images/icon_prev.svg";
import pattern_bg from "./images/pattern_bg.svg";
import "./myStyle.css";

function quotesSlider({ quote, setCurrentQuote }) {
  function onRight() {
    setCurrentQuote("next");
  }
  function onLeft() {
    setCurrentQuote("previous");
  }
  return (
    <div className="row">
      <img src={pattern_quotes} alt="" className="img1" />
      <p className="p0">“{quote.statement}”</p>
      <p className="p1">
        {quote.name}
        <i>{" " + quote.title}</i>
      </p>
      <div className="current" hidden>
        0
      </div>
      <img name="myImages" src={quote.image} alt="" className="img2" />
      <div className="links">
        <div className="link2">
          <button className="prev-btn" onClick={onLeft}>
            <img src={icon_prev} alt="" />
          </button>
          <button className="next-btn" onClick={onRight}>
            <img src={icon_next} alt="" />
          </button>
        </div>
      </div>
      <img src={pattern_bg} alt="" className="img-style" />
    </div>
  );
}

export default quotesSlider;
