import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import disneyWorldMap from "./assets/disney_world_map.png";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import islandsOfAdventureMap from "./assets/islands_of_adventure_map.jpg";
import universalStudiosMap from "./assets/universal_studios_map.jpg";
import { Formula } from "./puzzle";

const SizedImage = styled(LinkedImage)`
  width: 50%;
  margin: 16px 0px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Mono = styled.span`
  font-family: monospace;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  th,
  td {
    border: 1px solid var(--true-black);
    padding: 1px 8px;
  }
`;

type Attraction = {
  name: string;
  clues: [string, string, string];
};

type ParkDatum = {
  attractions: Attraction[];
  letter: string;
};

const MAGIC_KINGDOM_DATA: ParkDatum[] = [
  {
    attractions: [
      {
        name: "it’s a small world",
        clues: [
          "Set music to infinite loop",
          "Doll up the performers",
          "Check if world peace has been achieved",
        ],
      },
      {
        name: "Peter Pan’s Flight",
        clues: [
          "Sprinkle pixie dust",
          "Set course to second star to the right",
          "Polish hook",
        ],
      },
      {
        name: "Prince Charming Regal Carousel ",
        clues: [
          "Clean surcingles, numnahs and cruppers",
          "Go around in circles",
          "Tune organ",
        ],
      },
    ],
    letter: "L",
  },
  {
    attractions: [
      {
        name: "Walt Disney’s Carousel of Progress",
        clues: [
          "Feed Rover",
          "Put record on phonograph",
          "Calibrate voice recognition",
        ],
      },
      {
        name: "Mad Tea Party",
        clues: [
          "Refill the sugar cubes",
          "Check under the lids for mice",
          "Polish the china",
        ],
      },
      {
        name: "Liberty Square Riverboat",
        clues: [
          "Take a depth reading and mark one",
          "Ring the bell",
          "Remove paddle once up river",
        ],
      },
      {
        name: "Jungle Cruise",
        clues: [
          "Refill the O2H bottles",
          "Cut back vines",
          "Skip around the skipper",
        ],
      },
      {
        name: "Tomorrowland Transit Authority PeopleMover",
        clues: ["Get a move on", "Push rev 5 of ORAC", "Remove WEDway signs"],
      },
    ],
    letter: "O",
  },
  {
    attractions: [
      {
        name: "Pirates of the Caribbean",
        clues: [
          "Tighten the loose cannons",
          "Record dead men’s tales",
          "Uncork bottles of rum",
        ],
      },
      {
        name: "Big Thunder Mountain Railroad",
        clues: [
          "Install a lightning rod",
          "Calculate wilderness wildness factor",
          "Tumble into weeds",
        ],
      },
      {
        name: "The Magic Carpets of Aladdin",
        clues: [
          "Shine the lamp",
          "Sweep under the rug",
          "Find a diamond in the rough ",
        ],
      },
      {
        name: "Haunted Mansion",
        clues: [
          "Exorcize the demons",
          "Stretch the portraits",
          "Pick up a hitchhiker",
        ],
      },
    ],
    letter: "N",
  },
  {
    attractions: [
      {
        name: "Dumbo the Flying Elephant",
        clues: [
          "Hold up a feather",
          "Put some junk in the trunk",
          "Flap the ears",
        ],
      },
      {
        name: "Under the Sea Journey of the Little Mermaid",
        clues: [
          "Dive right in",
          "Inventory the whozits and whatzits",
          "Hit a high note",
        ],
      },
      {
        name: "Seven Dwarfs Mine Train",
        clues: ["Sharpen the pick axes", "Practice whistling", "Visit the Doc"],
      },
      {
        name: "Buzz Lightyear’s Space Ranger Spin",
        clues: [
          "Reload the astro blasters",
          "Fall with style",
          "Conference with the little green men",
        ],
      },
      {
        name: "Space Mountain",
        clues: [
          "Update the starport departure schedule",
          "Eat a Milky Way",
          "Plan hiking trip on Olympus Mons",
        ],
      },
      {
        name: "Tron Light Cycle Run",
        clues: [
          "Derez",
          "Reboot the Master Control Program",
          "Set turn angle to 90 degrees",
        ],
      },
      {
        name: "Tomorrowland Speedway",
        clues: [
          "Disconnect gas pedal",
          "Disconnect brake pedal",
          "Wave the checkered flag",
        ],
      },
    ],
    letter: "G",
  },
];

const UNIVERSAL_DATA: ParkDatum[] = [
  {
    attractions: [
      {
        name: "Jurassic World VelociCoaster",
        clues: [
          "Energize electric fences",
          "File down claws on  Blue, Charlie, Delta & Echo",
          "Solve",
        ],
      },
      {
        name: "Dudley Do-Right’s Ripsaw Falls",
        clues: [
          "Lace up goodie two shoes",
          "Untie Nell from train tracks",
          "Iron red uniforms",
        ],
      },
      {
        name: "The Cat in the Hat",
        clues: [
          "Get Things under control",
          "Paint stripes on headgear",
          "Balance fishbowl on umbrella",
        ],
      },
      {
        name: "The Incredible Hulk Coaster",
        clues: [
          "Repaint all surfaces green",
          "Raise the Banner",
          "Replace any ripped pants",
        ],
      },
    ],
    letter: "S",
  },
  {
    attractions: [
      {
        name: "Skull Island: Reign of Kong",
        clues: ["Crown the king", "Practice chanting", "Monkey around"],
      },
      {
        name: "Harry Potter and the Forbidden Journey",
        clues: [
          "Trim the willow branches",
          "Put all four balls on the pitch",
          "Fly off the handle",
        ],
      },
      {
        name: "Jurassic Park River Adventure",
        clues: [
          "Open the floodgates",
          "Put embryos in the Barbasol can",
          "Observe vibrations in water cup",
        ],
      },
      {
        name: "Popeye & Bluto’s Bilge-Rat Falls",
        clues: ["Open cans of spinach", "Pump iron", "Light the pipes"],
      },
    ],
    letter: "T",
  },
  {
    attractions: [
      {
        name: "Despicable Me Minion Mayhem",
        clues: [
          "Pick up the banana peels",
          "Hang the overalls on the clothesline",
          "Clean the goggles",
        ],
      },
      {
        name: "Hollywood Rip Ride Rockit",
        clues: [
          "Walk across the stars",
          "Look for a sign",
          "String tinsel around the town",
        ],
      },
      {
        name: "Race Through New York Starring Jimmy Fallon",
        clues: [
          "Find 30 rocks",
          "Write a monologue for tonight",
          "Mix a Manhattan",
        ],
      },
    ],
    letter: "R",
  },
  {
    attractions: [
      {
        name: "Harry Potter and the Escape from Gringotts",
        clues: [
          "Calculate exchange rate on Knuts",
          "Empty out vault 713",
          "Pickup keys from Griphook",
        ],
      },
      {
        name: "Men in Black Alien Attack!",
        clues: [
          "Take suits to dry cleaning",
          "Push the little red button",
          "Look into the flashy thing",
        ],
      },
    ],
    letter: "I",
  },
  {
    attractions: [
      {
        name: "Hagrid’s Magical Creatures Motorbike Adventure",
        clues: [
          "Play the flute for Fluffy",
          "Brush the dragon's Teeth",
          "Polish the unicorn’s horn",
        ],
      },
      {
        name: "One Fish, Two Fish, Red Fish, Blue Fish",
        clues: ["Cast a net", "Color by number", "Read a book"],
      },
      {
        name: "Doctor Doom’s Fearfall",
        clues: [
          "Find Latveria on the map",
          "Buff the baron’s mask",
          "Drop in on the science lab",
        ],
      },
      {
        name: "The Amazing Adventures of Spider-Man",
        clues: [
          "Weave a web",
          "Buy insect repellant",
          "Drop off photos at Daily Bugle",
        ],
      },
      {
        name: "The High in the Sky Seuss Trolley Train Ride",
        clues: [
          "Remove head from clouds",
          "Navigate through Whoville",
          "Drive down Mulberry Street",
        ],
      },
    ],
    letter: "D",
  },
  {
    attractions: [
      {
        name: "Transformers: The Ride 3D",
        clues: [
          "Pick out a disguise for the robots",
          "Optimize the storage in the semi truck",
          "Get a new pair of glasses",
        ],
      },
      {
        name: "Fast & Furious—Supercharged",
        clues: [
          "Light grill for family cookout",
          "Turbocharge the charger",
          "Open garage doors",
        ],
      },
      {
        name: "Revenge of the Mummy",
        clues: [
          "Wrap up bandages",
          "Listen to the beetles",
          "Carve hieroglyphs into the wall",
        ],
      },
      {
        name: "E.T. Adventure",
        clues: [
          "Assemble intergalactic phone",
          "Attach basket to bicycle",
          "Layout the Reese’s Pieces",
        ],
      },
      {
        name: "The Simpsons Ride",
        clues: [
          "Do some donuts",
          "Stock the fridge with Duff",
          "Check for missing uranium rods",
        ],
      },
    ],
    letter: "E",
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        The main point of entry to the puzzle should be solver recognizing that
        the overall theme for the puzzles is theme parks. They will do this from
        the clue in the puzzle title (“A Walk in the Park”) and the flavor text
        (“I’m just along for the ride”). From there they will need to determine
        the two maps given are of Magic Kingdom and Universal Studios/Islands of
        Adventure. The main ah-ha comes from the realization that each of the
        items presented refers to an individual ride. Solvers will need to
        connect each set of clues to a ride and locate each ride on the official
        park maps. They then need to draw a line connecting each attraction in
        the order indicated, as clued by the title . These paths will form
        letters. The boxes identify which group of rides belong to the same
        letter. We are only using rides, not other attractions, stores or
        restaurants, to try to minimize false positives. The flavor text (I’m
        just along for the ride) clues that only rides should be used. The
        answer is two words with each word being contained to Magic Kingdom or
        Universal Studios/Islands of Adventure.
      </p>
      <p>
        The final solution is{" "}
        <Mono>
          <strong>LONG STRIDE</strong>
        </Mono>
      </p>
      <p>
        The Magic Kingdom at Walt Disney World gives the word <Mono>LONG</Mono>:
      </p>
      <StyledTable>
        <tr>
          <th>Attraction Name</th>
          <th>Clue</th>
          <th>Letter</th>
        </tr>
        {MAGIC_KINGDOM_DATA.map(({ attractions, letter }) =>
          attractions.map(({ name, clues }, i) => (
            <tr key={`magic-kingdom-row-${i}`}>
              <td>{name}</td>
              <td>
                <ul>
                  {clues.map((clue, j) => (
                    <li key={`magic-kingdom-row-${i}-clue-${j}`}>
                      {" "}
                      {clue === "Refill the O2H bottles" ? (
                        <span>
                          Refill the O<sub>2</sub>H bottles
                        </span>
                      ) : (
                        clue
                      )}
                    </li>
                  ))}
                </ul>
              </td>
              {i === 0 && <td rowSpan={attractions.length}>{letter}</td>}
            </tr>
          )),
        )}
      </StyledTable>
      <FlexWrapper>
        <SizedImage
          src={image1}
          alt="A map, with land indicated in green, water indicated in blue, and paths indicated in yellow."
        />
      </FlexWrapper>
      <FlexWrapper>
        <SizedImage
          src={disneyWorldMap}
          alt="A map of Disney World, with the word LONG spelled out in four different colors by drawing lines between rides on the map."
        />
      </FlexWrapper>
      <p>
        Universal Studios Orlando and Islands of Adventure give the word{" "}
        <Mono>STRIDE</Mono>:
      </p>
      <StyledTable>
        <tr>
          <th>Attraction Name</th>
          <th>Clue</th>
          <th>Letter</th>
        </tr>
        {UNIVERSAL_DATA.map(({ attractions, letter }) =>
          attractions.map(({ name, clues }, i) => (
            <tr key={`magic-kingdom-row-${i}`}>
              <td>{name}</td>
              <td>
                <ul>
                  {clues.map((clue, j) => (
                    <li key={`magic-kingdom-row-${i}-clue-${j}`}>
                      {clue}
                      {clue === "Solve" && <Formula />}
                    </li>
                  ))}
                </ul>
              </td>
              {i === 0 && <td rowSpan={attractions.length}>{letter}</td>}
            </tr>
          )),
        )}
      </StyledTable>
      <FlexWrapper>
        <SizedImage
          src={image2}
          alt="A map, with land indicated in green, water indicated in blue, and paths indicated in yellow."
        />
      </FlexWrapper>
      <FlexWrapper>
        <SizedImage
          src={universalStudiosMap}
          alt="A map of Universal Studios, with the letters R, I and E spelled out in three different colors by drawing lines between rides on the map."
        />
      </FlexWrapper>
      <FlexWrapper>
        <SizedImage
          src={islandsOfAdventureMap}
          alt="A map of Islands of Adventure, with the letters S, T and D spelled out in three different colors by drawing lines between rides on the map."
        />
      </FlexWrapper>
    </>
  );
};

export default Solution;
