import React from "react";

import casino1 from "./casino1.png";
import casino2 from "./casino2.png";
import casino3 from "./casino3.png";
import casino4 from "./casino4.png";
import casino5 from "./casino5.png";
import casino6 from "./casino6.png";
import casino7 from "./casino7.png";

const PuzzleContent = () => {
  const altText =
    "An illustration of a round of poker. There are markings visible in the dealer's glasses.";
  const imgStyle = {
    width: "800px",
    height: "450px",
  };

  return (
    <>
      <div className="flavor">
        <p>
          Doubling up with your seven lucky cards down your sleeves, you're sure
          to clean house, as long as you keep rank and conceal your con from the
          eagle-eyed dealer.
        </p>
        <p>How can you discover what Carter was up to at the casino?</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div>
          <img src={casino1} alt={altText} style={imgStyle} />
        </div>
        <div>
          <img src={casino2} alt={altText} style={imgStyle} />
        </div>
        <div>
          <img src={casino3} alt={altText} style={imgStyle} />
        </div>
        <div>
          <img src={casino4} alt={altText} style={imgStyle} />
        </div>
        <div>
          <img src={casino5} alt={altText} style={imgStyle} />
        </div>
        <div>
          <img src={casino6} alt={altText} style={imgStyle} />
        </div>
        <div>
          <img src={casino7} alt={altText} style={imgStyle} />
        </div>
      </div>
    </>
  );
};

export default PuzzleContent;
