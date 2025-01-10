# Setup
- Spin up your dev server on localhost:3000. Set the env var `export SEED_FILES="demo.ts,loadtest.ts"` to get the load-test seeds (make sure you can log in as `loadtestearly1`)

- Install deps: `poetry install`

# Running load tests

To run a single client for debugging:
- `poetry run python early_user.py`

To run the load tester with a customizable number of clients:
- `poetry run locust -f early_user.py` and use the web UI

Swap `early_user.py` for another python file to run other scenarios.


# Building load tests

A good place to start is with har2locust. Turn on "Preserve log" in the chrome dev tools, click around the site however you'd like your test to do so, and then export a HAR file from Chrome.

Then, run `poetry run har2locust path/to/export.har > my_new_locustfile.py` to generate a basic locustfile you can start from.
