import React from "react";
import { styled, keyframes } from "styled-components";
import {
  COPY_ONLY_CLASS,
  NO_COPY_CLASS,
} from "../../components/CopyToClipboard";

const scroll = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// prettier-ignore
const content = [
  ["1.", "ATIO", "EDES", "IREW", "IUMF", "JEER", "NDOF", "ORKS", "PREC", "RBER", "REVE", "STAD", "THEE", "N", "(4 8 3 3 2 7 9 13)", "CURRENT PRICE: $2.00"],
  ["2.", "APPY", "FISH", "FOLL", "GGOL", "GMAN", "OWIN", "YOUN", "(5 3 9 4 2 5)", "CURRENT PRICE: $1.50"],
  ["3.", "CEO", "EVE", "NRE", "SUL", "TIS", "TWI", "DD", "(4 6 2 5 3)", "CURRENT PRICE: $28.00"],
  ["4.", "CAK", "ENT", "ICH", "MEL", "OFR", "OST", "PRI", "USE", "E", "(3 5 6 2 5 4)", "CURRENT PRICE: $10.00"],
  ["5.", "CLUB", "ELYN", "GOLF", "ISST", "RANG", "OIR", "(4 4 2 9 4)", "CURRENT PRICE: $0.30"],
  ["6.", "BAC", "BLE", "CON", "FIG", "IGI", "ISA", "KWA", "MAN", "OUS", "PTI", "RDS", "REL", "TEM", "URE", "(9 9 6 2 1 12 3)", "CURRENT PRICE: $1.25"],
  ["7.", "AINE", "CONT", "COTI", "DNAR", "GLED", "RUGS", "SMUG", "C", "(8 4 9 8)", "CURRENT PRICE: $2.00"],
  ["8.", "DSPI", "NRUN", "ROTA", "TEAN", "T", "(6 3 4 4)", "CURRENT PRICE: $5.00"],
  ["9.", "DECO", "FORM", "PLAT", "RATE", "SHIP", "(8 4 8)", "CURRENT PRICE: $108.00"],
  ["10.", "EO", "ET", "ET", "FI", "HI", "ID", "IS", "NG", "NL", "OU", "TH", "TS", "(7 2 5 2 3 5)", "CURRENT PRICE: $32.00"],
  ["11.", "ECTS", "EDWH", "HMIL", "INGF", "ITAR", "LEAD", "RENC", "ROPS", "ROWC", "STAT", "TREJ", "YTOG", "YUNI", "(7 6 8 4 7 6 3 2 4 5)", "CURRENT PRICE: $20.00"],
  ["12.", "AMER", "ICAI", "KNOC", "KOUT", "NEXT", "RASE", "SSIO", "N", "(5 3 7 2 5 7)", "CURRENT PRICE: $0.40"],
  ["13.", "AIR", "ALP", "ARD", "CTI", "DDL", "ESE", "ONB", "SIC", "SMI", "UOU", "YMU", "(7 6 7 2 7 4)", "CURRENT PRICE: $0.04"],
  ["14.", "ACEC", "ACTI", "ARFR", "LOSE", "OMSP", "ONST", "RAFT", "SALI", "EN", "(6 4 4 10 5 5)", "CURRENT PRICE: $1.50"],
  ["15.", "STE", "TOP", "WPA", "N", "(3 4 3)", "CURRENT PRICE: $54.00"],
  ["16.", "ATE", "DAN", "FIF", "FTE", "GER", "ICE", "INT", "LEV", "LPE", "NPO", "NTA", "NUA", "OFI", "RCE", "RDT", "RWA", "SFO", "SHI", "TEE", "XPR", "EL", "(7 6 10 4 7 6 7 2 3 5 5)", "CURRENT PRICE: $15.00"],
  ["17.", "DPOS", "HSTO", "NIZE", "ORGA", "RE", "(9 4 5)", "CURRENT PRICE: $40.00"],
  ["18.", "DAN", "RAP", "CE", "(3 5)", "CURRENT PRICE: $10.00"],
];

const listItems = content.flatMap((line) =>
  line
    .map((item, index) => <li key={`${line[0]}-${index}`}>{item}</li>)
    .concat(<li key={`${line[0]}-separator`}>|</li>),
);

const copyableItems = content.map((line, index) => (
  <li key={`copyable-${index}`}>{line.join(" ")}</li>
));

const Clue = styled.div`
  border: 1px solid #000;
  background: #fff;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  ul {
    margin: 0;
    padding: 0;
    display: inline-block;
    list-style: none;
    animation: ${scroll} 120s linear infinite;
  }
  ul li {
    display: inline;
    padding-left: 1.25em;
  }
`;

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Clue className={NO_COPY_CLASS}>
        <ul>{listItems}</ul>
      </Clue>
      <ul className={COPY_ONLY_CLASS}>{copyableItems}</ul>
    </>
  );
};

export default Puzzle;
