import Discord from "discord.js";
import { config } from "./config";
import { formatID } from "./functions/formatID";
import { simpleGetLongAgo } from "./functions/getLongAgo";
import { commandHandler } from "./handlers/commandHandler";
import { discordjsError } from "./handlers/discordjsError";
import { fetchCommandFiles } from "./handlers/fetchCommandFiles";
import { makeCommands } from "./handlers/makeCommandFromFile";
import { onReady } from "./handlers/onReady";
import { setUserPresence } from "./handlers/setUserPresence";
import "./logging-test";
import { decor } from "./maps/emojiEnum";
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
client.on("error", (e) => discordjsError(e));
client.on("message", async (message) => {
  const sexes = message.content.match(/sex/gi);
  if (sexes) {
    if (message.author !== client.user) {
      message.author.send(`No sex :bangbang:`);
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

/**
 * LOGGING STUFF
 */

export const enum LoggingEmojis {
  DEPLOYED = decor.Emojis.PACKAGE,
  DEBUG = decor.Emojis.BUG,
  ERROR = decor.Emojis.NO_ENTRY,
  DISCONNECT = decor.Emojis.WRENCH,
  WARNING = decor.Emojis.WARNING,
}
function tm() {
  return `\`[${new Date().toLocaleTimeString().replace(/[^\d:]/g, "")}]\``;
}
function getCh() {
  return (client.channels.cache.get(
    config.global.logging_test
  ) as Discord.GuildChannel) as Discord.TextChannel;
}
client.on("ready", async () => {
  const ch = getCh();
  ch.send(
    `${tm()} ${LoggingEmojis.DEPLOYED} ${ch.guild.me?.displayName} ${formatID(
      client.user?.id!
    )} is ready.`
  );
});
// client.on("debug", async (text) => {
//   const ch = getCh();
//   ch.send(
//     `${tm()} ${LoggingEmojis.DEBUG} ${ch.guild.me?.displayName} ${formatID(
//       client.user?.id!
//     )} had a debug event.\`\`\`\n${text}\`\`\``
//   );
// });
client.on("error", async (text) => {
  const ch = getCh();
  ch.send(
    `${tm()} ${LoggingEmojis.ERROR} ${ch.guild.me?.displayName} ${formatID(
      client.user?.id!
    )} had an error.\`\`\`\n${text}\`\`\``
  );
});
client.on("disconnect", async (unknown, other) => {
  const ch = getCh();
  ch.send(
    `${tm()} ${LoggingEmojis.DISCONNECT} ${ch.guild.me?.displayName} ${formatID(
      client.user?.id!
    )} was disconnected. (${other}) \`\`\`\n${unknown}\`\`\``
  );
});
client.on("warn", async (warning) => {
  const ch = getCh();
  ch.send(
    `${tm()} ${LoggingEmojis.WARNING} ${ch.guild.me?.displayName} ${formatID(
      client.user?.id!
    )} sent a warning.\`\`\`\n${warning}\`\`\``
  );
});
client.on("invalidated", () => {
  const ch = getCh();
  ch.send(
    `${tm()} ${LoggingEmojis.ERROR} ${ch.guild.me?.displayName} ${formatID(
      client.user?.id!
    )} was invalidated.`
  );
});
client.on("rateLimit", (limit) => {
  const ch = getCh();
  ch.send(
    `${tm()} ${LoggingEmojis.ERROR} ${ch.guild.me?.displayName} ${formatID(
      client.user?.id!
    )} was ratelimited (limit: ${limit.limit}) on event \`${
      limit.method
    }\` for ${simpleGetLongAgo(Date.now() - limit.timeout)}.
Path: https://discord.com/api${limit.path}
Time Difference: ${limit.timeDifference ?? 0}`
  );
});
