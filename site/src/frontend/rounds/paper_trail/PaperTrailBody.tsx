import React, { Fragment } from "react";
import { type TeamState } from "../../../../lib/api/client";
import PuzzleLink, { PuzzleIcon } from "../../components/PuzzleLink";
import {
  Book,
  Bottle,
  Cabinet,
  Chips,
  Clock,
  Coffee,
  Crumpled,
  Desk,
  Eraser,
  Fly,
  Glasses,
  Loupe,
  Meta1,
  Meta2,
  Meta3,
  Meta4,
  Meta5,
  Meta6,
  Meta7,
  Meta8,
  OldFashioned,
  Pen,
  PencilCup,
  Phone,
  Receipts,
  Sandwich,
  TeaCup,
  Tie,
} from "./Layout";
import { PaperTrailFonts } from "./PaperTrailFonts";
import ReceiptImg from "./assets/1/1-solved.png";
import CrumpledImg from "./assets/10/10-solved.png";
import SandwichImg from "./assets/11/11-solved.png";
import CoffeeImg from "./assets/12/12-solved.png";
import ChipsImg from "./assets/13/13-solved.png";
import FlyImg from "./assets/14/14-solved.png";
import OldFashionedImg from "./assets/15/15-solved.png";
import TieImg from "./assets/16/16-solved.png";
import BottleImg from "./assets/17/17-solved.png";
import PencilCupImg from "./assets/2/2-solved.png";
import TeaCupImg from "./assets/3/3-solved.png";
import CabinetImg from "./assets/4/4-solved.png";
import PhoneImg from "./assets/5/5-solved.png";
import PenImg from "./assets/6/6-solved.png";
import EraserImg from "./assets/7/7-solved.png";
import GlassesImg from "./assets/8/8-solved.png";
import ClockImg from "./assets/9/9-solved.png";
import BookImg from "./assets/book/book-8.png";
import LoupeImg from "./assets/metas/loupe-solved.png";
import Meta1Img from "./assets/metas/meta-1-solved.png";
import Meta2Img from "./assets/metas/meta-2-solved.png";
import Meta3Img from "./assets/metas/meta-3-solved.png";
import Meta4Img from "./assets/metas/meta-4-solved.png";
import Meta5Img from "./assets/metas/meta-5-solved.png";
import Meta6Img from "./assets/metas/meta-6-solved.png";
import Meta7Img from "./assets/metas/meta-7-solved.png";
import Meta8Img from "./assets/metas/meta-8-solved.png";
import { type PaperTrailState } from "./types";

