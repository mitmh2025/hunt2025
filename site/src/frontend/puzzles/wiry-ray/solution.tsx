import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { HScrollTableWrapper, PuzzleAnswer } from "../../components/StyledUI";
import floor1Lower from "./assets/floor1-lower.png";
import floor1Upper from "./assets/floor1-upper.png";
import floor2Lower from "./assets/floor2-lower.png";
import floor2Upper from "./assets/floor2-upper.png";
import floor3Lower from "./assets/floor3-lower.png";
import floor3Middle from "./assets/floor3-middle.png";
import floor3Upper from "./assets/floor3-upper.png";
import floor4 from "./assets/floor4.png";

const Eggs: [location: number, description: string, hermit: string][] = [
  [7, "protector of a midwestern congregation founded in 1850", "Welsknight"],
  [17, "rather anxious pink rathian", "Stressmonster101"],
  [19, "faintly like Beeblebrox but scrambled", "Zedaph"],
  [
    27,
    "someone tried to copy one side to the other but something seems off about it",
    "FalseSymmetry",
  ],
  [29, "a spelled out ghost sound", "BdoubleO100"],
  [29, "frozen swedish water", "Iskall85"],
  [
    31,
    "junior drum and bugle corp named without too much thought",
    "impulseSV",
  ],
  [54, "rolling mounds of coffee", "JoeHills"],
  [58, "black and white swirl pattern", "Hypnotizd"],
  [62, "surgeon with a singular letter on the nametag", "Docm77"],
  [67, "newest Apple slime (Doing the minecraft skin here)", "iJevin"],
  [68, "one of the few enjoyers of a Chicago sports team", "cubfan135"],
  [69, "a fully built first gen Scion", "xBCrafted"],
  [78, "some finely aged steak", "VintageBeef"],
  [85, "nice dinner with a disney villain", "GoodTimesWithScar"],
  [89, "risen queen of Egypt", "ZombieCleo"],
  [90, "lack of backwards songs", "Xisumavoid"],
  [101, "solid egg of gold", "Not a Hermit"],
  [103, "an iridescent satellite", "PearlescentMoon"],
  [110, "the irish sun", "Grian"],
];

const Artifacts: [
  name: string,
  compass: number,
  level: string,
  location: number,
  frostEmbers: number | undefined,
  hermit: string,
][] = [
  ["Wand of Gorgeousness", 1, "1", 3, 22, "Stressmonster101"],
  ["Pocket Watch of Shreeping", 2, "1", 17, 36, "BdoubleO100"],
  ["Knight’s Helm", 3, "1", 43, 23, "Welsknight"],
  ["Golden Eye", 4, "1", 44, 34, "impulseSV"],
  ["CF-135", 5, "2", 52, 46, "cubfan135"],
  ["Butcher’s Apron", 6, "2", 60, 20, "VintageBeef"],
  ["Hypnotic Bandana", 7, "2", 69, 21, "Hypnotizd"],
  ["Tome of the Hills", 8, "2", 73, 12, "JoeHills"],
  ["Axe of the Screamin’ Void", 9, "3(Upper)", 82, 7, "Xisumavoid"],
  ["Chisel of the Undead Sculptress", 10, "3(Middle)", 108, 19, "ZombieCleo"],
  ["Death Loop", 11, "3(Lower)", 122, 13, "GoodTimesWithScar"],
  ["Pearl of Cleansing", 12, "3(Lower)", 127, 14, "PearlescentMoon"],
  ["The Slab", 13, "4", 197, 50, "EthosLab (No Egg)"],
  ["The Skadoodler", 14, "4", 159, 52, "TangoTek (No Egg)"],
  ["An Old Friend’s Pickaxe", 15, "4", 175, 38, "TinFoilChef (No Egg)"],
  ["Gem of Greatness", 16, "4", 207, 40, "GeminiTay (No Egg)"],
  ["(Instructions)", 180, "4", 205, undefined, "N/A"],
  ["Muffin of Blue Skies", 70, "1", 40, 34, "N/A"],
  ["Order of Life", 45, "1", 20, 19, "N/A"],
  ["Chef Mizan’s Dynamite Surprise", 41, "2", 64, 48, "N/A"],
  ["Shroom of the Warrior", 58, "2", 72, 39, "N/A"],
  ["Morpheus’ Razor", 20, "3(Lower)", 119, 51, "N/A"],
  ["(Instructions)", 33, "3(Lower)", 123, undefined, "N/A"],
  ["KENGREXAL", 51, "4", 178, undefined, "N/A"],
];

const Keys: [floor: number, compass: number, location: number][] = [
  [1, 115, 33],
  [2, 99, 79],
  [3, 53, 126],
];

const SolutionTable = styled.table`
  border-collapse: collapse;
  margin-bottom: 1rem;

  th,
  td {
    text-align: left;
    border: 1px solid black;
    padding: 0.5rem;
  }
`;

