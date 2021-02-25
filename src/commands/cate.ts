import { api } from "../functions/api";
import { arrayToChunks } from "../functions/arrayToChunks";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";

module.exports = {
  name: "cate",
  aliases: ["catpic"],
  usage: "",
  usesArgs: false,
  description: "cats!",
  async run(message, args) {
    const ret = await message.reply(CustomEmojis.GUI_TYPING);
    const count = parseInt(args[0] ?? "1");
    const urls = [];
    for (let i = 0; i < count; i++) {
      urls.push((await api("http://aws.random.cat/meow", "json")).file);
    }
    await ret.delete();
    const urlGroups = arrayToChunks(urls, 5);
    urlGroups.forEach((url) => {
      message.channel.send(url.join("\n"));
    });
  },
} as ICommand;
