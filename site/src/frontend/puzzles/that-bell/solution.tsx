import React from "react";
import { styled } from "styled-components";
import { NotoColorEmojiFont } from "../../assets/SharedFonts";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const GREATEST_ECLIPSE_DATA = [
  [
    "EMPEROR WHEN CONSTANTINE II WAS BEHEADED",
    "Constantine V (Byzantine Empire)",
    "767",
    "1",
    "C",
    "CANADA",
    "C",
    "Leo III",
  ],
  [
    "HE FENDED OFF ATTACK IN BATTLE OF BERZITIA",
    "Constantine V (Byzantine Empire)",
    "774",
    "2",
    "O",
    "CANADA",
    "A",
    "Leo III",
  ],
  [
    "RULER WHEN EMPEROR KOKO WAS BORN",
    "Junna (Japan)",
    "830",
    "2",
    "U",
    "MEXICO",
    "E",
    "Kanmu",
  ],
  [
    "CO-RULER WITH ROMANOS I WHEN LEO VII DIED",
    "Constantine VII (Byzantine Empire)",
    "939",
    "7",
    "N",
    "KAZAKHSTAN",
    "S",
    "Leo VI",
  ],
  [
    "HE WORE THE CROWN OF ENGLAND WHEN MIESZKO I DIED",
    "Æthelred II the Unready (England)",
    "992",
    "2",
    "T",
    "PARAGUAY",
    "A",
    "Edgar",
  ],
  [
    "BENEDICT VIII BECAME POPE WHEN HE RULED FRANCE",
    "Robert II (France)",
    "1012",
    "1",
    "R",
    "RUSSIA",
    "R",
    "Hugh Capet",
  ],
  [
    "BROTHER ROBERT II INVADED TO CHALLENGE HIS CROWN",
    "Henry I (England)",
    "1101",
    "6",
    "I",
    "MOZAMBIQUE",
    "B",
    "William I",
  ],
  [
    "RULED DURING BATTLE OF SANDWICH",
    "Henry III (England)",
    "1217",
    "2",
    "E",
    "PERU",
    "E",
    "John",
  ],
  [
    "HE MARRIED THE MOTHER OF KALIMAN ASEN",
    "Ivan Asen II (Bulgaria)",
    "1221",
    "6",
    "S",
    "MONGOLIA",
    "L",
    "Ivan Asen I",
  ],
  [
    "NAMED ALEXIOS PHILANTHROPENOS HEAD OF ANATOLIAN CORPS",
    "Andronikos II Palaiologos (Byzantine Empire)",
    "1293",
    "5",
    "O",
    "EGYPT",
    "T",
    "Michael VIII",
  ],
  [
    "HE DIRECTED SIEGE OF TORDEHUMOS",
    "Ferdinand IV (Castile & Leon)",
    "1307",
    "1",
    "F",
    "SUDAN",
    "S",
    "Sancho IV",
  ],
  [
    "NORTHERN EMPEROR WHEN KOMYO EXPIRED",
    "Go-En’yū (Japan)",
    "1380",
    "1",
    "G",
    "KENYA",
    "K",
    "Go-Kogon",
  ],
  [
    "PAINTED BY SEISENEGGER WITH HOUND",
    "Charles V (Holy Roman Empire)",
    "1532",
    "4",
    "R",
    "MALI",
    "I",
    "Philip I",
  ],
  [
    "HIS EMPIRE ACHIEVED A WIN IN THE SIEGE OF PEST",
    "Suleiman I (Ottoman)",
    "1542",
    "4",
    "E",
    "CHINA",
    "N",
    "Selim I",
  ],
  [
    "HE DECREED THE EDICT OF ROMORANTIN",
    "Francis II (France)",
    "1560",
    "3",
    "A",
    "ALGERIA",
    "G",
    "Henry II",
  ],
  [
    "HE FATHERED SOPHIE WITH ANNE CATHERINE",
    "Christian IV (Denmark)",
    "1605",
    "6",
    "T",
    "FRANCE",
    "E",
    "Frederick II",
  ],
  [
    "GO-MIZUNOO DIED WHEN HE WAS EMPEROR",
    "Reigen (Japan)",
    "1680",
    "5",
    "E",
    "DEMOCRATIC REPUBLIC OF THE CONGO",
    "C",
    "Go-Mizunoo",
  ],
  [
    "BAHAMAS BRIEFLY RETAKEN FROM THE BRITISH UNDER HIS RULE",
    "Charles III (Spain)",
    "1782",
    "7",
    "S",
    "AUSTRALIA",
    "L",
    "Philip V",
  ],
  [
    "HE PROCLAIMED ATHENS AS CAPITAL CITY",
    "Otto (Greece)",
    "1834",
    "3",
    "T",
    "UNITED STATES",
    "I",
    "Ludwig I",
  ],
  [
    "CHRISTIAN OF GLUCKSBURG CHOSEN AS HIS HEIR-PRESUMPTIVE",
    "Frederick VII (Denmark)",
    "1852",
    "3",
    "E",
    "JAPAN",
    "P",
    "Christian VIII",
  ],
  [
    "RULED WHEN PROGRESSIVE DISSIDENCE PARTY WAS ESTABLISHED",
    "Carlos I (Portugal)",
    "1905",
    "1",
    "C",
    "SPAIN",
    "S",
    "Luis I",
  ],
  [
    "HE AND VICTORIA EUGENIE PRODUCED GONZALO",
    "Alfonso XIII (Spain)",
    "1914",
    "2",
    "L",
    "BELARUS",
    "E",
    "Alfonso XII",
  ],
  [
    "DANISH UNITY PARTY FOUNDED WHEN HE WORE THE CROWN",
    "Christian X (Denmark)",
    "1936",
    "4",
    "I",
    "RUSSIA",
    "S",
    "Frederick VIII",
  ],
  [
    "HE CAME FROM GREECE TO ATTEND FUNERAL OF GEORGE VI",
    "Paul (Greece)",
    "1952",
    "1",
    "P",
    "SUDAN",
    "S",
    "Constantine I",
  ],
  [
    "TINKHUNDLA HQ WAS BOMBED IN HIS CAPITAL",
    "Mswati III (Swaziland)",
    "1999",
    "2",
    "S",
    "ROMANIA",
    "O",
    "Sobhuza II",
  ],
  [
    "REIGNED OVER THE COVID RESPONSE OF BRUSSELS",
    "Philippe (Belgium)",
    "2020",
    "8",
    "E",
    "ARGENTINA",
    "N",
    "Albert II",
  ],
];

