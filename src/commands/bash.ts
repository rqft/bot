import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "bash",
  aliases: ["shell", "ps"],
  restrictions: {
    ownerOnly: true,
  },
  usage: `<a: text>`,
  async run(message, args) {
    exec(args.join(" "), async (err, std, ste) => {
      if (err)
        return await message.channel.send(`\`\`\`
Error on ${err.cmd} (${err.code}) [${err.signal}]

${err.name}: ${err.message}
${err.stack}
\`\`\``);
      else message.channel.send(`\`\`\`\n${[std, ste].join("\n\n")}\`\`\``);
    });
  },
} as ICommand;
