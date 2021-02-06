import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "publish",
  restrictions: {
    ownerOnly: true,
  },
  usesArgs: true,
  usage: "<message: text>",
  async run(message, args) {
    exec("git add .");
    exec(`git commit -m "${args.join(" ")}"`, (_, stdout, _stderr) => {
      message.channel.send(`\`\`\`git commit -m "${args.join(
        " "
      )}"\`\`\`\`\`\`cmd
${[stdout, _stderr].join("\n\n")}\`\`\``);
    });
  },
} as ICommand;
