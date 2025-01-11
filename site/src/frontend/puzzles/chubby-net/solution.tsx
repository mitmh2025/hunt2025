import React from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";

// prettier-ignore
const tableInfo: string[][] = [["Clue", "Ticker", "Name", "Cumulative Split Multiple (Individual Split Multiples and Split Dates)", "Current Price", "Original Price", "Index Letter"],
    ["Jeer precedes the end of stadium fireworks reverberation (BOO, M)", "BOOM", "DMCGLOBAL", "0.4 (2:1 10/13/05, 1:5 8/27/90)", "$2.00", "$5.00", "L"],
    ["Young man following golf is happy (LAD + G)", "GLAD", "GLADSTONECAPITAL", "0.5 (1:2 4/25/24)", "$1.50", "$3.00", "A"],
    ["Even result is twice odd (odd numbers of twice)", "TIE", "TITANIUMMETALS", "4 (1:10 2/18/03, 5:1 8/27/04, 2:1, 9/7/05, 2:1 2/17/06, 2:1, 5/16/06)", "$28.00", "$7.00", "U"],
    ["Use prime lichen to frost cake (prime numbers 2,3 5 of lichen)", "ICE", "INTERCONTINENTALEXCHANGE", "5 (5:1 11/4/16)", "$10.00", "$2.00", "N"],
    ["Golf club is strangely noir (NOIR anagram)", "IRON", "DISCMEDICINE", "0.03333 (1:30 12/30/22)", "$0.30", "$9.00", "C"],
    ["Backwards religious figure is a contemptible man (GOD reversed)", "DOG", "PROSHARESSHORT", "0.25 (1:4 5/24/18)", "$1.25", "$5.00", "H"],
    ["Smuggled rugs contained narcotic", "DRUG", "BRIGHTMINDSBIOSCIENCES", "0.2 (1:5 7/14/23)", "$2.00", "$10.00", "D"],
    ["Rotate and spin runt (runt anagram)", "TURN", "180DEGREECAPITALCORP", "0.33333 (1:3 1/4/21)", "$5.00", "$15.00", "A"],
    ["Decorate ship platform (Double definition)", "DECK", "DECKERSOUTDOOR", "18 (3:1 7/6/10, 6:1 9/17/24)", "$108.00", "$6.00", "R"],
    ["Outside of inlet is the thing (First/Last inlet letters)", "IT", "GARTNER", "8 (2:1 8/29/94, 2:1 6/29/95, 2:1 4/1/96)", "$32.00", "$4.00", "T"],
    ["Leading French military unit rejects stated why to grow crops (F, ARMY, -Y)", "FARM", "FARMER BROS", "10 (10:1 5/11/04)", "$20.00", "$2.00", "A"],
    ["Knock out America in extra session (US in OT)", "OUST", "OUSTERINC", "0.1 (1:10 4/21/23)", "$0.40", "$4.00", "T"],
    ["Arduous middle section by musical pair (middle of arduous)", "DUO", "FANGDDNETWORKGROUPLTD", "0.00444 (1:15 6/7/22, 1:15 8/4/23)", "$0.04", "$9.00", "T"],
    ["Action star from spacecraft loses alien (ROCKET - ET)", "ROCK", "GIBRALTARINDUSTRIES", "1.5 (3:2 11/1/04)", "$1.50", "$1.00", "G"],
    ["Top stew pan (TOP anagram)", "POT", "POTASHCORPOFSASKATCHEWAN", "18.00 (2:1 8/18/04, 3:1 5/30/07, 3:1 2/25/11)", "$54.00", "$3.00", "T"],
    ["Shifted annual percentage rate fifteen points forward to fix price level (APR Caesar shift 15 spots)", "PEG", "PUBLICSERVICEENTERPRISEGROUPINCORPORATED", "3.00 (3:2 7/27/87, 2:1 2/5/08)", "$15.00", "$5.00", "I"],
    ["Organized posh store (POSH anagram)", "SHOP", "SHOPIFY", "10.00 (10:1 6/29/22)", "$40.00", "$4.00", "P"],
    ["Rap dance (Double Definition)", "TAP", "MOLSONCOORSBEVERAGECOMPANY", "2.00 (2:1 10/4/07)", "$10.00", "$5.00", "O"]];

const SolutionTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th,
  td {
    width: calc(100% / 7);
  }
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>This is a puzzle about stock splitting.</p>
      <p>
        Solvers will probably first reorder the n-grams to form cryptic clues.
        Clues resolve to words whose lengths match the original n-gram lengths
        of their clues. Each of these words is also a stock ticker.{" "}
      </p>
      <p>
        Solvers can determine the related stock/company names. They can also
        realize based on the title and how the clues were initially presented
        that stock splits are relevant. Each of these companies has had at least
        one split. The total multiple of stock splits for each of these
        companies can be found online. For instance, BOOM had two stock splits,
        one 1:5 split (get one share for every five shares owned) and one 2:1
        (2/1) split. Combined that equals 2/5 or .40.
      </p>
      <p>
        Dividing that by the given current price allows solvers to get an
        “initial price”, all integers. Indexing that price into the stock name
        gets a final clue phase LAUNCHDARTATTGTIPO, with TGT being the ticker
        for Target Corporation. Solvers are then directed to the gala (“Tell the
        bartender that you need a Flying Scotsman to get over a bad split”),
        where they can throw darts at a target (get it?) to get 34 (TGT’s IPO
        price), and then be given the final answer,{" "}
        <PuzzleAnswer>YOUR WINNINGS SIR</PuzzleAnswer>.
      </p>
      <HScrollTableWrapper>
        <SolutionTable>
          <thead>
            <tr>
              {tableInfo[0]?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableInfo.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </SolutionTable>
      </HScrollTableWrapper>
    </>
  );
};

export default Solution;
