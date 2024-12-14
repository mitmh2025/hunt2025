export const MIN_CLUEPHRASE = "SKIPZEROESINDX";
export const PUZZLE_ANSWER = "LITTLETOM";

export type Line = {
  line: string;
  speaker?: string;
};

export type Person = {
  name: string;
  intro: Line[];
  replyUnsuccessful: Line[];
  replySuccessful: Line[];
  validAnswers: string[];
  almostAnswers?: string[];
  postCaseFile?: Line[];
  nextPerson?: Person;
};

export type PuzzleStatus = {
  lettersCollected: string;
  clueLettersCollected: string;
};

const AGENT_NAME = "Agent";
const Ending: Person = {
  name: AGENT_NAME,
  intro: [
    {
      line: "You walk in the door--only to be greeted by a team of burly security guards! They march you down the hall and into a white, windowless room occupied only by an agent, a desk, and a dossier.",
    },
    {
      line: "The agent stands up and smiles as the guards push you in and close the door.",
    },
    {
      line: "Well well well! You've made it here--congratulations! We've been tracking your snooping for some time. Look--we have a case file of all the aliases and disguises you've used in this little adventure.",
      speaker: AGENT_NAME,
    },
  ],
  postCaseFile: [
    {
      line: "Yes, we at the MITropolis Intelligence Team also have an...interest in Billie's former partner. And we have some relevant data we've collected. But that information is for the eyes of said erstwhile 2 P.I. Noir partner only. No one else.",
      speaker: AGENT_NAME,
    },
    {
      line: "So we'll just have to sit in this little room till he finally arrives. Do you know his name?",
      speaker: AGENT_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "The man at the desk watches you coldly and says nothing.",
    },
  ],
  replySuccessful: [
    {
      line: "The agent grins like a great white.",
    },
    {
      line: "LITTLE TOM, you have finally arrived!",
      speaker: AGENT_NAME,
    },
    {
      line: "Then the agent...winks at you?",
    },
    {
      line: "'Little' Tom Tibbets found a new vocation and was scrubbed from the face of MITropolis, vanished from the world...but as you've discovered there were a few loose ends that might lead back to my new identity here.",
      speaker: AGENT_NAME,
    },
    {
      line: "Now that you are impersonating me, you'll find that those clues lead back to you instead.",
      speaker: AGENT_NAME,
    },
    {
      line: "I'm not 'Little' Tom Tibbets anymore. I'm a spook that you'll never see again.",
      speaker: AGENT_NAME,
    },
    {
      line: "His face curves into a thin smirk.",
    },
    {
      line: "I hope that in my past life, I haven't done anything that you might regret.",
      speaker: AGENT_NAME,
    },
  ],
  validAnswers: [],
};

const COMPUTER_NAME = "SECURITY";
const Computer: Person = {
  name: COMPUTER_NAME,
  intro: [
    {
      line: "At the door of the MITropolis intelligence safehouse, there is a call box. You press the button and a digitized computer voice answers.",
    },
    {
      line: "Greetings. I am System SECURITY. Error: I only accept commands from HQ to open this door.",
      speaker: COMPUTER_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "Error: I only accept commands from HQ to open this door.",
      speaker: COMPUTER_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "Command accepted. Door opening.",
      speaker: COMPUTER_NAME,
    },
  ],
  validAnswers: ["HQ"],
  nextPerson: Ending,
};

const DINERAGENT_NAME = "EVE";
const DinerAgent: Person = {
  name: DINERAGENT_NAME,
  intro: [
    {
      line: "At the diner you find an operative named EVE, sullenly nursing a cup of coffee. She immediately preempts you:",
    },
    {
      line: "Lisentret. I'm a paying customer. Free refills. I don't gotta go nowhere.",
      speaker: DINERAGENT_NAME,
    },
    {
      line: "You explain that you just want to talk, but she cuts you off.",
    },
    {
      line: "I'm waiting for my Pokemoniker agent in Avonlea to check in. If that ain't you, bayleef me alone.",
      speaker: DINERAGENT_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "I'm waiting for my source. She's on her way across the water by ferry. Electabuzz off.",
    },
  ],
  replySuccessful: [
    {
      line: "<i>Finally</i>, Ms. Cuthbert. I've been waiting for you all day! There's a man who's been visiting MITropolis Intelligence buildings. I don't think he's one of ours. I don't know who to trust. I think he's somewhere in the Intelligence safehouse right now. Find him.",
      speaker: DINERAGENT_NAME,
    },
  ],
  validAnswers: ["MARILLACUTHBERT"],
  almostAnswers: ["MARILLA"],
  nextPerson: Computer,
};

