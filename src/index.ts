import Discord from "discord.js";
import fs from "fs";
import { commandHandler } from "./handlers/commandHandler";
import { discordjsError } from "./handlers/discordjsError";
import { onReady } from "./handlers/onReady";
import { setUserPresence } from "./handlers/setUserPresence";
import { config } from "./logs/config";
import { path } from "./logs/globals";
export const client = new Discord.Client({
  ws: {
    properties: {
      $browser: config.bot.presence.browser,
    },
  },
});
export const commands = new Discord.Collection();
export const commandFiles = fs
  .readdirSync(path)
  .filter((file) => file.endsWith(".js"));
commandFiles.forEach((file) => {
  const command = require(`${path}/${file}`);
  commands.set(command.name, command);
});

client.once("ready", onReady());
client.on("error", discordjsError);
client.on("message", commandHandler);
client.login(config.bot.token);

/**
 * Presence Stuff
 */

setUserPresence();
