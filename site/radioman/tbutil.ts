import { Command, Option } from "commander";
import { Client } from "./tbapi";

async function main() {
  const program = new Command();
  program
    .addOption(
      new Option("--username")
        .default("radioman@mitmh2025.com")
        .env("TB_USERNAME"),
    )
    .addOption(new Option("--password").default("radioman").env("TB_PASSWORD"))
    .addOption(
      new Option("-u, --base-url")
        .default("http://localhost:8080")
        .env("TB_BASE_URL"),
    );

  program.command("export-rule-chains").action(async () => {
    const { username, password, baseUrl } = program.opts<{
      username: string;
      password: string;
      baseUrl: string;
    }>();
    const client = new Client({
      baseUrl,
      username,
      password,
    });
    const result = await client.client.ruleChain.export({
      query: { limit: 999 },
    });
    process.stdout.write(JSON.stringify(result, undefined, 2));
  });

  await program.parseAsync();
}

main().catch((err: unknown) => {
  console.error(err);
});
