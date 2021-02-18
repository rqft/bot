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
console.log(CMDFilesPath);
export const commands = new Discord.Collection<any, ICommand>();
export const commandFiles = fetchCommandFiles();
commandFiles.forEach(makeCommands(commands));
export async function makeServerSlashCommand(
  id: string = config.global.mainServerID,
  data: object,
  response: object
) {
  // @ts-ignore
  const interaction = client.api
    // @ts-ignore
    .applications(client.user?.id)
    .guilds(id)
    .commands.post({
      data: data,
    });
  // @ts-ignore
  client.ws.on("INTERACTION_CREATE", async (interaction) => {
    // @ts-ignore
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: response,
    });
  });
}
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
