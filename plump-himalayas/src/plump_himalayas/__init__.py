from dataclasses import dataclass
from dataclasses_json import dataclass_json
from enum import IntEnum
import os
from typing import List, Optional
from aiohttp import web
import aiohttp
import asyncio
import jinja2
import aiohttp_jinja2
import jwt
from jwt import PyJWKClient

import json
from collections import defaultdict

all_tasks = [
    ["Open the chest"],
    [
        "Water the potted plant in the corner",
        "Close the blinds over the window",
        "Straighten the pictures on the wall",
        "Put all trash in the trash receptacle",
    ],
    ["Pull the fire alarm"],
    [
        "Screw the skull into the lamp",
        "Stick a fork in the outlet",
        "Turn the security camera 180 degrees",
        "Hide the body under the rug",
    ]
]

task_index_map = {task: (i, j) for i, phase in enumerate(all_tasks) for j, task in enumerate(phase)}

verbs = ["OPEN", "CLOSE", "DO", "PUSH", "PULL", "PUT", "TWIST", "INSERT", "DISPOSE OF", "EXAMINE", "YEET", "QUAFF"]
nouns = sorted(["SEAT", "NaN", "THING", "STUFF", "ITEMS", "CHEST", "DESK", "LAMP", "OTHER", "PAPER", "PICTURE", "PLANT", "RUBBISH", "RUG", "SHADE", "SHELF", "THAT", "THIS"])
nouns2 = sorted(nouns + ["BODY", "CAMERA", "FORK", "LEG", "OUTLET", "SKULL"])


class Phase(IntEnum):
    NOT_STARTED = -1
    START = 0
    VANILLA = 1
    ALARM = 2
    WEIRD = 3
    FINAL = 4
    DONE = 5

@dataclass_json
@dataclass
class PHAction:
    verb: Optional[str]
    noun: Optional[str]

    @classmethod
    def from_json(cls, blob):
        return cls(blob.get('verb'), blob.get('noun'))
            
    def client_state(self):
        v = {}
        if self.verb:
            v['verb'] = self.verb
        if self.noun:
            v['noun'] = self.noun
        return v

@dataclass_json
@dataclass
class PHTask:
    text: str
    finished: bool

    @classmethod
    def from_json(cls, blob):
        return cls(blob['text'], blob['finished'])
            
    def client_state(self):
        return {'text': self.text, 'finished': self.finished }

@dataclass_json
@dataclass
class PHVote:
    choice: PHAction
    old: PHAction

    @classmethod
    def from_json(cls, blob):
        return cls(PHAction.from_json(blob['choice']), PHAction.from_json(blob['old']))

@dataclass_json
@dataclass
class PHClientMessage:
    started: bool
    tasks: Optional[List[PHTask]] = None
    verbs: Optional[List[str]] = None
    nouns: Optional[List[str]] = None
    action: Optional[PHAction] = None

class PHState:
    def __init__(self):
        self.phase = Phase.NOT_STARTED
        self.action = PHAction("OPEN", "CHEST")
        self.completed = [[False for _ in phase] for phase in all_tasks]
        self.votes = (defaultdict(lambda: 0),defaultdict(lambda: 0))
    
    @property
    def tasks(self):
        print(self.phase)
        return [PHTask(t,c) for i in range(min(len(all_tasks), self.phase.value + 1)) for t,c in zip(all_tasks[i],self.completed[i])]
        

    @property
    def is_complete(self):
        return self.phase > 3

    @property
    def verbs(self):
        if self.phase == Phase.START:
            return ["OPEN"]
        elif self.phase == Phase.ALARM:
            return ["PULL"]
        else:
            return verbs
        
    @property
    def nouns(self):
        if self.phase == Phase.START:
            return ["CHEST"]
        elif self.phase == Phase.VANILLA:
            return nouns
        elif self.phase == Phase.ALARM:
            return ["LEVER"]
        else:
            return nouns2
        
    def vote(self, vote: PHVote):
        if vote.choice.verb:
            self.votes[0][vote.choice.verb] += 1
            if vote.old.verb and vote.old.verb in self.votes[0]:
                self.votes[0][vote.old.verb] -= 1
        if vote.choice.noun:
            self.votes[1][vote.choice.noun] += 1
            if vote.old.noun and vote.old.noun in self.votes[1]:
                self.votes[1][vote.old.noun] -= 1
        print(self.votes)

    def update_action(self):
        v, n = self.action.verb, self.action.noun
        if len(self.votes[0]) > 0:
            print(self.votes[0].items())
            self.action.verb = max(self.votes[0].items(), key=lambda p: p[1])[0]
        if len(self.votes[1]) > 0:
            self.action.noun = max(self.votes[1].items(), key=lambda p: p[1])[0]
        print(v, self.action.verb, n, self.action.noun)
        return v != self.action.verb or n != self.action.noun

    def update_phase_on_task_completion(self):
        if self.phase != Phase.START:
            if all(self.completed[Phase.VANILLA]):
                if all(self.completed[Phase.ALARM]):
                    if all(self.completed[Phase.WEIRD]):
                        self.phase = Phase.DONE if all(self.completed[0]) else Phase.FINAL
                    else:
                        self.phase = Phase.WEIRD
                else:
                    self.phase = Phase.ALARM
            else:
                self.phase = Phase.VANILLA

    
    def complete_task(self, task: str):
        phase, i = task_index_map[task]
        self.completed[phase][i] = True
        self.update_phase_on_task_completion()

    def uncomplete_task(self, task: str):
        phase, i = task_index_map[task]
        self.completed[phase][i] = False
        self.update_phase_on_task_completion()

    def client_state(self):
        if self.phase < Phase.START:
            return PHClientMessage(started=False)
        return PHClientMessage(
            started=True,
            tasks=self.tasks,
            verbs=self.verbs,
            nouse=self.nouns,
            action=self.action,
        )

