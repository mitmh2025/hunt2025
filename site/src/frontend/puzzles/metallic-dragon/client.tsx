import bcrypt from "bcryptjs";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "styled-components";
import phone from "./assets/phone.png";

type Direction = {
  input_string: string;
};

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

type Connection = {
  direction: Direction;
  name: string;
};

type MoveResult = {
  nextRoomName: string;
  moveIsValid: boolean;
};

class Room {
  name = "";
  description = "";
  connections: Connection[] = [];

  attemptMove(movement: string): MoveResult {
    let result = false;
    let nextRoom: string = this.name;
    for (const conn of this.connections) {
      if (conn.direction.input_string === movement) {
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
      if (count === 1 && this.connections.length === 2) {
        result += " or ";
      } else if (count < this.connections.length - 1) {
        result += ", ";
      } else if (count === this.connections.length - 1) {
        result += ", or ";
      }
    }
    return result;
  }
}

const rooms: Record<string, Room> = {
  wfnq: Object.assign(new Room(), {
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
  fasi: Object.assign(new Room(), {
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
  aweu: Object.assign(new Room(), {
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
  awfn: Object.assign(new Room(), {
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
  mvpa: Object.assign(new Room(), {
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
  vbao: Object.assign(new Room(), {
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
  gfad: Object.assign(new Room(), {
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
  euga: Object.assign(new Room(), {
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
  vasd: Object.assign(new Room(), {
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
  rbap: Object.assign(new Room(), {
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
  cask: Object.assign(new Room(), {
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
  rmad: Object.assign(new Room(), {
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

const PhoneUI = styled.div``;

const Display = styled.div`
  background-image: url("${phone}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 460px;
  width: 300px;
  display: flex;
  justify-content: center;
`;

const MessageText = styled.div`
  position: relative;
  top: 43%;
  width: 65%;
  height: 28%;
  background-color: #e2edec;
  line-height: 1.3;
  border-radius: 5px;
`;

const InputArea = styled.div`
  font-size: x-large;
  display: flex;
  justify-content: center;
  width: 300px;
`;

const defaultDontUnderstandMessage = "I don't understand that request.";

const App = () => {
  const [inputText, setInputText] = useState<string>("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value.replace(/\s+/g, ""));
  }

  const [messageText, setMessageText] = useState<string>("");
  const [currentRoom, setCurrentRoom] = useState<Room | undefined>(
    rooms[startRoom],
  );
  const [waitingForFirstMessage, setWaitingForFirstMessage] =
    useState<boolean>(true);

  function constructNextMessage() {
    let nextMessageTest = "";
    let nextRoom: Room | undefined = currentRoom;
    if (waitingForFirstMessage) {
      nextMessageTest = currentRoom?.description ?? "";
      setWaitingForFirstMessage(false);

      nextMessageTest += nextRoom?.constructValidDirections() ?? "";
    } else if (
      bcrypt.compareSync(
        inputText,
        "$2b$12$hKbAzFAfzDck6.fJ/X.5y.feaeWF0xQ53ZyU.Q4V/IdE7J8G4Nbem",
      ) ||
      bcrypt.compareSync(
        inputText,
        "$2b$12$GNDwsGaXMatgvHmjlU6DpuRJ3ZgFvR6wGQ.5NtUdqbW6vz3n1Do2e",
      )
    ) {
      nextMessageTest = "Not here!";
    } else {
      const moveResult: MoveResult = currentRoom?.attemptMove(inputText) ?? {
        nextRoomName: "",
        moveIsValid: false,
      };
      nextRoom = rooms[moveResult.nextRoomName];
      if (moveResult.moveIsValid) {
        nextMessageTest = nextRoom?.description ?? "";
      } else {
        nextMessageTest = defaultDontUnderstandMessage;
      }

      nextMessageTest += nextRoom?.constructValidDirections() ?? "";
    }
    setCurrentRoom(nextRoom);
    setMessageText(nextMessageTest);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    constructNextMessage();
    setInputText("");
  }

  return (
    <>
      <PhoneUI>
        <Display>
          <MessageText>{messageText}</MessageText>
        </Display>
        <InputArea>
          <form onSubmit={handleSubmit} style={{ display: "inherit" }}>
            <input
              type="text"
              value={inputText}
              onChange={onChange}
              style={{ width: "230px" }}
            />
            <button type="submit" style={{ width: "50px", height: "50px" }}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              </svg>
            </button>
          </form>
        </InputArea>
      </PhoneUI>
    </>
  );
};

const elem = document.getElementById("wordyore-root");
if (elem) {
  const root = createRoot(elem);
  root.render(<App />);
} else {
  console.error(
    "Could not mount App because #wordyore-root was nowhere to be found",
  );
}
