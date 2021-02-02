import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "deploy",
  restrictions: {
    ownerOnly: true,
  },
  async run(message) {
    await exec(`git push -u origin main`, (_, stdout, _stderr) => {
      message.channel.send([stdout, _stderr].join("\n\n"), { code: "bash" });
    });
    await message.channel.send(
      ":white_check_mark: Deployed @ https://github.com/arcy-at/Hallucinate"
    );
  },
} as ICommand;
