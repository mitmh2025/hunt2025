import React from "react";
import seedrandom from "seedrandom";

// The maze map.  Use + for walls, / for doors,
// s = start, A-Z for characters, 1-9 for givens
const Maze = `
+++++++++++++++++++
+     +   /   +  F+
+++ + + + +++ + + +
+    H+     +   + +
+ + +++ + + +++++ +
+   + /  E    + + +
+ +/+ +++/+++++ + +
+ + +G  +   +   + +
+++ + +++ +++++ +/+
+     +   +  C    +
+++ +++ + +++ +++ +
+   +      I+ + + +
+++++ +++++++/+ +++
+5  + +   +   +  D+
+++ +++ + + +++ + +
+s+ + + +  B/     +
+ + + +++ + +++ + +
+A      /   +     +
+++++++++++++++++++
`
  .trim()
  .split("\n");

const MazeDimension = (Maze.length - 1) / 2;

export const Characters = [
  "Stephanie",
  "Daniel",
  "Maurice",
  "Patrick",
  "Vladimir",
  "Caroline",
  "Annabelle",
  "Helen",
  "Jessica",
];

export const CharacterMessages = [
  /* A */
  <>
    <p>
      Welcome to the maze! I’m {Characters[0]}, and I’m in charge of your
      welcome orientation.
    </p>
    <p>
      This maze consists of a bunch of rooms connected to each other by open
      passages, or sometimes by doors. The doors delimit regions of the maze.
      There are general rules that apply to the whole maze, and additional rules
      that apply to specific regions.
    </p>
    <p>
      As you explore, you will encounter other people who work here. They will
      tell you about some of the rules. The key thing you should know is that
      some of them are liars, and they lie all the time, so none of the
      statements they make are true; the others tell the truth all the time. All
      the true statements you will hear about rules that apply in specific
      regions of the maze refer to different regions. But you will need to
      figure out for yourself who is telling the truth and who is lying.
    </p>
  </>,
  /* B */
  <>
    <p>
      Everyone here lies all the time. In particular {Characters[0]} lies all
      the time. You should listen only to me. I’m pretty sure {Characters[0]}{" "}
      didn’t even tell you the truth about what you’re supposed to do here.
    </p>
    <p>
      You see, some of the rooms of this maze used to contain a single digit
      from 1 to 8, while others remained empty, in such a way that if two rooms
      that lie due East or due North of each other happen to contain the same
      digit, then the distance between these rooms must be greater than the
      value of that digit; and rooms containing identical digits cannot touch
      each other by a corner.
    </p>
    <p>Oh, and I have to warn you that {Characters[2]} is also a liar.</p>
  </>,
  /* C */
  <>
    <p>
      Every room of this maze used to contain a single digit from 1 to 9, in
      such a way that two rooms that lie due East or due North of each other
      can’t contain the same digits, and two rooms that can be joined without
      passing through a door can’t contain the same digits either.
    </p>
    <p>
      Only one of the digits remains visible -- a five -- perhaps you’ve seen it
      already? And in fact, there are two other 5’s that you will be able to
      place into the maze as soon as you have learned the rules for their
      respective regions. Anyway, it would be great if you could help us figure
      out all the missing digits!
    </p>
  </>,
  /* D */
  <>
    <p>
      It must be pretty confusing to not know who is being truthful with you...
      I hope you sort it out. In any case, you should know that {Characters[2]}{" "}
      and {Characters[7]} are both telling the truth.
    </p>
    <p>
      There is a region of the maze whose only door opens to the West, in which
      any two adjacent rooms (not separated by a wall or door) must contain
      digits which differ by at least 4. In another region, any two adjacent
      rooms (again, not separated by a wall or door) must contain digits which
      differ by a power of 2. And in yet another region, any two adjacent rooms
      (still not separated by a wall or door) must contain digits which differ
      by at least 2.
    </p>
  </>,
  /* E */
  <>
    <p>
      You need to know that {Characters[3]} is a liar. Here’s the correct
      information he won’t tell you.
    </p>
    <p>
      In a region of the maze whose only door opens to the South, the numbers
      formed by reading the digits North to South from wall to wall (or door),
      or from West to East from wall to wall, are all perfect squares. In
      another region, the numbers formed in this way are all prime. And in yet
      another region, the numbers formed in this way are all multiples of 7.
    </p>
  </>,
  /* F */
  <>
    <p>
      In one of the regions of the maze, the largest and smallest digits
      encountered along the shortest path between the only two doors are those
      right next to the doors. In another region, along the shortest path
      between the only two doors, the digit right next to one door is equal to
      the sum of all the others. And in yet another region, the digits
      encountered along the shortest path between the only two doors are in
      increasing or decreasing order along the path. You seem pretty smart, so
      it shouldn’t be hard for you to figure out which three regions I’m talking
      about.
    </p>
    <p>By the way, {Characters[6]} is a liar.</p>
  </>,
  /* G */
  <>
    <p>
      In one of the regions of the maze, the digits encountered along the
      shortest path between the only two doors alternate between odd and even.
      In another region, the digits encountered along the shortest path between
      the only two doors form a prime number when read in the correct direction.
      And in yet another region, the product of the digits encountered along the
      shortest path between the only two doors is a perfect square. Surely
      you’ll be able to figure out which three regions I’m talking about.
    </p>
    <p>And, by the way, {Characters[5]} is a liar.</p>
  </>,
  /* H */
  <>
    <p>
      Exactly one of {Characters[6]} and {Characters[8]} is a liar.
    </p>
    <p>
      Also, one of the regions of the maze contains the exact same digits in the
      same relative positions as another identically shaped region.
    </p>
  </>,
  /* I */
  <>
    <p>There are either three or four liars among us.</p>
    <p>
      About the maze: in a region whose only door opens to the North, any two
      adjacent rooms (not separated by a wall or door) may not both contain
      digits that are prime numbers. Even better: in a region whose only door
      opens to the East, any two adjacent rooms (not separated by a wall or
      door) must contain digits whose difference is 1 or whose ratio is 2.
    </p>
  </>,
];

