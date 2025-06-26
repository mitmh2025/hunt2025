import React from "react";
import { styled } from "styled-components";
import { reduceCoordinatesToIndices } from "../../components/Crossword";
import LinkedImage from "../../components/LinkedImage";
import { AuthorsNote } from "../../components/PuzzleLayout";
import image from "./assets/image.png";

const StyledP = styled.p`
  white-space: pre;
  font-family: "Roboto Mono", monospace;
`;

const StyledTable = styled.table`
  margin: 1em 0;
`;

const StyledTd = styled.td<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

const BLOCK = [
  "XÆESHHAAHELRRRGRPXLXUKAALSIAYTISTIANOTUFRRKOTODITISHUNAFYTEXRIKNBAA",
  "ISDAUOEIOHWDELURXTEPYONPOOEEMRBTTXELRFQFSALOTMRZFXNMKIDADNAQIDOMITI",
  "LACDLTJEESAMJFSVSDEEEFRHSSEHXXRWITHARSGASEHWABEOHINREPEEIVYPLENWECL",
  "BINDRHRNACHRHNTAMDENBRDELMLHERWSRNGRSEWLOREFEDFEEÆSYRAIIRIIETWDTÆBA",
  "YAXXEIPTYOOECPWDBHAHDDGFTGCLERHCHWAMOHHTUNOHTCGNRMWIFOWEEHMCHTHTUOE",
  "EXMDARZHDIDEEREHXTNBSAERMEUHOVRSFNIPKMOMDCTWRDXOKDEELDELOPIHFHZFLAE",
  "IFWXOTFLDEIDLRSDNMAFEIEEVRKHSKIHTENHOEASEMKECZAXNETEVATKREESXRCSORN",
  "ULSGOPFKBOSEWLLTQDLFNPLMIOFNLOCEEYETRMNTROSNDDORYGEFWPQSTJKRRNEONSE",
  "NUCRIAHFYOKLSXBPHSOEELBITCSYIPCZCFFYLMOEMRBNDFAERTTENDFTTOEUIEIIING",
  "IDTERNVEPHLWUIOTODHBBHAXPDRKHZEOFPQFOKSFFFUUNQNUAYWFXMXUFWJLATLFERU",
  "TTDSCDAQHRKTHHHSZJDNEETHMEREASFUCMGBILIURNRVNEEOCLNLJDNINSNERALEDCA",
  "GMHSMDESINVHUTUHYDAYYNSAULIOFITEIERCCWCREEGENTTWENRKNISEOEMBEBEHTFE",
  "EMOIOTGGEKQUXGCTDRDNXIECSRNDECACMHGSHIKDNKCEIEFJLPUXOVIPCZRAEUCRRUI",
  "ARUVNGUXWQTSACBWNEFPIRSDDEYXIDWKUHJEEMEFRHAICTUOPDFROEKNOOHABVPUEKI",
  "RXVAELGHPIHEFPNGFEGEEAEKKLRRMIVOELNDIRECODETECIXNHEWEXNVHABLZHIGEXJ",
  "TWXPNDERHETMENCONRFHWNAIPUHPNLGZXGEOJEVSTEOJEUHJPSUVRVPEMMNOHUEANAA",
  "SHTHJHITEYXHRDJLFSTYFIDSEDINRRGXWHEPNFEAEEKERRPBAFGNAOVARVRFXWHYDAP",
  "EIURVGASRLWIANNECATCMBIEHYTIDILOXRNHNNXNHVDAGEYGNGOFOLXESHNGGDSIDHT",
  "OAIFGRHNSRCANOVLSREAESXEEDEOCNEHSIHSAFNCSJSQMBGLFEIRBSIISEUEDWFSODP",
  "LTHZECHXOIDENCEPASLVNPWILHMEHLOIOOJZETYFZMIIOXHHERILNOSHEADONNEPHAW",
  "NOLHHROREPMPHNIDVCMERTSEUFCWEIATMCHAMNTEBHERURBEDAESNNSNTGRQFXNRINO",
  "IVESGXTEDCPEDLOINAFOWIEWDEWSCEETUITEDNEGUEGAMVFBDTSEIGSESGCEFAPUDEL",
  "ASNODUCPGTHXSJTATDXCXNHRTPNNZSRIDHOGITMNIEAMNILETOPJRECIEEIQOANEDAN",
  "PHMHAPVMZVNOHAAEENSLVENGSISPSVVPEVEEUDRGOUHIKHYJMONFHBTVBDCILIIAEAN",
  "XIIPFREESWDZAWIAOHKALIMNNRRHHTIANRPDROTFLGFHRHBNRACEHXIDOZKNNKEXTCD",
  "HUXVFMKGXSLMMEYENFBIINIAEIAONJOCERDRHVRIGUOEDOOHHDLXHBOITVGAOHTHMOB",
  "PDZAEOEMIDIBQHGHODUWMEELNDQYWHSZODERBPRDIHRHHDTTIFQEZSFDOTDRFGIEELN",
  "EWUPETJPDCESENVRIDAUCEDCWAERUAHSDGARLUEOPDRREZCNEEROPADGVBECJGAATIH",
  "XJENNGLANDWDELECPSEEGEDPDNSESGIAUCNHQPUCZKKGPFIAXZNSLPWGTTTPIECLDAD",
  "TCIEOMTOEJIHAEHEBEBIEEIATHENONSWCTNDTRRCMGEXLLVLNUTUZHNUHADIEGNCLNT",
  "ENFNIODIEDWOEETLLWJOBCGSBWNENDMBECAMEPTUNQIZDBDIZIRRHXLEXTGHUMLTZCT",
  "ROETJATAJBSMXNOEPNCEORCEHTHIDDIFIDFEHFOVHDRSYNEHNELPERQIPOAGANASEOM",
  "NACNGPEUOEONDYMEMCPWNAOAUEELCIIICDGIWHSPXCEEAXEOPSHTUSMWOBERTISPRNH",
  "WETPENVDSRNESUIEIENPJPHENMDRIMIDUCOOVHETEHEEASADVSIWAHGRFNHBBEIPPHN",
  "OCEXAITHHOUXZBEEHDHVXUTSAFNVOZSCWVÆONNHBBWXLEULYEIOXTERIBFKRCUSIEDE",
  "RKPZWVZLKLYNHYSBATFHSCEREGETWWNPOSOEOZALOHCQVIREPMEIVEOSASSEHNEKNAR",
  "CAVRIFUHSNOVDDZNOGDEIRXCEONCREEFINEETOTNEEYEDOERMOSNXLSDVRWPADAZHVO",
  "EIEXUHYIDDHCTPKXABHNANKWBEWIIVHINBQFUKVOLNXIRPAOSCEHRELADXEMGMPOICA",
  "HXGNRGANOAXRIAOISATGLEEGFTEDEENENFLFXIAINHAWNOEOFUXTTETHHRAQNRXGIGD",
  "LTGJBTUXURUJJIVSTBNAZANEAGREEEEOAXXENXFDSEHLWHCHNHHOHPHBRPBNNRUEOVE",
  "DNENEHAITIEIDXXHDHHIMRHCTFXNEQHSBYNSSFRIHREAFOMEEEEREQTWQIUQMFBZIAD",
  "TDNRXYVOUBZIANRUIHOLNOIRDNEDETWNNGNNARKFUENADGGBJFJBJGRAZHPNIEKGPLT",
  "LSXEOWEXHDERTBQNRBFOESHGNIVWEBDIACHIEVELEEKVIATQEGFNXDOHFRTEEPNSERO",
  "WKFASNBLDMKEEKGUIAAEEVNOSXLAREXEEEVASJEGEROLUALNOXDWLBNOEOTHTTAYASC",
  "HEIPEIESYBDLEBSNZTFFCDAOXRBHDHRECNARFDFDWITMEWDEERCEOXERTSHHSEPINHO",
  "NMIBAXTAECRSWSFNCFYHEROAPWENIIVTBSAWOKENATARYTWRLEWNDROVINHISCIWAGE",
  "DELXIEABCTSAENORUTDPYLRRFSUOPRAOHFIMHKHDNWNEHOPIIIDECXCDDTZOOWALUHO",
  "EVXUSOXVNHRLLLEIGMVEARTYFOEMPIRDEMELCROAIKIEMZEXPIRJWHESNPWRLOLPVIB",
  "DCHXOHFELDASIULHHERGUOAESEREGNMEXHUBHUEKRINESRBISXDXDBHXIHEGNEEKINB",
  "OOBDRSAREPHRWDTWJLAAMFMKWVDXMRBLJAMBMNURVRIDSHHIIRVCMMNIRFAORHMUHTP",
  "RFIOIRUDDEHEATMZEMVBREIZEEISAXQGTSGIXAJODXNIWSZLDXRLOAIGTHUANBHWHAL",
  "ENFNUXIRNELIAOTUCOPTISALEOVIAUMBGONTONERCRTCWAITREIEBSTBHUZAIIENDLN",
  "RIGAEOXNDMLBGHWLGMKGOTORPOXHHLTISISDYZPERHVETATMEESOSNAEIVURFRZEOTD",
  "RBLMTIHTTNNUDNUDHCDIKOTZCOCNTTEBDXOREDPNEQEEGORTIBSEAVYZONUAIESEWXP",
  "GASRRTACKINXLIESBOCEMEREVRDERESRNETTGMISVFEWFYFROMORGWISERIEERIOIOJ",
  "RTCHAMPTLMXRSOTDNREIIDHOHMEGODGEWHENEAIUXOIVTEUPMXIVJDQQKRRMBHONQLX",
  "RTASWOHELITHNARHXOVERTELDCWRNEERPFOEGERRACODXLGXNELTTNOHASCCMAKEOVN",
  "LLENNJPHSOACEHAYZHNDGXIDGRPTTREWKIWOCZMUBLILRNGJEOBOINHSALDNUHWNTWX",
  "LXETONCHZMIEHEOTTLSAHKRNEXSLDXAHAETNEBQEINRDSVNERBINNCBWNENHHUKSDCI",
  "OEEOHNGNTWLGDMNPAWIWDFHTXMBENNBXTNDHRINWNNEGLRRNTEUEXNPIDIAEOPDMGNL",
  "AFPFFSANDODTDBDTAOOTPDCTZNRKXFMMDERÆNTIHEFEFDTVBOSLONXOKIDRGRRUEXEO",
];

