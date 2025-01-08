import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";
import { PuzzleAnswer } from "../../components/StyledUI";
import {
  ColoredDropquote,
  DROPQUOTE_1_COLORS,
  DROPQUOTE_1_LABELS,
  DROPQUOTE_2_COLORS,
  DROPQUOTE_2_LABELS,
  DROPQUOTE_3_COLORS,
  DROPQUOTE_3_LABELS,
  DROPQUOTE_4_COLORS,
  DROPQUOTE_4_LABELS,
  DROPQUOTE_5_COLORS,
  DROPQUOTE_5_LABELS,
  DROPQUOTE_6_COLORS,
  DROPQUOTE_6_LABELS,
  makeGrid,
  mapShorthandToColor,
  ScrollWrapper,
} from "./puzzle";

export const FinalGrid = styled(Crossword)`
  margin: 2em auto;
`;

const DROPQUOTE_1_FILL: string[][] = makeGrid([
  "_____AR__________N____W_TO___I_Y______AS___H_",
  "___A_CO__A__TSAOEY__H_O_ST___R_W__NE_OMEE_EL_",
  "DPGLMOES_BGEVISGTMNGRAMHWEYTGMIWR_LG_FCIS_WTE",
  "OYARAPKIUELBEGLIAIEGIODINHNEATIOSIOA_TRELNRSL",
  "IOEAOBITCIYASDALZMYFNJCAGNEGWELSNSNGTMRAMTTIL",
  "SGOUWHBOHTDOFAONTOUIHNVESHINHEALAOAFLGHOTESPO",
  "SO_ROOKS,_GOT_A_TOUGH_CASE?_WELL,_LET_ME_TELL",
  "_YOU_ABOUT_A_DOOZY_FROM_WHEN_I_WAS_A_GREEN_P.",
  "I._A_PRICELESS_GAME_HAD_GONE_MISSING_FROM_THE",
  "_PALACE._I_BEGAN_MY_INVESTIGATION_OF_THIS_WIL",
  "D_GAMBIT_BY_VISITING_JOHNNY_GRAY,_A_LOCAL_STO",
  "OGE_WHO_HAD_FALLEN_IN_WITH_THE_WRONG_MASTERS.",
]);
const DROPQOUTE_1_FULL_COLORS = [
  ...DROPQUOTE_1_COLORS,
  ...mapShorthandToColor([
    "YY.YYYYY_.YYY.Y.YYYYY.YYYY_.YYYY_.YYY.YY.YYYY",
    ".YYY.YYYYY.Y.YYYYY.YYYY.YYYY.Y.YYY.Y.YYYYY.Y_",
    "Y_.Y.YYYYYYYYY.YYYY.YYY.YYYY.YYYYYYY.YYYY.YYY",
    ".YYYYYY_.Y.YYYYY.YY.YYYYYYYYYYYYY.YY.YYYY.YYY",
    "Y.YYYYYY.YY.YYYYYYYY.YYYYYY.YYYY_.Y.YYYYY.YYY",
    "YYY.YYY.YYY.YYYYYY.YY.YYYY.YYY.YYYYY.YYYYYYY_",
  ]),
];

