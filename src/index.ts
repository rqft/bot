import { ShardClient } from "detritus-client";
import RPC from "discord-rpc";
import { pid } from "process";
import { PermissionString } from "./enums/utils";
import { bitfieldToArray } from "./functions/bitfieldToArray";
import { simpleGetLongAgo } from "./functions/getLongAgo";
import { replacer } from "./functions/replacer";
import globalConf from "./globalConf";
import { altclients, commands, selfclient } from "./globals";
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
            url:
              "https://discord.com/api/oauth2/authorize?client_id=760143615124439040&permissions=8&scope=bot%20applications.commands",
          },
        ],
      },
    });
  });
  // 790910161953882147 slashtags
  // 760143615124439040 vyb
  rpc.login({ clientId: "760143615124439040" });
}

commands.on("commandFail", async (payload) => {
  payload.context.message.reply(
    replacer(messages.error.error_running_command, [["{ERROR}", payload.error]])
  );
});
commands.on("commandError", async (payload) => {
  payload.context.message.reply(
    replacer(messages.error.error_running_command, [["{ERROR}", payload.error]])
  );
});
commands.on("commandPermissionsFail", async (payload) => {
  payload.context.message.reply(
    replacer(messages.permissions.missing_permissions, [
      [
        "{PERMISSIONS}",
        payload.permissions
          .map((e) => `\`${bitfieldToArray(e, PermissionString)}\``)
          .join(", "),
      ],
    ])
  );
});
export var client: ShardClient;
async function run() {
  require("./commands");
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
          `✅ Filled database with ${[client, selfclient, ...altclients].reduce(
            (prev, current) => prev + current.user?.guilds.size!,
            0
          )} guilds and ${[client, selfclient, ...altclients].reduce(
            (prev, current) => prev + current.users.size!,
            0
          )} members`
        );
      }, 60 * 1000)
    );
}
run();
export { selfclient };
