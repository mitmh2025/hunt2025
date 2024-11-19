import React from "react";
import { createGlobalStyle, styled } from "styled-components";
import Spectral from "./assets/Spectral-Regular.ttf";

// Font from Google Fonts under OFL
// https://fonts.google.com/specimen/Spectral
const Fonts = createGlobalStyle`
  @font-face {
    font-family: "Spectral";
    src: url(${Spectral});
    font-weight: normal;
    font-style: normal;
  }
`;

const FontWrapper = styled.div`
  font-family: "Spectral";
`;

const LargerText = styled.div`
  font-size: 24px;
`;

const SmallerText = styled.div`
  font-size: 18px;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Fonts />
      <p className="puzzle-flavor">
        If you’re a smaller name, you might be tempted to embellish a little
        bit.
      </p>
      <FontWrapper>
        <LargerText>EARTH AIR FIRE WATER QVINTESSENCE</LargerText>
        <LargerText>BVOYANT FORCES</LargerText>
        <LargerText>THE VITRVVIAN MAN</LargerText>
        <LargerText>FOOD PRESERVATION VSING HIGH HEAT</LargerText>
        <LargerText>ELECTRICITY WITHIN A THVNDERSTORM</LargerText>
        <LargerText>INFINITESIMAL CALCVLVS</LargerText>
        <LargerText>MVTVAL INDVCTANCE</LargerText>
        <LargerText>HELIOCENTRIC MODEL OF THE VNIVERSE</LargerText>
        <LargerText>CHEMICAL NOMENCLATVRE</LargerText>
        <LargerText>EVOLVTIONARY BIOLOGY</LargerText>
        <SmallerText>BREED OF GOAT THAT PRODVCES MOHAIR</SmallerText>
        <SmallerText>CVTESY WAY TO TALK ABOVT LEPORIDAE</SmallerText>
        <SmallerText>FIRST NAME OF GVS ACTOR IN BETTER CALL SAVL</SmallerText>
        <SmallerText>SVBJECTS LIKE HISTORY OR LITERATVRE</SmallerText>
        <SmallerText>SVRNAME OF TOLSTOY PROTAGONIST</SmallerText>
        <SmallerText>
          CROWDS CHANT YOV SVCK IN TIME WITH THIS WRESTLERS MVSIC
        </SmallerText>
        <SmallerText>ANCIENT JVDEAN FORTRESS ON A PLATEAV</SmallerText>
        <SmallerText>CONSVME ALCOHOL BEFORE THE PARTY</SmallerText>
        <SmallerText>THE QVALITY OF BEING SVRREPTITIOVS</SmallerText>
        <SmallerText>ONE OF THIRTY TWO IN ADVLT HVMAN MOVTHS</SmallerText>
      </FontWrapper>
    </>
  );
};

export default Puzzle;
