import React from "react";
import { type TeamHuntState } from "../../../../lib/api/client";
import { ArchivalNotice, AuthorsNote } from "../../components/PuzzleLayout";
import { MailtoLink } from "../../components/StyledUI";
import model_3mf from "./assets/rings-with-detentes-postsolve.3mf";
import model_stl from "./assets/rings-with-detentes-postsolve.stl";
import pdf_sticker from "./assets/rod-sticker.pdf";

const Puzzle = ({ teamState }: { teamState: TeamHuntState }) => {
  return (
    <AuthorsNote as="div">
      <p>
        During Mystery Hunt, teams were instructed to visit us at the Gala to
        pick up the puzzle. When they did so, they received a zipper lock bag
        containing 45 small 3D-printed pieces and a 12” long, ¾” diameter wooden
        dowel with a sticker on it.
      </p>

      <p>
        If you’d like to solve this puzzle for yourself, you can find the
        sticker for the dowel <a href={pdf_sticker}>here</a> and the source file
        for the 3D printed pieces <a href={model_3mf}>here</a> (in 3MF format)
        or <a href={model_stl}>here</a> (in STL format). For Hunt, the puzzle
        was printed using Hatchbox’s{" "}
        <a href="https://www.hatchbox3d.com/collections/pla-1-75mm/products/3d-pla-1kg1-75-shny-brnz">
          metallic finish bronze PLA filament
        </a>
        ; it should be solvable with any material, but it may be more difficult
        to see fine details with white or black. The 3MF file also reflects the
        settings we used for printing the puzzle using a Bambu X1-series
        printer; you may need to make adjustments for different printers. We
        recommend printing with supports enabled for the best solving
        experience, although they are not strictly necessary.
      </p>

      <p>
        You can also find the OnShape file used to produce the puzzle{" "}
        <a href="https://cad.onshape.com/documents/d96dc5539b37502e00e55df7/w/07d99548c15b394bb3432926/e/0d9a17b6d1c7aa63c71d6fb7?renderMode=0&uiState=678fedb86da0a13e5ad260e4">
          here
        </a>
        , although that will spoil some steps of the puzzle.
      </p>
    </AuthorsNote>
  );

  const pickupCompleted =
    teamState.rounds.missing_diamond?.gates?.includes("mdg01") ?? false;

  if (pickupCompleted) {
    return (
      <>
        <ArchivalNotice />
        <p>Our records show you have picked up your copy of this puzzle.</p>
        <p>
          You should have received exactly 45 small pieces and one rod in a
          ziploc bag. No two pieces should be exactly identical. Please contact
          us at{" "}
          <MailtoLink
            subject={"Missing pieces for Educational Rite of Passage"}
          />{" "}
          if it seems that you are missing pieces.
        </p>
      </>
    );
  }

  return (
    <>
      <ArchivalNotice />
      <p>Please come to the Gala to pick up your copy of this puzzle.</p>
      <p>
        You should receive exactly 45 small pieces and one rod in a ziploc bag.
        No two pieces should be exactly identical. Please contact us at{" "}
        <MailtoLink
          subject={"Missing pieces for Educational Rite of Passage"}
        />{" "}
        if it seems that you are missing pieces.
      </p>
    </>
  );
};

export default Puzzle;
