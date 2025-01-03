import React from "react";
import { styled } from "styled-components";
import { reduceCoordinatesToIndices } from "../../components/Crossword";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import { WordSearch } from "./puzzle";

const TRANSIT_GRID: [string, string, string][] = [
  ["Jean-Baptiste Chappe d’Auteroche", "San Jose del Cabo", "S"],
  ["Christian Mayer", "St. Petersburg", "H"],
  ["Johan Maurits Mohr", "Batavia", "I"],
  ["Thomas Hornsby", "Oxford", "F"],
  ["Benjamin West", "Providence", "T"],
  ["David Rittenhouse", "Philadelphia", "B"],
  ["Francis Wollaston", "East Dereham", "Y"],
  ["King George III", "Richmond", "E"],
  ["Maximilian Hell", "Vardo", "L"],
  ["Captain James Cook", "Tahiti", "E"],
  ["Joel Bayley", "Lewestown", "V"],
  ["William Wales", "Hudson Bay", "E"],
  ["Guillaume Le Gentil", "Pondicherry", "N"],
];

const SOLVED_WORD_SEARCH = `
              _____________
            ________________
          __D_____________B__F_
        __SANJOSEDELCABO_E__SR__
        ___V_____________N____A__
      ____IA____________J_____N___
      ____D_RH____REYAMNAITSIRHC___
     ____R__D__________M__E____I___
    _____I___O_________I__H_____S____
   _____T_____________N__C______W____
   _____T____C________W__O_______O____
  _____E____IAIVATAB_E__RR_______L____
  _____N____R_P______S__E_I_______L____
  ____H____H__T_____T__T_FC_______A___
  ___GO____O___A_______U___H_______S___
 ____U____M____I______A____M_______TJ__
  ___SI___S_____N__T__D___P_OECNEDIVORP
 ___E_L__T______J____E___O__N______EN__
 ___B__L_IAIHPLEDALIHP___N__YD_____L__H_
 ______AR________M__P__WD___B_____B__U_
  ______U__EASTDEREHAM__I____S____A__DY
 ______AM_________SH___CL____N___Y__S__
  _____M_E_________C_D_H_L____R__L__O__
  ____N__L___KINGGEORGEIII____OEE__N__
  ____A___E_______T_O_R___A____HY__B___
  ___H____G______S_FKRU___M____S__A___
   __O_____E_____I_X_Y_B___W____A_Y___
   _J______N____T_O____S___A____M____
    ________T___P_______R___L____O___
     __MAXIMILIANHELL__LE___E____H_
      _______L_B_______E_T___S____T
      ________N_______I__E________
        ______A_______T___P______
        ____LEWESTOWNI____TV__E_
          ___J_______H_____S___
            ________A_______
              __N___T______
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(41, " ").split(""));

const SHIFTED_WORD_SEARCH = `
              CROSSOUTLINES
            INEVERYDIRECTION
          FROMYEARSTARTSLZMBOQR
        HFDLYUZDPOPWNLMZAPDWDCBM
        TDYGMDCCCLXXXIIRYYVVZFLMD
      DCQSTLNYEMCLIIIUVVUUOIVOYICQ
      IELEOFCSNNSTCPJLXYLTEDTCSNMXY
     IOFDCNMOIVTLKDLAHVXJXPSZRATDXB
    AXGVETIDVZHPNLTDZSFTDRSNMUAODXXCO
   SXTUAEGCXMDARTSLXWOYMENSMQSUAHVIGE
   NXSHTEGCXINFNTBIAZHHCKZAIHGPGAZIXIN
  KMLJBPPCLTTLTGLELMWPRCCCVKCEDPEWIUET
  AWFNDYRLCLCOAODNKJFDSBPOTWRPANAMWIKZL
  EEVSSMXCOSYFEVSENLEEGEUQNSHIVNCILSDS
  YANRZRXMEZCHTLTEKJSFPFBZHSKQYWBXYDLCX
 QGRCFRIVOXLELSTEANFLDLFMBMXESSXAGEEUNG
  SHUDTVLIDOHZXXYYMEHTOQMWAXZPNYPOTGZCA
 TARPTWHRECLRJMRUSASVPVDLZWQYJVRVVZPYEM
 FENMOVWXTLTSAWPOLWTSAJXRYUHJOEHUUTWKMSY
 KSKWRTLCBPXYXZBHXRNAIXHOVKZMRJUOFMGDFE
  SMMXIIFATPLDEOPCPSLXVLTIDIVDZYZWLKCOJ
 ADDLJTLXYLOVCCKLODSJISNWIQXTYDWPJRCDLE
  EXHMBXSPZJNXCMQVBNFOJSHWIIXNCROWELZPG
  SMAVYGKWTPQVTYRRPZCRPTTTXZXOZPPMXYAR
  OHWQLHLCPQNTFWIMECZQCNDHLXNCQSJVIMRRR
  WJOSSZNURYFJVCIDSQVCFJVLXXHDXDCJLCVT
   RHZPXHMSPKEDUGTUIFJRMDUDHLWMGLZJVUF
   EURVIZLQYBFVJEBZAMKRDJZULCUFCXKWZL
    GPOLXBYLEMZTAMGOMJJSCYHBWCZRCZRVM
     OSXLITXTWTLYSPWWFOWPPDGPMPWPSR
      VGUCQPZWKMSKVREMJPJEGIZDXMPUE
      JNICNNFEYKCSSRMMTKGPWFPMEKDR
        WADKPILPONIOXLECMOAICCLMC
        VZMAWPHPDEZHYTUGSAEGXHPR
          EAEURZZQUVASMPFKUDWFC
            MCCCXCVILUTYDGTZ
              RQYSWJEZXBDWM
  `
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(41, " ").split(""));

const SHIFTED_HIGHLIGHTS = reduceCoordinatesToIndices(
  [
    ...Array.from({ length: 13 }, (_, i) => i + 14).map((col) => ({
      row: 0,
      col,
    })),
    ...Array.from({ length: 16 }, (_, i) => i + 12).map((col) => ({
      row: 1,
      col,
    })),
    ...Array.from({ length: 14 }, (_, i) => i + 10).map((col) => ({
      row: 2,
      col,
    })),
  ],
  41,
);

const YEAR_SEARCH = `
              _____________
            ________________
          _____________________
        _______________________M
        ____MDCCCLXXXII_________D
      _________MCLIII___________C_
      I_________________________MX_
     I_____M____________________DX_
    _X_____DV_______________M____XX__
   _X_____CX_______________M_____VI__
   _X_____CX_______________I______IX__
  _M_____CL_______________V_______I___
  _______LC________________________I___
  ______XC____________________________
  ______XM_____________________________
 ______I_____L_________________________
  _____V______X_________M______________
 _____________M________D_______________
 ______________________X_____________M__
 _____________________X_____________D__
  _MMXII______________V__I_I________C__
 ____________________I___I_X_______C___
  ________________________I_X______L___
  ________________________X_X_____X___
  _________________________X_C____I____
  _________________________X_D________
   ____X____________________L_M_______
   ____I____________________C________
    ____X____________________C_______
     ___L____________________M_____
      ___C_________________________
      ___C________________________
        __D______________________
        __M_____________________
          _____________________
            MCCCXCVI________
              _____________
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(41, " ").split(""));

