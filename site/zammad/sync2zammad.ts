import { initClient, initContract } from "@ts-rest/core";
import { Queue } from "modern-async";
import { z } from "zod";
import { newFrontendClient } from "../lib/api/frontend_client";
import { TeamInfoIntermediate } from "../src/api/logic";
import { connect, teamRegistrationLog } from "../src/api/redis";
import { newLogTailer } from "../src/frontend/server/dataset_tailer";

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

type TicketTriggerType = {
  created_if:
    | { slug_unlocked: string }
    | { slug_partially_solved: string; answer: string }
    | { gate_satisfied: string };
  closed_action?: { satisfy_gate: string };
};

// TODO: elaborate-mammoth, quixotic-shoe, brilliant-row
// @ts-expect-error -- Triggers are not fully implemented
const _TICKET_TRIGGERS: TicketTriggerType[] = [
  {
    created_if: {
      slug_partially_solved: "half_baked",
      answer: "GIVE US DOUGH",
    },
  },
  {
    created_if: {
      slug_partially_solved: "dada_shaves_split_ends",
      answer: "LAUNCH DART AT TGT IPO",
    },
  },
  {
    created_if: {
      slug_unlocked: "in_communicado_tonight",
    },
  },
  {
    created_if: {
      slug_partially_solved: "in_communicado_tonight",
      answer: "LAST CALL",
    },
  },
  {
    created_if: {
      slug_partially_solved: "a_recipe_for_success",
      answer: "FLIRT WITH BARTENDER",
    },
  },
  {
    created_if: {
      slug_partially_solved: "kindred_spirits",
      answer: "BUY A FLIGHT",
    },
  },
  {
    created_if: {
      slug_partially_solved: "mitropolitan_house_of_fashion",
      answer: "WORK IT AT OUR GALA",
    },
  },
  {
    created_if: {
      slug_partially_solved: "drunkens_and_flagons",
      answer: "GO PAY TAB",
    },
  },
  {
    created_if: {
      slug_partially_solved: "art_history",
      answer: "TAKEOUT FINGERPAINTS MAKEUP ALTERNATE STOLEN DIAMOND HISTORY",
    },
  },
  {
    created_if: { slug_unlocked: "eponymous_forensic_accountant" },
    closed_action: { satisfy_gate: "ptg01" },
  },
  {
    created_if: { slug_unlocked: "the_inspectre" },
    closed_action: { satisfy_gate: "ptg02" },
  },
  {
    created_if: { slug_unlocked: "synthetic_tagsonomy" },
    closed_action: { satisfy_gate: "mdg02" },
  },
  {
    created_if: { slug_unlocked: "mystery_os" },
    closed_action: { satisfy_gate: "sog01" },
  },
  {
    created_if: { slug_unlocked: "educational_rite_of_passage" },
    closed_action: { satisfy_gate: "mdg01" },
  },
  {
    created_if: { slug_unlocked: "anything_is_popsicle" },
    closed_action: { satisfy_gate: "sog03" },
  },
];

const ZammadOrganizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  active: z.boolean(),
  team_id_num: z.number().nullable(),
  team_name: z.string().nullable(),
  team_username: z.string().nullable(),
  team_on_campus: z.boolean().nullable(),
  people_total: z.number().nullable(),
  people_undergrad: z.number().nullable(),
  people_grad: z.number().nullable(),
  people_alum: z.number().nullable(),
  people_staff: z.number().nullable(),
  people_affiliates: z.number().nullable(),
  people_on_campus: z.number().nullable(),
});

const ZammadUserSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  organization_id: z.number().nullable(),
  email: z.string(),
  phone: z.string(),
});

const c = initContract();
const zammadContract = c.router({
  listOrganizations: {
    method: "GET",
    path: "/api/v1/organizations",
    query: z.object({
      page: z.number(),
      per_page: z.number(),
    }),
    responses: {
      200: z.array(ZammadOrganizationSchema),
    },
  },
  createOrganization: {
    method: "POST",
    path: "/api/v1/organizations",
    body: ZammadOrganizationSchema.omit({ id: true })
      .partial()
      .extend({ name: z.string() }),
    responses: {
      201: ZammadOrganizationSchema,
    },
  },
  updateOrganization: {
    method: "PUT",
    path: "/api/v1/organizations/:id",
    pathParams: z.object({ id: z.number() }),
    body: ZammadOrganizationSchema.omit({ id: true }).partial(),
    responses: {
      200: ZammadOrganizationSchema,
    },
  },
  listUsers: {
    method: "GET",
    path: "/api/v1/users",
    query: z.object({
      page: z.number(),
      per_page: z.number(),
    }),
    responses: {
      200: z.array(ZammadUserSchema),
    },
  },
  // On creation, one of firstname, lastname, email, or phone must be provided
  createUser: {
    method: "POST",
    path: "/api/v1/users",
    body: ZammadUserSchema.omit({ id: true })
      .partial()
      .and(
        z.union([
          z.object({ firstname: z.string() }),
          z.object({ lastname: z.string() }),
          z.object({ email: z.string() }),
          z.object({ phone: z.string() }),
        ]),
      ),
    responses: {
      201: ZammadUserSchema,
    },
  },
  updateUser: {
    method: "PUT",
    path: "/api/v1/users/:id",
    pathParams: z.object({ id: z.number() }),
    body: ZammadUserSchema.omit({ id: true }).partial(),
    responses: {
      200: ZammadUserSchema,
    },
  },
});

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

  const teamRegistrationLogTailer = newLogTailer({
    redisClient,
    fetchMethod:
      frontendApiClient.getFullTeamRegistrationLog.bind(frontendApiClient),
    log: teamRegistrationLog,
  });
  teamRegistrationLogTailer.start();

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
  const zammadOrganizations = await fetchOrganizations();

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
  const zammadUsers = await fetchUsers();

  const syncQueue = new Queue(1);

  const teamInfos = new Map<number, TeamInfoIntermediate>();
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

    const existing = zammadOrganizations.get(teamId);
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

    zammadOrganizations.set(teamId, result.body.id);
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
      organization_id: owner ? zammadOrganizations.get(owner) : null,
    };

    const existing = zammadUsers.get(email);
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

    zammadUsers.set(email, result.body.id);
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
  });
}

main({ redisUrl, apiUrl, frontendApiSecret, zammadUrl, zammadSecret }).catch(
  (err: unknown) => {
    console.error(err);
  },
);
