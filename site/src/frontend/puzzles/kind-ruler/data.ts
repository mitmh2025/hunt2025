import { reduceCoordinatesToIndices } from "../../components/Crossword";

export const ACROSS: { number: number; clues: string[] }[] = [
  {
    number: 1,
    clues: [
      "A handful of this will let you have a quick hearth-to-hearth with a friend",
      "Mess hall in a high school",
    ],
  },
  {
    number: 4,
    clues: [
      "If you become petrified while pulling weeds, this might be the root cause",
    ],
  },
  { number: 5, clues: ["Language and cultural group in South Africa"] },
  { number: 7, clues: ["Direction generally agreed to be “up” on a globe"] },
  { number: 8, clues: ["Opposite of a con"] },
  {
    number: 9,
    clues: [
      "No one can agree whether it’s the sorcerer’s or the philosopher’s",
      "A publicist worries about this",
    ],
  },
  { number: 10, clues: ["Simone Biles took 4 golds in this city"] },
  { number: 11, clues: ["Fictional pirates love this molasses-based drink"] },
  { number: 12, clues: ["“Yer ____ Harry!”"] },
  {
    number: 13,
    clues: ["The only place unscrupulous enough to buy Zora eggs", "Not near"],
  },
  {
    number: 14,
    clues: [
      "Fluffy little friend with an uncontrollable urge to steal shiny things",
      "Extinct breed of cattle-droving canines, or a mutt",
    ],
  },
  {
    number: 16,
    clues: [
      "The first name in liquid luck",
      "Golden Goddess, creator of all life",
      "It turns electricity into torque",
    ],
  },
  {
    number: 17,
    clues: [
      "Emeric the Evil and Egbert the Egregious both had their hands on this knobbly wand",
      "Dolly the sheep",
    ],
  },
  {
    number: 18,
    clues: [
      "Remus Lupin’s true replacement as professor of DADA",
      "An anti-plagiarism AI shares this name with a famous British wartime leader",
    ],
  },
  {
    number: 19,
    clues: [
      "A cephalopod that will be happy to rock you",
      "Artisan who is always loaded with dough",
    ],
  },
  { number: 20, clues: ["World’s most famous Claus"] },
  {
    number: 21,
    clues: [
      "A big green chuchu rules this diminutive shrine",
      "So many movies and books start with this, we move it to the end when alphabetizing",
    ],
  },
  {
    number: 22,
    clues: [
      "Freezing charm won’t do you harm, but will leave you completely…",
      "A forge construct will make this into glowy green pyramids for you",
    ],
  },
  {
    number: 23,
    clues: [
      "Term for a female from breeds such as Ankole-Watusi, Belgian Blue and Miniature Belted Galloway",
    ],
  },
  {
    number: 24,
    clues: ["A person given a secret stone to fight a demon king"],
  },
  {
    number: 25,
    clues: [
      "This drive has seen Dursleys, dementors and a child of destiny",
      "Heroes who want to learn the secret of the cedars should stand on this coast and line up 3 trees",
      "Natto beans",
    ],
  },
  {
    number: 26,
    clues: ["Acronym that pitted environmentalists against wrestlers"],
  },
  {
    number: 27,
    clues: [
      "The senior Diggory",
      "Relaxing locale whose name derives from a town in Belgium",
    ],
  },
  {
    number: 28,
    clues: [
      "Most famous Bagman of the Wimbourne Wasps",
      "Island birthplace of Zeus",
    ],
  },
  {
    number: 29,
    clues: [
      "Viktor of the Triwizard tournament",
      "If you delved underground and found a map, a compass and a boss key, you’re likely in this type of locale",
      "Spanish uncle",
    ],
  },
  { number: 30, clues: ["He loves to take Lon Lon naps", "Lennon’s Yoko"] },
  {
    number: 31,
    clues: [
      "Hagrid’s humanity, a prince’s percentage",
      "Legendary Stormwind vessel",
      "Back in the day they called it a “talking picture”",
    ],
  },
  {
    number: 33,
    clues: [
      "Secret-keeper, death eater, potion brewer, prince. A man who loved a Lily",
      "When the moon goes mad you live and die by this ticking tool",
      "In the fall you might do this for apples",
    ],
  },
  { number: 34, clues: ["Bulgarian beater Volkov"] },
  {
    number: 35,
    clues: [
      "Elde, Stock Pot and Happy Hearth are all this kind of establishment",
      "Famous foodstuff that comes in both “chicken pot” and “key lime”",
    ],
  },
  { number: 36, clues: ["Smart"] },
  {
    number: 37,
    clues: [
      "Pointy, paternal patronus",
      "The best way to have a blast, if you have the bag for it",
    ],
  },
  {
    number: 39,
    clues: [
      "Aberforth’s more-famous brother",
      "20 rupees will get you a Rapid Ride once you clean up her river",
      "Vampire’s bane, pizza’s gain",
    ],
  },
  {
    number: 40,
    clues: [
      "Mr. Black’s least Sirius form",
      "Aspiring fishermen will need to get this lady’s cradle back from a monkey",
      "UN’s Annan",
    ],
  },
  {
    number: 41,
    clues: [
      "Shed by a magic bird, this droplet will heal what ails you",
      "Kohga’s crafty clan",
      "It makes a phrase a gerund",
    ],
  },
  {
    number: 42,
    clues: [
      "A vicious living textbook ironically serves as an example of this",
      "Hero’s ride, Malon’s pride",
    ],
  },
  {
    number: 43,
    clues: [
      "Abbreviation of Hogwarts’ home country",
      "Popular road trip game has you do this with your little eye",
    ],
  },
  {
    number: 44,
    clues: [
      "Common expression of surprise, “Merlin’s __!”",
      "Spends his days dreaming of fairies, but he’ll sell you a map if you burst his bubble",
    ],
  },
  {
    number: 45,
    clues: [
      "Number relevant to a postman obsessed with seconds",
      "Sci-fi’s go-to futuristic weapon",
    ],
  },
  { number: 46, clues: ["It takes a megaton to flip this four-legged pest"] },
  {
    number: 47,
    clues: [
      "Award reserved for those who give gratitude crystals to demons",
      "City that goes with baked beans and cream pie",
    ],
  },
  { number: 49, clues: ["FLAC, WMAL or MPEG-4"] },
  { number: 50, clues: ["Blupee’s legendary trial"] },
  { number: 52, clues: ["Must-have medallion for any Misery Mire mission"] },
  {
    number: 53,
    clues: ["In Dodongo’s Cavern, the floor truly is", "Sonnet or Haiku"],
  },
  {
    number: 54,
    clues: [
      "Dune-dwelling guardians of the sacred windmills",
      "Cure diseases! Cleanse you of poison! Regenerate your body and mind! The jelly of this miracle creature can do it all!",
    ],
  },
  {
    number: 55,
    clues: ["Occidental name for the largest pandemic of the 20th century"],
  },
  {
    number: 56,
    clues: [
      "Mara who served as Emperor’s hand, married a farmboy and passed into legends",
    ],
  },
  {
    number: 57,
    clues: [
      "Percy the Small, Emily the Stirling and James the Red all pull these",
    ],
  },
  { number: 58, clues: ["First Order’s unofficial foes"] },
  {
    number: 59,
    clues: [
      "Headgear equally appropriate for playing in the snow or pursuing a life of crime",
      "Blood and silver flow through it",
    ],
  },
  { number: 60, clues: ["Pearl of the Indian ocean"] },
  {
    number: 61,
    clues: ["Mando’s noisy-sounding name", "Black-Briar’s specialty"],
  },
  {
    number: 62,
    clues: [
      "Considerate clone who returned Kenobi’s weapon after a Grievous battle",
      "The travel guides don’t mention the “visitor’s tax” here",
    ],
  },
  {
    number: 63,
    clues: [
      "This jowly Boss gives some strangers a boat to pass through the core of a planet",
      "Archaic term for a dainty food, or a Blanchett",
      "City with a palace fit to wrangle a wyrm",
    ],
  },
  {
    number: 65,
    clues: [
      "Soft drink that sounds like it belongs on a keyboard",
      "This ancient spirit will put some clout in your shout",
    ],
  },
  {
    number: 67,
    clues: [
      "Programming language, and a game where things are very black and white",
      "Valenwood is their neighborhood",
    ],
  },
  { number: 68, clues: ["At 12 gold a bottle, this wine had better be fine"] },
  {
    number: 69,
    clues: [
      "Forest moon where the might of an Empire failed against sticks and rocks",
      "To do this is to be human, according to Seneca",
      "Crossbows, lightning and fire all agree that these are the superior projectiles",
    ],
  },
  {
    number: 70,
    clues: [
      "Onderonian resistance fighter, brother to Steela, father figure to Jyn",
    ],
  },
  {
    number: 71,
    clues: [
      "Fulcrum? Clem? Keef Girgo? Put together two logic gates to get the real answer",
      "In C99, converts a string to a long",
      "Three little words that will sweep you off your feet",
    ],
  },
  {
    number: 72,
    clues: [
      "Pyke planet at the end of the infamous Kessel Run",
      "Monstrous creature of folklore",
    ],
  },
  {
    number: 73,
    clues: [
      "In spite of his name, this Organa always stays true to his cause",
      "In Weird Al’s world it’s mandatory",
      "One signatory of the white-gold concordat",
    ],
  },
  {
    number: 74,
    clues: [
      "If you want tibanna gas, go to a city that rests among these",
      "Lead jazz drummer on Honey and Salt",
      "Beyond flawless, but not quite legendary",
    ],
  },
  {
    number: 75,
    clues: [
      "Naboo’s goofy, gangly amphibians",
      "Slangy expression of jocular agreement, or the building block of a sentence",
      "A Khajiit might sell you this rare curio—a striking blue flower that sounds like the final movement of a song",
    ],
  },
  { number: 76, clues: ["Bane of Boba’s childhood"] },
  {
    number: 77,
    clues: [
      "With the number 44, a popular pistol from Ryloth named after a musical freedom fighter",
      "It will gaze back into you",
      "Ancestry of many who fled the Red Mountain",
    ],
  },
  { number: 78, clues: ["Imperial soldier with infamous precision"] },
  {
    number: 79,
    clues: [
      "Clone Commander or a tyrant lizard",
      "A country with New, a furry pet with pig",
      "Ghost goo, grayish hue, add briar heart and it’s good for you",
    ],
  },
  { number: 80, clues: ["Lord of Pestilence, Prince of the Pits"] },
  {
    number: 81,
    clues: [
      "Youngling survivor who loves kidnapping Vader’s kids",
      "It used to be Edo",
      "Not to be confused with Valhalla or Sto’Vo’Kor",
    ],
  },
  { number: 82, clues: ["Fancy dresser who walks on a runway"] },
  {
    number: 83,
    clues: [
      "Most commonly-exchanged projectiles in the galaxy, often color coded for convenience",
      "Legendary hero of prophecy, as shouted from the throat of the world",
    ],
  },
  { number: 84, clues: ["They released Millennium in 1999"] },
  {
    number: 86,
    clues: [
      "Profession also known as flyboy to a princess",
      "Need to claw your way through a door to find a forbidden legend? You’ll need an item made from this precious stuff",
    ],
  },
  {
    number: 87,
    clues: [
      "Ostriches are the only birds to have feet of this type",
      "The final word when it comes to unleashing the wind",
    ],
  },
  {
    number: 89,
    clues: [
      "Little boy with a bright future in podracing",
      "Be it battle or war, 9 out of 10 Jarls agree this is the best tool to split a skull",
    ],
  },
  {
    number: 90,
    clues: [
      "A walking carpet’s faithful friend",
      "Most dangerous darts ever meant for family fun",
      "Elven supremacists, enemies of Talos",
    ],
  },
  {
    number: 91,
    clues: [
      "Empire’s rag-tag opposition",
      "Happy hearts and birds on the wing both did this",
    ],
  },
  {
    number: 92,
    clues: [
      "Howling hordes of these tiny ships spew from every Star Destroyer",
      "It’s primarily used to download Chrome",
      "She has an ancestry steeped in magic, and she doesn’t want to talk about it",
    ],
  },
  {
    number: 93,
    clues: [
      "Lost your way, literally or figuratively",
      "This noisy glowing root is begging to be picked",
    ],
  },
  {
    number: 94,
    clues: [
      "There will be 224 of these occlusive events in the 21st century",
      "Combine this moony moth’s wing with a pinch of vampire dust and you’ll be clear in no time",
    ],
  },
];

