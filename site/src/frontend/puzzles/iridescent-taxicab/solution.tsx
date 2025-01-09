import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";
import certificate from "./assets/certificate.png";

const DATA = [
  [
    "caving club poster",
    <>
      wearing <strong>headlamps</strong>
    </>,
    "5",
    "L",
  ],
  [
    "MIT seal",
    <>
      pretending to be <strong>mens et manus</strong>
    </>,
    "2",
    "E",
  ],
  [
    "banana photo",
    <>
      answering a <strong>banana phone</strong>
    </>,
    "2",
    "A",
  ],
  [
    "10-023, building services bulk supply",
    <>
      <strong>flexing</strong>
    </>,
    "1",
    "F",
  ],
  [
    "Architecture Fabrication Lab",
    <>
      demonstrating the importance of <strong>eye safety</strong>
    </>,
    "2",
    "Y",
  ],
  [
    "DMSE Breakerspace",
    <>
      <strong>breakdancing</strong> like nobody’s watching
    </>,
    "4",
    "A",
  ],
  [
    "SMART logo",
    <>
      in the pose of <strong>Rodin’s Thinker</strong>
    </>,
    "1",
    "R",
  ],
  [
    "physics office",
    <>
      balancing an <strong>apple</strong> on your head
    </>,
    "4",
    "L",
  ],
  [
    "MIT Toy Lab",
    <>
      solving a <strong>Rubik’s cube</strong>
    </>,
    "4",
    "I",
  ],
  [
    "dollar bill lounge",
    <>
      making it <strong>rain</strong>
    </>,
    "4",
    "N",
  ],
  [
    "barker library",
    <>
      pretending to be a <strong>dog</strong>
    </>,
    "3",
    "G",
  ],
  [
    "copytech",
    <>
      two or more people that look <strong>identical</strong>
    </>,
    "5",
    "T",
  ],
  [
    "prof dobby’s office",
    <>
      throwing a <strong>sock</strong>
    </>,
    "2",
    "O",
  ],
  [
    "lobby 10",
    <>
      <strong>juggling</strong>
    </>,
    "7",
    "N",
  ],
];

const StyledTable = styled.table`
  th,
  td {
    padding-right: 1em;
    text-align: center;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is set up as an interaction to schedule a judging for the
        Infinite Scavenger Hunt. Upon scheduling, a judge meets them at one end
        of the Infinite Corridor (building 8) and shows them a list of tasks
        that need to be done. The tasks are all locations along the Infinite (on
        any floor), including tasks that require photos or videos to be taken
        (e.g. on upper floors/the basement) but also some that must be done in
        person (at locations on the first floor). Upon showing the list to
        teams, the judge informs them that they have an Infinite amount of time
        to complete the scavenger hunt, and begins walking towards the other end
        of the Infinite Corridor at a slow walking pace (approx. 5-7 minutes in
        total). When the judge gets to the other end of the Infinite Corridor,
        the team is out of time for that attempt and will need to reschedule.
      </p>
      <p>
        Upon each successive scheduling the tasks and locations they need to be
        done at are scrambled, making it difficult to prep everything before
        asking for judging.
      </p>
      <p>
        Upon bringing enough items to satisfy the judge, the judge will provide
        the team with a certificate for completing the Infinite Scavenger Hunt
        (shown below), and a paper copy of the “home game” (a copy of the task
        list used by the judge, with tasks alphabetized).
      </p>
      <LinkedImage
        src={certificate}
        alt="A piece of paper with fourteen circular insets around the perimeter, each annotated with a number. The center of the certificate reads: This certificate is awarded to ___ for completion of the Infinite Scavenger Hunt on this ___th day of ___, 20__."
      />
      <p>
        The certificate contains 14 images going around the outside of the
        certificate, labeled with numbers. Each location can be specifically
        matched up with a single task to form a canonical pairing. Each task has
        a bolded word or words, and indexing into the bolded words by the number
        on the certificate in clockwise order around the certificate provides
        the answer, <PuzzleAnswer>LEAFY ARLINGTON</PuzzleAnswer>.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Pictured location (clockwise from top left)</th>
            <th>Associated task</th>
            <th>Number on certificate</th>
            <th>Indexed letter</th>
          </tr>
          {DATA.map(([location, task, number, letter], i) => (
            <tr key={i}>
              <td>{location}</td>
              <td>{task}</td>
              <td>{number}</td>
              <td>{letter}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
