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

type ArtifactType = [
  name: string,
  compass: number,
  level: string,
  location: number,
  frostEmbers: number | undefined,
  hermit: string,
];

const NonSecretArtifacts: ArtifactType[] = [
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
];

const SecretArtifacts: ArtifactType[] = [
  ["Muffin of Blue Skies", 70, "1", 40, 34, "N/A"],
  ["Order of Life", 45, "1", 20, 19, "N/A"],
  ["Chef Mizan’s Dynamite Surprise", 41, "2", 64, 48, "N/A"],
  ["Shroom of the Warrior", 58, "2", 72, 39, "N/A"],
  ["Morpheus’ Razor", 20, "3(Lower)", 119, 51, "N/A"],
  ["(Instructions)", 33, "3(Lower)", 123, undefined, "N/A"],
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

type ArtifactTableProps = {
  artifacts: ArtifactType[];
  hasHermits?: boolean;
};

const ArtifactTable: React.FC<ArtifactTableProps> = ({
  artifacts,
  hasHermits = true,
}) => {
  return (
    <HScrollTableWrapper>
      <SolutionTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Compass Value</th>
            <th>Level</th>
            <th>Location</th>
            <th>Frost Embers</th>
            {hasHermits && <th>Hermit</th>}
          </tr>
        </thead>
        <tbody>
          {artifacts.map(
            ([name, compass, level, location, frostEmbers, hermit]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{compass}</td>
                <td>{level}</td>
                <td>{location}</td>
                <td>{frostEmbers ?? "N/A"}</td>
                {hasHermits && <td>{hermit}</td>}
              </tr>
            ),
          )}
        </tbody>
      </SolutionTable>
    </HScrollTableWrapper>
  );
};

const ArtifactCrossingTableData: [
  floor: number,
  location1: number,
  location2: number,
  location3: number,
  location4: number,
  crossingLocation: number,
  frostSum: number,
][] = [
  [1, 3, 17, 43, 44, 33, 115],
  [2, 52, 60, 69, 73, 79, 99],
  [3, 82, 108, 122, 127, 126, 53],
  [4, 159, 175, 197, 207, 205, 180],
];

const ArtifactCrossingTable = () => {
  return (
    <HScrollTableWrapper>
      <SolutionTable>
        <thead>
          <tr>
            <th>Floor</th>
            <th>Location 1</th>
            <th>Location 2</th>
            <th>Location 3</th>
            <th>Location 4</th>
            <th>
              Key Location
              <br />
              (Crossing Location)
            </th>
            <th>
              Compass Setting
              <br />
              (Frost ember value sum)
            </th>
          </tr>
        </thead>
        <tbody>
          {ArtifactCrossingTableData.map(
            ([
              floor,
              location1,
              location2,
              location3,
              location4,
              crossingLocation,
              frostSum,
            ]) => (
              <tr key={floor}>
                <td>{floor}</td>
                <td>{location1}</td>
                <td>{location2}</td>
                <td>{location3}</td>
                <td>{location4}</td>
                <td>{crossingLocation}</td>
                <td>{frostSum}</td>
              </tr>
            ),
          )}
        </tbody>
      </SolutionTable>
    </HScrollTableWrapper>
  );
};

const EggCrossingTableData: [
  hermit1: string,
  eggLocation1: number,
  artifactLocation1: number,
  hermit2: string,
  eggLocation2: number,
  artifactLocation2: number,
  crossingLocation: number,
  compass: number,
][] = [
  ["BdoubleO100", 29, 17, "impulseSV", 31, 44, 40, 70],
  ["Stressmonster101", 17, 3, "Welsknight", 7, 43, 20, 45],
  ["Hypnotizd", 58, 69, "VintageBeef", 78, 60, 64, 41],
  ["cubfan135", 68, 52, "JoeHills", 54, 73, 72, 58],
  ["Xisumavoid", 90, 82, "GoodTimesWithScar", 85, 122, 119, 20],
  ["ZombieCleo", 89, 108, "PearlescentMoon", 103, 127, 123, 33],
];

const EggCrossingTable = () => {
  return (
    <HScrollTableWrapper>
      <SolutionTable>
        <thead>
          <tr>
            <th>Hermit</th>
            <th>Egg Location</th>
            <th>Artifact Location</th>
            <th>Hermit</th>
            <th>Egg Location</th>
            <th>Artifact Location</th>
            <th>Crossing Location</th>
            <th>Compass (Frost Ember Sum)</th>
          </tr>
        </thead>
        <tbody>
          {EggCrossingTableData.map(
            ([
              hermit1,
              eggLocation1,
              artifactLocation1,
              hermit2,
              eggLocation2,
              artifactLocation2,
              crossingLocation,
              compass,
            ]) => (
              <tr key={`${hermit1}-${hermit2}`}>
                <td>{hermit1}</td>
                <td>{eggLocation1}</td>
                <td>{artifactLocation1}</td>
                <td>{hermit2}</td>
                <td>{eggLocation2}</td>
                <td>{artifactLocation2}</td>
                <td>{crossingLocation}</td>
                <td>{compass}</td>
              </tr>
            ),
          )}
        </tbody>
      </SolutionTable>
    </HScrollTableWrapper>
  );
};

const Solution = () => {
  return (
    <>
      <p>
        The puzzle is an exploration of the dungeon of Decked Out 2, a minigame
        made by TangoTek on the Hermitcraft Minecraft server. This is clued
        throughout the puzzle, e.g. the title, a reference to Deepfrost Citadel
        (TangoTek’s base sitting directly above the game), the names of
        artifacts (pulled directly from the game), and the reference to
        Aureeee’s map. As in the game, this puzzle has you going around the
        dungeon picking up various items. While moving around the dungeon,
        solvers come across eggs of various hermits, keys to move to deeper
        levels of the dungeon, and the aforementioned artifacts.
      </p>
      <p>
        Each floor has 4 artifacts, all from the base game, hidden throughout
        the map. Once all 4 artifacts one one floor are found, solvers need to
        move down to the next floor to collect more artifacts, but the door down
        is locked and needs a key. At the door solvers are told, “Cross the
        artifacts. Find the key,” and “a reminder that checking your coordinates
        can help with navigation... if only you could remember what the command
        was.” (In Minecraft you can check your coordinates by pressing the F3
        key; in this puzzle you can check your coordinates with the undocumented
        command “F3.”)
      </p>
      <ArtifactTable artifacts={NonSecretArtifacts} />
      <p>
        Using the coordinates of the four artifacts on a level to make a cross
        yields a set of coordinates that, when rounded to the nearest integer,
        matches the coordinates of a room on that level. Setting the compass to
        the sum of the frost ember values of all of the artifacts on the floor
        allows a solver to pick up the key on each of the first three floors
        using the “FD” command.
      </p>
      <ArtifactCrossingTable />
      <p>
        At the intersection on 4th floor, instead of a key at the intersection,
        you get a note:
      </p>
      <blockquote>
        Hidden beneath the altar you find a small slip of paper. It reads “The
        eggs are searching for their artifacts. Connect their artifacts to them
        and they’ll help you find your artifact. Compass should be set to the
        total value of the artifacts that are used. Floor 1’s artifacts are on
        upper, Floor 2’s are on middle, and Floor 3’s are on lower.”
      </blockquote>
      <p>
        Every egg in the puzzle has a description that clues the name of a
        hermit in Hermitcraft:
      </p>
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
      <p>
        Connecting each egg to the respective hermit’s artifact creates two new
        crosses on each of the first three floors.
      </p>
      <EggCrossingTable />
      <p>
        Going to the intersections on the appropriate level, setting the compass
        to the sum of the frost ember values of the two artifacts associated
        with each cross, and using FD yields six new items:
      </p>
      <ArtifactTable artifacts={SecretArtifacts} hasHermits={false} />
      <p>
        The first five of these are new secret artifacts that are not part of
        Decked Out 2 but have frost ember values when you discover them, the
        sixth item is a new set of instructions:
      </p>
      <blockquote>
        Within the piles of the miner’s collectibles, a small slip of paper
        sticks out waiting to be read. “What you seek is at (X=Negative floor 1
        secret product, Z=Floor 2 secret product) with Compass=Floor 3 secret,
        Floor=4.”
      </blockquote>
      <p>
        By following the instructions and using the negative product of the
        first floor secret artifact frost ember values (-646) as the X
        coordinate and the product of the second floor secret artifact frost
        ember values (1872) as the Z coordinate, you find a room on floor 4.
        Setting the compass to the frost ember value of the lone third floor
        secret artifact (51) in this room and using FD finds the final artifact,
        which is also the answer: <PuzzleAnswer>KENGREXAL</PuzzleAnswer>.
      </p>
      <p>
        Below are the fully mapped out floors, building off of{" "}
        <a
          href="https://aureeee.wixsite.com/hmedtf9dnd8ym"
          target="_blank"
          rel="noreferrer"
        >
          Aureeee’s maps
        </a>
        .
      </p>
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
