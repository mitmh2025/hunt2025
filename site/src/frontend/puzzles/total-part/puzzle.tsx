import React, { type CSSProperties } from "react";
import { styled } from "styled-components";
import Crossword, { type CrosswordProps } from "../../components/Crossword";

export const StyledCrossword = styled(Crossword)`
  margin: 1em auto;
`;

// Yellow, Red, Gray, Green, Blue, Pink, white, black
type Color = "Y" | "R" | "G" | "N" | "B" | "P" | "_" | ".";

export const COLOR_TO_HEX = {
  Y: "#ffe599",
  R: "#d26666",
  G: "#cccccc",
  N: "#b6e6a8",
  B: "#a4c2fa",
  P: "#f4cccc",
  _: "white",
  ".": "black",
};

export function makeGrid(grid: string[]): string[][] {
  return grid.map((row) =>
    row.split("").map((char) => (char === "_" ? "" : char)),
  );
}

export function mapShorthandToColor(shorthand: string[]): string[][] {
  return shorthand.map((row) =>
    row.split("").map((char) => COLOR_TO_HEX[char as Color]),
  );
}

export const DROPQUOTE_1_LABELS: string[][] = makeGrid([
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "__.______.___._._____._____._____.___.__.____",
  ".___._____._._____.____.____._.___._._____.__",
  "__._._________.____.___.____._______.____.___",
  "._______._._____.__._____________.__.____.___",
  "_.______.__.________.______._____._._____.___",
  "___.___.___.______.__.____.___._____.________",
]);
const DROPQUOTE_1_FILL: string[][] = makeGrid([
  "_____AR__________N____W_TO___I_Y______AS___H_",
  "___A_CO__A__TSAOEY__H_O_ST___R_W__NE_OMEE_EL_",
  "DPGLMOES_BGEVISGTMNGRAMHWEYTGMIWR_LG_FCIS_WTE",
  "OYARAPKIUELBEGLIAIEGIODINHNEATIOSIOA_TRELNRSL",
  "IOEAOBITCIYASDALZMYFNJCAGNEGWELSNSNGTMRAMTTIL",
  "SGOUWHBOHTDOFAONTOUIHNVESHINHEALAOAFLGHOTESPO",
  "________,_________________?_____,____________",
  "____________________________________________.",
  "_.___________________________________________",
  "_______._____________________________________",
  "________________________________,____________",
  "____________________________________________.",
]);
export const DROPQUOTE_1_COLORS: string[][] = DROPQUOTE_1_FILL.slice(0, 6).map(
  (row) => row.map((cell) => (cell === "" ? "inherit" : COLOR_TO_HEX.Y)),
);

export const DROPQUOTE_2_LABELS: string[][] = makeGrid([
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "______.___._.____.___.____.___._____._______.",
  "_._____.______.___._____.____.________.__.___",
  ".________.__.________.____.___.____._._______",
  "_._____._._______._______.____.____._____._._",
  "___.___.______.__._________._______.__.___.__",
  "___.___.___.__._._____.____._______.______...",
]);
const DROPQUOTE_2_FILL: string[][] = makeGrid([
  "____IU__C______A___RD__I____E__NIX_____NE____",
  "T_D_THE_M_CN_E_ON_RIC_ICID__PA_BOJO_I__HI____",
  "AIMBOHI_AANERN_EN_ONTRQULLLTNK_NQED_THILL_W_P",
  "DIAOTYE_GHNCKELICHHELIFWEBYISOIWTEO_WRIOQSIMA",
  "JOLBNBENASAGOGAHEDAISEWUTTPTWOIMANNRSOMURTIRE",
  "AEHNOSTWTOEAUTOADTKLAPGEEHHUEHLIHUGRAFAHEUSAS",
  "___________________________________________:_",
  "_____________________________________._______",
  "_____________________________________________",
  "__________________________________.__________",
  "_____________,_______________________________",
  "__,______________________________________.___",
]);
export const DROPQUOTE_2_COLORS: string[][] = [
  ...DROPQUOTE_2_FILL.slice(0, 4).map((row) =>
    row.map((cell) => (cell === "" ? "inherit" : COLOR_TO_HEX.Y)),
  ),
  ...mapShorthandToColor([
    "YRYYRYYYRYYYYRYYYYYRYYYYRYYRYRYRRYYYYYYYYRYYY",
    "RYRYRRYRYRYRRYRRRYRYRYRRYRYRRYRYYRYRYRRYRYRYR",
  ]),
];

