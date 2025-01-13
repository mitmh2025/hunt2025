from locust import task, run_single_user, events
from locust import FastHttpUser
import random
from lib.websocket import WSClient


SOCKETS_PER_USER = 5

@events.init_command_line_parser.add_listener
def _(parser):
    parser.add_argument("--api-base-url", type=str, env_var="API_BASE_URL", default="http://localhost:3000/api", help="API base URL")


class early_load_test(FastHttpUser):
    host = "http://localhost:3000"
    default_headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
    }

    def api_rest(self, method, endpoint, *args, **kwargs):
        return self.rest(method, f"{self.environment.parsed_options.api_base_url}{endpoint}", *args, **kwargs)

    @task
    def t(self):
        username = f"loadtestearly{random.randint(1, 100)}"

        puzzles = {
            "an_argument": False,
            "shrinkage": False,
            "📑🍝": False,
            "unreal_islands": False,
            "missing_connections": False,
            "downright_backwards": False,
            "zulu_lima": False,
            "educational_rite_of_passage": False,
            "chatgpt": False,
        }

        with self.client.request(
            "POST",
            "/login?next=%2F",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data=f"username={username}&password=password",
            catch_response=True,
        ) as resp:
            pass

        cookie_name = "mitmh2025_auth"
        cookie_value = ""
        for cookie in self.client.cookiejar:
            if cookie.name == cookie_name:
                cookie_value = cookie.value
                break

        websockets = [
            WSClient(self.host or "", f"{cookie_name}={cookie_value}", self.environment)
            for _ in range(SOCKETS_PER_USER)
        ]

        for ws in websockets:
            ws.start(["team_info", "navbar", "activity_log", "hub"])

        with self.client.request("GET", "/", catch_response=True) as resp:
            pass
        with self.client.request(
            "GET", "/rounds/the_missing_diamond", catch_response=True
        ) as resp:
            for slug, _ in puzzles.items():
                if resp.text and f'href="/puzzles/{slug}"' in resp.text:
                    puzzles[slug] = True

        if not puzzles["an_argument"]:
            with self.client.request(
                "POST", "/puzzles/an_argument/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/an_argument", catch_response=True
        ) as resp:
            pass

        solved = False
        with self.client.request(
            "GET", "/puzzles/an_argument", catch_response=True
        ) as resp:
            if resp.text and "Correct!" in resp.text:
                solved = True

        if not solved:
            with self.api_rest(
                "PUT",
                "/puzzle/an_argument/guess",
                headers={},
                json={"guess": "abc"},
            ) as resp:
                pass
            with self.api_rest(
                "PUT",
                "/puzzle/an_argument/guess",
                headers={},
                json={"guess": "RIGHT TO BEAR ARMS"},
            ) as resp:
                pass

        with self.client.request("GET", "/", catch_response=True) as resp:
            pass

        with self.client.request(
            "GET", "/rounds/the_missing_diamond", catch_response=True
        ) as resp:
            pass

        if not puzzles["shrinkage"]:
            with self.client.request(
                "POST", "/puzzles/shrinkage/unlock", catch_response=True
            ) as resp:
                pass

        with self.client.request(
            "GET", "/puzzles/shrinkage", catch_response=True
        ) as resp:
            pass

        if not puzzles["📑🍝"]:
            with self.client.request(
                "POST", "/puzzles/%F0%9F%93%91%F0%9F%8D%9D/unlock", catch_response=True
            ) as resp:
                pass

        with self.client.request(
            "GET", "/puzzles/%F0%9F%93%91%F0%9F%8D%9D", catch_response=True
        ) as resp:
            pass

        if not puzzles["unreal_islands"]:
            with self.client.request(
                "POST", "/puzzles/unreal_islands/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/unreal_islands", catch_response=True
        ) as resp:
            pass

        if not puzzles["missing_connections"]:
            with self.client.request(
                "POST", "/puzzles/missing_connections/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/missing_connections", catch_response=True
        ) as resp:
            pass
        with self.client.request("GET", "/all_puzzles", catch_response=True) as resp:
            pass

        if not puzzles["downright_backwards"]:
            with self.client.request(
                "POST", "/puzzles/downright_backwards/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/downright_backwards", catch_response=True
        ) as resp:
            pass

        if not puzzles["zulu_lima"]:
            with self.client.request(
                "POST", "/puzzles/zulu_lima/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/zulu_lima", catch_response=True
        ) as resp:
            pass

        solved = False
        with self.client.request(
            "GET", "/puzzles/zulu_lima", catch_response=True
        ) as resp:
            if resp.text and "Correct!" in resp.text:
                solved = True

        if not solved:
            with self.api_rest(
                "PUT", "/puzzle/zulu_lima/guess", headers={}, json={"guess": "xyz"}
            ) as resp:
                pass
            with self.api_rest(
                "PUT",
                "/puzzle/zulu_lima/guess",
                headers={},
                json={"guess": "SPACE WARSHIPS"},
            ) as resp:
                pass

        with self.client.request("GET", "/activity_log", catch_response=True) as resp:
            pass
        with self.client.request("GET", "/", catch_response=True) as resp:
            pass
        with self.client.request(
            "GET", "/rounds/the_missing_diamond", catch_response=True
        ) as resp:
            pass
        with self.client.request("GET", "/rounds/events", catch_response=True) as resp:
            pass
        with self.client.request(
            "GET", "/rounds/stray_leads", catch_response=True
        ) as resp:
            pass
        with self.client.request("GET", "/", catch_response=True) as resp:
            pass
        with self.client.request(
            "GET", "/rounds/the_missing_diamond", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/puzzles/%F0%9F%93%91%F0%9F%8D%9D", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/rounds/the_missing_diamond", catch_response=True
        ) as resp:
            pass

        if not puzzles["educational_rite_of_passage"]:
            with self.client.request(
                "POST",
                "/puzzles/educational_rite_of_passage/unlock",
                catch_response=True,
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/educational_rite_of_passage", catch_response=True
        ) as resp:
            pass

        if not puzzles["chatgpt"]:
            with self.client.request(
                "POST", "/puzzles/chatgpt/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/chatgpt", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/puzzles/chatgpt", catch_response=True
        ) as resp:
            pass

        with self.rest(
            "POST", "/puzzles/chatgpt/chat", headers={}, json={"message": "abc"}
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/puzzles/chatgpt/chat",
            headers={},
            json={
                "message": "def",
                "state": "775d7c1bdfed6b30d44170a2691c38519a942d4cec8b0d8dcccdf40536c8c5e4c2d89fbac930e59dbcf5007341d35e9f7fef8a9d2a",
            },
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/puzzles/chatgpt/chat",
            headers={},
            json={
                "message": "asdfasdf",
                "state": "99b786e94ae0e5aabb876ca34bb54a43e353971fcf1d77d75aecffe580db19d243394dffd1abc70f8544e6f8db5996a4797e421a2d",
            },
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/puzzles/chatgpt/chat",
            headers={},
            json={
                "message": "afsasdf",
                "state": "185d1d84ada61b10ebf16854f545cfa13bbb77666e395590a5c923b493c10c2b52774156300dc7bcf2584f9c3800d682b82ae00489",
            },
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/puzzles/chatgpt/chat",
            headers={},
            json={
                "message": "afasdf",
                "state": "aa3ea6370455bfb7ff5802ea2227a181f1f37b22e554d4cbf53a1e39cc680c682917b769f0433444834e1e482588df04bdde97859a",
            },
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/puzzles/chatgpt/chat",
            headers={},
            json={
                "message": "afa",
                "state": "8ee2f30932b5815cf3582334efc3e0c84beed4525588b523d609e42012e7ccae28f3cc20764bd5616d9a648a26e4bc58ca9c1025a1",
            },
        ) as resp:
            pass
        with self.client.request("GET", "/", catch_response=True) as resp:
            pass

        for ws in websockets:
            ws.stop()


if __name__ == "__main__":
    run_single_user(early_load_test, include_context=True, loglevel="INFO")