const BUREAUCRAT_NAME = "OGDEN";
const Bureaucrat: Person = {
  name: BUREAUCRAT_NAME,
  intro: [
    {
      line: `You find the address of a MITropolis Department of Education bureaucrat Ms. ${BUREAUCRAT_NAME}. She refuses to talk to you and says she will only talk to her president.`,
    },
  ],
  replyUnsuccessful: [
    {
      line: "Are you the president of MITropolis education? Then get your head out of my business, or I'll have to throw hands!",
      speaker: BUREAUCRAT_NAME,
    },
    {
      line: "She slams the door.",
    },
  ],
  replySuccessful: [
    {
      line: "Oh! Madame President! What a pleasure. I'm happy to help. That frightful hooligan who barged into my office that evening didn't steal anything or even say anything to me. He just jumped out the window and into the street! I last saw him turn into the diner at the end of the alley.",
    },
  ],
  validAnswers: ["SALLYKORNBLUTH"],
  almostAnswers: ["KORNBLUTH"],
  nextPerson: DinerAgent,
};

const DETECTIVE_NAME = "RACHMALE";
const Detective: Person = {
  name: DETECTIVE_NAME,
  intro: [
    {
      line: `Standing in front of the smoldering wreck of a MITropolis music venue, you meet a police detective called ${DETECTIVE_NAME} absent-mindedly eating an ice cream cone.`,
    },
    {
      line: "Hello, rookie. As you can hopefully tell, this is an official arson case under investigation. Everyone is a suspect right now. Unless you're a musician and you didn't start the fire, I'm afraid I can't talk to you.",
      speaker: DETECTIVE_NAME,
    },
    {
      line: "She finishes her cone.",
    },
    {
      line: "Or if you'll sell me more ice cream.",
      speaker: DETECTIVE_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "The detective ignores you, staring broodily into the smoking remains of the music venue.",
    },
  ],
  replySuccessful: [
    {
      line: "Good day, Maestro Toscanini. I love your ice cream. I don't suppose you have any on you... It melted? Rats.",
      speaker: DETECTIVE_NAME,
    },
    {
      line: "Yes, I've heard about that suspicious character. He was seen at a local education official's office late one night. Go ahead and interview her if you want.",
      speaker: DETECTIVE_NAME,
    },
  ],
  validAnswers: ["TOSCANINI"],
  nextPerson: Bureaucrat,
};

const CORNER_NAME = "EOWER/EUFF";
const PowerpuffGirl: Person = {
  name: "Little girl",
  intro: [
    {
      line: `Waiting at the ${CORNER_NAME} trolley stop is a tiny redheaded girl with gigantic eyes wearing a red bow. When you try to talk to her, she replies:`,
    },
    {
      line: "Sorry, my two sisters keep telling me that I shouldn't talk to people outside my family.",
      speaker: "Little girl",
    },
  ],
  replyUnsuccessful: [
    {
      line: "The little girl carefully ignores you.",
    },
  ],
  replySuccessful: [
    {
      line: "Thanks for keeping me company!",
      speaker: "Little girl",
    },
    {
      line: "Yes, I remember that man. He always got off at the stop near that music venue that just burned down.",
      speaker: "Little girl",
    },
  ],
  validAnswers: ["BUTTERCUP", "BUBBLES", "PROFESSORUTONIUM"],
  nextPerson: Detective,
};

const SAILOR_NAME = "ERIATARA";
const Sailor: Person = {
  name: SAILOR_NAME,
  intro: [
    {
      line: `You find the choir singing sea shanties outside a shop that sells sweets, tea, and liquor. One of the baritones, ${SAILOR_NAME}, turns out to be a bona fide sailor. He refuses to talk to you.`,
    },
    {
      line: "Gods, some of these lyrics are a tonguin' to sing. Oh well. Once the concert is done, all I want to do is to find me ship!",
      speaker: SAILOR_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "Go away. The only 'person' I want to meet is my whaling ship.",
      speaker: SAILOR_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "Ah! Me blessed ship, of which so many have sung praises! Alas, I can't bring that fellow aboard for ya. But the landlubber always came to practice by streetcar. His usual tram of the line's over there.",
      speaker: SAILOR_NAME,
    },
  ],
  validAnswers: ["BILLYOTEA"],
  nextPerson: PowerpuffGirl,
};