@dataclass
class StoredPuzzleState:
    game_id: str
    video: Optional[str] = None
    started: bool = False # these are the only things that actually needs to get updated. everything else should be set at time of scheduling
    complete: bool = False

class WebSocketManager:
    def __init__(self):
        self.sockets = set()
        self.lock = asyncio.Lock()
        
    async def add_socket(self, socket):
        async with self.lock:
            self.sockets.add(socket)
    
    async def remove_socket(self, socket):
        async with self.lock:    
            self.sockets.remove(socket)
        
    async def send_message(self, data):
        async with self.lock:
            for s in self.sockets:
                await s.send_json(data)
            
    async def close_all(self):
        async with self.lock:
            for s in self.sockets:
                await s.close()

class WebSocketListener:
    prefix = "_action_"

    def __init__(self, ws_manager, run_f):
        self.ws_manager = ws_manager
        self.run_f = run_f
        self.ws = None
        
    async def _prepare(self, request):
        await self.ws_manager.add_socket(self.ws)

    async def _close(self):
        await self.ws_manager.remove_socket(self.ws)

    async def prepare(self, request):
        self.ws = web.WebSocketResponse(heartbeat=30, max_msg_size=7340032)
        await self.ws.prepare(request)
        await self._prepare(request)

    async def close(self):
        if not self.ws.closed:
            await self.ws.close()
        await self._close()

    async def run(self):
        msg = await self.ws.receive()
        while not self.ws.closed:
            assert msg.type == aiohttp.WSMsgType.TEXT, msg
            data = json.loads(msg.data)
            await self.run_f(self.ws, data)
            msg = await self.ws.receive()            
        return self.ws

class GameManager:
    def __init__(self):
        self.game_state = PHState()
        self.player_ws = WebSocketManager() # display should just attach as player...
        self.room = None
        self.task = None
        self.polling_frequency = 1

    async def init_player_f(self, ws):
        await ws.send_json(
            self.game_state.client_state().to_dict()
        )

    async def update_all(self):
        print("updating")
        state = self.game_state.client_state().to_dict()
        print("new state", state)
        if self.room is not None:
            await self.room.send_game_state(state)
        await self.player_ws.send_message(state)
        print("done")

    async def listen_player_f(self, ws, data):
        print(data)
        match data['name']:
            case 'get_state':
                await ws.send_json(self.game_state.client_state().to_dict())
            case 'vote':
                self.game_state.vote(PHVote.from_json(data))
            case _:  # Default case
                raise RuntimeError(f"Unknown command {data['name']}.")
            
    async def listen_host_f(self, ws, data):
        print(data)
        match data['name']:
            case 'get_state':
                await ws.send_json({'name': 'state', **self.game_state.client_state().to_dict()})
            case 'task_complete':
                self.game_state.complete_task(data['task'])
                await self.update_all('tasks')
            case 'task_incomplete':
                self.game_state.uncomplete_task(data['task'])
                await self.update_all('tasks')
            case 'start_game':
                await self.start_game()
            case 'end_game':
                await self.end_game()
            case 'set_video':
                self.stored_state.video = data['video']
                await self.update_all('video')
            case _:  # Default case
                raise RuntimeError(f"Unknown command {data['name']}.")
            
    async def update_action(self):
        while True:
            print("polling")
            if self.game_state.update_action():
                print(self.game_state.action)
                await self.update_all()
            print("sleep")
            await asyncio.sleep(self.polling_frequency)
            print("slept")

    async def assign_room(self):
        if self.game_state.phase == Phase.NOT_STARTED:
            self.game_state.phase = Phase.VANILLA

    async def start_game(self):
        if self.game_state.phase == Phase.START:
            print("starting game")
            self.game_state.phase = Phase.VANILLA
            await self.update_all()
            loop = asyncio.get_event_loop()
            self.task = loop.create_task(self.update_action())
        return # TODO

    async def end_game(self):
        if self.task:
            self.task.cancel()
        # close out video stream
        await self.player_ws.close_all()

