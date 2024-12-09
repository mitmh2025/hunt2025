export const MIN_CLUEPHRASE = "SKIPZEROESINDX";
export const PUZZLE_ANSWER = "LITTLETOM";

type PuzzlePerson = {
  getName: (s?: PuzzleStatus) => string;
  getReplyUnsuccessful: (name: string) => string;
  getReplySuccessful: (name: string) => string;
  validAnswers: string[];
  almostAnswers?: string[];
  getPointer: (s?: PuzzleStatus) => Pointer;
};

export type Person = {
  getIntro: (name: string) => string;
} & PuzzlePerson;

export type Agent = {
  getIntro: (name: string, caseNumber?: string, nameLog?: string[]) => string;
} & PuzzlePerson;

export type Pointer = {
  getDialog: (name: string) => string;
  nextPerson: Person | Agent | null;
};

export type PuzzleStatus = {
  lettersCollected: string;
  clueLettersCollected: string;
};

export const getNameSpan = (n: string) => {
  return `<span class='name'>${n}:</span>`;
};

const Roman: Person = {
  getName: () => "SEPTIMA",
  getIntro: (name: string) =>
    `<p>You start your search with a Roman aristocrat named ${name}. She refuses to talk to you.</p><p>${getNameSpan(name)}I will only speak with Spartacus!</p>`,
  getReplyUnsuccessful: (name) =>
    `<p>${getNameSpan(name)}Go away. I will only speak with Spartacus!</p>`,
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}Ah, yes, Spartacus. I am glad to have found you.<br>`,
  validAnswers: ["SPARTACUS"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}You seek this person? I do not know where he is now, but I know he took dance lessons at a dance studio nearby.</p>`,
    nextPerson: Dancer,
  }),
};

const Dancer: Person = {
  getName: () => "KELLY",
  getIntro: (name: string) =>
    `<p>You go to the dance studio, which has an ornate green glass door and planetarium-esque star designs on the walls. Walking inside, you meet an instructor named ${name}. She refuses to talk to you.</p><p>${getNameSpan(name)}I\'m only interested in moonwalkers. Shamone!</p>`,
  getReplyUnsuccessful: (name) =>
    `<p>${getNameSpan(name)}If a moonwalker walks through that green glass door, I\'ll talk to him. Otherwise, beat it!</p>`,
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}Oh he<i>llooooo</i>, spaceman!<br>`,
  validAnswers: [
    "BUZZALDRIN",
    "EDGARMITCHELL",
    "DAVIDSCOTT",
    "HARRISONSCHMITT",
  ],
  almostAnswers: ["ALDRIN", "MITCHELL", "SCOTT", "SCHMITT"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}You looking for one of my old students? Last I saw him, he was getting his nails did at the salon across the way.</p>`,
    nextPerson: Manicurist,
  }),
};

const Manicurist: Person = {
  getName: () => "IRENE",
  getIntro: (name: string) =>
    `<p>The salon's waiting area is packed. The busy manicurist glances at you, nametag reading ${name}. She takes one earbud out of her ear.</p><p>${getNameSpan(name)}Oh, a P.I.? Sorry, but it sounds like I can't talk till I finish this After Dark.</p>`,
  getReplyUnsuccessful: (name) =>
    `<p>You can still hear ${name}'s music blasting even with her earbuds in.</p><p>${getNameSpan(name)}Oh, P.I., you\'re still here? Try After Dark, y'hear me?</p>`,
  getReplySuccessful: (name) =>
    `<p>${name} drops her emery board.</p><p>${getNameSpan(name)}Oh, my, heavens. Mike Shinoda???<br>`,
  validAnswers: ["LINKINPARK"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}Oh, you're looking for one of my old customers? He got a mani-pedi--said he had a date at the ice rink.</p>`,
    nextPerson: Snowman,
  }),
};

