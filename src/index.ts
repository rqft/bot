import { Sarah } from "./api";
import { client, commands, interactions, selfclient } from "./globals";
import { Secrets } from "./secrets";

commands.addMultipleIn("/commands/prefixed", { subdirectories: true });
interactions.addMultipleIn("/commands/interactions", { subdirectories: true });

process.on("uncaughtException", (e) => {
  console.error(JSON.stringify(e, null, 2));
});

(async function run() {
  Sarah.listen(3000, () => {
    console.log(`opened ${Secrets.Host}`);
  });
  await commands.run();

  if (Secrets.ClearInteractions) {
    console.log("clearing global");
    await interactions.rest.bulkOverwriteApplicationCommands(
      interactions.client.applicationId,
      []
    );
    for (const guildId of Secrets.InteractionGuilds) {
      console.log(`clearing ${guildId}`);
      await interactions.rest.bulkOverwriteApplicationGuildCommands(
        interactions.client.applicationId,
        guildId,
        []
      );
    }
  }
  await interactions.run();

  const all = [client, selfclient];
  for (const client of all) {
    await client.run();
    console.log(`ok connected with ${client.user?.tag}`);
  }
})();
