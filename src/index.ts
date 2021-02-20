import Discord from "discord.js";
import { config } from "./config";
import { formatID } from "./functions/formatID";
import { CMDFilesPath } from "./globals";
import { commandHandler } from "./handlers/commandHandler";
import { discordjsError } from "./handlers/discordjsError";
import { fetchCommandFiles } from "./handlers/fetchCommandFiles";
import { makeCommands } from "./handlers/makeCommandFromFile";
import { onReady } from "./handlers/onReady";
import { setUserPresence } from "./handlers/setUserPresence";
import { ICommand } from "./interfaces/ICommand";
import "./logging-test";
import { color, TerminalColor } from "./types/TerminalColors";
/**
 * Presence Stuff
 */

setUserPresence();
export const client = new Discord.Client({
  ws: {
    properties: {
      $browser: config.bot.presence.browser,
    },
  },
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    roles: [],
    users: [],
  },
});
client.on("ready", () => console.log("ok"));
console.log(CMDFilesPath);
export const commands = new Discord.Collection<any, ICommand>();
export const commandFiles = fetchCommandFiles();
commandFiles.forEach(makeCommands(commands));
commands
  .array()
  .sort((a, b) => (a.name > b.name ? 1 : -1))
  .forEach((e) => {
    const consoleMessages = [];

    if (!e.description)
      consoleMessages.push(
        `it is recommended to set a ${color(
          "description",
          TerminalColor.normal.GREEN
        )} for the help menu page for this command`
      );
    if (!e.run)
      consoleMessages.push(
        `you must set a ${color("run()", TerminalColor.normal.BLUE)} function`
      );
    if (e.usage == undefined)
      consoleMessages.push(
        `it is recommended to set ${color(
          "usage",
          TerminalColor.normal.GREEN
        )} for the command`
      );
    if (consoleMessages.length)
      console.log(
        `${color("[COMMAND MANAGER]", TerminalColor.normal.MAGENTA)} ${
          e.name
        }:\n${consoleMessages.join("\n")}`
      );
  });
client.once("ready", async () => {
  onReady();
});
client.on("error", (e) => discordjsError(e));
client.on("message", async (message) => {
  const sexes = message.content.match(/sex/gi);
  if (sexes) {
    if (message.author !== client.user) {
      try {
        message.author.send(`No sex :bangbang:`);
      } catch (e) {}
      await message.react("😳");
    }
    config.global.sexAlarm.forEach(async (e) => {
      if (client.user == message.author && message.channel.type == "dm") return;
      ((await client.channels.fetch(e)) as Discord.TextChannel)
        .send(`...`)
        .then((e) =>
          e.edit(
            `${message.author} ${formatID(message.author.id)} has **sexed** __${
              sexes.length
            } time${sexes.length == 1 ? "" : "s"}__ in ${
              message.guild ? message.channel : "DMs"
            } ${formatID(message.channel.id)} ${
              message.guild && message.guild.id !== config.global.mainServerID
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
client.on("guildCreate", () => client.emit("ready"));
