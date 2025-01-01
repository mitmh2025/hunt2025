import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const CALL_NUMBERS: [number, string, string][] = [
  [
    1,
    "BF1291 .W5 1853",
    "Discourses from the spirit-world / dictated by Stephen Olin through Rev. R.P. Wilson, writing medium.",
  ],
  [
    2,
    "BF1251 .H32",
    "Experimental investigation of the spirit manifestations : demonstrating the existence of spirits and their communion with mortals : doctrine of the spirit world respecting heaven, hell, morality, and God : also, the influence of Scripture on the morals of Christians / by Robert Hare.",
  ],
  [
    3,
    "BF1301 .B23",
    "Claude’s book / edited by L. Kelway-Bamber ; with an introductory letter from Sir Oliver Lodge.",
  ],
  [
    4,
    "BF1301 .R525",
    "Ouina’s canoe and Christmas offering : filled with flowers for the darlings of earth / given through her medium, Water Lily (Mrs. Cora L.V. Richmond).",
  ],
  [
    5,
    "BF1301 .R5",
    "The day after death : a discourse / by spirit Epes Sargent ; delivered through the medial instrumentality of Mrs. Cora L.V. Richmond ; in Fairbank Hall, Chicago, Ill., Sunday evening, Jan. 16, 1881.",
  ],
  [
    6,
    "GV1547 .D47",
    "Everybody’s guide to conjuring : a thoroughly practical handbook, specially written for the use of amateur magicians / by Frank Desmond.",
  ],
  [
    7,
    "BF1311.H3 H3 1896",
    "Hafed, Prince of Persia : his experiences in earth-life and spirit-life : being spirit communications received through Mr. David Duguid, the Glasgow trance-painting medium : with an appendix containing communications from the spirit artists Ruisdal and Steen.",
  ],
  [
    8,
    "GV1547 .B54 1899",
    "Isn’t it wonderful? : a history of magic and mystery / by Charles Bertram, conjurer, together with his reminiscences ; with numerous illustrations by Phil May, A.C. Corbould, Bernard F. Gribble, and other artists, and some explanatory diagrams by the author.",
  ],
  [
    9,
    "BF1301 .K8",
    "Spirit philosophy of Robert G. Ingersoll and Rev. Charles Haddon Spurgeon : together with post-mortem reveries of Jack Carpenter / compiled from the record of the Scientific Seance Circle.",
  ],
  [
    10,
    "QA95 .H3",
    "Numerical games : consisting of practical exercises in arithmetic, accompanied with a pack of cards : intended for the amusement and improvement of youth / by Thomas Halliday.",
  ],
  [
    11,
    "RM216 .F615",
    "Optimism : a real remedy / by Horace Fletcher ; with a foreword by William Dana Orcutt.",
  ],
  [
    12,
    "BT830 .M47",
    "Things after death : Three chapters on the intermediate state : with Thoughts on family burying places, and Hints for epitaphs in country churchyards.",
  ],
  [
    13,
    "BF1411 .C8",
    "Epidemic delusions : containing an exposé of the superstitions and frauds which underlie some ancient and modern delusions, including especial reference to modern spiritualism / by Rev. Amos N. Craft.",
  ],
  [
    14,
    "BF1301 .H593",
    "Speaking across the border-line : being letters from a husband in spirit life to his wife on earth / F. Helsop.",
  ],
  [
    15,
    "BF1031 .S45",
    "Our future existence, or, The death-surviving consciousness of man / by Fred. G. Shaw.",
  ],
  [
    16,
    "BF1301 .M25",
    "Meslom’s messages from the life beyond / by Mary A. McEvilly.",
  ],
  [
    17,
    "BF1251 .P68 1866",
    "Important discovery : the facts, fancies, and follies of spiritualism explained.",
  ],
  [18, "BF1275.C5 H35", "Try the spirits, or, Fair play for the other side"],
  [
    19,
    "BF1031 .Z4",
    "Spiritualism and animal magnetism : a treatise on dreams, second sight, somnambulism, magnetic sleep, spiritual manifestations, hallucinations, and spectral visions / by G.G. Zerffi.",
  ],
  [
    20,
    "BF1291 .W8 1882",
    "The philosophy of creation : unfolding the laws of the progressive development of nature and embracing the philosophy of man, spirit, and the spirit world / by Thomas Paine ; through the hand of Horace G. Wood, medium.",
  ],
  [
    21,
    "BF1301 .T885",
    "Interviews with spirits : Joan of Arc, Napoleon Bonaparte, Ignatius Loyola, Prince Leopold, Queen Elizabeth, Hannah More, Margaret Fuller Ossoli, … Lord Balmerino : Mr. Bowles reports his own progress in spirit-life / by Samuel Bowles, late editor of the Springfield (Mass.) Republican ; Carrie E.S. Twing, medium.",
  ],
  [
    22,
    "PS3507.E23 R4 1913",
    "Return of Frank R. Stockton : ... stories and letters which cannot fail to convince the reader that Frank R. Stockton still lives and writes through the instrumentality of Miss Etta de Camp.",
  ],
  [
    23,
    "BF1042 .M13",
    "Is spiritualism based on fraud? : the evidence given by Sir A.C. Doyle and others drastically examined / by Joseph McCabe.",
  ],
  [
    24,
    "GV1547 .A25",
    "Tricks that anyone can do : ingenious ways in which an amateur, without expensive apparatus or a knowledge of “sleights” can entertain and amuse / by Morley Adams.",
  ],
  [
    25,
    "BF1311.P3 R33",
    "Spirit life of Theodore Parker, through the inspiration of Sarah A. Ramsdell.",
  ],
];