const DROPQUOTE_2_FILL: string[][] = makeGrid([
  "____IU__C______A___RD__I____E__NIX_____NE____",
  "T_D_THE_M_CN_E_ON_RIC_ICID__PA_BOJO_I__HI____",
  "AIMBOHI_AANERN_EN_ONTRQULLLTNK_NQED_THILL_W_P",
  "DIAOTYE_GHNCKELICHHELIFWEBYISOIWTEO_WRIOQSIMA",
  "JOLBNBENASAGOGAHEDAISEWUTTPTWOIMANNRSOMURTIRE",
  "AEHNOSTWTOEAUTOADTKLAPGEEHHUEHLIHUGRAFAHEUSAS",
  "JOHNNY_WAS_A_GOOD_KID_WITH_TWO_MAJOR_FAULTS:_",
  "A_LOOSE_TONGUE_AND_LARGE_BLUE_LIQUORS._HE_WAS",
  "_IMBIBING_AN_ELECTRIC_ICED_TEA_WHEN_I_INQUIRE",
  "D_ABOUT_A_CERTAIN_ANTIQUE_PINK_BOX._WHILE_I_P",
  "AID_THE_CHECK,_HE_HELPFULLY_POINTED_TO_HIS_MA",
  "TE,_THE_MAN_ON_A_HORSE_WITH_SHINING_ARMOR.___",
]);
const DROPQUOTE_2_FULL_COLORS: string[][] = [
  ...DROPQUOTE_2_COLORS,
  ...mapShorthandToColor([
    "YRRYRY.RRY.R.RRYR.RRY.YYRR.RYR.RRYYR.RRYYRR_.",
    "R.YYRRY.YRYYRY.RYY.YRYRR.YYRR.RYYRYYY_.YR.YYR",
    ".YYYYYYYY.YY.YYYYYYYY.YYYY.YYY.YYYY.Y.YYYYYYY",
    "Y.YYYYY.Y.YYYYYYY.YYYYYYY.YYYY.YYY_.YYYYY.Y.Y",
    "YYY.YYY.YYYYY_.YY.YYYYYYYYY.YYYYYYY.YY.YYY.YY",
    "YY_.YYY.YYY.YY.Y.YYYYY.YYYY.YYYYYYY.YYYYY_...",
  ]),
];

const DROPQUOTE_3_FILL: string[][] = makeGrid([
  "_E_______C_______U____R__F_____HE___M________",
  "RL_E_EEAING____URI_A_GH__TOT___EE_E_AE_T_IR_F",
  "NR_F_TMUGHEE__JEBARE_INOSNUAOI_DTHSYVNLEWGI_I",
  "EOMY_IOLTYTEBMUELTATDCDEYTDSDETIVEROEAYOIFNOS",
  "ESSEFABNARTDDLOSSFTLHTHEGOTREDLAHNSYDLREHDNVS",
  "TORHROMDATEHIEPNAIYACIUGUHHRBTDKENPEDYRWIIEGM",
  "THE_MAN_ACTED_AS_IF_CAUGHT_RED-HANDED._“I’M_S",
  "ORRY,_BUT_THE_ONLY_THING_THAT_KEEPS_MY_WIFE_F",
  "ROM_FEELING_BLUE_ARE_THE_FORBIDDEN_YELLOW_ROS",
  "ES_FROM_THE_IMPERIAL_GROUNDS.”_“THEY_ARE_DIVI",
  "NE,”_I_AGREED,_“BUT_DID_YOU_DELIVER_ANYTHING_",
  "ELSE_TODAY?”_“JUST_A_CHEST_TO_THE_SOVEREIGN.”",
]);
const DROPQUOTE_3_FULL_COLORS: string[][] = [
  ...DROPQUOTE_3_COLORS,
  ...mapShorthandToColor([
    "RGG.GRG.RYRYG.GR.RG.RGRGGG.RYR_GGRGYR_._R_G.R",
    "GYRY_.YYG.YRG.YRYG.YYRYR.YGYG.GYRGY.YY.RGYR.Y",
    "YYY.YYYYYYY.YYYY.YYY.YYY.YYYYYYYYY.YYYYYY.YYY",
    "YY.YYYY.YYY.YYYYYYYY.YYYYYYY__._YYYY.YYY.YYYY",
    "YY__.Y.YYYYYY_._YYY.YYY.YYY.YYYYYYY.YYYYYYYY.",
    "YYYY.YYYYY__._YYYY.Y.YYYYY.YY.YYY.YYYYYYYYY__",
  ]),
];