export const DOWN: { number: number; clues: string[] }[] = [
  {
    number: 1,
    clues: ["With dining or sleeping, a section of a railroad-riding vehicle"],
  },
  {
    number: 2,
    clues: ["Fawkes’ very special species", "Trap of La Brea, ball of Linux"],
  },
  {
    number: 3,
    clues: [
      "Weasleys’ oldest post worker",
      "Common acronym for a not-for-profit news agency founded in 1846",
    ],
  },
  {
    number: 4,
    clues: ["Intangible human creation that controls most modern tech"],
  },
  {
    number: 5,
    clues: ["Norbert’s fragile form when he gets bet at the Hog’s Head"],
  },
  {
    number: 6,
    clues: [
      "One who uses mathemagics to make predictions like Septima Vector",
      "Blimp, helicopter, or F-16",
    ],
  },
  {
    number: 7,
    clues: [
      "It’s said that awful things happen to wizards who do this",
      "An unpleasant or abhorrent requirement",
    ],
  },
  { number: 8, clues: ["Leta’s half-brother, looking for Credence"] },
  {
    number: 9,
    clues: [
      "Expelliarmus, the thing to do at a bee, and a short length of time",
    ],
  },
  { number: 10, clues: ["Magical cop? It’s hard to say"] },
  {
    number: 11,
    clues: ["Powerful potion made with boomslang skin and full-moon fluxweed"],
  },
  { number: 12, clues: ["Root of all evil, so they say"] },
  {
    number: 13,
    clues: [
      "Demented destination for convicted death eaters",
      "If you attack this fowl creature, revenge will be swift",
    ],
  },
  { number: 14, clues: ["The kingdom’s dismal discharge"] },
  {
    number: 15,
    clues: [
      "She’s as much a fairy princess as a moody old man",
      "Spooky spirit with a poet’s name",
      "Like a newspaper, black and white and…",
    ],
  },
  {
    number: 16,
    clues: ["Hanlon advises you to attribute things to stupidity before this"],
  },
  { number: 17, clues: ["Ghostly king who has a glider thing"] },
  {
    number: 18,
    clues: [
      "The appropriate tool for dominion, fire and fishing",
      "Federal program that provides supplemental sustenance to mothers and babies in need",
    ],
  },
  {
    number: 19,
    clues: [
      "Padma and Pavarti, Flora and Hestia, Fred and George",
      "His principle explains how a fixed wing makes lift",
    ],
  },
  {
    number: 20,
    clues: [
      "Silvery savior with a terrible price",
      "Countdown says 12 hours remain",
    ],
  },
  {
    number: 21,
    clues: [
      "Innocuous first name for a young man riddled with darkness",
      "Order given to those being pressured to obey company authority",
    ],
  },
  {
    number: 22,
    clues: ["Woman of 29 legends", "Band that brought you Xanadu"],
  },
  {
    number: 23,
    clues: [
      "Hogwarts has a whole chamber of them",
      "A keese’s most singular feature",
    ],
  },
  {
    number: 24,
    clues: [
      "Grindelwald’s favorite frenemy",
      "Monosyllabic question, or a medically-focused UN agency",
    ],
  },
  {
    number: 25,
    clues: [
      "Weasleys’ youngest post worker",
      "Roast this oaky nut and you’ll get a half-hearted meal",
      "To add or total",
    ],
  },
  {
    number: 26,
    clues: [
      "Blackness bled by a Basilisk-stabbed book",
      "Teleport, change the weather, alter time—all it takes is a toot on this timely flute",
      "Distinctive feature of duck’s foot",
    ],
  },
  {
    number: 27,
    clues: [
      "Leavings from a fiery friend’s rebirth",
      "Frightful form of a cursed rich man",
      "Darwin wrote on their origins",
    ],
  },
  {
    number: 28,
    clues: [
      "Xenophilius, Pandora and Luna all claim this name",
      "Red-haired lady with a Moon Mask, waiting for her betrothed",
    ],
  },
  {
    number: 30,
    clues: ["Molly’s youngest man", "Demon, or part of a rice ball"],
  },
  {
    number: 32,
    clues: [
      "Sounds like a ficus fruit, but it’s the squib next door",
      "Want to solve some light puzzles? You’ll need to do this with a shield",
      "Palindromic first name of the Iron Chancellor",
    ],
  },
  {
    number: 33,
    clues: [
      "Process by which a toenail and a lizard can result in a hearty elixir",
    ],
  },
  {
    number: 34,
    clues: [
      "Kiki will help you get into this rebellious castle, but only if you bring bananas",
      "They make up bytes",
    ],
  },
  {
    number: 35,
    clues: [
      "Weasley who invented the flying Ford Anglia",
      "Sirens’ octet that rouses a windy fish",
      "With up, to reluctantly settle an account",
    ],
  },
  {
    number: 36,
    clues: [
      "This is the type of organization that trains in the Room of Requirement",
      "Play a tune when he’s around, this helpful strawman pops from the ground",
    ],
  },
  { number: 37, clues: ["Littlest lizard in auto insurance"] },
  {
    number: 38,
    clues: [
      "White marble container for a headmaster’s hallow",
      "These brothers are Grim and Gray, Great and Swift, Scar, Split and Wave",
      "The saddest kind of story",
    ],
  },
  {
    number: 39,
    clues: [
      "Fire this arrow to strike a chilling blow",
      "Buy a burrito while filling your car and you can get this twice",
    ],
  },
  {
    number: 42,
    clues: [
      "Item needed by one who lost their phone, or the intended outcome of mitosis",
    ],
  },
  {
    number: 43,
    clues: ["This is what you get for playing hide and seek with a bomber"],
  },
  {
    number: 44,
    clues: [
      "Common street food purported to be a government-backed attempt to reduce rice consumption",
    ],
  },
  { number: 46, clues: ["Ancient Egypt’s slithery symbol of royalty"] },
  {
    number: 48,
    clues: [
      "Feathered friends of Dragon Roost Island",
      "Exactly adequate at golf",
    ],
  },
  {
    number: 49,
    clues: ["One beaky, cheeky cap", "A crabby group of arthropods"],
  },
  {
    number: 50,
    clues: [
      "What does the Georgia Peach have in common with a mighty meaty salad?",
    ],
  },
  {
    number: 51,
    clues: [
      "It has a hero, a temple, a song, a pedestal and even a goddess",
      "Pogonias cromis",
    ],
  },
  { number: 52, clues: ["A deadly weakness"] },
  {
    number: 54,
    clues: [
      "Items with no clear grouping get lumped into this category",
      "Cidhna’s best option for driving home a point",
    ],
  },
  {
    number: 55,
    clues: [
      "Even bigger and badder than the first, this technological terror never finished construction",
      "A Vile gift, and the way you’ll feel once you slay a daedra’s best friend",
    ],
  },
  {
    number: 56,
    clues: [
      "The Chosen One’s highest rank, famously",
      "Home to Downpatrick, Ballymena, Ardglass and Fivemiletown",
      "He’ll ask you to steal a ring from a reptile, then you’re on your way to the fences",
    ],
  },
  {
    number: 57,
    clues: ["Rampart of War-mantle", "Mede’s soon-to-be married cousin"],
  },
  {
    number: 58,
    clues: [
      "Name of a weapon borrowed by a man, a group of knights and eventually Kylo",
      "Pathway followed by a thrown ball",
      "It’s the hottest-sounding iron mine in the greater Riverwood area",
    ],
  },
  {
    number: 59,
    clues: [
      "Ecumenopolis Malak razed to kill Revan",
      "Champion this Lady of Life and you’ll be able to break the dawn",
    ],
  },
  {
    number: 60,
    clues: [
      "Bad guys can’t resist using this iconic weapon",
      "Infamous district, Seymour’s unhappy home",
      "For those interested in some light theft, the double-distilled sugar here will put you over the moon",
    ],
  },
  { number: 61, clues: ["State specializing in spuds"] },
  { number: 62, clues: ["Even Worse, track eight"] },
  {
    number: 64,
    clues: [
      "You might get a surprise promotion to this rank if your boss is as clumsy as he is stupid",
      "A form of human expression that’s hard to define, but you know it when you see it",
      "Word to describe the craftsmanship of the Sons of Snow",
    ],
  },
  {
    number: 65,
    clues: [
      "Raddus and Home One are both examples of this style of Mon Calamari ship",
    ],
  },
  {
    number: 66,
    clues: [
      "Imperial walker’s unexpected weakness",
      "They call Ralph Wilson stadium home",
      "Gelebor is one of the last who can claim this race",
    ],
  },
  { number: 67, clues: ["A wretched hive of scum and villainy"] },
  {
    number: 68,
    clues: ["He has the death sentence on 12 systems", "Irony rocks?"],
  },
  {
    number: 69,
    clues: [
      "From pickpocket to hyperspace whale whisperer, this man has done it all",
    ],
  },
  {
    number: 70,
    clues: [
      "Dried, like glue",
      "Legendary hero of prophecy, to the common man",
    ],
  },
  { number: 71, clues: ["Every last one"] },
  {
    number: 72,
    clues: [
      "Site of Skywalker’s temple and Ben’s fall",
      "Savage tusky face, author of Uncommon Taste, what’s The Gourmet’s race?",
    ],
  },
  {
    number: 76,
    clues: [
      "Imperial defector Madine",
      "Doctor Andre Romell Young",
      "Malachite, Moonstone, and leather make up this fragile-seeming blade",
    ],
  },
  { number: 77, clues: ["Popular architecture for those up for a risc"] },
  {
    number: 78,
    clues: [
      "Mandalorian with the soul of an artist",
      "Initiate legal proceedings against, or a catchier name for FMNH PR 2081",
      "The “skeleton” in Nocturnal’s closet",
    ],
  },
  {
    number: 80,
    clues: [
      "Tatooine’s second most infamous Mos, home to Fett’s castle",
      "A non-monkey simian",
      "You can get one of these from ashen grass, albino spiders or swamp fungus",
    ],
  },
  {
    number: 81,
    clues: [
      "When you want ingots but you’ve got ore, this is the thing you’re looking for",
    ],
  },
  {
    number: 82,
    clues: [
      "Mace’s Iridonian colleague before Agen",
      "The nothing between things",
      "You partied with a Prince and things got out of hand.  Now this angry farmer wants to know why a giant has his prize-winning goat",
    ],
  },
  { number: 83, clues: ["Informal name for a hard confection on a stick"] },
  {
    number: 84,
    clues: [
      "Before he became a responsible leader, he was a simple sportsman who loved a droid",
      "Ulfric’s tool of choice when dealing with high kings",
    ],
  },
  {
    number: 85,
    clues: [
      "Delta squad’s star sniper",
      "Michael Jackson’s seventh studio album",
      "The armor type of choice for the discerning pugilist",
    ],
  },
  {
    number: 86,
    clues: [
      "Compact vehicle whose name is a mashup of a German affirmative and a mythological Greek goddess",
    ],
  },
  {
    number: 87,
    clues: [
      "He’d better have those units in the South Ridge repaired by midday, or there’ll be hell to pay",
    ],
  },
  {
    number: 88,
    clues: [
      "They are fought among the stars",
      "A tool like Visual Studio, Eclipse, Spyder or NetBeans",
      "Any alchemist worth his fire salt has one somewhere",
    ],
  },
  { number: 89, clues: ["Second most popular housepet in America"] },
  {
    number: 91,
    clues: [
      "You’ll find spheres and spiders filled with this slick dwarven substance",
    ],
  },
];