const NOTES: string[] = [
  "Another attempt by my tragically misled friend to show evidence and convince me that spiritualism is real. PRAY-NOW, I did take careful notes of my thoughts in the pages, and signed the copy of course.",
  "Another message. PLEASE, who even is Meslom?",
  "Another supposed WWI narrative from beyond- and this time with things to SAY from that infamous Lodge.",
  "As a master of illusions I can attest, the evidence for Spiritualism here is but a mere hallucination itself. PRAY-TELL, I’ll seek elsewhere for a more credible and rational read on the topic that won’t put you into a magnetic sleep as well.",
  "As a renowned skeptic, I QUICKLY found myself bored and unimpressed by the supposed ’spiritual’ ramblings of Mr. Parker in this book. The only thing it inspired in me was a desire to escape its dull pages.",
  "I can QUICKLY see through the so-called discourse delivered by the spirit and Mrs. Richmond. Nothing more than a sham, this day or the one after.",
  "I was enthralled by this insightful book. His exposé describes the dangers of blind faith both modern and ancient. Delusion is indeed the ANSWER-BE QUICK all you frauds and hide from the reverend’s wise words.",
  "“It isn’t” is the ANSWER-PRAY, this title is marred by mis-statements which even the humblest of magicians could refute.",
  "Lady? Tiger? Neither? Don’t waste your time on this farce, as I SAY no to this deceitful attempt at resurrecting a great writer.",
  "No real interest in “fair play”. The author will SAY try their parlor tricks, and for a price.",
  "Not only does it provide pragmatic examples in math, but it also cleverly incorporates the accompanying bicycle deck. PRAY-ANSWER, what could make it a more engaging way for young minds to improve their computational skills?",
  "Not sure how I feel about Fletcherising. PRAY-ANSWER, would this remedy improve longevity, wouldn’t we be hearing about it from someone older than young Horace?",
  "NOW, I have read some far-fetched philosophy in my time, but this book takes the cake. These ramblings about the progressive development of nature are nothing but a jumbled mess, and a disgrace to the “author”.",
  "On magic for the broadest audience of pre-professionals with many hands-on examples. SAY, why can’t we have more like these.",
  "Potter discovers and uncovers the deceitful practices of spiritualism. PRAY-LOOK here for the facts explained.",
  "Such a practical guide to start any magician’s curriculum without the need of complex and pricey items that the professionals may use. I can TELL this title will be one to recommend.",
  "The English review calls this “A most pleasing and excellent little work. Its especial value consists in the numerous epitaphs in the verse which it supplies.” TELL me magician doesn’t fall under sundry world callings when committing me to the churchyard.",
  "The one thing I had hoped this book would TELL me was why a native woman is writing Christmas poems from the beyond. It did not. Maybe they learned to commune from Mrs. Doyle.",
  "The supposed letters from a husband beyond the grave on earth lacked any substance. They TELL a tale untrue, but were more importantly quite dull.",
  "This is one philosophy that I don’t care to delve into NOW or in the future. As someone who has applied and witnessed the application of science to these proceedings, I can attest that the mere idea of a scientific séance is absurd.",
  "This prince and his medium has QUICKLY tried my nerves. I’m not sure which are more farcical, the stories from his life or the stories after. This reads as pure fabrication from cover to cover.",
  "This so-called “experimental” work demonstrates no real proof of the existence of spirits, or planes of the afterlife. One might as well PRAY-LOOK to the heavens, and hope for a sign. Using flimsy “scriptural” evidence and misguided beliefs, these musings on Christian deity and locals are nothing but.",
  "To think a late editor had the time to meet all of these spirits. If I were to PRAY to talk to one each night, it might take me over two months. Additionally, I’d hope Faraday would have better things to do.",
  "Upon reading this supposed discourse, I was sorely disappointed. BE QUICK to avoid this textual disaster, for it is nothing more than a collection of ramblings and nonsensical ruminations from the supposed world of spirits.",
  "What a disappointment this book was. Filled with unsubstantiated claims and pseudo-scientific theories, this book serves as a mere charlatan’s attempt at profiting from people’s fears and hopes for life after death with no true ANSWER-BE QUICK, I told myself and only skim this book lest I waste my own future.",
];

