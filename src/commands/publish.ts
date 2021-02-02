import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "publish",
  async run(message, args) {
    exec(`npm run p/publish ${args.join(" ")}`);
    await message.channel.send(
      ":white_check_mark: Deployed @ https://github.com/arcy-at/Hallucinate"
    );
  },
} as ICommand;
