from locust import task, run_single_user
from locust import FastHttpUser
import random
from lib.websocket import WSClient
from lib.admin_token import mint_admin_token

SOCKETS_PER_USER = 5


class late_load_test(FastHttpUser):
    host = "http://localhost:3000"
    default_headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
    }

    @task(10)
    def team_task(self):
        username = f"loadtest{random.randint(1, 100)}"

        puzzles = {
            "engagements_and_other_crimes": False,
            "garden_anecdotes": False,
            "what_do_they_call_you": False,
            "cacciando_trio_misterioso": False,
            "good_fences_make_good_otherwise_incompatible_neighbors": False,
            "find_other_ways_of_seeing": False,
            "do_the_packing": False,
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

        if not puzzles["cacciando_trio_misterioso"]:
            with self.client.request(
                "POST", "/puzzles/cacciando_trio_misterioso/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/cacciando_trio_misterioso", catch_response=True
        ) as resp:
            pass

        solved = False
        with self.client.request(
            "GET", "/puzzles/cacciando_trio_misterioso", catch_response=True
        ) as resp:
            if resp.text and "Correct!" in resp.text:
                solved = True

        if not solved:
            with self.rest(
                "PUT",
                "/api/puzzle/cacciando_trio_misterioso/guess",
                headers={},
                json={"guess": "ABC"},
            ) as resp:
                pass
            with self.rest(
                "PUT",
                "/api/puzzle/cacciando_trio_misterioso/guess",
                headers={},
                json={"guess": "WALTZES AND MARCHES"},
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

        if not puzzles["find_other_ways_of_seeing"]:
            with self.client.request(
                "POST", "/puzzles/find_other_ways_of_seeing/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/find_other_ways_of_seeing", catch_response=True
        ) as resp:
            pass

        solved = False
        with self.client.request(
            "GET", "/puzzles/find_other_ways_of_seeing", catch_response=True
        ) as resp:
            if resp.text and "Correct!" in resp.text:
                solved = True

        if not solved:
            with self.rest(
                "PUT",
                "/api/puzzle/find_other_ways_of_seeing/guess",
                headers={},
                json={"guess": "ABC"},
            ) as resp:
                pass
            with self.rest(
                "PUT",
                "/api/puzzle/find_other_ways_of_seeing/guess",
                headers={},
                json={"guess": "RED SASH"},
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

        if not puzzles["do_the_packing"]:
            with self.client.request(
                "POST", "/puzzles/do_the_packing/unlock", catch_response=True
            ) as resp:
                pass
        with self.client.request(
            "GET", "/puzzles/do_the_packing", catch_response=True
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
        with self.client.request(
            "GET", "/api/frontend/log/team", catch_response=True, headers=headers
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/frontend/log/activity", catch_response=True, headers=headers
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/admin/puzzles", catch_response=True, headers=headers
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/admin/account", catch_response=True, headers=headers
        ) as resp:
            pass

        # Global key grant, puzzle unlock, and gate satisfy
        with self.rest(
            "POST",
            "/api/admin/grantKeys",
            json={"teamIds": "all", "amount": 3},
            headers=headers,
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/api/admin/puzzles/weirdo_threaded_doodads/unlock",
            json={"teamIds": "all"},
            headers=headers,
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/api/admin/gates/tmg03/satisfy",
            json={"teamIds": "all"},
            headers=headers,
        ) as resp:
            pass


if __name__ == "__main__":

    run_single_user(late_load_test)