// Blue, cyan, highlight (dark red), green, black, lavender, mauve, corn/cobb, orange, purple, red, yellow
export type Color =
  | "b"
  | "c"
  | "h"
  | "g"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "r"
  | "y";

export const COLOR_TO_HEX = {
  b: "#9fc5e8",
  c: "#00ffff",
  h: "#e06666",
  g: "#00ff00",
  k: "#000000",
  l: "#b4a7d6",
  m: "#d5a6bd",
  n: "#ffff00",
  o: "#ff9900",
  p: "#ff00ff",
  r: "#dd7e6b",
  y: "#ffd966",
};

/**
 * Corn maze grids are given in shorthand.
 *   x = wall. Exterior walls are automatically made darker.
 *   # = number. Each maze uses consecutive numbers starting from a given startsAt.
 *   s = scarecrow
 *   o = hole in the hedge
 *   (space) = empty space
 */
const GRID_1 = `
xxxxxxxxxxxxx x xxxxxxxxxxxxx
x#   #   #x#x x#   #xxx#    x
x xxx xxx#  x x xxx#    xxxxx
x#  x# #xxx x x x#  xxx#  x#x
xxxxxxx x#    xxxxx#    sxx x
x#      x x xxx#    xxx#    x
x xxxxx x x x#  sxx x#x xxx x
x# #x#  x s x x x#  x x x#  x
xxx x xxx#    x x x#  x x x x
x#  x#    xxx x x xxxxx x x x
x xxxxxxxxx#x x x# #x#  x x x
x#      #   x x x x x x x x x
xxxxxxxx xx x x x x x x x x x
x#x#     x#   x## x## x##   x
x s xxxx xxxx xx xxx xxx xxsx
x##    x x#   #x x#x s#x#  #x
xx xxxxxxx xxs x x x x xxxs x
x#         x#x x s x x# #   x
xx xxxxxxx x x#        x xx x
x# #    #x x xxx x x x x##  x
x x xxxx x s# #xxx xxx xx x x
x s x##x x x x x#  x#x x#   x
x x xx x x x x xxx s x x sx x
x x#   x x x x#  x#         x
x xxxxxx x x x xxxxxxxxxxxx x
x#  #x#  # x x x#    #x#    x
xxxx x sx xx x xxxxxx xxxsx x
x#        #x x#         # # x
x xxxxxxxx x x xxxxxxxxx x xx
x x##  #   x x#   x#     x xx
x xx xx xx x x xxxxxxxxxxx xx
x#   x#      x#            xx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
`;

