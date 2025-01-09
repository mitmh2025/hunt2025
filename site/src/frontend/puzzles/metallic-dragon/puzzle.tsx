import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import phone from "./assets/phone.png";

interface Direction {
  input_string: string;
}

const dir1: Direction = {
  input_string: "66784",
};
const dir2: Direction = {
  input_string: "3278",
};
const dir3: Direction = {
  input_string: "76884",
};
const dir4: Direction = {
  input_string: "9378",
};

interface Connection {
  direction: Direction;
  name: string;
}

interface MoveResult {
  nextRoomName: string;
  moveIsValid: boolean;
}

class Room {
  name = "";
  description = "";
  connections: Connection[] = [];

  attemptMove(movement: string): MoveResult {
    let result = false;
    let nextRoom: string = this.name;
    for (const conn of this.connections) {
      if (conn.direction.input_string == movement) {
        result = true;
        nextRoom = conn.name;
      }
    }
    return { nextRoomName: nextRoom, moveIsValid: result };
  }

  constructValidDirections(): string {
    let result = "\nValid options: ";
    let count = 0;
    for (const conn of this.connections) {
      count += 1;
      result += conn.direction.input_string;
      if ((count == 1) && (this.connections.length == 2)) {
        result += " or ";
      } else if (count < this.connections.length - 1) {
        result += ", ";
      } else if (count == this.connections.length - 1) {
        result += ", or ";
      }
    }
    return result;
  }
}

const rooms: Record<string, Room> = {
  "wfnq": Object.assign(new Room(), {
    name: "wfnq",
    description:
      "When you fly in the Presidential airplane, you wake up REST in the morning.",
    connections: [
      {
        direction: dir2,
        name: "fasi",
      },
      {
        direction: dir3,
        name: "awfn",
      },
    ],
  }),
  "fasi": Object.assign(new Room(), {
    name: "fasi",
    description:
      "Almost every atom of helium has an equal number of protons COD neutrons.",
    connections: [
      {
        direction: dir2,
        name: "aweu",
      },
      {
        direction: dir3,
        name: "mvpa",
      },
      {
        direction: dir4,
        name: "wfnq",
      },
    ],
  }),
  "aweu": Object.assign(new Room(), {
    name: "aweu",
    description:
      "A Tesla sedan model can be tricked out with a light-up COGNATED console.",
    connections: [
      {
        direction: dir3,
        name: "vbao",
      },
      {
        direction: dir4,
        name: "fasi",
      },
    ],
  }),
  "awfn": Object.assign(new Room(), {
    name: "awfn",
    description:
      "The large asteroid Vesta is not considered terrestrial planet number DITE.",
    connections: [
      {
        direction: dir1,
        name: "wfnq",
      },
      {
        direction: dir2,
        name: "mvpa",
      },
      {
        direction: dir3,
        name: "gfad",
      },
    ],
  }),
  "mvpa": Object.assign(new Room(), {
    name: "mvpa",
    description:
      "The morale at the Jackson residence stayed high, never going down the UVAE.",
    connections: [
      {
        direction: dir1,
        name: "fasi",
      },
      {
        direction: dir2,
        name: "vbao",
      },
      {
        direction: dir3,
        name: "euga",
      },
      {
        direction: dir4,
        name: "awfn",
      },
    ],
  }),
  "vbao": Object.assign(new Room(), {
    name: "vbao",
    description:
      "It's SCRUB every night for dinner at the Navy special ops team barracks.",
    connections: [
      {
        direction: dir1,
        name: "aweu",
      },
      {
        direction: dir3,
        name: "vasd",
      },
      {
        direction: dir4,
        name: "mvpa",
      },
    ],
  }),
  "gfad": Object.assign(new Room(), {
    name: "gfad",
    description:
      "On this rugby pitch, there are three forwards and DOTS backs.",
    connections: [
      {
        direction: dir1,
        name: "awfn",
      },
      {
        direction: dir2,
        name: "euga",
      },
      {
        direction: dir3,
        name: "rbap",
      },
    ],
  }),
  "euga": Object.assign(new Room(), {
    name: "euga",
    description:
      "You don't need a belay device when hiking the North or South SHOP of the Grand Canyon.",
    connections: [
      {
        direction: dir1,
        name: "mvpa",
      },
      {
        direction: dir2,
        name: "vasd",
      },
      {
        direction: dir3,
        name: "cask",
      },
      {
        direction: dir4,
        name: "gfad",
      },
    ],
  }),
  "vasd": Object.assign(new Room(), {
    name: "vasd",
    description:
      "Clouds consist ME a suspension of particles in the atmosphere.",
    connections: [
      {
        direction: dir1,
        name: "vbao",
      },
      {
        direction: dir3,
        name: "rmad",
      },
      {
        direction: dir4,
        name: "euga",
      },
    ],
  }),
  "rbap": Object.assign(new Room(), {
    name: "rbap",
    description:
      "If you stand on the surface of the sun, your DACE will definitely get burned.",
    connections: [
      {
        direction: dir1,
        name: "gfad",
      },
      {
        direction: dir2,
        name: "cask",
      },
    ],
  }),
  "cask": Object.assign(new Room(), {
    name: "cask",
    description:
      "The darkness of a black GOLF is more empty than the vast emptiness of space.",
    connections: [
      {
        direction: dir1,
        name: "euga",
      },
      {
        direction: dir2,
        name: "rmad",
      },
      {
        direction: dir4,
        name: "rbap",
      },
    ],
  }),
  "rmad": Object.assign(new Room(), {
    name: "rmad",
    description:
      "A medieval animal pound can hold more than DOUR sheep, sometimes up to 20.",
    connections: [
      {
        direction: dir1,
        name: "vasd",
      },
      {
        direction: dir4,
        name: "cask",
      },
    ],
  }),
};

