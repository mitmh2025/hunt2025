import React from "react";
import LinkedImage from "../../components/LinkedImage";
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
  return (
    <>
      <div className="flavor">
        <p>
          Doubling up with your seven lucky cards down your sleeves,
          you&rsquo;re sure to clean house, as long as you keep rank and conceal
          your con from the eagle-eyed dealer.
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
        <LinkedImage src={casino1} alt={altText} />
        <LinkedImage src={casino2} alt={altText} />
        <LinkedImage src={casino3} alt={altText} />
        <LinkedImage src={casino4} alt={altText} />
        <LinkedImage src={casino5} alt={altText} />
        <LinkedImage src={casino6} alt={altText} />
        <LinkedImage src={casino7} alt={altText} />
      </div>
    </>
  );
};

export default PuzzleContent;
