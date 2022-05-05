import { client, commands, interactions, selfclient } from "./globals";

commands.addMultipleIn("/commands/prefixed", { subdirectories: true });
interactions.addMultipleIn("/commands/interactions", { subdirectories: true });

commands.on("commandDelete", async (payload) => {
  await payload.reply.delete();
});

commands.on("commandResponseDelete", async (payload) => {
  await payload.context.message.delete();
});

(async function run() {
  await commands.run();
  await interactions.run();

  const all = [client, selfclient];
  for (const client of all) {
    await client.run();
    console.log(`ok connected with ${client.user?.tag}`);
  }
})();
