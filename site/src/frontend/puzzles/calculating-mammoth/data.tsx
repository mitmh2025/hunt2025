import React from "react";
import { reduceCoordinatesToIndices } from "../../components/Crossword";

export const GRID = `
##   ###.##.# # ## ....
. ...#  #   .. .# .###.
# ###     ....##.##.# .
.#    ..# ...#     #. .
#..# .#   #   . .#    .
###  #.... .....#   .##
.#    ......# .#       
#  .# #..... .#    ... 
#      ## ..#    .#### 
. ...#   .#. .#  #     
# ##  .# # .##.#   ..# 
#   ..# .# #  # .# # . 
# .###  # .#    # . .# 
.##    .# #.#     # # .
.#  .# #   . ... .#   #
#   ..# . .......#   . 
.# .## .#  .# #.. .# #.
# ..#  #  .# .### #   .
# ##  .# .#  #     .# .
#     .# #    . .# #. .
#         .#  .##..## #
.# . ..# .#   #.###. . 
# .#  . .#  .#     .## 
..# ..# #   #  .#      
.#  #. .# .# ...#  .# .
#    #.#  #  ###  .#  #
#  .# #  . ..#    #    
#  # .# .#  .#  ..#  ..
.#   #.#   .# ..#   .#.
..#     .#       .#   .
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

export const COLOR = `
........    .......    
              .        
..........    .        
              .        
      ........         
......                 
               ........
              .....    
..........    .        
              .........
......                 
                       
   .......             
            .......... 
     ......       .....
....             .     
                 .     
                 .     
                 .     
       .......   .     
..........             
                  .    
                  .    
      ......... .......
 ....             .    
...... ........... .   
       .     ..........
       .           .   
       .           .   
       . ........  .   
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

