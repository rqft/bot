import RPC from "discord-rpc";
import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import { pid } from "process";
import { simpleGetLongAgo } from "./functions/getLongAgo";
import { replacer } from "./functions/replacer";
import globalConf from "./globalConf";
import { onCommand } from "./handlers/command";
import { messages } from "./messages";
export const client = new Client({
  allowedMentions: globalConf.allowPings,
  intents: Intents.ALL,
});
client.once("ready", () => {
  if (!client.user) console.log(messages.client.unable_to_get_user);
  console.log(
    replacer(messages.client.logged_in, new Map([["{USER}", client.user!.tag]]))
  );
  client.user?.setActivity(
    `${globalConf.modules.commands.prefixes[0]} | ${client.guilds.cache.size} guilds`,
    {
      url: "https://www.youtube.com/watch?v=XSjN9c5zilY",
      type: "STREAMING",
      name: `${globalConf.modules.commands.prefixes[0]} | ${client.guilds.cache.size} guilds`,
    }
  );
});
client.on("ready", () => console.log(messages.client.ready));
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
client.login(globalConf.token);

const rpc = new RPC.Client({ transport: "ipc" });

rpc.on("ready", () => {
  rpc.request("SET_ACTIVITY", {
    pid: pid,
    activity: {
      assets: {
        large_image: "glasses",
        large_text: "uwu",
      },
      details: `for ${simpleGetLongAgo(Date.now() - 3.154e12)}`,
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

rpc.login({ clientId: "760143615124439040" });
// client.on("guildMemberAdd", async (member) => {
//   if (member.guild.id == "816362327678779392") await member.kick();
// });
