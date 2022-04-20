import chalk from "chalk";
import {
  getVyboseGuildFlags,
  replacer,
  simpleGetLongAgo,
} from "./functions/tools";
import {
  altclients,
  client,
  commands,
  interactions,
  KV,
  selfclient,
} from "./globals";

commands.addMultipleIn("/commands/prefixed", { subdirectories: true });
commands.on("commandDelete", ({ reply }) => reply.delete());

interactions.addMultipleIn("/commands/interactions", { subdirectories: true });

(async function run() {
  const start = Date.now();
  await commands.run();

  await interactions.checkAndUploadCommands();
  await interactions.run();
  const all = [client, selfclient, ...altclients];

  await Promise.all(
    all.map(async (value) => {
      value;
      const s = Date.now();
      await value.run();

      console.log(
        replacer(
          `✅ Took ${chalk.yellow("{TIME}")} to deploy ${chalk.red(
            "{USER}"
          )} (uploading ${chalk.green("{GUILDS} guilds")} and ${chalk.blue(
            "{MEMBERS} members"
          )}) with a ${chalk.redBright("shard count of {SHARDS}")}`,
          [
            ["{TIME}", simpleGetLongAgo(s)],
            ["{USER}", value.user?.toString() + " (" + value.user?.id + ")"],
            ["{GUILDS}", value.guilds.size],
            ["{MEMBERS}", value.users.size],
            ["{SHARDS}", value.shardCount],
          ]
        )
      );
    })
  );
  console.log(`ok done in ${simpleGetLongAgo(start)}`);
  console.log(
    "\nloaded commands:\n" +
      commands.commands
        .map((v) => v.name)
        .sort()
        .join(", ")
  );
  console.log(
    "\nloaded interactions:\n" +
      interactions.commands
        .map(
          (v) =>
            `${
              [
                "Unknown",
                "Slash",
                "Context Menu (User)",
                "Context Menu (Message)",
              ][v.type]
            } > ${v.name}`
        )
        .join("\n")
  );
  console.log(
    `\ndeployed to ${client.guilds.size} guilds\n` +
      client.guilds
        .map((v) => `${getVyboseGuildFlags(v).join(" ")} ${v.name} (${v.id})`)
        .join("\n")
  );
  console.log(KV.tags.path());
})();
