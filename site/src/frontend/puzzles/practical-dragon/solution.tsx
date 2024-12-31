import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";
import solution01 from "./assets/solution.png";

const BBspan = styled.span`
  background-color: #a4c2f4;
`;

const HMspan = styled.span`
  background-color: #d5a6bd;
`;

const WAspan = styled.span`
  background-color: #b6d7a8;
`;

const BBtd = styled.td`
  background-color: #a4c2f4;
`;

const HMtd = styled.td`
  background-color: #d5a6bd;
`;

const WAtd = styled.td`
  background-color: #b6d7a8;
`;

const ExtractionTd = styled.td`
  background-color: #00ff00;
`;

// prettier-ignore
const SOLUTION_DATA: [number, "BB" | "HM" | "WA", string, string, string][] = [
  [1, "WA", "ODE TO A SUPERHERO", "PIANO MAN", "BILLY JOEL"],
  [2, "WA", "ACHY BREAKY SONG", "ACHY BREAKY HEART", "BILLY RAY CYRUS"],
  [3, "BB", "SEALED WITH A SWISS", "SEALED WITH A KISS", "BRIAN HYLAND"],
  [4, "BB", "CAULIFLOWER ME MAYBE", "CALL ME MAYBE", "CARLY RAE JEPSEN"],
  [5, "WA", "WHITE & NERDY", "RIDIN DIRTY", "CHAMILLIONAIRE"],
  [6, "HM", "JOANNIE B. GOODE", "JOHNNY B. GOODE", "CHUCK BERRY"],
  [7, "WA", "GIRLS JUST WANT TO HAVE LUNCH", "GIRLS JUST WANNA HAVE FUN", "CYNDI LAUPER"],
  [8, "BB", "CHEVRE WHICH WAY BUT LOOSE", "EVERY WHICH WAY BUT LOOSE", "EDDIE RABBITT"],
  [9, "BB", "SHAKE YOUR HONEY MAKER", "SHAKE YOUR MONEYMAKER", "ELMORE JAMES"],
  [10, "HM", "DON’T GO BREAKING MY TOOTH", "DON’T GO BREAKING MY HEART", "ELTON JOHN AND KIKI DEE"],
  [11, "WA", "SHE DRIVES LIKE CRAZY", "SHE DRIVES ME CRAZY", "FINE YOUNG CANNIBALS"],
  [12, "HM", "B-B-B-BAD TO THE CHROME", "B-B-B-BAD TO THE BONE", "GEORGE THOROGOOD AND THE DESTROYERS"],
  [13, "BB", "SWEET CHILI O’ MINE", "SWEET CHILD O’ MINE", "GUNS N ROSES"],
  [14, "HM", "I AM MAMAW, HEAR ME ROAR!", "I AM WOMAN, HEAR ME ROAR!", "HELEN REDDY"],
  [15, "BB", "IN RICOTTA DA VIDA", "IN-A-GADDA-DA-VIDA", "IRON BUTTERFLY"],
  [16, "HM", "IT’S A MANNEQUIN’S WORLD", "IT’S A MAN’S MAN’S MAN’S WORLD", "JAMES BROWN"],
  [17, "WA", "LIVING WITH A HERNIA", "LIVING IN AMERICA", "JAMES BROWN"],
  [18, "WA", "I LOVE ROCKY ROAD", "I LOVE ROCK N ROLL", "JOAN JETT AND THE BLACKHEARTS"],
  [19, "BB", "PUT ME IN POACHED", "PUT ME IN COACH", "JOHN FOGERTY"],
  [20, "HM", "GOOD GOLLY, MISS DOLLY", "GOOD GOLLY, MISS MOLLY", "LITTLE RICHARD"],
  [21, "BB", "SHUT UP AND SWISS ME", "SHUT UP AND KISS ME", "MARY CHAPIN CARPENTER"],
  [22, "HM", "TORN BETWEEN TWO HANNAHS", "TORN BETWEEN TWO LOVERS", "MARY MACGREGOR"],
  [23, "WA", "THE BRADY BUNCH", "THE SAFETY DANCE", "MEN WITHOUT HATS"],
  [24, "HM", "DON’T STOP ’TIL YOU GET THE PHONE", "DON’T STOP ’TIL YOU GET ENOUGH", "MICHAEL JACKSON"],
  [25, "WA", "FAT", "BAD", "MICHAEL JACKSON"],
  [26, "WA", "PARTY IN THE CIA", "PARTY IN THE USA", "MILEY CYRUS"],
  [27, "WA", "SMELLS LIKE NIRVANA", "SMELLS LIKE TEEN SPIRIT", "NIRVANA"],
  [28, "HM", "BYE BYE BALL", "BYE BYE BYE", "NSYNC"],
  [29, "BB", "50 WAYS TO LEAVE YOUR GUAVA", "50 WAYS TO LEAVE YOUR LOVER", "PAUL SIMON"],
  [30, "HM", "ME AND RICO DOWN BY THE SCHOOLYARD", "ME AND JULIO DOWN BY THE SCHOOLYARD", "PAUL SIMON"],
  [31, "BB", "CHARBROIL FAIR", "SCARBOROUGH FAIR", "SIMON AND GARFUNKEL"],
  [32, "BB", "BABY GOT BAK CHOY", "BABY GOT BACK", "SIR MIX A LOT"],
  [33, "BB", "VIDEO KILLED THE RADICCHIO STAR", "VIDEO KILLED THE RADIO STAR", "THE BUGGLES"],
  [34, "HM", "NEW KID IN SCHOOL", "NEW KID IN TOWN", "THE EAGLES"],
  [35, "WA", "PRETTY FLY FOR A RABBI", "PRETTY FLY FOR A WHITE GUY", "THE OFFSPRING"],
  [36, "HM", "DE-DO-DO-DO DA-DON’T-DON’T, DON’T, TELL MY SECRET", "DE-DO-DO-DO, DE-DA-DA-DA IS ALL I WANT TO SAY TO YOU", "THE POLICE"],
  [37, "WA", "GUMP", "LUMP", "THE PRESIDENTS OF THE UNITED STATES OF AMERICA"],
  [38, "BB", "GREEN A LITTLE BEAN OF ME", "DREAM A LITTLE BIT OF ME", "WAYNE KING AND HIS ORCHESTRA"],
];

