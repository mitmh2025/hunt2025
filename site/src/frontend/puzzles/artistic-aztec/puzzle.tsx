import React from "react";
import { styled } from "styled-components";
import img01 from "./assets/img01.png";
import img02 from "./assets/img02.png";
import img03 from "./assets/img03.png";
import img04 from "./assets/img04.png";
import img05 from "./assets/img05.png";
import img06 from "./assets/img06.png";
import img07 from "./assets/img07.png";
import img08 from "./assets/img08.png";
import img09 from "./assets/img09.png";
import img10 from "./assets/img10.png";
import img11 from "./assets/img11.png";
import img12 from "./assets/img12.png";
import img13 from "./assets/img13.png";

const SizedImage = styled.img`
  width: 100%;
`;

const PUZZLE_IMAGE_ALT_TEXT =
  "An orthographic projection of a 3-dimensional object. The projection is outlined in blue, with dotted lines indicating shape on the underside of the object. In the bottom right of the image is text 'Just Plane Wrong', and a logo for 'The MITropolis Design Group.'";

const Puzzle = () => {
  return (
    <>
      <a href={img01} target="_blank" rel="noreferrer">
        <SizedImage src={img01} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img02} target="_blank" rel="noreferrer">
        <SizedImage src={img02} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img03} target="_blank" rel="noreferrer">
        <SizedImage src={img03} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img04} target="_blank" rel="noreferrer">
        <SizedImage src={img04} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img05} target="_blank" rel="noreferrer">
        <SizedImage src={img05} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img06} target="_blank" rel="noreferrer">
        <SizedImage src={img06} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img07} target="_blank" rel="noreferrer">
        <SizedImage src={img07} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img08} target="_blank" rel="noreferrer">
        <SizedImage src={img08} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img09} target="_blank" rel="noreferrer">
        <SizedImage src={img09} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img10} target="_blank" rel="noreferrer">
        <SizedImage src={img10} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img11} target="_blank" rel="noreferrer">
        <SizedImage src={img11} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img12} target="_blank" rel="noreferrer">
        <SizedImage src={img12} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
      <a href={img13} target="_blank" rel="noreferrer">
        <SizedImage src={img13} alt={PUZZLE_IMAGE_ALT_TEXT} />
      </a>
    </>
  );
};

export default Puzzle;