const startRoom = "wfnq";

const Display = styled.div`
	background-image: url("${phone}");
	background-repeat: no-repeat;
	background-size: contain;
  background-position: center;
	width: 450px;
	height: 500px;
`;

const MessageText = styled.div`
  position: relative;
  top: 261px;
  left: 83px;
  width: 287px;
  height: 168px;
  background-color: #e2edec;
  line-height: 1.3;
`;

const InputArea = styled.div`
  width: 350px;
  margin-left: 8px;
  height: 70px;
  float: left;
  font-size: x-large;
  font-family: monospace;
  background-color: #e2edec;
`;

const Puzzle = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [currentRoom, setCurrentRoom] = useState<Room>(rooms[startRoom]);
  const [waitingForFirstMessage, setWaitingForFirstMessage] = useState<boolean>(true);

  function constructNextMessage() {
    let nextMessageTest = "";
    let nextRoom: Room = currentRoom;
    if (waitingForFirstMessage) {
      nextMessageTest = currentRoom.description;
      setWaitingForFirstMessage(false);

      nextMessageTest += nextRoom.constructValidDirections();
    } else if ((inputText == "5477") || (inputText == "7375994845477")) {
      nextMessageTest = "Not here!";
    } else {
      const moveResult: MoveResult = currentRoom.attemptMove(inputText);
      nextRoom = rooms[moveResult.nextRoomName];
      if (moveResult.moveIsValid) {
        nextMessageTest = nextRoom.description;
      } else {
        nextMessageTest = "I don't understand that request.";
      }

      nextMessageTest += nextRoom.constructValidDirections();
    }
    setCurrentRoom(nextRoom);
    setMessageText(nextMessageTest);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("foo");
    constructNextMessage();
    setInputText("");
  }

  return (
    <>
    <Display>
      <MessageText>
      {messageText}
      </MessageText>
    </Display>
      <form onSubmit={handleSubmit}>
      <InputArea>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value.replace(/\s+/g, ''))}
        />
        <button type="submit">
        Enter
        </button>
      </InputArea>
    </form>
    </>
  );
}

export default Puzzle;
