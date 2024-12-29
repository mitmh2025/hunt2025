import React from "react";
import { styled } from "styled-components";
import {
  HScrollTableWrapper,
  Mono,
  PuzzleAnswer,
} from "../../components/StyledUI";

const SUSPECTS_DATA = [
  {
    law: "Asimov’s Laws of Robotics",
    suspect: "ASIMOV",
    index: "1",
    letters: "A",
    time: "14:06",
  },
  {
    law: "Dulong-Petit Law",
    suspect: "DULONG–PETIT",
    index: "1,2,3,8",
    letters: "DULE",
    time: "14:40",
  },
  {
    law: "Farey Sequence",
    suspect: "FAREY",
    index: "1",
    letters: "F",
    time: "10:22",
  },
  {
    law: "Fermi’s Golden Rule",
    suspect: "FERMI",
    index: "1",
    letters: "F",
    time: "13:28",
  },
  {
    law: "Hooke’s Law",
    suspect: "HOOKE",
    index: "5",
    letters: "E",
    time: "13:03",
  },
  {
    law: "Ising Model",
    suspect: "ISING",
    index: "4",
    letters: "N",
    time: "11:30",
  },
  {
    law: "Killing Form",
    suspect: "KILLING",
    index: "6",
    letters: "N",
    time: "9:01",
  },
  {
    law: "Kirchhoff’s Circuit Laws",
    suspect: "KIRCHHOFF",
    index: "5",
    letters: "H",
    time: "12:52",
  },
  {
    law: "L’Hopital’s Rule",
    suspect: "L’HOPITAL",
    index: "4",
    letters: "O",
    time: "9:31",
  },
  {
    law: "Lorentz Force",
    suspect: "LORENTZ",
    index: "5",
    letters: "N",
    time: "16:27",
  },
  {
    law: "Meadow’s Law",
    suspect: "MEADOW",
    index: "5",
    letters: "O",
    time: "15:21",
  },
  {
    law: "Mendel’s Laws",
    suspect: "MENDEL",
    index: "4",
    letters: "D",
    time: "12:15",
  },
  {
    law: "Murray’s Law",
    suspect: "MURRAY",
    index: "2",
    letters: "U",
    time: "14:28",
  },
  {
    law: "Nash Equilibrium",
    suspect: "NASH",
    index: "3",
    letters: "S",
    time: "16:58",
  },
  {
    law: "Navier-Stokes Equation",
    suspect: "NAVIER–STOKES",
    index: "1,8,11",
    letters: "NTE",
    time: "15:05",
  },
  {
    law: "Nernst Equation",
    suspect: "NERNST",
    index: "6",
    letters: "T",
    time: "12:49",
  },
  {
    law: "Noether’s Theorem",
    suspect: "NOETHER",
    index: "7",
    letters: "R",
    time: "14:05",
  },
  {
    law: "Nyquist-Shannon Sampling Theorem",
    suspect: "NYQUIST–SHANNON",
    index: "5",
    letters: "I",
    time: "10:47",
  },
  {
    law: "Pell Equation",
    suspect: "PELL",
    index: "1",
    letters: "P",
    time: "15:07",
  },
  {
    law: "Tsiolkovsky’s Rocket Equation",
    suspect: "TSIOLKOVSKY",
    index: "11",
    letters: "Y",
    time: "16:33",
  },
  {
    law: "Von Neumann Architecture",
    suspect: "VONNEUMANN",
    index: "7",
    letters: "M",
    time: "16:56",
  },
  {
    law: "Wien’s Displacement Law",
    suspect: "WIEN",
    index: "1",
    letters: "W",
    time: "9:44",
  },
];

