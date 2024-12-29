import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const SolutionTable = styled.table`
  border-collapse: collapse;
  margin: 1rem 0;

  th,
  td {
    padding: 0.5rem;
    border: 1px solid var(--true-black);
  }
`;

const ICSMessages: [string, string, string][] = [
  [
    "Ask them what the rise and fall of the tide is…",
    "What is the rise and fall of the tide?",
    "PW",
  ],
  [
    "and ask what our magnetic bearing is from them.",
    "What is my magnetic bearing from you?",
    "CA",
  ],
  [
    "And let them know that if they have injured people, they could send them to us.",
    "You should send sick/injured persons to me",
    "AT",
  ],
  [
    "Maybe they’ve heard of another vessel in distress. Ask them if they have.",
    "Have you sighted or heard of a vessel in distress?",
    "EA",
  ],
  ["we require a collision mat", "I urgently require a collision mat.", "KA"],
  [
    "we’re carrying dangerous cargo",
    "I am taking in, or discharging, or carrying dangerous goods",
    "SW (note, this can also be signaled with Bravo, but all other messages are two-flag messages!)",
  ],
  [
    "Let them know they shouldn’t abandon ship",
    "You should not abandon vessel",
    "AH",
  ],
  ["…and that our engines are stopped", "My engines are stopped", "RM"],
  ["let them know we can send a boat over", "I can send a boat", "DL"],
  ["Cancel the SOS.", "SOS canceled.", "EF"],
  ["Ask who’s calling us", "Who is calling me?", "YM"],
  ["Say we’re on fire", "I am on fire", "IT"],
  [
    "tell them to maintain their current course",
    "Maintain present course",
    "PI",
  ],
  ["let them know that we have a doctor", "I have a doctor on board", "AL"],
  [
    "Let them know there’s sufficient depth of water.",
    "There is sufficient depth of water",
    "NL",
  ],
  [
    "let them know it’s not safe to fire any rockets right now.",
    "It is not safe to fire a rocket",
    "GU",
  ],
  [
    "Let them know they should try to land the boats where the light is showing, over there.",
    "Boat should endeavour to land where flag is waved or light is shown",
    "DC",
  ],
  ["Ask them where they’re bound for", "Where are you bound for?", "UT"],
  ["Let them know that our anchor is foul.", "My anchor is foul", "RA"],
  ["Repeat our last message.", "My anchor is foul", "RA"],
  [
    "repeat that earlier message about sending over their injured",
    "You should send sick/injured persons to me",
    "AT",
  ],
  [
    "Let them know a helicopter is coming to them",
    "Helicopter is coming to you now.",
    "BT",
  ],
  [
    "we’re not in our correct position to be used by a lightvessel",
    "I am not in my correct position to be used by a lightvessel",
    "LO",
  ],
  [
    "let them know that their distress signals are understood",
    "Your distress signals are understood",
    "ED",
  ],
];

const MarryatMessages: [string, string, string][] = [
  ["TSJBH", "1253", "CATSPAW"],
  ["THSB", "315", "APEAK"],
  ["TLBSR", "9517", "WAS"],
  ["TB-4-LS", "5491", "MARCH"],
  ["TBSHR", "5137", "LED"],
  ["THJLS", "3291", "FEW"],
  ["TJBH", "253", "AMITY"],
  ["THBJ", "352", "APRIL"],
  ["TBH-8-S", "5381", "LUNGS"],
  ["TJRSB", "2715", "DUTCH"],
  ["TSRH", "173", "AIR"],
  ["THSJ", "312", "APART"],
  ["TRJB", "725", "BOLDEST"],
];

const ExtractionMessages: [string, string, string][] = [
  ["CATSPAW", "AACPTW", "S"],
  ["APEAK", "AAEK", "P"],
  ["WAS", "SW", "A"],
  ["MARCH", "AHMR", "C"],
  ["LED", "LD", "E"],
  ["FEW", "EF", "W"],
  ["AMITY", "IMTY", "A"],
  ["APRIL", "ALPI", "R"],
  ["LUNGS", "GLNU", "S"],
  ["DUTCH", "CDTU", "H"],
  ["AIR", "AR", "I"],
  ["APART", "AART", "P"],
  ["BOLDEST", "BDELOT", "S"],
];

