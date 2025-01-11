import React, { type ReactNode } from "react";
import { styled } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";
import dunkin1 from "./assets/dunkin1.png";
import dunkin2 from "./assets/dunkin2.png";
import dunkin3 from "./assets/dunkin3.png";
import dunkin4 from "./assets/dunkin4.png";
import dunkin5 from "./assets/dunkin5.png";
import dunkin6 from "./assets/dunkin6.png";
import dunkin7 from "./assets/dunkin7.png";
import dunkin8 from "./assets/dunkin8.png";
import dunkin9 from "./assets/dunkin9.png";

export const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledOl = styled.ol`
  counter-reset: item;
  list-style: none;
  & > li::before {
    counter-increment: item;
    content: counters(item, ".") ". ";
    padding-right: 8px;
  }
`;

const DonutOrderingCard = styled.table`
  table-layout: fixed;
  width: 100%;
  border-spacing: 16px 8px;
  th:first-child {
    width: 64px;
  }
  th:nth-child(2) {
    width: 128px;
  }
  td:not(:first-child) {
    border-bottom: 1px solid var(--black);
  }
`;

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const NumberedRouteInstructions = styled.table`
  margin: 1em auto;
  table-layout: fixed;
  border-spacing: 16px 0px;
  td:first-child {
    width: 64px;
  }
  td:nth-child(2) {
    width: 64px;
  }
  td:nth-child(3) {
    width: 448px;
  }
  td:last-child {
    width: 256px;
  }
`;

