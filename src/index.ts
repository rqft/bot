import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import { replacer } from "./functions/replacer";
import globalConf from "./globalConf";
import { onCommand } from "./handlers/command";
import { messages } from "./messages";
export const client = new Client({
  allowedMentions: {
    users: [],
    repliedUser: false,
  },
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
