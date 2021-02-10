import Discord from "discord.js";
import { config } from "./config";
import { formatID } from "./functions/formatID";
// import { formatID } from "./functions/formatID";
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
  if (sexes && !config.global.sexAlarm.includes(message.channel.id)) {
    if (message.author !== client.user) {
      message.author.send(`No sex :bangbang:`);
      await message.react("😳");
    }
    config.global.sexAlarm.forEach(async (e) => {
      ((await client.channels.fetch(e)) as Discord.TextChannel)
        .send(`...`)
        .then((e) =>
          e.edit(
            `${message.author} ${formatID(message.author.id)} has **sexed** __${
              sexes.length
            } time${sexes.length == 1 ? "" : "s"}__ in ${
              message.guild ? message.channel : "DMs"
            } ${formatID(message.channel.id)} ${
              message.guild && message.guild.id !== config.global.guildId
                ? `on \`${message.guild.name}\` ${formatID(message.guild.id)}`
                : ""
            }`
          )
        );
    });
  }
  await commandHandler(message);
});
client.login(config.bot.token);
/**
 * Presence Stuff
 */

setUserPresence();