const CIRCLES: {
  circle: string[];
  highlights: Set<number>;
  redHighlight: number;
}[] = [
  {
    circle: [
      "    OOOOOOO",
      "   O       O",
      "  O         O",
      " O           O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      " O           O",
      "  O         O",
      "   O       O",
      "    OWEXHOO",
    ].map((line) => line.padEnd(15, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 14, col: 5 },
        { row: 14, col: 6 },
        { row: 14, col: 7 },
      ],
      15,
    ),
    redHighlight: 14 * 15 + 8,
  },
  {
    circle: [
      "     OOOOO",
      "    O     O",
      "   O       O",
      "  O         O",
      " O           O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      " O           O",
      "  O         A",
      "   O       E",
      "    O     X",
      "     OOOOH",
    ].map((line) => line.padEnd(15, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 11, col: 12 },
        { row: 12, col: 11 },
        { row: 13, col: 10 },
      ],
      15,
    ),
    redHighlight: 14 * 15 + 9,
  },
  {
    circle: [
      "      OOOOOOO",
      "     O       O",
      "    O         O",
      "   O           O",
      "  O             O",
      " O               O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      " O               O",
      "  O             O",
      "   O           O",
      "    O         N",
      "     O       A",
      "      OOOOOEM",
    ].map((line) => line.padEnd(19, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 17, col: 13 },
        { row: 18, col: 12 },
        { row: 18, col: 11 },
      ],
      19,
    ),
    redHighlight: 16 * 19 + 14,
  },
  {
    circle: [
      "      OOOOLURX",
      "     O        O",
      "    O          O",
      "   O            O",
      "  O              O",
      " O                O",
      "O                  O",
      "O                  O",
      "O                  O",
      "O                  O",
      "O                  O",
      "O                  O",
      "O                  O",
      " O                O",
      "  O              O",
      "   O            O",
      "    O          O",
      "     O        O",
      "      OOOOOOOO",
    ].map((line) => line.padEnd(20, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 0, col: 10 },
        { row: 0, col: 11 },
        { row: 0, col: 12 },
      ],
      20,
    ),
    redHighlight: 13,
  },
  {
    circle: [
      "      OOOOOOO",
      "     O       O",
      "    O         O",
      "   O           O",
      "  O             O",
      " O               O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 B",
      "O                 A",
      " O               H",
      "  O             A",
      "   O           O",
      "    O         O",
      "     O       O",
      "      OOOOOOO",
    ].map((line) => line.padEnd(19, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 12, col: 18 },
        { row: 13, col: 17 },
        { row: 14, col: 16 },
      ],
      19,
    ),
    redHighlight: 11 * 19 + 18,
  },
  {
    circle: [
      "   OOOOOO",
      "  O      O",
      " O        O",
      "O          P",
      "O          A",
      "O          I",
      "O          X",
      "O          O",
      " O        O",
      "  O      O",
      "   OOOOOO",
    ].map((line) => line.padEnd(12, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 4, col: 11 },
        { row: 5, col: 11 },
        { row: 6, col: 11 },
      ],
      12,
    ),
    redHighlight: 3 * 12 + 11,
  },
  {
    circle: [
      "    OOOOOO",
      "   O      A",
      "  O        F",
      " O          E",
      "O            H",
      "O            O",
      "O            O",
      "O            O",
      "O            O",
      " O          O",
      "  O        O",
      "   O      O",
      "    OOOOOO",
    ].map((line) => line.padEnd(14, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 1, col: 10 },
        { row: 2, col: 11 },
        { row: 3, col: 12 },
      ],
      14,
    ),
    redHighlight: 4 * 14 + 13,
  },
  {
    circle: [
      "     OOOOOO",
      "    O      O",
      "   O        O",
      "  D          O",
      " A            O",
      "N              O",
      "X              O",
      "O              O",
      "O              O",
      "O              O",
      "O              O",
      "O              O",
      " O            O",
      "  O          O",
      "   O        O",
      "    O      O",
      "     OOOOOO",
    ].map((line) => line.padEnd(16, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 4, col: 1 },
        { row: 5, col: 0 },
        { row: 6, col: 0 },
      ],
      16,
    ),
    redHighlight: 3 * 16 + 2,
  },
  {
    circle: [
      "     OOOOO",
      "    O     O",
      "   O       O",
      "  O         O",
      " O           O",
      "O             O",
      "O             O",
      "P             O",
      "M             O",
      "E             O",
      " X           O",
      "  O         O",
      "   O       O",
      "    O     O",
      "     OOOOO",
    ].map((line) => line.padEnd(15, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 7, col: 0 },
        { row: 8, col: 0 },
        { row: 9, col: 0 },
      ],
      15,
    ),
    redHighlight: 10 * 15 + 1,
  },
  {
    circle: [
      "     HOOOO",
      "    X     O",
      "   E       O",
      "  F         O",
      " O           O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      " O           O",
      "  O         O",
      "   O       O",
      "    O     O",
      "     OOOOO",
    ].map((line) => line.padEnd(15, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 1, col: 4 },
        { row: 2, col: 3 },
        { row: 3, col: 2 },
      ],
      15,
    ),
    redHighlight: 5,
  },
  {
    circle: [
      "    OOOOOO",
      "   O      O",
      "  O        O",
      " U          O",
      "R            O",
      "O            O",
      "C            O",
      "O            O",
      "O            O",
      " O          O",
      "  O        O",
      "   O      O",
      "    OOOOOO",
    ].map((line) => line.padEnd(14, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 3, col: 1 },
        { row: 4, col: 0 },
        { row: 5, col: 0 },
      ],
      14,
    ),
    redHighlight: 6 * 14,
  },
  {
    circle: [
      "   DOOOO",
      "  E     O",
      " H       O",
      "X         O",
      "O         O",
      "O         O",
      "O         O",
      "O         O",
      " O       O",
      "  O     O",
      "   OOOOO",
    ].map((line) => line.padEnd(11, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 0, col: 3 },
        { row: 1, col: 2 },
        { row: 2, col: 1 },
      ],
      11,
    ),
    redHighlight: 3 * 11,
  },
  {
    circle: [
      "   OOOOOO",
      "  O      D",
      " O        X",
      "O          E",
      "O          H",
      "O          O",
      "O          O",
      "O          O",
      " O        O",
      "  O      O",
      "   OOOOOO",
    ].map((line) => line.padEnd(12, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 1, col: 9 },
        { row: 2, col: 10 },
        { row: 3, col: 11 },
      ],
      12,
    ),
    redHighlight: 4 * 12 + 11,
  },
  {
    circle: [
      "      OOOOOOO",
      "     R       O",
      "    X         O",
      "   H           O",
      "  C             O",
      " O               O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      "O                 O",
      " O               O",
      "  O             O",
      "   O           O",
      "    O         O",
      "     O       O",
      "      OOOOOOO",
    ].map((line) => line.padEnd(19, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 1, col: 5 },
        { row: 2, col: 4 },
        { row: 3, col: 3 },
      ],
      19,
    ),
    redHighlight: 4 * 19 + 2,
  },
  {
    circle: [
      "    OOOOO",
      "   O     O",
      "  O       O",
      " O         O",
      "O           O",
      "O           O",
      "O           R",
      "O           O",
      "O           N",
      " O         X",
      "  O       O",
      "   O     O",
      "    OOOOO",
    ].map((line) => line.padEnd(13, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 6, col: 12 },
        { row: 7, col: 12 },
        { row: 8, col: 12 },
      ],
      13,
    ),
    redHighlight: 9 * 13 + 11,
  },
  {
    circle: [
      "     OOOOOO",
      "    O      O",
      "   O        O",
      "  O          O",
      " O            O",
      "O              O",
      "T              O",
      "O              O",
      "R              O",
      "B              O",
      "O              O",
      "O              O",
      " O            O",
      "  O          O",
      "   O        O",
      "    O      O",
      "     OOOOOO",
    ].map((line) => line.padEnd(16, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 6, col: 0 },
        { row: 7, col: 0 },
        { row: 8, col: 0 },
      ],
      16,
    ),
    redHighlight: 9 * 16,
  },
  {
    circle: [
      "   OOOOO",
      "  O     O",
      " O       L",
      "O         U",
      "O         X",
      "O         R",
      "O         O",
      "O         O",
      " O       O",
      "  O     O",
      "   OOOOO",
    ].map((line) => line.padEnd(11, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 2, col: 9 },
        { row: 3, col: 10 },
        { row: 4, col: 10 },
      ],
      11,
    ),
    redHighlight: 5 * 11 + 10,
  },
  {
    circle: [
      "    OOOOO",
      "   O     O",
      "  O       O",
      " O         O",
      "O           O",
      "O           O",
      "O           O",
      "O           H",
      "O           E",
      " O         M",
      "  O       A",
      "   O     O",
      "    OOOOO",
    ].map((line) => line.padEnd(13, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 8, col: 12 },
        { row: 9, col: 11 },
        { row: 10, col: 10 },
      ],
      13,
    ),
    redHighlight: 7 * 13 + 12,
  },
  {
    circle: [
      "   OOOOO",
      "  O     O",
      " O       O",
      "O         O",
      "R         O",
      "X         O",
      "U         O",
      "L         O",
      " O       O",
      "  O     O",
      "   OOOOO",
    ].map((line) => line.padEnd(11, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 5, col: 0 },
        { row: 6, col: 0 },
        { row: 7, col: 0 },
      ],
      11,
    ),
    redHighlight: 4 * 11,
  },
  {
    circle: [
      "    OOOOOO",
      "   O      O",
      "  O        O",
      " O          O",
      "O            O",
      "O            O",
      "O            O",
      "O            T",
      "O            X",
      " O          I",
      "  O        N",
      "   O      O",
      "    OOOOOO",
    ].map((line) => line.padEnd(14, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 8, col: 13 },
        { row: 9, col: 12 },
        { row: 10, col: 11 },
      ],
      14,
    ),
    redHighlight: 7 * 14 + 13,
  },
  {
    circle: [
      "    EHOOO",
      "   X     O",
      "  P       O",
      " O         O",
      "O           O",
      "O           O",
      "O           O",
      "O           O",
      "O           O",
      " O         O",
      "  O       O",
      "   O     O",
      "    OOOOO",
    ].map((line) => line.padEnd(13, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 0, col: 4 },
        { row: 1, col: 3 },
        { row: 2, col: 2 },
      ],
      13,
    ),
    redHighlight: 5,
  },
  {
    circle: [
      "     OOOOOO",
      "    O      O",
      "   O        O",
      "  O          O",
      " O            O",
      "O              O",
      "O              O",
      "O              O",
      "O              O",
      "O              O",
      "O              O",
      "O              O",
      " O            O",
      "  O          O",
      "   O        O",
      "    O      O",
      "     OCEHXO",
    ].map((line) => line.padEnd(16, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 16, col: 6 },
        { row: 16, col: 7 },
        { row: 16, col: 8 },
      ],
      16,
    ),
    redHighlight: 16 * 16 + 9,
  },
  {
    circle: [
      "     OOOOOO",
      "    O      O",
      "   O        O",
      "  O          O",
      " O            O",
      "O              O",
      "O              O",
      "R              O",
      "E              O",
      "I              O",
      " G            O",
      "  O          O",
      "   O        O",
      "    O      O",
      "     OOOOOO",
    ].map((line) => line.padEnd(16, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 8, col: 0 },
        { row: 9, col: 0 },
        { row: 10, col: 1 },
      ],
      16,
    ),
    redHighlight: 7 * 16,
  },
  {
    circle: [
      "   OOOOOO",
      "  G      O",
      " O        O",
      "M          O",
      "I          O",
      "O          O",
      "O          O",
      "O          O",
      " O        O",
      "  O      O",
      "   OOOOOO",
    ].map((line) => line.padEnd(13, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 2, col: 1 },
        { row: 3, col: 0 },
        { row: 4, col: 0 },
      ],
      13,
    ),
    redHighlight: 15,
  },
  {
    circle: [
      "    OOOOOOO",
      "   O       O",
      "  O         O",
      " O           O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      "O             O",
      "N             O",
      " E           O",
      "  B         O",
      "   X       O",
      "    OOOOOOO",
    ].map((line) => line.padEnd(15, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 10, col: 0 },
        { row: 11, col: 1 },
        { row: 12, col: 2 },
      ],
      15,
    ),
    redHighlight: 13 * 15 + 3,
  },
  {
    circle: [
      "     OOOOOO",
      "    O      O",
      "   O        O",
      "  O          O",
      " O            O",
      "O              O",
      "O              O",
      "X              O",
      "S              O",
      "I              O",
      " H            O",
      "  O          O",
      "   O        O",
      "    O      O",
      "     OOOOOO",
    ].map((line) => line.padEnd(16, " ")),
    highlights: reduceCoordinatesToIndices(
      [
        { row: 7, col: 0 },
        { row: 8, col: 0 },
        { row: 9, col: 0 },
      ],
      16,
    ),
    redHighlight: 10 * 16 + 1,
  },
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <AuthorsNote>
        This puzzle was written and tested but held in reserve in case we needed
        to make a last-minute swap, but was not released during Mystery Hunt. As
        such, it has a placeholder answer and will not grant you a key for
        solving.
      </AuthorsNote>
      <p className="puzzle-flavor">
        I went to Mexico in April last year and enjoyed a beer with lime on the
        beach. No wait, maybe that wasn’t a beer…
      </p>
      <StyledP>
        {BLOCK.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </StyledP>
      {CIRCLES.map(({ circle, highlights, redHighlight }, i) => (
        <StyledTable key={i}>
          {circle.map((line, j) => (
            <tr key={j}>
              {line.split("").map((char, k) => {
                const index = j * line.length + k;
                let color = "#ffd966";
                if (highlights.has(index)) {
                  color = "#e69138";
                } else if (redHighlight === index) {
                  color = "#cc0000";
                }
                return (
                  <StyledTd $color={color} key={k}>
                    {char}
                  </StyledTd>
                );
              })}
            </tr>
          ))}
        </StyledTable>
      ))}
      <hr />
      <LinkedImage
        src={image}
        alt="A graph over a rendering of the Moon. To the left is written: NASA Cafe. Kids menu activities: Fun facts about the moon! The graph is annotated. In the top left quadrant: pole / cap. In the top right quadrant: meridian / vertical / longitude. In the lower left quadrant: equator / belt / latitude. In the lower right quadrant: mare (pl. maria) / sea."
      />
    </>
  );
};

export default Puzzle;
