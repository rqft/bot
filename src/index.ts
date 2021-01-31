import RPC from "discord-rpc";
import Discord from "discord.js";
import fs from "fs";
import { pid } from "process";
import { config } from "./config";
import { path } from "./globals";
import { ICommand } from "./interfaces/ICommand";
import { activityType } from "./types/activityType";
export const client = new Discord.Client({
  ws: {
    properties: {
      $browser: config.bot.presence.browser,
    },
  },
});
const commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync(path)
  .filter((file) => file.endsWith(".js"));
commandFiles.forEach((file) => {
  const command = require(`${path}/${file}`);
  commands.set(command.name, command);
});
client.once("ready", () => {
  client.user?.setPresence({
    activity: {
      name: config.bot.presence.text,
      type: config.bot.presence.activityType as activityType,
    },
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
   * Restriction Stuff
   */
  if (
    command.restrictions &&
    command.restrictions.ownerOnly &&
    !config.bot.ownerIds.includes(message.author.id)
  )
    return message.reply("no");

  if (
    command.restrictions &&
    command.restrictions.guildOnly &&
    message.channel.type === "dm"
  )
    return message.reply("I can't execute that command inside DMs!");

  if (command.usesArgs && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  try {
    command.run(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});
client.login(config.bot.tokenA + config.bot.tokenB);
const cc = new RPC.Client({
  transport: "ipc",
});
//
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