const Snowman: Person = {
  getName: () => "PIX",
  getIntro: (name: string) =>
    `<p>The ice rink is deserted. Bored, you turn to a snowman next to the rink and ask it for help. The snowman, named ${name}, turns its back to you with a sniff.</p><p>${getNameSpan(name)}Forgive my frostiness, but I'm a snowman. I'm not supposed to talk at all. Though I might make an exception for a skater or two with the most medallions.</p>`,
  getReplyUnsuccessful: () =>
    "<p>The snowman pretends to not be a talking snowman.</p>",
  getReplySuccessful: (name) =>
    `<p>The snowman fangasms.</p><p>${getNameSpan(name)}<i>Okay, be cool, be cool.</i> How can I help you?<br>`,
  validAnswers: ["TESSAVIRTUE", "SCOTTMOIR"],
  almostAnswers: ["VIRTUE", "MOIR"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}Someone who skated here on a date... I think I know the one you mean.<br>${getNameSpan(name)}I don't know where he went, but I can give you his date's number. ... OH my GAWD I LOVED your Moulin Rouge routine--</p>`,
    nextPerson: Fiance,
  }),
};

const Fiance: Person = {
  getName: () => "ZACHARY",
  getIntro: (name: string) =>
    `<p>You ring the bloke--a fellow named ${name} that your target went on a date with a while back. It seems that he's seeing someone else now, and quite seriously.</p><p>${getNameSpan(name)}I need a crystal gem for my sweetheart's engagement ring. Otherwise, I'm not interested!</p>`,
  getReplyUnsuccessful: (name) =>
    `<p>${getNameSpan(name)}A crystal gem will always save my day, but that\'s not you!</p>`,
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}A real crystal gem! Wow! Hello!<br>${getNameSpan(name)}Though you may be too large to fit in a ring...hmm...<br>`,
  validAnswers: ["GARNET", "AMETHYST", "PEARL", "STEVEN"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}Oh, that's my ex. He ghosted me months ago. But I can put you in touch with his old landlord.</p>`,
    nextPerson: Critic,
  }),
};

const Critic: Person = {
  getName: () => "EAMES ELLINGWORTH",
  getIntro: (name: string) =>
    `<p>Across town, you walk up to a fine brownstone manse belonging to venerated literary critic ${name}. His butler informs you that he is expecting to interview a rising star of an American author who wrote a great novel a few years back--a double-amputee's memoir or something. Otherwise, he is not taking visitors.</p>`,
  getReplyUnsuccessful: () =>
    "<p>The butler politely but firmly bids you farewell.</p>",
  getReplySuccessful: (name) =>
    `<p>The butler leads you in.</p><p>${getNameSpan(name)}Welcome, welcome, Mr. Hemingway! I'm anxious to discuss your marvelous <i>A Farewell to Arms</i>...<br>`,
  validAnswers: ["ERNESTHEMINGWAY"],
  almostAnswers: ["HEMINGWAY"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}Ah, my old tenant? Kind of an odd question to lead with...but I suppose you realist auteurs have to keep in touch with the <i>common</i> element, eh?<br/>${getNameSpan(name)}Hmm... he used to attend some sort of book club meeting--lowbrow, you know, very droll. His compatriots there might know more.</p>`,
    nextPerson: DungeonMaster,
  }),
};

const DungeonMaster: Person = {
  getName: () => "RENNAN",
  getIntro: (name: string) =>
    `<p>The "book club" turns out to be a Dungeons & Dragons campaign run by a ginger dropout. Despite his usual penchant for villainous monologues, at the moment the dungeon master, ${name}, refuses to speak to anyone other than his entire campaign group.</p>`,
  getReplyUnsuccessful: (name) =>
    `<p>${getNameSpan(name)}I'm busy--one of my allies keeps rolling bonkers nat 20s and now I have to rework my entire plotline!</p>`,
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}He<i>LLLOOOO</i> one and all and welcome to another episode of-- what, you don't want the whole intro? FINE.<br>`,
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
  getPointer: (status) => {
    if (status?.lettersCollected.startsWith("LITT")) {
      return {
        getDialog: (name) =>
          `${getNameSpan(name)}You're asking about one of the old party members?<br>${getNameSpan(name)}I don't know where he is now, but he used to buy dice and stuff from an old lady across town. I can give you her address.</p>`,
        nextPerson: CatLady,
      };
    }
    return {
      getDialog: (name) =>
        `${getNameSpan(name)}You're asking about one of the old party members? He always went down to a local drinking hole after D&D sessions. You might go look there.</p>`,
      nextPerson: Bar,
    };
  },
};