class RoomManager:
    def __init__(self, games):
        self.host_ws = WebSocketManager()
        self.games = games
        self.current_game_id = None

    async def listen_host_f(self, ws, data):
        print("host said", data)
        match data["name"]:
            case "assign_team_id":
                self.current_game_id = data["team_id"]
                self.game.assign_room()
            case _:
                if self.game:
                    await self.game.listen_host_f(self, ws, data)

    async def send_game_state(self, state):
        await self.host_ws.send_message({
            name: 'game_state',
            state: state,
        })

    async def update_games(self):
        # TODO: Determine games (or at least team names) from the API
        await self.host_ws.send_message({
            name: 'teams',
            teams: {v: v for v in self.games.keys()},
        })

    @property
    def game(self):
        if self.current_game_id is not None:
            return self.games.get(self.current_game_id)

    async def init_host_f(self, ws):
        if game := self.game:
            await ws.send_json({
                name: 'game_state',
                state: selfgame.game_state.client_state().to_dict(),
            })



# fix task checking
# make react subcomponents do the thing

def main():
    routes = web.RouteTableDef()

    jwks_client = PyJWKClient(os.environ.get("JWKS_URI", "http://localhost:3000/api/jwks"))

    @routes.get('/host/{room}')
    async def host(request):
        room = request.match_info.get('room')
        if room not in app["rooms"]:
            app["rooms"][room] = RoomManager(app["games"])
        response = aiohttp_jinja2.render_template("host.html", request, context={"room_id": room})
        return response

    @routes.get('/display/{id}')
    async def display(request):
        game_id = request.match_info.get('id', None)
        if game_id not in app["games"]:
            app["games"][game_id] = GameManager(StoredPuzzleState(game_id, "team", "room", "time"))
        response = aiohttp_jinja2.render_template("display.html", request, context={"game_id": game_id})
        return response

    async def get_game(team_id):
        if team_id not in app["games"]:
            app["games"][team_id] = GameManager()
            for room in app["rooms"].values:
                await room.update_games()
        return app["games"][team_id]

    @routes.get('/ws')
    async def ws_player(request):
        token = request.query["jwt"]
        token = jwt.decode(
            token,
            jwks_client.get_signing_key_from_jwt(token),
        )
        team_id = token["team_id"]
        game = await get_game(team_id)
        listener = WebSocketListener(game.player_ws, game.listen_player_f)
        await listener.prepare(request)
        await game.init_player_f(listener.ws)
        try:
            return await listener.run()
        finally:
            await listener.close()

    @routes.get('/host/ws/{room}')
    async def ws_host(request):
        room_id = request.match_info.get('room')
        room = request.app["rooms"][room_id]
        listener = WebSocketListener(room.host_ws, room.listen_host_f)
        await listener.prepare(request)
        await room.init_host_f(listener.ws)
        try:
            return await listener.run()
        finally:
            await listener.close()

    app = web.Application()
    aiohttp_jinja2.setup(
        app, loader=jinja2.FileSystemLoader(os.path.join(os.getcwd(), "templates"))
    )
    app["games"] = {}
    app["rooms"] = {}
    app.add_routes(routes)
    app.add_routes([web.static('/assets', 'assets')])
    web.run_app(app, port=8086)

if __name__ == "__main__":
  main()
