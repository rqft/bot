// presence stuff
import RPC from "discord-rpc";
// other
import Discord from "discord.js";
import fs from "fs";
import { pid } from "process";
import { config } from "./config";
import { formatID } from "./functions/formatID";
import { path } from "./globals";
import { ICommand } from "./interfaces/ICommand";
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
client.once("ready", () => {
  client.user?.setActivity(config.bot.presence.activity.name, {
    name: "H",
    type: "STREAMING",
    url:
      "https://www.youtube.com/watch?v=db_sYdSPD24&ab_channel=FalseNoise-Topic",
  });
  console.log("Ready");
});
client.on("message", async (message) => {
  // check for prefixes;
  const prefixRegex = new RegExp(
    `^(${config.bot.prefixes.join("|")})( ?)`,
    "gi"
  );
  if (message.content.match(prefixRegex) == null) return;
  const prefix = message.content.match(prefixRegex)!.join("");

  /**
   * Arguments passed to the command
   */
  const args = message.content.slice(prefix!.length).trim().split(/ +/);
  const commandName = args.shift()!.toLowerCase();

  /**
   * the set of commands owo
   */
  const command: ICommand =
    (commands.get(commandName) as ICommand) ||
    (commands.find(
      (cmd: any) => cmd.aliases && cmd.aliases.includes(commandName)
    ) as ICommand);

  /**
   * This is obvious lol
   */
  if (!command) return;

  /**
   * Blacklist
   */
  if (config.blacklist.users.includes(message.author.id)) {
    logBlacklistedUserAction(message);
    return;
  }

  /**
   * Restriction Stuff
   */
  if (
    command.restrictions &&
    command.restrictions.ownerOnly &&
    !config.bot.ownerIds.includes(message.author.id)
  )
    return message.channel.send(
      ":warning: Missing Permissions; You need: `Bot Owner`"
    );

  if (
    command.restrictions &&
    command.restrictions.guildOnly &&
    message.channel.type === "dm"
  )
    return message.channel.send(
      ":warning: I can't execute that command inside DMs!"
    );

  if (command.usesArgs && !args.length) {
    let reply = `:warning: You didn't provide any arguments;`;

    if (command.usage) {
      reply += ` The proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  try {
    command.run(message, args);
  } catch (error) {
    console.error(error);
    logCommandError(message, error);
    message.channel.send(`:warning: ${error}`);
  }
});
client.login(config.bot.token);

/**
 * Presence Stuff
 */

const cc = new RPC.Client({
  transport: "ipc",
});

cc.on("ready", () => {
  cc.request("SET_ACTIVITY", {
    pid: pid,
    activity: {
      assets: {
        large_image: "glasses",
      },
      buttons: [
        {
          label: "<3",
          url: "https://arcy-at.github.io/page/cutie",
        },
        {
          label: "hi",
          url:
            "https://discord.com/api/oauth2/authorize?client_id=760143615124439040&permissions=8&scope=bot",
        },
      ],
    },
  });
});
cc.login({ clientId: config.bot.application.clientId });

function logBlacklistedUserAction(message: Discord.Message) {
  config.logs.blacklist.userBlocked.forEach((e) => {
    const ch = client.channels.cache.get(e) as Discord.TextChannel;
    const channelName = message.channel.type == "dm" ? "DMs" : message.channel;
    const guildName = message.guild ? `on \`${message.guild.name}\`` : "";
    ch.send(
      `:warning: Blacklisted User **${message.author.tag}** ${formatID(
        message.author.id
      )} tried to use command ${
        message.cleanContent
      } in ${channelName} ${formatID(message.channel.id)} ${guildName} ${
        message.guild ? formatID(message.guild.id) : ""
      }`
    );
  });
}
function logCommandError(message: Discord.Message, error: Error) {
  config.logs.commands.onError.keys.forEach((e) => {
    const ch = client.channels.cache.get(e) as Discord.TextChannel;
    const channelName = message.channel.type == "dm" ? "DMs" : message.channel;
    const guildName = message.guild ? `on \`${message.guild.name}\`` : "";
    ch.send(
      `:x: **${message.author.tag}** ${formatID(
        message.author.id
      )} tried to use command ${
        message.cleanContent
      } in ${channelName} ${formatID(message.channel.id)} ${guildName} ${
        message.guild ? formatID(message.guild.id) : ""
      } and caused an error.
\`\`\`ts
${error}
\`\`\``
    );
  });
}