export type Edge = "passage" | "wall" | "door";

export type Room = {
  cell: string;
  given?: number;
  character?: number;
  northEdge: Edge;
  eastEdge: Edge;
  southEdge: Edge;
  westEdge: Edge;
  lookId: string;
  talkId?: string;

  northId?: string;
  eastId?: string;
  southId?: string;
  westId?: string;
};

const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const parseEdge = (c: string): Edge => {
  switch (c) {
    case "+":
      return "wall";
    case "/":
      return "door";
    case " ":
      return "passage";
    default:
      throw new Error(`Invalid edge character: ${c}`);
  }
};

// Want the page URLs to be stable, but randomized xkcd-style
const RandomSeed = "9d1afc232e59c262592be77c0ee36421";
const rng = seedrandom(RandomSeed);

const generateId = (): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  return new Array(8)
    .fill(null)
    .map(() => characters[Math.floor(rng() * characters.length)])
    .join("");
};

export const rooms: Room[][] = new Array(MazeDimension)
  .fill(null)
  .map((_, row) =>
    new Array(MazeDimension).fill(null).map((_, col) => {
      const cell = (Maze[row * 2 + 1] ?? [])[col * 2 + 1];
      const north = (Maze[row * 2] ?? [])[col * 2 + 1];
      const east = (Maze[row * 2 + 1] ?? [])[col * 2 + 2];
      const south = (Maze[row * 2 + 2] ?? [])[col * 2 + 1];
      const west = (Maze[row * 2 + 1] ?? [])[col * 2];
      if (
        cell === undefined ||
        north === undefined ||
        east === undefined ||
        south === undefined ||
        west === undefined
      ) {
        throw new Error(`Invalid maze cell at row ${row}, col ${col}`);
      }

      const given = cell >= "1" && cell <= "9" ? parseInt(cell) : undefined;
      const character =
        cell >= "A" && cell <= "Z" ? Letters.indexOf(cell) : undefined;

      return {
        cell,
        given,
        character,
        northEdge: parseEdge(north),
        eastEdge: parseEdge(east),
        southEdge: parseEdge(south),
        westEdge: parseEdge(west),
        lookId: generateId(),
        talkId: character !== undefined ? generateId() : undefined,
      };
    }),
  );

// Add the room IDs
rooms.forEach((row, rowIndex) => {
  row.forEach((room, colIndex) => {
    room.northId =
      room.northEdge !== "wall"
        ? (rooms[rowIndex - 1] ?? [])[colIndex]?.lookId
        : undefined;
    room.southId =
      room.southEdge !== "wall"
        ? (rooms[rowIndex + 1] ?? [])[colIndex]?.lookId
        : undefined;
    room.eastId =
      room.eastEdge !== "wall" ? row[colIndex + 1]?.lookId : undefined;
    room.westId =
      room.westEdge !== "wall" ? row[colIndex - 1]?.lookId : undefined;
  });
});

export const startRoom = rooms.flat().find((r) => r.cell === "s");
if (!startRoom) {
  throw new Error("No start room found");
}
