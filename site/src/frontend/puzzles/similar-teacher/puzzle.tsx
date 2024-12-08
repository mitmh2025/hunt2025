import React from "react";
import { styled } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 1em;
`;

const StyledDiv = styled.div`
  border-bottom: 1px solid black;
  width: 2em;
  height: 2em;
  text-align: center;
`;

const Arrow = (): JSX.Element => {
  return <span>→</span>;
};

const Blank = (): JSX.Element => {
  return <StyledDiv>&nbsp;</StyledDiv>;
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        One connected source will be very helpful, but its similarities may not
        represent all the right differences. You don’t need to be too specific,
        so ignore anything after a comma.
      </p>
      <ol>
        <li>#33 with a wasp inside (3 3’1 5)</li>
        <li>A 24 hour race through citrus fields? (6, orig. 2 4)</li>
        <li>A classic brewery? (9 [8])</li>
        <li>A fantasy for Poe or Hughes (4’1 5)</li>
        <li>A panda at #3 (6 4)</li>
        <li>
          A pithy observation on Proboscideans going contrary to popular belief
          (9 9 6)
        </li>
        <li>A young lady in Paris (12)</li>
        <li>An adult show or a Broadway musical (7)</li>
        <li>Answer to the Ultimate Question (#2)</li>
        <li>Basketball circle in Southern California? (4 2, orig. 6)</li>
        <li>Belonging to Mr Styles (5’1 [8])</li>
        <li>Black cloak worn by a Dominican friar ([3] 5)</li>
        <li>Brooklyn neighborhood (3 4)</li>
        <li>Change your mind about a Daniel Day-Lewis movie? (5 2 3 4 4)</li>
        <li>Chugach or Tongass, for instance (6 6)</li>
        <li>Ciò che ama la compagnia (7 [8])</li>
        <li>Combatants in an annual football game (4 & 4)</li>
        <li>Description of a streaking celebrity (5 3 6)</li>
        <li>Diminutive nickname for a Scottish Poet (5 5)</li>
        <li>Eats; shoots and leaves? (6)</li>
        <li>Energetic emission ([3] 9)</li>
        <li>
          Ethnic neighborhood in many cities that makes a good tongue twister (6
          5)
        </li>
        <li>Father Ted’s housekeeper (3. 5)</li>
        <li>Flower often associated with death (13)</li>
        <li>Foreplay by fOURPLAY (7 3 6)</li>
        <li>Gentle breeze delivering home one on an Odyssey (6)</li>
        <li>Granite that will sue you (9 4)</li>
        <li>Home of a sports hall of fame (11)</li>
        <li>Home to Elvis and Dolly (9)</li>
        <li>Housekeeper in Louisville (8 4)</li>
        <li>How Mick Jagger would prefer his red door (7 5)</li>
        <li>How you open a well-known pirate chest? (4 3’1 6)</li>
        <li>Insect’s Joints (3’1 5)</li>
        <li>Just “Brute”, no “Et tu” (4 4)</li>
        <li>Le trésor d’une huître (6 5)</li>
        <li>Lover of Venus (6)</li>
        <li>McVitie’s biscuit eaten when it’s cold? (6 9)</li>
        <li>Mixup occurring between Kensal Town and Willesden? (5’1 4 7)</li>
        <li>NATO’s Connecticut (7 5)</li>
        <li>One who votes (8)</li>
        <li>Only on tonight’s menu, named after Satchmo (5 7)</li>
        <li>Opportunity to sell picks and shovels (4 4)</li>
        <li>Person just over halfway to Kevin Bacon (6 6)</li>
        <li>Plea from a damsel (6’1 6)</li>
        <li>Raucous activity (5-5)</li>
        <li>S’more made with gummy worms? (8 4)</li>
        <li>Save someone from choking with your tongue? ([3] 4 4)</li>
        <li>
          Sightless blues singer with a thematically appropriate name (5 5 9)
        </li>
        <li>South American liberator ([3] 3 6)</li>
        <li>Sully’s area of expertise (8 [8])</li>
        <li>The distinctive pipe tobacco from Louisiana (2 7)</li>
        <li>The edge that sees the sunrise (4 4 [8])</li>
        <li>There can be only one (10 [8])</li>
        <li>Third Sunday in June for divorcés (6 6’1 3)</li>
        <li>Tige’s human (6 5)</li>
        <li>
          Triple-threat actress with a flowery name, known for Her Triumph (4 3
          3, orig. 4 6)
        </li>
        <li>What’s made on the hill you die on ([3] 4 5)</li>
      </ol>
      <hr />
      <Row>
        <StyledDiv>24</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>31</StyledDiv>
      </Row>
      <Row>
        <StyledDiv>25</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>45</StyledDiv>
      </Row>
      <Row>
        <StyledDiv>14</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>40</StyledDiv>
      </Row>
      <Row>
        <StyledDiv>35</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>38</StyledDiv>
      </Row>
      <Row>
        <StyledDiv>34</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>32</StyledDiv>
      </Row>
      <Row>
        <StyledDiv>20</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>51</StyledDiv>
      </Row>
      <Row>
        <StyledDiv>28</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>12</StyledDiv>
      </Row>
      <Row>
        <StyledDiv>54</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>36</StyledDiv>
      </Row>
      <Row>
        <StyledDiv>44</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>22</StyledDiv>
      </Row>
      <Row>
        <StyledDiv>1</StyledDiv>
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <Blank />
        <Arrow />
        <StyledDiv>19</StyledDiv>
      </Row>
    </>
  );
};

export default Puzzle;
