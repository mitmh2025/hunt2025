import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Math, MFrac, MI, MRow } from "../../components/MathML";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";

const SizedImage = styled(LinkedImage)`
  width: 50%;
  margin: 16px 0px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const TodoList = styled.div<{ $suppressTopMargin: boolean }>`
  border: 1px solid var(--true-black);
  padding: 8px 32px;
  width: 50%;
  border-top-width: ${({ $suppressTopMargin }) =>
    $suppressTopMargin ? 0 : 1}px;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  li {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  margin-bottom: 16px;
`;

const Checkbox = styled.div`
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  border: 1px solid var(--true-black);
`;

const LISTS_1: [string, string, string][][] = [
  [
    [
      "Set music to infinite loop",
      "Doll up the performers",
      "Check if world peace has been achieved",
    ],
    [
      "Sprinkle pixie dust",
      "Set course to second star to the right",
      "Polish hook",
    ],
    [
      "Clean surcingles, numnahs and cruppers",
      "Go around in circles",
      "Tune organ",
    ],
  ],
  [
    ["Feed Rover", "Put record on phonograph", "Calibrate voice recognition"],
    [
      "Refill the sugar cubes",
      "Check under the lids for mice",
      "Polish the china",
    ],
    [
      "Take a depth reading and mark one",
      "Ring the bell",
      "Remove paddle once up river",
    ],
    ["Refill the O2H bottles", "Cut back vines", "Skip around the skipper"],
    ["Get a move on", "Push rev 5 of ORAC", "Remove WEDway signs"],
  ],
  [
    [
      "Tighten the loose cannons",
      "Record dead men’s tales",
      "Uncork bottles of rum",
    ],
    [
      "Install a lightning rod",
      "Calculate wilderness wildness factor",
      "Tumble into weeds",
    ],
    ["Shine the lamp", "Sweep under the rug", "Find a diamond in the rough "],
    ["Exorcize the demons", "Stretch the portraits", "Pick up a hitchhiker"],
  ],
  [
    ["Hold up a feather", "Put some junk in the trunk", "Flap the ears"],
    ["Dive right in", "Inventory the whozits and whatzits", "Hit a high note"],
    ["Sharpen the pick axes", "Practice whistling", "Visit the Doc"],
    [
      "Reload the astro blasters",
      "Fall with style",
      "Conference with the little green men",
    ],
    [
      "Update the starport departure schedule",
      "Eat a Milky Way",
      "Plan hiking trip on Olympus Mons",
    ],
    [
      "Derez",
      "Reboot the Master Control Program",
      "Set turn angle to 90 degrees",
    ],
    [
      "Disconnect gas pedal",
      "Disconnect brake pedal",
      "Wave the checkered flag",
    ],
  ],
];

const LISTS_2: [string, string, string][][] = [
  [
    [
      "Energize electric fences",
      "File down claws on Blue, Charlie, Delta & Echo",
      "Solve",
    ],
    [
      "Lace up goodie two shoes",
      "Untie Nell from train tracks",
      "Iron red uniforms",
    ],
    [
      "Get Things under control",
      "Paint stripes on headgear",
      "Balance fishbowl on umbrella",
    ],
    [
      "Repaint all surfaces green",
      "Raise the Banner",
      "Replace any ripped pants",
    ],
  ],
  [
    ["Crown the king", "Practice chanting", "Monkey around"],
    [
      "Trim the willow branches",
      "Put all four balls on the pitch",
      "Fly off the handle",
    ],
    [
      "Open the floodgates",
      "Put embryos in the Barbasol can",
      "Observe vibrations in water cup",
    ],
    ["Open cans of spinach", "Pump iron", "Light the pipes"],
  ],
  [
    [
      "Pick up the banana peels",
      "Hang the overalls on the clothesline",
      "Clean the goggles",
    ],
    [
      "Walk across the stars",
      "Look for a sign",
      "String tinsel around the town",
    ],
    ["Find 30 rocks", "Write a monologue for tonight", "Mix a Manhattan"],
  ],
  [
    [
      "Calculate exchange rate on Knuts",
      "Empty out vault 713",
      "Pickup keys from Griphook",
    ],
    [
      "Take suits to dry cleaning",
      "Push the little red button",
      "Look into the flashy thing",
    ],
  ],
  [
    [
      "Play the flute for Fluffy",
      "Brush the dragon’s Teeth",
      "Polish the unicorn’s horn",
    ],
    ["Cast a net", "Color by number", "Read a book"],
    [
      "Find Latveria on the map",
      "Buff the baron’s mask",
      "Drop in on the science lab",
    ],
    ["Weave a web", "Buy insect repellant", "Drop off photos at Daily Bugle"],
    [
      "Remove head from clouds",
      "Navigate through Whoville",
      "Drive down Mulberry Street",
    ],
  ],
  [
    [
      "Pick out a disguise for the robots",
      "Optimize the storage in the semi truck",
      "Get a new pair of glasses",
    ],
    [
      "Light grill for family cookout",
      "Turbocharge the charger",
      "Open garage doors",
    ],
    [
      "Wrap up bandages",
      "Listen to the beetles",
      "Carve hieroglyphs into the wall",
    ],
    [
      "Assemble intergalactic phone",
      "Attach basket to bicycle",
      "Layout the Reese’s Pieces",
    ],
    [
      "Do some donuts",
      "Stock the fridge with Duff",
      "Check for missing uranium rods",
    ],
  ],
];

export const Formula = (): JSX.Element => {
  return (
    <Math>
      <MFrac>
        <MRow>
          <MI>&#x394;</MI>
          <MI>x</MI>
        </MRow>
        <MRow>
          <MI>&#x394;</MI>
          <MI>t</MI>
        </MRow>
      </MFrac>
    </Math>
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      <p className="puzzle-flavor">
        My new boss has given me the strangest to-do list. Guess I’m just along
        for the ride.
      </p>
      <FlexWrapper>
        <SizedImage
          src={image1}
          alt="A map, with land indicated in green, water indicated in blue, and paths indicated in yellow."
        />
      </FlexWrapper>
      {LISTS_1.map((todoList, i) => (
        <FlexWrapper key={`todolist-${i}`}>
          <TodoList $suppressTopMargin={i !== 0}>
            {todoList.map((sublist, j) => (
              <StyledUl key={`sublist-${i}-${j}`}>
                {sublist.map((item, k) => (
                  <li key={`item-${i}-${j}-${k}`}>
                    <Checkbox />
                    {item === "Refill the O2H bottles" ? (
                      <span>
                        Refill the O<sub>2</sub>H bottles
                      </span>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </StyledUl>
            ))}
          </TodoList>
        </FlexWrapper>
      ))}
      <FlexWrapper>
        <SizedImage
          src={image2}
          alt="A map, with land indicated in green, water indicated in blue, and paths indicated in yellow."
        />
      </FlexWrapper>
      {LISTS_2.map((todoList, i) => (
        <FlexWrapper key={`todolist-${i}`}>
          <TodoList $suppressTopMargin={i !== 0}>
            {todoList.map((sublist, j) => (
              <StyledUl key={`sublist-${i}-${j}`}>
                {sublist.map((item, k) => (
                  <li key={`item-${i}-${j}-${k}`}>
                    <Checkbox />
                    {item}
                    {item === "Solve" && <Formula />}
                  </li>
                ))}
              </StyledUl>
            ))}
          </TodoList>
        </FlexWrapper>
      ))}
    </>
  );
};

export default Puzzle;