const VICTIMS_DATA = [
  {
    eponym: "Brayton",
    victim: "BARBER",
    index: "2",
    letters: "A",
    time: "15:11",
  },
  {
    eponym: "L’Hopital",
    victim: "BERNOULLI",
    index: "1,2,3",
    letters: "BER",
    time: "9:31",
  },
  {
    eponym: "Pell",
    victim: "BROUNCKER",
    index: "5",
    letters: "N",
    time: "15:07",
  },
  {
    eponym: "Killing",
    victim: "CARTAN",
    index: "6",
    letters: "N",
    time: "9:01",
  },
  {
    eponym: "Gresham",
    victim: "COPERNICUS",
    index: "9,10",
    letters: "US",
    time: "16:40",
  },
  {
    eponym: "Gauss",
    victim: "DEMOIVRE",
    index: "3",
    letters: "ME",
    time: "15:18",
  },
  {
    eponym: "Meadow",
    victim: "DIMAIO",
    index: "1",
    letters: "D",
    time: "15:21",
  },
  { eponym: "Fermi", victim: "DIRAC", index: "4", letters: "A", time: "13:28" },
  {
    eponym: "VonNeumann",
    victim: "ECKERT–MAUCHLY",
    index: "4",
    letters: "E",
    time: "16:56",
  },
  { eponym: "Zipf", victim: "ESTOUP", index: "5", letters: "U", time: "9:07" },
  { eponym: "Farey", victim: "HAROS", index: "2", letters: "A", time: "10:22" },
  {
    eponym: "Maxwell",
    victim: "HEAVISIDE",
    index: "1,3,4",
    letters: "HAV",
    time: "11:12",
  },
  {
    eponym: "Bessemer",
    victim: "KELLY",
    index: "2",
    letters: "E",
    time: "10:52",
  },
  {
    eponym: "Betz",
    victim: "LANCHESTER",
    index: "4,5,9",
    letters: "CHE",
    time: "10:19",
  },
  {
    eponym: "Hubble",
    victim: "LEMAÎTRE",
    index: "3",
    letters: "M",
    time: "9:23",
  },
  { eponym: "Ising", victim: "LENZ", index: "2", letters: "E", time: "11:30" },
  {
    eponym: "Tsiolkovsky",
    victim: "MOORE",
    index: "3",
    letters: "O",
    time: "16:33",
  },
  {
    eponym: "Black–Scholes",
    victim: "SAMUELSON–MERTON",
    index: "2,6",
    letters: "AL",
    time: "15:37",
  },
  {
    eponym: "Liebig",
    victim: "SPRENGEL",
    index: "1",
    letters: "S",
    time: "15:43",
  },
  {
    eponym: "Reynolds",
    victim: "STOKES",
    index: "6",
    letters: "S",
    time: "11:02",
  },
  {
    eponym: "Bechdel",
    victim: "WALLACE",
    index: "3,5",
    letters: "LA",
    time: "15:24",
  },
  {
    eponym: "Playfair",
    victim: "WHEATSTONE",
    index: "1,5,8",
    letters: "WTO",
    time: "15:31",
  },
  {
    eponym: "Nyquist-Shannon",
    victim: "WHITTAKER",
    index: "4",
    letters: "T",
    time: "10:47",
  },
  {
    eponym: "BradleyTerry",
    victim: "ZERMELO",
    index: "3",
    letters: "R",
    time: "10:58",
  },
];

