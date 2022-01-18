import { app } from "./api/baseroute";
import { replacer, simpleGetLongAgo } from "./functions/tools";
import { altclients, client, commands, selfclient } from "./globals";
import { messages } from "./messages";

// commands.addMultipleIn("/commands/prefixed", { subdirectories: true });
commands.on("commandDelete", ({ reply }) => reply.delete());

app.listen(8080, () => {
  console.log(`[LISTEN] Listening on port 8080`);
});

(async function run() {
  const start = Date.now();
  await commands.run();
  const all = [client, selfclient, ...altclients];
  await Promise.all(
    all.map(async (value) => {
      value;
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
  console.log(
    "loaded commands",
    commands.commands.map((v) => v.name).join(", ")
  );
})();
