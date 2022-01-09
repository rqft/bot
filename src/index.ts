import { replacer, simpleGetLongAgo } from "./functions/tools";
import { altclients, client, commands, selfclient } from "./globals";
import { messages } from "./messages";

commands.addMultipleIn("/commands/prefixed", { subdirectories: true });
commands.on("commandDelete", ({ reply }) => reply.delete());

(async function run() {
  const start = Date.now();
  await commands.run();
  const all = [client, selfclient, ...altclients];
  await Promise.all(
    all.map(async (value) => {
      const s = Date.now();
      await value.run();
      console.log(
        replacer(messages.client.logged_in, [
          ["{TIME}", simpleGetLongAgo(s)],
          ["{USER}", value.user?.toString()],
          ["{GUILDS}", value.guilds.size],
          ["{MEMBERS}", value.users.size],
          ["{SHARDS}", value.shardCount],
        ])
      );
    })
  );
  console.log(`ok done in ${simpleGetLongAgo(start)}`);
  console.log(commands.commands.map((v) => v.name));
})();
