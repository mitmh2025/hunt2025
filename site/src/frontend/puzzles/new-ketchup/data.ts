export const MIN_CLUEPHRASE = "SKIPZEROESINDX";
export const PUZZLE_ANSWER = "LITTLETOM";

type Person = {
  getName: (s?: PuzzleStatus) => string;
  getIntro: (name: string) => string;
  replyUnsuccessful: string;
  replySuccessful: string;
  validAnswers: string[];
  almostAnswers?: string[];
  getPointer: (s?: PuzzleStatus) => Pointer;
};

type Pointer = {
  dialog: string;
  nextPerson: Person | null;
};

type PuzzleStatus = {
  lettersCollected: string;
  clueLettersCollected: string;
};

const Roman: Person = {
  getName: () => "SEPTIMA",
  getIntro: (name: string) =>
    `You start your search with a Roman aristocrat named ${name}. She refuses to talk to you. "I will only speak with Spartacus!"`,
  replyUnsuccessful: '"Go away. I will only speak with Spartacus!"',
  replySuccessful: '"Ah, yes, Spartacus. I am glad to have found you."',
  validAnswers: ["SPARTACUS"],
  getPointer: () => ({
    dialog:
      '"You seek this person? I do not know where he is now, but I know he took dance lessons at a dance studio nearby."',
    nextPerson: Dancer,
  }),
};

const Dancer: Person = {
  getName: () => "KELLY",
  getIntro: (name: string) =>
    `You go to the dance studio, which has an ornate green glass door and planetarium-esque star designs on the walls. Walking inside, you meet an instructor named ${name}. She refuses to talk to you. "I\'m only interested in talking to moonwalkers. Shamone!"`,
  replyUnsuccessful:
    '"If a moonwalker walks through that green glass door, I\'ll talk to him. Otherwise, beat it!"',
  replySuccessful: '"Oh hellooooo, spaceman!"',
  validAnswers: [
    "BUZZALDRIN",
    "EDGARMITCHELL",
    "DAVIDSCOTT",
    "HARRISONSCHMITT",
  ],
  almostAnswers: ["ALDRIN", "MITCHELL", "SCOTT", "SCHMITT"],
  getPointer: () => ({
    dialog:
      '"You looking for one of my old students? Last I saw him, he was getting his nails did at the salon across the way."',
    nextPerson: Manicurist,
  }),
};

const Manicurist: Person = {
  getName: () => "IRENE",
  getIntro: (name: string) =>
    `The salon's waiting area is packed. The busy manicurist glances at you, nametag reading ${name}. She takes one earbud out of her ear, music blasting. "Oh, a P.I.? Sorry, but it sounds like I can't talk till I apply this After Dark."`,
  replyUnsuccessful:
    '"You\'re still here? The only people I could make time for are my favorite band, the one that sounds just like my favorite polish."',
  replySuccessful:
    'She drops her emery board. "Oh, my, heavens. Mike Shinoda???"',
  validAnswers: ["LINKINPARK"],
  getPointer: () => ({
    dialog:
      '"Oh, you\'re looking for one of my old customers? He got a mani-pedi--said he had a date at the ice rink."',
    nextPerson: Snowman,
  }),
};

const Snowman: Person = {
  getName: () => "PIX",
  getIntro: (name: string) =>
    `The ice rink is deserted. Bored, you turn to a snowman next to the rink and ask it for help. The snowman, named ${name}, turns its back to you with a sniff. "Forgive my frostiness, but I'm a snowman. I'm not supposed to talk at all. Though I might make an exception for a skater or two with the most medallions."`,
  replyUnsuccessful: "The snowman pretends to not be a talking snowman.",
  replySuccessful:
    'The snowman fangasms. "Okay, be cool, be cool. How can I help you?',
  validAnswers: ["TESSAVIRTUE", "SCOTTMOIR"],
  almostAnswers: ["VIRTUE", "MOIR"],
  getPointer: () => ({
    dialog:
      "\"Someone who skated here on a date... I think I know the one you mean. I don't know where he went, but I can give you his date's number. ... OH my GAWD I LOVED your Moulin Rouge routine--\"",
    nextPerson: Fiance,
  }),
};

