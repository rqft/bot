import fs from "fs";
import { fetchCommand } from "../functions/fetchCommand";
import { getFileExtension } from "../functions/getFileExtension";
import { ICommand } from "../interfaces/ICommand";
module.exports = {
  name: "source",
  restrictions: {
    ownerOnly: true,
  },
  description: "get source of a file/command",
  usage: '<type: "command" | "file"> <target: string | Path>',
  cooldown: 1,
  async run(message, args) {
    switch (args[0]) {
      default:
        await message.channel.send("invalid type");
        break;
      case "command":
        const cmd = fetchCommand(args.slice(1).join(" "));
        if (!cmd) return await message.channel.send("Unknown Command");
        await message.channel.send(
          `Configuration: \`\`\`json\n${JSON.stringify(cmd, null, 2)}\`\`\``
        );
        await message.channel.send(cmd.run.toString(), {
          code: "ts",
          split: { char: "\n" },
        });
        break;
      case "file":
        //
        var file;
        try {
          file = fs.readFileSync(args.slice(1).join(" "));
        } catch (e) {
          await message.channel.send(e, { code: "txt" });
        }
        if (!file) return await message.channel.send("Unknown file");
        console.log(getFileExtension(args.slice(1).join(" ")));
        await message.channel.send(file.toString(), {
          code: "ts",
          split: { char: "\n" },
        });
    }
  },
} as ICommand;
