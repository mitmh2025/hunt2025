import { reduceCoordinatesToIndices } from "../../components/Crossword";

export const GRID_1 = `
#########
#   #    
#  #     
#  #  # #
###  ##  
#   # ## 
#    #   
#### #  #
#   ###  
#   #  # 
# ##     
##    # #
#    #   
#   ## # 
#  #  #  
# # #   #
#    #   
#    #   
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

// A | here means the bar comes to the right of this cell.
export const BARS_1_RIGHT = `
   |     
   |     
  |      
  |  |   
    |    
     |   
    |    
    |    
   |     
   |     
  |      
     |   
    |    
   |     
  |      
   |     
    |   
    |   
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

// A _ here means the bar is below this cell.
export const BARS_1_DOWN = `
         
         
_  _    _
 __  __  
    _  _ 
         
 ___    _
_   ___  
       _ 
  __     
 _      _
_        
     _ _ 
   _  _  
_ _     _
         
         
         
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

export const FILL_1 = `
FACECORDS
SCABLOOIE
UMSBANANA
TEEESADER
ACERSGYRO
CALICOETC
KAFKAREEK
SHEARPTSD
EASTHASTY
SHEAADORE
TAYBURROS
OTOOLETIS
LYDIAPOLL
BIELSOFIA
SNLASIMOV
TGIFSLAWS
VITAEETAL
SNOREDENY
  `
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

const SHARED_YELLOW_HIGHLIGHTS_COORDS = [
  { row: 0, col: 2 },
  { row: 0, col: 4 },
  { row: 0, col: 6 },
  { row: 1, col: 2 },
  { row: 1, col: 4 },
  { row: 1, col: 6 },
  { row: 2, col: 2 },
  { row: 2, col: 4 },
  { row: 2, col: 6 },
  { row: 3, col: 0 },
  { row: 3, col: 2 },
  { row: 3, col: 4 },
  { row: 3, col: 6 },
  { row: 3, col: 8 },
  { row: 4, col: 0 },
  { row: 4, col: 4 },
  { row: 4, col: 8 },
  { row: 5, col: 0 },
  { row: 5, col: 8 },
  { row: 6, col: 0 },
  { row: 6, col: 8 },
];

export const YELLOW_HIGHLIGHTS_1 = reduceCoordinatesToIndices(
  [...SHARED_YELLOW_HIGHLIGHTS_COORDS, { row: 7, col: 0 }],
  9,
);

export const BLUE_HIGHLIGHTS_1 = reduceCoordinatesToIndices(
  [
    { row: 7, col: 1 },
    { row: 7, col: 2 },
    { row: 7, col: 3 },
    { row: 7, col: 4 },
    { row: 7, col: 6 },
    { row: 9, col: 1 },
    { row: 9, col: 2 },
    { row: 9, col: 3 },
    { row: 9, col: 5 },
    { row: 12, col: 0 },
    { row: 13, col: 1 },
    { row: 13, col: 6 },
    { row: 15, col: 3 },
    { row: 15, col: 6 },
    { row: 16, col: 4 },
    { row: 16, col: 6 },
    { row: 17, col: 5 },
    { row: 17, col: 6 },
  ],
  9,
);

export const RED_HIGHLIGHTS_1 = reduceCoordinatesToIndices(
  [
    { row: 7, col: 5 },
    { row: 9, col: 4 },
    { row: 14, col: 2 },
    { row: 14, col: 6 },
  ],
  9,
);

export const GRID_1_ACROSS = [
  [1, "About-___"],
  [5, "These are tangled behind my desk"],
  [10, "Evidence of healing"],
  [11, "Chattanooga mascot born on Lookout Mountain"],
  [12, "Hesitations in speech"],
  [13, "Fruit used for scale"],
  [14, "It holds your golf ball"],
  [15, "JUICE launcher, briefly"],
  [16, "___, die, das"],
  [18, "Aspire laptops"],
  [21, "Greek food truck fare"],
  [23, "Fabric or cat"],
  [25, "Short for something long"],
  [27, "Gregor Samsa creator"],
  [28, "Stink"],
  [29, "Lop from a lamb, perhaps"],
  [33, "Shell-shock, for short"],
  [35, "___ India Company"],
  [36, "Acting too quickly"],
  [39, "Butter you don’t usually eat"],
  [40, "Be crazy about"],
  [42, "“Chocolate Rain” singer Zonday"],
  [44, "Asses"],
  [45, "Peter or Plenty"],
  [47, "How Shakespeare would write “it is”"],
  [49, "Youngest sister in Pride and Prejudice"],
  [50, "Survey"],
  [51, "The Texas Chainsaw Massacre (2003) star"],
  [52, "Bulgarian capital"],
  [55, "Weekend sketch show, for short"],
  [56, "Foundation and I, Robot author"],
  [58, "Brief end-of-week exclamation"],
  [60, "Cabbage-based side dishes"],
  [62, "Curriculum follower"],
  [63, "Short for something long"],
  [64, "Sleep loudly"],
  [65, "Veto"],
];

export const GRID_1_DOWN = [
  [1, "Tallahassee school, for short"],
  [2, "Maker of anvils, rockets, and explosive tennis balls"],
  [
    3,
    "Heritable or communicable disease patient in whom that disease was documented for the first time",
  ],
  [4, "Recede, as a tide"],
  [5, "Income bracket that is not at either extreme"],
  [6, "Chaplin of “Game of Thrones”"],
  [7, "Route that takes you in a loop around a city"],
  [8, "One who eats, or where one eats"],
  [9, "Body of water that sounds like a letter"],
  [14, "Corkboard push pins"],
  [15, "Demaine or the Red"],
  [17, "One city in Arkansas"],
  [19, "EPA law that governs emissions of hazardous pollutants"],
  [20, "Buddy or Legolas, e.g."],
  [21, "Trail snack"],
  [22, "Fling, in lingo"],
  [24, "Automobile"],
  [26, "Math class stressor"],
  [30, "LOL"],
  [31, "Suffix with Peking or Malt"],
  [32, "___ glance"],
  [34, "Changes color"],
  [35, "Spanish this"],
  [36, "Really move it"],
  [37, "Common “Mad Men” role, for short"],
  [38, "Ish"],
  [41, "Churn"],
  [43, "Sing in the Alps"],
  [44, "Part of a carbuncle"],
  [46, "Essential preparation for top-roping"],
  [48, "Pole, Serb, e.g."],
  [49, "Units of weight in the US"],
  [53, "Made slippery"],
  [54, "One from the Hawkeye State"],
  [56, "From a distance"],
  [57, "Check___"],
  [58, "Boob tubes"],
  [59, "The Enigma of Amigara Fault creator"],
  [60, "Perceive"],
  [61, "Wily"],
];

export const GRID_2 = `
#########
#     #  
#  #  #  
#   ## ##
# ### #  
## ## #  
#     #  
#   ## # 
##### # #
#   #    
#    #   
# # ###  
## # # ##
#   #    
#  #     
# #  # # 
#   #    
#    #   
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