const CAESAR_SHIFTED_DATA = [
  ["Hugh Capet", "1", "IVHINBQFU", "HUGHMAPET", "M"],
  ["Alfonso XII", "2", "CNHQPUCZKK", "ALFONSAXII", "A"],
  ["Leo III", "3", "NHRLLL", "KEOIII", "K"],
  ["Henry II", "4", "IIRVCMM", "EENRYII", "E"],
  ["Philip V", "5", "UUNQNUA", "PPILIPV", "P"],
  ["Kanmu", "6", "QGTSG", "KANMA", "A"],
  ["Edgar", "7", "LYNHY", "ERGAR", "R"],
  ["William I", "8", "EQTWQIUQ", "WILOIAMI", "O"],
  ["Selim I", "9", "MNURVR", "DELIMI", "D"],
  ["Ludwig I", "10", "VENGSIS", "LUDWIYI", "Y"],
  ["Michael VIII", "11", "XZNSLPWGTTT", "MOCHAELVIII", "O"],
  ["Philip I", "12", "BTUXURU", "PHILIFI", "F"],
  ["Constantine I", "13", "PBAFGNAOVARV", "CONSTANBINEI", "B"],
  ["Ivan Asen I", "14", "WJOBCGSBW", "IVANOSENI", "O"],
  ["Leo III", "15", "ATDXCX", "LEOINI", "N"],
  ["Frederick II", "16", "VHUTUHYDAYY", "FREDERINKII", "N"],
  ["Sancho IV", "17", "JZETYFZM", "SINCHOIV", "I"],
  ["Albert II", "18", "WDTWJLAA", "ELBERTII", "E"],
  ["John", "19", "CHAM", "JOHT", "T"],
  ["Leo VI", "20", "SYIPC", "YEOVI", "Y"],
  ["Go-Kogon", "21", "BJFJBJG", "GOKOGOL", "L"],
  ["Frederick VIII", "22", "BNAZANEAGREEE", "FREDERIEKVIII", "E"],
  ["Christian VIII", "23", "ZEOFPQFOKSFFF", "CHRISTIRNVIII", "R"],
  ["Go-Mizunoo", "24", "FMKGXSLMM", "HOMIZUNOO", "H"],
  ["Luis I", "25", "KTHHH", "LUIII", "I"],
  ["Sobhuza II", "26", "STBHUZAII", "STBHUZAII", "T"],
];

