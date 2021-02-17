import { fetchCommand } from "../functions/fetchCommand";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "source",
  restrictions: {
    ownerOnly: true,
  },
  cooldown: 1,
  async run(message, args) {
    const cmd = fetchCommand(args.join(" "));
    if (!cmd) return await message.channel.send("Unknown Command");
    await message.channel.send(`\`\`\`json\n${JSON.stringify(
      cmd,
      null,
      2
    )}\`\`\`\`\`\`ts
// This is code from the TypeScript compilier

${cmd.run.toString()}
\`\`\``);
  },
} as ICommand;
