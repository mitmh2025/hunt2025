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
        <Mono as="div">P, A, FIISI, A, L; A, R, LYSBE, U, T</Mono>
        <Mono as="div">F C C, S GP, D C, PP, K; TIN, S, INWSF, S, K</Mono>
        <Mono as="div">D, EYQBE, W L, SQL, R L; N M, IGH, QL A, HAN, H G</Mono>
        <Mono as="div">B U, R U, TRFEA, I, YGC; NCG, C F, KNK, F T, MZR</Mono>
        <Mono as="div">QB, LHF, DNKF, HK, L K; R N, MT, EBHE, DXG, EA</Mono>
      </div>
    </>
  );
};
/* eslint-enable no-irregular-whitespace -- we want the underscores to appear as separate entities */

export default Puzzle;
