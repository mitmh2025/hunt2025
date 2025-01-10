# Setup
- Spin up your dev server on localhost:3000. Set the env var `export SEED_FILES="demo.ts,loadtest.ts"` to get the load-test seeds (make sure you can log in as `loadtestearly1`)

- Install deps: `poetry install`

# Running load tests

To run a single client for debugging:
- `poetry run python early_user.py`

To run the load tester with a customizable number of clients:
- `poetry run locust -f early_user.py` and use the web UI

Swap `early_user.py` for another python file to run other scenarios.

## Late-stage load test

The late-stage load test simulates teams logging on and completing the Murder
in MITropolis round, with long, realistic activity logs. Concurrently, it
simulates admins performing various cross-team tasks in the ops UI.

You will need to set `JWT_SECRET` to the same JWT secret the app server is
using in order to run this load test.

The main knob here is the ratio of admin users to teams; you can adjust that
by adjusting the `weight` argument to `@task` in `late_user.py`. You can
also, for example, change the decorator on `admin_task` to `@task(0)` to
disable the admin/ops user and just run the late-stage teams part of the
load test.

# Building load tests

A good place to start is with har2locust. Turn on "Preserve log" in the chrome dev tools, click around the site however you'd like your test to do so, and then export a HAR file from Chrome.

Then, run `poetry run har2locust path/to/export.har > my_new_locustfile.py` to generate a basic locustfile you can start from.
