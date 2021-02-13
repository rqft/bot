import { GuildChannel } from "discord.js";
import { client } from "..";
import { ICommand } from "../interfaces/ICommand";
const tests = ["error"];
module.exports = {
  name: "test",
  description: "TESTING",
  restrictions: {
    ownerOnly: true,
  },
  async run(message, args) {
    switch (args[0]) {
      case "error":
        if (!args[1])
          return await message.channel.send("You need to specify a message");
        client.emit("error", {
          message: args.slice(1).join(" "),
          name: `Error at [${this.name}]`,
          stack: `from #${
            message.channel instanceof GuildChannel
              ? message.channel.name
              : `a DM`
          } by ${message.author.tag}`,
        });
        break;
      default:
        return await message.channel.send(
          `Unknown test. Valid tests are ${tests
            .map((e) => `\`${e}\``)
            .join(", ")}`
        );
    }
  },
} as ICommand;