const DROPQUOTE_4_FILL: string[][] = makeGrid([
  "H___D____________BE_E_______HH__H___OLO______",
  "A___A_EBU____ARL_PIOG_HOD__IHA__RE_HTLL___REC",
  "POSED_TOTATK_IHP_SKADERIF_WONEE_EC_TARY_D_ATA",
  "LLTEM_ANDOIASALEACONTEEDH_MTRETHII_TUEN_HATED",
  "IAHIEHIEMTOOWANDCNHAUTLEM_MITGSRNSEGTDEESCZRD",
  "SMIKTTFHRHOEDLYEEIIHVSDTUESCHRETEAGNNRNUHAENE",
  "I_MET_THE_ROYAL_IN_HIS_LUSH_GREEN_GARDEN_AND_",
  "ASKED_IF_HE’D_RECEIVED_THE_CHEST._“NO,”_HE_RE",
  "PLIED,_BUT_AS_HE_PONDERED_MORE,_HE_TURNED_RED",
  "_AS_A_TOMATO_AND_SHOUTED._“THAT_RIGHTEOUS_ZEA",
  "LOT,_HE_TOOK_A_PACKAGE_OF_MINE_RECENTLY!_CATC",
  "H_HIM_AND_I_WILL_BEAT_HIM_WITH_HIS_TALL_HAT!”",
]);
const DROPQUOTE_4_FULL_COLORS: string[][] = [
  ...DROPQUOTE_4_COLORS,
  ...mapShorthandToColor([
    "R.NGN.NRG.GNGRN.NR.RGN.GRNG.GNYNR.GGNRYN.RNG.",
    "YGGYY.YG.RG_R.YRYGYGYG.RYY.RYGYR_._GY__.RG.YR",
    "YYYYY_.YYY.YY.YY.YYYYYYYY.YYYY_.YY.YYYYYY.YYY",
    ".YY.Y.YYYYYY.YYY.YYYYYYY_._YYYY.YYYYYYYYY.YYY",
    "YYY_.YY.YYYY.Y.YYYYYYY.YY.YYYY.YYYYYYYY_.YYYY",
    "Y.YYY.YYY.Y.YYYY.YYYY.YYY.YYYY.YYY.YYYY.YYY__",
  ]),
];

const DROPQUOTE_5_FILL: string[][] = makeGrid([
  "OT___AG____E_________T________T_________R____",
  "TA_M_RASOFLQEIST_____OE_T_U_S_NH_T_FP__LE_DDO",
  "HEDTCINWIPMEGFNTEH_S_IKOE_E_TOTEDIIOAE_GE_LMQ",
  "YONIIAPMLURTHEUROASRCHRLI_ERWGREATEBEYSSONSOR",
  "TIITLIRYTYKENSIWLNHTPLMERRFILHAAFRYEXMATGICEN",
  "HECCELELMGFTESYASAUTIKCAHDPIEKNTHIRMHEMWILNUR",
  "THE_CLERGYMAN_WAS_TICKLED_PINK_AT_THE_MANIC_R",
  "EACTION_OF_THE_MONARCH._“LIKE_THAT_MAN_WOULD_",
  "LIFT_A_MITRE_WITHOUT_HELP._I_PREFER_GO;_I_DON",
  "’T_LIKE_SULLYING_MY_FINGERS_WITH_THOSE_GRIMY_",
  "OLD_GRAY_PIECES._AS_FOR_THE_BOX,_I_MERELY_LEF",
  "T_IT_IN_THE_EMPRESS’_QUARTERS_AS_REQUESTED.”_",
]);
const DROPQUOTE_5_FULL_COLORS: string[][] = [
  ...DROPQUOTE_5_COLORS,
  ...mapShorthandToColor([
    "RNG.NRNGNYGBR.GNR.NBGRGRN.NBGR.YN.BNG.RGGNR.N",
    "GYRYBBB.YG.RYG.BYYGYYB_._BGBR.YGYB.RYB.RYBGY.",
    "BBBY.Y.YYBYY.BYYBBYY.BYYB_.Y.BYYYBY.BB_.B.YYY",
    "_Y.BYBB.BYYBBYYB.BB.BYBBYYB.YBBY.YBYBY.YYYBB.",
    "YBY.BYYB.YBYBYY_.YB.BYY.YBY.BYB_.Y.BYBBYB.YYB",
    "Y.YB.YY.YBB.YBBYYBY_.BBYYBYYY.YB.YYBBYYYYB__.",
  ]),
];

