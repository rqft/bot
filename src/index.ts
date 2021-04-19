import RPC from "discord-rpc";
import {
  Client,
  Collection,
  Guild,
  Intents,
  Message,
  TextChannel,
} from "discord.js";
import fs from "fs";
import { pid } from "process";
import "./api";
import { runapi } from "./api";
import { simpleGetLongAgo } from "./functions/getLongAgo";
import { replacer } from "./functions/replacer";
import globalConf from "./globalConf";
import { onCommand } from "./handlers/command";
import { messages } from "./messages";
// import "./oauth";

export const client = new Client({
  allowedMentions: globalConf.allowPings,
  intents: Intents.ALL,
  messageCacheLifetime: 9,
  restTimeOffset: 0,
  ws: {
    properties: {
      $browser: "Discord iOS",
    },
  },
  http: {
    version: 8,
  },
});

client.once("ready", () => {
  if (!client.user) console.log(messages.client.unable_to_get_user);
  console.log(
    replacer(messages.client.logged_in, [["{USER}", client.user!.tag]])
  );
  // client.user?.setActivity(
  //   `${globalConf.modules.commands.prefixes[0]} | ${client.guilds.cache.size} guilds`,
  //   {
  //     url: "https://www.youtube.com/watch?v=XSjN9c5zilY",
  //     type: "STREAMING",
  //     name: `${globalConf.modules.commands.prefixes[0]} | ${client.guilds.cache.size} guilds`,
  //   }
  // );
});
// var DELAY = 0;
client.on("ready", async () => {
  console.log(messages.client.ready);
  console.log(
    `Current guilds (${client.guilds.cache.size}):\n${client.guilds.cache
      .array()
      .map((e) => `${e.name.normalize().padEnd(60)} [${e.id}]`)
      .join("\n")}`
  );
  runapi();
});
export const commands = new Collection<string, any>();
export const commandFolders = fs.readdirSync(__dirname + "\\commands");
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(__dirname + `\\commands\\${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    commands.set(command.name, command);
  }
}
client.on("message", onCommand);
client.on("messageUpdate", async (_oldMessage, newMessage) => {
  if (newMessage instanceof Message) await onCommand(newMessage); // fuck partials
});
client.login(globalConf.token);
if (globalConf.enableRichPresence) {
  const rpc = new RPC.Client({ transport: "ipc" });

  rpc.on("ready", () => {
    var da = simpleGetLongAgo(Date.now() - 3.154e139);
    console.log(da);
    rpc.request("SET_ACTIVITY", {
      pid: pid,
      activity: {
        assets: {
          large_image: "glasses",
          large_text: "✅ sami is a furry",
        },
        details: `🎷`,
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
// client.on("guildMemberAdd", async (member) => {
//   if (member.guild.id == "816362327678779392") await member.kick();
// });
export const errFn = async (type: string, e: any, send: boolean = true) => {
  console.error(e);
  if (!send) return;
  (client.channels.cache.get("823677959700480000") as TextChannel).send(
    `❌ New ${type} event: \`\`\`\n${e}\`\`\``
  );
};
client.on("error", async (e) => errFn("error", e));
Guild.prototype;

console.log(globalConf.botInvite.url());
