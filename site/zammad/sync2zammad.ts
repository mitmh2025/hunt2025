import { initClient } from "@ts-rest/core";
import { Queue } from "modern-async";
import pRetry from "p-retry"; // eslint-disable-line import/default, import/no-named-as-default -- eslint fails to parse the import
import { newFrontendClient } from "../lib/api/frontend_client";
import { type InternalActivityLogEntry } from "../lib/api/frontend_contract";
import { TeamInfoIntermediate } from "../src/api/logic";
import { activityLog, connect, teamRegistrationLog } from "../src/api/redis";
import { newLogTailer } from "../src/frontend/server/dataset_tailer";
import HUNT from "../src/huntdata";
import { getTeamName } from "../src/utils/teamNames";
import TeamTicketState from "./TeamTicketState";
import Touchpoints, {
  type TouchpointType,
  type TouchpointSlug,
} from "./Touchpoints";
import {
  type ZammadGroupType,
  zammadContract,
  type ZammadTicketType,
  type ZammadTicketArticleType,
} from "./zammadApi";

const ZAMMAD_POLL_INTERVAL = 5000;

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
const STAGE_MANAGER_GROUP = "Stage Manager";
const HINTS_GROUP = "Hints";

const retry = <T>(op: string, fn: () => Promise<T>): Promise<T> => {
  return pRetry(fn, {
    onFailedAttempt: (error) => {
      console.error(`Failed to ${op}: ${error.message}. Retrying...`);
    },
  });
};

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

  const puzzles = await retry("fetch puzzle data", async () => {
    const resp = await frontendApiClient.getPuzzleMetadata();
    if (resp.status !== 200) {
      throw new Error(`Failed to fetch puzzle metadata: ${resp.status}`);
    }
    return resp.body;
  });

  // Synchronize the groups that we expect to exist
  const fetchGroups = async () => {
    const groups = new Map<string, ZammadGroupType>();

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
        groups.set(group.name, group);
      });

      page += 1;
    }

    return groups;
  };
  const zammadGroups = await fetchGroups();

  const ensureGroup = async (name: string, opts: Partial<ZammadGroupType>) => {
    const group = zammadGroups.get(name);
    if (group) {
      // Make sure required options are set
      const missingOptions = Object.entries(opts).filter(
        ([key, value]) => group[key as keyof ZammadGroupType] !== value,
      );
      if (missingOptions.length > 0) {
        console.log(`Updating group: ${name}`);
        const result = await zammadClient.updateGroup({
          params: { id: group.id },
          body: opts,
        });
        if (result.status !== 200) {
          throw new Error(`Failed to update group: ${result.status}`);
        }
      }
      return group.id;
    } else {
      console.log(`Creating group: ${name}`);
      const result = await zammadClient.createGroup({
        body: { name, ...opts },
      });
      if (result.status !== 201) {
        throw new Error(`Failed to create group: ${result.status}`);
      }
      zammadGroups.set(name, result.body);
      return result.body.id;
    }
  };
  const bartenderGroupId = await ensureGroup(BARTENDER_GROUP, {
    follow_up_possible: "new_ticket",
  });
  const stageManagerGroupId = await ensureGroup(STAGE_MANAGER_GROUP, {
    follow_up_possible: "new_ticket",
  });
  const hintsGroupId = await ensureGroup(HINTS_GROUP, {
    follow_up_possible: "yes",
  });

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

    const zammadName = `${teamInfo.registration.username} (${getTeamName(teamInfo.registration.username)})`;

    const update = {
      team_id_num: teamId,
      active: !teamInfo.deactivated,
      name: zammadName,
      team_username: teamInfo.registration.username,
      team_name: getTeamName(teamInfo.registration.username),
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
    const result = await retry(`updating team ${zammadName}`, async () => {
      if (existing) {
        console.log(`Updating organization: ${zammadName}`);
        const result = await zammadClient.updateOrganization({
          params: { id: existing },
          body: update,
        });
        if (result.status !== 200) {
          throw new Error(`Failed to update organization: ${result.status}`);
        }
        return result;
      } else {
        console.log(`Creating organization: ${zammadName}`);
        const result = await zammadClient.createOrganization({
          body: update,
        });
        if (result.status !== 201) {
          throw new Error(`Failed to create organization: ${result.status}`);
        }
        return result;
      }
    });

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
      firstname: info?.name,
      lastname: "",
      email,
      phone: info?.phone ?? "",
      organization_id: owner ? zammadOrgByTeamId.get(owner) : null,
    };

    const existing = zammadUserByEmail.get(email);
    const result = await retry(`updating user ${email}`, async () => {
      if (existing) {
        console.log(`Updating user: ${email}`);
        const result = await zammadClient.updateUser({
          params: { id: existing },
          body: update,
        });
        if (result.status !== 200) {
          throw new Error(`Failed to update user: ${result.status}`);
        }
        return result;
      } else {
        console.log(`Creating user: ${email}`);
        const result = await zammadClient.createUser({
          body: update,
        });
        if (result.status !== 201) {
          throw new Error(`Failed to create user: ${result.status}`);
        }
        return result;
      }
    });

    zammadUserByEmail.set(email, result.body.id);
  };

  teamRegistrationLogTailer.watchLog((items) => {
    const modified = new Map<number, TeamInfoIntermediate>();
    items.forEach((entry) => {
      if (entry.type === "team_name_changed") {
        return;
      }

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
        emailOwnership
          .get(registration.contactEmail.toLowerCase())
          ?.delete(teamId);
        emailOwnership
          .get(registration.secondaryContactEmail.toLowerCase())
          ?.delete(teamId);
        emailOwnership
          .get(registration.teamEmail.toLowerCase())
          ?.delete(teamId);
        return;
      }

      const seen = new Set<string>();
      const emails: [string, string, string][] = [
        [
          registration.contactEmail.toLowerCase(),
          registration.contactName,
          registration.contactPhone,
        ],
        [
          registration.secondaryContactEmail.toLowerCase(),
          registration.secondaryContactName,
          registration.secondaryContactPhone,
        ],
        [
          registration.teamEmail.toLowerCase(),
          getTeamName(registration.username),
          "",
        ],
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
      const ticketsPage = await retry("get updated tickets", async () => {
        const ticketsPage = await zammadClient.searchTickets({
          query: {
            page,
            per_page: 100,
          },
        });
        if (ticketsPage.status !== 200) {
          throw new Error(`Failed to fetch tickets: ${ticketsPage.status}`);
        }
        return ticketsPage;
      });
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
            const tickets = changedTicketsSince(
              new Date(mostRecentUpdated.getTime() - 5000),
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
              setTimeout(
                resolve,
                ZAMMAD_POLL_INTERVAL * (0.95 + 0.1 * Math.random()),
              ),
            );
          }
        } catch (e) {
          readyReject?.(e);
          throw e;
        }
      })(),
    };
  };

  const changedTicketArticlesSince = async function* (since: Date) {
    let page = 1;
    for (;;) {
      const articlesPage = await retry(
        "get updated ticket articles",
        async () => {
          const articlesPage = await zammadClient.listTicketArticles({
            query: {
              page,
              per_page: 100,
              sort_by: "updated_at",
              order_by: "desc",
            },
          });
          if (articlesPage.status !== 200) {
            throw new Error(
              `Failed to fetch ticket articles: ${articlesPage.status}`,
            );
          }
          return articlesPage;
        },
      );
      if (articlesPage.body.length === 0) {
        break;
      }

      for (const article of articlesPage.body) {
        if (new Date(article.updated_at) < since) {
          return;
        }

        yield article;
      }

      page += 1;
    }
  };
  const changedTicketArticles = () => {
    let readyResolve: undefined | (() => void);
    let readyReject: undefined | ((e: unknown) => void);
    const readyPromise = new Promise<void>((resolve, reject) => {
      readyResolve = resolve;
      readyReject = reject;
    });

    return {
      readyPromise,
      articles: (async function* () {
        try {
          console.log("Watching for changed ticket articles");

          let mostRecentUpdated = new Date(0);
          for (;;) {
            // Build in a 5 second grace period
            const articles = changedTicketArticlesSince(
              new Date(mostRecentUpdated.getTime() - 5000),
            );

            for await (const article of articles) {
              if (new Date(article.updated_at) > mostRecentUpdated) {
                mostRecentUpdated = new Date(article.updated_at);
              }

              yield article;
            }

            if (readyResolve) {
              readyResolve();
              readyResolve = undefined;
              readyReject = undefined;
            }

            await new Promise((resolve) =>
              setTimeout(
                resolve,
                ZAMMAD_POLL_INTERVAL * (0.95 + 0.1 * Math.random()),
              ),
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

  // We use null for "we know this ticket exists but we don't care about it"
  const globalHintTicketState = new Map<
    number,
    null | { teamId: number; slug: string }
  >();
  const globalMaxSyncedHintReply = new Map<number, number>(); // map of ticket ID to article ID

  const processTicket = async (ticket: ZammadTicketType) => {
    const teamId = teamIdByZammadOrg.get(ticket.organization_id);
    if (!teamId) {
      globalHintTicketState.set(ticket.id, null);
      return;
    }

    const teamTicketState =
      teamTicketStates.get(teamId) ??
      new TeamTicketState(HUNT, emptyTeamTicketState);

    const touchpointSlug = ticket.touchpoint_slug;
    const interactionSlug = ticket.interaction_slug;
    const hintSlug = ticket.hint_puzzle_slug;

    if (touchpointSlug) {
      const touchpoint = (Touchpoints as Record<string, TouchpointType>)[
        touchpointSlug
      ];
      if (!touchpoint) {
        console.warn(
          `Unknown touchpoint: ${touchpointSlug} in ticket ${ticket.id}`,
        );
        return;
      }

      teamTicketState.haveTouchpointTickets.set(
        touchpointSlug as TouchpointSlug,
        ticket,
      );

      if (
        touchpoint.closed_action &&
        ["closed", "pending close"].includes(
          zammadTicketStates.get(ticket.state_id) ?? "",
        )
      ) {
        switch (touchpoint.closed_action.type) {
          case "satisfy_gate":
            {
              const { gate: gateId } = touchpoint.closed_action;
              if (!teamTicketState.teamState.gates_satisfied.has(gateId)) {
                console.log(
                  `Marking gate ${gateId} satisfied for team ${teamId}`,
                );
                await retry("mark gate satisfied", async () => {
                  const resp = await frontendApiClient.markTeamGateSatisfied({
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
                });
              }
            }
            break;
        }
      }
    }

    if (interactionSlug) {
      teamTicketState.haveInteractionTickets.set(interactionSlug, ticket);

      if (zammadTicketStates.get(ticket.state_id) === "closed") {
        frontendApiClient;
        await retry("close interaction", async () => {
          const resp = await frontendApiClient.completeInteraction({
            params: {
              teamId: teamId.toString(),
              interactionId: interactionSlug,
            },
          });
          if (resp.status !== 200) {
            throw new Error(`Failed to close interaction: ${resp.status}`);
          }
        });
      }
    }

    if (hintSlug) {
      globalHintTicketState.set(ticket.id, { teamId, slug: hintSlug });
      teamTicketState.hintTickets.set(hintSlug, ticket);
    }

    teamTicketStates.set(teamId, teamTicketState);
  };
  const { readyPromise: ticketReadyPromise, tickets } = changedTickets();
  void (async () => {
    for await (const ticket of tickets) {
      await processTicket(ticket).catch((e: unknown) => {
        console.error(e);
      });
    }
  })();
  await ticketReadyPromise;
  console.log("Initial ticket fetch complete");

  const { readyPromise: articleReadyPromise, articles } =
    changedTicketArticles();
  const processTicketArticle = async (article: ZammadTicketArticleType) => {
    if (article.sender_id === 2) {
      // Don't process articles with sender=Customer
      return;
    }

    if (!globalHintTicketState.has(article.ticket_id)) {
      // try to populate ourselves
      const ticket = await retry(
        `get ticket ${article.ticket_id}`,
        async () => {
          const t = await zammadClient.getTicket({
            params: { id: article.ticket_id },
          });
          if (t.status !== 200) {
            throw new Error(`Failed to fetch ticket: ${t.status}`);
          }
          return t;
        },
      );
      await processTicket(ticket.body);
    }

    const state = globalHintTicketState.get(article.ticket_id);
    if (!state) {
      return;
    }

    const { teamId, slug } = state;

    const latest = globalMaxSyncedHintReply.get(article.ticket_id) ?? 0;
    if (article.id <= latest) {
      return;
    }

    // Need to sync back to the activity log
    await retry(
      `update hint reply for team ${teamId} slug ${slug} article ${article.id}`,
      () =>
        frontendApiClient.respondToHintRequest({
          params: {
            teamId: teamId.toString(),
            slug,
          },
          body: {
            response: article.body,
            zammad_article_id: article.id,
          },
        }),
    );
  };
  void (async () => {
    for await (const article of articles) {
      await processTicketArticle(article).catch((e: unknown) => {
        console.error(e);
      });
    }
  })();
  await articleReadyPromise;
  console.log("Initial ticket article fetch complete");

  const activityLogTailer = newLogTailer({
    redisClient,
    fetchMethod: frontendApiClient.getFullActivityLog.bind(frontendApiClient),
    log: activityLog,
  });
  activityLogTailer.start();

  const createHintTicket = async ({
    teamId,
    slug,
    title,
  }: {
    teamId: number;
    slug: string;
    title: string;
  }) => {
    const userId = zammadUserByTeamId.get(teamId);
    if (!userId) {
      console.warn(`No customer for team ${teamId}`);
      return;
    }

    const ticket = await retry(
      `creating hint ticket for team ${teamId} and slug ${slug}`,
      async () => {
        const ticket = await zammadClient.createTicket({
          body: {
            group_id: hintsGroupId,
            customer_id: userId,
            title: `Hint: ${title}`,
            hint_puzzle_slug: slug,
          },
          extraHeaders: {
            "X-On-Behalf-Of": userId.toString(),
          },
        });
        if (ticket.status !== 201) {
          throw new Error(
            `Failed to create ticket for team ${teamId}: ${ticket.status}`,
          );
        }
        return ticket.body;
      },
    );

    await processTicket(ticket);
    return ticket;
  };
  const processHintRequestActivityLogEntry = async (
    entry: InternalActivityLogEntry & { type: "puzzle_hint_requested" },
    teamId: number,
    teamTicketState: TeamTicketState,
  ) => {
    const puzzleTitle = puzzles[entry.slug]?.title ?? entry.slug;
    const ticket =
      teamTicketState.hintTickets.get(entry.slug) ??
      (await createHintTicket({
        teamId,
        slug: entry.slug,
        title: puzzleTitle,
      }));

    if (ticket && (ticket.hint_last_request_entry ?? 0) < entry.id) {
      console.log(`Updating hint ticket for team=${teamId} slug=${entry.slug}`);
      const customerId = zammadUserByTeamId.get(teamId);
      if (!customerId) {
        console.warn(`No customer for team ${teamId}`);
        return;
      }

      const updated = await retry(
        `update hint ticket for team ${teamId} and slug ${entry.slug}`,
        async () => {
          const result = await zammadClient.updateTicket({
            params: { id: ticket.id },
            body: {
              state_id: [...zammadTicketStates.entries()].find(
                ([_, v]) => v === "open",
              )?.[0],
              owner_id: null,
              hint_last_request_entry: entry.id,
              puzzle_slug: entry.slug,
              article: {
                type: "note",
                internal: false,
                body: entry.data.request,
              },
            },
            extraHeaders: {
              "X-On-Behalf-Of": customerId.toString(),
            },
          });
          if (result.status !== 200) {
            throw new Error(
              `Failed to update ticket for team ${teamId}: ${result.status}`,
            );
          }
          return result.body;
        },
      );
      await processTicket(updated);
    }
  };
  const processHintResponseActivityLogEntry = (
    entry: InternalActivityLogEntry & { type: "puzzle_hint_responded" },
    _teamId: number,
    teamTicketState: TeamTicketState,
  ) => {
    // The lookup here was going to be a mess one way or another, and it ended
    // up a mess here. We need to go from slug to ticket to the global tracking
    // of max article ID.
    const ticket = teamTicketState.hintTickets.get(entry.slug);
    if (!ticket) {
      console.warn(`No ticket for hint ${entry.slug}`);
      return;
    }

    const latest = globalMaxSyncedHintReply.get(ticket.id) ?? 0;
    if (entry.data.zammad_article_id <= latest) {
      return;
    }

    globalMaxSyncedHintReply.set(ticket.id, entry.data.zammad_article_id);
  };
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

        // touchpoints and interactions are handled as synchronization tasks off
        // of reduced state below, but hints operate on log entries
        switch (entry.type) {
          case "puzzle_hint_requested":
            syncQueue
              .exec(() =>
                processHintRequestActivityLogEntry(
                  entry,
                  teamId,
                  teamTicketState,
                ),
              )
              .catch((e: unknown) => {
                console.error(e);
              });
            break;
          case "puzzle_hint_responded":
            processHintResponseActivityLogEntry(entry, teamId, teamTicketState);
            break;
        }
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

            const touchpoint: TouchpointType = Touchpoints[touchpointSlug];
            if (!touchpoint.created_if) {
              continue;
            }

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

            console.log(
              `Creating touchpoint ticket for team=${teamId} slug=${touchpointSlug}`,
            );
            const ticket = await retry(
              `create ticket for team ${teamId} and touchpoint ${touchpointSlug}`,
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

          for (const [
            interactionSlug,
            interactionTitle,
          ] of teamTicketState.needInteractionTickets) {
            if (teamTicketState.haveInteractionTickets.has(interactionSlug)) {
              continue;
            }

            console.log(
              `Creating interaction ticket for team=${teamId} interaction=${interactionSlug}`,
            );
            const ticket = await retry(
              `create ticket for team ${teamId} and interaction ${interactionSlug}`,
              () =>
                zammadClient.createTicket({
                  body: {
                    group_id: stageManagerGroupId,
                    customer_id: zammadCustomer,
                    title: `Interaction: ${interactionTitle}`,
                    article: {
                      type: "note",
                      internal: true,
                      body: "Closing this ticket will mark this touchpoint as completed.",
                    },
                    interaction_slug: interactionSlug,
                  },
                  extraHeaders: {
                    "X-On-Behalf-Of": zammadCustomer.toString(),
                  },
                }),
            );
            if (ticket.status !== 201) {
              console.error(
                `Failed to create ticket for team ${teamId}: ${ticket.status}`,
              );
              continue;
            }

            teamTicketState.haveInteractionTickets.set(
              interactionSlug,
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
