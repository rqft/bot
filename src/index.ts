import Discord from "discord.js";
import { config } from "./config";
import { commandHandler } from "./handlers/commandHandler";
import { discordjsError } from "./handlers/discordjsError";
import { fetchCommandFiles } from "./handlers/fetchCommandFiles";
import { makeCommands } from "./handlers/makeCommandFromFile";
import { onReady } from "./handlers/onReady";
import { setUserPresence } from "./handlers/setUserPresence";
export const client = new Discord.Client({
  ws: {
    properties: {
      $browser: config.bot.presence.browser,
    },
  },
});
export const commands = new Discord.Collection();
export const commandFiles = fetchCommandFiles();
commandFiles.forEach(makeCommands(commands));

client.once("ready", () => {
  onReady();
});
client.on("error", (err) => {
  discordjsError(err);
});
client.on("message", (message) => {
  commandHandler(message);
});
client.login(config.bot.token);

/**
 * Presence Stuff
 */

setUserPresence();
