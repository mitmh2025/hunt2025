export type Question = {
  text: string;
  answer: number;
};

export const ALL_NORMAL_QUESTIONS: Question[] = [
  {
    text: "How many smoots will take you from one end of the Infinite Corridor to the other?",
    answer: 147.4,
  },
  {
    text: "In what year did the Mystery Hunt first exceed 100 non-meta puzzles?",
    answer: 2003,
  },
  {
    text: "How many gender-inclusive bathrooms are there in the Main Group? (That’s buildings 1, 3, 5, 7, 2, 4, 6, 8, 6C, 10, and 11.)",
    answer: 15,
  },
  {
    text: "In building 2, there’s a sculpture called Chord. How many cylindrical rods are in that sculpture?",
    answer: 905,
  },
  {
    text: "If MIT tuition increased by the same percentage as it did from 2014 to 2024, what will one semester of tuition cost in 2034?",
    answer: 42964.67,
  },
  {
    text: "How many teams are signed up for this Mystery Hunt?",
    answer: 145,
  },
  {
    text: "What percentage of MIT undergraduates have Math as their primary major? (Both XVIII and XVIII-C count.)",
    answer: 7.6075,
  },
  {
    text: "How many external windows are there in the Green Building?",
    answer: 324,
  },
  {
    text: "How many scientist names are there in Killian Court?",
    answer: 115,
  },
  {
    text: "How many non-overlapping Great Domes could you fit onto Briggs and O’Brien Fields?  Assume that the domes must lie on the ground in the normal dome orientation.",
    answer: 55,
  },
  {
    text: "By the time this quiz show ends, how many puzzles will your team have solved?",
    answer: 0,
  },
  {
    text: "In building 6C, there is a piece of artwork called Bars of Color within Squares. How many colored regions are there in that art?",
    answer: 133,
  },
  {
    text: "How many buildings on the MIT campus have building numbers that have no letters and are prime numbers?",
    answer: 11,
  },
  {
    text: "How many letters are in the inscription on the third floor of Lobby 7?",
    answer: 116,
  },
  {
    text: "How many official clubs / organizations have ASA-assigned bulletin board spaces on the Infinite Corridor?",
    answer: 96,
  },
  {
    text: "How many official Duck Konundra have there been in Mystery Hunt history?",
    answer: 8,
  },
  {
    text: "How many steps would  you need to ascend in order to climb the Green Building 25 times?",
    answer: 10525,
  },
  {
    text: "How many varsity sports are offered at MIT? (Men’s/women’s/coed sports are all counted separately.)",
    answer: 33,
  },
  {
    text: "Assuming all registered teams were 100% accurate when they signed up, how many hunters are participating in this Mystery Hunt?",
    answer: 4164,
  },
  {
    text: "How many windows are there on the outside of Stata?",
    answer: 555,
  },
  {
    text: "By the time this quiz show ends, how many answer submissions (whether correct or not) will ALL participating teams have submitted for this Mystery Hunt?",
    answer: 0,
  },
  {
    text: "How many Nobel prizes are held by current MIT faculty and staff?",
    answer: 13,
  },
  {
    text: "If you traveled from MIT Medical to building 7 through the basements using the shortest path, how far would you travel in smoots?",
    answer: 435.0839,
  },
  {
    text: "How many distinct Greek letters are represented by MIT’s FSILGs?",
    answer: 18,
  },
  {
    text: "How many bathrooms are there in the Main Group? (That’s buildings 1, 3, 5, 7, 2, 4, 6, 8, 6C, 10, and 11.)",
    answer: 63,
  },
  {
    text: "How many names are on the memorials in Lobby 10?",
    answer: 394,
  },
  {
    text: "As of October 2023, how many professors were employed at MIT?",
    answer: 1089,
  },
  {
    text: "Kresge Auditorium is shaped like an eighth of a sphere. What is the radius of that sphere, in smoots?",
    answer: 20.06,
  },
  {
    text: "Ignoring wind resistance, what is the maximum speed (in miles per hour) that a pumpkin dropped from the top of the Green Building will reach?",
    answer: 90.8,
  },
  {
    text: "During MIThenge, what is the sun’s azimuthal angle, in degrees?",
    answer: 245.75,
  },
  {
    text: "What percentage of MIT undergraduates have their primary major listed as literature, music, or theater arts?",
    answer: 0.11025358,
  },
  {
    text: "How many differently-numbered MIT buildings are west of Mass Ave?",
    answer: 65,
  },
  {
    text: "How many events were on the schedule for REX 2024?",
    answer: 303,
  },
  {
    text: "As of January 4th, how many different e-mail addresses are subscribed to ec-discuss?",
    answer: 1004,
  },
  {
    text: "What percentage of applicants for the class of 2029 were accepted early?",
    answer: 5.981913,
  },
  {
    text: "What is the complete dining capacity of Lobdell dining hall?",
    answer: 360,
  },
  {
    text: "How many trees are located within Killian Court?",
    answer: 64,
  },
  {
    text: "Assuming ideal packing efficiency, how many standard orchestral snare drums could fit in one layer on the Kresge main stage?",
    answer: 1084,
  },
  {
    text: "How many truck loads did the MIT Museum need in order to move the collection to their new location?",
    answer: 135,
  },
];