const Bar: Person = {
  getName: () => "OLD OSPREY",
  getIntro: (name: string) =>
    `<p>You enter The ${name}, a dark, hazy dive. A thespian, a meteorologist, and a gambler are sitting at the bar. You sit down at the last empty stool and try to ask questions, but it's hard to get a conversation started. The thespian says that they'll only talk to quadruple-crown winners. The meteorologist's special interest is in things that involve major hurricanes. And the gambler would prefer it if travel destinations, particularly cities in Nevada, were included.</p>`,
  getReplyUnsuccessful: () =>
    "<p>This drinking hole is quiet, except for an old gramophone in need of some grease. None of the patrons are willing to speak up unless the rest of them also want to.</p>",
  getReplySuccessful: () => "<p>Finally you capture the whole bar's interest. ",
  validAnswers: ["RITAMORENO"],
  getPointer: () => ({
    getDialog: () =>
      `They tell you that your target often got a drink to go--to bring to a friend down the street who was a bit of a shut-in.</p>`,
    nextPerson: CatLady,
  }),
};

const CatLady: Person = {
  getName: (status) => {
    console.log("checking letters", status?.clueLettersCollected);
    if (status?.clueLettersCollected === "SKIPZERO") {
      return "EVANGELINE";
    } else if (status?.clueLettersCollected === "SKIPZER") {
      return "OLGA";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `<p>You can hear the mewing from across the block. The apartment has a catio full of cat toys, furniture, and food and is inhabited by dozens of cats with many different colors, patterns, and personalities. You can also hear a collection of recordings of the popular radio show <i>Bouffina, Slayer of Vampyres</i> playing in the drawing room.</p><p>The owner, ${name}, refuses to open the door for fear that some of the cats might escape. But there might be one cat she would open up for...</p>`,
  getReplyUnsuccessful: (name) =>
    `<p>${getNameSpan(name)}Go away! The cats are trying to sleep!</p>`,
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}Willow! My little baby! You're the last kitty for my collection! Come in, come in!<br/>`,
  validAnswers: ["WILLOW"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}...Oh, sure, I can tell you about him. He hasn't been by in a while, sadly. He had a co-author friend, for the newspaper I think; she might know more. She often frequents the local theme park.</p>`,
    nextPerson: DisneyAdult,
  }),
};

