import React from "react";
import { styled } from "styled-components";
import Dropquote from "../../components/Dropquote";

const DROPQUOTES = [
  {
    headers: [
      "AITT",
      "HIK",
      "DEEO",
      "DFMO",
      "BN",
      "ARSS",
      "AIILT",
      "LNXY",
      "EW",
      "BII",
      "NOU",
      "TTU",
    ],
    grid: [
      "_.___’_.___.",
      "____.___.___",
      "._’_.___._._",
      "___._____.__",
      "_.__.___....",
    ],
  },
  {
    headers: [
      "ADQRT",
      "ANNU",
      "DIKT",
      "AEEH",
      "EGTT",
      "AINT",
      "HIMT",
      "AEENY",
      "OP",
      "AETU",
      "NU",
    ],
    grid: [
      "_____.____.",
      "___.____.__",
      "_.____.___.",
      "____.___.__",
      "__._____...",
    ],
  },
  {
    headers: [
      "CEI",
      "HW",
      "ACMT",
      "AHOY",
      "AILP",
      "LSSTU",
      "OST",
      "HTT",
      "HIOT",
      "EHNU",
    ],
    grid: [
      "_’_.______",
      "’.____.___",
      "__.___.___",
      ".___.__.__",
      "_._____...",
    ],
  },
  {
    headers: [
      "AEOV",
      "EHRVV",
      "AEEKN",
      "NRRU",
      "GIS",
      "HIIT",
      "INST",
      "GSST",
      "AS",
      "ARST",
      "HHLRT",
      "AEHOW",
      "ADERW",
      "EOY",
      "MNSW",
    ],
    grid: [
      "_____’_._____._",
      "____.____.___._",
      "___.__’_.______",
      "._______._____.",
      "____.___.______",
    ],
  },
  {
    headers: [
      "EFIRW",
      "IOTW",
      "ELLM",
      "AEFR",
      "HS",
      "EMOP",
      "AFRTY",
      "CEH",
      "EKRT",
      "EHT",
      "EOPV",
      "IO",
    ],
    grid: [
      "_’_.____.__.",
      "____.__.____",
      "__.__.___.__",
      "____.__.___.",
      "____.____...",
    ],
  },
  {
    headers: [
      "AAALO",
      "ANNO",
      "DDGKL",
      "EI",
      "BOTT",
      "HOTTU",
      "EHLTT",
      "EEH",
      "AT",
      "BEHIR",
      "ELNOR",
      "GIU",
      "FGGIN",
      "HKNOU",
      "ESST",
      "ET",
    ],
    grid: [
      "___.___.___.___.",
      "_.______._____._",
      "___.___.___.____",
      "____.___.______.",
      "___.____.______.",
    ],
  },
  {
    headers: [
      "AMY",
      "CEKNO",
      "EITU",
      "BDIW",
      "CCLS",
      "AAER",
      "BMNU",
      "ABEL",
      "ERTU",
      "BEST",
      "LMY",
      "AISY",
      "AKO",
      "DELMP",
      "ELOR",
    ],
    grid: [
      "___.___’_.____.",
      "__._____.__.___",
      ".___._____.____",
      ".____.______.__",
      "______.___._.__",
    ],
  },
  {
    headers: [
      "AHORT",
      "AEOR",
      "AADIW",
      "RSS",
      "EGOV",
      "AFHIN",
      "EO",
      "DRSW",
      "ETU",
      "LSS",
    ],
    grid: [
      "________._",
      "____._.___",
      "___.__.___",
      "_._._____.",
      "______....",
    ],
  },
  {
    headers: [
      "CHINS",
      "HLT",
      "EGMY",
      "ADF",
      "HNOZ",
      "EINOR",
      "ANOP",
      "EGRST",
      "LLS",
      "AEIM",
      "GISU",
    ],
    grid: [
      "_’_._______",
      "___._______",
      "____.___.__",
      "__.___.____",
      "_.______...",
    ],
  },
  {
    headers: [
      "HKL",
      "ABOS",
      "AFMO",
      "CKMOO",
      "EKRSV",
      "ER",
      "AFLR",
      "AIW",
      "GIIKR",
      "AERTT",
      "ACHH",
      "EGN",
      "AEIU",
      "CLNS",
      "ABDE",
      "AEMO",
      "EOR",
    ],
    grid: [
      "_____.____.______",
      "’_.____.____.____",
      ".____._____.__._.",
      "______.____._.___",
      "_.___._._______..",
    ],
  },
  {
    headers: [
      "ILMN",
      "FOT",
      "AELS",
      "EEIS",
      "LMNP",
      "GHILU",
      "AINR",
      "GKNT",
      "EHT",
      "EIO",
    ],
    grid: [
      "__’_.____.",
      "______.___",
      "._______._",
      "_._.______",
      "_._____...",
    ],
  },
  {
    headers: [
      "ELYY",
      "IOOY",
      "OSUUV",
      "AEU",
      "DGL",
      "EOTUU",
      "AAACN",
      "KKRR",
      "ELNO",
      "ES",
      "OSST",
      "MOOS",
      "EM",
    ],
    grid: [
      "___._____.__.",
      "____.__.____.",
      "___.____.____",
      ".___.____.___",
      "_._______....",
    ],
  },
  {
    headers: [
      "DMOT",
      "ACER",
      "HNNRS",
      "IO",
      "GIINR",
      "GNOTT",
      "LO",
      "BDEST",
      "HU",
      "EFMT",
      "OU",
      "IMRR",
    ],
    grid: [
      "___.__’_.___",
      "___.__.___._",
      "______.___._",
      "_’_.____.___",
      "._______....",
    ],
  },
];

export const LAST_DROPQUOTE = {
  headers: [
    "UVWY",
    "EUVW",
    "AQUVV",
    "GKUUV",
    "GIPR",
    "ILN",
    "AKT",
    "FIJTU",
    "DIITZ",
    "ISTU",
    "AGU",
  ],
  grid: [
    "_________._",
    "______.____",
    ".____.____.",
    "_.___.____.",
    "____._.____",
  ],
};

const StyledDropquote = styled(Dropquote)`
  margin-bottom: 1em;
`;

const StyledHr = styled.hr`
  margin-bottom: 1em;
`;

export function makeLabels(grid: string[]): string[][] {
  return grid.map((line) =>
    line.split("").map((char) => (char === "_" ? "" : char)),
  );
}

const Puzzle = (): JSX.Element => {
  return (
    <>
      {DROPQUOTES.map(({ headers, grid }, index) => {
        const labels = [headers, ...makeLabels(grid)];
        return <StyledDropquote key={index} labels={labels} />;
      })}
      <StyledHr />
      <StyledDropquote
        labels={[LAST_DROPQUOTE.headers, ...makeLabels(LAST_DROPQUOTE.grid)]}
      />
    </>
  );
};

export default Puzzle;