const PaperTrailBody = ({
  state,
  teamState,
}: {
  state: PaperTrailState;
  teamState: TeamState;
}) => {
  const sections = state.groups.map((group) => {
    return (
      <Fragment key={`label-${group.label}`}>
        <h2>{group.label}</h2>
        <ul>
          {group.items.map((item) => {
            const puzzleState = teamState.puzzles[item.slug];
            return (
              <li key={item.slug}>
                <PuzzleLink
                  lockState={puzzleState?.locked ?? "locked"}
                  answer={puzzleState?.answer}
                  currency={teamState.currency}
                  title={item.title}
                  slug={item.slug}
                />
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  });
  return (
    <Fragment key="paper-trail">
      <PaperTrailFonts />
      <Desk>
        <Clock>
          <img src={ClockImg} alt="Wall clock" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Clock>
        <Cabinet>
          <img src={CabinetImg} alt="File cabinet" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Cabinet>
        <Fly>
          <img src={FlyImg} alt="Flying housefly" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Fly>
        <Chips>
          <img src={ChipsImg} alt="Empty bag of potato chips with crumbs" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Chips>
        <Sandwich>
          <img src={SandwichImg} alt="Half eaten sandwich with wax paper" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Sandwich>
        <Bottle>
          <img src={BottleImg} alt="Mostly-empty tall brown glass bottle" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Bottle>
        <Meta1>
          <img src={Meta1Img} alt="Ledger: Tasty Food Processors" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Tasty Food Processors</span>
            </span>
            <span className="answer">META_ANSWER</span>
          </span>
        </Meta1>
        <Meta2>
          <img src={Meta2Img} alt="Ledger: Triple A Accounting, LLC" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Triple A Accounting, LLC:</span>
            </span>
            <span className="answer">META_ANSWER</span>
          </span>
        </Meta2>
        <Meta3>
          <img src={Meta3Img} alt="Ledger: Superior Stonework" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Superior Stonework</span>
            </span>
            <span className="answer">META_ANSWER</span>
          </span>
        </Meta3>
        <Meta4>
          <img src={Meta4Img} alt="Ledger: Crystal-Clear Refinery" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>{`Crystal-Clear Refinery: `}</span>
            </span>
            <span className="answer">META_ANSWER</span>
          </span>
        </Meta4>
        <Meta5>
          <img src={Meta5Img} alt="Ledger: Stellar Public Relations" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Stellar Public Relations</span>
            </span>
            <span className="answer">META_ANSWER</span>
          </span>
        </Meta5>
        <Meta6>
          <img src={Meta6Img} alt="Ledger: The MITropolis Times" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>{`The MITropolis Times: `}</span>
            </span>
            <span className="answer">META_ANSWER</span>
          </span>
        </Meta6>
        <Meta7>
          <img src={Meta7Img} alt="Ledger: Shingles, Ltd" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Shingles, Ltd</span>
            </span>
            <span className="answer">META_ANSWER</span>
          </span>
        </Meta7>
        <Meta8>
          <img src={Meta8Img} alt="Ledger: Zoological Garden" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Zoological Garden</span>
            </span>
            <span className="answer">META_ANSWER</span>
          </span>
        </Meta8>
        <Coffee>
          <img
            src={CoffeeImg}
            alt="Knocked over coffee mug with coffee spilled onto the desk"
          />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Coffee>
        <Pen>
          <img src={PenImg} alt="Fountain pen" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Pen>
        <Loupe>
          <img src={LoupeImg} alt="Loupe with three lenses" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>The Shell Game</span>
            </span>
            <span className="answer">SUPERMETA ANSWER</span>
          </span>
        </Loupe>
        <Receipts>
          <img
            src={ReceiptImg}
            alt="Brass receipt holder with pile of receipts"
          />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Receipts>
        <Book>
          <img src={BookImg} alt="The Paper Trail book of notes" />
          <span className="puzzle-name">Notes</span>
        </Book>
        <Tie>
          <img src={TieImg} alt="Green silk necktie, loosened but still tied" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Tie>
        <PencilCup>
          <img
            src={PencilCupImg}
            alt="Ceramic pencil cup with several #2 pencils"
          />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </PencilCup>
        <Crumpled>
          <img src={CrumpledImg} alt="Crumpled ball of paper" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Crumpled>
        <Glasses>
          <img src={GlassesImg} alt="Pair of spectacles" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Glasses>
        <TeaCup>
          <img
            src={TeaCupImg}
            alt="Tea cup with teabag string and tag on the side"
          />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </TeaCup>
        <Phone>
          <img src={PhoneImg} alt="Black rotary telephone" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Phone>
        <OldFashioned>
          <img
            src={OldFashionedImg}
            alt="Old-fashioned-style glass, empty except for a melting ice cube"
          />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </OldFashioned>
        <Eraser>
          <img src={EraserImg} alt="Pink rubber eraser" />
          <span className="puzzle-name">
            <span className="name">
              <PuzzleIcon lockState="unlocked" answer="PLACEHOLDER" size={16} />{" "}
              <span>Puzzle Name</span>
            </span>
            <span className="answer">PLACEHOLDER</span>
          </span>
        </Eraser>
      </Desk>
      <h1>The Paper Trail</h1>
      {sections}
    </Fragment>
  );
};

export default PaperTrailBody;
