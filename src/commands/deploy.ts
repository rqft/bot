import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "deploy",
  restrictions: {
    ownerOnly: true,
  },
  async run(message) {
    exec(`npm run p/deploy`);
    await message.channel.send(
      ":white_check_mark: Deployed @ https://github.com/arcy-at/Hallucinate"
    );
  },
} as ICommand;
