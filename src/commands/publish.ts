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
    await exec(`git commit -m ${args.join(" ")}`, (_, stdout, _stderr) => {
      message.channel.send([stdout, _stderr].join("\n\n"), { code: "bash" });
    });
    await message.channel.send(
      ":white_check_mark: Deployed @ https://github.com/arcy-at/Hallucinate"
    );
  },
} as ICommand;
//