const YEAR_TABLE: [number, string][] = [
  [1032, "MXXXII"],
  [1040, "MXL"],
  [1153, "MCLIII"],
  [1275, "MCCLXXV"],
  [1283, "MCCLXXXIII"],
  [1396, "MCCCXCVI"],
  [1518, "MDXVIII"],
  [1526, "MDXXVI"],
  [1631, "MDCXXXI"],
  [1639, "MDCXXXIX"],
  [1761, "MDCCLXI"],
  [1769, "MDCCLXIX"],
  [1874, "MDCCCLXXIV"],
  [1882, "MDCCCLXXXII"],
  [2004, "MMIV"],
  [2012, "MMXII"],
];

const CROSSED_OUT = `
              *****OUTL**ES
            ******YDIR*C*I*N
          F********TAR*SL**BO**
        ***********************#
        ****#********************
      *********#******************
      **************************#**
     ******#***********************
    *********************************
   S*T*A*******RT******ME*S**S*A***GE
   **SH*****I*F*TB*A***CK*A****GA***IN
  *#**********************************
  A**ND****L*O*O**K*F****O**R**NAM*****
  *E*S****O**F*V*EN*****U**S*I*NCI****
  *******#*****************************
 **RC******LE*S*E*N**D****M*ESS*AGE****
  **********************#**************
 *************#************************
 ************************************#**
 K*******BP*Y*Z*H*R**I*****ZMRJUO**G***
  *#***********************************
 A****T**YLO*CCK*O**********TYDW****DL*
  ******S*ZJ**CM**B*F**S*W***NCR**E*ZPG
  *****GK*T*Q*T*R*****P**T***OZ**M**AR
  ******LC**NT**IM*C****D*L***Q**V*M*RR
  **O***NU*YFJ*CI****C*JV*X*****C*LC*T
   ***************************#*******
   E*R****Q*B*V**B**M*R*JZ*L***C*KWZL
    *PO***YL**ZT*M*****S*YH*W****ZRVM
     ************************#*****
      VG***P**K*S**R**J*J*GI*****UE
      J*****F**K**S*M*T*G*W**M***R
        W***PI*P****XL*C*O*******
        **#*********************
          ****R**Q**ASM*F***W**
            #***************
              ****WJ*ZXB***
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.padEnd(41, " ").split(""));

const TRANSIT = `
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

