import { type Request, type Response } from "express";
import { Router } from "websocket-express";
import { z } from "zod";
import {
  type Artifact,
  artifacts,
  rooms,
  saveToRoomNumber,
  startMessage,
  type Room,
} from "./data";

// Can use a key in this room if any move will take you to a different level
const canUseKey = (level: number, room: Room) => {
  return (
    room.level === level &&
    Object.values(room.moves).some((r) => rooms.get(r)?.level !== room.level)
  );
};

const externalizedState = z.object({
  currentRoom: z.string().optional(),
  compass: z.number().optional(),
  showCoordinates: z.boolean().optional(),
  key: z
    .object({
      foundRoom: z.string(),
      usedRoom: z.string().optional(),
      compass: z.number(),
    })
    .optional(),
});
type ExternalizedStateType = z.TypeOf<typeof externalizedState>;

const requestBodySchema = z.object({
  state: externalizedState.optional(),

  // Command to process from previous state. Set max length limit to something
  // egregious, just to prevent DoS
  command: z.string().max(1024),
});
type RequestBodyType = z.TypeOf<typeof requestBodySchema>;

type InternalizedStateType = {
  currentRoom: Room;
  compass?: number;
  key?: {
    level: number;
    foundIn: Room;
    usedIn?: Room;
    foundCommand?: number;
  };
  coordinates: boolean;
  commandSequence: string[];
  error?: string;
  roomAtReset?: Room;
};

const validateKey = (
  key: ExternalizedStateType["key"],
): { valid: boolean; key?: InternalizedStateType["key"] } => {
  if (!key) {
    return { valid: true };
  }

  const foundRoomNumber = saveToRoomNumber.get(key.foundRoom);
  if (foundRoomNumber === undefined) {
    return { valid: false };
  }

  const foundRoom = rooms.get(foundRoomNumber);
  if (!foundRoom?.key || foundRoom.key.compass !== key.compass) {
    return { valid: false };
  }

  const { level } = foundRoom;

  let usedRoom: Room | undefined;
  if (key.usedRoom) {
    const usedRoomNumber = saveToRoomNumber.get(key.usedRoom);
    if (usedRoomNumber === undefined) {
      return { valid: false };
    }

    usedRoom = rooms.get(usedRoomNumber);
    if (!usedRoom || !canUseKey(level, usedRoom)) {
      return { valid: false };
    }
  }

  return {
    valid: true,
    key: { level, foundIn: foundRoom, usedIn: usedRoom },
  };
};

const internalizeState = (
  body: unknown,
):
  | { valid: false }
  | { valid: true; state: InternalizedStateType; command: string } => {
  let parsed: RequestBodyType;
  try {
    parsed = requestBodySchema.parse(body);
  } catch (error) {
    return { valid: false };
  }

  const roomNumber = saveToRoomNumber.get(parsed.state?.currentRoom ?? "");
  if (roomNumber === undefined) {
    return { valid: false };
  }

  const room = rooms.get(roomNumber);
  if (!room) {
    // This shouldn't be possible
    throw new Error(`Unable to find room ${roomNumber}`);
  }

  const { valid: keyValid, key } = validateKey(parsed.state?.key);
  if (!keyValid) {
    return { valid: false };
  }

  return {
    valid: true,
    command: parsed.command,
    state: {
      currentRoom: room,
      compass: parsed.state?.compass,
      coordinates: !!parsed.state?.showCoordinates,
      commandSequence: [],
      key,
    },
  };
};

const tokenizeCommand = (command: string): string[] => {
  const tokens: string[] = [];
  let remainder = command.toUpperCase();
  while (remainder.length > 0) {
    const match = remainder.match(/^\w\w\d{0,3}/);
    if (!match) {
      tokens.push(remainder);
      break;
    }

    tokens.push(match[0]);
    remainder = remainder.slice(match[0].length);
  }

  return tokens;
};

const updateKey = (
  key: InternalizedStateType["key"] | undefined,
  room: Room,
  compass: number | undefined,
  cmdIdx: number,
): InternalizedStateType["key"] | undefined => {
  if (
    room.key &&
    room.key.compass === compass &&
    room.level > (key?.level ?? 0)
  ) {
    return { level: room.level, foundIn: room, foundCommand: cmdIdx };
  }

  return key;
};

