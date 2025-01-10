from locust import task, run_single_user
from locust import FastHttpUser


class admin_load_test(FastHttpUser):
    host = "http://localhost:3003"
    default_headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
    }

    @task
    def t(self):
        with self.client.request(
            "GET", "/", headers={"Cache-Control": "max-age=0"}, catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/frontend/log/team", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/frontend/log/activity", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/admin/puzzles", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/admin/account", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/frontend/log/team", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/frontend/log/activity", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/admin/puzzles", catch_response=True
        ) as resp:
            pass
        with self.client.request(
            "GET", "/api/admin/account", catch_response=True
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/api/admin/grantKeys",
            headers={},
            json={"teamIds": "all", "amount": 3},
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/api/admin/puzzles/weirdo_threaded_doodads/unlock",
            headers={},
            json={"teamIds": "all"},
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/api/admin/gates/tmg03/satisfy",
            headers={},
            json={"teamIds": "all"},
        ) as resp:
            pass


if __name__ == "__main__":
    run_single_user(admin_load_test)
