import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import { COPY_ONLY_CLASS } from "../../components/CopyToClipboard";

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

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(82, 11px);
  grid-template-rows: repeat(41, 22px);
`;

export const WordSearch = ({
  grid,
  highlights,
  showCopyOnlyCopy = false,
}: {
  grid: string[][];
  highlights?: Set<number>;
  showCopyOnlyCopy?: boolean;
}): JSX.Element => {
  return (
    <>
      <StyledGrid>
        {grid.map((row, i) =>
          row.map((cell, j) => {
            const styles: CSSProperties = {};
            if (i % 2 === 1 || j !== 0) {
              styles.gridColumnEnd = "span 2";
            }
            const index = i * row.length + j;
            if (highlights && highlights.has(index)) {
              styles.backgroundColor = "#ffff00";
            }
            return (
              <div key={`${i}-${j}`} style={styles}>
                {cell}
              </div>
            );
          }),
        )}
      </StyledGrid>
      {showCopyOnlyCopy && (
        <StyledWordSearch className={COPY_ONLY_CLASS}>
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
      )}
    </>
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">I’ve been watching this since 1000.</p>
      <WordSearch grid={GRID} showCopyOnlyCopy={true} />
    </>
  );
};

export default Puzzle;
