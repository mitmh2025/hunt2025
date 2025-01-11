export const PUZZLE_ANSWER = "LITTLETOM";

export type Line = {
  line: string;
  speaker?: string;
  isYou?: boolean;
  isDone?: boolean;
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

export const AGENT_NAME = "Agent";
export const Ending: Person = {
  name: AGENT_NAME,
  intro: [
    {
      line: "You walk in the door -- only to be greeted by a team of burly security guards! They march you down the hall and into a white, windowless room occupied only by an agent, a desk, and a dossier.",
    },
    {
      line: "The agent stands up and smiles as the guards push you in and close the door.",
    },
    {
      line: "Well well well! You’ve made it here -- congratulations! We’ve been tracking your snooping this whole time. Look -- we have a case file of all the aliases and disguises you’ve used in this little adventure: <a class='what-do-they-call-you-link' href='/puzzles/what_do_they_call_you/case_file.txt'>case_file.txt</a>",
      speaker: AGENT_NAME,
    },
    {
      line: "Yes, we at the MITropolis Intelligence Team also have an...interest in Billie’s former partner. And we have some relevant data we’ve collected. But that information is for the eyes of said erstwhile 2 P.I. Noir partner only. No one else.",
      speaker: AGENT_NAME,
    },
    {
      line: "So, we’ll just have to sit in this little room till he finally arrives. Do you know his name?",
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
      line: "“Little” Tom Tibbets found a new vocation and was scrubbed from the face of MITropolis, vanished from the world...but as you’ve discovered there were a few loose ends that might lead back to my new identity here.",
      speaker: AGENT_NAME,
    },
    {
      line: "Now that you are impersonating me, you’ll find that those clues lead back to <em>you</em> instead. I’m not “Little” Tom Tibbets anymore. I’m a spook that you’ll never see again.",
      speaker: AGENT_NAME,
    },
    {
      line: "His face curves into a thin smirk.",
    },
    {
      line: "I hope that in my past life, I haven’t done anything that you might regret.",
      speaker: AGENT_NAME,
    },
    {
      line: "<hr /><i class='the-end'>~ fin ~</i><hr />",
      isDone: true,
    },
  ],
  validAnswers: [PUZZLE_ANSWER],
};

const COMPUTER_NAME = "SECURITY";
export const Computer: Person = {
  name: COMPUTER_NAME,
  intro: [
    {
      line: "At the door of the MITropolis Intelligence safehouse, there is a call box. You press the button and a digitized computer voice answers.",
    },
    {
      line: `Greetings. I am System ${COMPUTER_NAME}. Error: I only accept commands from HQ to open this door.`,
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

const DINERAGENT_NAME = "EEVEELYNE";
export const DinerAgent: Person = {
  name: DINERAGENT_NAME,
  intro: [
    {
      line: `At the cafe of green tables you find an operative named ${DINERAGENT_NAME}, sullenly sipping a cup of coffee. You try to talk to her, but she cuts you off:`,
    },
    {
      line: "I’m waiting for my agent from Avonlea to check in. If that ain’t you, bayleef me alone.",
      speaker: DINERAGENT_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "I’m waiting for my source. She’s on her way across the <strong>water</strong> by <strong>ferry</strong>. Electabuzz off.",
      speaker: DINERAGENT_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "<em>Finally</em>, Miss Cuthbert. I’ve been waiting for you all day! There’s a man who’s been visiting MITropolis Intelligence buildings. I don’t think he’s one of ours. I don’t know who to trust. I think he’s somewhere in the Intelligence safehouse right now. Find him.",
      speaker: DINERAGENT_NAME,
    },
  ],
  validAnswers: ["MARILLACUTHBERT"],
  almostAnswers: ["MARILLA"],
  nextPerson: Computer,
};

const BUREAUCRAT_NAME = "OGDEN";
export const Bureaucrat: Person = {
  name: BUREAUCRAT_NAME,
  intro: [
    {
      line: `You find the address of a MITropolis Department of Education bureaucrat, Ms. ${BUREAUCRAT_NAME}. She refuses to talk to you and says she will only talk to her president.`,
    },
  ],
  replyUnsuccessful: [
    {
      line: "Are you the president of MITropolis? Then <strong>mind</strong> your own business, or I’ll have to throw <strong>hands</strong>!",
      speaker: BUREAUCRAT_NAME,
    },
    {
      line: "She slams the door.",
    },
  ],
  replySuccessful: [
    {
      line: "Oh! Madame President! What a pleasure. I’m happy to help. That frightful hooligan who barged into my office that evening didn’t steal anything or even say anything to me. He just jumped out the window and into the street! I last saw him run by that diner at the end of the alley.",
      speaker: BUREAUCRAT_NAME,
    },
  ],
  validAnswers: ["SALLYKORNBLUTH"],
  almostAnswers: ["KORNBLUTH"],
  nextPerson: DinerAgent,
};

const DETECTIVE_NAME = "RACHMAL";
export const Detective: Person = {
  name: DETECTIVE_NAME,
  intro: [
    {
      line: `Standing in front of the smoldering wreck of a MITropolis concert hall, you meet police detective ${DETECTIVE_NAME} absent-mindedly eating an ice cream cone.`,
    },
    {
      line: "Hello, rookie. As you can <em>hopefully</em> tell, this is an official arson case under investigation. Everyone is a suspect right now. I’m afraid I can only talk to musicians on the list of people who <strong>didn’t start the fire.</strong>",
      speaker: DETECTIVE_NAME,
    },
    {
      line: "She finishes her cone.",
    },
    {
      line: "Or if you’ll sell me more ice cream.",
      speaker: DETECTIVE_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "The detective ignores you, staring into the smoking remains of the music venue.",
    },
  ],
  replySuccessful: [
    {
      line: "Good day, Maestro Toscanini. I love your ice cream shops. I don’t suppose you have any of your ice cream on you... It melted? Rats.",
      speaker: DETECTIVE_NAME,
    },
    {
      line: "Yes, I’ve heard about that suspicious character. He was seen at a local education official’s office late one night. Go ahead and interview her if you want.",
      speaker: DETECTIVE_NAME,
    },
  ],
  validAnswers: ["TOSCANINI"],
  nextPerson: Bureaucrat,
};

const WIKIPEDIAN_NAME = "EDITH";
export const Wikipedian: Person = {
  name: WIKIPEDIAN_NAME,
  intro: [
    {
      line: `The library card turns out to be for a <strong>wickid</strong> huge archive of information authored and curated mostly by volunteers and founded by...<strong>whales?</strong>`,
    },
    {
      line: `You try to talk to one of the curators, ${WIKIPEDIAN_NAME}, but she is too frantic to answer your questions.`,
    },
    {
      line: "We keep meticulous records of all of our changes, but it seems our system didn’t account for <strong>leap days</strong> -- some of the items we’ve <strong>featured</strong> in our daily rotating exhibit in the atrium are missing!!",
      speaker: WIKIPEDIAN_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "The curator is too distracted to respond to you.",
    },
    {
      line: "People will <strong>Talk:</strong> What can we do??",
      speaker: WIKIPEDIAN_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "Here’s one of the missing items! I am so relieved that they were not all erased...",
      speaker: WIKIPEDIAN_NAME,
    },
    {
      line: "Oh, I recognize that sobriquet. His most recent editorial contribution was...hmm...adding a current event template to the article for a nearby music venue? Looks like it had a fire!",
      speaker: WIKIPEDIAN_NAME,
    },
  ],
  validAnswers: [
    "LSD",
    "HAMILTON",
    "PSILOCYBIN",
    "REGENTSOFTHEUNIVERSITYOFCALIFORNIAVBAKKE",
    "ZOOTVTOUR",
    "BLOODONTHEFLOOR",
  ],
  nextPerson: Detective,
};

export const CORNER_NAME = "ZOWER/ZUFF";
const LITTLE_GIRL_NAME = "Little girl";
export const PowerpuffGirl: Person = {
  name: LITTLE_GIRL_NAME,
  intro: [
    {
      line: `Waiting at the trolley stop at the corner of ${CORNER_NAME} is a tiny redheaded girl with gigantic eyes wearing a red bow. When you try to talk to her, she says:`,
    },
    {
      line: "Sorry, my <strong>two sisters</strong> keep telling me that I shouldn’t talk to people outside my family.",
      speaker: LITTLE_GIRL_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "The little girl carefully ignores you.",
    },
  ],
  replySuccessful: [
    {
      line: "Hi! Thanks for keeping me company! I really wanted to have someone to talk to.",
      speaker: LITTLE_GIRL_NAME,
    },
    {
      line: "Yes, that guy used to take this bus all the time! He dropped his library card last time I saw him -- if you see him, can you give it back?",
      speaker: LITTLE_GIRL_NAME,
    },
  ],
  validAnswers: ["BUTTERCUP", "BUBBLES", "PROFESSORUTONIUM"],
  nextPerson: Wikipedian,
};

const SAILOR_NAME = "PAORA";
export const Sailor: Person = {
  name: SAILOR_NAME,
  intro: [
    {
      line: `You find the choir singing sea shanties outside a shop that sells sweets, tea, and liquor. One of the baritones, ${SAILOR_NAME}, turns out to be a bona fide sailor. He refuses to talk to you.`,
    },
    {
      line: "Gods, some of these lyrics are a <strong>tonguin’</strong> to sing! Oh well. Once the concert is done, all I want to do is to find me ship!",
      speaker: SAILOR_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: `Go away. The only “person” I want to meet is my whaling ship.`,
      speaker: SAILOR_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "Ah! Me blessed ship, of which so many have sung praises! Alas, I can’t bring that fellow aboard for ya. But the landlubber always came to practice by streetcar. His usual line is over there.",
      speaker: SAILOR_NAME,
    },
  ],
  validAnswers: ["BILLYOTEA", "BILLYOFTEA"],
  nextPerson: PowerpuffGirl,
};

const DUNGEONMASTER_NAME = "INNAN";
export const DungeonMaster: Person = {
  name: DUNGEONMASTER_NAME,
  intro: [
    {
      line: `The “book club” turns out to be a Dungeons & Dragons campaign run by a ginger Dropout. Despite his usual penchant for villainous monologues, at the moment the dungeon master, ${DUNGEONMASTER_NAME}, refuses to speak to anyone other than his entire campaign group.`,
    },
  ],
  replyUnsuccessful: [
    {
      line: "I’m busy, one of my players keeps rolling bonkers nat 20s and wrecking my plans. I have to rework the plotline for my entire campaign!",
      speaker: DUNGEONMASTER_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "HeLLLOOOO one and all and welcome to another episode of -- what, you don’t want the whole intro? <em>FINE.</em>",
      speaker: DUNGEONMASTER_NAME,
    },
    {
      line: "You’re looking for one of the old side quest members? I know he also performs in a local choir. Here’s a flyer he gave me with their upcoming concerts.",
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

const CRITIC_NAME = "KIMBALL KINGSFORD";
export const Critic: Person = {
  name: CRITIC_NAME,
  intro: [
    {
      line: `Across town, you walk up to a fine brownstone manse belonging to venerated literary critic ${CRITIC_NAME}. His butler informs you that he is expecting to interview a rising star of an American author who wrote a great novel in the ‘20s -- a double-amputee’s memoir or something? Otherwise, he is not taking visitors.`,
    },
  ],
  replyUnsuccessful: [
    {
      line: "The doorbell tolls, but the butler politely but firmly turns you away.",
    },
  ],
  replySuccessful: [
    {
      line: "The butler leads you in.",
    },
    {
      line: "Welcome, welcome, Mr. Hemingway! I’m anxious to discuss your marvelous <i>A Farewell to Arms</i>...",
      speaker: CRITIC_NAME,
    },
    {
      line: "Ah, my old tenant? Kind of an odd question to lead with...but I suppose you realist auteurs have to keep in touch with the <em>common</em> element, eh?",
      speaker: CRITIC_NAME,
    },
    {
      line: "Hmm... he used to attend some sort of book club meeting -- lowbrow, you know, very droll. His compatriots there might know more.",
      speaker: CRITIC_NAME,
    },
  ],
  validAnswers: ["ERNESTHEMINGWAY"],
  almostAnswers: ["HEMINGWAY"],
  nextPerson: DungeonMaster,
};

const FIANCE_NAME = "SANDY";
export const Fiance: Person = {
  name: FIANCE_NAME,
  intro: [
    {
      line: `You ring the bloke -- a fellow named ${FIANCE_NAME} that your target went on a date with a while back. It seems that he’s seeing someone else now, and quite seriously.`,
    },
    {
      line: "I need a crystal gem to help me make my sweetheart’s engagement ring. Otherwise, I’m not interested!",
      speaker: FIANCE_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "A <strong>crystal gem</strong> will <strong>save my day</strong>, but that’s not you!",
      speaker: FIANCE_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "A crystal gem! Wow! Hello! Though you may be too large to fit in a ring...hmm.",
      speaker: FIANCE_NAME,
    },
    {
      line: "Oh, my ex? He ghosted me <em>ages</em> ago. But I can put you in touch with his old landlord.",
      speaker: FIANCE_NAME,
    },
  ],
  validAnswers: ["GARNET", "AMETHYST", "PEARL", "STEVEN", "STEVENUNIVERSE"],
  nextPerson: Critic,
};

const SNOWMAN_NAME = "XENO";
export const Snowman: Person = {
  name: SNOWMAN_NAME,
  intro: [
    {
      line: `The ice rink is deserted. All you see is a old, limp, icicle-covered snowman next to the rink. When you ask it for help, the snowman, named ${SNOWMAN_NAME}, turns its back to you with a sniff.`,
    },
    {
      line: "Forgive my frostiness, but I’m a snowman. I’m not supposed to talk at <em>all</em>. Though in any event I’d make an exception for a skater or two with the most medallions,  I <strong>figure</strong>.",
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
      line: "<em>Okay, be cool, be cool.</em> How can I help you?",
      speaker: SNOWMAN_NAME,
    },
    {
      line: "Someone who skated here on a date... I think I know the one you mean.",
      speaker: SNOWMAN_NAME,
    },
    {
      line: "I don’t know where he’s from, but I can give you his date’s number.",
      speaker: SNOWMAN_NAME,
    },
    {
      line: "...",
      speaker: SNOWMAN_NAME,
    },
    {
      line: "OH my GAWD I LOVED your Moulin Rouge routine -- ",
      speaker: SNOWMAN_NAME,
    },
  ],
  validAnswers: [
    "TESSAVIRTUE",
    "SCOTTMOIR",
    "TESSAVIRTUESCOTTMOIR", // ampersand is stripped by canonicalizer
    "SCOTTMOIRTESSAVIRTUE", // ampersand is stripped by canonicalizer
    "TESSAVIRTUEANDSCOTTMOIR",
    "SCOTTMOIRANDTESSAVIRTUE",
  ],
  almostAnswers: ["VIRTUE", "MOIR"],
  nextPerson: Fiance,
};

const CATLADY_NAME = "ELENA";
export const CatLady: Person = {
  name: CATLADY_NAME,
  intro: [
    {
      line: "You can hear the mewing from down the block. The rowhouse has a catio full of cat toys, furniture, and food and is inhabited by dozens of cats with many different colors, patterns, mementos, and personalities.",
    },
    {
      line: "You can also hear the popular radio show <i>Bouffina, Slayer of Vampires</i> playing in the drawing room.",
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
      line: "Willow! My little baby! You’re the last kitty for my collection! Come in, come in!",
      speaker: CATLADY_NAME,
    },
    {
      line: "...Oh, yes, my son. He hasn’t called or written lately, the cheeky boy. Last I heard he had a new beau -- they had a date together scheduled at the local ice rink!",
      speaker: CATLADY_NAME,
    },
  ],
  validAnswers: ["WILLOW"],
  nextPerson: Snowman,
};

const MANICURIST_NAME = "DINA";
export const Manicurist: Person = {
  name: MANICURIST_NAME,
  intro: [
    {
      line: `At the salon, the nail technician ${MANICURIST_NAME} coolly evaluates you.`,
    },
    {
      line: "<strong>Oh, P.I.</strong> -- orange you a little out of your element here? Most salon operations are <em>soooooo</em> 19th century, but here the cuticles are on the bleeding edge -- I need a colorful, crème-de-la-crème tech expert who can really polish up my business. Not some old-fashioned gumshoe slacquer.",
      speaker: MANICURIST_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: `You accidentally bump into a nail station.`,
    },
    {
      line: "Jeez, You’ve Got Nail primer all over your trenchcoat! How did you even <em>do</em> that? Orange you leaving now?",
      speaker: MANICURIST_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "Welcome! Hey, listen to my pitch. An <em>Initial Pedicure Offering</em>: we’ll use a mechanical turk to paint monograms on people’s toes. Genius, right?",
      speaker: MANICURIST_NAME,
    },
    {
      line: "Oh, a former customer? Yes, I know the one. Sometimes he came in with his mother -- a total homebody. I guess that was his way of getting her out of the house. I can give you her address.",
      speaker: MANICURIST_NAME,
    },
  ],
  validAnswers: ["SILICONVALLEYGIRL"],
  nextPerson: CatLady,
};

const DANCER_NAME = "NETTIE";
export const Dancer: Person = {
  name: DANCER_NAME,
  intro: [
    {
      line: `You go to the dance studio, which has an ornate green glass door and constellations on the walls. Walking inside, you meet an instructor named ${DANCER_NAME}.`,
    },
    {
      line: "I’m only interested in talking to moonwalkers. Shamone!",
      speaker: DANCER_NAME,
    },
  ],
  replyUnsuccessful: [
    {
      line: "If a moonwalker walks through that <strong>green glass door</strong>, I’ll talk to him. Otherwise, beat it!",
      speaker: DANCER_NAME,
    },
  ],
  replySuccessful: [
    {
      line: "Oh hel<em>lo</em>, spaceman! You looking for one of my old students? Last I saw him, he was getting his nails did at the salon across the way.",
      speaker: DANCER_NAME,
    },
  ],
  validAnswers: [
    "BUZZALDRIN",
    "EDGARMITCHELL",
    "DAVIDSCOTT",
    "HARRISONSCHMITT",
  ],
  almostAnswers: ["ALDRIN", "MITCHELL", "SCOTT", "SCHMITT"],
  nextPerson: Manicurist,
};

const ROMAN_NAME = "IULIUS";
export const Roman: Person = {
  name: ROMAN_NAME,
  intro: [
    {
      line: `You start your search with a Roman gladiator named ${ROMAN_NAME}. He refuses to talk to you.`,
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
      line: "You seek this person? I do not know where he is now, but I know he took lessons at a dance studio nearby.",
      speaker: ROMAN_NAME,
    },
  ],
  validAnswers: ["SPARTACUS"],
  nextPerson: Dancer,
};

const FirstPerson = Roman;

export const RESERVED_NAMES = ((): string[] => {
  let currentPerson = FirstPerson;
  let names: string[] = [];

  while (currentPerson.nextPerson) {
    names = [...names, ...currentPerson.validAnswers];
    currentPerson = currentPerson.nextPerson;
  }

  return names;
})();

export { FirstPerson };
