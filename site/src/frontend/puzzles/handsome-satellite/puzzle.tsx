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
import img14 from "./assets/img14.png";

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Puzzle = () => {
  return (
    <>
      <ul>
        <li>At a walking pace, musically</li>
        <li>1988 Tim Burton movie title</li>
        <li>It’s often confused with bison</li>
        <li>Farewell, casually</li>
        <li>Roman L</li>
        <li>Young women</li>
        <li>Turn signal, for example</li>
        <li>Whereabouts</li>
        <li>Red juice in a snowman-shaped bottle</li>
        <li>Vows</li>
        <li>Swing a club on the green</li>
        <li>Romantic partner (abbr.)</li>
        <li>Hole to get water</li>
      </ul>
      <FlexWrapper>
        <a href={img01} target="_blank" rel="noreferrer">
          <img src={img01} />
        </a>
        <a href={img02} target="_blank" rel="noreferrer">
          <img src={img02} />
        </a>
        <a href={img03} target="_blank" rel="noreferrer">
          <img src={img03} />
        </a>
        <a href={img04} target="_blank" rel="noreferrer">
          <img src={img04} />
        </a>
        <a href={img05} target="_blank" rel="noreferrer">
          <img src={img05} />
        </a>
        <a href={img06} target="_blank" rel="noreferrer">
          <img src={img06} />
        </a>
        <a href={img07} target="_blank" rel="noreferrer">
          <img src={img07} />
        </a>
        <a href={img08} target="_blank" rel="noreferrer">
          <img src={img08} />
        </a>
        <a href={img09} target="_blank" rel="noreferrer">
          <img src={img09} />
        </a>
        <a href={img10} target="_blank" rel="noreferrer">
          <img src={img10} />
        </a>
        <a href={img11} target="_blank" rel="noreferrer">
          <img src={img11} />
        </a>
        <a href={img12} target="_blank" rel="noreferrer">
          <img src={img12} />
        </a>
        <a href={img13} target="_blank" rel="noreferrer">
          <img src={img13} />
        </a>
        <a href={img14} target="_blank" rel="noreferrer">
          <img src={img14} />
        </a>
      </FlexWrapper>
    </>
  );
};

export default Puzzle;