const DROPQUOTE_6_FILL: string[][] = makeGrid([
  "_____S____O___E_______O______I_A_________S___",
  "__EHBEE_SNY_DDR____E__AI__O_EAHRR_S__F___M_DE",
  "ETNGAJRHTHUHAEWAR_ERR_LNS_O_OATOUSUR_EW_PAHEA",
  "OMISHTFYIAGMKRTTGOTRWFOUOTC_DRECROTUHCDESINDE",
  "PNOATRWIHRAYAYASEULHICUMABEHLXTBHECODIONGBRGL",
  "TFTRATTSNEDGODHERMCATMEVTNTDSHAROHDTTHSUHORLE",
  "IOSLRLETDYTBHTHNULNRTAAHSYTTRCNESTSFWESLATIYO",
  "I_STARTED_BY_THE_NORTHEAST_CORNER,_STEALTHILY",
  "_FOLLOWING_THE_SLY_MATRIARCH_ACROSS_GROUPS_OF",
  "_MEANDERING_BUT_COLORFUL_CORRIDORS._WHEN_I_CA",
  "PTURED_HER_MAJESTY_AT_LAST,_SHE_UTTERED_SMUGL",
  "Y_THAT_SHE_HAD_NEVER_TOUCHED_THAT_BOX_BEFORE,",
  "_FORGETTING_THAT_SHE_HAD_NOT_WASHED_HER_HANDS",
  "._“SORRY_MA’AM,_BUT_I_KNOW_WHAT_YOU_DID.”____",
]);
const DROPQUOTE_6_FULL_COLORS: string[][] = [
  ...DROPQUOTE_6_COLORS,
  ...mapShorthandToColor([
    "N.RGRNGNR.NG.NPR.NBNRGRNRN.GYNRNG_.NRNGNNGRRN",
    ".BGRGPPYBB.GBY.BGP.PGBBPYPYY.YBPPGY.BBYYPP.GB",
    ".YPBPBYBPYB.BPY.BYYBBYPB.BYBBYPYYY_.YYBY.Y.BP",
    "YYBYBB.YBY.YYBYYPB.YY.YPYY_.YPY.PPYBBYY.YPBYY",
    "B.BYYP.PPB.PYP.PYPBY.BPYBBYP.BYYB.PYP.BPBYPY_",
    ".PYBPYPBYBP.BBYP.PBY.BYP.YYY.BYBPYB.YPP.BYYPB",
    "_._YBPYY.PY_BP_.BPY.P.BYPB.PBYP.BYP.PYB__....",
  ]),
];
const DROPQUOTE_6_HIGHLIGHTS: { row: number; column: number }[] = [
  { row: 7, column: 44 }, // Y
  { row: 8, column: 43 }, // O
  { row: 10, column: 42 }, // U
  { row: 8, column: 40 }, // P
  { row: 8, column: 3 }, // L
  { row: 9, column: 3 }, // A
  { row: 13, column: 7 }, // Y
  { row: 7, column: 7 }, // E
  { row: 7, column: 8 }, // D
  { row: 9, column: 8 }, // I
  { row: 7, column: 6 }, // T
];

const DROPQUOTES: {
  labels: string[][];
  fill: string[][];
  colors: string[][];
  divider: number;
  highlights?: { row: number; column: number }[];
}[] = [
  {
    labels: DROPQUOTE_1_LABELS,
    fill: DROPQUOTE_1_FILL,
    colors: DROPQOUTE_1_FULL_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_2_LABELS,
    fill: DROPQUOTE_2_FILL,
    colors: DROPQUOTE_2_FULL_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_3_LABELS,
    fill: DROPQUOTE_3_FILL,
    colors: DROPQUOTE_3_FULL_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_4_LABELS,
    fill: DROPQUOTE_4_FILL,
    colors: DROPQUOTE_4_FULL_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_5_LABELS,
    fill: DROPQUOTE_5_FILL,
    colors: DROPQUOTE_5_FULL_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_6_LABELS,
    fill: DROPQUOTE_6_FILL,
    colors: DROPQUOTE_6_FULL_COLORS,
    divider: 6,
    highlights: DROPQUOTE_6_HIGHLIGHTS,
  },
];