export const DROPQUOTE_3_LABELS: string[][] = makeGrid([
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "___.___._____.__.__.______.___________.____._",
  "_____.___.___.____._____.____._____.__.____._",
  "___._______.____.___.___._________.______.___",
  "__.____.___.________._________._____.___.____",
  "____._._______.____.___.___._______.________.",
  "____._______._____._._____.__.___.___________",
]);
const DROPQUOTE_3_FILL: string[][] = makeGrid([
  "_E_______C_______U____R__F_____HE___M________",
  "RL_E_EEAING____URI_A_GH__TOT___EE_E_AE_T_IR_F",
  "NR_F_TMUGHEE__JEBARE_INOSNUAOI_DTHSYVNLEWGI_I",
  "EOMY_IOLTYTEBMUELTATDCDEYTDSDETIVEROEAYOIFNOS",
  "ESSEFABNARTDDLOSSFTLHTHEGOTREDLAHNSYDLREHDNVS",
  "TORHROMDATEHIEPNAIYACIUGUHHRBTDKENPEDYRWIIEGM",
  "______________________________-______._“_’___",
  "____,________________________________________",
  "_____________________________________________",
  "____________________________.”_“_____________",
  "__,”_________,_“_____________________________",
  "__________?”_“_____________________________.”",
]);
export const DROPQUOTE_3_COLORS: string[][] = [
  ...DROPQUOTE_3_FILL.slice(0, 4).map((row) =>
    row.map((cell) => (cell === "" ? "transparent" : COLOR_TO_HEX.Y)),
  ),
  ...mapShorthandToColor([
    "YYYGYRYGYYRGYYYRYGYYYYYYGYGYYRYGGYYYRYYYYYYYR",
    "RGRGYYGYRGYRYGYRGRGGRRRRYGGRYGYGRRGYGYYRRGRYG",
  ]),
];

export const DROPQUOTE_4_LABELS: string[][] = makeGrid([
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_.___.___._____.__.___.____._____.______.___.",
  "_____.__.____.________.___.______._____.__.__",
  "______.___.__.__.________._____.__.______.___",
  ".__._.______.___.________._____._________.___",
  "____.__.____._._______.__.____._________.____",
  "_.___.___._.____.____.___.____.___.____._____",
]);
const DROPQUOTE_4_FILL: string[][] = makeGrid([
  "H___D____________BE_E_______HH__H___OLO______",
  "A___A_EBU____ARL_PIOG_HOD__IHA__RE_HTLL___REC",
  "POSED_TOTATK_IHP_SKADERIF_WONEE_EC_TARY_D_ATA",
  "LLTEM_ANDOIASALEACONTEEDH_MTRETHII_TUEN_HATED",
  "IAHIEHIEMTOOWANDCNHAUTLEM_MITGSRNSEGTDEESCZRD",
  "SMIKTTFHRHOEDLYEEIIHVSDTUESCHRETEAGNNRNUHAENE",
  "_____________________________________________",
  "___________’____________________._“__,”______",
  "_____,________________________,______________",
  "________________________._“__________________",
  "___,___________________________________!_____",
  "___________________________________________!”",
]);
export const DROPQUOTE_4_COLORS: string[][] = [
  ...DROPQUOTE_4_FILL.slice(0, 4).map((row) =>
    row.map((cell) => (cell === "" ? "transparent" : COLOR_TO_HEX.Y)),
  ),
  ...mapShorthandToColor([
    "RYYYGYYGYYYYYRYYYRYYYYGYY_YYYGYYRYYGYRYYYYYYG",
    "GNYGNNGRGRNGRNGRGNGRGNGRRYNRGNGRNGYYGNNYRRGNR",
  ]),
];

export const DROPQUOTE_5_LABELS: string[][] = makeGrid([
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "___._________.___._______.____.__.___._____._",
  "_______.__.___.________._____.____.___._____.",
  "____._._____._______._____._.______.___._.___",
  "__.____.________.__._______.____._____._____.",
  "___.____._______.__.___.___.____._.______.___",
  "_.__.__.___.________.________.__.___________.",
]);
const DROPQUOTE_5_FILL: string[][] = makeGrid([
  "OT___AG____E_________T________T_________R____",
  "TA_M_RASOFLQEIST_____OE_T_U_S_NH_T_FP__LE_DDO",
  "HEDTCINWIPMEGFNTEH_S_IKOE_E_TOTEDIIOAE_GE_LMQ",
  "YONIIAPMLURTHEUROASRCHRLI_ERWGREATEBEYSSONSOR",
  "TIITLIRYTYKENSIWLNHTPLMERRFILHAAFRYEXMATGICEN",
  "HECCELELMGFTESYASAUTIKCAHDPIEKNTHIRMHEMWILNUR",
  "_____________________________________________",
  "______________________._“____________________",
  "_________________________.____________;______",
  "’____________________________________________",
  "_______________._______________,_____________",
  "___________________’______________________.”_",
]);
export const DROPQUOTE_5_COLORS: string[][] = mapShorthandToColor([
  "YY___BB____Y_________B________Y_________Y____",
  "YY_B_YYBYBYBYYYY_____YY_Y_B_Y_BY_Y_BB__YB_YYB",
  "BBYYBYYBYYBYBBYBYB_B_YBBY_Y_BYBYBYBYYY_YY_YBB",
  "BBBBYYBYBYYBYYBYYYYYYBYYB_YYYBYBYBYBYBYBYBBYB",
  "RBYYBBGBYYBBRBYGBYBYBGBRYYBYBBYYYYBGBBGYBYRYY",
  "NGRNGRNBGNGRGBBNRGYNBRGYBNNGRRGNGBYRNYRRNGGBN",
]);