// prettier-ignore
const BB_DATA: [number, string, string, string, string, string][] = [
  [1, "CHEVRE WHICH WAY BUT LOOSE", "EVERY WHICH WAY BUT LOOSE", "EDDIE RABBITT", "10", "I"],
  [2, "SHAKE YOUR HONEY MAKER", "SHAKE YOUR MONEYMAKER", "ELMORE JAMES", "5", "R"],
  [3, "50 WAYS TO LEAVE YOUR GUAVA", "50 WAYS TO LEAVE YOUR LOVER", "PAUL SIMON", "2", "A"],
  [4, "CHARBROIL FAIR", "SCARBOROUGH FAIR", "SIMON AND GARFUNKEL", "14", "N"],
  [5, "SWEET CHILI O’ MINE", "SWEET CHILD O’ MINE", "GUNS N’ ROSES", "4", "S"],
  [6, "PUT ME IN POACHED", "PUT ME IN COACH", "JOHN FOGERTY", "6", "O"],
  [7, "VIDEO KILLED THE RADICCHIO STAR", "VIDEO KILLED THE RADIO STAR", "THE BUGGLES", "1", "T"],
  [8, "SHUT UP AND SWISS ME", "SHUT UP AND KISS ME", "MARY CHAPIN CARPENTER", "12", "A"],
  [9, "SEALED WITH A SWISS", "SEALED WITH A KISS", "BRIAN HYLAND", "2", "R"],
  [10, "IN RICOTTA DA VIDA", "IN-A-GADDA-DA-VIDA", "IRON BUTTERFLY", "3", "O"],
  [11, "GREEN A LITTLE BEAN OF ME", "DREAM A LITTLE BIT OF ME", "WAYNE KING AND HIS ORCHESTRA", "1", "W"],
  [12, "BABY GOT BAK CHOY", "BABY GOT BACK", "SIR MIX A LOT", "7", "A"],
  [13, "CAULIFLOWER ME MAYBE", "CALL ME MAYBE", "CARLY RAE JEPSEN", "5", "Y"],
];