const TRANSIT_HIGHLIGHTS = reduceCoordinatesToIndices(
  [
    { row: 4, col: 8 },
    { row: 4, col: 9 },
    { row: 5, col: 7 },
    { row: 5, col: 8 },
    { row: 5, col: 9 },
    { row: 6, col: 8 },
    { row: 6, col: 9 },
    { row: 6, col: 15 },
    { row: 6, col: 16 },
    { row: 7, col: 14 },
    { row: 7, col: 15 },
    { row: 7, col: 16 },
    { row: 7, col: 18 },
    { row: 7, col: 19 },
    { row: 8, col: 15 },
    { row: 8, col: 16 },
    { row: 8, col: 18 },
    { row: 8, col: 19 },
    { row: 8, col: 20 },
    { row: 9, col: 18 },
    { row: 9, col: 19 },
    { row: 10, col: 29 },
    { row: 10, col: 30 },
    { row: 11, col: 28 },
    { row: 11, col: 29 },
    { row: 11, col: 30 },
    { row: 12, col: 29 },
    { row: 12, col: 30 },
    { row: 12, col: 36 },
    { row: 12, col: 37 },
    { row: 13, col: 35 },
    { row: 13, col: 36 },
    { row: 13, col: 37 },
    { row: 14, col: 36 },
    { row: 14, col: 37 },
  ],
  41,
);

const NAMES_TABLE: [string, string][] = [
  ["Vesper", "Roman"],
  ["Ishtar", "Babylonian"],
  ["Sao Mai", "Vietnamese"],
  ["Zohrah", "Islamic"],
  ["Chac Ek", "Mayan"],
];

