import React from "react";

/* eslint-disable no-irregular-whitespace -- we want the underscores in the flavortext to appear as separate entities */
const Puzzle = () => {
  return (
    <>
      <div className="puzzle-flavor">
        This is you; this is what _ _crosses you.
      </div>

      <div>
        <div>
          <code>P, A, FIISI, A, L; A, R, LYSBE, U, T</code>
        </div>
        <div>
          <code>F C C, S GP, D C, PP, K; TIN, S, INWSF, S, K</code>
        </div>
        <div>
          <code>D, EYQBE, W L, SQL, R L; N M, IGH, QL A, HAN, H G</code>
        </div>
        <div>
          <code>B U, R U, TRFEA, I, YGC; NCG, C F, KNK, F T, MZR</code>
        </div>
        <div>
          <code>QB, LHF, DNKF, HK, L K; R N, MT, EBHE, DXG, EA</code>
        </div>
      </div>
    </>
  );
};
/* eslint-enable no-irregular-whitespace -- we want the underscores to appear as separate entities */

export default Puzzle;
