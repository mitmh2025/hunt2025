import React from "react";
import { styled } from "styled-components";
import image_01 from "./assets/image_01.png";
import image_02 from "./assets/image_02.png";
import image_03 from "./assets/image_03.png";
import image_04 from "./assets/image_04.png";
import image_05 from "./assets/image_05.png";
import image_06 from "./assets/image_06.png";
import image_07 from "./assets/image_07.png";
import image_08 from "./assets/image_08.png";
import image_09 from "./assets/image_09.png";
import image_10 from "./assets/image_10.png";
import image_11 from "./assets/image_11.png";
import image_12 from "./assets/image_12.png";
import image_13 from "./assets/image_13.png";
import image_14 from "./assets/image_14.png";
import image_15 from "./assets/image_15.png";
import image_16 from "./assets/image_16.png";
import image_17 from "./assets/image_17.png";
import image_18 from "./assets/image_18.png";
import image_19 from "./assets/image_19.png";
import image_20 from "./assets/image_20.png";
import image_21 from "./assets/image_21.png";
import image_22 from "./assets/image_22.png";
import image_23 from "./assets/image_23.png";
import image_24 from "./assets/image_24.png";
import image_25 from "./assets/image_25.png";

const PaddedImg = styled.img`
  width: 153px;
  padding: 4px;
`;

const CenteredP = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const BottomImg = styled.img`
  width: 660px;
`;

const Wrapper = styled.div`
  &:has(input:checked) #firstToggle {
    display: none;
  }
  &:not(:has(input:checked)) #secondToggle {
    display: none;
  }
`;

const ImageBox = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 8px;
  text-align: center;
  line-height: 0;
`;

const ToggleAnnotationTD = styled.td`
  font-weight: 700;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--gray-300);
    transition: 0.4s;
    border-radius: 34px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScgLz4KICA8Y2lyY2xlIGN4PSczJyBjeT0nMycgcj0nMycgZmlsbD0nYmxhY2snLz4KPC9zdmc+Cg==");
    background-repeat: repeat;
    transition: 0.4s;
    border-radius: 50%;
    object-fit: fill;
  }
  input:checked + .slider {
    background-color: var(--gray-300);
  }
  input:checked + .slider:before {
    transform: translateX(26px);
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J2JsYWNrJyBzdHJva2Utd2lkdGg9JzMnLz4KPC9zdmc+");
    background-repeat: repeat;
  }
`;

const Puzzle = () => {
  return (
    <>
      <Wrapper>
        <p className="puzzle-flavor">
          Colors are fragrant, but they shift and shift. —Kūkai
        </p>

        <p>
          <center>
            <table>
              <tbody>
                <tr>
                  <ToggleAnnotationTD> ENGLISH&nbsp; </ToggleAnnotationTD>
                  <td>
                    <Switch>
                      <input type="checkbox" id="myButton" autoComplete="off" />
                      <span className="slider" />
                    </Switch>
                  </td>
                  <ToggleAnnotationTD> &nbsp;日本語 </ToggleAnnotationTD>
                </tr>
              </tbody>
            </table>
          </center>
        </p>

        <ImageBox>
          <div id="firstToggle">
            <PaddedImg src={image_01} />
            <PaddedImg src={image_02} />
            <PaddedImg src={image_03} />
            <PaddedImg src={image_04} />
            <PaddedImg src={image_05} />
            <PaddedImg src={image_06} />
            <PaddedImg src={image_07} />
            <PaddedImg src={image_08} />
            <PaddedImg src={image_09} />
            <PaddedImg src={image_10} />
            <PaddedImg src={image_11} />
            <PaddedImg src={image_12} />
            <PaddedImg src={image_13} />
            <PaddedImg src={image_14} />
            <PaddedImg src={image_15} />
            <PaddedImg src={image_16} />
            <PaddedImg src={image_17} />
            <PaddedImg src={image_18} />
            <PaddedImg src={image_19} />
            <PaddedImg src={image_20} />
            <PaddedImg src={image_21} />
            <PaddedImg src={image_22} />
            <PaddedImg src={image_23} />
            <PaddedImg src={image_24} />
          </div>
          <div id="secondToggle" className="hidden">
            <PaddedImg src={image_19} />
            <PaddedImg src={image_23} />
            <PaddedImg src={image_21} />
            <PaddedImg src={image_01} />
            <PaddedImg src={image_08} />
            <PaddedImg src={image_24} />
            <PaddedImg src={image_18} />
            <PaddedImg src={image_04} />
            <PaddedImg src={image_03} />
            <PaddedImg src={image_16} />
            <PaddedImg src={image_10} />
            <PaddedImg src={image_06} />
            <PaddedImg src={image_22} />
            <PaddedImg src={image_02} />
            <PaddedImg src={image_17} />
            <PaddedImg src={image_14} />
            <PaddedImg src={image_07} />
            <PaddedImg src={image_20} />
            <PaddedImg src={image_12} />
            <PaddedImg src={image_05} />
            <PaddedImg src={image_11} />
            <PaddedImg src={image_09} />
            <PaddedImg src={image_15} />
            <PaddedImg src={image_13} />
          </div>
        </ImageBox>

        <CenteredP>
          <BottomImg src={image_25} />
        </CenteredP>
        <CenteredP>(3 3 2 3 6 3)</CenteredP>
      </Wrapper>
    </>
  );
};

export default Puzzle;
