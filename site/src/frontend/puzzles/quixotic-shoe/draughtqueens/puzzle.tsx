import React from "react";
import { styled } from "styled-components";
import Crossword from "../../../components/Crossword";
import rootUrl from "../../../utils/rootUrl";
import { DRAUGHTQUEENS_LABELS } from "./data";

const Arrow = styled.span`
  color: var(--black);
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p>
        <Arrow>←</Arrow>{" "}
        <a
          href={`${rootUrl}/puzzles/and_now_a_puzzling_word_from_our_sponsors`}
        >
          Back to main puzzle
        </a>
      </p>
      <p>Enumerations have been withheld.</p>
      <Crossword labels={DRAUGHTQUEENS_LABELS} />
      <h3>Across</h3>
      <div>1. Tramp beheaded spy…that’s rough</div>
      <div>4. Cop’s right, every able man starts to read the riot act</div>
      <div>7. Politeness: Admitting one’s quiet</div>
      <div>8. Admonish herb’s victory, becoming dead</div>
      <div>9. It’s amazing, escorting me!</div>
      <div>13. Dip most of pen in drink and try to get a strong drink</div>
      <div>17. Endlessly mosey about—oh! A very large animal</div>
      <div>18. Tell me where you can order pastrami in a city in India</div>
      <div>19. Grind on west with anger</div>
      <div>20. Was originally too egregious to discard</div>
      <h3>Down</h3>
      <div>
        1. Heart of nettle steeped in Leipzig lager is pleasantry in Potsdam
      </div>
      <div>2. Manly Padre Manny left padre out</div>
      <div>3. Initially you’ll eat, then eventually</div>
      <div>4. Sample apricot tart and fresh cheese</div>
      <div>5. AI incorporating half-lies and second-rate excuse</div>
      <div>6. Buddies confused by stitching</div>
      <div>10. Bottom-scratching geezers at odds? Well, I’ll be darned…</div>
      <div>11. Bungled cut-off broadcast is the worst</div>
      <div>12. Airport, as of now, regular</div>
      <div>13. University back east is an experience</div>
      <div>14. Short rations lead to hospital, it was said</div>
      <div>15. He’s carrying fifty liters of MDMA into places of torment</div>
      <div>16. Assemble pier in hollow tunnel? How useless</div>
      <div>18. Morning wetness expected, reportedly</div>
    </>
  );
};

export default Puzzle;
