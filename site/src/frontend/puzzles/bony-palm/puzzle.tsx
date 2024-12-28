import React from "react";
import { Mono } from "../../components/StyledUI";

/* eslint-disable no-irregular-whitespace -- we want the underscores in the flavortext to appear as separate entities */
const Puzzle = () => {
  return (
    <>
      <div className="puzzle-flavor">
        This is you; this is what _ _crosses you.
      </div>

      <div>
        <div>
          <Mono>P, A, FIISI, A, L; A, R, LYSBE, U, T</Mono>
        </div>
        <div>
          <Mono>F C C, S GP, D C, PP, K; TIN, S, INWSF, S, K</Mono>
        </div>
        <div>
          <Mono>D, EYQBE, W L, SQL, R L; N M, IGH, QL A, HAN, H G</Mono>
        </div>
        <div>
          <Mono>B U, R U, TRFEA, I, YGC; NCG, C F, KNK, F T, MZR</Mono>
        </div>
        <div>
          <Mono>QB, LHF, DNKF, HK, L K; R N, MT, EBHE, DXG, EA</Mono>
        </div>
      </div>
    </>
  );
};
/* eslint-enable no-irregular-whitespace -- we want the underscores to appear as separate entities */

export default Puzzle;