const externalizeState = (
  internalState: InternalizedStateType,
): ExternalizedStateType => {
  return {
    currentRoom: internalState.currentRoom.save,
    ...(internalState.compass ? { compass: internalState.compass } : {}),
    ...(internalState.coordinates ? { showCoordinates: true } : {}),
    ...(internalState.key
      ? {
          key: {
            foundRoom: internalState.key.foundIn.save,
            compass: internalState.key.foundIn.key?.compass ?? 0,
            usedRoom: internalState.key.usedIn?.save,
          },
        }
      : {}),
  };
};

const renderSave = (room: Room) => {
  return room.number === 1
    ? "This is the starting room. Reset the puzzle to return here."
    : room.save;
};

const generateCompassMessage = (
  compass: number | undefined,
  artifact: Artifact | undefined,
  currentRoom: Room,
): string => {
  if (!compass) {
    return "Your compass is not set to an artifact. Please set your compass.";
  }

  if (compass > 16) {
    return `Your compass is set to ${compass}. The compass seems to be weaker at higher values.  If this points at anything, you'd have to know where it is already for this to be helpful.`;
  }

  if (!artifact) {
    throw new Error("Compass is set to an artifact, but artifact is missing");
  }

  const prefix = `Your compass is set to ${compass} which is at depth ${artifact.depth}. `;

  if (artifact.level !== currentRoom.level) {
    return `${prefix}Your compass is spinning wildly and seems to be drawing you to a ${artifact.level > currentRoom.level ? "lower" : "higher"} floor.`;
  }

  if (artifact.room === currentRoom.number) {
    return `${prefix}Your compass has stopped moving. The artifact must be around here somewhere!`;
  }

  const currentCoord = currentRoom.coordinates.heading;
  const artifactCoord = rooms.get(artifact.room)?.coordinates.heading;
  if (!artifactCoord) {
    throw new Error("Could not find artifact coordinates");
  }

  const angle = Math.atan2(
    artifactCoord.y - currentCoord.y,
    artifactCoord.x - currentCoord.x,
  );
  const bucket = (Math.round((angle * 4) / Math.PI) + 8) % 8;
  const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][bucket];

  return `${prefix}Your compass is pointing towards the ${direction}.`;
};

