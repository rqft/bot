import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";

module.exports = {
  name: "bash",
  aliases: ["shell", "ps"],
  restrictions: {
    ownerOnly: true,
  },
  description: "run a bash script",
  usage: `<script: text>`,
  async run(message, args) {
    const ret = await message.reply(CustomEmojis.GUI_TYPING);
    exec(args.join(" "), async (err, std, ste) => {
      await ret.delete();
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