const DisneyAdult: Person = {
  getName: (status) => {
    if (status?.clueLettersCollected === "SKIPZEROE") {
      return "SIDNEY";
    } else if (status?.clueLettersCollected === "SKIPZERO") {
      return "ELLIE";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `<p>At the theme park, you encounter an unabashed "Disney Adult" named ${name}, wearing Mickey Mouse ears and an Elsa costume. She is working out a crossword on paper--watching carefully, you realize she is not solving the crossword but rather trying to construct a new one.</p><p>${getNameSpan(name)}Ugh! I can't make this animated musical theme work! If only one of the crosswordiest Disney characters could help me...</p>`,
  getReplyUnsuccessful: () =>
    "<p>The Disney fan is too focused on her crossword-in-progress to even give you the time of day.</p>",
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}Oh my goodness, I hadn't requested a character visit! This is delightful! You're an inspiration...<br>`,
  validAnswers: ["ANNA", "ARIEL", "ERIC", "SMEE"],
  getPointer: (status) => {
    if (status?.lettersCollected.startsWith("LITTLE")) {
      return {
        getDialog: (name) =>
          `${getNameSpan(name)}We always met at a cafe near that music venue that burned down. Maybe he still hangs out there?</p>`,
        nextPerson: Detective,
      };
    }
    return {
      getDialog: (name) =>
        `${getNameSpan(name)}The last time I saw my co-author, he left for that bus stop on the corner. You might try there?</p>`,
      nextPerson: PowerpuffGirl,
    };
  },
};

const PowerpuffGirl: Person = {
  getName: (status) => {
    if (status?.clueLettersCollected === "SKIPZEROES") {
      return "IOWER/IUFF";
    } else if (status?.clueLettersCollected === "SKIPZEROE") {
      return "SOWER/SUFF";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `<p>Waiting at the ${name} bus stop is a tiny redheaded girl with gigantic eyes wearing a red bow. When you try to talk to her, she says:</p><p>${getNameSpan("Little girl")}Sorry, my two sisters keep telling me that I shouldn't talk to people outside my family.</p>`,
  getReplyUnsuccessful: () => "<p>The little girl carefully ignores you.</p>",
  getReplySuccessful: () =>
    `<p>${getNameSpan("Little girl")}Oh, hi! Thanks for keeping me company.<br/>`,
  validAnswers: ["BUTTERCUP", "BUBBLES", "PROFESSORUTONIUM"],
  getPointer: () => ({
    getDialog: () =>
      `${getNameSpan("Little girl")}Yes, that guy used to take this bus regularly. He always got off at the stop near that music venue that just burned down.</p>`,
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
    `<p>Standing in front of the smoldering wreck of a MITropolis music venue, you meet a police detective called ${name} absent-mindedly eating an ice cream cone.</p><p>${getNameSpan(name)}Hello, rookie. As you can hopefully tell, this is an official arson case under investigation. Everyone is a suspect right now. Unless you're a musician and you didn't start the fire, I'm afraid I can't talk to you.</p><p>She finishes her cone.</p><p>${getNameSpan(name)}Or if you've got more ice cream.</p>`,
  getReplyUnsuccessful: () =>
    "<p>The detective ignores you and stares broodily into the smoking remains of the music venue.</p>",
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}Good day, Maestro Toscanini. I love your ice cream. I don't suppose you have any on you... Drat.<br>`,
  validAnswers: ["TOSCANINI"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}Yes, I've heard about that suspicious character who was hanging around here. The commander of the station down the block told me about him. You might ask him for more details.</p>`,
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
    `<p>The station commander, a black man with a shaved head and an odd red, black, and gray uniform, regards you coolly from across his desk.</p><p>${getNameSpan("Commander")}Yes, I spoke with the MITropolis detective as required by my superior, Admiral Ross.<br>${getNameSpan("Commander")}But unless specifically ordered to, there's only one person--my closest confidant and former science officer--who I would entrust this information to. Or nine people, depending on your point of view. Officer ${name} will see you out now.</p>`,
  getReplyUnsuccessful: () =>
    "<p>A yellow-uniformed security officer bars your path.</p>",
  getReplySuccessful: (name) =>
    `<p>The commander welcomes you in.</p><p>${getNameSpan(name)}Dax! It's very good to see you, old man.<br>`,
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
      !status.clueLettersCollected.startsWith("SKIPZEROESIN")
    ) {
      return {
        getDialog: () =>
          `${getNameSpan("Commander")}Yes, the "person of interest." Chief tells me that he's been tampering with some of our secondary systems, but he doesn't know how or to what end.<br>${getNameSpan("Commander")}We don't know if he's Starfleet Intelligence or Section 31 or what but either way, I don't like that he's anywhere near my station.<br>${getNameSpan("Commander")}He was last spotted entering the quarters of an employee of the MITropolis department of education. Will you talk to her next?</p>`,
        nextPerson: Bureaucrat,
      };
    }
    return {
      getDialog: () =>
        `${getNameSpan("Commander")}Yes, the "person of interest." Chief tells me that he's been tampering with some of our secondary systems, but he doesn't know how or to what end.<br>${getNameSpan("Commander")}We don't know if he's Starfleet Intelligence or Section 31 or what but either way, I don't like that he's anywhere near my station.<br>${getNameSpan("Commander")}There's an Intelligence operative who owes me a favor. She hangs out at a diner down the street. Try and talk to her and see if he's one of hers.</p>`,
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
    `<p>You find the address of a MITropolis Department of Education bureaucrat Ms. ${name}. She refuses to talk to you and says she will only talk to her president.</p>`,
  getReplyUnsuccessful: (name) =>
    `<p>${getNameSpan(name)}Are you the president of MITropolis education? Then s-c-r-a-m scram!</p><p>She slams the door.</p>`,
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}Oh! Madame President! What a pleasure.<br>`,
  validAnswers: ["SALLYKORNBLUTH"],
  almostAnswers: ["KORNBLUTH"],
  getPointer: () => ({
    getDialog: (name) =>
      `<p>${getNameSpan(name)}I'm happy to help. That frightful hooligan who barged into my home that evening didn't steal anything or even say anything to me. He just jumped out the window and into the street!<br>${getNameSpan(name)}I last saw him turn into the diner at the end of the a-l-l-e-y alley.</p>`,
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
    `<p>At the diner you find an operative named ${name}, sullenly nursing a cup of coffee. She immediately preempts you:</p><p>${getNameSpan(name)}Hey. I'm a paying customer. Free refills. I'm not going anywhere.</p><p>You explain that you just want to talk, but she cuts you off.</p><p>${getNameSpan(name)}I'm waiting for my Pokemoniker agent in Avonlea to check in. If that ain't you, bayleef me alone.</p>`,
  getReplyUnsuccessful: (name) =>
    `<p>${getNameSpan(name)}I'm waiting for my source. She's on her way across the water by ferry. Electabuzz off.</p>`,
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}<i>Finally</i>, Ms. Cuthbert. I've been waiting for you all night!<br>`,
  validAnswers: ["MARILLACUTHBERT"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}There's a man who's been visiting MITropolis Intelligence buildings. I don't recognize him as one of our agents. I don't know who to trust.<br>${getNameSpan(name)}I think he's somewhere in the Intelligence safehouse right now. Find him.</p>`,
    nextPerson: Computer,
  }),
};

