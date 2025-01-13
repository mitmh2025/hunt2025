import rawArtifacts from "./data/artifacts_compiled.json";
import rawBlackMines from "./data/black_mines_compiled.json";
import rawBurningDark from "./data/burning_dark_compiled.json";
import rawCavesOfCarnage from "./data/caves_of_carnage_compiled.json";
import rawFrozenCrypt from "./data/frozen_crypt_compiled.json";
import rawKeys from "./data/keys_by_floor.json";
import rawSaves from "./data/saves.json";

export const startMessage =
  "Entering through some ornate doors labeled “DO” you stand upon a stone platform at the beginning of a winding frozen tunnel. You were given a compass like normal, but the map did not show up and your deck seems to be gone. The cards seem to be useless here, but a map such as the official one Aureeee made is essential, even though that map seems to face west instead of north. From what you can tell, everything seems to be normal, although the dungeon is calm and quiet, and the compass seems to point to locations that artifacts were not placed before.";

type RawRoom = {
  depth: string;
  TrueX: string;
  TrueZ: string;
  x: string;
  y: string;
  roomDescription: string;
  moveDescriptions: string;
  moves: {
    direction: string;
    destination: string;
  }[];
};

const rawRooms = new Map<number, Record<string, RawRoom>>()
  .set(1, rawFrozenCrypt)
  .set(2, rawCavesOfCarnage)
  .set(3, rawBlackMines)
  .set(4, rawBurningDark);

export type Room = {
  number: number;
  level: number;
  depth: string;
  roomDescription: string;
  moveDescription: string;
  coordinates: {
    display: {
      x: number;
      z: number;
    };
    heading: {
      x: number;
      y: number;
    };
  };
  key?: {
    compass: number;
    findMessage: string;
    nearbyMessage: string;
  };
  moves: Record<string, number>;
  save: string;
};

const keysByRoom = new Map<number, NonNullable<Room["key"]>>();
Object.values(rawKeys).forEach((k) => {
  keysByRoom.set(parseInt(k.location), {
    compass: parseInt(k.compassPasscode),
    findMessage: k.findMessage,
    nearbyMessage: k.nearbyMessage,
  });
});

export const rooms = new Map<number, Room>();
rawRooms.forEach((levelRawRooms, level) => {
  Object.entries(levelRawRooms).forEach(([rawNumber, rawRoom]) => {
    const roomNumber = parseInt(rawNumber);
    rooms.set(roomNumber, {
      number: roomNumber,
      level,
      depth: rawRoom.depth,
      roomDescription: rawRoom.roomDescription,
      moveDescription: rawRoom.moveDescriptions,
      key: keysByRoom.get(roomNumber),
      coordinates: {
        display: {
          x: parseInt(rawRoom.TrueX),
          z: parseInt(rawRoom.TrueZ),
        },
        heading: {
          x: parseInt(rawRoom.x),
          y: parseInt(rawRoom.y),
        },
      },
      moves: Object.fromEntries(
        rawRoom.moves.map((m) => {
          return [m.direction, parseInt(m.destination)];
        }),
      ),
      save: rawSaves[roomNumber] ?? "",
    });
  });
});

export const saveToRoomNumber = new Map<string, number>();
rawSaves.forEach((save, room) => {
  if (room === 0) return;
  saveToRoomNumber.set(save, room);
});

export type Artifact = {
  name: string;
  level: number;
  depth: string;
  room: number;
  message: string;
};

export const artifacts = new Map<number, Artifact>();
Object.entries(rawArtifacts).forEach(([rawNumber, rawArtifact]) => {
  artifacts.set(parseInt(rawNumber), {
    name: rawArtifact.name,
    level: rawArtifact.floor,
    depth: rawArtifact.depth,
    room: parseInt(rawArtifact.location),
    message: rawArtifact.findMessage,
  });
});
