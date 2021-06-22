import icon_next from "./images/icon_next.svg";
import pattern_quotes from "./images/pattern_quotes.svg";
import image_tanya from "./images/image_tanya.jpg";
import icon_prev from "./images/icon_prev.svg";
import pattern_bg from "./images/pattern_bg.svg";
import "./myStyle.css";
import React from "react";

// import React from "react";

const Box = () => {
  return (
    <div className="row">
      <img src={pattern_quotes} alt="" className="img1" />
      <p className="p0">
        “ I’ve been interested in coding for a while but never taken the jump,
        until now. I couldn’t recommend this course enough. I’m now in the job
        of my dreams and so excited about the future. ”
      </p>
      <p className="p1">
        Tanya Sinclair <i>UX Engineer</i>
      </p>
      <div className="current" hidden>
        0
      </div>
      <img name="myImages" src={image_tanya} alt="shh" className="img2" />
      <div className="links">
        <div className="link2">
          <button className="prev-btn">
            <img src={icon_prev} alt="shh" />
          </button>

          <button className="next-btn">
            <img src={icon_next} alt="shh" />
          </button>
        </div>
      </div>
      <img src={pattern_bg} className="img-style" alt="shh" />
    </div>
  );
};

export default Box;
