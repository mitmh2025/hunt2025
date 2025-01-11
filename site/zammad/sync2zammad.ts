import { initClient } from "@ts-rest/core";
import { Queue } from "modern-async";
import pRetry from "p-retry"; // eslint-disable-line import/default, import/no-named-as-default -- eslint fails to parse the import
import { newFrontendClient } from "../lib/api/frontend_client";
import { TeamInfoIntermediate } from "../src/api/logic";
import { activityLog, connect, teamRegistrationLog } from "../src/api/redis";
import { newLogTailer } from "../src/frontend/server/dataset_tailer";
import HUNT from "../src/huntdata";
import TeamTicketState from "./TeamTicketState";
import Touchpoints, {
  type TouchpointType,
  type TouchpointSlug,
} from "./Touchpoints";
import { zammadContract } from "./zammadApi";

const ZAMMAD_POLL_INTERVAL = 1000;

let apiUrl = process.env.API_BASE_URL;
if (process.env.NODE_ENV === "development" && !apiUrl) {
  apiUrl = `http://localhost:3000/api`;
}
if (!apiUrl) {
  throw new Error("$API_BASE_URL was not configured");
}

const frontendApiSecret = process.env.FRONTEND_API_SECRET;
if (!frontendApiSecret) {
  throw new Error("$FRONTEND_API_SECRET was not configured");
}

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("$REDIS_URL was not configured");
}

const zammadUrl = process.env.ZAMMAD_URL;
if (!zammadUrl) {
  throw new Error("$ZAMMAD_URL was not configured");
}

const zammadSecret = process.env.ZAMMAD_SECRET;
if (!zammadSecret) {
  throw new Error("$ZAMMAD_SECRET was not configured");
}

const BARTENDER_GROUP = "Bartender";

