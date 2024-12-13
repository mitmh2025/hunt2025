import { type ClientInferResponseBody } from "@ts-rest/core";
import { type authContract, check, Client } from "./tbapi";

const baseUrl = process.env.TB_BASE_URL ?? "http://localhost:8080";
const username = "sysadmin@thingsboard.org";
const password = process.env.TB_SYSADMIN_PASSWORD ?? "sysadmin";

async function main() {
  const client = new Client({
    baseUrl,
    username,
    password,
  });
  // Set sysadmin's password
  // TODO
  // Create a tenant
  const tenant: ClientInferResponseBody<
    (typeof authContract)["tenant"]["save"],
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
}
main().catch((err: unknown) => {
  console.error(err);
});
