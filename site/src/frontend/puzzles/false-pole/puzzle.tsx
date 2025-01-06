import React from "react";
import LinkedImage from "../../components/LinkedImage";
import puzzle1 from "./assets/puzzle1.png";
import puzzle2 from "./assets/puzzle2.png";

const Puzzle = (): JSX.Element => {
  return (
    <>
      <LinkedImage src={puzzle1} alt="A musical score" />
      <LinkedImage src={puzzle2} alt="A musical score" />
      <ul>
        <li>
          A Central Square sushi restaurant used to be named after him (WSW 2)
        </li>
        <li>Appeared as himself in a Spielberg film (SE 1)</li>
        <li>Bassist who played the Five Spot with Thelonious Monk (WNW 1)</li>
        <li>Close friend of Charlie Parker, saxophonist, and arranger (E 2)</li>
        <li>
          Composed a ragtime piece too difficult to play, but slowed it down 30
          years later to become a best selling record (NW 1)
        </li>
        <li>Featured member of the Cab Calloway Orchestra (ESE 1)</li>
        <li>He played in the Coleman Hawkins Quartet (W 1)</li>
        <li>He played the Shanghai Canidrome (E 1)</li>
        <li>He wrote a guide on toilet training your cat (NNE 1)</li>
        <li>
          Member of John Kirby’s Onyx Club Boys who occasionally lent his name
          to the group (ENE 1)
        </li>
        <li>Member of Louis Armstrong’s Hot Five (SSE 1)</li>
        <li>
          Member of Woody Herman’s Herd who played a five-string bass (W 1)
        </li>
        <li>Saxophonist who wrote two memoirs and an autobiography (E 1)</li>
        <li>She received an OBE and a Grammy for lifetime achievement (W 1)</li>
        <li>Trombonist and member of the World’s Greatest Jazz Band (WSW 2)</li>
      </ul>
    </>
  );
};

export default Puzzle;
