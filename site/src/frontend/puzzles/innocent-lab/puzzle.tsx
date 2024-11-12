import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import jar1 from "./assets/jar1.png";
import jar2 from "./assets/jar2.png";
import jar3 from "./assets/jar3.png";
import jar4 from "./assets/jar4.png";
import jar5 from "./assets/jar5.png";
import jar6 from "./assets/jar6.png";
import jar7 from "./assets/jar7.png";
import jar8 from "./assets/jar8.png";
import jar9 from "./assets/jar9.png";
import jar10 from "./assets/jar10.png";
import jar11 from "./assets/jar11.png";

const LeftAlign = styled.div`
  margin-bottom: 1em;
`;

const RightAlign = styled.div`
  text-align: right;
  margin-bottom: 1em;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px;
`;

const SizedImageWrapper = styled.div`
  width: 200px;
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <LeftAlign>
        <div>
          Obnoxiously start beginning of film about Sparta…
          <strong>[-9904]</strong>
        </div>
        <div>
          The granite state, back East,…<strong>[+120]</strong>
        </div>
        <div>
          Cold hydronium, adding helium pointlessly,…<strong>[+798]</strong>
        </div>
        <div>
          Explosive Spruce Goose burnt residue…<strong>[-178]</strong>
        </div>
        <div>
          Reverend Sharpton put nothing into the Shepherd Psalm…
          <strong>[+36018]</strong>
        </div>
        <div>
          Disheartened, Gram spilled (gasp) the end of the answer to the
          ultimate question…<strong>[-4]</strong>
        </div>
        <div>
          Beginning to fly, first entering Angwin Airport…<strong>[+3]</strong>
        </div>
        <div>
          Flammable gas ring…<strong>[+5938]</strong>
        </div>
        <div>
          Church leaders take turns with the Beast, after cutting off its tail,…
          <strong>[+520]</strong>
        </div>
        <div>
          Extract of amino acid enantiomer…<strong>[+6477]</strong>
        </div>
        <div>
          Empty British Materials Science Department…<strong>[-5619]</strong>
        </div>
      </LeftAlign>
      <RightAlign>
        <div>
          …carried around palladium core <strong>[+10]</strong>
        </div>
        <div>
          …creating a white liquid: roiling, foaming sea <strong>[+20]</strong>
        </div>
        <div>
          …for animal sickened after ingesting radioactive metal{" "}
          <strong>[+66]</strong>
        </div>
        <div>
          …from whiskey and oddly discarded saltpetre <strong>[-1]</strong>
        </div>
        <div>
          …having been transformed and embracing inner peace{" "}
          <strong>[+7]</strong>
        </div>
        <div>
          …in a section of Air One (me, myself, and I) with excited doxie{" "}
          <strong>[+44]</strong>
        </div>
        <div>
          …is bright green <strong>[-34]</strong>
        </div>
        <div>
          …makes drug, stirred on a vial bottom <strong>[-22]</strong>
        </div>
        <div>
          …produces bullets with nickel, silver, lead <strong>[-20]</strong>
        </div>
        <div>
          …ruining topless snooze <strong>[+23]</strong>
        </div>
        <div>
          …upset a loser <strong>[+20]</strong>
        </div>
      </RightAlign>
      <FlexWrapper>
        <SizedImageWrapper>
          <LinkedImage src={jar1} alt="WARNING: ABRASIVE [-1]" />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage src={jar2} alt="WARNING: DAMAGES TIRES [+3]" />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage
            src={jar3}
            alt="WARNING: DISSOCIATES SPONTANEOUSLY [-3]"
          />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage src={jar4} alt="WARNING: DO NOT BLEACH [-1]" />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage src={jar5} alt="WARNING: IF INGESTED, DRINK [+8]" />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage src={jar6} alt="WARNING: MAY CAUSE DIARRHEA [-8]" />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage src={jar7} alt="WARNING: MAY STAIN METAL [+7]" />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage
            src={jar8}
            alt="WARNING: NOT FOR USE IN CORPSE DISPOSAL [-1]"
          />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage src={jar9} alt="WARNING: SELF-DEVOURING [+2]" />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage src={jar10} alt="WARNING: SOMEWHAT AROMATIC [+3]" />
        </SizedImageWrapper>
        <SizedImageWrapper>
          <LinkedImage
            src={jar11}
            alt="WARNING: SUPPLIED IN PAIRS, DO NOT SEPARATE [+4]"
          />
        </SizedImageWrapper>
      </FlexWrapper>
    </>
  );
};

export default Puzzle;