const Solution = () => {
  return (
    <>
      <p>
        The puzzle has you exploring the dungeon of Decked Out 2, a minigame
        made by TangoTek on the Hermitcraft Minecraft server. This is clued
        throughout the puzzle, with some of the larger hints being the title
        cluing in Deepfrost Citadel, the name of TangoTek’s base sitting
        directly above the game and the names of artifacts being directly pulled
        from the game. Following the game, the puzzle has you going around the
        dungeon to pick up various artifacts. While moving around the dungeon,
        solvers can, and should, come across eggs of various hermits, keys to
        move to deeper levels of the dungeon, and the aforementioned artifacts.
      </p>

      <p>
        Each floor has 4 Artifacts, all from the base game, hidden throughout
        the map. Once all 4 artifacts are found, solvers will have to move down
        to lower floors to collect more artifacts, however the door down is
        locked and needs a key. At the door solvers get a hint of “Crossing the
        Artifacts” to find the key as well as a hint of what the command is to
        access the coordinates of each location. Using the coordinates of the
        artifacts to make a cross you get a set of coordinates that when rounded
        has the coordinates to a room on the floor. Setting the compass to the
        total frost ember value of all of the artifacts on the floor allows for
        the key to be picked up at this room. This method of finding the key is
        persistent across the first 3 floors, as seen at each door having a
        similar hint of “Crosses, Keys”, as well as a depth for floor 3 to
        simplify the multi-tiered nature of that floor.
      </p>

      <p>
        On the 4th floor, instead of a key at the intersection, you get a note
        telling you “The eggs are searching for their artifacts. Connect their
        artifacts to them and they’ll help you find your artifact.” which is a
        clue to make new crosses on the first three floors by connecting the
        eggs of each of the hermits to their respective artifacts.
      </p>

      <p>
        Using FD with the compass set to the sum of the frost ember values of
        the two artifacts associated with the cross at the intersection will
        give the solver 5 new artifacts that are not a part of Decked Out 2 but
        have a frost ember value, as well as instructions on how to use these
        values to get to the final artifact. By following the instructions of
        getting the product of the first floor secret artifact values and using
        the negative of it as the X coordinate and the product of the second
        floor secret artifact values for the Z coordinate, you find a room on
        floor 4 with these values. Setting the compass to the value of the
        secret floor 3 artifact in this room and using FD finds the final
        artifact, which is also the answer, of{" "}
        <PuzzleAnswer>KENGREXAL</PuzzleAnswer>.
      </p>

      <h3>Eggs</h3>

      <HScrollTableWrapper>
        <SolutionTable>
          <thead>
            <tr>
              <th>Location</th>
              <th>Description</th>
              <th>Hermit</th>
            </tr>
          </thead>
          <tbody>
            {Eggs.map(([location, description, hermit]) => (
              <tr key={location}>
                <td>{location}</td>
                <td>{description}</td>
                <td>{hermit}</td>
              </tr>
            ))}
          </tbody>
        </SolutionTable>
      </HScrollTableWrapper>

      <h3>Artifacts</h3>

      <HScrollTableWrapper>
        <SolutionTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Compass Value</th>
              <th>Level</th>
              <th>Location</th>
              <th>Frost Embers</th>
              <th>Hermit</th>
            </tr>
          </thead>
          <tbody>
            {Artifacts.map(
              ([name, compass, level, location, frostEmbers, hermit]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{compass}</td>
                  <td>{level}</td>
                  <td>{location}</td>
                  <td>{frostEmbers ?? "N/A"}</td>
                  <td>{hermit}</td>
                </tr>
              ),
            )}
          </tbody>
        </SolutionTable>
      </HScrollTableWrapper>

      <h3>Keys</h3>

      <HScrollTableWrapper>
        <SolutionTable>
          <thead>
            <tr>
              <th>Floor</th>
              <th>Compass Value</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {Keys.map(([floor, compass, location]) => (
              <tr key={floor}>
                <td>{floor}</td>
                <td>{compass}</td>
                <td>{location}</td>
              </tr>
            ))}
          </tbody>
        </SolutionTable>
      </HScrollTableWrapper>

      <p>Below are the fully mapped out floors.</p>

      <LinkedImage
        src={floor1Upper}
        alt="Map of the upper section of floor 1"
      />
      <LinkedImage
        src={floor1Lower}
        alt="Map of the lower section of floor 1"
      />
      <LinkedImage
        src={floor2Upper}
        alt="Map of the upper section of floor 2"
      />
      <LinkedImage
        src={floor2Lower}
        alt="Map of the lower section of floor 2"
      />
      <LinkedImage
        src={floor3Upper}
        alt="Map of the upper section of floor 3"
      />
      <LinkedImage
        src={floor3Middle}
        alt="Map of the middle section of floor 3"
      />
      <LinkedImage
        src={floor3Lower}
        alt="Map of the lower section of floor 3"
      />
      <LinkedImage src={floor4} alt="Map of floor 4" />
    </>
  );
};

export default Solution;
