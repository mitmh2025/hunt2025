import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, createGlobalStyle, styled } from "styled-components";
import { Router } from "websocket-express";
import { CourierFont } from "../../assets/SharedFonts";
import { BaseLayout } from "../../components/Layout";
import { lookupScripts } from "../../server/assets";
import rootUrl from "../../utils/rootUrl";
import {
  CharacterMessages,
  Characters,
  rooms,
  startRoom,
  type Room,
} from "./data";

const mazeRoot = `${rootUrl}/puzzles/maze_of_lies/rooms/`;

const lookIds = new Map<string, Room>();
rooms.forEach((row) => {
  row.forEach((room) => {
    lookIds.set(room.lookId, room);
    lookIds.set(room.doorLookId, room);
  });
});
const talkIds = new Map<string, Room>();
rooms.forEach((row) => {
  row.forEach((room) => room.talkId && talkIds.set(room.talkId, room));
});

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    margin: 0;
  }
`;

const Room = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 8px);
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

const NavData = ({ id, room }: { id: string; room: Room }) => {
  return (
    <script
      type="application/json"
      id="maze-of-lies-navdata"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          currentId: id,
          lookId: room.lookId,
          talkId: room.talkId,
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
  door: boolean;
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
      <NavData id={room[door ? "doorLookId" : "lookId"]} room={room} />
      {start && (
        <p>
          Hmmm... might this be one of those text-adventure mazes you’ve heard
          about?
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
          Someone is standing there, wearing a name tag that says “
          {Characters[room.character]}” and looking like they want to be
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
                <a href={`${mazeRoot}${room[`${w}Id`]}`}>
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
                <a href={`${mazeRoot}${room[`${w}Id`]}`}>
                  <Direction>{w}</Direction>
                </a>
              </>
            ),
        )}
      />
      {room.character !== undefined && (
        <p>
          Or you might try to <a href={`${mazeRoot}${room.talkId}`}>talk</a> to{" "}
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
      <NavData id={room.talkId ?? ""} room={room} />
      <p>
        {Characters[room.character]} is very happy to talk to you. They say:
      </p>

      <CharacterStatement>
        {CharacterMessages[room.character]}
      </CharacterStatement>

      <p>
        You might want to <a href={`${mazeRoot}${room.lookId}`}>look</a> around,
        or go somewhere.
      </p>

      <InputContainer id="maze-of-lies-input-container" />
    </Room>
  );
};

const getRoom = (
  id?: string,
):
  | { room: Room; action: "look" | "talk"; start: boolean; door: boolean }
  | { room: undefined } => {
  if (id === undefined) {
    return { room: startRoom, action: "look", start: true, door: false };
  }

  const look = lookIds.get(id);
  if (look) {
    return {
      room: look,
      action: "look",
      start: false,
      door: look.doorLookId === id,
    };
  }

  const talk = talkIds.get(id);
  if (talk) {
    return { room: talk, action: "talk", start: false, door: false };
  }

  return { room: undefined };
};

const RoomComponent = ({ id }: { id: string }) => {
  const lookup = getRoom(id);
  if (!lookup.room) {
    return (
      <p>
        This is not a location in the maze. Maybe you should{" "}
        <a href={mazeRoot}>return to the start</a>?
      </p>
    );
  }

  const { room, action, start, door } = lookup;

  let roomComponent;
  if (action === "talk") {
    roomComponent = <Talk room={room} />;
  } else {
    roomComponent = <Look room={room} start={start} door={door} />;
  }

  return (
    <>
      <GlobalStyle />
      <CourierFont />
      {roomComponent}
    </>
  );
};

const router = new Router();
router.get("/rooms/", (_, res) => {
  res.redirect(`${mazeRoot}${startRoom?.lookId}`);
});
router.get("/rooms/:id", (req, res) => {
  const reactRoot = <RoomComponent id={req.params.id} />;

  const sheet = new ServerStyleSheet();
  let styleElements;
  let innerHTML;
  try {
    innerHTML = renderToString(sheet.collectStyles(reactRoot));
    styleElements = sheet.getStyleElement();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        "<html><body><h1>500 Service Temporarily Unavailable</h1></body></html>",
      );
    return;
  } finally {
    sheet.seal();
  }

  const scripts = lookupScripts("puzzle_unfit_tower");
  const doctype = "<!DOCTYPE html>";
  const html =
    doctype +
    renderToString(
      <BaseLayout
        title={"Maze of Lies"}
        scripts={scripts}
        styleElements={[...styleElements]}
        innerHTML={innerHTML}
      />,
    ) +
    "\n";

  res.set({
    "Content-Type": "text/html; charset=utf-8",
  });
  res.status(200);
  res.send(html);
});
export default router;
