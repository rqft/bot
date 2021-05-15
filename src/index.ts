import { ShardClient } from "detritus-client";
import RPC from "discord-rpc";
import { pid } from "process";
import { findMessageWithObject } from "./functions/findMessage";
import { simpleGetLongAgo } from "./functions/getLongAgo";
import { makeFoundMessageEmbed } from "./functions/makeFoundMessageEmbed";
import { replacer } from "./functions/replacer";
import globalConf from "./globalConf";
import { altclients, commands, selfclient, trackedMessages } from "./globals";
import { messages } from "./messages";

//#region rich presence
if (globalConf.enableRichPresence) {
  const rpc = new RPC.Client({ transport: "ipc" });
  rpc.on("ready", () => {
    rpc.request("SET_ACTIVITY", {
      pid: pid,
      activity: {
        assets: {
          large_image: "glasses",
          large_text: "✅ sami is a furry",
        },
        // details: ``,
        buttons: [
          {
            label: "Discord",
            url: "https://arcy-at.github.io/discord",
          },
          {
            label: "Bot Invite",
            url: "https://discord.com/api/oauth2/authorize?client_id=760143615124439040&permissions=8&scope=bot%20applications.commands",
          },
        ],
      },
    });
  });
  // 790910161953882147 slashtags
  // 760143615124439040 vyb
  rpc.login({ clientId: "760143615124439040" });
}
commands.addMultipleIn("/commands", { subdirectories: true });
commands.on("commandDelete", ({ reply }) => reply.delete());
export var client: ShardClient;

async function run() {
  const start = Date.now();
  client = (await commands.run()) as ShardClient;

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
commands.client.on("messageCreate", async (payload) => {
  const link = (payload.message.content.match(
    /(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(\@me|\d+)\/(\d+)\/(\d+)/g
  ) ?? [])[0];
  if (!link) return;
  payload.message.referencedMessage = null;
  const message =
    (await findMessageWithObject(payload.message, link)) ?? payload.message;
  if (!message) return;
  const emb = await makeFoundMessageEmbed(payload.message, message);
  payload.message.reply({ embed: emb });
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