export const DROPQUOTE_6_LABELS: string[][] = makeGrid([
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_____________________________________________",
  "_._______.__.___._________._______.__________",
  "._________.___.___._________.______.______.__",
  ".__________.___.________.__________.____._.__",
  "______.___._______.__._____.___._______._____",
  "_.____.___.___._____._______.____.___._______",
  ".__________.____.___.___.___.______.___._____",
  "_.______.______.___._.____.____.___._____....",
]);
const DROPQUOTE_6_FILL: string[][] = makeGrid([
  "_____S____O___E_______O______I_A_________S___",
  "__EHBEE_SNY_DDR____E__AI__O_EAHRR_S__F___M_DE",
  "ETNGAJRHTHUHAEWAR_ERR_LNS_O_OATOUSUR_EW_PAHEA",
  "OMISHTFYIAGMKRTTGOTRWFOUOTC_DRECROTUHCDESINDE",
  "PNOATRWIHRAYAYASEULHICUMABEHLXTBHECODIONGBRGL",
  "TFTRATTSNEDGODHERMCATMEVTNTDSHAROHDTTHSUHORLE",
  "IOSLRLETDYTBHTHNULNRTAAHSYTTRCNESTSFWESLATIYO",
  "_________________________________,___________",
  "_____________________________________________",
  "__________________________________.__________",
  "__________________________,__________________",
  "____________________________________________,",
  "_____________________________________________",
  "._“________’__,________________________.”____",
]);
export const DROPQUOTE_6_COLORS: string[][] = mapShorthandToColor([
  "_____P____B___Y_______P______Y_Y_________P___",
  "__PYBYY_BYB_PBB____Y__YP__Y_BYYPY_Y__B___P_PB",
  "BYBBYBYYPPBPYYBPB_BPB_YYY_Y_YYBYPYPB_YP_PYPYP",
  "PYPYBPBYYBPYBBYPBYYYBYBYPYY_BPYBBYYBYBYPYYYBB",
  "YBYBBPPYPYYBYPYYYPYBPBPPYBYYBPPBBYBYPYYYBPBYY",
  "BPGYRGPPPBBPBPBRBPBYYPRPBYBPYPYGPBPBRYBYGYPRP",
  "NGRRNGNBRGGNBNBPPGNNRGNGRBNYNGRNGPNBYNBNGNRNG",
]);

const DROPQUOTES: {
  labels: string[][];
  fill: string[][];
  colors: string[][];
  divider: number;
}[] = [
  {
    labels: DROPQUOTE_1_LABELS,
    fill: DROPQUOTE_1_FILL,
    colors: DROPQUOTE_1_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_2_LABELS,
    fill: DROPQUOTE_2_FILL,
    colors: DROPQUOTE_2_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_3_LABELS,
    fill: DROPQUOTE_3_FILL,
    colors: DROPQUOTE_3_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_4_LABELS,
    fill: DROPQUOTE_4_FILL,
    colors: DROPQUOTE_4_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_5_LABELS,
    fill: DROPQUOTE_5_FILL,
    colors: DROPQUOTE_5_COLORS,
    divider: 5,
  },
  {
    labels: DROPQUOTE_6_LABELS,
    fill: DROPQUOTE_6_FILL,
    colors: DROPQUOTE_6_COLORS,
    divider: 6,
  },
];

type ColoredDropquoteProps = CrosswordProps & {
  colors: string[][];
  divider: number;
};

export const ColoredDropquote = ({
  labels,
  fill,
  colors,
  divider,
  getAdditionalCellFillStyles,
}: ColoredDropquoteProps): JSX.Element => {
  return (
    <StyledCrossword
      labels={labels}
      fill={fill}
      getAdditionalCellFillStyles={({ row, column }) => ({
        ...getAdditionalCellFillStyles?.({ row, column }),
        fontSize: "12px",
      })}
      getAdditionalCellStyles={({ row, column }) => {
        const styles: CSSProperties = {
          width: "20px",
          height: "20px",
        };
        if (row < colors.length) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- hard-coded arrays
          styles.backgroundColor = colors[row]![column];
        }
        if (row === divider) {
          styles.borderBottomWidth = "2px";
        }
        return styles;
      }}
    />
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      {DROPQUOTES.map(({ labels, fill, colors, divider }, i) => (
        <ColoredDropquote
          key={i}
          labels={labels}
          fill={fill}
          colors={colors}
          divider={divider}
        />
      ))}
    </>
  );
};

export default Puzzle;