// prettier-ignore
const HM_DATA: [number, string, string, string, string, string][] = [
  [1, "B-B-B-BAD TO THE CHROME", "B-B-B-BAD TO THE BONE", "GEORGE THOROGOOD AND THE DESTROYERS", "31", "S"],
  [2, "BYE BYE BALL", "BYE BYE BYE", "NSYNC", "5", "C"],
  [3, "CALIFORNIA SCREAMIN", "CALIFORNIA DREAMIN", "THE MAMAS & THE PAPAS", "2", "H"],
  [4, "DE-DO-DO-DO DA-DON’T-DON’T, DON’T, TELL MY SECRET", "DE-DO-DO-DO, DE-DA-DA-DA IS ALL I WANT TO SAY TO YOU", "THE POLICE", "5", "O"],
  [5, "DON’T STOP ’TIL YOU GET THE PHONE", "DON’T STOP ’TIL YOU GET ENOUGH", "MICHAEL JACKSON", "13", "O"],
  [6, "GOOD GOLLY, MISS DOLLY", "GOOD GOLLY, MISS MOLLY", "LITTLE RICHARD", "5", "L"],
  [7, "I AM MAMAW, HEAR ME ROAR!", "I AM WOMAN, HEAR ME ROAR!", "HELEN REDDY", "10", "Y"],
  [8, "IT’S A MANNEQUIN’S WORLD", "IT’S A MAN’S MAN’S MAN’S WORLD", "JAMES BROWN", "6", "B"],
  [9, "JOANNIE B. GOODE", "JOHNNY B. GOODE", "CHUCK BERRY", "3", "U"],
  [10, "MASCOT LOVE", "MUSKRAT LOVE", "CAPTAIN &amp; TENNILLE", "15", "L"],
  [11, "NEW KID IN SCHOOL", "NEW KID IN TOWN", "THE EAGLES", "7", "L"],
  [12, "TORN BETWEEN TWO HANNAHS", "TORN BETWEEN TWO LOVERS", "MARY MACGREGOR", "4", "Y"],
];

// prettier-ignore
const WA_DATA: [number, string, string, string, string, string][] = [
  [1, "I LOVE ROCKY ROAD", "I LOVE ROCK N ROLL", "JOAN JETT &amp; THE BLACKHEARTS", "8", "T"],
  [2, "THE BRADY BUNCH", "THE SAFETY DANCE", "MEN WITHOUT HATS", "11", "H"],
  [3, "GIRLS JUST WANT TO HAVE LUNCH", "GIRLS JUST WANNA HAVE FUN", "CYNDI LAUPER", "10", "E"],
  [4, "LIVING WITH A HERNIA", "LIVING IN AMERICA", "JAMES BROWN", "5", "S"],
  [5, "FAT", "BAD", "MICHAEL JACKSON", "5", "A"],
  [6, "SHE DRIVES LIKE CRAZY", "SHE DRIVES ME CRAZY", "FINE YOUNG CANNIBALS", "9", "G"],
  [7, "SMELLS LIKE NIRVANA", "SMELLS LIKE TEEN SPIRIT", "NIRVANA", "5", "A"],
  [8, "ACHY BREAKY SONG", "ACHY BREAKY HEART", "BILLY RAY CYRUS", "1", "B"],
  [9, "GUMP", "LUMP", "THE PRESIDENTS OF THE UNITED STATES OF AMERICA", "35", "E"],
  [10, "PRETTY FLY FOR A RABBI", "PRETTY FLY FOR A WHITE GUY", "THE OFFSPRING", "12", "G"],
  [11, "ODE TO A SUPERHERO", "PIANO MAN", "BILLY JOEL", "2", "I"],
  [12, "WHITE &amp; NERDY", "RIDIN DIRTY", "CHAMILLIONAIRE", "10", "N"],
  [13, "PARTY IN THE CIA", "PARTY IN THE USA", "MILEY CYRUS", "10", "S"],
];

