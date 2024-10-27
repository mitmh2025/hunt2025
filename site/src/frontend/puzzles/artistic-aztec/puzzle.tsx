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

const Puzzle = () => {
  return (
    <>
      <a href={img01} target="_blank">
        <SizedImage src={img01} />
      </a>
      <a href={img02} target="_blank">
        <SizedImage src={img02} />
      </a>
      <a href={img03} target="_blank">
        <SizedImage src={img03} />
      </a>
      <a href={img04} target="_blank">
        <SizedImage src={img04} />
      </a>
      <a href={img05} target="_blank">
        <SizedImage src={img05} />
      </a>
      <a href={img06} target="_blank">
        <SizedImage src={img06} />
      </a>
      <a href={img07} target="_blank">
        <SizedImage src={img07} />
      </a>
      <a href={img08} target="_blank">
        <SizedImage src={img08} />
      </a>
      <a href={img09} target="_blank">
        <SizedImage src={img09} />
      </a>
      <a href={img10} target="_blank">
        <SizedImage src={img10} />
      </a>
      <a href={img11} target="_blank">
        <SizedImage src={img11} />
      </a>
      <a href={img12} target="_blank">
        <SizedImage src={img12} />
      </a>
      <a href={img13} target="_blank">
        <SizedImage src={img13} />
      </a>
    </>
  );
};

export default Puzzle;