const DUNGEONMASTER_NAME = "PENNAN";
const DungeonMaster: Person = {
  name: DUNGEONMASTER_NAME,
  intro: [
    {
      line: `The "book club" turns out to be a Dungeons & Dragons campaign run by a ginger dropout. Despite his usual penchant for villainous monologues, at the moment the dungeon master, ${DUNGEONMASTER_NAME}, refuses to speak to anyone other than his entire campaign group.`,
    },
  ],
  replyUnsuccessful: [
    {
      line: "I'm busy, one of my players keeps rolling clutch nat 20s and wrecking my plans. I have to rework my entire campaign plotline!",
      speaker: DUNGEONMASTER_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "HeLLLOOOO one and all and welcome to another episode of-- what, you don't want the whole intro? FINE.",
      speaker: DUNGEONMASTER_NAME,
    },
    {
      line: "You're looking for one of the old side quest members? I know he also performs in a local choir. Here's a flyer he gave me with their upcoming concerts.",
      speaker: DUNGEONMASTER_NAME,
    },
  ],
  validAnswers: [
    "INTREPIDHEROES",
    "VILEVILLAINS",
    "TINYTHIEVES",
    "BUCCANEERBUDDIES",
    "SYLVANSLEUTHS",
    "HEROICHIGHSCHOOLERS",
    "QUESTINGQUEENS",
    "PREFRONTALPIS",
    "AMAZINGACTIONHEROES",
  ],
  nextPerson: Sailor,
};

const CRITIC_NAME = "IAN IGGENFORD";
const Critic: Person = {
  name: CRITIC_NAME,
  intro: [
    {
      line: "Across town, you walk up to a fine brownstone manse belonging to venerated literary critic IAN IGGENFORD. His butler informs you that he is expecting to interview a rising star of an American author who wrote a great novel a few years back--a double-amputee's memoir or something. Otherwise, he is not taking visitors.",
    },
  ],
  replyUnsuccessful: [
    {
      line: "The butler politely but firmly bids you farewell.",
    },
  ],
  replySuccessful: [
    {
      line: "The butler leads you in.",
    },
    {
      line: "Welcome, welcome, Mr. Hemingway! I'm anxious to discuss your marvelous <i>A Farewell to Arms</i>...",
      speaker: CRITIC_NAME,
    },
    {
      line: "Ah, my old tenant? Kind of an odd question to lead with...but I suppose you realist auteurs have to keep in touch with the <i>common</i> element, eh?",
      speaker: CRITIC_NAME,
    },
    {
      line: "Hmm... he used to attend some sort of book club meeting--lowbrow, you know, very droll. His compatriots there might know more.",
      speaker: CRITIC_NAME,
    },
  ],
  validAnswers: ["ERNESTHEMINGWAY"],
  almostAnswers: ["HEMINGWAY"],
  nextPerson: DungeonMaster,
};

const FIANCE_NAME = "KARL";
const Fiance: Person = {
  name: FIANCE_NAME,
  intro: [
    {
      line: "You ring the bloke--a fellow named KARL that your target went on a date with a while back. It seems that he's seeing someone else now, and quite seriously.",
    },
    {
      line: "I need a crystal gem for my sweetheart's engagement ring. Otherwise, I'm not interested!",
      speaker: FIANCE_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "A crystal gem will save my day, but that's not you!",
      speaker: FIANCE_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "A crystal gem! Wow! Hello! Though you maybe too large to fit in a ring...hmm.",
      speaker: FIANCE_NAME,
    },
    {
      line: "Oh, my ex? He ghosted me <i>ages</i> ago. But I can put you in touch with his old landlord.",
      speaker: FIANCE_NAME,
    },
  ],
  validAnswers: ["GARNET", "AMETHYST", "PEARL", "STEVEN"],
  nextPerson: Critic,
};