const Computer: Person = {
  getName: (status) => {
    if (
      status?.clueLettersCollected === "SKIPZEROESINDE" ||
      status?.clueLettersCollected === "SKIPZEROESIND"
    ) {
      return "XI";
    } else if (status?.clueLettersCollected === "SKIPZEROESINDXE") {
      return "SEC";
    } else {
      throw new Error("invalid name condition");
    }
  },
  getIntro: (name: string) =>
    `<p>At the door of the MITropolis intelligence safehouse, there is a call box. You press the button and a digitized computer voice answers.</p><p>${getNameSpan(name)}Greetings. I am System ${name}. Error: I only accept commands from HQ to open this door.</p>`,
  getReplyUnsuccessful: (name) =>
    `<p>${getNameSpan(name)}Error: I only accept commands from HQ to open this door.</p>`,
  getReplySuccessful: (name) =>
    `<p>${getNameSpan(name)}Command accepted. Door opening.</p>`,
  validAnswers: ["HQ"],
  getPointer: () => ({
    getDialog: () => ``,
    nextPerson: Ending,
  }),
};

const printCaseData = (caseNumber: string, nameLog: string[]) => {
  let result = `<div class="case-data"><h4>CASE FILE #${caseNumber}</h4><ul>`;
  nameLog.forEach((name) => {
    result += `<li>${name}</li>`;
  });
  result += "</ul></div>";
  return result;
};

const Ending: Agent = {
  getName: () => {
    return "Agent";
  },
  getIntro: (name, caseNumber, nameLog) =>
    `<p>You walk in the door--only to be greeted by a team of burly security guards!</p> \
     <p>They march you down the hall and into a white, windowless room occupied only by an agent, a desk, and a dossier.</p> \
     <p>The agent stands up and smiles as the guards push you in and close the door.</p> \
     <p>${getNameSpan(name)}Well well well! You've made it here--congratulations! We've been tracking your snooping for some time.<br> \
     ${getNameSpan(name)}Look--we have a case file of all the aliases and disguises you've used in this little adventure.</p> \
     ${printCaseData(caseNumber || "", nameLog || [])} \
     <p>${getNameSpan(name)}Yes, we at the MITropolis Intelligence Team also have an...interest in Billie's former partner. And we have some relevant data we've collected. \
     <br>${getNameSpan(name)}But that information is for the eyes of said erstwhile 2 P.I. Noir partner only. No one else. \
     <br>${getNameSpan(name)}So we'll just have to sit in this little room till we finally draw him in. Do you know his name?</p>`,
  getReplyUnsuccessful: () =>
    "<p>The man at the desk smiles coldly but says nothing.</p>",
  getReplySuccessful: (name) =>
    `<p>The agent gasps.<br>${getNameSpan(name)}LITTLE TOM, you have finally arrived!<br>...And then he winks at you?<br>`,
  validAnswers: ["LITTLETOM"],
  getPointer: () => ({
    getDialog: (name) =>
      `${getNameSpan(name)}'Little' Tom Tibbets found a new vocation and was scrubbed from the face of MITropolis, vanished from the world...but as you've discovered there were a few loose ends that might lead back to my new identity here.<br>${getNameSpan(name)}Now that you are impersonating me, you'll find that those clues lead back to you, instead.<br>${getNameSpan(name)}I'm not 'Little' Tom Tibbets anymore. I'm a spook that you'll never see again.<br>His face curves into a thin smirk.<br>${getNameSpan(name)}I hope that in my past life, I haven't done anything that you might regret.</p>`,
    nextPerson: null,
  }),
};

export { Roman as FirstPerson };