export const ALL_GEOGUESSR_LOCATIONS = [
  "corner of 3-1 near building 1",
  "Great Sail, between 50 and 14N",
  "26-100",
  "8-4",
  "outside 26-100",
  "Baker House",
  "MIT Medical",
  "10-485",
  "W20-5",
  "Stata Center",
  "3-1 on the Infinite",
  "16-0",
];

export type Artist = {
  name: string;
  albums: [string, string, string];
};

export const ALL_ARTISTS: Artist[] = [
  { name: "Taylor Swift", albums: ["Lover", "Folklore", "Reputation"] },
  {
    name: "Oasis",
    albums: [
      "Definitely Maybe",
      "(What’s the Story) Morning Glory?",
      "Be Here Now",
    ],
  },
  {
    name: "Sabrina Carpenter",
    albums: ["Singular: Act I", "Short n’ Sweet", "Singular: Act II"],
  },
  {
    name: "Third Eye Blind",
    albums: ["Third Eye Blind", "Blue", "Out of the Vein"],
  },
  { name: "ABBA", albums: ["Ring Ring", "Super Trouper", "Voulez-Vous"] },
  {
    name: "Tenacious D",
    albums: ["Post-Apocalypto", "The Pick of Destiny", "Tenacious D"],
  },
  {
    name: "Eminem",
    albums: ["The Slim Shady LP", "The Marshall Mathers LP", "Relapse"],
  },
  {
    name: "Tom Petty and the Heartbreakers",
    albums: [
      "Let Me Up (I’ve Had Enough)",
      "Into the Great Wide Open",
      "Hypnotic Eye",
    ],
  },
  {
    name: "Hootie & the Blowfish",
    albums: [
      "Fairweather Johnson",
      "Cracked Rear View",
      "Hootie & the Blowfish",
    ],
  },
  {
    name: "Elton John",
    albums: ["Goodbye Yellow Brick Road", "21 at 33", "Rock of the Westies"],
  },
  {
    name: "Our Lady Peace",
    albums: ["Clumsy", "Spiritual Machines II", "Spiritual Machines"],
  },
  {
    name: "Bad Bunny",
    albums: ["Un Verano Sin Ti", "YHLQMDLG", "El Último Tour del Mundo"],
  },
  { name: "Van Halen", albums: ["Van Halen", "Fair Warning", "5150"] },
  {
    name: "Insane Clown Posse",
    albums: ["Carnival of Carnage", "Bizaar", "The Wraith: Hell’s Pit"],
  },
  {
    name: "OutKast",
    albums: ["Stankonia", "Speakerboxxx / The Love Below", "Aquemini"],
  },
  {
    name: "U2",
    albums: ["The Joshua Tree", "Zooropa", "All That You Can’t Leave Behind"],
  },
  { name: "Santana", albums: ["Santana III", "Borboletta", "Marathon"] },
];
