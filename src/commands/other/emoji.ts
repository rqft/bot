import { api } from "../../functions/api";
import { getFileExtension } from "../../functions/getFileExtension";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "emoji",
  args: [
    {
      name: "emoji",
      required: true,
      type: "string",
    },
  ],
  async run(message, args) {
    let url = null;
    const emoj = args[0];
    if (!emoj!.replace(/\D/g, "")) {
      const hex = emoj!.codePointAt(0)!.toString(16);
      const result = "0000".substring(0, 4 - hex.length) + hex;
      url = `https://twemoji.maxcdn.com/v/13.0.2/72x72/${result}.png`;
    } else {
      url = `https://cdn.discordapp.com/emojis/${emoj?.replace(/\D/g, "")}.${
        emoj?.startsWith("<a:") ? "gif" : "png"
      }`;
    }
    const img = await api(url, "buffer");
    await message.reply(messages.commands.other.emoji, {
      files: [{ name: "emoji." + getFileExtension(url), attachment: img }],
    });
  },
} as ICommand;