const Fiance: Person = {
  getName: () => "ZACHARY",
  getIntro: (name: string) =>
    `You ring the bloke--a fellow named ${name} that your target went on a date with a while back. It seems that he's seeing someone else now, and quite seriously. "I need a crystal gem for my sweetheart's engagement ring. Otherwise, I'm not interested!"`,
  replyUnsuccessful:
    '"A crystal gem will always save my day, but that\'s not you!"',
  replySuccessful:
    '"A crystal gem! Wow! Hello! Though you maybe too large to fit in a ring...hmm."',
  validAnswers: ["GARNET", "AMETHYST", "PEARL", "STEVEN"],
  getPointer: () => ({
    dialog:
      '"Oh, that\'s my ex. He ghosted me months ago. But I can put you in touch with his old landlord."',
    nextPerson: Critic,
  }),
};

const Critic: Person = {
  getName: () => "EAMES ELLINGWORTH",
  getIntro: (name: string) =>
    `Across town, you walk up to a fine brownstone manse belonging to venerated literary critic ${name}. His butler informs you that he is expecting to interview a rising star of an American author who wrote a great novel a few years back--a double-amputee's memoir or something. Otherwise, he is not taking visitors.`,
  replyUnsuccessful: "The butler politely but firmly bids you farewell.",
  replySuccessful:
    'The butler leads you in. "Welcome, welcome, Mr. Hemingway! I\'m anxious to discuss your marvelous A Farewell to Arms..."',
  validAnswers: ["ERNESTHEMINGWAY"],
  almostAnswers: ["HEMINGWAY"],
  getPointer: () => ({
    dialog:
      '"Ah, my old tenant? Kind of an odd question to lead with...but I suppose you realist auteurs have to keep in touch with the common element, eh? Well, he used to attend some sort of book club meeting--lowbrow, you know, very droll. His compatriots there might know more."',
    nextPerson: DungeonMaster,
  }),
};

const DungeonMaster: Person = {
  getName: () => "RENNAN",
  getIntro: (name: string) =>
    `The "book club" turns out to be a Dungeons & Dragons campaign, run by a ginger dropout with a penchant for villainous monologues. Despite his verbal aptitudes, however, at the moment the dungeon master, ${name}, refuses to speak to anyone other than his entire campaign group.`,
  replyUnsuccessful:
    '"I\'m busy, one of my allies keeps rolling clutch nat 20s and I have to rework my entire campaign plotline."',
  replySuccessful:
    '"HeLLLOOOO one and all and welcome to another episode of-- what, you don\'t want the whole intro? FINE."',
  validAnswers: ["ERNESTHEMINGWAY"],
  almostAnswers: ["HEMINGWAY"],
  getPointer: (status) => {
    if (status?.lettersCollected.startsWith("LITT")) {
      return {
        dialog:
          "\"You're asking about one of the old party members? I don't know where he is now, but he used to buy dice and stuff from an old lady across town. I can give you her address.\"",
        nextPerson: CatLady,
      };
    }
    return {
      dialog:
        '"You\'re asking about one of the old party members? He always went down to a local drinking hole after D&D sessions. You might go look there."',
      nextPerson: Bar,
    };
  },
};

const Bar: Person = {
  getName: () => "OLD OSPREY",
  getIntro: (name: string) =>
    `You enter The ${name}, a dark, hazy dive. A thespian, a meteorologist, and a gambler are sitting at the bar. You sit down at the last empty stool and try to ask questions, but it's hard to get a conversation started. The thespian says that they'll only talk to quadruple-crown winners. The meteorologist's special interest is in things that involve major hurricanes. And the gambler would prefer it if travel destinations, particularly cities in Nevada, were included.`,
  replyUnsuccessful:
    "This drinking hole is quiet, except for an old gramophone in need of some grease. None of the patrons are willing to speak up unless the rest of them also want to.",
  replySuccessful: "Finally you capture the whole bar's interest.",
  validAnswers: ["RITAMORENO"],
  getPointer: () => ({
    dialog:
      "They tell you that your target often got a drink to go--to bring to a friend down the street who was a bit of a shut-in.",
    nextPerson: CatLady,
  }),
};