const LEGS: {
  direction: string;
  instruction: ReactNode;
  copyInstruction?: ReactNode;
  notes: string;
}[][] = [
  [
    {
      direction: "",
      instruction: (
        <>
          BEGIN at{" "}
          <a href={dunkin1} target="_blank" rel="noreferrer">
            previous DIYC
          </a>
          , facing southeast
        </>
      ),
      copyInstruction: (
        <a href={dunkin1} target="_blank" rel="noreferrer">
          BEGIN at previous DIYC, facing southeast
        </a>
      ),
      notes: "CST 38mph",
    },
    { direction: "R", instruction: "1st OPP", notes: "immediate" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE “ALBION ST”", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "2nd OPP", notes: "" },
    { direction: "BL", instruction: "at Y", notes: "" },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "R", instruction: "1st SIGNAL", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SOL RIP “OASIS CAFE”",
      notes: "immediate",
    },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "R", instruction: "3rd OPP", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “BBQ BOSTON”", notes: "" },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "BR", instruction: "2nd OPP", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “GINO & ROLANDA”", notes: "" },
    { direction: "", instruction: "OBSERVE SOL RIP “CAROL”", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “SHOP PHARMACY”", notes: "" },
    { direction: "R", instruction: "2nd OPP", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    {
      direction: "R",
      instruction: "into DUNKIN’ drive-thru for DIYC, target ODO 5.0 miles",
      notes: "",
    },
  ],
  [
    {
      direction: "",
      instruction: (
        <>
          BEGIN at{" "}
          <a href={dunkin2} target="_blank" rel="noreferrer">
            previous DIYC
          </a>
          , facing northeast
        </>
      ),
      copyInstruction: (
        <a href={dunkin2} target="_blank" rel="noreferrer">
          BEGIN at previous DIYC, facing northeast
        </a>
      ),
      notes: "CST 27mph",
    },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE “WAVERLY PL”", notes: "" },
    { direction: "L", instruction: "2nd OPP", notes: "" },
    { direction: "", instruction: "OBSERVE SOL RIP “PHARMACY”", notes: "" },
    { direction: "R", instruction: "5th SIGNAL", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "BR", instruction: "4th OPP", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “APPLIANCE”", notes: "" },
    { direction: "R", instruction: "1st SIGNAL", notes: "immediate" },
    { direction: "", instruction: "OBSERVE “PRIMP”", notes: "" },
    { direction: "R", instruction: "2nd SIGNAL", notes: "" },
    { direction: "BL", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE “SHAWS”",
      notes: "sign on roadside, not building",
    },
    { direction: "L", instruction: "3rd SIGNAL", notes: "" },
    {
      direction: "L",
      instruction: "into DUNKIN’ drive-thru for DIYC, target ODO 6.6 miles",
      notes: "",
    },
  ],
  [
    {
      direction: "",
      instruction: (
        <>
          BEGIN at{" "}
          <a href={dunkin3} target="_blank" rel="noreferrer">
            previous DIYC
          </a>
          , facing south
        </>
      ),
      copyInstruction: (
        <a href={dunkin3} target="_blank" rel="noreferrer">
          BEGIN at previous DIYC, facing south
        </a>
      ),
      notes: "CST 14mph",
    },
    { direction: "R", instruction: "1st SIGNAL", notes: "Swampscott Mall" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "BL", instruction: "4th SIGNAL", notes: "" },
    { direction: "R", instruction: "1st STOP", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SRIP “SWAMPSCOTT PARKING”",
      notes: "",
    },
    {
      direction: "",
      instruction: "OBSERVE SOL RIP “CAPTAIN PIZZA”",
      notes: "sign on building, not on awning",
    },
    { direction: "BR", instruction: "at T", notes: "" },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “LYNN”", notes: "immediate" },
    { direction: "R", instruction: "2nd OPP", notes: "" },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SRIP “AMELIA RESTAURANT”",
      notes: "",
    },
    { direction: "R", instruction: "1st SIGNAL", notes: "" },
    { direction: "AL", instruction: "5th SIGNAL", notes: "" },
    { direction: "BR", instruction: "1st OPP", notes: "" },
    { direction: "BR", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "2nd SIGNAL", notes: "" },
    { direction: "", instruction: "OBSERVE “BAKER ST”", notes: "" },
    { direction: "BL", instruction: "2nd SIGNAL", notes: "" },
    { direction: "BR", instruction: "1st OPP", notes: "immediate" },
    { direction: "", instruction: "OBSERVE SOL HIT RIP “DIAZ”", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "BR", instruction: "3rd OPP", notes: "" },
    { direction: "R", instruction: "7th OPP", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    {
      direction: "L",
      instruction: "into DUNKIN’ drive-thru for DIYC, target ODO 7.3 mi",
      notes: "",
    },
  ],
  [
    {
      direction: "",
      instruction: (
        <>
          BEGIN at{" "}
          <a href={dunkin4} target="_blank" rel="noreferrer">
            previous DIYC
          </a>
          , facing northwest
        </>
      ),
      copyInstruction: (
        <a href={dunkin4} target="_blank" rel="noreferrer">
          BEGIN at previous DIYC, facing northwest
        </a>
      ),
      notes: "CST 23mph",
    },
    { direction: "BR", instruction: "1st OPP", notes: "" },
    { direction: "BR", instruction: "2nd SIGNAL", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “SAUR”", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "AL", instruction: "1st OPP", notes: "" },
    { direction: "", instruction: "OBSERVE HTS “COFFEE”", notes: "" },
    { direction: "L", instruction: "4th OPP", notes: "" },
    { direction: "BL", instruction: "at Y", notes: "" },
    { direction: "R", instruction: "2nd OPP", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "immediate" },
    { direction: "", instruction: "OBSERVE HTS SOL “DONUTS”", notes: "" },
    { direction: "BR", instruction: "1st SIGNAL", notes: "leftmost" },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "R", instruction: "5th SIGNAL", notes: "" },
    { direction: "R", instruction: "1st SIGNAL", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SOL RIP “DUMPLING”",
      notes: "immediate",
    },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "BL", instruction: "1st SIGNAL", notes: "" },
    { direction: "BL", instruction: "2nd SIGNAL", notes: "leftmost" },
    { direction: "BR", instruction: "2nd SIGNAL", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SOL RIP “NEIGHBORHOOD”",
      notes: "immediate",
    },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "3rd SIGNAL", notes: "" },
    {
      direction: "R",
      instruction: "into DUNKIN’ drive-thru for DIYC, target ODO 8.2 miles",
      notes: "",
    },
  ],
  [
    {
      direction: "",
      instruction: "BEGIN at 84 Massachusetts Avenue, facing northwest",
      notes: "CST 25mph",
    },
    { direction: "R", instruction: "4th SIGNAL", notes: "" },
    { direction: "R", instruction: "1st SIGNAL", notes: "" },
    { direction: "", instruction: "OBSERVE SOL “AREA FOUR”", notes: "" },
    { direction: "BR", instruction: "5th OPP", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SRIP “LOW CLEARANCE”",
      notes: "immediate",
    },
    {
      direction: "",
      instruction: "OBSERVE HTS “DANFORTH ST”",
      notes: "Rule REARVIEW (November 2020)",
    },
    { direction: "BR", instruction: "6th OPP", notes: "" },
    { direction: "BR", instruction: "1st OPP", notes: "immediate" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “ART MATERIALS”", notes: "" },
    { direction: "", instruction: "OBSERVE SOL “HARVARD SQUARE”", notes: "" },
    { direction: "BL", instruction: "at Y", notes: "" },
    { direction: "L", instruction: "2nd OPP", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE “MT VERNON ST”", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "immediate" },
    { direction: "L", instruction: "2nd OPP", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "AL", instruction: "2nd OPP", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE “RINDGE AVE”", notes: "" },
    { direction: "L", instruction: "1st SIGNAL", notes: "immediate" },
    {
      direction: "",
      instruction: "OBSERVE SOL RIP “JOHN D. LYNCH”",
      notes: "",
    },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE “DUNKIN”", notes: "" },
    { direction: "BR", instruction: "2nd OPP", notes: "" },
    { direction: "BR", instruction: "4th OPP", notes: "" },
    {
      direction: "R",
      instruction: "into DUNKIN’ drive-thru for DIYC, target ODO 9.1 miles",
      notes: "",
    },
  ],
  [
    {
      direction: "",
      instruction: (
        <>
          BEGIN at{" "}
          <a href={dunkin5} target="_blank" rel="noreferrer">
            previous DIYC
          </a>
          , facing northeast
        </>
      ),
      copyInstruction: (
        <a href={dunkin5} target="_blank" rel="noreferrer">
          BEGIN at previous DIYC, facing northeast
        </a>
      ),
      notes: "CST 34mph",
    },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "L", instruction: "4th SIGNAL", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SRIP “AUTO SERVICE EXPERTS”",
      notes: "",
    },
    { direction: "L", instruction: "3rd SIGNAL", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE “TILESTON ST”", notes: "" },
    { direction: "BR", instruction: "5th OPP", notes: "" },
    { direction: "BR", instruction: "at Y", notes: "immediately after bridge" },
    { direction: "BR", instruction: "3rd OPP", notes: "" },
    { direction: "BL", instruction: "2nd OPP", notes: "leftmost" },
    { direction: "BR", instruction: "4th OPP", notes: "" },
    { direction: "R", instruction: "1st SIGNAL", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    {
      direction: "R",
      instruction: "into DUNKIN’ drive-thru for DIYC, target ODO 11.8 miles",
      notes: "",
    },
  ],
  [
    {
      direction: "",
      instruction: (
        <>
          BEGIN at{" "}
          <a href={dunkin6} target="_blank" rel="noreferrer">
            previous DIYC
          </a>
          , facing northeast
        </>
      ),
      copyInstruction: (
        <a href={dunkin6} target="_blank" rel="noreferrer">
          BEGIN at previous DIYC, facing northeast
        </a>
      ),
      notes: "CST 34mph",
    },
    {
      direction: "",
      instruction: "OBSERVE “FEDERAL ST”",
      notes: "rule REARVIEW (November 2020)",
    },
    { direction: "BR", instruction: "2nd OPP", notes: "" },
    { direction: "R", instruction: "1st SIGNAL", notes: "" },
    { direction: "R", instruction: "2nd OPP", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SOL RIP “LOLLYS BAKERY”",
      notes: "",
    },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "R", instruction: "4th SIGNAL", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “CEMETERY”", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "BR", instruction: "5th OPP", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "BR", instruction: "2nd OPP", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SRIP “LAST EXIT BEFORE TOLL”",
      notes: "",
    },
    { direction: "BR", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "2nd OPP", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "L", instruction: "2nd OPP", notes: "" },
    { direction: "L", instruction: "4th STOP", notes: "" },
    { direction: "BR", instruction: "at Y", notes: "" },
    { direction: "BR", instruction: "at Y", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “MARIACHI”", notes: "" },
    {
      direction: "R",
      instruction: "into DUNKIN’ drive-thru for DIYC, target ODO 11.9 miles",
      notes: "",
    },
  ],
  [
    {
      direction: "",
      instruction: (
        <>
          BEGIN at{" "}
          <a href={dunkin7} target="_blank" rel="noreferrer">
            previous DIYC
          </a>
          , facing east
        </>
      ),
      copyInstruction: (
        <a href={dunkin7} target="_blank" rel="noreferrer">
          BEGIN at previous DIYC, facing east
        </a>
      ),
      notes: "CST 14mph",
    },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE SOL RIP “BREAKING”", notes: "" },
    { direction: "R", instruction: "2nd SIGNAL", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "3rd OPP", notes: "at cemetery" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "L", instruction: "3rd SIGNAL", notes: "" },
    { direction: "R", instruction: "4th SIGNAL", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “DUNKIN”", notes: "" },
    { direction: "R", instruction: "1st SIGNAL", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "immediate" },
    { direction: "BR", instruction: "7th OPP", notes: "" },
    {
      direction: "",
      instruction: "OBSERVE SOL RIP “TREE CIDER”",
      notes: "immediate",
    },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "L", instruction: "3rd SIGNAL", notes: "" },
    { direction: "BR", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "", instruction: "OBSERVE SOL “MOFFATT RD”", notes: "" },
    { direction: "BR", instruction: "2nd SIGNAL", notes: "" },
    { direction: "R", instruction: "2nd SIGNAL", notes: "" },
    { direction: "BR", instruction: "1st SIGNAL", notes: "" },
    { direction: "R", instruction: "1st SIGNAL", notes: "" },
    { direction: "L", instruction: "2nd SIGNAL", notes: "" },
    {
      direction: "R",
      instruction: "into DUNKIN’ drive-thru for DIYC, target ODO 12.0 miles",
      notes: "",
    },
  ],
  [
    {
      direction: "",
      instruction: (
        <>
          BEGIN at{" "}
          <a href={dunkin8} target="_blank" rel="noreferrer">
            previous DIYC
          </a>
          , facing north
        </>
      ),
      copyInstruction: (
        <a href={dunkin8} target="_blank" rel="noreferrer">
          BEGIN at previous DIYC, facing north
        </a>
      ),
      notes: "CST 16mph",
    },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "", instruction: "OBSERVE SRIP “DUNKIN”", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "2nd SIGNAL", notes: "" },
    { direction: "BL", instruction: "1st OPP", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "R", instruction: "2nd SIGNAL", notes: "" },
    { direction: "", instruction: "OBSERVE SOL RIP “BURGER”", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "BR", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "R", instruction: "at T", notes: "immediate" },
    { direction: "L", instruction: "1st SIGNAL", notes: "" },
    { direction: "BR", instruction: "1st OPP", notes: "" },
    { direction: "BR", instruction: "7th OPP", notes: "" },
    { direction: "BR", instruction: "at Y", notes: "" },
    { direction: "BR", instruction: "3rd OPP", notes: "" },
    { direction: "L", instruction: "at T", notes: "" },
    { direction: "L", instruction: "1st OPP", notes: "" },
    { direction: "R", instruction: "at T", notes: "" },
    { direction: "R", instruction: "2nd SIGNAL", notes: "" },
    { direction: "", instruction: "OBSERVE SOL RIP “OLIVAS”", notes: "" },
    { direction: "AL", instruction: "1st SIGNAL", notes: "" },
    {
      direction: "R",
      instruction: "into DUNKIN’ drive-thru for DIYC, target ODO 16.2 miles",
      notes: "",
    },
  ],
  [
    {
      direction: "",
      instruction: (
        <>
          Begin at{" "}
          <a href={dunkin9} target="_blank" rel="noreferrer">
            previous DIYC
          </a>
          , facing your Donut Ordering Card. Extract and submit your final
          answer.
        </>
      ),
      copyInstruction: (
        <a href={dunkin9} target="_blank" rel="noreferrer">
          Begin at previous DIYC, facing your Donut Ordering Card. Extract and
          submit your final answer.
        </a>
      ),
      notes: "",
    },
  ],
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        In an effort to rallye team morale, your team’s captain has tasked you
        to go to Dunkin’ Donuts to buy donuts for the whole team. You love To
        Sip Dunkin! And fortunately there’s a Dunkin’ right on campus—you go
        there with regularity. You head over armed with a wad of cash to make
        your team’s dreams come true.
      </p>
      <p className="puzzle-flavor">
        Alas, your team wasn’t the only one with this idea, and the Dunkin’ is
        completely devoid of donuts. In their place are a list of confusing
        instructions. Despondent, you traipse out to Mass Ave and attempt to get
        yourself into gear and follow them as best you can.
      </p>
      <p className={COPY_ONLY_CLASS}>
        For a full list of MIT Puzzle Club General Regulations and Special
        Instructions, please refer to the original puzzle page.
      </p>
      <hr />
      <div className={NO_COPY_CLASS}>
        <Centered>
          <div>
            <u>
              <strong>MIT PUZZLE CLUB</strong>
            </u>
          </div>
          <div>
            <strong>General Regulations</strong>
          </div>
        </Centered>
        <StyledOl>
          <li>
            <strong>COURSE</strong>
            <StyledOl>
              <li>
                Numbered route instructions must be completed in ascending
                numerical order.
              </li>
              <li>
                Special Instructions shall not void numbered route instructions,
                nor shall numbered route instructions void Special Instructions.
              </li>
              <li>
                All numbered route instructions will direct you on eligible
                roads. Special Instructions may modify the definition of an
                eligible road. See Regulation 3.8 below for the definition of
                ELIGIBLE ROAD.
              </li>
              <li>
                All numbered route instructions are considered completed when
                your front wheels enter the indicated intersection or become
                parallel with the indicated sign.
              </li>
              <li>
                When put onto a road or highway, stay on it until instructed or
                forced to leave it.
              </li>
              <li>
                Unless instructed otherwise, continue in the direction most
                straight ahead, or in the only direction legally or physically
                possible. No instructions are given for forced turns.
                <StyledOl>
                  <li>
                    When traveling on a traffic circle, stay on it until
                    instructed off. Exits from traffic circles are not
                    considered most straight ahead and must be instructed.
                  </li>
                  <li>
                    When traveling on a highway, stay on it until instructed
                    off. Highway offramps are not considered most straight ahead
                    and must be instructed.
                  </li>
                </StyledOl>
              </li>
              <li>
                Nothing in any instruction, whether that be a numbered route
                instruction or a Special Instruction, is intended to instruct a
                participant to commit any illegal action.
                <StyledOl>
                  <li>
                    If a road sign indicates that an action is prohibited only
                    during certain hours of the day, that action is considered
                    to be prohibited at all times for the purposes of
                    determining what counts as an eligible road.
                  </li>
                  <li>
                    If a road sign indicates that an action is prohibited for
                    nonresidents of a town, that action is considered to be
                    prohibited to everyone for purposes of determining what
                    counts as an eligible road.
                  </li>
                </StyledOl>
              </li>
            </StyledOl>
          </li>
          <li>
            <strong>SIGNS AND LANDMARKS</strong>
            <StyledOl>
              <li>
                Unless otherwise noted, all signs to be used in numbered route
                instructions are on the right-hand side of the road, straight
                ahead, or overhead.
              </li>
              <li>
                Quotation marks are used in the instructions to indicate one or
                more words, letters, and/or numbers on the quoted portion of a
                sign to be used in an instruction.
                <StyledOl>
                  <li>
                    If the full text of the sign contains additional words,
                    letters, or numbers other than those quoted, the quotation
                    shall be designated RIP. The omission of punctuation,
                    arrows, erecting agency, or block numbers shall not be cause
                    for a quotation to be designated RIP.
                  </li>
                  <li>
                    Quoted parts of a sign will be fully capitalized in numbered
                    route instructions. Capitalization and/or punctuation need
                    not agree with that on the sign.
                  </li>
                </StyledOl>
              </li>
              <li>
                The same sign will not be used as a reference point for two or
                more numbered route instructions requiring simultaneous action
                or execution.
              </li>
              <li>
                The same sign may be used simultaneously for a numbered route
                instruction and a Special Instruction if the instructions do not
                conflict.
              </li>
            </StyledOl>
          </li>
          <li>
            <strong>ABBREVIATIONS AND DEFINITIONS</strong>
            <StyledOl>
              <li>
                AL: Acute left; a left TURN where your direction changes by
                perceptibly greater than ninety degrees, causing your path to
                make an acute angle
              </li>
              <li>
                AR: Acute right; a right TURN where your direction changes by
                perceptibly greater than ninety degrees, causing your path to
                make an acute angle
              </li>
              <li>BEGIN: Start a new leg</li>
              <li>
                BL: Bear left; a left TURN where your direction changes by
                perceptibly less than ninety degrees, causing your path to make
                an obtuse angle
              </li>
              <li>
                BR: Bear right; a right TURN where your direction changes by
                perceptibly less than ninety degrees, causing your path to make
                an obtuse angle
              </li>
              <li>CST: Change Speed To</li>
              <li>DIYC: Do-it-yourself (uncrewed) checkpoint</li>
              <li>
                ELIGIBLE ROAD: A paved, public, through road, excluding dead
                ends, driveways, alleys, parking lots, and entrances to
                businesses, hotels, and schools
              </li>
              <li>
                FEDERAL HIGHWAY: A highway that is part of the United States
                Numbered Highway System, with a name consisting of a prefix of I
                or US, a hyphen, and a suffix of one to three numbers
              </li>
              <li>
                FULL TEXT (OF A SIGN): All word(s), letter(s), and/or number(s)
                on the sign, except for punctuation, arrows, erecting agency,
                and block numbers
              </li>
              <li>
                FORCED TURN: A TURN where you have no other legal option but to
                change direction
              </li>
              <li>HTS: (of a sign) Hard To See</li>
              <li>
                IMMEDIATE: Used to indicate that an instruction should be
                executed immediately after the previous instruction
              </li>
              <li>
                INTERSECTION: Any meeting of ELIGIBLE ROADS at grade level from
                which your vehicle could proceed in more than one direction
              </li>
              <li>L: A left TURN of approximately ninety degrees</li>
              <li>MPH: Miles Per Hour</li>
              <li>
                OBSERVE: Notice word(s), letter(s), and/or number(s) on a sign
              </li>
              <li>ODO: Odometer reading</li>
              <li>
                OPP: Opportunity; an ELIGIBLE ROAD upon which you can legally
                TURN in the direction satisfying the instruction, regardless of
                the angle created by the turn
              </li>
              <li>R: A right TURN of approximately ninety degrees</li>
              <li>
                RIVER ROAD: A parkway abutting the Charles River; namely,
                Memorial Drive, Greenough Boulevard, Storrow Drive, or Soldier’s
                Field Road
              </li>
              <li>(S)HIT: (Sign) Hidden In Tree</li>
              <li>
                SIGNAL: The INTERSECTION of two ELIGIBLE ROADS where your
                progress is controlled by a conventional red, amber, and green
                traffic signal, whether working or not
              </li>
              <li>
                SOL: Sign On Left, a sign on the left-hand side of the road
              </li>
              <li>
                (S)RIP: (Sign) Reading In Part; an indication that the sign is
                only partially quoted
              </li>
              <li>
                STOP: A conventional octagonal red STOP sign which is
                controlling your progress
              </li>
              <li>
                T: An INTERSECTION having the general shape of the letter T as
                approached, at which the road upon which you are traveling ends
                and at which you have the choice to TURN right or left
              </li>
              <li>TURN: Change course of direction at an INTERSECTION</li>
              <li>
                U: U-turn; a TURN where your direction changes by one hundred
                and eighty degrees
              </li>
              <li>
                Y: An INTERSECTION having the general shape of the letter Y as
                approached, at which you have the choice to BEAR right or left
              </li>
            </StyledOl>
          </li>
          <li>
            <strong>CHECKPOINTS</strong>
            <StyledOl>
              <li>
                Your ODO will be registered as soon as your front wheels enter
                the indicated checkpoint.
              </li>
              <li>
                You will be advised of your next bearing and speed before
                leaving each checkpoint.
              </li>
            </StyledOl>
          </li>
          <li>
            <strong>SPECIAL INSTRUCTIONS</strong>
            <StyledOl>
              <li>
                You may be given Special Instructions. Special Instructions will
                be clearly identified as such.
              </li>
              <li>
                Special Instructions, as with numbered route instructions, are
                considered completed when your front wheels enter the indicated
                intersection or become level with the indicated sign.
              </li>
              <li>
                Two or more Special Instructions may be executed simultaneously
                if simultaneous execution would not result in ambiguity about
                how to resolve or execute the Special Instructions.
              </li>
              <li>
                Any Special Instructions pertaining to ordering or extraction
                must be completed prior to leaving the checkpoint.
              </li>
            </StyledOl>
          </li>
        </StyledOl>
        <hr />
        <Centered>
          <div>
            <u>
              <strong>MIT PUZZLE CLUB</strong>
            </u>
          </div>
          <div>
            <strong>Special Instructions</strong>
          </div>
          <div>
            These instructions have been alphabetized for your inconvenience.
          </div>
        </Centered>
        <StyledOl>
          <li>
            <strong>Rule ANGRY:</strong> Whenever you have to turn left at an
            intersection with no signal, or where any lane of traffic that you
            must cross in order to execute that turn lacks a stop sign, decrease
            your speed by 5 mph. Traffic circles do not count as intersections
            for the purpose of this instruction. Where do these yahoos think
            they gotta get to? Some of us have puzzles to solve!
          </li>
          <li>
            <strong>Rule BERRY:</strong> Whenever instructed to OBSERVE a sign
            attached to or advertising a grocery store, instead of completing
            Rule SPEEDOMETER or Rule RETEMODEEPS due to that OBSERVE
            instruction, record the word BERRY and increase your donut order for
            this leg by 1 donut. This counts as a serving of fruit, right?
          </li>
          <li>
            <strong>Rule COMPLACENT:</strong> Whenever you are on the same road
            for at least one (1) mile without being instructed to make a turn,
            increase your speed by 5 mph. This rule applies only once per
            instance of being on that road. A road changing name midway through
            the mile does not invalidate the applicability of this rule. That
            happens like every other town, come on.
          </li>
          <li>
            <strong>Rule CRAVING:</strong> Whenever you enter a checkpoint
            having passed fewer than two DUNKIN’, not counting any DUNKIN’ that
            are part of a checkpoint, increase your donut order for that leg by
            1 donut.
          </li>
          <li>
            <strong>Rule DONUTS:</strong> Start each leg with 0 donuts. The
            checkpoint at the end of each leg takes place at a DUNKIN’
            Drive-Thru. Do not stop at the curb cut. Instead, continue to the
            speaker to place your donut order, then proceed to the window to
            receive the amount of donuts you ordered and calculate your
            extracted letter for this leg.
          </li>
          <li>
            <strong>Rule FROSTED:</strong> Whenever instructed to OBSERVE a sign
            erected by the MBTA, instead of completing Rule SPEEDOMETER or Rule
            RETEMODEEPS due to that OBSERVE instruction, record the word
            FROSTED, increase your order for this leg by 2 donuts, and reminisce
            about the Snowpocalypse of 2015.
          </li>
          <li>
            <strong>Rule GLAZED:</strong> Whenever you complete Rule WOOP WOOP
            WOOP twice in one leg, record the word GLAZED and increase your
            donut order for this leg by 4 additional donuts. Glazed is the
            favored donut of the Massachusetts State Police.
          </li>
          <li>
            <strong>Rule HUNGRY:</strong> Whenever you pass a standalone DUNKIN’
            storefront that is visible from the street and does not have a
            drive-thru, on a street that that DUNKIN’ abuts, regardless of what
            side of the street it is on, increase your speed by 3 mph. You gotta
            find one with a drive-thru, there’s nowhere to park here!
          </li>
          <li>
            <strong>Rule LEMON:</strong> This rallye, like all MIT Puzzle Club
            rallyes, must be undertaken in a stock, two-axled, four-wheeled
            passenger car, minivan, or sport utility vehicle suitable for
            operation by a holder of a Massachusetts class D license.
            Preferably, the vehicle will belong to your kind of annoying
            hallmate and be no newer than model year 2000.
          </li>
          <li>
            <strong>Rule REARVIEW:</strong> The canonical data source for this
            puzzle is the most recent version of Google Street View, except
            where an older Street View is explicitly specified. What do you mean
            you don’t remember where the Bradlees used to be when you were a
            kid?
          </li>
          <li>
            <strong>Rule RETEMODEEPS:</strong> Whenever you would complete Rule
            SPEEDOMETER for a sign on the left, instead take the Nth letter from
            the right.
          </li>
          <li>
            <strong>Rule ROUNDABOUT:</strong> Whenever you drive on a traffic
            circle, increase your speed by 5 mph. Isn’t that better than waiting
            on a signal?
          </li>
          <li>
            <strong>Rule SPEEDOMETER:</strong> Whenever you complete an OBSERVE
            instruction with quoted sign text, take the Nth letter from the left
            of the full text of that sign, where N is the tens digit of your
            current speed, and record it for the current leg.
          </li>
          <li>
            <strong>Rule TORUS:</strong> Whenever your path makes a closed loop
            within a leg, record a letter O for that leg and increase your donut
            order for that leg by 1 donut. Your wheels must pass over a segment
            of road on which you had driven previously. This rule considers the
            z-axis as well - highway cloverleafs do not count as a closed loop.
            You can’t eat donuts on the highway, that’s “distracted driving.”
          </li>
          <li>
            <strong>Rule WHEE:</strong> Whenever you complete a merge onto an
            federal highway or a river road, increase your speed by 10 mph. This
            rule applies after you have left the onramp and merged completely
            onto the federal highway or river road. Everyone speeds here, I’m
            sure it’s fine, I saw a cop doing 95 in the left lane of the Pike
            the other day.
          </li>
          <li>
            <strong>Rule WOOP WOOP WOOP:</strong> Whenever your speed is at
            least 45 mph and you are not on an interstate highway or a river
            road, you get pulled over. Immediately decrease your speed by 25 mph
            and increase your donut order by 2 donuts in order to convince the
            officer not to issue you a speeding ticket.
          </li>
        </StyledOl>
        <hr />
      </div>
      <Centered>
        <div>
          <u>
            <strong>MIT PUZZLE CLUB</strong>
          </u>
        </div>
        <div>
          <strong>Donut Ordering Card</strong>
        </div>
      </Centered>
      <DonutOrderingCard>
        <tr>
          <th></th>
          <th>Quantity</th>
          <th>Donut Type</th>
        </tr>
        <tr>
          <td>
            <strong>DIYC 1</strong>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <strong>DIYC 2</strong>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <strong>DIYC 3</strong>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <strong>DIYC 4</strong>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <strong>DIYC 5</strong>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <strong>DIYC 6</strong>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <strong>DIYC 7</strong>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <strong>DIYC 8</strong>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <strong>DIYC 9</strong>
          </td>
          <td></td>
          <td></td>
        </tr>
      </DonutOrderingCard>
      <hr />
      <Centered>
        <div>
          <u>
            <strong>MIT PUZZLE CLUB</strong>
          </u>
        </div>
        <div>
          <strong>Route Instructions</strong>
        </div>
      </Centered>
      {LEGS.map((instructions, i) => (
        <div key={i}>
          <Centered>
            <strong>Leg ?</strong>
          </Centered>
          <ScrollWrapper>
            <NumberedRouteInstructions>
              {instructions.map(
                ({ direction, instruction, copyInstruction, notes }, j) => (
                  <tr key={`${i}-${j}`}>
                    <td>{j + 1}</td>
                    <td>{direction}</td>
                    <td className={NO_COPY_CLASS}>{instruction}</td>
                    <td className={COPY_ONLY_CLASS}>
                      {copyInstruction ? copyInstruction : instruction}
                    </td>
                    <td>{notes}</td>
                  </tr>
                ),
              )}
            </NumberedRouteInstructions>
          </ScrollWrapper>
        </div>
      ))}
    </>
  );
};

export default Puzzle;
