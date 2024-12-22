import { readFile } from "fs/promises";
import pRetry from "p-retry"; // eslint-disable-line import/default, import/no-named-as-default -- eslint fails to parse the import
import { check, Client, RuleChainDataSchema, type Tenant } from "./tbapi";
import { ThingsboardError } from "./tbtypes";

const baseUrl = process.env.TB_BASE_URL ?? "http://localhost:8080";
const sysadminUsername = "sysadmin@thingsboard.org";
const defaultSysadminPassword = "sysadmin";
const sysadminPassword = process.env.TB_SYSADMIN_PASSWORD ?? "sysadmin";
const tenantUsername = process.env.TB_USERNAME ?? "radioman@mitmh2025.com";
const tenantPassword = process.env.TB_PASSWORD ?? "radioman";
const ruleChainsPath = process.env.TB_RULE_CHAINS;

async function createSysadminClient({
  baseUrl,
  password,
}: {
  baseUrl: string;
  password: string;
}) {
  const client = new Client({
    baseUrl,
    username: sysadminUsername,
    password: password,
  });
  try {
    await client.client.auth.getUser();
    return client;
  } catch (e) {
    if (e instanceof ThingsboardError) {
      if (e.errorCode === 10) {
        // Invalid username or password
        console.log("Setting sysadmin password");
        const defaultClient = new Client({
          baseUrl,
          username: sysadminUsername,
          password: defaultSysadminPassword,
        });
        await defaultClient.client.auth
          .changePassword({
            body: {
              currentPassword: defaultSysadminPassword,
              newPassword: password,
            },
          })
          .then(check);
        return client;
      }
    }
    throw e;
  }
}

async function createTenant(client: Client): Promise<Tenant> {
  const tenants = await client.listTenants();
  if (tenants.length > 1) {
    throw new Error("expected one tenant");
  } else if (tenants[0]) {
    return tenants[0];
  }
  return await client.client.tenant
    .save({
      body: {
        title: "Hunt 2025",
      },
    })
    .then(check);
}

async function createTenantAdmin(
  client: Client,
  tenant: Tenant,
  username: string,
  password: string,
) {
  const users = await client.listTenantUsers(tenant.id.id, {
    textSearch: username,
  });
  const user = users.find((u) => u.email === username);
  if (user) {
    // TODO: Set password
    return user;
  } else {
    console.log("Creating TENANT_ADMIN user");
    const created = await client.client.user
      .save({
        query: {
          sendActivationMail: "false",
        },
        body: {
          email: username,
          authority: "TENANT_ADMIN",
          tenantId: tenant.id,
        },
      })
      .then(check);
    const activationLink: string = await client.client.user
      .getActivationLink({
        params: {
          userId: created.id.id,
        },
      })
      .then(check);
    const activateToken = activationLink.split("=")[1];
    if (!activateToken) {
      throw new Error("Unable to parse activation URL");
    }
    const activationResult = await client.loginClient
      .activateUser({
        query: { sendActivationMail: "false" },
        body: {
          activateToken,
          password,
        },
      })
      .then(check);
    console.log("Activation result", activationResult);
    return created;
  }
}

async function createDeviceProfiles(client: Client) {
  const existing = await client.listDeviceProfiles();
  const existingByName = new Map(existing.map((d) => [d.name, d]));
  console.log("Existing device profiles", existingByName);
  for (const name of ["radio", "giant-switch"]) {
    if (!existingByName.has(name)) {
      await client.client.deviceProfile
        .save({
          body: {
            name,
            type: "DEFAULT",
            transportType: "DEFAULT",
            profileData: {
              configuration: {
                type: "DEFAULT",
              },
              transportConfiguration: {
                type: "DEFAULT",
              },
            },
          },
        })
        .then(check);
    }
  }
}

async function importRuleChains(client: Client, path: string) {
  const ruleChainData = RuleChainDataSchema.parse(
    JSON.parse(await readFile(path, "utf-8")),
  );
  const result = await client.client.ruleChain
    .import({
      body: ruleChainData,
      query: {
        overwrite: true,
      },
    })
    .then(check);
  console.log("Imported rule chains", result);
}

async function main() {
  await pRetry(
    async () => {
      const health = (await fetch(`${baseUrl}/actuator/health`).then((r) =>
        r.json(),
      )) as { status?: string };
      if (health.status !== "UP") {
        throw new Error(`unexpected health ${JSON.stringify(health)}`);
      }
    },
    {
      retries: 100,
      maxRetryTime: 300000,
      minTimeout: 500,
      maxTimeout: 10000,
      onFailedAttempt(error) {
        console.log("ThingsBoard is not ready yet", error);
      },
    },
  );
  // Set sysadmin's password
  const sysadminClient = await createSysadminClient({
    baseUrl,
    password: sysadminPassword,
  });
  // Create a tenant
  const tenant = await createTenant(sysadminClient);
  console.log("Found tenant", tenant);
  const tenantAdmin = await createTenantAdmin(
    sysadminClient,
    tenant,
    tenantUsername,
    tenantPassword,
  );
  console.log("Found tenant admin", tenantAdmin);
  const client = new Client({
    baseUrl,
    username: tenantUsername,
    password: tenantPassword,
  });
  await createDeviceProfiles(client);
  if (ruleChainsPath !== undefined) {
    await importRuleChains(client, ruleChainsPath);
  }
}
main().catch((err: unknown) => {
  console.error(err);
});