const StyledTable = styled.table`
  margin: 1em 0;
  th:not(:last-child),
  td:not(:last-child) {
    padding-right: 1em;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <NotoColorEmojiFont />
      <p>
        Solvers are given a gibberish block of monospaced text, and also some
        circular shapes. If solvers search in the block of text, they find that
        the circular shapes will line up with text that spells out a clue of a
        historical event. To aid in identification, the starting 4 letters are
        provided, the first letter in red and the following 3 in orange. When
        investigating these clues, solvers realize that each clue identifies
        both a year, and a monarch (all top-of-the-hierarchy monarchs, i.e.
        kings and emperors). As a check of solvers’ work, the circles are
        ordered in alpha-order by the name of the monarch. Solvers should order
        these monarchs in chronological order of the event. Earlier when finding
        the clues, solvers will have noticed that each clue has an extra “X” in
        it. If solvers take the position of this “X” in the clue as an index
        into the monarch names, they’ll spell{" "}
        <Mono>COUNTRY OF GREATEST ECLIPSE</Mono>.
      </p>
      <p>
        At this point solvers will realize that they should look to NASA’s
        catalog of eclipses throughout history. If they look at the year of each
        of the events they found in the previous step, they will see that there
        was exactly one total eclipse during the year of each monarch’s event.
        (Get it, get it, the “corona” of the eclipse clues a monarch, since
        “corona” means “crown” 😏.) As confirmation that solvers are interested
        in the total eclipses, and not, say, the annular ones, the flavor text
        references the total solar eclipse in 2024, for which the point of
        greatest eclipse was in Mexico. They’ll also notice that the point of
        greatest eclipse (indicated by the star shape on NASA’s maps) lands on a
        country. Solvers should now reuse the index from earlier, the one from
        the position of the “X” in the clue, to index into the countries that
        they found, again taking them in chronological order. Reading off these
        indexed letters gives a new cluephrase,{" "}
        <Mono>CAESAR BELTS, KING ECLIPSES SON</Mono>.
      </p>
      <p>
        This cluephrase indicates to solvers that they should look to the
        equators of the moons (the part eclipsing the sun / “son”). As extra
        indication that this is the correct move, solvers may have noticed that
        all of the circles had an odd-length height, thus having a well-defined
        equator within the grid. The moon diagram at the bottom of the puzzle
        serves as a glossary, to help solvers confirm that “belt” here is cluing
        the equator. Here, if they try to caesar shift the letters on the
        equator, they’ll find that it hides the name of the father of the
        monarch that was clued in the corona (who was also a king prior to his
        son). The equators are padded with words that are clearly filler
        (“trash”, “junk”, “residue”) to aid in identifying the correct shift.
        However, one letter will be wrong in the father’s name. If solvers note
        the shift value of the caesar shifts, they’ll notice that the shifts are
        all unique, 1-26. Using the shift as an ordering and taking the letter
        that was incorrect, solvers arrive at the phrase{" "}
        <Mono>MAKE PARODY OF BONNIE TYLER HIT</Mono>, indicating to teams that
        they should put together a parody of “Total Eclipse of the Heart” (or
        decide to be contrarian and make a parody of a different hit).
      </p>
      <p>
        When solvers submitted their parody, they were provided with the final
        answer, <PuzzleAnswer>[pending]</PuzzleAnswer>.
      </p>
      <h3>Monarch and country of greatest eclipse data</h3>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Monarch clue</th>
            <th>Monarch</th>
            <th>Year</th>
            <th>Index</th>
            <th>Monarch letter</th>
            <th>Country of Greatest Eclipse</th>
            <th>Country Letter</th>
            <th>Father / former King</th>
          </tr>
          {GREATEST_ECLIPSE_DATA.map(
            (
              [
                clue,
                monarch,
                year,
                index,
                monarchLetter,
                country,
                countryLetter,
                father,
              ],
              i,
            ) => (
              <tr key={i}>
                <td>{clue}</td>
                <td>{monarch}</td>
                <td>{year}</td>
                <td>{index}</td>
                <td>{monarchLetter}</td>
                <td>{country}</td>
                <td>{countryLetter}</td>
                <td>{father}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
      <h3>Caesar-shifted equator data</h3>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Father/former King</th>
            <th>Caesar shift</th>
            <th>Equator</th>
            <th>Unshifted equator</th>
            <th>Final extraction letter</th>
          </tr>
          {CAESAR_SHIFTED_DATA.map(
            ([father, shift, equator, unshifted, extract], i) => (
              <tr key={i}>
                <td>{father}</td>
                <td>{shift}</td>
                <td>{equator}</td>
                <td>{unshifted}</td>
                <td>{extract}</td>
              </tr>
            ),
          )}
        </StyledTable>
      </HScrollTableWrapper>
      <h3>Author’s Note (Wesley)</h3>
      <p>
        {" "}
        I want to dedicate this puzzle to my mom. The puzzle almost didn’t end
        up finished. We were in the middle of writing it when she was diagnosed
        with late-stage cancer and passed away shortly after. While in the midst
        of grieving, I knew that Mom would’ve wanted me to keep doing whatever
        in life brings me joy. So I want to dedicate this puzzle, and all my
        efforts in the final months of writing hunt, to her memory, with endless
        love ❤️
      </p>
    </>
  );
};

export default Solution;