export const FILL = `
GREATEST HA NEWYORK    
 Y   AIRBASE  W PI SKY 
DEPRESSION    ID CS BE 
 STAGE  OO   WILDHOG M 
I  ME ERZINCAN C GUIDE 
SILENT    O     PANG NP
 NOYOU      TI VALDIVIA
NFL LMI     I JANET   P
CALIFORNIA  RIFLE ROSIE
 V   USAF L E KOREANWAR
BOOMER MALL VA RAMC PB
AREA  LC OCEANIA OKRA A
TO NEWYORK ALKINDI A AG
 FENCES USN VIETNAMWAR 
 RDI REAGAN E   D EDITH
GENX  NA B       MOAN E
 PA ACK MHZ HOP  I TTK 
AE  TAOHUA ZI SYNTHASE 
GADAHN YT TAJUMULCO ON 
ILOILO GULFWAR G HTC Y 
MILLENNIAL ICH IF  ADAM
 NE T  EL TEKOA EDU R O
LG GAS N NPR BALLOT ASH
  AU  RECESSION IRAQWAR
 DEAN A LA ZC   CSH DN 
ZOOMER TURKEYSYRIA BOTH
HOL SNORE Y  UKRAINEWAR
URIST SU POP GKR  URN  
 SALEM MOAT OH  ANDY I 
  NODROP LOCKDOWN ELMO
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

export const GREEN_HIGHLIGHTS = reduceCoordinatesToIndices(
  [
    { row: 0, col: 3 },
    { row: 0, col: 12 },
    { row: 1, col: 10 },
    { row: 1, col: 14 },
    { row: 2, col: 1 },
    { row: 2, col: 3 },
    { row: 2, col: 14 },
    { row: 3, col: 1 },
    { row: 3, col: 15 },
    { row: 4, col: 9 },
    { row: 6, col: 20 },
    { row: 8, col: 3 },
    { row: 13, col: 10 },
    { row: 19, col: 15 },
    { row: 19, col: 21 },
    { row: 21, col: 16 },
    { row: 22, col: 4 },
    { row: 26, col: 22 },
    { row: 28, col: 1 },
  ],
  23,
);

export const BLUE_HIGHLIGHTS = reduceCoordinatesToIndices(
  [
    { row: 4, col: 11 },
    { row: 9, col: 15 },
    { row: 14, col: 10 },
    { row: 19, col: 11 },
    { row: 23, col: 18 },
    { row: 28, col: 19 },
  ],
  23,
);

export const HEADERS = [
  { rowSpan: 5, contents: <strong>I.c.6</strong> },
  { rowSpan: 5, contents: <strong>II.b.2</strong> },
  { rowSpan: 5, contents: <strong>III.d.6</strong> },
  { rowSpan: 5, contents: <strong>IV.b.5</strong> },
  { rowSpan: 5, contents: <strong>V.f.3</strong> },
  { rowSpan: 5, contents: <strong>VI.a.4</strong> },
];

export const FOOTERS = [
  { rowSpan: 5, contents: <strong>??????????</strong> },
  { rowSpan: 5, contents: <strong>??</strong> },
  { rowSpan: 5, contents: <strong>?</strong> },
  { rowSpan: 5, contents: <strong>??</strong> },
  { rowSpan: 5, contents: <strong>??</strong> },
  { rowSpan: 5, contents: <strong>??</strong> },
];

export const ACROSS = [
  [6, "Short Laugh"],
  [12, "Military installation of 58-Across (2 wds.)"],
  [14, "3.14159..."],
  [15, "Household pet"],
  [22, "Driver's license, e.g."],
  [24, "Course 6-3"],
  [26, "Egyptian sun god"],
  [27, "Theatrical location"],
  [28, "Latin character form of James Bond's MI6 agent group"],
  [29, "Untamed pig (2 wds.)"],
  [32, "Yours truly"],
  [35, "A brotherhood"],
  [40, "Sharp attack of mental anguish"],
  [41, "Video game life resource"],
  [43, "Childish insult retort (2 wds.)"],
  [44, "Graphing calculator co."],
  [46, "Most-watched American sports org."],
  [47, "Smaller lion constellation IAU ID"],
  [53, "Hunting tool"],
  [54, "Name often associated with “We can do it!” posters"],
  [58, "American aeronautical mil. service branch"],
  [65, "Collection of stores"],
  [67, "U.S. mil. health org. from 1930 to today"],
  [69, "U.K. mil. health org. from 1898 until a merger in Nov. 2024"],
  [70, "X-ray apron elem."],
  [71, "Acreage"],
  [72, "Tank or resonant circuit"],
  [73, "Geographic region with Australia and New Zealand"],
  [76, "Lady's fingers"],
  [78, "Memo field"],
  [83, "Father of Arab philosophy (hyph.)"],
  [85, "Ashcroft or Holder, e.g."],
  [86, "Slitherlink"],
  [88, "American nautical mil. service branch"],
  [93, "One of two FDA standardized sources for 24-hour nutrient intake"],
  [99, "Salt elem."],
  [100, "Climactic sound"],
  [101, "Father nickname"],
  [102, "Expression of mild alarm"],
  [104, "1,000,000 cycles/second"],
  [105, "Rabbit action"],
  [107, "FPS weapon metric for speed to eliminate an opponent"],
  [109, "Dubai's TLD"],
  [110, "Captain of Supply Corps of Jubilife Village (2 wds.)"],
  [112, "2^70 prefix"],
  [113, "Sometimes used interchangeably with the term “ligase”"],
  [117, "Azzam the American"],
  [120, "Online video serv."],
  [121, "Central America's tallest point"],
  [123, "Power switch position"],
  [124, "Most populous Western Visayas province"],
  [127, "Taiwanese consumer electronics co."],
  [130, "First word of German jelly donut quote"],
  [131, "Programming statement for conditional decisions"],
  [133, "Eve's partner"],
  [136, "Colorful reddish gas-discharge tube elem."],
  [137, "Jane Hopper shorthand"],
  [138, "Jeremiah 6 town to sound trumpet"],
  [140, "MIT TLD"],
  [143, "OLED TV co."],
  [144, "State of matter"],
  [145, "“All Things Considered” network"],
  [146, "Vote method, ideally secret"],
  [147, "Charcoal remains"],
  [149, "First place material"],
  [156, "Second most populous US city"],
  [157, "10^21 value of SI unit for electric charge"],
  [158, "Shanghai Airlines ICAO code"],
  [159, "Abbreviation for the second category of crossword clues (abbr.)"],
  [167, "Ambi-"],
  [169, "Language in Klingon"],
  [170, "Sleep noisily"],
  [174, "Dwarf Fortress generic dwarf name"],
  [176, "“Your” in Spanish (sing., formal)"],
  [177, "Rice Krispies' mascot"],
  [178, "Andris Ameriks political party"],
  [179, "Ashes container"],
  [180, "Witch trial city"],
  [182, "Castle ditch"],
  [183, "Actress Sandra"],
  [184, "Snoopy's shaggy brother"],
  [186, "Cycling group that won't abandon anyone (2 wds.)"],
  [188, "“Tickle Me” children's toy"],
];

export const DOWN = [
  [2, "Whiskey grains (uncommon plural sp.)"],
  [3, "Lack of difficulty"],
  [4, "Female sibling, for short"],
  [5, "Common numerical prefix"],
  [6, "Vietnam capital"],
  [7, "Simile word"],
  [10, "Internet shorthand for person who started a topic of discussion"],
  [11, "1992 Red Sox pitching coach (2 wds.)"],
  [13, "Co. was named after this founder alongside Allen and Hamilton"],
  [16, "A basic logic gate"],
  [17, "Non-violent resistance leader against Britain"],
  [19, "1/8 of a gallon"],
  [20, "Name associated with Roswell Memo"],
  [21, "Lake at 59°03′N 100°00′W"],
  [23, "Buyable add-on for video game (abbr.)"],
  [25, "Movie musical accompaniment"],
  [29, "Tungsten nitride chemical formula"],
  [30, "Tony-winning Lerner and Loewe musical"],
  [31, "Word definition questioned by Bill Clinton"],
  [34, "Negative response"],
  [
    37,
    "Description of how a politician voted if they support revoking a law (4 wds.)",
  ],
  [38, "Hang loosely"],
  [39, "Abnormal tissue growth (Brit. sp.)"],
  [40, "Bakery cafe chain"],
  [42, "Grocery store checkout container (2 wds.)"],
  [44, "Car interface for air compressor (2 wds.)"],
  [45, "Riot Games first-person shooter"],
  [46, "Raleigh loc."],
  [48, "Tax org."],
  [51, "Pac-Man developer"],
  [52, "Divination system originating from Yorubaland in West Africa"],
  [55, "Supported by a surface"],
  [56, "Bottom left intercardinal dir."],
  [57, "January at MIT"],
  [59, "Alt. business structure to corp. (abbr.)"],
  [61, "Genus of Pacific bluetail skink"],
  [62, "Baseball stick"],
  [63, "Beowulf language"],
  [64, "Mike Connors' Detective TV series"],
  [66, "India's House of the People (2 wds.)"],
  [68, "Flashcard software"],
  [72, "Soviet critic of genetics"],
  [74, "Madden maker, for short"],
  [75, "Model number of Apple computer released in January 1983"],
  [77, "Unanalyzed information (2 wds.)"],
  [80, "MIT dorm"],
  [81, "A.J. Cook's 2013 horror film"],
  [82, "Fabric on floor"],
  [84, "A TTRPG, colloquially"],
  [85, "Mona Lisa, e.g."],
  [87, "Mr Incredibles' costume designer"],
  [
    89,
    "Abbreviated Latin placeholder name to signify an anonymous or unnamed person",
  ],
  [91, "2,000 to 35,786 km above sea level"],
  [92, "“Say it ____!” (2 wds.)"],
  [95, "Org. for people with drinking problems"],
  [97, "Inhalation creates high pitched voice"],
  [102, "Gap Inc. 2008 purchase"],
  [103, "Dogma"],
  [104, "Held in common between two"],
  [105, "Unlawfully seize a vehicle"],
  [106, "Second largest NH airport's FAA code"],
  [108, "Nairobi country"],
  [109, "Former Kosovan Prime Minister Çeku"],
  [111, "Body sanitation"],
  [112, "54°18′26″N, 20°51′13″E"],
  [114, "Manga card game primary protagonist"],
  [115, "Holland (for short)"],
  [116, "Spicy"],
  [118, "Distribute or handout"],
  [119, "Feel ill or pained"],
  [121, "Film franchise feat. robots/cars"],
  [122, "Major ethnic group in southwest part of Delta State in Niger"],
  [126, "FFRDC affiliated with MIT"],
  [128, "SF state"],
  [132, "Name in dismissive Ice Cube phrase"],
  [134, "Depletion of bank account"],
  [135, "Name associated with salt Ammonium iron(II) sulfate"],
  [138, "Office Space report topic"],
  [139, "1952 film also released as “The Savage Princess”"],
  [141, "Childe Cycle series' people"],
  [144, "Second largest U.S. territory"],
  [145, "Close by"],
  [148, "Kris Kringle"],
  [149, "Relating to or arising from the action of the wind"],
  [150, "Memo field"],
  [151, "Hint or pointer"],
  [152, "Covered in frozen water"],
  [154, "Swinging building barriers"],
  [155, "Grouped inside of another"],
  [160, "Producer of 2016 album “Generationwhy”"],
  [161, "Elem. discovered by Rutherford"],
  [163, "Thousand Year Capital"],
  [164, "Northwest administrative province of Tajikistan"],
  [165, "Zipper co."],
  [166, "Oscar-winning 2022 Indian drama"],
  [168, "Corp. dep't for worker matters"],
  [171, "Microsoft Windows, e.g."],
  [173, "Wearing no clothes"],
  [175, "Home of Bubblegum Alley, for short"],
  [177, "Chum"],
  [181, "Title for man"],
  [183, "Approve"],
  [184, "Indefinite article"],
  [185, "Fourth largest moon in solar system"],
];

export const HIGHLIGHTED = [
  ["t", "Example of a major mechanic utilized successively in this puzzle"],
  ["a", "Named Category 5 hurricane affecting Yucatan Peninsula"],
  [
    "b",
    "Military conflict in which the U.S. significantly ramped up its involvement",
  ],
  ["c", "MMI scale XII earthquake"],
  ["d", "President who faced assassination attempt"],
  [
    "e",
    "Second word of phrase starting with “Great” describing period of severe economic downturn",
  ],
  ["f", "U.S. state which hosted Winter Olympics"],
];
