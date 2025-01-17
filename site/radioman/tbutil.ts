import { Command, Option } from "commander";
import { Client } from "./tbapi";
import { type EntityData } from "./tbws";

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
    if (result.status === 200) {
      for (const rc of result.body.ruleChains) {
        delete rc.version;
      }
      for (const rcm of result.body.metadata) {
        delete rcm.version;
      }
      process.stdout.write(JSON.stringify(result.body, undefined, 2));
    }
  });

  program
    .command("watch-telemetry")
    .argument("<device-id>")
    .action(async (entityId: string) => {
      const client = newClient();

      const ws = await client.connectWS();

      const initialData = await ws.sendCommand(
        {
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
        },
        (msg) => {
          console.log("sub update", msg);
        },
      );
      console.log("initial data", initialData);
      await new Promise((resolve) => {
        process.once("SIGINT", resolve);
      });
    });

  program
    .command("radio2sdrangel")
    .argument("<device-id>")
    .option("-d, --device <device>", "device index", "0")
    .option("-c, --channel <channel>", "channel index", "0")
    .action(
      async (
        entityId: string,
        options: {
          device: string;
          channel: string;
        },
      ) => {
        const client = newClient();

        const ws = await client.connectWS();

        console.log("options", options);

        const updateSdrangel = (msg: EntityData) => {
          (async () => {
            const str = msg.latest.TIME_SERIES?.fm_frequency?.value;
            if (!str) {
              return;
            }
            const freq = parseInt(str, 10) * 1000;
            const deviceSet = (await (
              await fetch(
                `http://127.0.0.1:8091/sdrangel/deviceset/${options.device}`,
              )
            ).json()) as {
              channels: {
                deltaFrequency: number;
                id: string;
              }[];
              samplingDevice: {
                centerFrequency: number;
              };
            };
            const { centerFrequency } = deviceSet.samplingDevice;
            const inputFrequencyOffset = freq - centerFrequency;
            console.log("Tuning to", freq, inputFrequencyOffset);
            await fetch(
              `http://127.0.0.1:8091/sdrangel/deviceset/${options.device}/channel/${options.channel}/settings`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  channelType: "BFMDemod",
                  direction: 0,
                  BFMDemodSettings: {
                    inputFrequencyOffset,
                  },
                }),
              },
            );
          })().catch((e: unknown) => {
            console.log("failed to sync frequency", e);
          });
        };

        const initialData = await ws.subscribeTelemetry(
          {
            type: "entityList",
            entityType: "DEVICE",
            entityList: [entityId],
          },
          [
            {
              type: "TIME_SERIES",
              key: "fm_frequency",
            },
          ],
          updateSdrangel,
        );
        console.log("initial data", initialData);
        await new Promise((resolve) => {
          process.once("SIGINT", resolve);
        });
      },
    );

  await program.parseAsync();
}

main().catch((err: unknown) => {
  console.error(err);
});