const EXTRACTION_DATA = [
  {
    law: "Killing Form",
    victim: "CARTAN",
    index: "1",
    letters: "C",
    time: "9:01",
  },
  {
    law: "L’Hopital’s Rule",
    victim: "BERNOULLI",
    index: "5",
    letters: "O",
    time: "9:31",
  },
  {
    law: "Farey Sequence",
    victim: "HAROS",
    index: "4",
    letters: "O",
    time: "10:22",
  },
  {
    law: "Nyquist–Shannon Sampling Theorem",
    victim: "WHITTAKER",
    index: "7",
    letters: "K",
    time: "10:47",
  },
  {
    law: "Ising Model",
    victim: "LENZ",
    index: "2",
    letters: "E",
    time: "11:30",
  },
  {
    law: "Fermi’s Golden Rule",
    victim: "DIRAC",
    index: "1",
    letters: "D",
    time: "13:28",
  },
  {
    law: "Pell Equation",
    victim: "BROUNCKER",
    index: "1",
    letters: "B",
    time: "15:07",
  },
  {
    law: "Meadow's Law",
    victim: "DI MAIO",
    index: "6",
    letters: "O",
    time: "15:21",
  },
  {
    law: "Tsiolkovsky’s Rocket Equation",
    victim: "MOORE",
    index: "2",
    letters: "O",
    time: "16:33",
  },
  {
    law: "Von Neumann Architecture",
    victim: "ECKERT–MAUCHLY",
    index: "3",
    letters: "K",
    time: "16:56",
  },
];