const GRID_1_FILL = `
             E E             
 CAFETERIA S N XHOSA   NORTH 
 A   A   PRO T I   IMAGE     
 RIO RUM   F E T FAR   CUR R 
       O MOTOR     CLONE   E 
 WINSTON A W   BAKER   SANTA 
 I     E L A>THE   A E S   D 
 COW SOY I R O R WWF L A SPA 
   H U   CRETE N E TIO R P L 
 ONO MOVIE   T O B     Y E L 
 N         O H U BOB PIE C O 
 INTELLIGENT E L I I O V I V 
        E  T L L N T N I E E 
 S GARLIC KOFI ING SPY LASER 
 O A    K    N  E   A   S    
 BOSTON O CODEC W B D F POEM 
  N       R   O C L>T A    I 
 SPANISHFLU N B E A H TRAINS 
  A       S O BALACLAVA R  C 
 SRILANKA T R   L K I L CATE 
 K D    L A TAB   D   F  R L 
 I A GO I C H U ERR S L ATOL 
 D H  R M E E F   U E A L  A 
 R<OGRE O A R FUN MATTWILSON 
 O      N N N A            E 
 WORD ABYSS I L GUINEA TOKYO 
    R R  U  R O      P     U 
 SUPERMODEL E BACKSTREETBOYS 
 P        O L I         A A  
 A DIDACTYL A LAWN SOARED R  
 C  D  A  L N L           I  
 EDGE STRAYED SOLARECLIPSES  
                             
`;

