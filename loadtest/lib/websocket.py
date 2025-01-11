from ws4py.client.geventclient import WebSocketClient
import gevent
import time
import string
import random
from locust import env
import json


class WSClient:
    ws_host: str
    incoming_greenlet: gevent.Greenlet | None
    ws: WebSocketClient | None
    cookie: str
    environment: env.Environment

    def __init__(self, http_host: str, cookie: str, env: env.Environment):
        self.ws_host = http_host.replace("http://", "ws://").replace(
            "https://", "wss://"
        )
        self.incoming_greenlet = None
        self.ws = None
        self.cookie = cookie
        self.environment = env

    def start(self, datasets: list[str]):
        start_perf_counter = time.perf_counter()

        ws = WebSocketClient(self.ws_host + "/ws", headers=[("Cookie", self.cookie)])
        ws.connect()

        for i, dataset in enumerate(datasets):
            ws.send(
                json.dumps(
                    {
                        "rpc": i + 1,
                        "method": "sub",
                        "subId": self.randomSubId(),
                        "dataset": dataset,
                    }
                )
            )

        ws.send(
            '{"rpc":1,"method":"sub","subId":"'
            + self.randomSubId()
            + '","dataset":"team_info"}'
        )
        ws.send(
            '{"rpc":2,"method":"sub","subId":"'
            + self.randomSubId()
            + '","dataset":"navbar"}'
        )
        ws.send(
            '{"rpc":3,"method":"sub","subId":"'
            + self.randomSubId()
            + '","dataset":"activity_log"}'
        )
        ws.send(
            '{"rpc":4,"method":"sub","subId":"'
            + self.randomSubId()
            + '","dataset":"hub"}'
        )

        # wait for a first message
        first_msg = ws.receive()

        self.environment.events.request.fire(
            request_type="ws",
            name="/ws",
            response_time=(time.perf_counter() - start_perf_counter) * 1000,
            response_length=len(str(first_msg)),
            response=None,
            context=None,
            exception=None,
        )

        def incoming():
            while True:
                m = ws.receive()
                if m is not None:
                    pass
                else:
                    break

        self.incoming_greenlet = gevent.spawn(incoming)

        self.ws = ws

    def stop(self):
        if not self.ws:
            return

        self.ws.close()

        if self.incoming_greenlet:
            self.incoming_greenlet.join()

    def randomSubId(self):
        return "".join(random.choices(string.ascii_letters, k=16))