const FINAL_GRID_LABELS = makeGrid([
  "_______________",
  "_______________",
  "_______________",
  "_______________",
  "_______________",
  "_______________",
  "_______________",
  "_______________",
  "_______________",
  "_______________",
  "_______________",
]);
const FINAL_GRID_FILL = makeGrid([
  "Y_KING___GREEN_",
  "O_KNIGHT_GRAY__",
  "U_BISHOP_BLUE__",
  "P_QUEEN__PINK__",
  "L_PAWN___RED___",
  "A_BISHOP_BLUE__",
  "Y_ROOK___YELLOW",
  "E_KING___GREEN_",
  "D_PAWN___RED___",
  "I_QUEEN__PINK__",
  "T_KNIGHT_GRAY__",
]);
const FINAL_GRID_COLORS = mapShorthandToColor([
  "_________NNNNN_",
  "_________GGGG__",
  "_________BBBB__",
  "_________PPPP__",
  "_________RRR___",
  "_________BBBB__",
  "_________YYYYYY",
  "_________NNNNN_",
  "_________RRR___",
  "_________PPPP__",
  "_________GGGG__",
]);

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is a series of dropquote puzzles where each color represents
        a different chess piece and drops down in the manner of that piece. So
        rooks go straight down, but bishops drop down diagonally, and a queen
        might do either. As hinted in the text, a new chess piece is added in
        each puzzle. Yellow = Rook, Red = Pawn, Gray = Knight, Green = King,
        Blue = Bishop, Pink = Queen. The first five paragraphs also mention
        these colors 11 times:
      </p>
      <ul>
        <li>a GREEN P.I.</li>
        <li>Johnny GRAY</li>
        <li>large BLUE liquors</li>
        <li>antique PINK box</li>
        <li>caught RED-handed</li>
        <li>feeling BLUE</li>
        <li>forbidden YELLOW roses</li>
        <li>lush GREEN garden</li>
        <li>RED as a tomato</li>
        <li>tickled PINK</li>
        <li>old GRAY pieces</li>
      </ul>
      <p>
        Once you fill out the last paragraph, you can start at the beginning and
        make a chess move to get to the next color in that 11 color sequence.
        For instance, the first paragraph mentions green and gray. Starting at
        the upper right (“northeast corner”, as mentioned in the last passage)
        of the last dropquote, you can move 1 space diagonally down, a la the
        king, to get to a gray knight, and then do a knight move to a blue U,
        the first color mentioned in the second paragraph. Follow this unique
        path through to spell <PuzzleAnswer>YOU PLAYED IT</PuzzleAnswer>.
      </p>
      <ScrollWrapper>
        {DROPQUOTES.map(({ labels, fill, colors, divider, highlights }, i) => (
          <ColoredDropquote
            key={i}
            labels={labels}
            fill={fill}
            colors={colors}
            divider={divider}
            getAdditionalCellFillStyles={({ row, column }) => {
              if (highlights) {
                for (const cell of highlights) {
                  if (row === cell.row && column === cell.column) {
                    return {
                      fontWeight: "bold",
                      color: "white",
                    };
                  }
                }
              }
              return {};
            }}
          />
        ))}
      </ScrollWrapper>
      <FinalGrid
        labels={FINAL_GRID_LABELS}
        fill={FINAL_GRID_FILL}
        getAdditionalCellFillStyles={() => ({ fontSize: "12px" })}
        getAdditionalCellStyles={({ row, column }) => {
          const styles: CSSProperties = {
            width: "20px",
            height: "20px",
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- hard-coded arrays
            backgroundColor: FINAL_GRID_COLORS[row]![column],
          };
          if (column === 0) {
            styles.fontWeight = "bold";
          }
          return styles;
        }}
      />
    </>
  );
};

export default Solution;