/**
 * Color is also given in shorthand.
 *   b = blue
 *   c = cyan
 *   g = green
 *   l = lavender
 *   m = mauve
 *   n = corn / cobb
 *   o = orange
 *   p = purple
 *   r = red
 *   y = yellow
 */
const GRID_1_COLOR = `
             g p             
     ggggg   g ppppp         
     g   hgg g     p         
     ghg   g g     p       p  
       g   ggg     p       h 
 gggghgg           p       p 
 g          kg     p       p 
 hgg         h   ppp     ppp 
   g         g   p       p   
 ggg         g   h       p   
 g           g   pph ppp h   
 ggggggggggg g     p h p p   
           g g     p p p p   
           ggg     ppp ppp   
                             
              n              
              n    ko        
  ccccccc     n     h ooo    
  c           n     ooo o    
  hcccccc               ooho 
        c                  o 
        c                  o 
        c                  o 
 ck     c                  h 
 h      h                  o 
 cccc   cc                 o 
    c    c                 o 
 cccc    cc   ooooooooooo oo 
 c        c   o         o o  
 c  ccccccc   o    oooooo o  
 c  c         o           o  
 cccc         ooooooooooooo  

`;

const GRID_2 = `
xxxxxxxxxxxxxxxxxxxxxxx
x#   #   # x#  # #  x#x
xxxxx xxx oxxxx x xox x
x#x#    x x#x#x#   #  x
x x x xxx x o x s x x x
o x x# #    x x x x x x
x o x x xxx x x x o x x
x#    x#    x o x x o x
xxxxxxx xxoxx x x x x x
x#  #    #  x o x x x o
xxox xxxs xox xxx xxx x
xx#x#       # #x# #   x
xx x xxxx xs x x x xx x
x#   x#      o x x##  x
x oxxx xx xx x x xo s x
x#  #x x#    x o# # xxx
x xx x xx xo x x x xx#x
x##  x o#    x#  x#   o
xx x x xx xxxx x x ox x
xx xxx x#      x x# x x
xx#    xx xxxx x x xxxx
xxxxxxxxxxxxxxxxxxxxxxx
`;

