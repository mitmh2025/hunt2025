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
import img19 from "./assets/img19.png";
import img20 from "./assets/img20.png";
import img21 from "./assets/img21.png";
import img22 from "./assets/img22.png";
import img23 from "./assets/img23.png";
import img24 from "./assets/img24.png";
import img25 from "./assets/img25.png";
import img26 from "./assets/img26.png";
import img27 from "./assets/img27.png";

const Mono = styled.span`
  font-family: monospace;
`;

const FlexFullWidth = styled.div`
  width: 100%;
  padding: 0px 16px;
  display: flex;
  gap: 16px;
  & > * {
    flex: 1 1 calc(50% - 16px);
  }
`;

const SizedImage = styled.img`
  width: 100%;
`;

const Solution = () => {
  return (
    <>
      <p>
        This puzzle is presented as a series of orthographic projections (3-view
        drawings). When recreated in 3D each drawing creates a 3D object. These
        3D objects are essentially puzzle pieces. By assembling them together
        you get a 3D model of a <Mono>FIRE EXTINGUISHER</Mono>.
      </p>
      <FlexFullWidth>
        <a href={img01} target="_blank">
          <SizedImage src={img01} />
        </a>
        <a href={img14} target="_blank">
          <SizedImage src={img14} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img02} target="_blank">
          <SizedImage src={img02} />
        </a>
        <a href={img15} target="_blank">
          <SizedImage src={img15} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img03} target="_blank">
          <SizedImage src={img03} />
        </a>
        <a href={img16} target="_blank">
          <SizedImage src={img16} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img04} target="_blank">
          <SizedImage src={img04} />
        </a>
        <a href={img17} target="_blank">
          <SizedImage src={img17} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img05} target="_blank">
          <SizedImage src={img05} />
        </a>
        <a href={img18} target="_blank">
          <SizedImage src={img18} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img06} target="_blank">
          <SizedImage src={img06} />
        </a>
        <a href={img19} target="_blank">
          <SizedImage src={img19} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img07} target="_blank">
          <SizedImage src={img07} />
        </a>
        <a href={img20} target="_blank">
          <SizedImage src={img20} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img08} target="_blank">
          <SizedImage src={img08} />
        </a>
        <a href={img21} target="_blank">
          <SizedImage src={img21} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img09} target="_blank">
          <SizedImage src={img09} />
        </a>
        <a href={img22} target="_blank">
          <SizedImage src={img22} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img10} target="_blank">
          <SizedImage src={img10} />
        </a>
        <a href={img23} target="_blank">
          <SizedImage src={img23} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img11} target="_blank">
          <SizedImage src={img11} />
        </a>
        <a href={img24} target="_blank">
          <SizedImage src={img24} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img12} target="_blank">
          <SizedImage src={img12} />
        </a>
        <a href={img25} target="_blank">
          <SizedImage src={img25} />
        </a>
      </FlexFullWidth>
      <FlexFullWidth>
        <a href={img13} target="_blank">
          <SizedImage src={img13} />
        </a>
        <a href={img26} target="_blank">
          <SizedImage src={img26} />
        </a>
      </FlexFullWidth>
      <a href={img27} target="_blank">
        <SizedImage src={img27} />
      </a>
    </>
  );
};

export default Solution;
