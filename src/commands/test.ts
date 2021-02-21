import { GuildChannel } from "discord.js";
import { client } from "..";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";
const tests = ["error"];
module.exports = {
  name: "test",
  description: "TESTING",
  restrictions: {
    ownerOnly: true,
  },
  usage: "<test: Test>",
  async run(message, args) {
    switch (args[0]?.toLowerCase()) {
      case "error":
        if (!args[1])
          return await message.reply("You need to specify a message");
        client.emit("error", {
          message: args.slice(1).join(" "),
          name: `Error at [${this.name}]`,
          stack: `from #${
            message.channel instanceof GuildChannel
              ? message.channel.name
              : `a DM`
          } by ${message.author.tag}`,
        });
        await message.react(decor.Emojis.WHITE_CHECK_MARK);
        break;
      case "embed":
        if (!args[1])
          return await message.reply("you need to supply a valid embed");
        await message.reply("", {
          embed: JSON.parse(args.slice(1).join(" ")),
        });
        await message.react(decor.Emojis.WHITE_CHECK_MARK);
        break;
      case "setpresence":
        if (!args[1])
          return await message.reply("you need to supply a valid presence");
        await client.user?.setPresence(JSON.parse(args.slice(1).join(" ")));
        await message.react(decor.Emojis.WHITE_CHECK_MARK);
        break;
      default:
        return await message.reply(
          `Unknown test. Valid tests are ${tests
            .map((e) => `\`${e}\``)
            .join(", ")}`
        );
    }
  },
} as ICommand;
