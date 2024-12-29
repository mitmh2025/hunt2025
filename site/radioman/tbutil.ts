import { Command, Option } from "commander";
import { Client } from "./tbapi";

async function main() {
  const program = new Command();
  program
    .addOption(
      new Option("--username <username>")
        .default("radioman@mitmh2025.com")
        .env("TB_USERNAME"),
    )
    .addOption(
      new Option("--password <password>")
        .default("radioman")
        .env("TB_PASSWORD"),
    )
    .addOption(
      new Option("-u, --base-url <url>")
        .default("http://localhost:8080")
        .env("TB_BASE_URL"),
    );

  const newClient = () => {
    const { username, password, baseUrl } = program.opts<{
      username: string;
      password: string;
      baseUrl: string;
    }>();
    return new Client({
      baseUrl,
      username,
      password,
    });
  };

  program.command("export-rule-chains").action(async () => {
    const client = newClient();
    const result = await client.client.ruleChain.export({
      query: { limit: 999 },
    });
    process.stdout.write(JSON.stringify(result, undefined, 2));
  });

  program
    .command("watch-telemetry")
    .argument("<device-id>")
    .action(async (entityId: string) => {
      const client = newClient();

      const ws = await client.connectWS();

      const initialData = await ws.sendCommand({
        type: "ENTITY_DATA",
        query: {
          entityFilter: {
            type: "entityList",
            entityType: "DEVICE",
            entityList: [entityId],
          },
          pageLink: {
            pageSize: 1000,
            page: 0,
          },
          latestValues: [
            {
              type: "TIME_SERIES",
              key: "fm_frequency",
            },
          ],
        },
        latestCmd: {
          keys: [
            {
              type: "TIME_SERIES",
              key: "fm_frequency",
            },
          ],
        },
      });
      console.log("initial data", initialData);
      await new Promise((resolve) => {
        process.once("SIGINT", resolve);
      });
    });

  await program.parseAsync();
}

main().catch((err: unknown) => {
  console.error(err);
});