export const BARS_2_RIGHT = `
     |   
     |   
  |  |   
   |     
   |     
  |  |   
     |   
   |     
   |     
   |     
    |    
   |     
    |    
   |     
  |      
    |    
   |     
    |    
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

export const BARS_2_DOWN = `
         
         
_    _ __
  __  _  
 _  _    
         
_    _ _ 
 ___  _ _
         
         
_ _ ___  
 _ _   __
         
         
_ _    _ 
         
         
         
`
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

export const FILL_2 = `
MUTTERCAP
THORAXATS
AASORSREY
JUSTTVDAD
OLAFHAYER
HMMOTSORI
NOEXITGOV
TINYNEALE
ATRAETHIC
LIARARENA
CEDAREHUD
CRABBLESS
ALLMEENBY
REFILADLE
TBANIKITA
IRENEEVER
ROTIFREON
KNEESSSNS
  `
  .split("\n")
  .slice(1, -1)
  .map((row) => row.split(""));

export const YELLOW_HIGHLIGHTS_2 = reduceCoordinatesToIndices(
  [...SHARED_YELLOW_HIGHLIGHTS_COORDS, { row: 7, col: 8 }],
  9,
);

export const BLUE_HIGHLIGHTS_2 = reduceCoordinatesToIndices(
  [
    { row: 8, col: 1 },
    { row: 8, col: 2 },
    { row: 8, col: 3 },
    { row: 8, col: 4 },
    { row: 8, col: 6 },
    { row: 10, col: 2 },
    { row: 10, col: 3 },
    { row: 10, col: 5 },
    { row: 10, col: 6 },
    { row: 13, col: 2 },
    { row: 13, col: 6 },
    { row: 14, col: 2 },
    { row: 14, col: 6 },
    { row: 16, col: 2 },
    { row: 16, col: 4 },
    { row: 17, col: 2 },
    { row: 17, col: 3 },
  ],
  9,
);

export const RED_HIGHLIGHTS_2 = reduceCoordinatesToIndices(
  [
    { row: 8, col: 5 },
    { row: 10, col: 4 },
    { row: 15, col: 2 },
    { row: 15, col: 5 },
  ],
  9,
);

export const GRID_2_ACROSS = [
  [1, "German mother"],
  [7, "Limit"],
  [10, "Part between head and abdomen"],
  [11, "Gets someone's attention online"],
  [12, "One triangle congruence theorem, briefly"],
  [13, "Hospital locales (abbr.)"],
  [14, "Jakku native"],
  [15, "Right"],
  [16, "Phil Dunphy or Martin Crane, for example"],
  [20, "Snowman who longs for summer"],
  [23, "French MEP Valérie"],
  [25, "“I wonder…”"],
  [27, "When ties are broken, for short"],
  [29, "___ and the Blind Forest"],
  [30, "Sartre play that inspired The Good Place"],
  [31, "URL ending for a hopefully reliable website"],
  [32, "___ Tim"],
  [33, "Middle name of Zora Hurston"],
  [36, "Discontinued Gillette razor"],
  [40, "Work ___"],
  [43, "Fabulist"],
  [44, "Venue for a big concert"],
  [45, "Fragrant chest wood"],
  [46, "Old-Testament judge"],
  [47, "This animal is blue in Maryland"],
  [49, "Sanctify"],
  [52, "Drake song that isn’t about you"],
  [55, "Them user, perhaps"],
  [58, "Reduce your interest rate, for short"],
  [59, "Like a spoon, but bigger"],
  [60, "Initialism meaning “we’ll tell you later”"],
  [61, "La Femme ___"],
  [62, "Good Night, ___"],
  [64, "Happily ___ after"],
  [66, "Flatbread"],
  [67, "Fridge chemical"],
  [68, "Tap these between shoulders and toes"],
  [69, "Tax identifiers (abbr.)"],
];

export const GRID_2_DOWN = [
  [1, "This moves people in New York, for short"],
  [2, "This rental company helps you move yourself"],
  [3, "A game like horseshoes but using circular objects"],
  [4, "Gait faster than a walk"],
  [5, "Númenor locale"],
  [6, "What you need if your medications aren't OTC"],
  [7, "Catalog part"],
  [8, "___ and left no crumbs"],
  [9, "Park Jae-sang"],
  [15, "Merry Men second-in-command"],
  [17, "Really, really big"],
  [18, "___naut or ___dynamics"],
  [19, "You can put this in a computer or your pocket"],
  [21, "“Preach!”"],
  [22, "Vulpine"],
  [24, "Pose-based exercise"],
  [26, "Me, when I'm in France"],
  [28, "What you have if you can't hear very well, colloquially"],
  [32, "Soft mineral"],
  [34, "French to be"],
  [35, "Torvalds or Pauling"],
  [37, "Cake subdivision"],
  [38, "Calculator setting, in contrast with DEG"],
  [39, "A. in U.A.E."],
  [41, "Short chuckle"],
  [42, "Rakes"],
  [47, "It holds things you want to buy"],
  [48, "___ Romeo (car manufacturer)"],
  [49, "Convictions"],
  [50, "Whistleblowers"],
  [51, "Radicchio and frisée are types of these"],
  [53, "King James in basketball"],
  [54, "Mouse that sounds small"],
  [56, "Classic sandwich, for short"],
  [57, "Longs"],
  [62, "Rankle"],
  [63, "Parisian summer"],
  [65, "Long, long time"],
];

export const SOLUTION_TABLE: [string, string, string][] = [
  ["THUMB", "TACKS", "Corkboard push pins"],
  [
    "INDEX",
    "CASE",
    "Heritable or communicable disease patient in whom that disease was documented for the first time",
  ],
  ["MIDDLE", "CLASS", "Income bracket that is not at either extreme"],
  ["RING", "ROAD", "Route that takes you in a loop around a city"],
  ["LITTLE", "ROCK", "One city in Arkansas"],
  ["LITTLE", "JOHN", "Merry Men second-in-command"],
  ["RING", "TOSS", "A game like horseshoes but using circular objects"],
  ["MIDDLE", "EARTH", "Númenor locale"],
  ["INDEX", "CARD", "Catalog part"],
  ["THUMB", "DRIVE", "You can put this in a computer or your pocket"],
];
