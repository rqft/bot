import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";
module.exports = {
  name: "test",
  async run(message, args) {
    const query = args.join(" ");
    exec(query, (_err, stdout, stderr) => {
      message.channel.send(
        [query, stdout, stderr].map((e) => `\`\`\`\n${e}\`\`\``).join("")
      );
    });
  },
} as ICommand;
