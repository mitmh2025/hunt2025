import { type ParsedQs } from "qs";
import React from "react";
import { styled } from "styled-components";
import {
  CharacterMessages,
  Characters,
  rooms,
  startRoom,
  type Room,
} from "./data";

const lookIds = new Map<string, Room>();
rooms.forEach((row) => {
  row.forEach((room) => lookIds.set(room.lookId, room));
});
const talkIds = new Map<string, Room>();
rooms.forEach((row) => {
  row.forEach((room) => room.talkId && talkIds.set(room.talkId, room));
});

const Room = styled.div`
  all: revert;
  * {
    all: revert;
  }

  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  min-height: 600px;
  background-color: #000;
  color: #80ff80;
  font-family: Courier, monospace;
  padding-top: 8px;

  && p {
    margin-top: 0;
    padding-inline: 8px;
  }

  && a,
  && a:hover {
    color: #00c8ff;
    text-decoration: underline;
  }
`;

const Direction = styled.span`
  text-transform: capitalize;
`;

const CharacterStatement = styled.div`
  font-style: italic;
`;

const InputContainer = styled.div`
  flex-grow: 1;
  display: flex;
`;

const List = ({
  singularType,
  pluralType,
  items,
}: {
  singularType: string;
  pluralType: string;
  items: React.ReactNode[];
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <p>
      There {items.length > 1 ? `are ${pluralType}` : `is a ${singularType}`}{" "}
      {items.map((i, k) => {
        return (
          <>
            {i}
            {items.length > 2 && k < items.length - 1 ? ", " : ""}
            {k === items.length - 2 ? " and " : ""}
          </>
        );
      })}
      .
    </p>
  );
};

const NavData = ({ room }: { room: Room }) => {
  return (
    <script
      type="application/json"
      id="maze-of-lies-navdata"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          lookId: room.lookId,
          talkId: room.talkId,
          northEdge: room.northEdge,
          eastEdge: room.eastEdge,
          southEdge: room.southEdge,
          westEdge: room.westEdge,
          northId: room.northId,
          eastId: room.eastId,
          southId: room.southId,
          westId: room.westId,
        }),
      }}
    />
  );
};

const Look = ({
  room,
  start,
  door,
}: {
  room: Room;
  start?: boolean;
  door?: boolean;
}) => {
  const directions = ["north", "south", "east", "west"] as const;
  const walls = directions
    .map((dir) => {
      const edge = room[`${dir}Edge`];
      return edge === "wall" ? dir : null;
    })
    .filter((x) => x !== null);
  const doors = directions
    .map((dir) => {
      const edge = room[`${dir}Edge`];
      return edge === "door" ? dir : null;
    })
    .filter((x) => x !== null);
  const passages = directions
    .map((dir) => {
      const edge = room[`${dir}Edge`];
      return edge === "passage" ? dir : null;
    })
    .filter((x) => x !== null);

  return (
    <Room>
      <NavData room={room} />
      {start && (
        <p>
          Hmmm... might this be one of those text-adventure mazes you&apos;ve
          heard about?
        </p>
      )}
      {door && <p>You pass through the door, which closes behind you.</p>}
      <p>
        You find yourself in a square room, connected by passageways to other
        rooms.
      </p>
      {room.given !== undefined && (
        <p>A giant {room.given} is painted in black on the floor.</p>
      )}
      {room.character !== undefined && (
        <p>
          Someone is standing there, wearing a name tag that says &quot;
          {Characters[room.character]}&quot; and looking like they want to be
          helpful.
        </p>
      )}
      <List
        singularType="wall"
        pluralType="walls"
        items={walls.map((w) => (
          <>
            to the <Direction>{w}</Direction>
          </>
        ))}
      />
      <List
        singularType="passageway"
        pluralType="passageways"
        items={passages.map(
          (w) =>
            w && (
              <>
                to the{" "}
                <a href={`?room=${room[`${w}Id`]}`}>
                  <Direction>{w}</Direction>
                </a>
              </>
            ),
        )}
      />
      <List
        singularType="door"
        pluralType="doors"
        items={doors.map(
          (w) =>
            w && (
              <>
                to the{" "}
                <a href={`?room=${room[`${w}Id`]}&door`}>
                  <Direction>{w}</Direction>
                </a>
              </>
            ),
        )}
      />
      {room.character !== undefined && (
        <p>
          Or you might try to <a href={`?room=${room.talkId}`}>talk</a> to{" "}
          {Characters[room.character]}.
        </p>
      )}
      <InputContainer id="maze-of-lies-input-container" />
    </Room>
  );
};

const Talk = ({ room }: { room: Room }) => {
  if (room.character === undefined) return null;

  return (
    <Room>
      <NavData room={room} />
      <p>
        {Characters[room.character]} is very happy to talk to you. They say:
      </p>

      <CharacterStatement>
        {CharacterMessages[room.character]}
      </CharacterStatement>

      <p>
        You might want to <a href={`?room=${room.lookId}`}>look</a> around, or
        go somewhere.
      </p>

      <InputContainer id="maze-of-lies-input-container" />
    </Room>
  );
};

const getRoom = (
  id?: string,
):
  | { room: Room; action: "look" | "talk"; start: boolean }
  | { room: undefined } => {
  if (id === undefined) {
    return { room: startRoom, action: "look", start: true };
  }

  const look = lookIds.get(id);
  if (look) {
    return { room: look, action: "look", start: false };
  }

  const talk = talkIds.get(id);
  if (talk) {
    return { room: talk, action: "talk", start: false };
  }

  return { room: undefined };
};

const Puzzle = ({ query }: { query: ParsedQs }) => {
  const lookup = getRoom(query.room as string);
  if (!lookup.room) {
    return (
      <p>
        This is not a location in the maze. Maybe you should{" "}
        <a href="maze_of_lies">return to the start</a>?
      </p>
    );
  }

  const { room, action, start } = lookup;

  const door = query.door !== undefined;

  if (action === "talk") {
    return <Talk room={room} />;
  } else {
    return <Look room={room} start={start} door={door} />;
  }
};

export default Puzzle;