const HOUDINI_CODE: [string, string, string][][] = [
  [
    ["1", "A", "PRAY"],
    ["2", "B", "ANSWER"],
    ["3", "C", "SAY"],
    ["4", "D", "NOW"],
    ["5", "E", "TELL"],
    ["6", "F", "PLEASE"],
    ["7", "G", "SPEAK"],
    ["8", "H", "QUICKLY"],
    ["9", "I", "LOOK"],
    ["10/0", "J", "BE QUICK"],
  ],
  [
    ["11", "K", "PRAY-PRAY"],
    ["12", "L", "PRAY-ANSWER"],
    ["13", "M", "PRAY-SAY"],
    ["14", "N", "PRAY-NOW"],
    ["15", "O", "PRAY-TELL"],
    ["16", "P", "PRAY-PLEASE"],
    ["17", "Q", "PRAY-SPEAK"],
    ["18", "R", "PRAY-QUICKLY"],
    ["19", "S", "PRAY-LOOK"],
    ["20", "T", "ANSWER-BE QUICK"],
  ],
  [
    ["21", "U", "ANSWER-PRAY"],
    ["22", "V", "ANSWER-ANSWER"],
    ["23", "W", "ANSWER-SAY"],
    ["24", "X", "ANSWER-NOW"],
    ["25", "Y", "ANSWER-TELL"],
    ["26", "Z", "ANSWER-PLEASE"],
  ],
];

const EXTRACTION_TABLE: [string, string, string, string][] = [
  ["BE QUICK", "J", "Olin, Stephen, 1797-1851 (Spirit)", "Yes"],
  ["PRAY-LOOK", "S", "Hare, Robert, 1781-1858.", "No"],
  ["SAY", "C", "Bamber, Claude H. Kelway, 1895-1915 (Spirit)", "Yes"],
  ["TELL", "E", "Ouina (Spirit)", "Yes"],
  ["QUICKLY", "H", "Sargent, Epes, 1813-1880 (Spirit)", "Yes"],
  ["SAY", "C", "Desmond, Frank.", "No"],
  ["QUICKLY", "H", "Hafed, Prince of Persia (Spirit)", "Yes"],
  ["ANSWER-PRAY", "U", "Bertram, Charles, 1853-1907.", "No"],
  ["NOW", "D", "Ingersoll, Robert Green, 1833-1899 (Spirit)", "Yes"],
  ["PRAY-ANSWER", "L", "Halliday, Thomas.", "No"],
  ["PRAY-ANSWER", "L", "Fletcher, Horace, 1849-1919.", "No"],
  ["TELL", "E", "Miller, John, 1787-1858.", "No"],
  ["ANSWER-BE QUICK", "T", "Craft, Amos Norton, -1912.", "No"],
  ["TELL", "E", "Helsop, John (Spirit)", "Yes"],
  ["ANSWER-BE QUICK", "T", "Shaw, Fred. G. (Frederick George)", "No"],
  ["PLEASE", "F", "Meslom (Spirit)", "Yes"],
  ["PRAY-LOOK", "S", "Potter, Wm. Bailey (William Bailey)", "No"],
  ["SAY", "C", "Haynes, W. Bickle (William Bickle)", "No"],
  ["PRAY-TELL", "O", "Zerffi, G. G. (Gustavus George), 1820-1892.", "No"],
  ["NOW", "D", "Paine, Thomas, 1737-1809 (Spirit).", "Yes"],
  ["PRAY", "A", "Bowles, Samuel, 1826-1878 (Spirit)", "Yes"],
  ["SAY", "C", "Stockton, Frank Richard, 1834-1902 (Spirit)", "Yes"],
  ["PRAY-NOW", "N", "McCabe, Joseph, 1867-1955.", "No"],
  ["TELL", "E", "Adams, Morley.", "No"],
  ["QUICKLY", "H", "Parker, Theodore, 1810-1860 (Spirit)", "Yes"],
];