const SNOWMAN_NAME = "SALTY";
const Snowman: Person = {
  name: SNOWMAN_NAME,
  intro: [
    {
      line: `The ice rink is deserted. Bored, you turn to a snowman next to the rink and ask it for help. The snowman, named ${SNOWMAN_NAME}, turns its back to you with a sniff.`,
    },
    {
      line: "Forgive my frostiness, but I'm a snowman. I'm not supposed to talk at all. Though I might make an exception for a skater or two with the most medallions.",
      speaker: SNOWMAN_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "The snowman pretends to not be a talking snowman.",
    },
  ],
  replySuccessful: [
    {
      line: "The snowman fangasms.",
    },
    {
      line: "<i>Okay, be cool, be cool.</i> How can I help you?",
      speaker: SNOWMAN_NAME,
    },
    {
      line: "Someone who skated here on a date... I think I know the one you mean.",
      speaker: SNOWMAN_NAME,
    },
    {
      line: "I don't know where he's from, but I can give you his date's number.",
      speaker: SNOWMAN_NAME,
    },
    {
      line: "...",
      speaker: SNOWMAN_NAME,
    },
    {
      line: "OH my GAWD I LOVED your Moulin Rouge routine--",
      speaker: SNOWMAN_NAME,
    },
  ],
  validAnswers: ["TESSAVIRTUE", "SCOTTMOIR"],
  almostAnswers: ["VIRTUE", "MOIR"],
  nextPerson: Fiance,
};

const CATLADY_NAME = "XIMENA";
const CatLady: Person = {
  name: CATLADY_NAME,
  intro: [
    {
      line: "You can hear the mewing from across the block. The apartment has a catio full of cat toys, furniture, and food and is inhabited by dozens of cats with many different colors, patterns, and personalities.",
    },
    {
      line: "You can also hear a collection of recordings of the popular radio show <i>Bouffina, Slayer of Vampyres</i> playing in the drawing room.",
    },
    {
      line: `The owner, ${CATLADY_NAME}, refuses to open the door for fear that some of the cats might escape. But there might be one cat she would open up for...`,
    },
  ],
  replyUnsuccessful: [
    {
      line: "Go away! The cats are trying to sleep!",
      speaker: CATLADY_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "Willow! My little baby! You're the last kitty for my collection! Come in, come in!",
      speaker: CATLADY_NAME,
    },
    {
      line: "...Oh, yes, my son. He hasn't called or written lately, the cheeky boy. Last I heard he had a new beau--they had a date scheduled at the local ice rink!",
      speaker: CATLADY_NAME,
    },
  ],
  validAnswers: ["WILLOW"],
  nextPerson: Snowman,
};

const MANICURIST_NAME = "DARLENE";
const Manicurist: Person = {
  name: MANICURIST_NAME,
  intro: [
    {
      line: "The nail salon's waiting area is packed. The busy manicurist glances at you, nametag reading DARLENE. She takes one earbud out of her ear, music blasting.",
    },
    {
      line: "Oh, a P.I.? Sorry, but I'm busy applying this polish. It <i>sounds like</i> I can't chat till I finish serving all these people After Dark.",
    },
  ],
  replyUnsuccessful: [
    {
      line: `You can still hear ${MANICURIST_NAME}'s rap metal music blasting, even with her earbuds in.`,
    },
    {
      line: "<i>Oh, P.I.,</i> you're still here? Try After Dark, y'hear me?",
      speaker: MANICURIST_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "The manicurist drops her emery board.",
    },
    {
      line: "Oh, my, heavens. Mike Shinoda???",
      speaker: MANICURIST_NAME,
    },
    {
      line: "Oh, you're looking for one of my old customers?",
      speaker: MANICURIST_NAME,
    },
    {
      line: "Sometimes he came in with his mother--a total homebody. I guess that was his way of getting her out of the house. I can give you her address.",
      speaker: MANICURIST_NAME,
    },
  ],
  validAnswers: ["LINKINPARK"],
  nextPerson: CatLady,
};

const ROMAN_NAME = "IALLIUS";
const Roman: Person = {
  name: ROMAN_NAME,
  intro: [
    {
      line: `You start your search with a Roman slave named ${ROMAN_NAME}. He refuses to talk to you.`,
    },
    {
      line: "I will only speak with Spartacus!",
      speaker: ROMAN_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "Go away. I will only speak with Spartacus!",
      speaker: ROMAN_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "Ah, Spartacus. I am glad to have found you.",
      speaker: ROMAN_NAME,
    },
    {
      line: "You seek this person? I do not know where he is now, but I know he frequented a <i>cosmeta</i> nearby.",
      speaker: ROMAN_NAME,
    },
  ],
  validAnswers: ["SPARTACUS"],
  nextPerson: Manicurist,
};

const FirstPerson = Roman;

export const RESERVED_NAMES = ((): string[] => {
  let currentPerson = FirstPerson;
  let names: string[] = [];

  while (currentPerson.nextPerson) {
    names = [...names, ...currentPerson.validAnswers];
  }

  return names;
})();

export { FirstPerson };
