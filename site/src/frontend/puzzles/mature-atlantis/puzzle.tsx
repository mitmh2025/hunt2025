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
import img15 from "./assets/img15.png";
import img16 from "./assets/img16.png";
import img17 from "./assets/img17.png";
import img18 from "./assets/img18.png";

const SizedImage = styled.img`
  width: 400px;
  height: 400px;
  background-color: white;
  border: 2px solid black;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Puzzle = () => {
  return (
    <>
      <h3>Before</h3>
      <p>
        <div>1</div>
        <a href={img01} target="_blank" rel="noreferrer">
          <SizedImage src={img01} />
        </a>
      </p>
      <p>
        <div>2</div>
        <a href={img02} target="_blank" rel="noreferrer">
          <SizedImage src={img02} />
        </a>
      </p>
      <p>
        <div>3</div>
        <a href={img03} target="_blank" rel="noreferrer">
          <SizedImage src={img03} />
        </a>
      </p>
      <p>
        <div>4</div>
        <a href={img04} target="_blank" rel="noreferrer">
          <SizedImage src={img04} />
        </a>
      </p>
      <p>
        <div>5</div>
        <a href={img05} target="_blank" rel="noreferrer">
          <SizedImage src={img05} />
        </a>
      </p>
      <p>
        <div>6</div>
        <a href={img06} target="_blank" rel="noreferrer">
          <SizedImage src={img06} />
        </a>
      </p>
      <p>
        <div>7</div>
        <a href={img07} target="_blank" rel="noreferrer">
          <SizedImage src={img07} />
        </a>
      </p>
      <p>
        <div>8</div>
        <a href={img08} target="_blank" rel="noreferrer">
          <SizedImage src={img08} />
        </a>
      </p>
      <p>
        <div>9</div>
        <a href={img09} target="_blank" rel="noreferrer">
          <SizedImage src={img09} />
        </a>
      </p>
      <h3>After</h3>
      <FlexContainer>
        <a href={img10} target="_blank" rel="noreferrer">
          <SizedImage src={img10} />
        </a>
        <a href={img11} target="_blank" rel="noreferrer">
          <SizedImage src={img11} />
        </a>
        <a href={img12} target="_blank" rel="noreferrer">
          <SizedImage src={img12} />
        </a>
        <a href={img13} target="_blank" rel="noreferrer">
          <SizedImage src={img13} />
        </a>
        <a href={img14} target="_blank" rel="noreferrer">
          <SizedImage src={img14} />
        </a>
        <a href={img15} target="_blank" rel="noreferrer">
          <SizedImage src={img15} />
        </a>
        <a href={img16} target="_blank" rel="noreferrer">
          <SizedImage src={img16} />
        </a>
        <a href={img17} target="_blank" rel="noreferrer">
          <SizedImage src={img17} />
        </a>
        <a href={img18} target="_blank" rel="noreferrer">
          <SizedImage src={img18} />
        </a>
      </FlexContainer>
    </>
  );
};

export default Puzzle;
