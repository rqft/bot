import { MessageEmbed } from "discord.js";
import { getPresence } from "../functions/getPresence";
import { getUser } from "../functions/getUser";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
module.exports = {
  name: "presence",
  aliases: ["pres"],
  description: "get user presence",
  usage: "[user: User]",
  async run(message, args) {
    const target = (await getUser(message, args, true)) ?? message.author;
    const pres = getPresence(target, 8888);
    message.reply(
      new MessageEmbed({
        description: pres,
        title: `Presence of ${target.tag}`,
        color: Color.embed,
      })
    );
  },
} as ICommand;
