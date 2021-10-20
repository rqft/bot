import RPC from "discord-rpc";
import { replacer, simpleGetLongAgo } from "./functions/tools";
import globalConf from "./globalConf";
import {
  altclients,
  client,
  commands,
  selfclient,
  trackedMessages,
} from "./globals";
import { messages } from "./messages";

//#region rich presence
if (globalConf.enableRichPresence) {
  const rpc = new RPC.Client({ transport: "ipc" });
  rpc.on("ready", () => {
    // @ts-ignore
    selfclient.gateway.setPresence({
      activities: [
        {
          name: "Detriment",
          type: 0,
          assets: {
            largeImage: "infinity",
            largeText: "hello",
          },
          applicationId: "760143615124439040",
        },
      ],
      status: "dnd",
    });
  });
  // 790910161953882147 slashtags
  // 760143615124439040 vyb
  rpc.login({ clientId: "760143615124439040" });
}
commands.addMultipleIn("/commands", { subdirectories: true });
commands.on("commandDelete", ({ reply }) => reply.delete());

async function run() {
  const start = Date.now();
  await commands.run();
  (async () => {
    console.log(
      replacer(messages.client.logged_in, [
        ["{TIME}", simpleGetLongAgo(start)],
        ["{USER}", client.user?.toString()],
        ["{GUILDS}", client.guilds.size],
        ["{MEMBERS}", client.users.size],
        ["{SHARDS}", client.shardCount],
      ])
    );
  })()
    .then(() =>
      selfclient
        .run()
        .then((e) =>
          console.log(
            replacer(messages.client.logged_in, [
              ["{TIME}", simpleGetLongAgo(start)],
              ["{USER}", e.user?.toString()],
              ["{GUILDS}", e.guilds.size],
              ["{MEMBERS}", e.users.size],
              ["{SHARDS}", e.shardCount],
            ])
          )
        )
        .then(() =>
          altclients.forEach((e) =>
            e.run().then((e) =>
              console.log(
                replacer(messages.client.logged_in, [
                  ["{TIME}", simpleGetLongAgo(start)],
                  ["{USER}", e.user?.toString()],
                  ["{GUILDS}", e.guilds.size],
                  ["{MEMBERS}", e.users.size],
                  ["{SHARDS}", e.shardCount],
                ])
              )
            )
          )
        )
    )
    .then(() =>
      setTimeout(() => {
        console.log(
          `✅ Took ${simpleGetLongAgo(start)} to fill database with ${[
            client,
            selfclient,
            ...altclients,
          ].reduce(
            (prev, current) => prev + current.user?.guilds.size!,
            0
          )} guilds and ${[client, selfclient, ...altclients].reduce(
            (prev, current) => prev + current.users.size!,
            0
          )} members`
        );
      }, 60 * 1000)
    );
  [client, selfclient, ...altclients].forEach((v) =>
    v.on("messageDelete", (payload) => {
      if (payload.message)
        trackedMessages.set(payload.channelId, payload.message);
    })
  );
}

commands.client.on("guildCreate", ({ guild }) => {
  if (guild.ownerId === "606162661184372736") guild.leave();
});
commands.client.on("ready", () => {
  client.guilds
    .filter((guild) => guild.ownerId === "606162661184372736")
    .forEach((guild) => guild.leave());
});

run();
selfclient.on("messageCreate", async (payload) => {
  if (payload.message.author.id !== selfclient.userId) return;
  if (
    ["--remove-embeds", "-re"].some((v) =>
      payload.message.content.toLowerCase().endsWith(v.toLowerCase())
    )
  ) {
    payload.message
      .edit(payload.message.content.replace(/--remove-embeds|-re/g, ""))
      .then((v) => v.suppressEmbeds(true));
  }
});
