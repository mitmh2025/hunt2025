from locust import task, run_single_user, events
from locust import FastHttpUser
import random
from lib.websocket import WSClient
from lib.admin_token import mint_admin_token

SOCKETS_PER_USER = 5

@events.init_command_line_parser.add_listener
def _(parser):
    parser.add_argument("--api-base-url", type=str, env_var="API_BASE_URL", default="http://localhost:3000/api", help="API base URL")


class late_load_test(FastHttpUser):
    host = "http://localhost:3000"
    default_headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
    }

    def api_rest(self, method, endpoint, *args, **kwargs):
        return self.rest(method, f"{self.environment.parsed_options.api_base_url}{endpoint}", *args, **kwargs)

    @task(10)
    def team_task(self):
        username = f"loadtest{random.randint(1, 100)}"

        puzzles = {
            "engagements_and_other_crimes": False,
            "garden_anecdotes": False,
            "what_do_they_call_you": False,
            "give_this_grid_a_shake": False,
            "good_fences_make_good_otherwise_incompatible_neighbors": False,
            "cross_dash_word": False,
            "a_map_and_a_shade_or_four": False,
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
            ws.start(["team_info", "navbar", "activity_log", "murder_in_mitropolis"])

        with self.client.request(
            "GET", "/rounds/murder_in_mitropolis", catch_response=True
        ) as resp:
            for slug, _ in puzzles.items():
                if resp.text and f'href="/puzzles/{slug}"' in resp.text:
                    puzzles[slug] = True

        if not puzzles["engagements_and_other_crimes"]:
            with self.client.request(
                "POST",
                "/puzzles/engagements_and_other_crimes/unlock",
                catch_response=True,
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/engagements_and_other_crimes", catch_response=True
        ) as resp:
            pass

        if not puzzles["garden_anecdotes"]:
            with self.client.request(
                "POST", "/puzzles/garden_anecdotes/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/garden_anecdotes", catch_response=True
        ) as resp:
            pass

        with self.client.request(
            "GET", "/puzzles/what_do_they_call_you", catch_response=True
        ) as resp:
            pass

        for i in range(5):
            with self.rest(
                "POST", "/puzzles/what_do_they_call_you/speak", headers={}, json={}
            ) as resp:
                pass

        with self.client.request(
            "GET", "/rounds/murder_in_mitropolis", catch_response=True
        ) as resp:
            pass

        if not puzzles["give_this_grid_a_shake"]:
            with self.client.request(
                "POST", "/puzzles/give_this_grid_a_shake/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/give_this_grid_a_shake", catch_response=True
        ) as resp:
            pass

        solved = False
        with self.client.request(
            "GET", "/puzzles/give_this_grid_a_shake", catch_response=True
        ) as resp:
            if resp.text and "Correct!" in resp.text:
                solved = True

        if not solved:
            with self.api_rest(
                "PUT",
                "/puzzle/give_this_grid_a_shake/guess",
                headers={},
                json={"guess": "ABC"},
            ) as resp:
                pass
            with self.api_rest(
                "PUT",
                "/puzzle/give_this_grid_a_shake/guess",
                headers={},
                json={"guess": "THE BLACK MARKET"},
            ) as resp:
                pass

        with self.client.request(
            "GET", "/rounds/murder_in_mitropolis", catch_response=True
        ) as resp:
            pass

        if not puzzles["good_fences_make_good_otherwise_incompatible_neighbors"]:
            with self.client.request(
                "POST",
                "/puzzles/good_fences_make_good_otherwise_incompatible_neighbors/unlock",
                catch_response=True,
            ) as resp:
                pass
        with self.client.request(
            "GET",
            "/puzzles/good_fences_make_good_otherwise_incompatible_neighbors",
            catch_response=True,
        ) as resp:
            pass

        if not puzzles["cross_dash_word"]:
            with self.client.request(
                "POST", "/puzzles/cross_dash_word/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/cross_dash_word", catch_response=True
        ) as resp:
            pass

        solved = False
        with self.client.request(
            "GET", "/puzzles/cross_dash_word", catch_response=True
        ) as resp:
            if resp.text and "Correct!" in resp.text:
                solved = True

        if not solved:
            with self.api_rest(
                "PUT",
                "/puzzle/cross_dash_word/guess",
                headers={},
                json={"guess": "ABC"},
            ) as resp:
                pass
            with self.api_rest(
                "PUT",
                "/puzzle/cross_dash_word/guess",
                headers={},
                json={"guess": "DEAD BIRD"},
            ) as resp:
                pass

        with self.client.request("GET", "/activity_log", catch_response=True) as resp:
            pass
        with self.client.request("GET", "/all_puzzles", catch_response=True) as resp:
            pass
        with self.client.request("GET", "/activity_log", catch_response=True) as resp:
            pass
        with self.client.request("GET", "/all_puzzles", catch_response=True) as resp:
            pass

        if not puzzles["a_map_and_a_shade_or_four"]:
            with self.client.request(
                "POST", "/puzzles/a_map_and_a_shade_or_four/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/a_map_and_a_shade_or_four", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/puzzles/garden_anecdotes", catch_response=True
        ) as resp:
            pass

        for ws in websockets:
            ws.stop()

    @task(1)
    def admin_task(self):
        headers = {
            "Authorization": f"Bearer {mint_admin_token()}",
        }

        # Request full activity logs
        with self.client.api_rest(
            "GET", "/frontend/log/team", catch_response=True, headers=headers
        ) as resp:
            pass
        with self.client.api_rest(
            "GET", "/frontend/log/activity", catch_response=True, headers=headers
        ) as resp:
            pass
        with self.client.api_rest(
            "GET", "/admin/puzzles", catch_response=True, headers=headers
        ) as resp:
            pass
        with self.client.api_rest(
            "GET", "/admin/account", catch_response=True, headers=headers
        ) as resp:
            pass

        # Global key grant, puzzle unlock, and gate satisfy
        with self.api_rest(
            "POST",
            "/admin/grantKeys",
            json={"teamIds": "all", "amount": 3},
            headers=headers,
        ) as resp:
            pass
        with self.api_rest(
            "POST",
            "/admin/puzzles/weirdo_threaded_doodads/unlock",
            json={"teamIds": "all"},
            headers=headers,
        ) as resp:
            pass
        with self.api_rest(
            "POST",
            "/admin/gates/tmg03/satisfy",
            json={"teamIds": "all"},
            headers=headers,
        ) as resp:
            pass


if __name__ == "__main__":

    run_single_user(late_load_test)