const CatLady: Person = {
  getName: (status) => {
    if (status?.clueLettersCollected === "SKIPZERO") {
      return "EVANGELINE";
    } else if (status?.clueLettersCollected === "SKIPZER") {
      return "OLGA";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `You can hear the mewing from across the street. The apartment has a catio full of cat toys, furniture, and food and is inhabited by dozens of cats with many different colors, patterns, and personalities. You can also hear a collection of recordings of the popular radio show Bouffina, Slayer of Vampires playing in the drawing room. The owner, ${name}, refuses to open the door for fear that some of the cats might escape. But there might be one cat she would open up for...`,
  replyUnsuccessful: '"Go away! The cats are trying to sleep!"',
  replySuccessful:
    "Willow! My little baby! You're the last kitty for my collection! Come in, come in!",
  validAnswers: ["WILLOW"],
  getPointer: () => ({
    dialog:
      '"...Oh, sure, I can tell you about him. He hasn\'t been by in a while, sadly. He had a co-author friend, for the newspaper I think; she might know more. She often frequents the local theme park."',
    nextPerson: DisneyAdult,
  }),
};

const DisneyAdult: Person = {
  getName: (status) => {
    if (status?.clueLettersCollected === "SKIPZEROE") {
      return "SIDNEY";
    } else if (status?.clueLettersCollected === "SKIPZERO") {
      return "ELLA";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `At the theme park, you encounter an unabashed "Disney Adult" named ${name}, wearing Mickey Mouse ears and an Elsa costume. She is working out a crossword on paper--watching carefully, you realize she is not solving the crossword but rather trying to construct a new one. "Ugh! I can't make this animated musical theme work! If only one of the crosswordiest Disney characters could help me..."`,
  replyUnsuccessful:
    "The Disney fan is too focused on her crossword-in-progress to even give you the time of day.",
  replySuccessful:
    "\"Oh my goodness, I hadn't requested a character visit! This is delightful! You're an inspiration...\"",
  validAnswers: ["ANNA", "ARIEL", "ERIC", "SMEE"],
  getPointer: (status) => {
    if (status?.lettersCollected.startsWith("LITTLE")) {
      return {
        dialog:
          '"We always met at a cafe near that music venue that burned down. Maybe he still hangs out there?"',
        nextPerson: Detective,
      };
    }
    return {
      dialog:
        '"The last time I saw my usual co-author, he was at the bus stop on the corner. You might try there?"',
      nextPerson: PowerpuffGirl,
    };
  },
};

const PowerpuffGirl: Person = {
  getName: (status) => {
    if (status?.clueLettersCollected === "SKIPZEROES") {
      return "SOWER/SUFF";
    } else if (status?.clueLettersCollected === "SKIPZEROE") {
      return "IOWER/IUFF";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `Waiting at the ${name} bus stop is a tiny redheaded girl with gigantic eyes wearing a red bow. When you try to talk to her, she says, "Sorry, my two sisters keep telling me that I shouldn't talk to people outside my family."`,
  replyUnsuccessful: "The little girl carefully ignores you.",
  replySuccessful: '"Oh, hi! Thanks for keeping me company."',
  validAnswers: ["BUTTERCUP", "BUBBLES", "PROFESSORUTONIUM"],
  getPointer: () => ({
    dialog:
      '"Yes, that guy used to take this bus regularly. He always got off at the stop near that music venue that just burned down."',
    nextPerson: Detective,
  }),
};

const Detective: Person = {
  getName: (status) => {
    if (status?.clueLettersCollected === "SKIPZEROESI") {
      return "NEFF";
    } else if (status?.clueLettersCollected === "SKIPZEROES") {
      return "IBSEN";
    } else if (status?.clueLettersCollected === "SKIPZEROE") {
      return "SUTHERLAND";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `Standing in front of the smoldering wreck of a MITropolis music venue, you meet a police detective called ${name} absent-mindedly eating an ice cream cone. "Hello, rookie. As you can hopefully tell, this is an official arson case under investigation. Everyone is a suspect right now. Unless you're a musician and you didn't start the fire, I'm afraid I can't talk to you." She finishes her cone. "Or if you've got more ice cream."`,
  replyUnsuccessful:
    "The detective ignores you and stares broodily into the smoking remains of the music venue.",
  replySuccessful:
    '"Good day, Maestro Toscanini. I love your ice cream. I don\'t suppose you have any on you... Drat."',
  validAnswers: ["TOSCANINI"],
  getPointer: () => ({
    dialog:
      '"Yes, I\'ve heard about that suspicious character who was hanging around here. The commander of the station down the block told me about him. You might ask him for more details."',
    nextPerson: Sisko,
  }),
};

const Sisko: Person = {
  getName: (status) => {
    if (status?.clueLettersCollected === "SKIPZEROESIN") {
      return "DAYSTROM";
    } else if (status?.clueLettersCollected === "SKIPZEROESI") {
      return "NAKAMURA";
    } else if (status?.clueLettersCollected === "SKIPZEROES") {
      return "IKARU";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `The station commander, a black man with a shaved head and an odd red, black, and gray uniform, regards you coolly from across his desk. "Yes, I spoke with the MITropolis detective as required by my superior, Admiral Ross. But unless specifically ordered to, there's only one person--my closest confidant and former science officer--who I would entrust this information to. Or nine people, depending on your point of view. Officer ${name} will see you out now."`,
  replyUnsuccessful: "A yellow-uniformed security officer bars your path.",
  replySuccessful:
    'The commander welcomes you in. "Dax! It\'s very good to see you, old man."',
  validAnswers: [
    "LELA",
    "TOBIN",
    "EMONY",
    "AUDRID",
    "TORIAS",
    "JORAN",
    "CURZON",
    "JADZIA",
    "EZRI",
    "LELADAX",
    "TOBINDAX",
    "EMONYDAX",
    "AUDRIDDAX",
    "TORIASDAX",
    "JORANDAX",
    "CURZONDAX",
    "JADZIADAX",
    "EZRIDAX",
  ],
  getPointer: (status) => {
    if (
      !status?.lettersCollected.startsWith("LITTLETO") ||
      !status?.clueLettersCollected.startsWith("SKIPZEROESIN")
    ) {
      return {
        dialog:
          "\"Yes, the \"person of interest.\" Chief tells me that he's been tampering with some of our secondary systems, but he doesn't know how or to what end. We don't know if he's Starfleet Intelligence or Section 31 or what but either way, I don't like that he's anywhere near my station. He was last spotted entering the quarters of an employee of the MITropolis department of education. Will you talk to her next?\"",
        nextPerson: Bureaucrat,
      };
    }
    return {
      dialog:
        "\"Yes, the \"person of interest.\" Chief tells me that he's been tampering with some of our secondary systems, but he doesn't know how or to what end. We don't know if he's Starfleet Intelligence or Section 31 or what but either way, I don't like that he's anywhere near my station. There's an Intelligence agent who owes me a favor. She hangs out at a diner down the street. Try and talk to her and see if he's one of hers.\"",
      nextPerson: DinerAgent,
    };
  },
};

const Bureaucrat: Person = {
  getName: (status) => {
    if (status?.clueLettersCollected === "SKIPZEROESIND") {
      return "XAVIER";
    } else if (status?.clueLettersCollected === "SKIPZEROESIN") {
      return "DRYDEN";
    } else if (status?.clueLettersCollected === "SKIPZEROESI") {
      return "NORMAN";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `You find the address of a MITropolis Department of Education bureaucrat Ms. ${name}. She refuses to talk to you and says she will only talk to her president.
`,
  replyUnsuccessful:
    '"Are you the president of MITropolis education? Then s-c-r-a-m scram!" *slam*',
  replySuccessful: '"Oh! Madame President! What a pleasure."',
  validAnswers: ["SALLYKORNBLUTH"],
  almostAnswers: ["KORNBLUTH"],
  getPointer: () => ({
    dialog:
      "\"I'm happy to help. That frightful hooligan who barged into my home that evening didn't steal anything or even say anything to me. He just jumped out the window and into the street! I last saw him turn into the diner at the end of the a-l-l-e-y alley.\"",
    nextPerson: DinerAgent,
  }),
};

const DinerAgent: Person = {
  getName: (status) => {
    if (
      status?.clueLettersCollected === "SKIPZEROESINDX" ||
      status?.clueLettersCollected === "SKIPZEROESIND"
    ) {
      return "EVE";
    } else if (status?.clueLettersCollected === "SKIPZEROESIN") {
      return "DEE";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `At the diner you find an agent named ${name}, sullenly nursing a cup of coffee. She immediately preempts you: "Hey. I'm a paying customer. Free refills. I'm not going anywhere." You explain that you just want to talk, but she cuts you off. "I'm waiting for my Pokemoniker agent in Avonlea to check in. If that ain't you, bayleef me alone."`,
  replyUnsuccessful:
    "\"I'm waiting for my source. She's on her way across the water by ferry. Electabuzz off.\"",
  replySuccessful:
    '"Finally, Ms. Cuthbert. I\'ve been waiting for you all night."',
  validAnswers: ["MARILLACUTHBERT"],
  getPointer: () => ({
    dialog:
      "\"There's a man who's been visiting MITropolis Intelligence buildings. I don't think he's one of ours. I don't know who to trust. I think he's somewhere in the Intelligence safehouse right now. Find him.\"",
    nextPerson: Computer,
  }),
};

const Computer: Person = {
  getName: (status) => {
    if (status?.clueLettersCollected === "SKIPZEROESINDE") {
      return "XI";
    } else if (status?.clueLettersCollected === "SKIPZEROESINDXE") {
      return "SEC";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `At the door of the MITropolis intelligence safehouse, there is a call box. You press the button and a digitized computer voice answers. "Greetings. I am System ${name}. Error: I only accept commands from HQ to open this door.""
`,
  replyUnsuccessful:
    '"Error: I only accept commands from HQ to open this door."',
  replySuccessful: '"Command accepted. Door opening."',
  validAnswers: ["HQ"],
  getPointer: () => ({
    dialog:
      "\"There's a man who's been visiting MITropolis Intelligence buildings. I don't think he's one of ours. I don't know who to trust. I think he's somewhere in the Intelligence safehouse right now. Find him.\"",
    nextPerson: Ending,
  }),
};

const Ending: Person = {
  getName: () => {
    return "";
  },
  getIntro: () =>
    `You walk in the door--only to be greeted by a team of burly security guards. They march you down the hall and into a white, windowless room occupied only by an agent, a desk, and a dossier. The agent stands up and smiles as the guards push you in and close the door. "Well well well! You've made it here--congratulations! We've been tracking your snooping for some time. Look--we have a case file of all the aliases and disguises you've used in this little adventure." [Case file with number and list of aliases] "Yes, we at the MITropolis Intelligence Team also have an...interest in Billie's former partner. And we have some relevant data we've collected. But that information is for the eyes of said erstwhile 2 P.I. Noir partner only. No one else. So we'll just have to sit in this little room till we finally draw him in. Do you know his name?"`,
  replyUnsuccessful: '"The man at the desk smiles coldly but says nothing."',
  replySuccessful:
    '"LITTLE TOM, you have finally arrived!" the agent exclaims...and then winks at you.',
  validAnswers: ["LITTLETOM"],
  getPointer: () => ({
    dialog:
      "\"'Little' Tom Tibbets found a new vocation and was scrubbed from the face of MITropolis, vanished from the world...but as you've discovered there were a few loose ends that might lead back to my new identity here. Now that you are impersonating me, you'll find that those clues lead back to you, instead. I'm not 'Little' Tom Tibbets anymore. I'm a spook that you'll never see again.\" His face curves into a thin smirk. \"I hope that in my past life, I haven't done anything that you might regret.\"",
    nextPerson: null,
  }),
};

export { Roman as FirstPerson };
