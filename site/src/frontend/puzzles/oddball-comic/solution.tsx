import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import image1 from "./assets/image1.png";
import image10 from "./assets/image10.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";
import image9 from "./assets/image9.png";

const Mono = styled.span`
  font-family: monospace;
`;

const Group = styled.div`
  margin-bottom: 1em;
`;

const Italic = styled.span`
  font-style: italic;
`;

const Underlined = styled.span`
  text-decoration: underline;
`;

const Indented = styled(Group)`
  font-style: italic;
  margin-left: 16px;
`;

const Name = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Annotation = styled.span`
  color: var(--gold-700);
`;

const Highlighted = styled.span`
  background-color: var(--gold-500);
`;

const ImageAndText = styled.div`
  display: flex;
  gap: 16px;
`;

const ImageWrapper = styled(LinkedImage)<{ $basis: string }>`
  flex: 0 0 ${({ $basis }) => $basis};
`;

const StyledTable = styled.table`
  color: var(--gold-700);
  margin-bottom: 1em;
  th,
  td {
    padding: 1px 8px;
    &:first-child {
      padding-left: 0px;
    }
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle references VSEPR theory, a theory used to explain the shapes
        of molecules based on the number of bonds and lone pairs around an atom
        in a covalently bonded molecule. The different arrangements have
        canonical names which can be found on the{" "}
        <a
          href="https://en.wikipedia.org/wiki/VSEPR_theory"
          target="_blank"
          rel="noreferrer"
        >
          VSEPR theory Wikipedia page
        </a>{" "}
        or any number of other sources. Note that although these geometries are
        three-dimensional in reality, we take a little bit of artistic license
        here to imagine them projected onto a two-dimensional table.
      </p>
      <p>
        At each step of the script, there is a different number of chairs at the
        table, some of which have people sitting in them (representing bonds)
        and some of which are empty (“lone chairs”, representing lone pairs).
        After each stage direction this changes. The subsequent line of dialogue
        contains, hidden in it, the name of the geometry with one letter
        changed. The new letters are extracted, and, in story order, spell the
        answer{" "}
        <Mono>
          <strong>IT TAKES TWO</strong>
        </Mono>
        .
      </p>
      <h3>Annotated Full Solution</h3>
      <Group>
        <div>
          <Italic>
            <Underlined>Cast of Characters:</Underlined>
          </Italic>
        </div>
        <div>
          <strong>
            <Highlighted>V</Highlighted>ictor
          </strong>
        </div>
        <div>
          <strong>
            <Highlighted>S</Highlighted>ally
          </strong>
          , Victor’s wife
        </div>
        <div>
          <strong>
            <Highlighted>E</Highlighted>dith
          </strong>
          , Victor and Sally’s teenage daughter
        </div>
        <div>
          <strong>
            <Highlighted>P</Highlighted>aul
          </strong>
          , Victor’s friend and coworker
        </div>
        <div>
          <strong>
            <Highlighted>R</Highlighted>obbie
          </strong>
          , Paul’s teenage son
        </div>
        <div>
          <strong>
            <Highlighted>Theo R. Y</Highlighted>ork
          </strong>
          , Victor and Paul’s boss
        </div>
      </Group>
      <p>
        <Annotation>
          Note that the list of characters is an acrostic (more or less)
          spelling VSEPR Theory.
        </Annotation>
      </p>
      <Indented>
        (Victor, Sally, and Edith arrive at a restaurant. Victor asks the waiter
        for a table for five. The waiter leads them to a table with five chairs
        carefully arranged around it. Victor, Sally, and Edith sit down, leaving
        two lone chairs.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="25%"
          src={image1}
          alt="Clipart icons showing three people occupying three consecutive seats out of five around a round table"
        />
        <div>
          <Annotation>
            There are now five chairs at the table: three people (bonds) and two
            lone chairs, corresponding to a T-SHAPED geometry. The letter I is
            extracted from below.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>SALLY</Name>
        <div>
          I don’t know why I agreed to dinner with Paul. He acts like he’s part
          of the intelligen<Highlighted>TSIA, PED</Highlighted>dling crazy
          theories all the time. I think I need to get a drink before he gets
          here.
        </div>
      </Group>
      <Indented>
        (Sally gets up to go to the bar, leaving Victor and Edith sitting across
        from each other.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="25%"
          src={image2}
          alt="Clipart icons showing two people occupying two non-continguous seats out of five around a round table"
        />
        <div>
          <Annotation>
            Now there are still five chairs at the table but only two people
            (bonds) and three lone chairs. This corresponds to a LINEAR geometry
            and the letter T is extracted from the next line of dialogue.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>EDITH</Name>
        <div>
          I don’t think Paul is that bad. I think Mom just has a{" "}
          <Highlighted>TIN EAR</Highlighted> and refuses to listen to anything
          he says.
        </div>
      </Group>
      <Indented>
        (Sally returns with a glass of wine and sits back down; a few seconds
        later, Paul walks in and sits in one of the empty chairs.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="25%"
          src={image3}
          alt="Clipart icons showing four people occuyping four seats out of five around a round table"
        />
        <div>
          <Annotation>
            There are still five chairs, but now four people sitting down and
            only one lone chair. This corresponds to a SEE-SAW geometry, and the
            letter T is extracted from the next line of dialogue.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>PAUL</Name>
        <div>
          Robbie will be here in a second—he’s texting with a friend outside.
          Sometimes I worry that he’ll be staring at that screen while he wa
          <Highlighted>STES AW</Highlighted>ay to nothing.
          <Italic>(His chair suddenly makes a loud creaking noise.)</Italic> I
          think this chair is broken, I’ll take it to the manager.
        </div>
      </Group>
      <Indented>
        (Paul picks up his chair and leaves the table with it, looking for a
        manager to complain to.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="25%"
          src={image4}
          alt="Clipart icons showing three people occupying three seats out of four around a round table"
        />
        <div>
          <Annotation>
            Now we have lost one chair and one person, leaving four chairs with
            three people (bonds) and one lone chair. This corresponds to a
            TRIGONAL PYRAMIDAL geometry and the letter A is extracted.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>VICTOR</Name>
        <div>
          Paul was just telling me about a terrible game of golf he played
          yesterday with Al; he couldn’t get any of the angles right. I told
          him, don’t blame <Highlighted>TRIG ON AL. PAR, AMID AL</Highlighted>l
          the difficulties of the course, can be very hard to reach!
        </div>
      </Group>
      <Indented>
        (Paul returns, carrying a new chair, along with the manager, who is also
        carrying an extra chair. Paul sits down in his new chair, and the
        manager places the extra chair across from the other empty one.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="25%"
          src={image5}
          alt="Clipart icons showing four people occupying two blocks of two contiguous seats each out ofo a total of six seats around a round table"
        />
        <div>
          <Annotation>
            Now there are a total of six chairs, two of which are empty. This
            corresponds to a SQUARE PLANAR geometry and the letter K is
            extracted.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>PAUL</Name>
        <div>
          We brought an extra chair in case the other one is broken too. We have
          to be careful—you never know when there will be a tremendou
          <Highlighted>S QUAKE, PLAN AT</Highlighted>ound it!
        </div>
      </Group>
      <Indented>
        (Robbie finally walks in and sits in one of the empty chairs.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="25%"
          src={image6}
          alt="Clipart icons showing five people occupying five out of six seats around a round table"
        />
        <div>
          <Annotation>
            There are still six chairs, but now five of them are occupied with
            one lone chair. This corresponds to a SQUARE PYRAMIDAL geometry and
            the letter E is extracted.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>PAUL</Name>
        <div>
          Glad my son decided to join us! Sometimes I feel like he barely pays
          any attention to his family. He’s already spent all day watching
          Spongebob <Highlighted>SQUAREP—ER, AM I DAL</Highlighted>lying too
          long on this rant?{" "}
          <Italic>
            (He sees Theo walk in and sit at a nearby table by himself.)
          </Italic>{" "}
          Oh, what a coincidence, our boss is here tonight too! Victor, why
          don’t we go join him for a bit?
        </div>
      </Group>
      <Indented>
        (Victor and Paul walk over and greet Theo, who is sitting at a table
        with two extra chairs. They sit in the chairs, arranging themselves
        evenly around the table.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="50%"
          src={image7}
          alt="Clipart icons showing two round tables. The first has six chairs, three of which are occupied. Two of those occupants are sitting next to each other, the third is not. The second table has three chairs, all occupied."
        />
        <div>
          <Annotation>
            The next line corresponds to the second table, where there are three
            chairs, all of which have people in them (Theo, Victor, and Paul).
            This corresponds to a TRIGONAL PLANAR geometry and the letter S is
            extracted.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>THEO</Name>
        <div>
          Sorry, I didn’t notice you when I came in. I was busy thinking about a
          climbing trip I’m leaving for tomorrow—we migh
          <Highlighted>T RIG ON ALPS, A NAR</Highlighted>row gorge, or in a
          cave!{" "}
          <Italic>(He notices Sally still sitting at the other table.)</Italic>{" "}
          Sally, why don’t you come join us!
        </div>
      </Group>
      <Indented>
        (Sally brings her chair over and joins Theo, Victor, and Paul at the
        table; they rearrange their chairs to make room for her.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="50%"
          src={image8}
          alt="Clipart icons showing two round tables. The first has five chairs, two of which are occupied. The two occupants are not sitting next to each other. The second table has four chairs, all occupied."
        />
        <div>
          <Annotation>
            There are now four chairs and four people at this table. This
            corresponds to a TETRAHEDRAL geometry and the letter T is extracted.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>SALLY</Name>
        <div>
          Victor and I saw an interesting movie about classical musicians last
          night—it was called String Sex
          <Highlighted>TET, RATED R, AL</Highlighted>though maybe not for the
          reasons you’d think! Well, nice chatting, but I probably shouldn’t
          leave the kids alone for too long.
        </div>
      </Group>
      <Indented>
        (Sally leaves her chair behind at Theo’s table and returns to sit in one
        of the other empty chairs next to Robbie and Edith. She attempts to make
        awkward conversation with them.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="50%"
          src={image9}
          alt="Clipart icons showing two round tables. The first has five chairs, three of which are occupied. All three occupants are sitting next to each other. The second table has four chairs, of which three are occupied."
        />
        <div>
          <Annotation>
            There are now five chairs and three people at Sally, Robbie, and
            Edith’s table. This corresponds (again) to a T-SHAPED geometry, and
            the letter W is extracted.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>SALLY</Name>
        <div>
          Robbie, I heard you recently traded in your phone for an upgraded
          model. Grea<Highlighted>T SWAP! ED</Highlighted>ith, don’t you agree?{" "}
          <Italic>
            (Edith and Robbie are both scrolling silently on their phones.)
          </Italic>{" "}
          Maybe we should invite Theo to join us over here.
        </div>
      </Group>
      <Indented>
        (Sally waves at Theo, Paul, and Victor to come back to their table and
        join them. They come over. Paul and Victor sit in the available empty
        chairs and Theo brings over an extra chair for himself. The others make
        room for him to fit in.)
      </Indented>
      <ImageAndText>
        <ImageWrapper
          $basis="50%"
          src={image10}
          alt="Clipart icons showing two round tables. The first has six chairs, all of which are occupied. The second has three chairs, none of which are occupied."
        />
        <div>
          <Annotation>
            There are now six chairs at the main table, all of them occupied.
            This corresponds to an OCTAHEDRAL geometry and the letter O is
            extracted.
          </Annotation>
        </div>
      </ImageAndText>
      <Group>
        <Name>PAUL</Name>
        <div>
          Speaking of classical music, did I tell you all about Robbie’s latest
          trumpet recital? He can do it all. He’d t
          <Highlighted>OOT “A”, HE’D RAL</Highlighted>lentando, it was great!
        </div>
      </Group>
      <Indented>
        (The conversations continue; everyone has great chemistry and it shapes
        up to be a perfect evening.)
      </Indented>
      <p>
        <Annotation>Putting the extraction together:</Annotation>
      </p>
      <StyledTable>
        <tr>
          <th>Shape</th>
          <th>Extraction Phrase</th>
          <th>Extracted Letter</th>
        </tr>
        <tr>
          <td>T-SHAPED</td>
          <td>intelligenTSIA, PEDdling</td>
          <td>
            <Mono>I</Mono>
          </td>
        </tr>
        <tr>
          <td>LINEAR</td>
          <td>TIN EAR</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
        <tr>
          <td>SEE-SAW</td>
          <td>waSTES AWay</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
        <tr>
          <td>TRIGONAL PYRAMIDAL</td>
          <td>TRIG ON AL. PAR, AMID ALl</td>
          <td>
            <Mono>A</Mono>
          </td>
        </tr>
        <tr>
          <td>SQUARE PLANAR</td>
          <td>tremendouS QUAKE, PLAN ARound</td>
          <td>
            <Mono>K</Mono>
          </td>
        </tr>
        <tr>
          <td>SQUARE PYRAMIDAL</td>
          <td>SQUAREP–ER, AM I DALlying</td>
          <td>
            <Mono>E</Mono>
          </td>
        </tr>
        <tr>
          <td>TRIGONAL PLANAR</td>
          <td>mighT RIG ON ALPS, A NARrow</td>
          <td>
            <Mono>S</Mono>
          </td>
        </tr>
        <tr>
          <td>TETRAHEDRAL</td>
          <td>sexTET, RATED R, ALthough</td>
          <td>
            <Mono>T</Mono>
          </td>
        </tr>
        <tr>
          <td>T-SHAPED</td>
          <td>greaT SWAP! EDith</td>
          <td>
            <Mono>W</Mono>
          </td>
        </tr>
        <tr>
          <td>OCTAHEDRAL</td>
          <td>tOOT “A”, HE’D RALlentando</td>
          <td>
            <Mono>O</Mono>
          </td>
        </tr>
      </StyledTable>
      <p>
        <Annotation>
          Spells the answer{" "}
          <Mono>
            <strong>IT TAKES TWO</strong>
          </Mono>
        </Annotation>
        .
      </p>
    </>
  );
};

export default Solution;