const GRID_2_FILL = `

 FLOOPOWDER MANDRAKE M 
 ^   H   RB    R R A E 
 Y STONE R A P AWIZARD 
 U P E   O UWO G T Z D 
US E NIFFLER L O H K L 
 UVL I L   O Y N MYA E 
 FELIX ELDER JBE A BCW 
       U  L  U G N A I 
 BARTYCROUCH ITG C N TE
  I W    N N C   E   H 
  T IMMOBILISED PRIVET 
  O N    C  E U I N  I 
 AMOS LUDOVICLM G KRUM 
 SH   O  R  R B W RO E 
 HALF V SNAPE LAIVAN   
 E  I E  B LT E D R  A 
 STAG GTALBUS DOG TEARL
  O G O  O    O E HA M 
  M   O MONSTER O UK Y 
  BEARD  D    E N R    
                       
`;

const GRID_2_COLOR = `
                       
 lllll               l 
 k   l               l 
     l               l 
     l               l 
     lll             l 
       l             l 
       l            hl 
       l             l 
    llll             lh
    l                l 
    l           llllll 
    l    n      l      
 llll llln      l      
 lh   l  n      l      
 l    l  n     hl      
 l    l  l      l      
 ll   lh l    lll      
  l   l  l    l        
  l   l  llllll        
  lllll                
                       
`;

