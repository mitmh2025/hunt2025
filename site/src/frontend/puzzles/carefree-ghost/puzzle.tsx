import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import { HScrollTableWrapper } from "../../components/StyledUI";

const GRID = `
              RGDHHDJIAXCTH
            XCTKTGNSXGTRIXDC
          UGDBNTPGHIPGIHAOBQDFG
        WUSANJOSEDELCABOPESLSRQB
        ISNVBSRRRAMMMXXGNNKKOUABS
      SRFHIACNTBRAXXXJKKJJDXKDNXRF
      XTATDURHCCHIREYAMNAITSIRHCBMN
     XDUSRCBDXKIAZSAPWKMYMEHOGPISMQ
    PMVKTIXSKOWECAISOHUISGHCBJPDSMMRD
   HMIJPTVRMBSPGIHAMLDNBTCHBFHJPWKXVT
   CMHWITVRMXCUCIQXPOWWRZOPXWVEVPOXMXC
  ZBAYQEERAIIAIVATABLEGRRRKZRTSETLXJTI
  PLUCSNGARARDPDSCZYUSHQEDILGEPCPBLXZOA
  TTKHHBMRDHNUTKHTCATTVTJFCHWXKCRXAHSH
  NPCGOGMBTORWIAITZYHUEUQOWHZFNLQMNSARM
 FVGRUGXKDMATAHITPCUASAUBQBMTHHMPVTTJCV
  HWJSIKAXSDWOMMNNBTWIDFBLPMOECNEDIVORP
 IPGEILWGTRAGYBGJHPHKEKSAOLFNYKGKKOENTB
 UTCBDKLMIAIHPLEDALIHPYMGNJWYDTWJJILZBHN
 ZHZLGIARQEMNMOQWMGCPXMWDKZOBGYJDUBVSUT
  HBBMXXUPIEASTDEREHAMKAIXSXKSONOLAZRDY
 PSSAYIAMNADKRRZADSHYXHCLXFMINSLEYGRSAT
  TMWBQMHEOYCMRBFKQCUDYHWLXXMCRGDLTAOEV 
  HBPKNVZLIEFKINGGEORGEIIIMOMDOEEBMNPG
  DWLFAWAREFCIULXBTROFRCSWAMCRFHYKXBGGG
  LYDHHOCJGNUYKRXSHFKRUYKAMMWSMSRYARKI
   GWOEMWBHEZTSJVIJXUYGBSJSWALBVAOYKJU
   TJGKXOAFNQUKYTQOPBZGSYOJARJURMZLOA
    VEDAMQNATBOIPBVDBYYHRNWQLROGROGKB
     DHMAXIMILIANHELLUDLEESVEBELEHG
      KVJRFEOLZBHZKGTBYEYTVXOSMBEJT
      YCXRCCUTNZRHHGBBIZVELUEBTZSG
        LPSZEXAEDCXDMATRBDPXRRABR
        KOBPLEWESTOWNIJVHPTVMWEG
          TPTJGOOFJKPHBEUZJSLUR
            BRRRMRKXAJINSVIO
              GFNHLYTOMQSLB
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(41, " ").split(""));

const StyledWordSearch = styled.table`
  font-family: "Roboto Mono", monospace;
  margin-bottom: 1em;
  border-collapse: collapse;
  td {
    width: 22px;
    height: 22px;
    line-height: normal;
    text-align: center;
  }
`;

export const WordSearch = ({
  grid,
  highlights,
}: {
  grid: string[][];
  highlights?: Set<number>;
}): JSX.Element => {
  return (
    <HScrollTableWrapper>
      <StyledWordSearch>
        {grid.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              let colspan = 1;
              if (i % 2 === 1 || j !== 0) {
                colspan = 2;
              }
              const index = i * row.length + j;
              const styles: CSSProperties = {};
              if (highlights && highlights.has(index)) {
                styles.backgroundColor = "#ffff00";
              }
              return (
                <td colSpan={colspan} key={`${i}-${j}`} style={styles}>
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </StyledWordSearch>
    </HScrollTableWrapper>
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">I’ve been watching this since 1000.</p>
      <WordSearch grid={GRID} />
    </>
  );
};

export default Puzzle;