const handler = (req: Request, res: Response) => {
  const parsed = internalizeState(req.body);
  if (!parsed.valid) {
    res.status(400).send("Invalid request");
    return;
  }

  const startState = parsed.state;

  const endState = tokenizeCommand(
    parsed.command,
  ).reduce<InternalizedStateType>((state, command) => {
    // If we previously encountered an error, short-circuit and ignore the
    // remaining commands
    if (state.error) {
      return state;
    }

    const instruction = command.substring(0, 2);
    const argument = command.substring(2);

    // Arguments are only accepted on the "SC" command and must be numeric
    if (argument !== "") {
      if (instruction !== "SC") {
        return { ...state, error: `Invalid command: ${command}` };
      }

      if (!/^\d+$/.test(argument)) {
        return { ...state, error: `Invalid command: ${command}` };
      }
    }

    switch (instruction) {
      case "NN":
      case "NE":
      case "EE":
      case "SE":
      case "SS":
      case "SW":
      case "WW":
      case "NW": {
        const move = state.currentRoom.moves[instruction];
        if (!move) {
          return {
            ...state,
            commandSequence: [...state.commandSequence, command],
            error: `Direction invalid for current room: ${command}`,
          };
        }

        const newRoom = rooms.get(move);
        if (!newRoom) {
          return {
            ...state,
            commandSequence: [...state.commandSequence, command],
            error: `An unexpected error occurred`,
          };
        }

        // If this is moving down a level, we need to make sure it's unlocked
        if (newRoom.level > state.currentRoom.level) {
          if (
            !state.key ||
            state.key.level !== state.currentRoom.level ||
            !state.key.usedIn
          ) {
            return {
              ...state,
              commandSequence: [...state.commandSequence, command],
              error: "This way is locked. Do you have a key?",
            };
          }
        }

        // We are clear to move
        return {
          ...state,
          commandSequence: [...state.commandSequence, command],
          currentRoom: newRoom,
          key: updateKey(
            state.key,
            newRoom,
            state.compass,
            state.commandSequence.length,
          ),
        };
      }
      case "SC": {
        const newCompass = parseInt(argument, 10);
        return {
          ...state,
          commandSequence: [...state.commandSequence, command],
          compass: newCompass,
          key: updateKey(
            state.key,
            state.currentRoom,
            newCompass,
            state.commandSequence.length,
          ),
        };
      }
      case "KY":
        if (!state.key || state.key.level < state.currentRoom.level) {
          return {
            ...state,
            commandSequence: [...state.commandSequence, command],
            error: "You haven't found a key on this floor yet.",
          };
        }

        if (state.key.usedIn) {
          return {
            ...state,
            commandSequence: [...state.commandSequence, command],
            error: "You've already used the key on this floor.",
          };
        }

        if (!canUseKey(state.key.level, state.currentRoom)) {
          return {
            ...state,
            commandSequence: [...state.commandSequence, command],
            error: "You can't use a key here.",
          };
        }

        // We can use the key
        return {
          ...state,
          commandSequence: [...state.commandSequence, command],
          key: { ...state.key, usedIn: state.currentRoom },
        };
      case "RS": {
        const room = rooms.get(1);
        if (!room) {
          return {
            ...state,
            commandSequence: [...state.commandSequence, command],
            error: "An unexpected error occurred",
          };
        }
        return {
          ...state,
          commandSequence: [...state.commandSequence, command],
          currentRoom: room,
          key: undefined,
          roomAtReset: state.currentRoom,
        };
      }
      case "F3":
        return {
          ...state,
          commandSequence: [...state.commandSequence, command],
          coordinates: !state.coordinates,
        };
      // FD and SV affect output, but not state
      case "FD":
      case "SV":
        return {
          ...state,
          commandSequence: [...state.commandSequence, command],
        };
      default:
        return { ...state, error: `Invalid command: ${command}` };
    }
  }, startState);

  const responseComponents: string[] = [];

  if (endState.coordinates) {
    responseComponents.push(
      `Current Coordinates: X=${endState.currentRoom.coordinates.display.x}, Z=${endState.currentRoom.coordinates.display.z}.`,
    );
  }

  const lastSuccessfulCommandIndex =
    endState.commandSequence.length - (endState.error ? 2 : 1);
  const lastSuccessfulCommand =
    endState.commandSequence[lastSuccessfulCommandIndex];

  if (lastSuccessfulCommand === "RS") {
    responseComponents.push(startMessage);
  }

  responseComponents.push(endState.currentRoom.roomDescription);
  responseComponents.push(endState.currentRoom.moveDescription);

  const artifact = endState.compass
    ? artifacts.get(endState.compass)
    : undefined;

  if (
    endState.key?.foundCommand !== undefined &&
    endState.key.foundCommand === lastSuccessfulCommandIndex
  ) {
    if (!endState.key.foundIn.key) {
      throw new Error("This should not be possible");
    }
    responseComponents.push(endState.key.foundIn.key.findMessage);
  } else {
    switch (lastSuccessfulCommand) {
      case "FD":
        if (
          endState.currentRoom.key &&
          (endState.key?.level ?? 0) < endState.currentRoom.level
        ) {
          responseComponents.push(endState.currentRoom.key.nearbyMessage);
        } else if (artifact && artifact.room === endState.currentRoom.number) {
          responseComponents.push(artifact.message);
        } else {
          responseComponents.push("There seems to be nothing here.");
        }
        break;
      case "KY":
        responseComponents.push("You've unlocked the next floor!");
        break;
      case "RS":
        // Make the typechecker happy but this should always be true
        if (endState.roomAtReset) {
          responseComponents.push(renderSave(endState.roomAtReset));
        }
        break;
      case "SV":
        responseComponents.push(renderSave(endState.currentRoom));
        break;
      default:
        responseComponents.push(
          generateCompassMessage(
            endState.compass,
            artifact,
            endState.currentRoom,
          ),
        );
        break;
    }
  }

  responseComponents.push(`Current Depth: ${endState.currentRoom.depth}`);

  const response = {
    message: responseComponents.join("\n\n"),
    haveKey: endState.key && !endState.key.usedIn,
    error: endState.error,
    previousCommand: endState.commandSequence.join(""),
    state: externalizeState(endState),
  };

  res.status(200).send(response);
};

const router = new Router();
router.post("/command", handler);
export default router;