const GRID_3 = `
xxxxxxxxxxxxxoxxxoxxxxx
xx#      #    #x# # # x
xx xxxxxx xxxx xxx x ox
x#      s x#x#       xx
xx xxoxxx x xxxxxx xxxx
x#     #x#   x#  # # #x
x xxxxx oxx xx xs x x x
x x#      x#    x x x x
x oxxxxxxos ox xo x x o
x## x#   #x x#  x x xxx
xx xx xxx x x xxo x x#x
xx x#  #x o x x#  x#  x
xx xx x x x x x xxx x x
xx x#   x x x x#  # x o
xx xx x x x x xxxx xx x
xx#     x#  x x#      x
xxxxxxxxxxx x xxxx xxsx
x# #    #   x x#    #xx
xxx xxxx xx x xxxx x ox
xx#    x#   x#        x
xxx xxxx xo xxxxxx x xx
xxxxxxxxxxxxxxxxxxxxxxx
`;

const GRID_3_FILL = `
             T   B     
  CURIOSITYSHOP FARORE 
  U      E    O   H OO 
 OCTOROK A N DEEPWOOD  
  C  R   R I      A    
 ZONAITE SAGE AFROMSIA 
 E     YO  H  C  C K N 
 L DUNGEON TALON A U J 
 DP      L ON R ER L UT
 ARK CLOCK F INN I L   
  E  O   A T N  LN T P 
  F BOMB NAH S IZA ULI  
  L  K L A E T C   L E 
  E YIGA L F R EPONA RA
  C  N D E I U    O  R 
  TINGLE TEN M TEKTITE 
       v   A E    E    
 CURSEDMEDAL N RABBIT  
   I    Z  D T    O IE 
  ETHER LAVA SANDWORMS 
   O    O LY      K E  
                       
`;

const GRID_3_COLOR = `
             h         
  rrrrrrrrrrrrr        
  r           r        
  r        r  rrrrr    
  r        r      r    
 rr        r      rr   
 r         r  n    r   
 r         rrrn    r   
 rh      h  h n    r  
 rr  rrrrr   rn    r   
  r  r   r   r     r   
  r  r   rh  r     r   
  r  r   r   r     r   
  r  r   r   r    rr   
  r  r   r   r    r    
  rrrr   rrr r    r    
       k   r r    r    
       rrrrr r    r    
             r    r    
             rrrrrr    
                       
                       
`;

const GRID_4 = `
xxxxxxxxxxxxxxxxxoxxxxx
x#x#  #xxo#    #    x#x
x x xx#  x xxxx xxxxx x
x#   x xxx## #x x#x#x x
x x xx x#xx x x x o x x
x x x#    x x x#  x x x
x x x xx xx o xxx s x x
x x x s#    x o#      x
x x x xx xx x x x x o x
x x x#   x#     o x x x
x s x xs xoxs x x x x x
x xxx x#      x x o x x
x x#  xx xxxx xxxxxxx x
x x o#   x#           x
x x x ox x xxxxxxxxxxox
x## x##  x#        # #x
xx xxx x x xxxxxxxx x x
xs# #  x x x#x#     x x
xx o x#  o x xxxxxx xxx
xxxx xxxxxxx#        xx
xx#          oxxxoxxxxx
xxxxxxxxxxxxxxxxxxxxxxx
`;

const GRID_4_FILL = `
                 V     
 S JADE  LRESISTANCE>R 
 E E  DIN E    A     E 
 CODY M   NASS R T M D 
 O I  O C  D T I OPO L 
 N>K ENDOR M A SAW S I 
 D N Z  R  IAR   C E G 
 D I R ANDOR CAOBADIAH 
 E G A  E  A R S B STT 
 A H BAIL CLOUDSFL L S
 T T R  I E  I U E E A 
 H   I GUNGANS S SLY B
 S CAD  S    E       E 
 T RNGLIE STORMTROOPER 
 A I EI V A          O 
 REX REVA BLASTERBOLTS 
  S   E Z I        A E 
  PILOT A N W ANAKIN V 
  AYU HANAE A      D   
    K       REBELLION  
  TIEFIGHTERSE   P     
                       
`;

const GRID_4_COLOR = `
                       
   mmmm  hmmmmmm    kb 
   m  m   m    m     b 
   m  m   mm   m m   b 
   m  m n  m   m mh  b 
  km  mmn  m   mmm   b 
        n  mh        b 
        nmmm         b 
                    hb
                     b
                     b
                     b
                     b
          bbbbbbbbbbbb
          b          h
          bbbbbbbbbb   
                   b   
                   b   
                   b   
            bbbbbbbb   
  bbbbbbbbbbbh   h     
                       
`;

const GRID_5 = `
xxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxx# # #xxx#x#xxxx
x#       x x x#x x#   x
x xxxxxx x x o x x xxox
x#     x s x x#      #x
x xxxoxxxo x x oxo xx x
x#     #   x x x#     o
x xxxxx xxxx x xxx sx x
x#   x#  # x#   #   x x
xxxoxxx x xxxx x x xo x
xx#     x#   s x#   xxx
xxxxxox x xoxx xoxsxx#x
x#  #   x x#        x x
xoxx xxxx xxox xxxxxx x
x#      x x#       #x x
x xoxxoxx x sx xxxx x x
x# # #    x#      o#  x
xxx x sxx x xx xsxx x x
x#x x#  x o#    # x x x
x x o xxx x xx x xxsx x
x#      x#   x x#   x x
xxxxxxxxxxxxxxxxxxxxxxx
`;

