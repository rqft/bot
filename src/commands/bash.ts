import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "bash",
  aliases: ["shell", "ps"],
  restrictions: {
    ownerOnly: true,
  },
  description: "run a bash script",
  usage: `<script: text>`,
  async run(message, args) {
    exec(args.join(" "), async (err, std, ste) => {
      if (err)
        return await message.reply(`\`\`\`
Error on ${err.cmd} (${err.code}) [${err.signal}]

${err.name}: ${err.message}
${err.stack}
\`\`\``);
      else
        message.reply([std, ste].join("\n\n"), {
          split: { char: "\n" },
          code: "txt",
        });
    });
  },
} as ICommand;