const EndTable = styled.table`
  td,
  th {
    padding-right: 2rem;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        All of the rebuses are puns/parodies of famous songs as clued by puzzle
        title “Zing it Again” (Zing sounds like Sing and is also a reference
        towards “Zingers”). Each of these puns/parodies is from a specific
        source as indicated by the three sets of initials BB, HM, and WA in
        final image. These three sources are:
      </p>
      <ul>
        <li>
          <BBspan>BB: Bob’s Burgers daily special puns</BBspan>
        </li>
        <li>
          <HMspan>HM: Hannah Montana episode title puns</HMspan>
        </li>
        <li>
          <WAspan>WA: Weird Al parodies</WAspan>
        </li>
      </ul>
      <p>
        As you solve the rebuses you will likely notice that the index A/B is
        such that B is the length of the band name. The band names are also
        given in alphabetical order.
      </p>
      <p>Below are the solutions for each rebus in given order:</p>

      <HScrollTableWrapper>
        <table>
          <thead>
            <tr>
              <th>
                <p>Img</p>
              </th>
              <th>
                <p>Rebus (Song parody/pun)</p>
              </th>
              <th>
                <p>Reference Song/Lyrics</p>
              </th>
              <th>
                <p>Band Name</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {SOLUTION_DATA.map((row) => {
              const RowTD = {
                WA: WAtd,
                BB: BBtd,
                HM: HMtd,
              }[row[1]];
              return (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <RowTD>{row[2]}</RowTD>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HScrollTableWrapper>

      <p>
        You need to next group them into their respective source category. The
        sort is provided through the image at the bottom (e.g. “four seasons”
        for Bob’s Burger means sort by seasons). Sorting and indexing into the
        band names will produce another song pun/parody from the respective
        source.
      </p>
      <h3>Bob’s Burgers (BB)</h3>
      <p>Sort = Seasons</p>

      <HScrollTableWrapper>
        <table>
          <thead>
            <tr>
              <th>BB Season</th>
              <th>Rebus Extracts to</th>
              <th>Actual Song/Lyrics</th>
              <th>Band</th>
              <th>Index</th>
              <th>Ext</th>
            </tr>
          </thead>
          <tbody>
            {BB_DATA.map((row) => {
              return (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <BBtd>{row[1]}</BBtd>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <ExtractionTd>{row[5]}</ExtractionTd>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HScrollTableWrapper>

      <p>Extracts to I RAN SO TARO WAY</p>
      <h3>Hannah Montana (HM)</h3>
      <p>
        Sort = Punny Titles (note both episode and actual song titles will work
        if you interpret it as “title”)
      </p>
      <HScrollTableWrapper>
        <table>
          <thead>
            <tr>
              <th>
                <p>HM sort</p>
              </th>
              <th>
                <p>Rebus Extracts to</p>
              </th>
              <th>
                <p>Actual Song/Lyrics</p>
              </th>
              <th>
                <p>Band</p>
              </th>
              <th>
                <p>Index</p>
              </th>
              <th>
                <p>Ext</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {HM_DATA.map((row) => {
              return (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <HMtd>{row[1]}</HMtd>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <ExtractionTd>{row[5]}</ExtractionTd>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HScrollTableWrapper>
      <p>Extracts to SCHOOLY BULLY</p>
      <h3>Weird Al (WA)</h3>
      <p>Sort = Album numbers</p>
      <HScrollTableWrapper>
        <table>
          <thead>
            <tr>
              <th>
                <p>WA Album</p>
              </th>
              <th>
                <p>Rebus Extracts to</p>
              </th>
              <th>
                <p>Actual Song/Lyrics</p>
              </th>
              <th>
                <p>Band</p>
              </th>
              <th>
                <p>Index</p>
              </th>
              <th>
                <p>Ext</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {WA_DATA.map((row) => {
              return (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <WAtd>{row[1]}</WAtd>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <ExtractionTd>{row[5]}</ExtractionTd>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HScrollTableWrapper>
      <p>Extracts to THE SAGA BEGINS</p>
      <p>
        For the final acrostic, if you try to index into the above three
        intermediate solutions, you won’t be able to. Notably the Hannah Montana
        extraction has very large indexes which won’t work. You instead need to
        repeat the mechanic a second time (“Zing it again”) and convert the
        songs to the respective band names. Doing so with the three intermediate
        solutions:
      </p>
      <HScrollTableWrapper>
        <EndTable>
          <tr>
            <th>
              <p>Set</p>
            </th>
            <th>
              <p>Intermediate Solution</p>
            </th>
            <th>
              <p>Actual Song</p>
            </th>
            <th>
              <p>Band</p>
            </th>
          </tr>
          <tr>
            <td>
              <p>BB</p>
            </td>
            <td>
              <p>I RAN SO TARO WAY</p>
            </td>
            <td>
              <p>I RAN SO FAR AWAY</p>
            </td>
            <td>
              <p>A FLOCK OF SEAGULLS</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>HM</p>
            </td>
            <td>
              <p>SCHOOLY BULLY</p>
            </td>
            <td>
              <p>WOOLY BULLY</p>
            </td>
            <td>
              <p>SAM THE SHAM AND THE PHARAOHS</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>WA</p>
            </td>
            <td>
              <p>THE SAGA BEGINS</p>
            </td>
            <td>
              <p>AMERICAN PIE</p>
            </td>
            <td>
              <p>DON MCLEAN</p>
            </td>
          </tr>
        </EndTable>
      </HScrollTableWrapper>
      <p>If you use the band names in the acrostic index you get</p>
      <p>
        <LinkedImage
          alt="Solved extraction: HERECOMESTHESUN"
          src={solution01}
        />
      </p>
      <p>
        The acrostic spells out HEAR COMES THE PUN. This is a pun on the Beatles
        song title “HERE COMES THE SUN”. It is also a joke setup for the final
        answer. Repeat the mechanic of Song pun → Band a third time (“Zing it
        again”) and get the final answer{" "}
        <PuzzleAnswer>THE BEATLES</PuzzleAnswer> (which is also a pun).
      </p>
    </>
  );
};

export default Solution;
