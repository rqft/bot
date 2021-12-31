import { replacer, simpleGetLongAgo } from "./functions/tools";
import { altclients, client, commands, selfclient } from "./globals";
import { messages } from "./messages";

commands.addMultipleIn("/commands", { subdirectories: true });
commands.on("commandDelete", ({ reply }) => reply.delete());

async function run() {
  const start = Date.now();
  await commands.run();
  const all = [client, selfclient, ...altclients];
  all.forEach(async (value) => {
    await value.run();
    console.log(
      replacer(messages.client.logged_in, [
        ["{TIME}", simpleGetLongAgo(start)],
        ["{USER}", value.user?.toString()],
        ["{GUILDS}", value.guilds.size],
        ["{MEMBERS}", value.users.size],
        ["{SHARDS}", value.shardCount],
      ])
    );
  });
}

run();
