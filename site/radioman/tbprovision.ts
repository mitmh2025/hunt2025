import { type ClientInferResponseBody } from "@ts-rest/core";
import { type contract, check, Client } from "./tbapi";

const baseUrl = process.env.TB_BASE_URL ?? "http://localhost:8080";
const sysadminUsername = "sysadmin@thingsboard.org";
const sysadminPassword = process.env.TB_SYSADMIN_PASSWORD ?? "sysadmin";

async function main() {
  const client = new Client({
    baseUrl,
    username: sysadminUsername,
    password: sysadminPassword,
  });
  const sysadmin = await client.client.auth.getUser().then(check);
  console.log("User", sysadmin);
  // Set sysadmin's password
  // TODO
  // Create a tenant
  const tenant: ClientInferResponseBody<
    (typeof contract)["tenant"]["save"],
    200
  > =
    (await client.listTenants())[0] ??
    (await client.client.tenant
      .save({
        body: {
          title: "Hunt 2025",
        },
      })
      .then(check));
  console.log("Found tenant", tenant);
  const users = await client.listTenantUsers(tenant.id.id);
  console.log("Tenant users", users);
  const username = process.env.TB_USERNAME;
  const password = process.env.TB_PASSWORD;
  if (username && password) {
    console.log("Creating user");
    const user = users.find((u) => u.email === username);
    if (user) {
      // Set password
    } else {
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
      console.log("Created", created);
      const activationLink: string = await client.client.user
        .getActivationLink({
          params: {
            userId: created.id.id,
          },
        })
        .then(check);
      console.log("Activation link", activationLink);
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
    }
  }
}
main().catch((err: unknown) => {
  console.error(err);
});
