import { check, Client, type Tenant, ThingsboardError } from "./tbapi";

const baseUrl = process.env.TB_BASE_URL ?? "http://localhost:8080";
const sysadminUsername = "sysadmin@thingsboard.org";
const defaultSysadminPassword = "sysadmin";
const sysadminPassword = process.env.TB_SYSADMIN_PASSWORD ?? "sysadmin";
const tenantUsername = process.env.TB_USERNAME ?? "radioman@hunt";
const tenantPassword = process.env.TB_PASSWORD ?? "radioman";

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

async function main() {
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
}
main().catch((err: unknown) => {
  console.error(err);
});
