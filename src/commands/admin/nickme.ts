import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "nickme",
  aliases: ["nm"],
  args: [
    {
      name: "content",
      required: false,
      type: "text",
    },
  ],
  restrictions: {
    level: 50,
    botPermissions: ["CHANGE_NICKNAME"],
  },
  async run(message, args) {
    var content = args.join(" ");
    content = content.toLowerCase() == "invisible" ? "឵឵" : content;
    if (message.guild?.me?.nickname == content)
      return await reply(message, messages.commands.other.nickme.already_nick);
    try {
      message.guild?.me?.edit({ nick: content });
    } catch {
      return await reply(message, messages.commands.other.nickme.failed_nick);
    }
    return await reply(message, messages.commands.other.nickme.done);
  },
} as ICommand;