const StyledTable = styled.table`
  margin: 1em 0;
  border-collapse: collapse;
  th,
  td {
    padding: 0px 8px;
  }
  tr:nth-child(odd) {
    background-color: #bba5a3;
    td {
      border: 1px solid #bba5a3;
    }
  }
  tr:nth-child(even) {
    background-color: #e0d6d5;
    td {
      border: 1px solid #e0d6d5;
    }
  }
  tr:nth-child(1) {
    background-color: #967470;
    th {
      border: 1px solid #967470;
    }
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: flex-start;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        First, the solver must identify that each of the ouija boards gif spells
        out a unique library call number. Libraries use slightly different call
        numbers based on their collection, so the solver must also discover that
        these are all from the Harry Houdini Special Collection at the Library
        of Congress. Searching for all of the call numbers should give the
        solver a list of information about each book (main titles, authors,
        dates, etc.).
      </p>
      <StyledTable>
        <tr>
          <th>Ouija order</th>
          <th>Call Number</th>
          <th>Main Title</th>
        </tr>
        {CALL_NUMBERS.map(([order, call, title], i) => (
          <tr key={`call-${i}`}>
            <td>{order}</td>
            <td>{call}</td>
            <td>{title}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        Reading the first letter of each of these titles as they would be
        printed in a card catalog (using a title sort, which ignores articles
        like a, an, the, etc.), is the clue phrase{" "}
        <Mono>DECODE HIS NOTES OMIT SPIRITS</Mono>.
      </p>
      <p>
        Next, each title identified can be matched with a card catalog card
        using the text of the “Donor’s Notes” on the back of the card.{" "}
      </p>
      <StyledTable>
        <tr>
          <th>Note order</th>
          <th>Matched Donor’s Notes</th>
        </tr>
        {NOTES.map((note, i) => (
          <tr key={`note-${i}`}>
            <td>{i}</td>
            <td>{note}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        If they haven’t already figured this out above, the “donor” is Houdini.
        Houdini as a skeptic and medium-buster knew that after his demise there
        would be people claiming they had communicated with him from beyond the
        grave. While living, Houdini allegedly developed a secret code with his
        wife so that she would be able to verify if the medium was actually
        communicating with Houdini’s spirit, or if the medium was lying. The
        code translates specific words into numbers, which can then be
        translated into letters in combination. This code was also printed in a
        1928 biography of Houdini called “Houdini His Life-Story”.
      </p>
      <FlexWrapper>
        {HOUDINI_CODE.map((table, i) => (
          <StyledTable key={`houdini-table-${i}`}>
            <tr>
              <th>Number</th>
              <th>Letter</th>
              <th>Codeword</th>
            </tr>
            {table.map(([num, letter, codeword], i) => (
              <tr key={`houdini-${i}`}>
                <td>{num}</td>
                <td>{letter}</td>
                <td>{codeword}</td>
              </tr>
            ))}
          </StyledTable>
        ))}
      </FlexWrapper>
      <p>
        Each card has a single word or phrase from this code. Decoding the notes
        will result in a string of letters that do not read as a word or phrase.
      </p>
      <p>
        Finally, the solver needs to <Mono>OMIT SPIRITS</Mono>. Going back to
        the title information, the solver next needs to examine the title’s
        authors. According to the Anglo-American Cataloging Rules 2nd edition
        (AACR2), there are rules for how to attribute authorship for books
        dictated by mediums by spirits. The spirit is considered responsible for
        the creation of intellectual or artistic content, and is therefore
        listed as in the main entry (100 field) as an author with (Spirit)
        appended to the personal name. The medium is listed as a contributor (in
        700). The solver should be able to look at the authors listed and
        identify which books have a spirit author listed, and remove those from
        the code letters.
      </p>
      <StyledTable>
        <tr>
          <th>Code</th>
          <th>Letters</th>
          <th>Personal name</th>
          <th>Spirit?</th>
        </tr>
        {EXTRACTION_TABLE.map(([code, letter, name, spirit], i) => (
          <tr key={`extraction-${i}`}>
            <td>{code}</td>
            <td>
              {spirit === "Yes" ? <s>{letter}</s> : <strong>{letter}</strong>}
            </td>
            <td>{name}</td>
            <td>{spirit}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        The solver should be left with{" "}
        <PuzzleAnswer>SCULLETTS CONE</PuzzleAnswer>, the final answer.
      </p>
    </>
  );
};

export default Solution;
