import React, { useState } from "react";
import QuotesSlider from "./components/quotesSlider";
import tanyaImage from "./components/images/image_tanya.jpg";
import johnImage from "./components/images/image_john.jpg";
import johnCena from "./components/images/johnCena.jpg";
import Box1 from "./components/Box2";

function App() {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      name: "Tanya Sinclair",
      title: "UX Engineer",
      statement: `I’ve been interested in coding for a while but never taken the jump,
        until now. I couldn’t recommend this course enough. I’m now in the job
        of my dreams and so excited about the future.`,
      image: tanyaImage,
    },
    {
      id: 2,
      name: "John Tarkpor",
      title: "Junior Front-end Developer",
      statement: `If you want to lay the best foundation possible I’d recommend taking
        this course. The depth the instructors go into is incredible. I now
        feel so confident about starting up as a professional developer.`,
      image: johnImage,
    },
    {
      id: 3,
      name: "John Cena",
      title: "Wrestler",
      statement: ` If you want to lay the best foundation possible I’d recommend taking
      this course. The depth the instructors go into is incredible. I now
      feel so confident about starting up as a professional developer.`,
      image: johnCena,
    },
  ]);

  const [currentQuotes, setCurrentQuotes] = useState(0);

  function changeQuotes(action) {
    if (action === "next") {
      let c = currentQuotes + 1;
      c = c >= quotes.length ? 0 : c;
      // console.log(quotes.length);
      setCurrentQuotes(c);
    }
    if (action === "previous") {
      let q = currentQuotes - 1;
      q = q < 0 ? quotes.length - 1 : q;
      setCurrentQuotes(q);
    }
  }

  return (
    <div>
      <QuotesSlider
        quote={quotes[currentQuotes]}
        setCurrentQuote={changeQuotes}
      />
      <Box1 />
    </div>
  );
}

export default App;
