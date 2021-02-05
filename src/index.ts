import Discord from "discord.js";
import { config } from "./config";
import { formatID } from "./functions/formatID";
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
  // console.log("a");
});
client.on("error", (err) => {
  discordjsError(err);
});
client.on("message", async (message) => {
  const sexes = message.content.match(/sex/gi);
  if (message.author !== client.user && sexes) {
    ((await client.channels.fetch(
      config.__global.sex_alarm
    )) as Discord.TextChannel).send(
      `${message.author} ${formatID(message.author.id)} has **sexed** __${
        sexes.length
      } time${sexes.length == 1 ? "" : "s"}__ in ${message.channel} ${formatID(
        message.channel.id
      )}`
    );
    await message.react("😳");
  }
  await commandHandler(message);
});
client.login(config.bot.token);

/**
 * Presence Stuff
 */

setUserPresence();
