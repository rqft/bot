import Discord, { ActivityOptions } from "discord.js";
import { INTEGER, Sequelize, STRING, TEXT } from "sequelize";
import { config } from "./config";
import { formatID } from "./functions/formatID";
import { regexes } from "./globals";
import { commandHandler } from "./handlers/commandHandler";
import { discordjsError } from "./handlers/discordjsError";
import { fetchCommandFiles } from "./handlers/fetchCommandFiles";
import { makeCommands } from "./handlers/makeCommandFromFile";
import { onReady } from "./handlers/onReady";
import { runCommandManager } from "./handlers/runCommandManager";
import { setUserPresence } from "./handlers/setUserPresence";
import { ICommand } from "./interfaces/ICommand";
import { logError } from "./logs/logError";
/**
 * Presence Stuff
 */

setUserPresence();
export const client = new Discord.Client({
  intents: Discord.Intents.ALL,
  ws: {
    properties: {
      $browser: config.bot.presence.browser,
    },
  },
  allowedMentions: {
    roles: [],
    users: [],
    repliedUser: false,
  },
  retryLimit: 10,
  presence: {
    activity: {
      name: config.bot.presence.activity.name,
      type: config.bot.presence.activity.type as ActivityOptions["type"],
    },
    afk: true,
    // status: "idle",
  },
});
export const commands = new Discord.Collection<any, ICommand>();
export const commandFiles = fetchCommandFiles();
commandFiles.forEach(makeCommands(commands));
runCommandManager(commands);
export const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});
export const Tags = sequelize.define("tags", {
  name: {
    type: STRING,
    unique: true,
  },
  description: TEXT,
  username: STRING,
  usage_count: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});
client.once("ready", async () => {
  Tags.sync();
  onReady();
});
client.on("error", (e) => discordjsError(e));
client.on("message", async (message) => {
  // if (message.channel.type == "dm")
  //   console.log(`ok from ${message.author.tag}`);
  const sexes = message.content.match(regexes.sex);
  if (sexes) {
    if (message.author !== client.user && !message.author.bot) {
      try {
        message.author.send(`No sex :bangbang:`);
      } catch (e) {}
      await message.react("😳");
    }

    config.global.sexAlarm.forEach(async (e) => {
      if (client.user == message.author && message.channel.type == "dm") return;
      if (message.author.bot) return;
      ((await client.channels.fetch(e)) as Discord.TextChannel).send(
        `${message.author} ${formatID(message.author.id)} has **sexed** __${
          sexes.length
        } time${sexes.length == 1 ? "" : "s"}__ in ${
          message.guild ? message.channel : "DMs"
        } ${formatID(message.channel.id)} ${
          message.guild && message.guild.id !== config.global.mainServerID
            ? `on \`${message.guild.name}\` ${formatID(message.guild.id)}`
            : ""
        }`
      );
    });
  }
  await commandHandler(message);
});
process.on("uncaughtException", (e) => logError(e));
client.login(config.bot.token);
client.on("guildCreate", onReady);