async function main({
  redisUrl,
  apiUrl,
  frontendApiSecret,
  zammadUrl,
  zammadSecret,
}: {
  redisUrl: string;
  apiUrl: string;
  frontendApiSecret: string;
  zammadUrl: string;
  zammadSecret: string;
}) {
  const redisClient = await connect(redisUrl);

  const frontendApiClient = newFrontendClient(apiUrl, {
    type: "frontend",
    frontendSecret: frontendApiSecret,
  });

  const zammadClient = initClient(zammadContract, {
    baseUrl: zammadUrl,
    baseHeaders: {
      Authorization: `Bearer ${zammadSecret}`,
      "Content-Type": "application/json",
    },
    throwOnUnknownStatus: true,
  });

  // Synchronize the groups that we expect to exist
  const fetchGroups = async () => {
    const groups = new Map<string, number>();

    let page = 1;
    for (;;) {
      const groupsPage = await zammadClient.listGroups({
        query: { page, per_page: 100 },
      });
      if (groupsPage.status !== 200) {
        throw new Error(`Failed to fetch groups: ${groupsPage.status}`);
      }
      if (groupsPage.body.length === 0) {
        break;
      }

      groupsPage.body.forEach((group) => {
        groups.set(group.name, group.id);
      });

      page += 1;
    }

    return groups;
  };
  const zammadGroups = await fetchGroups();

  const ensureGroup = async (name: string) => {
    let groupId = zammadGroups.get(name);
    if (!groupId) {
      console.log(`Creating group: ${name}`);
      const result = await zammadClient.createGroup({
        body: { name, follow_up_possible: "new_ticket" },
      });
      if (result.status !== 201) {
        throw new Error(`Failed to create group: ${result.status}`);
      }
      zammadGroups.set(name, result.body.id);
      groupId = result.body.id;
    }

    return groupId;
  };
  const bartenderGroupId = await ensureGroup(BARTENDER_GROUP);

  const teamRegistrationLogTailer = newLogTailer({
    redisClient,
    fetchMethod:
      frontendApiClient.getFullTeamRegistrationLog.bind(frontendApiClient),
    log: teamRegistrationLog,
  });
  teamRegistrationLogTailer.start();

  const fetchTicketStates = async () => {
    const states = new Map<number, string>();

    let page = 1;
    for (;;) {
      const statesPage = await zammadClient.listTicketStates({
        query: { page, per_page: 100 },
      });
      if (statesPage.status !== 200) {
        throw new Error(`Failed to fetch ticket states: ${statesPage.status}`);
      }
      if (statesPage.body.length === 0) {
        break;
      }

      statesPage.body.forEach((state) => {
        states.set(state.id, state.name);
      });

      page += 1;
    }

    return states;
  };
  const zammadTicketStates = await fetchTicketStates();

  // Unfortunately, Zammad's API doesn't let us query by exact team name (only
  // substring) or by the custom fields that we've added, so at startup we suck
  // down the entire database and keep a local cache of what the state should be
  // as we make updates
  const fetchOrganizations = async () => {
    const organizations = new Map<number, number>();

    let page = 1;
    for (;;) {
      const orgs = await zammadClient.listOrganizations({
        query: { page, per_page: 100 },
      });
      if (orgs.status !== 200) {
        throw new Error(`Failed to fetch organizations: ${orgs.status}`);
      }
      if (orgs.body.length === 0) {
        break;
      }

      orgs.body.forEach((org) => {
        if (org.team_id_num) organizations.set(org.team_id_num, org.id);
      });

      page += 1;
    }

    return organizations;
  };
  // Map of teamId -> zammad ID
  const zammadOrgByTeamId = await fetchOrganizations();
  const teamIdByZammadOrg = new Map(
    [...zammadOrgByTeamId.entries()].map(([k, v]) => [v, k]),
  );

  // Same deal for customers. We use the email as the unique identifier (even
  // though it can technically change, but maybe just don't)
  const fetchUsers = async () => {
    const users = new Map<string, number>();

    let page = 1;
    for (;;) {
      const usersPage = await zammadClient.listUsers({
        query: { page, per_page: 100 },
      });
      if (usersPage.status !== 200) {
        throw new Error(`Failed to fetch users: ${usersPage.status}`);
      }
      if (usersPage.body.length === 0) {
        break;
      }

      usersPage.body.forEach((user) => {
        users.set(user.email, user.id);
      });

      page += 1;
    }

    return users;
  };
  // Map of email -> zammadUserId
  const zammadUserByEmail = await fetchUsers();

  const syncQueue = new Queue(1);

  const teamInfos = new Map<number, TeamInfoIntermediate>();
  const zammadUserByTeamId = new Map<number, number>();
  const syncTeam = async (teamId: number, teamInfo: TeamInfoIntermediate) => {
    // This shouldn't be possible once we've consumed any log entries
    if (!teamInfo.registration) {
      return;
    }

    const zammadName = `${teamInfo.registration.username} (${teamInfo.registration.name})`;

    const update = {
      team_id_num: teamId,
      active: !teamInfo.deactivated,
      name: zammadName,
      team_username: teamInfo.registration.username,
      team_name: teamInfo.registration.name,
      team_on_campus: teamInfo.registration.teamLocation !== "Fully Remote",
      people_total: teamInfo.registration.peopleTotal,
      people_undergrad: teamInfo.registration.peopleUndergrad,
      people_grad: teamInfo.registration.peopleGrad,
      people_alum: teamInfo.registration.peopleAlum,
      people_staff: teamInfo.registration.peopleStaff,
      people_affiliates: teamInfo.registration.peopleAffiliates,
      people_on_campus: teamInfo.registration.peopleOnCampus,
    };

    const existing = zammadOrgByTeamId.get(teamId);
    let result;
    if (existing) {
      console.log(`Updating organization: ${zammadName}`);
      result = await zammadClient.updateOrganization({
        params: { id: existing },
        body: update,
      });
      if (result.status !== 200) {
        throw new Error(`Failed to update organization: ${result.status}`);
      }
    } else {
      console.log(`Creating organization: ${zammadName}`);
      result = await zammadClient.createOrganization({
        body: update,
      });
      if (result.status !== 201) {
        throw new Error(`Failed to create organization: ${result.status}`);
      }
    }

    zammadOrgByTeamId.set(teamId, result.body.id);
  };

  // Email addresses are unique in Zammad, but nothing forces them to be unique
  // for us. So we assign email addresses to the team that most recently claimed
  // them, unless that team has been deactivated, in which case we skip over
  // them.
  type EmailOwnerData = { epoch: number; name: string; phone: string };
  const emailOwnership = new Map<string, Map<number, EmailOwnerData>>();
  const syncUser = async (
    email: string,
    owner?: number,
    info?: EmailOwnerData,
  ) => {
    const update = {
      firstname: info?.name.split(" ").slice(0, -1).join(" ") ?? "",
      lastname: info?.name.split(" ").slice(-1).join(" ") ?? "",
      email,
      phone: info?.phone ?? "",
      organization_id: owner ? zammadOrgByTeamId.get(owner) : null,
    };

    const existing = zammadUserByEmail.get(email);
    let result;
    if (existing) {
      console.log(`Updating user: ${email}`);
      result = await zammadClient.updateUser({
        params: { id: existing },
        body: update,
      });
      if (result.status !== 200) {
        throw new Error(`Failed to update user: ${result.status}`);
      }
    } else {
      console.log(`Creating user: ${email}`);
      result = await zammadClient.createUser({
        body: update,
      });
      if (result.status !== 201) {
        throw new Error(`Failed to create user: ${result.status}`);
      }
    }

    zammadUserByEmail.set(email, result.body.id);
  };

  teamRegistrationLogTailer.watchLog((items) => {
    const modified = new Map<number, TeamInfoIntermediate>();
    items.forEach((entry) => {
      const teamInfo =
        teamInfos.get(entry.team_id) ?? new TeamInfoIntermediate();
      const updated = teamInfo.reduce(entry);
      teamInfos.set(entry.team_id, updated);
      modified.set(entry.team_id, updated);
    });

    modified.forEach((teamInfo, teamId) => {
      syncQueue
        .exec(() => syncTeam(teamId, teamInfo))
        .catch((e: unknown) => {
          console.error(e);
        });
    });

    // Figure out email ownership
    modified.forEach(({ epoch, registration, deactivated }, teamId) => {
      if (!registration) {
        return;
      }

      if (deactivated) {
        emailOwnership.get(registration.contactEmail)?.delete(teamId);
        emailOwnership.get(registration.secondaryContactEmail)?.delete(teamId);
        emailOwnership.get(registration.teamEmail)?.delete(teamId);
        return;
      }

      const seen = new Set<string>();
      const emails: [string, string, string][] = [
        [
          registration.contactEmail,
          registration.contactName,
          registration.contactPhone,
        ],
        [
          registration.secondaryContactEmail,
          registration.secondaryContactName,
          registration.secondaryContactPhone,
        ],
        [registration.teamEmail, registration.name, ""],
      ];
      emails.forEach(([email, name, phone]) => {
        if (seen.has(email)) {
          return;
        }

        seen.add(email);

        const ownership =
          emailOwnership.get(email) ?? new Map<number, EmailOwnerData>();
        ownership.set(teamId, { epoch, name, phone });
        emailOwnership.set(email, ownership);
      });
    });

    emailOwnership.forEach((ownership, email) => {
      const latest = [...ownership.entries()].reduce<
        undefined | [number, EmailOwnerData]
      >(
        (a, b) => (a === undefined ? b : b[1].epoch > a[1].epoch ? b : a),
        undefined,
      );
      if (latest) {
        const [owner, info] = latest;
        syncQueue
          .exec(() => syncUser(email, owner, info))
          .catch((e: unknown) => {
            console.error(e);
          });
      }
    });

    // Once all emails have been updated, set the customer ID to use on the
    // team's behalf
    syncQueue
      .exec(() => {
        modified.forEach(({ registration }, teamId) => {
          if (!registration) {
            return;
          }

          const email = registration.teamEmail;
          if (!email) {
            return;
          }

          const userId = zammadUserByEmail.get(email);
          if (userId) {
            zammadUserByTeamId.set(teamId, userId);
          }
        });
      })
      .catch((e: unknown) => {
        console.error(e);
      });
  });

  await teamRegistrationLogTailer.readyPromise();

  const changedTicketsSince = async function* (since: Date) {
    let page = 1;
    for (;;) {
      const ticketsPage = await zammadClient.searchTickets({
        query: {
          page,
          per_page: 100,
        },
      });
      if (ticketsPage.status !== 200) {
        throw new Error(`Failed to fetch tickets: ${ticketsPage.status}`);
      }
      if (ticketsPage.body.tickets.length === 0) {
        break;
      }

      for (const ticketId of ticketsPage.body.tickets) {
        const ticket = ticketsPage.body.assets.Ticket[ticketId];
        if (!ticket) {
          continue;
        }

        if (new Date(ticket.updated_at) < since) {
          return;
        }

        yield ticket;
      }

      page += 1;
    }
  };
  // Generate a stream of ticket changes by periodically polling Zammad for new
  // ticket articles and fetching the corresponding tickets
  const changedTickets = () => {
    let readyResolve: undefined | (() => void);
    let readyReject: undefined | ((e: unknown) => void);
    const readyPromise = new Promise<void>((resolve, reject) => {
      readyResolve = resolve;
      readyReject = reject;
    });

    return {
      readyPromise,
      tickets: (async function* () {
        try {
          console.log("Watching for changed tickets");

          let mostRecentUpdated = new Date(0);
          for (;;) {
            // Build in a 5 second grace period to avoid missing tickets (which
            // does mean we'll continue re-processing the most recent ticket)
            const tickets = await pRetry(
              () =>
                changedTicketsSince(
                  new Date(mostRecentUpdated.getTime() - 5000),
                ),
              {
                onFailedAttempt: (error) => {
                  console.error(
                    `Failed to get updated tickets: ${error.message}. Retrying...`,
                  );
                },
              },
            );

            for await (const ticket of tickets) {
              if (new Date(ticket.updated_at) > mostRecentUpdated) {
                mostRecentUpdated = new Date(ticket.updated_at);
              }

              yield ticket;
            }

            if (readyResolve) {
              readyResolve();
              readyResolve = undefined;
              readyReject = undefined;
            }

            await new Promise((resolve) =>
              setTimeout(resolve, ZAMMAD_POLL_INTERVAL),
            );
          }
        } catch (e) {
          readyReject?.(e);
          throw e;
        }
      })(),
    };
  };

  // OK time to actually work on tickets. Keep track of a TeamStateIntermediate
  // and our own data structure for expected ticket state
  const teamTicketStates = new Map<number, TeamTicketState>();
  const emptyTeamTicketState = new TeamTicketState(HUNT);

  const { readyPromise, tickets } = changedTickets();
  void (async () => {
    for await (const ticket of tickets) {
      const teamId = teamIdByZammadOrg.get(ticket.organization_id);
      if (!teamId) {
        continue;
      }

      const touchpointSlug = ticket.touchpoint_slug;

      if (touchpointSlug) {
        const touchpoint = (Touchpoints as Record<string, TouchpointType>)[
          touchpointSlug
        ];
        if (!touchpoint) {
          console.warn(
            `Unknown touchpoint: ${touchpointSlug} in ticket ${ticket.id}`,
          );
          continue;
        }

        const teamTicketState =
          teamTicketStates.get(teamId) ??
          new TeamTicketState(HUNT, emptyTeamTicketState);

        teamTicketState.haveTouchpointTickets.set(
          touchpointSlug as TouchpointSlug,
          ticket,
        );

        teamTicketStates.set(teamId, teamTicketState);

        if (
          touchpoint.closed_action &&
          zammadTicketStates.get(ticket.state_id) === "closed"
        ) {
          switch (touchpoint.closed_action.type) {
            case "satisfy_gate":
              {
                const { gate: gateId } = touchpoint.closed_action;
                if (!teamTicketState.teamState.gates_satisfied.has(gateId)) {
                  console.log(
                    `Marking gate ${gateId} satisfied for team ${teamId}`,
                  );
                  await pRetry(
                    async () => {
                      const resp =
                        await frontendApiClient.markTeamGateSatisfied({
                          params: {
                            teamId: teamId.toString(),
                            gateId,
                          },
                        });
                      if (resp.status !== 200) {
                        throw new Error(
                          `Failed to mark gate satisfied: ${resp.status}`,
                        );
                      }
                    },
                    {
                      onFailedAttempt: (error) => {
                        console.error(
                          `Failed to mark gate satisfied for team ${teamId} and gate ${gateId}: ${error.message}. Retrying...`,
                        );
                      },
                    },
                  );
                }
              }
              break;
          }
        }
      }
    }
  })();
  await readyPromise;
  console.log("Initial ticket fetch complete");

  const activityLogTailer = newLogTailer({
    redisClient,
    fetchMethod: frontendApiClient.getFullActivityLog.bind(frontendApiClient),
    log: activityLog,
  });
  activityLogTailer.start();

  activityLogTailer.watchLog((items) => {
    const modified = new Set<number>();

    items.forEach((entry) => {
      const teamId = entry.team_id;
      const teamIds = new Set<number>();
      if (teamId === undefined) {
        emptyTeamTicketState.reduce(entry);

        for (const teamId of teamTicketStates.keys()) {
          teamIds.add(teamId);
        }
      } else {
        teamIds.add(teamId);
      }
      for (const teamId of teamIds) {
        const teamTicketState =
          teamTicketStates.get(teamId) ??
          new TeamTicketState(HUNT, emptyTeamTicketState);
        teamTicketState.reduce(entry);
        teamTicketStates.set(teamId, teamTicketState);
        modified.add(teamId);
      }
    });

    syncQueue
      .exec(async () => {
        for (const teamId of modified) {
          const teamTicketState = teamTicketStates.get(teamId);
          if (!teamTicketState) {
            continue;
          }

          const zammadCustomer = zammadUserByTeamId.get(teamId);
          if (!zammadCustomer) {
            console.warn(`No customer for team ${teamId}`);
            continue;
          }

          const teamInfo = teamInfos.get(teamId);
          if (!teamInfo) {
            console.warn(`No team info for team ${teamId}`);
            continue;
          }

          for (const touchpointSlug of teamTicketState.needTouchpointTickets) {
            if (teamTicketState.haveTouchpointTickets.has(touchpointSlug)) {
              continue;
            }

            const touchpoint = Touchpoints[touchpointSlug];
            let puzzleSlug;
            switch (touchpoint.created_if.type) {
              case "slug_unlocked":
                puzzleSlug = touchpoint.created_if.slug;
                break;
              case "slug_partially_solved":
                puzzleSlug = touchpoint.created_if.slug;
                break;
              case "gate_satisfied":
                puzzleSlug = touchpoint.created_if.puzzle_slug;
                break;
              default:
                touchpoint.created_if satisfies never;
                throw new Error("Unexpected touchpoint type");
            }

            console.log("Creating ticket for", teamId, touchpointSlug);
            const ticket = await pRetry(
              () =>
                zammadClient.createTicket({
                  body: {
                    group_id: bartenderGroupId,
                    customer_id: zammadCustomer,
                    title: touchpoint.description,
                    article: {
                      type: "note",
                      internal: true,
                      body: "Closing this ticket will mark this touchpoint as completed.",
                    },
                    touchpoint_type: touchpoint.type,
                    touchpoint_slug: touchpointSlug,
                    puzzle_slug: puzzleSlug,
                  },
                  extraHeaders: {
                    "X-On-Behalf-Of": zammadCustomer.toString(),
                  },
                }),
              {
                onFailedAttempt: (error) => {
                  console.error(
                    `Failed to create ticket for team ${teamId} and touchpoint ${touchpointSlug}: ${error.message}. Retrying...`,
                  );
                },
              },
            );
            if (ticket.status !== 201) {
              console.error(
                `Failed to create ticket for team ${teamId}: ${ticket.status}`,
              );
              continue;
            }

            teamTicketState.haveTouchpointTickets.set(
              touchpointSlug,
              ticket.body,
            );
          }
        }
      })
      .catch((e: unknown) => {
        console.error(e);
      });
  });

  await activityLogTailer.readyPromise();
}

main({ redisUrl, apiUrl, frontendApiSecret, zammadUrl, zammadSecret }).catch(
  (err: unknown) => {
    console.error(err);
  },
);
