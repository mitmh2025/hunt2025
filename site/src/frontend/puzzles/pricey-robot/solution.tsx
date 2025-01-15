import React from "react";
import { styled } from "styled-components";
import { PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  margin: 1em 0;
  border-collapse: collapse;

  td {
    padding: 0 8px;
  }
`;

const RING_DATA = [
  [
    {
      letter: "A",
      prompt: "Make like Americium and split.",
      response: "You’re just blowing smoke.",
      shape: "⚫︎",
      explaination: "Americium is an alpha emitter used in smoke detectors",
    },
    {
      letter: "C",
      prompt: "Everything is romantic, but I might say something stupid: Boom.",
      response: "Clap back: So I guess to mean girls, sympathy is a knife.",
      shape: "♥",
      explaination: "Many song titles from Charli XCX",
    },
    {
      letter: "T",
      prompt: "Can you put these seven shapes in a square?",
      response: "I can put them in any shape you want.",
      shape: "⚫︎",
      explaination: "Tangrams",
    },
    {
      letter: "R",
      prompt: "Do you know the Montagues?",
      response: "I take their side in the family feud.",
      shape: "◼",
      explaination: "Romeo Montague",
    },
    {
      letter: "E",
      prompt: "Are you an angel or a firefly?",
      response: "I’m the most important doll in the dollhouse.",
      shape: "◀",
      explaination:
        "Joss Whedon shows, Echo was th main character in Dollhouse",
    },
    {
      letter: "S",
      prompt: "My favorite brewery is in California.",
      response: "Really? I would have thought it was in Nevada.",
      shape: "♥",
      explaination: "Sierra Nevada Brewing",
    },
    {
      letter: "S",
      prompt: "¿Necesita un martillo?",
      response: "No thanks, señor, I need a saw.",
      shape: "★",
      explaination: "Sierra is Spanish for saw",
    },
    {
      letter: "W",
      prompt: "I like to sweet talk my eggs.",
      response: "Beatey beatey, mixey mixey.",
      shape: "⚫︎",
      explaination: "Whisk -> Whiskey, whiskey",
    },
    {
      letter: "A",
      prompt: "I bet you can’t name three gods.",
      response: "Athena, Ares, and Aphrodite. And that’s just the beginning.",
      shape: "◀",
      explaination: "Greek gods starting with alpha",
    },
    {
      letter: "T",
      prompt: "Would you pick Tang over McCormick?",
      response: "I don’t know much about dormsoup.",
      shape: "◀",
      explaination: "Tang o_, Tang and McCormick are MIT dorms.",
    },
    {
      letter: "T",
      prompt: "Ugh this gnat won’t leave me alone!",
      response: "Oh, just shoo it backwards.",
      shape: "⚫︎",
      explaination: "GNAT reversed + Oh",
    },
    {
      letter: "S",
      prompt: "Sir Gabriel is on the King’s quest.",
      response: "His quest for glory is a phantasmagoria.",
      shape: "♥",
      explaination: "Referencing many Sierra Entertainment software titles",
    },
    {
      letter: "F",
      prompt: "My tortoise took their first two steps!",
      response: "My hare took two steps too!",
      shape: "◼",
      explaination: "Slow slow, fast fast for the foxtrot",
    },
    {
      letter: "R",
      prompt: "Italian sports cars have double names.",
      response: "But we only want the second one.",
      shape: "★",
      explaination: "Alfa ROMEO",
    },
    {
      letter: "O",
      prompt: "I rode a carousel in Oklahoma.",
      response: "The king and I met in the South Pacific.",
      shape: "⚫︎",
      explaination:
        "Four musicals by Richard Rodgers and OSCAR Hammerstein II.",
    },
    {
      letter: "M",
      prompt: "Don’t get your audio input too close to your speakers.",
      response: "Thanks, that’s valuable feedback.",
      shape: "★",
      explaination: "Microphone feedback",
    },
    {
      letter: "M",
      prompt: "How does he eat and breathe though?",
      response: "It’s just a show, you should really just relax.",
      shape: "◀",
      explaination: "Mike Nelson, host of MST3K",
    },
    {
      letter: "U",
      prompt: "We don’t want puns from amateurs here.",
      response: "You need formal training to participate.",
      shape: "◼",
      explaination: "“You need form”",
    },
    {
      letter: "L",
      prompt: "I heard some empires had their own writing exercises.",
      response: "Like ink aerobics?",
      shape: "⚫︎",
      explaination: "“Ink a” -> Inca -> Peru -> Lima",
    },
    {
      letter: "H",
      prompt:
        "There’s nothing better than a chocolate chip cookie after a long journey.",
      response: "That’s so true - travel always makes me hungry!",
      shape: "◼",
      explaination: "DoubleTree hotels",
    },
    {
      letter: "O",
      prompt: "You got hollandaise on my steak!",
      response: "You got asparagus on my crab!",
      shape: "★",
      explaination: "Steak Oscar",
    },
    {
      letter: "L",
      prompt: "When I’m young I’m green.",
      response: "When I’m mature I’m butter.",
      shape: "◀",
      explaination: "Mature lima beans also called butter beans",
    },
    {
      letter: "L",
      prompt: "Didn’t your mother tell you not to stare?",
      response: "Ma told me I lot of things that I don’t believe.",
      shape: "♥",
      explaination: "Lie Ma",
    },
    {
      letter: "A",
      prompt: "What is helium four?",
      response: "Making balloons float.",
      shape: "★",
      explaination: "Alpha particles",
    },
    {
      letter: "N",
      prompt: "Peter, Paul and Mary is my favorite band.",
      response:
        "I prefer Francis and Catherine and Joseph and Michael and Patrick and everyone.",
      shape: "⚫︎",
      explaination: "All Saints Day, November 1",
    },
    {
      letter: "D",
      prompt: "Have you seen where the river meets the sea?",
      response: "My heart never leaves those muddy plains.",
      shape: "◀",
      explaination: "River delta",
    },
    {
      letter: "D",
      prompt: "Triangles are my favorite shape.",
      response: "They’re my favorite letter.",
      shape: "◼",
      explaination: "Greek letter delta",
    },
    {
      letter: "R",
      prompt: "Moore was the best Bond.",
      response: "I always get his name mixed up with other leading men.",
      shape: "★",
      explaination: "Anagram MOORE",
    },
    {
      letter: "I",
      prompt: "How do I curry favor?",
      response: "Cook it in a spiced gravy.",
      shape: "⚫︎",
      explaination: "Curry is an Indian dish",
    },
    {
      letter: "V",
      prompt: "What a great description of a cathedral.",
      response: "Hugo has a way with words.",
      shape: "◼",
      explaination: "Victor Hugo",
    },
    {
      letter: "E",
      prompt: "Why can’t I hit the bullseye?",
      response: "Somebody has moved the oche!",
      shape: "♥",
      explaination: "Anagram OCHE",
    },
  ],
  [
    {
      letter: "A",
      prompt: "I hate when sprouts get stuck in my teeth.",
      response: "I can lend you a toothpick, but I’ll need it back.",
      shape: "⚫︎",
      explaination: "Alfalfa sprouts",
    },
    {
      letter: "S",
      prompt: "Burnt sienna is my favorite color.",
      response: "I like my crayons with more red in the middle.",
      shape: "♥",
      explaination: "Sienna -> Sierra",
    },
    {
      letter: "W",
      prompt: "Scotch, on the rocks.",
      response: "I’ll try not to slip on them.",
      shape: "★",
      explaination: "Scotch whiskey",
    },
    {
      letter: "E",
      prompt: "The man in the water has unmeasured beauty.",
      response: "But the nymph on the shore has a love beyond words.",
      shape: "◀",
      explaination: "Echo and Narcissus",
    },
    {
      letter: "E",
      prompt:
        "Did you know that Death and Mayhem have written an excellent hunt?",
      response:
        "I keep hearing again and again how excellent Death and Mayhem’s hunt is!",
      shape: "⚫︎",
      explaination: "Repetition",
    },
    {
      letter: "T",
      prompt: "It’s my last time in Halifax.",
      response: "Might as well do one of these before you leave.",
      shape: "◀",
      explaination: "Last Tango In Halifax film title",
    },
    {
      letter: "R",
      prompt: "Row me over the river.",
      response: "The chicken can come but the grain stays.",
      shape: "★",
      explaination: "“Row me o”",
    },
    {
      letter: "H",
      prompt: "I upgraded the houses on Park Place and Boardwalk.",
      response: "That development gives me the blues.",
      shape: "♥",
      explaination: "Monopoly, houses upgrade to hotels",
    },
    {
      letter: "Y",
      prompt: "I hereby dub thee Sir Puzzlehunter of the Round Table.",
      response: "Even though I’m from Connecticut?",
      shape: "◼",
      explaination: "A Connecticut Yankee In King Arthur’s court",
    },
    {
      letter: "M",
      prompt: "Check, check, one two.",
      response: "Three, four, checkmate!",
      shape: "◀",
      explaination: "Mic check",
    },
    {
      letter: "E",
      prompt: "What is told to a canyon...",
      response: "...is not kept in confidence.",
      shape: "⚫︎",
      explaination: "Echo from a canyon",
    },
    {
      letter: "F",
      prompt: "How fast is needed to jump over a lazy dog?",
      response: "More than walk and less than a canter.",
      shape: "◼",
      explaination:
        "The quick brown fox, trot is a gait between walk and canter",
    },
    {
      letter: "O",
      prompt: "What do you think will win Best Film?",
      response: "I’m pulling for Saran Wrap.",
      shape: "◀",
      explaination: "Best Film is an Oscars category",
    },
    {
      letter: "R",
      prompt: "Are you Jet Li? Because I think you’re The One.",
      response: "Go one movie back for your answer.",
      shape: "◼",
      explaination: "Jet Li’s previous film, Romeo Must Die",
    },
    {
      letter: "A",
      prompt: "I love to be the centaur of attention!",
      response: "No one will notice you with a three star rating.",
      shape: "♥",
      explaination: "Alpha Centauri is a triple star system",
    },
    {
      letter: "C",
      prompt: "I don’t have a nickel for the exit fare.",
      response: "Here’s a sandwich at Scollay Square.",
      shape: "⚫︎",
      explaination: "“Charlie on the M.T.A.” lyrics",
    },
    {
      letter: "E",
      prompt: "The dolphin defends the future.",
      response: "He rides the tides of time.",
      shape: "★",
      explaination: "Ecco the Dolphin game titles",
    },
    {
      letter: "R",
      prompt: "Why’d you install ChromeOS on that laptop?",
      response: "I wanted to get to the heart of my computer.",
      shape: "◀",
      explaination: "(ch)ROMEO(s)",
    },
    {
      letter: "T",
      prompt: "The orangutan goes where it pleases.",
      response: "Great apes can not be contained.",
      shape: "♥",
      explaination: "oranguTAN GOes",
    },
    {
      letter: "A",
      prompt: "Gordon Shumway sends his regards.",
      response: "Tell him I’m no puppet.",
      shape: "◼",
      explaination: "Gordon Shumway was ALF’s real name",
    },
    {
      letter: "I",
      prompt: "I pee a lot.",
      response: "That’s what happens when you drink too much beer.",
      shape: "♥",
      explaination: "“I P A” India Pale Ale",
    },
    {
      letter: "N",
      prompt: "What should I serve with a turkey?",
      response: "Dressing for successing.",
      shape: "◀",
      explaination: "Turkey with dressing -> Thanksgiving",
    },
    {
      letter: "C",
      prompt: "I wish I could have seen Woodstock.",
      response: "I wish I could have seen Snoopy.",
      shape: "◀",
      explaination: "Charlie Brown",
    },
    {
      letter: "A",
      prompt: "I entered an Italian road race.",
      response: "Did your first name win first place?",
      shape: "⚫︎",
      explaination: "ALFA Romeo",
    },
    {
      letter: "R",
      prompt: "A rose by any other name...",
      response: "...would not respond when you called it.",
      shape: "◼",
      explaination: "Line after “Romeo, Romeo, wherefore art thou Romeo?”",
    },
    {
      letter: "T",
      prompt: "Oh, what is an astronaut’s favorite drink?",
      response: "Gravi-tea!",
      shape: "⚫︎",
      explaination: "Tang used by NASA + Oh",
    },
    {
      letter: "O",
      prompt: "Do you know the Golden Boy of Boxing?",
      response: "Since he came from the valley.",
      shape: "◀",
      explaination: "Oscar de la Hoya, lit. “of the valley”",
    },
    {
      letter: "O",
      prompt: "We need a car to help us hide in plain sight.",
      response: "I’ve leased the Wienermobile.",
      shape: "◼",
      explaination: "Oscar Mayer Wienermobile",
    },
    {
      letter: "N",
      prompt: "Halloween is over.",
      response: "Long live Halloween.",
      shape: "★",
      explaination: "After Halloween is November",
    },
    {
      letter: "D",
      prompt: "Is your Left Hand Free?",
      response: "Let’s Tessellate some Breezeblocks.",
      shape: "⚫︎",
      explaination: "Songs by the band Δ",
    },
    {
      letter: "U",
      prompt: "Let’s keep this smooth and even.",
      response: "Perfect, that’s how I like my peanut butter.",
      shape: "◀",
      explaination: "Def. “smooth and even”",
    },
    {
      letter: "C",
      prompt: "Wow, that kid eats a lot of chocolate.",
      response: "I know, it’s almost like he has his own factory!",
      shape: "⚫︎",
      explaination: "Charlie and the Chocolate Factory",
    },
    {
      letter: "K",
      prompt: "All this cloak-and-dagger is really weighing on me.",
      response: "In metric or imperial?",
      shape: "★",
      explaination: "Kilogram, metric “weight” unit",
    },
  ],
  [
    {
      letter: "P",
      prompt: "Finster throws a mean gala.",
      response: "Mean is the right word.",
      shape: "◀",
      explaination: "Papa Finster, host of the Gala",
    },
    {
      letter: "E",
      prompt: "Did you know bats can sense movement they can’t see?",
      response: "That makes it easier to hit home runs.",
      shape: "◼",
      explaination: "Echolocation",
    },
    {
      letter: "T",
      prompt: "Bite directly into a lemon.",
      response: "Oh, how sour and refreshing!",
      shape: "★",
      explaination: "Tang “sour and refreshing” + O",
    },
    {
      letter: "E",
      prompt: "I don’t stare into the abyss but I do yell at it.",
      response: "The same warning still applies.",
      shape: "★",
      explaination: "The abyss yells also at you",
    },
    {
      letter: "R",
      prompt: "All roads lead here, oh?",
      response: "Then they also lead away.",
      shape: "⚫︎",
      explaination: "All roads lead to ROME + oh",
    },
    {
      letter: "Q",
      prompt: "Bonjour-hi.",
      response: "Lo siento, no hablo inglés o francés.",
      shape: "◼",
      explaination: "Quebecois greeting",
    },
    {
      letter: "U",
      prompt: "I like your outfit.",
      response: "Thanks, wearing it is mandatory.",
      shape: "◀",
      explaination: "Mandatory outfit",
    },
    {
      letter: "I",
      prompt: "Finding the coin is my holy grail.",
      response: "As long as it’s not your crystal skull.",
      shape: "★",
      explaination: "Indiana Jones films",
    },
    {
      letter: "L",
      prompt: "The proof comes one step at a time.",
      response: "That’s just a theory.",
      shape: "♥",
      explaination: "Lemma",
    },
    {
      letter: "L",
      prompt: "Peru’s the place to be.",
      response: "I’d happily examine it if you told me where.",
      shape: "⚫︎",
      explaination: "Lima, Peru",
    },
    {
      letter: "S",
      prompt: "The wildfire smoke is intense.",
      response: "You can really see air above you.",
      shape: "◼",
      explaination: "“See air a”",
    },
    {
      letter: "B",
      prompt: "Valar morghulis.",
      response: "Valar dohaeris.",
      shape: "★",
      explaination: "Bravoosi greeting",
    },
    {
      letter: "L",
      prompt: "I like my beans like I like my men.",
      response: "Small, green, and available in the can.",
      shape: "◼",
      explaination: "Lima beans",
    },
    {
      letter: "U",
      prompt: "What are my chances?",
      response: "The same as anybody else’s.",
      shape: "◀",
      explaination: "Uniform distribution",
    },
    {
      letter: "E",
      prompt: "My guitar needs a delay pedal.",
      response: "Your guitar needs an empty stairwell.",
      shape: "♥",
      explaination: "Echo-y stairwell",
    },
    {
      letter: "F",
      prompt: "Do you need to change your invoice?",
      response: "I must Amend my Bill.",
      shape: "◼",
      explaination: "Bill Amend, Foxtrot author",
    },
    {
      letter: "A",
      prompt: "Are you the top dog around here?",
      response: "No, but I am the pot god.",
      shape: "★",
      explaination: "Top dog / alpha",
    },
    {
      letter: "T",
      prompt: "I asked for beige paint but they gave me ecru.",
      response: "Go back and ask for tan instead.",
      shape: "◀",
      explaination: "Tan + go",
    },
    {
      letter: "H",
      prompt: "One morning I shot elephants in my pajamas.",
      response: "How they got inside them you’ll never know.",
      shape: "♥",
      explaination: "sHOT ELephants",
    },
    {
      letter: "E",
      prompt: "The pendulum swings both ways.",
      response: "And the world turns beneath it.",
      shape: "⚫︎",
      explaination: "Foucault’s Pendulum, Umberto Eco",
    },
    {
      letter: "R",
      prompt: "This crowd makes me feel like I’m in a zombie film.",
      response: "What, Night of the Puzzling Dead?",
      shape: "★",
      explaination: "George Romero",
    },
    {
      letter: "F",
      prompt: "My rabbit runs fast.",
      response: "My fox’s legs are longer.",
      shape: "◀",
      explaination: "Fox trotting",
    },
    {
      letter: "I",
      prompt: "Whose sari are you wearing?",
      response: "I only dress in Dior.",
      shape: "♥",
      explaination: "“In Dior” + sari",
    },
    {
      letter: "G",
      prompt: "What sound does a green tiger make?",
      response: "FORE!",
      shape: "★",
      explaination: "Golfer Tiger Woods",
    },
    {
      letter: "U",
      prompt: "The school wants this in triplicate.",
      response: "Pink for you, yellow for me, and white for them.",
      shape: "◼",
      explaination: "Uni form",
    },
    {
      letter: "R",
      prompt: "Have you tried the sushi at the Gala?",
      response: "Salmon roe—me oh my, what a delight!",
      shape: "◀",
      explaination: "“Roe me oh”",
    },
    {
      letter: "E",
      prompt: "Alexa listens in the Amazon.",
      response: "Siri bites into an apple.",
      shape: "★",
      explaination: "Amazon Echo",
    },
    {
      letter: "I",
      prompt: "Would you like a mango lassi?",
      response: "No, I take my fruit in high fidelity.",
      shape: "⚫︎",
      explaination: "Lassi, drink from India",
    },
    {
      letter: "N",
      prompt: "Topaz is too passé.",
      response: "Citrine is it r n.",
      shape: "♥",
      explaination: "November birthstones",
    },
    {
      letter: "T",
      prompt: "May I have this dance?",
      response: "I’m told it takes two.",
      shape: "⚫︎",
      explaination: "It takes two to tango.",
    },
    {
      letter: "H",
      prompt: "When is checkout time here?",
      response: "In California you can never leave.",
      shape: "◼",
      explaination: "Hotel California song reference",
    },
    {
      letter: "E",
      prompt: "Ugh, her boyfriend is such a narcissist.",
      response: "It’s too bad she only reflects his worst traits.",
      shape: "⚫︎",
      explaination: "Echo and Narcissus",
    },
    {
      letter: "M",
      prompt: "I think today was a mistake.",
      response: "Try again tomorrow but skip the middle.",
      shape: "♥",
      explaination: "MI(sta)KE",
    },
    {
      letter: "C",
      prompt: "He never bothers with people he hates.",
      response: "That’s why the gentleman is a tramp.",
      shape: "◀",
      explaination: "Charlie Chaplin’s The Tramp",
    },
    {
      letter: "U",
      prompt: "Nobody told me what to wear tonight.",
      response: "You’re so uninformed.",
      shape: "⚫︎",
      explaination: "Sounds similar to uniformed",
    },
  ],
  [
    {
      letter: "P",
      prompt: "Does the Pope wear white?",
      response: "Ordinarily, but not during Ordinary Time.",
      shape: "◼",
      explaination: "The Pope, il papa",
    },
    {
      letter: "U",
      prompt: "I look great in camo.",
      response: "Just like everyone else in your squad.",
      shape: "★",
      explaination: "Military uniforms",
    },
    {
      letter: "R",
      prompt: "Where can I find that Montague?",
      response: "In fair Verona, I would expect.",
      shape: "◀",
      explaination: "Romeo Montague",
    },
    {
      letter: "I",
      prompt: "Are you under a non-disclosure agreement?",
      response: "Yes, but it takes two I’s to make the deal.",
      shape: "◼",
      explaination: "NDA + I + I",
    },
    {
      letter: "F",
      prompt: "The quick brown fox...",
      response: "...runs at a trot.",
      shape: "★",
      explaination: "Fox trot",
    },
    {
      letter: "I",
      prompt: "Have you visited New Delhi?",
      response: "Why, when my old one has the best pastrami?",
      shape: "⚫︎",
      explaination: "New Delhi, city in India",
    },
    {
      letter: "E",
      prompt: "My fashion is unlimited.",
      response: "But your T-shirts are abbreviated.",
      shape: "◀",
      explaination: "Ecko Unltd",
    },
    {
      letter: "D",
      prompt: "Atlas carries the world on his shoulders.",
      response: "One must imagine him totally ripped.",
      shape: "★",
      explaination: "Deltoid shoulder muscles",
    },
    {
      letter: "M",
      prompt: "Little Mac can beat the champ.",
      response: "If a Hippo and a Bull couldn’t stop him; nothing can!",
      shape: "♥",
      explaination: "Mike Tyson’s Punch-Out!!",
    },
    {
      letter: "E",
      prompt: "I love to share Arbor Day with everyone I meet.",
      response: "That’s a specific kind of friendly.",
      shape: "♥",
      explaination: "Eco-friendly",
    },
    {
      letter: "T",
      prompt: "I’m defeated, I should give up right now.",
      response: "Gotta look on the bright side with all of your might.",
      shape: "⚫︎",
      explaination: "Tango: Maureen lyrics from RENT",
    },
    {
      letter: "A",
      prompt: "Ring around the rosie, pocket full of polonium.",
      response: "Ashes, ashes, we all fall down.",
      shape: "◼",
      explaination: "Polonium is an alpha emitter + “all fall”",
    },
    {
      letter: "L",
      prompt: "Would you take a million for your zoo?",
      response: "I’d give it all back to keep the lion.",
      shape: "◀",
      explaination: "“A MILLION”, minus LION, reversed",
    },
    {
      letter: "F",
      prompt: "Vernon leads the castle.",
      response: "Irene follows his steps.",
      shape: "★",
      explaination: "Vernon and Irene Castle popularized the foxtrot",
    },
    {
      letter: "O",
      prompt: "What’s the last word in bologna?",
      response: "I’m told it’s M-A-Y-E-R.",
      shape: "⚫︎",
      explaination: "Oscar Mayer bologna",
    },
    {
      letter: "R",
      prompt: "Italy has so many wonderful cities.",
      response: "And yet everyone flocks to the capital.",
      shape: "♥",
      explaination: "Capital of Italy",
    },
    {
      letter: "M",
      prompt: "Has anyone told you that you sound like Shrek?",
      response: "I thought I was more like Mr. Powers.",
      shape: "◼",
      explaination: "Mike Meyers",
    },
    {
      letter: "E",
      prompt: "The Empire State Building has such nice style.",
      response: "I prefer Art D’Brutalism, myself.",
      shape: "◼",
      explaination: "Art Deco / D’Eco",
    },
    {
      letter: "D",
      prompt: "I always pay with a hundred dollar bill.",
      response: "You must calculate your change every time.",
      shape: "♥",
      explaination: "Delta as symbol for change",
    },
    {
      letter: "I",
      prompt: "The coin has changed a lot over the years.",
      response: "How do you make change for an old penny?",
      shape: "◀",
      explaination: "Original MITMH coin, an Indian head penny",
    },
    {
      letter: "N",
      prompt: "Jack and Sally slept through Thanksgiving.",
      response: "They had a nightmare before Christmas.",
      shape: "◼",
      explaination: "Thanksgiving",
    },
    {
      letter: "T",
      prompt: "Those admirals never go onshore.",
      response: "Talk about naval gazing officers.",
      shape: "♥",
      explaination: "Both have initialism TANGO",
    },
    {
      letter: "O",
      prompt: "Don’t let the sunshine spoil your rain.",
      response: "Just stand up and complain.",
      shape: "★",
      explaination: "Oscar the Grouch’s “Grouch Anthem” lyrics",
    },
    {
      letter: "A",
      prompt: "The best artwork is a blend of two images.",
      response: "I’m no Picasso, but I have layers.",
      shape: "◼",
      explaination: "Alpha compositing",
    },
    {
      letter: "N",
      prompt: "Remember!",
      response: "Remember!",
      shape: "⚫︎",
      explaination: "The fifth of November",
    },
    {
      letter: "O",
      prompt: "Adios, Carlos.",
      response: "Hasta mañana, Isabella.",
      shape: "♥",
      explaination: "adiOS CARlos",
    },
    {
      letter: "B",
      prompt: "The Real Housewives of Atlanta is my favorite show on cable.",
      response: "I prefer the Salt Lake City series.",
      shape: "◼",
      explaination: "Both shows on the Bravo network",
    },
    {
      letter: "L",
      prompt: "Have you been getting the right letters lately?",
      response: "No, mail has been all jumbled up.",
      shape: "★",
      explaination: "Anagram MAIL",
    },
    {
      letter: "O",
      prompt: "My code name is Dorian Gray.",
      response: "Now I’m getting the picture.",
      shape: "★",
      explaination: "Oscar Wilde novel",
    },
    {
      letter: "N",
      prompt: "Never mob a Black Friday sale.",
      response: "Prices aren’t all that get slashed.",
      shape: "♥",
      explaination: "Black Friday, day after Thanksgiving",
    },
    {
      letter: "G",
      prompt: "I purchased a new compact car today.",
      response: "Was it a Volkswagen?",
      shape: "◀",
      explaination: "Volkswagen Golf",
    },
    {
      letter: "S",
      prompt: "An anagram is rare.",
      response: "An unclued one is rarer.",
      shape: "⚫︎",
      explaination: "Anagram ISRARE",
    },
    {
      letter: "H",
      prompt: "I got a new job toting luggage.",
      response: "Better hop to that bell.",
      shape: "◀",
      explaination: "Bellhop, job in a hotel",
    },
    {
      letter: "A",
      prompt: "What’s he howling about now?",
      response: "Something about how he’s in charge? It’s all Greek to me.",
      shape: "★",
      explaination: "Alpha wolf",
    },
    {
      letter: "P",
      prompt: "Keep your tires on the road.",
      response: "But I love to pop a wheelie.",
      shape: "⚫︎",
      explaination: "“Pop a”",
    },
    {
      letter: "E",
      prompt: "Have you read any Bertolt Brecht?",
      response: "Oh, I’ve watched The Threepenny Opera again and again.",
      shape: "★",
      explaination: "“Echt o”",
    },
  ],
  [
    {
      letter: "S",
      prompt: "Can I interest you in the Audubon Society?",
      response: "Is there a club without all the birds?",
      shape: "★",
      explaination: "Sierra Club and Audobon Society both conservation orgs",
    },
    {
      letter: "O",
      prompt: "Did you spot orcas in the sound?",
      response: "They’re so confusing—are they mammals or fish?",
      shape: "♥",
      explaination: "Angram ORCAS",
    },
    {
      letter: "M",
      prompt: "Would you like a lemonade?",
      response: "Just water please, I don’t touch the hard stuff.",
      shape: "◼",
      explaination: "Mike’s Hard Lemonade",
    },
    {
      letter: "E",
      prompt: "My shoes are comfy and Danish,",
      response: "but expensive and not very stylish.",
      shape: "★",
      explaination: "ECCO shoes",
    },
    {
      letter: "W",
      prompt: "What do you think of Manhattan?",
      response: "That island is too old fashioned.",
      shape: "♥",
      explaination: "Whiskey cocktails",
    },
    {
      letter: "H",
      prompt: "Mary ought to find higher ground.",
      response: "She’ll climb the hill tonight.",
      shape: "◼",
      explaination: "“Mary ought,” “Hill ton”",
    },
    {
      letter: "A",
      prompt:
        "I just saw The Effect of Gamma Rays on Man in the Moon Marigolds.",
      response: "Oh yeah? I loved the prequel set two rays before.",
      shape: "◼",
      explaination: "Alpha two letters before Gamma",
    },
    {
      letter: "T",
      prompt: "I am as sharp as a blade.",
      response: "Attach a hilt so you don’t cut yourself.",
      shape: "⚫︎",
      explaination: "Tang of a sword/knife",
    },
    {
      letter: "I",
      prompt: "How ’bout that missin’ diamond?",
      response: "The only thing harder is that Gladys’s heart.",
      shape: "♥",
      explaination: "missIN DIAmond",
    },
    {
      letter: "R",
      prompt: "My Romesco sauce is quite messy.",
      response: "I cook it without Ess-Cee.",
      shape: "★",
      explaination: "ROME(sc)O",
    },
    {
      letter: "O",
      prompt: "Why are you always such a grouch?",
      response: "You would be too if you lived in a can.",
      shape: "♥",
      explaination: "Oscar the Grouch",
    },
    {
      letter: "N",
      prompt: "Were you involved in the gunpowder plot?",
      response: "I’m pleading the fifth.",
      shape: "◼",
      explaination: "Guy Fawkes Day",
    },
    {
      letter: "I",
      prompt: "The finest soot...",
      response: "...creates the blackest ink.",
      shape: "◀",
      explaination: "India ink",
    },
    {
      letter: "C",
      prompt: "How many angels can you fit on the end of a phone receiver?",
      response: "Lucy, Drew, and Charlize, at least.",
      shape: "♥",
      explaination: "Charlie’s Angels",
    },
    {
      letter: "L",
      prompt: "Are there beings on the moon?",
      response: "There are moon beans on the earth.",
      shape: "★",
      explaination: "Lima beans aka moon beans",
    },
    {
      letter: "A",
      prompt: "When you’re making avgolemono soup, how do you start?",
      response: "From the beginning, fysiká.",
      shape: "◼",
      explaination: "First Greek letter of avgolemono",
    },
    {
      letter: "S",
      prompt: "Did you see Eras?",
      response: "Yes, I am a puzzlehunter.",
      shape: "♥",
      explaination: "“See Era”",
    },
    {
      letter: "T",
      prompt: "My teammate Nathaniel loves anagrams and I always tell him...",
      response: "...GO NAT! GO NAT!",
      shape: "◀",
      explaination: "Anagram GONAT",
    },
    {
      letter: "N",
      prompt: "This pie is delicious.",
      response: "Thanks! Giving people baked goods is my jam.",
      shape: "⚫︎",
      explaination: "“Thanks giving”",
    },
    {
      letter: "A",
      prompt: "I am the beginning of all things.",
      response: "Don’t hurt yourself falling off Mount Olympus.",
      shape: "◼",
      explaination: "Beginning of Greek alphabet",
    },
    {
      letter: "M",
      prompt: "Keep an eye out for Wazowski.",
      response: "He doesn’t have an eye to spare.",
      shape: "♥",
      explaination: "Mike Wazowski, Monsters Inc.",
    },
    {
      letter: "E",
      prompt: "Thus, by a continuous shifting of rhetorical focus...",
      response: "Yeah, we’ve all heard it before, Umberto.",
      shape: "★",
      explaination: "Umberto Eco, “Ur-Fascism”",
    },
    {
      letter: "O",
      prompt: "How much did Jackie’s dress cost?",
      response: "More than the price of rent.",
      shape: "⚫︎",
      explaination: "Oscar de la Renta, dress designer",
    },
    {
      letter: "F",
      prompt: "I’ve got something in my foot.",
      response: "Did you step on something extra inside?",
      shape: "◀",
      explaination: "FO(XTR)OT",
    },
    {
      letter: "C",
      prompt: "How can I get on the train at Kendall?",
      response: "Just tap your card.",
      shape: "◼",
      explaination: "MBTA CharlieCard",
    },
    {
      letter: "O",
      prompt: "I’m very good at being earnest.",
      response: "You’re my ideal husband.",
      shape: "★",
      explaination: "Oscar Wilde plays",
    },
    {
      letter: "U",
      prompt: "Every direction looks the same.",
      response: "Then it doesn’t matter which way you go.",
      shape: "◀",
      explaination: "Uniform space",
    },
    {
      letter: "N",
      prompt: "Are you bringing the three sisters to dinner?",
      response: "Grandpa loves my corn, squash and beans casserole.",
      shape: "♥",
      explaination: "Thanksgiving",
    },
    {
      letter: "T",
      prompt: "What’s black and white and rainbow all over?",
      response: "That book about gay penguins at the zoo!",
      shape: "◀",
      explaination: "And Tango Makes Three",
    },
    {
      letter: "R",
      prompt: "Leonardo diCaprio spent too much time in the sun.",
      response:
        "Baz Luhrmann doesn’t care about historically accurate tan lines.",
      shape: "★",
      explaination: "Romeo + Juliet film",
    },
    {
      letter: "Y",
      prompt: "Go Sox!",
      response: "Dude, you’re from New York.",
      shape: "⚫︎",
      explaination: "NY Yankees",
    },
    {
      letter: "S",
      prompt: "You can find me between Guinea and Liberia.",
      response: "I’ll say “hi, jk” in Freetown.",
      shape: "◼",
      explaination: "Sierra Leone",
    },
    {
      letter: "I",
      prompt: "Do your colts have a fever?",
      response: "Galloping just overheated those pacers.",
      shape: "♥",
      explaination: "Sports teams from Indiana",
    },
    {
      letter: "N",
      prompt: "I’ve been working on my miniature novel.",
      response: "Call that a nano-book.",
      shape: "◼",
      explaination: "NaNoWriMo, November",
    },
    {
      letter: "G",
      prompt: "They call me Don Quixote on the greens.",
      response: "Because you’re always tilting at the windmills.",
      shape: "⚫︎",
      explaination: "Putt-putt golf",
    },
    {
      letter: "E",
      prompt: "Nothing I say seems to be resonating.",
      response: "Maybe you just need to repeat, repeat, repeat.",
      shape: "★",
      explaination: "Resonating/repetition",
    },
    {
      letter: "R",
      prompt: "Wherefore art thou?",
      response: "Therefore I am.",
      shape: "◀",
      explaination: "Wherefore art thou Romeo?",
    },
    {
      letter: "K",
      prompt: "I’d make a pun but you’ll glare daggers.",
      response: "If looks could kill—oh!",
      shape: "◀",
      explaination: "“Kill oh”",
    },
    {
      letter: "E",
      prompt: "Beverly Hills 90210 reruns are my fave.",
      response: "I prefer Park Lake 90026.",
      shape: "⚫︎",
      explaination: "Echo Park",
    },
    {
      letter: "I",
      prompt: "Let us join dialogue.",
      response: "If you are so kind, I am eager to exchange words.",
      shape: "♥",
      explaination: "IN DIAlogue and kIND I Am",
    },
    {
      letter: "T",
      prompt: "I’m low on cash.",
      response: "I can trade you a Russell for a Stallone.",
      shape: "⚫︎",
      explaination: "Tango and Cash",
    },
    {
      letter: "H",
      prompt: "There’s nothing creepy happening in that ballroom, Stephen.",
      response: "I think you’re overlooking some things, king.",
      shape: "♥",
      explaination: "Overlook Hotel from The Shining",
    },
  ],
] as const;

const SPARES = [
  {
    letter: "F",
    prompt: "I'm trying to track down the Genesis of this album.",
    response: "I've narrowed it down to England in 1972.",
    shape: "◀",
    explaination: "Foxtrot, 1972 Genesis album",
  },
  {
    letter: "D",
    prompt: "The deck was shuffled well.",
    response: "The players dealt with what was dealt.",
    shape: "♥",
    explaination: "Anagram DEALT",
  },
  {
    letter: "D",
    prompt: "My flights keep getting routed through Atlanta.",
    response: "Maybe it's time to change your airline.",
    shape: "◀",
    explaination: "Atlanta is the Delta Airlines main hub",
  },
  {
    letter: "B",
    prompt: "A cobra vocally warns.",
    response: "His hiss insists: give this a miss.",
    shape: "◼",
    explaination: "co(BRA VO)cally, vocally",
  },
] as const;

export default function Solution() {
  return (
    <>
      <p>
        In this event, each participant was given a short length of red ribbon
        and a unique slip of paper. This paper had a shape at top, some short
        text labeled “Your response:”, some short text labeled “Your prompt:”,
        and a shape at bottom. This script was then read:
      </p>
      <p style={{ marginLeft: "4rem" }}>
        Welcome, trainees. In this PI training session, we will be practicing
        making contact with an undercover informant and covertly transferring
        information.
      </p>

      <p style={{ marginLeft: "4rem" }}>
        Each of you will be acting as both detective and informant. As a
        detective, in order to find your informant, you will be using
        pre-prepared signs and countersigns. You have your prompt, and someone
        else in the room has the proper response. Find that person who can
        respond to your prompt. At the same time, you have a response to another
        detective’s prompt, and they will be looking for you. If you have found
        the correct informant, the shape below your prompt will match the shape
        above their response.
      </p>

      <p style={{ marginLeft: "4rem" }}>
        When you have found your informant, you and your informant should each
        grasp one side of your red ribbon, demonstrating that you have made
        contact. Keep hold of this ribbon until all detectives have found their
        informants!
      </p>

      <p style={{ marginLeft: "4rem" }}>
        Once all informants have been contacted, you should all determine the
        key to a productive collaboration.
      </p>

      <p>Participants were then allowed to search for their two partners.</p>

      <p>
        When all participants had found their partners, they would find that
        they had arranged themselves into five separate rings. Each prompt and
        response pair also clued a specific NATO spelling alphabet letter.
        Reading these letters around each ring produced five clue phrases:
      </p>

      <StyledTable>
        <tr>
          <th>Clue Phrase</th>
          <th>Answer</th>
        </tr>
        <tr>
          <td>Actress Watts from Mulholland Drive</td>
          <td>
            <PuzzleAnswer>NAOMI</PuzzleAnswer>
          </td>
        </tr>
        <tr>
          <td>A sweet rhyme for a certain cartoon duck</td>
          <td>
            <PuzzleAnswer>TAFFY</PuzzleAnswer>
          </td>
        </tr>
        <tr>
          <td>Peter Quill’s blue father figure in the MCU</td>
          <td>
            <PuzzleAnswer>YONDU</PuzzleAnswer>
          </td>
        </tr>
        <tr>
          <td>Purified metal formed into an oblong shape</td>
          <td>
            <PuzzleAnswer>INGOT</PuzzleAnswer>
          </td>
        </tr>
        <tr>
          <td>Somewhat ironic last name of country singer Keith</td>
          <td>
            <PuzzleAnswer>URBAN</PuzzleAnswer>
          </td>
        </tr>
      </StyledTable>

      <p>
        These five answers can also be arranged into a ring by matching last to
        first letters:
      </p>

      <p style={{ textAlign: "center" }}>
        <PuzzleAnswer>URBAN NAOMI INGOT TAFFY YONDU</PuzzleAnswer>
      </p>

      <p>
        Taking the overlap letters in cycle order, participants can read the
        answer to the event: <PuzzleAnswer>UNITY</PuzzleAnswer>.
      </p>

      <p>A complete list of prompts and responses is below.</p>

      {RING_DATA.map((ring, i) => (
        <React.Fragment key={i}>
          <h3>Ring {i + 1}</h3>
          <StyledTable>
            <tr>
              <th>Letter</th>
              <th>Prompt</th>
              <th>Response</th>
              <th>Shape</th>
              <th>Explanation</th>
            </tr>
            {ring.map(
              ({ letter, prompt, response, shape, explaination }, j) => (
                <tr key={j}>
                  <td>{letter}</td>
                  <td>{prompt}</td>
                  <td>{response}</td>
                  <td>{shape}</td>
                  <td>{explaination}</td>
                </tr>
              ),
            )}
          </StyledTable>
        </React.Fragment>
      ))}

      <h3>Spare Prompts</h3>

      <p>
        To give flexibility to account for the number of event participants,
        which was not known exactly in advance, four different versions of the
        ring clues of different lengths were written. By choice of options for
        each ring, any number of participants between 119 and 177 could be
        accommodated. Some additional clues that do not appear above, but were
        in some other ring options, were:
      </p>

      <StyledTable>
        <tr>
          <th>Letter</th>
          <th>Prompt</th>
          <th>Response</th>
          <th>Shape</th>
          <th>Explanation</th>
        </tr>
        {SPARES.map(({ letter, prompt, response, shape, explaination }, j) => (
          <tr key={j}>
            <td>{letter}</td>
            <td>{prompt}</td>
            <td>{response}</td>
            <td>{shape}</td>
            <td>{explaination}</td>
          </tr>
        ))}
      </StyledTable>
    </>
  );
}