const StyledTable = styled.table`
  margin: 1em auto;
  border-spacing: 8px 0;
`;

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is based on the astronomical event known as the Transit of
        Venus, during which Venus passes in front of the face of the Sun.
      </p>
      <p>
        The puzzle initially presents a wordsearch. Solvers might find some
        names of people, e.g.:
      </p>
      <ul>
        <li>KING GEORGE III</li>
        <li>CAPTAIN JAMES COOK</li>
        <li>FRANCIS WOLLASTON</li>
      </ul>
      <p>And some places, e.g.:</p>
      <ul>
        <li>LEWESTOWN</li>
        <li>EAST DEREHAM</li>
        <li>SAN JOSE DEL CABO</li>
      </ul>
      <p>
        Once enough of these have been found, a Google search on the names
        reveals that these are all people who observed the Transit of Venus in
        1769, and the places where they observed it.
      </p>
      <p>
        Each (person, location) pair is written so that they are at different
        angles in the grid, such that following the direction of each to the
        place where they cross gives a unique letter. Reading the letters from
        top to bottom in the grid spells out <Mono>SHIFT BY ELEVEN</Mono>.
      </p>
      <StyledTable>
        <tr>
          <th>Person</th>
          <th>Location</th>
          <th>Letter</th>
        </tr>
        {TRANSIT_GRID.map(([person, location, letter], i) => (
          <tr key={i}>
            <td>{person}</td>
            <td>{location}</td>
            <td>{letter}</td>
          </tr>
        ))}
      </StyledTable>
      <WordSearch grid={SOLVED_WORD_SEARCH} />
      <p>
        The instruction SHIFT BY ELEVEN tells solvers that they need to Caesar
        shift each letter in the wordsearch forward 11 places in the alphabet,
        effectively making a new wordsearch:
      </p>
      <WordSearch grid={SHIFTED_WORD_SEARCH} highlights={SHIFTED_HIGHLIGHTS} />
      <p>
        The message at the top says:{" "}
        <Mono>CROSS OUT LINES IN EVERY DIRECTION FROM YEAR STARTS</Mono>. This
        tells solvers to look for years in the grid. However, the grid contains
        letters, not numbers—how might years be represented using letters? A
        closer look at the grid will reveal some entries that look like roman
        numerals, and these are the representations of the years when the
        transit took place, since 1000 AD (from the flavortext).
      </p>
      <WordSearch grid={YEAR_SEARCH} />
      <StyledTable>
        <tr>
          <th>Year</th>
          <th>Roman numerals</th>
        </tr>
        {YEAR_TABLE.map(([year, roman]) => (
          <tr key={year}>
            <td>{year}</td>
            <td>{roman}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        Crossing out lines in every direction from each year start (the M, since
        all are post 1000 AD, here represented by #) gives:
      </p>
      <WordSearch grid={CROSSED_OUT} />
      <p>From which the following message can be read in the top half:</p>
      <p>
        <Mono>
          START MESSAGE SHIFT BACK AGAIN AND LOOK FOR NAMES OF VENUS IN CIRCLES
          END MESSAGE
        </Mono>
      </p>
      <p>
        If we go back and look at the original wordsearch, we can find names for
        Venus in different cultures in circles, transiting across the face of
        the wordsearch in a similar pattern to how Venus transits across the
        face of the sun:
      </p>
      <WordSearch grid={TRANSIT} highlights={TRANSIT_HIGHLIGHTS} />
      <StyledTable>
        <tr>
          <th>6-letter names for Venus</th>
          <th>Origin</th>
        </tr>
        {NAMES_TABLE.map(([name, origin], i) => (
          <tr key={i}>
            <td>{name}</td>
            <td>{origin}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        Written inside each circle is a different letter, and these spell out{" "}
        <PuzzleAnswer>FISTS</PuzzleAnswer>, which is the answer to the puzzle.
      </p>
      <h3>Author’s Note</h3>
      <p>
        The 1769 Transit of Venus was an international astronomical event, where
        scientists arranged to take measurements of the transit time all over
        the globe. These measurements were then used to produce the first ever
        estimate for the distance between the Earth and the Sun
      </p>
    </>
  );
};

export default Solution;