const GRID_5_FILL = `
                       
        SCRIB   V E    
 MARKARTH U R N I MEAD 
 E      I E YOE C B  L 
 RIFTEN V F N WHITERUN 
 I   M   EU J GO BR  O 
 DRAGONSOUL O N BOSMERI
 I     N    L I   H  D 
 ALTO BOLTS FUSRODAH I 
   G   W H    I R R PC 
  EMPIRE EPIC S CODA   
     O L D OO C W    G 
 DARKELF R ECTOPLASM L 
 S  E    A  N R      A 
 PERYITE G SOVNGARDE S 
 O I  N  O M  E    N S 
 DOVAHKIIN EMERALDDNOS<
   O E   B L  C    I W 
 L I AXE OETHALMOR S O 
 A CGV   R E  U I    R 
 BRELYNA NIRN B LUNA D 
                       
`;

const GRID_5_COLOR = `
                       
        yyyyy          
 yyyyyyyy   y          
 y          yh         
 y          y          
 y   h      y          
 yyyyyyy    y          
       y    y          
       yyy  yyyy       
         y             
         y             
         y    n        
         y    n        
         y    n        
         y    nyyyyy   
         y    y    y   
         y    y   hyyyk
         y    y        
         yhyyyy        
         y y           
         yyy           
                       
`;

export type CornMaze = {
  startsAt: number;
  width: number;
  grid: string;
  fill: string;
  color: string;
  pickFillIndices: Set<number>;
  outlineIndices: Set<number>;
  goldIndices: Set<number>;
};

export const CORN_MAZES: CornMaze[] = [
  {
    startsAt: 1,
    width: 29,
    grid: GRID_1,
    fill: GRID_1_FILL,
    color: GRID_1_COLOR,
    pickFillIndices: reduceCoordinatesToIndices(
      [
        { row: 0, col: 13 },
        { row: 0, col: 15 },
        { row: 1, col: 13 },
        { row: 1, col: 15 },
        { row: 2, col: 13 },
        { row: 2, col: 15 },
        { row: 3, col: 13 },
        { row: 3, col: 15 },
        { row: 4, col: 13 },
      ],
      29,
    ),
    goldIndices: reduceCoordinatesToIndices(
      [
        { row: 6, col: 13 },
        { row: 16, col: 20 },
        { row: 23, col: 1 },
      ],
      29,
    ),
    outlineIndices: reduceCoordinatesToIndices(
      [
        { row: 1, col: 3 },
        { row: 1, col: 26 },
        { row: 2, col: 9 },
        { row: 2, col: 22 },
        { row: 3, col: 6 },
        { row: 4, col: 27 },
        { row: 5, col: 5 },
        { row: 5, col: 17 },
        { row: 6, col: 9 },
        { row: 7, col: 1 },
        { row: 7, col: 6 },
        { row: 7, col: 13 },
        { row: 7, col: 21 },
        { row: 8, col: 11 },
        { row: 8, col: 15 },
        { row: 8, col: 23 },
        { row: 9, col: 17 },
        { row: 10, col: 19 },
        { row: 10, col: 25 },
        { row: 11, col: 21 },
        { row: 11, col: 27 },
        { row: 13, col: 7 },
        { row: 15, col: 4 },
        { row: 15, col: 8 },
        { row: 15, col: 12 },
        { row: 15, col: 16 },
        { row: 15, col: 25 },
        { row: 17, col: 20 },
        { row: 19, col: 2 },
        { row: 19, col: 18 },
        { row: 19, col: 26 },
        { row: 20, col: 1 },
        { row: 21, col: 10 },
        { row: 22, col: 6 },
        { row: 22, col: 14 },
        { row: 23, col: 12 },
        { row: 23, col: 20 },
        { row: 23, col: 22 },
        { row: 23, col: 27 },
        { row: 24, col: 1 },
        { row: 24, col: 8 },
        { row: 25, col: 19 },
        { row: 25, col: 24 },
        { row: 27, col: 6 },
        { row: 29, col: 16 },
        { row: 31, col: 10 },
      ],
      29,
    ),
  },
  {
    startsAt: 1,
    width: 23,
    grid: GRID_2,
    fill: GRID_2_FILL,
    color: GRID_2_COLOR,
    goldIndices: reduceCoordinatesToIndices([{ row: 1, col: 1 }], 23),
    outlineIndices: new Set(),
    pickFillIndices: new Set(),
  },
  {
    startsAt: 13,
    width: 23,
    grid: GRID_3,
    fill: GRID_3_FILL,
    color: GRID_3_COLOR,
    goldIndices: reduceCoordinatesToIndices([{ row: 17, col: 7 }], 23),
    outlineIndices: new Set(),
    pickFillIndices: new Set(),
  },
  {
    startsAt: 55,
    width: 23,
    grid: GRID_4,
    fill: GRID_4_FILL,
    color: GRID_4_COLOR,
    goldIndices: reduceCoordinatesToIndices(
      [
        { row: 1, col: 21 },
        { row: 5, col: 3 },
      ],
      23,
    ),
    outlineIndices: new Set(),
    pickFillIndices: new Set(),
  },
  {
    startsAt: 54,
    width: 23,
    grid: GRID_5,
    fill: GRID_5_FILL,
    color: GRID_5_COLOR,
    goldIndices: reduceCoordinatesToIndices([{ row: 16, col: 21 }], 23),
    outlineIndices: new Set(),
    pickFillIndices: new Set(),
  },
];