const StyledTable = styled.table`
  margin: 1em 0;
  th,
  td {
    padding: 0 8px;
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with a stack of 58 receipts, which is a situation
        that a forensic accountant would likely find quite familiar. The
        puzzle’s online content is flavor text that tells solvers: “To solve the
        case, narrow down to only the fraudulent receipts”, a list of blanks for
        SUSPECTS and VICTIMS, and a Venn diagram with a series of numbers at its
        intersection.
      </p>
      <p>
        For most solvers the first step in the puzzle will be recognizing that
        each of the receipts contain words that directly clue an eponymous law
        or scientific concept. As solvers identify these eponyms however, they
        will be confronted with an issue that limits further progress. There are
        a total of 58 eponyms clued but only 22 entries in the list of suspects
        and 24 entries in the list of victims. The flavor text suggests that
        solvers “narrow down to only the fraudulent receipts”, and the intended
        path for doing that is for solvers to realize that the puzzle is playing
        with the way that “fraud” might be interpreted in this context. The two
        kinds of fraud in this puzzle are first “fraudulent” numbers on some
        receipts, and second “fraudulent” eponyms.
      </p>
      <p>
        If solvers first notice that the “Eponymous Forensic Accountant” in the
        puzzle title refers to the most famous eponymous law in forensic
        accounting: Benford’s Law, then they will be able to detect the number
        fraud. Benford’s law is a tool used by accountants that describes how
        the leading digits in real-life numerical data are skewed towards lower
        integers, while random numbers generated by people have a much more
        uniform distribution of first digits. Specifically, real data has a
        first digit of 1 around 30% of the time but 9 only 5% of the time, with
        the chance declining monotonically between those extremes.
      </p>
      <p>
        Each receipt either has prices that follow Benford’s law and are much
        more likely to start with a 1 or a 2 than an 8 or a 9, or has prices
        that follow a more uniform distribution with about the same number of
        8’s and 9’s as other numbers. The “fraudulent” receipts according to
        Benford are the ones whose prices have too many large numbers as their
        leading digits, and the eponyms from those receipts are the suspects in
        the puzzle. While all of the prices were generated randomly, the puzzle
        was constructed to emphasize these differences so that solvers could
        identify the two groups at a glance once they know what they are looking
        for. With relatively few items on each receipt, some random draws from a
        valid Benford’s distribution could look relatively uniform. The task of
        identifying the number fraud is aided by the fact that the number of
        suspects in the list equals the number of “fraudulent receipts” using
        this definition.
      </p>
      <p>
        The last names of the discoverer(s) of each eponymous law on these 22
        “fraudulent” receipts fit into the SUSPECTS blanks in alphabetical
        order. Upon extracting the circled letters, the following is obtained:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Full law name</th>
            <th>Suspect</th>
            <th>Index</th>
            <th>Letters</th>
            <th>Time</th>
          </tr>
          {SUSPECTS_DATA.map(({ law, suspect, index, letters, time }, i) => (
            <tr key={`suspect-${i}`}>
              <td>{law}</td>
              <td>{suspect}</td>
              <td>{index}</td>
              <td>{letters}</td>
              <td>{time}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        The correct ordering for these letters is given by the time on each
        receipt. The date on the receipts is the 10th of November, which is
        quite thematically appropriate as both World Science Day and
        International Accounting Day. The correct ordering spells out the clue
        phrase <Mono>NOW FIND THE FRAUDULENT EPONYMS</Mono>, which directs
        solvers to the other kind of fraud in the puzzle.
      </p>
      <p>
        The fraudulent eponyms being referred to here are only “fraudulent” in
        that they are examples of Stigler’s Law of Eponymy, which notes how many
        eponymous laws (including Benford’s) are not named after their original
        discoverers. Of course, for some solvers this may actually have been
        their first insight into the fraud in the puzzle, given that the
        original discoverers could easily be thought of as VICTIMS in this
        context. No matter whether solvers see this eponym fraud first or only
        see it after the number fraud, they will still be able to identify 24
        examples of Stigler’s law from the 58 receipts, and the names of the
        original discoverers of each of these laws will fit into the blanks on
        the VICTIMS list in alphabetical order, as shown here.
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Stigler’s Eponym</th>
            <th>Victim</th>
            <th>Index</th>
            <th>Letters</th>
            <th>Time</th>
          </tr>
          {VICTIMS_DATA.map(({ eponym, victim, index, letters, time }, i) => (
            <tr key={`victims-${i}`}>
              <td>{eponym}</td>
              <td>{victim}</td>
              <td>{index}</td>
              <td>{letters}</td>
              <td>{time}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        These extracted letters should also be ordered by the time on the
        receipts, which will spell the clue phrase{" "}
        <Mono>NUMBER CHEATERS HAVE A NAMED LAW TO ALSO USE</Mono>. If solvers
        identified Stigler’s law first this phrase will point them to Benford’s
        law and let them complete that identification. If solvers already know
        about that identification then the phrase merely confirms that the
        process of looking for the names of victims and then ordering by the
        time on the receipts is the correct way of detecting the fraudulent
        eponyms in this puzzle. The details of who discovered what aspects of
        these eponymous concepts are often messy and contested. We chose to
        identify the victim as the first westerner to propose something
        substantially the same as the named law or concept, but judgment calls
        still needed to be made in some cases.
      </p>
      <p>
        Solvers should now notice that the (eponymous) Venn diagram at the
        bottom of the puzzle is indicating that the final step lies at the
        intersection of their work so far and combines both definitions of
        “fraud” to narrow down to only the final set of fraudulent receipts. The
        intersection of the set of receipts that are examples of Stigler’s law
        and the set of receipts with numbers that are fraudulent according to
        Benford’s law contains 10 receipts, which matches the length of the set
        of numbers in the intersection of the diagram. When those ten receipts
        are ordered by their times and the numbers are used to index into the
        names of the victims the following extraction occurs:
      </p>
      <HScrollTableWrapper>
        <StyledTable>
          <tr>
            <th>Eponymous Law</th>
            <th>Victim</th>
            <th>Index</th>
            <th>Letter</th>
            <th>Time</th>
          </tr>
          {EXTRACTION_DATA.map(({ law, victim, index, letters, time }, i) => (
            <tr key={`extraction-${i}`}>
              <td>{law}</td>
              <td>{victim}</td>
              <td>{index}</td>
              <td>{letters}</td>
              <td>{time}</td>
            </tr>
          ))}
        </StyledTable>
      </HScrollTableWrapper>
      <p>
        These letters spell out the answer:{" "}
        <PuzzleAnswer>COOKED BOOK</PuzzleAnswer>. While it is also possible to
        use these numbers to extract from the suspects rather than the victims,
        that extraction does not spell anything reasonable when the letters are
        ordered by the time on the receipts (KIETSFPWSN).
      </p>
    </>
  );
};

export default Solution;