const Solution = () => {
  return (
    <>
      <p>
        This puzzle presents a conversation between a ship’s captain and another
        member of the crew (the signal interpreter), with the signaler’s
        dialogue on the left and the captain’s on the right. The signaler relays
        messages from a mysterious other vessel, and the captain tells the
        signaler what to signal in response.
      </p>

      <p>
        The other vessel is sharing strange 4 or 5 letter messages that all
        start with T. The captain is responding with short phrases.
      </p>

      <p>
        Various hints point at the method of communication being used. The
        communications are happening between ships at sea. There are references
        to a flag and a pennant. The title, Zulu Lima, is words from the NATO
        phonetic alphabet, which may also be represented as maritime signaling
        flags. We find that both ships are using maritime signal flags to
        communicate.
      </p>

      <p>
        The captain is giving short phrases to the signaler to string up.
        Searching for these phrases and how they might be represented as flags
        yields the{" "}
        <a href="https://msi.nga.mil/api/publications/download?key=16694273/SFH00000/Pub102bk.pdf&type=view">
          ICS (International Code of Signals) standard
        </a>
        . While one flag may represent a letter such as Alpha or Bravo, two
        flags together represents a short phrase. For example, flying ZL (Zulu
        Lima) together translates to “Your signal has been received but not
        understood”!
      </p>

      <p>
        By using the ICS standards, for every message the captain says to send,
        we can extract a pair of letters:
      </p>

      <HScrollTableWrapper>
        <SolutionTable>
          <thead>
            <tr>
              <th>Captain’s phrase</th>
              <th>ICS phrase</th>
              <th>Letters</th>
            </tr>
          </thead>
          <tbody>
            {ICSMessages.map(([captain, ics, letters], i) => (
              <tr key={i}>
                <td>{captain}</td>
                <td>{ics}</td>
                <td>{letters}</td>
              </tr>
            ))}
          </tbody>
        </SolutionTable>
      </HScrollTableWrapper>

      <p>
        The other ship’s messages, however, are not interpretable by using ICS.
        With the reference to it being an old boat from the 1840’s, and the fact
        that they seem to be using some flags that the signaler recognizes but
        some flags they don’t, we find an earlier maritime standard:{" "}
        <a href="https://books.google.com/books?id=LtsDAAAAQAAJ&q=Marryat+flags+%22code+of++signals%22&pg=PT11#v=onepage&q&f=false">
          Marryat’s standard
        </a>
        , in use in the early 1800’s. It used a similar set of flags to indicate
        numerals. The signaler is wrong about those flags indicating letters,
        but we can figure out what they’ve seen from what they say. NATO/ICS’s
        Tango flag is exactly the same as Marryat’s TE flag, a flag which
        indicates the message should be read off of Part VI: Words. The 1, 2, 3,
        5 and 7 flags also have perfect analogues in NATO/ICS. There are also a
        few flags the signaler doesn’t quite recognize. They interpret Marryat’s
        9 flag as a sideways L, and mistakenly translate it as L in several
        signals. There is also the blue pennant with a cross (Marryat’s 4), and
        the blue with gold square (Marryat’s 8).
      </p>

      <p>
        Each of the sets of numbers, when looked up in the Marryat codebook,
        yields one word.
      </p>

      <HScrollTableWrapper>
        <SolutionTable>
          <thead>
            <tr>
              <th>Signaler’s Interpretation</th>
              <th>Numbers</th>
              <th>Marryat Word</th>
            </tr>
          </thead>
          <tbody>
            {MarryatMessages.map(([message, numbers, word], i) => (
              <tr key={i}>
                <td>{message}</td>
                <td>{numbers}</td>
                <td>{word}</td>
              </tr>
            ))}
          </tbody>
        </SolutionTable>
      </HScrollTableWrapper>

      <p>
        Finally, the conversation is structured so that the captain is
        responding to each of the words with one, two or three phrases. When the
        words and the captain’s response are paired, we find that the
        collections of letters overlap, except for a single letter from the
        strange vessel’s word.
      </p>

      <HScrollTableWrapper>
        <SolutionTable>
          <thead>
            <tr>
              <th>Strange Vessel’s Word</th>
              <th>Captain’s Letters</th>
              <th>Extra Letter</th>
            </tr>
          </thead>
          <tbody>
            {ExtractionMessages.map(([word, response, extraction], i) => (
              <tr key={i}>
                <td>{word}</td>
                <td>{response}</td>
                <td>
                  <Mono>{extraction}</Mono>
                </td>
              </tr>
            ))}
          </tbody>
        </SolutionTable>
      </HScrollTableWrapper>

      <p>
        And when we read each letter in order, we get the answer to the puzzle,{" "}
        <PuzzleAnswer>SPACE WARSHIPS</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
