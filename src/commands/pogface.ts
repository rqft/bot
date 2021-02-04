import { api } from "../functions/api";
import { ICommand } from "../interfaces/ICommand";
import { IPogFaceElement } from "../interfaces/IPogFaceElement";

module.exports = {
  name: "pogface",
  description: "POGER",
  aliases: ["pog"],
  usage: "",
  usesArgs: false,
  async run(message) {
    const url =
      "https://raw.githubusercontent.com/MattIPv4/pogchamp/master/build/history.json";
    const pogAPI = (await api(url)) as IPogFaceElement[];
    const face = pogAPI[~~(Math.random() * pogAPI.length)]?.img.large;
    await message.channel.send("poger", {
      files: [
        {
          name: "pog.png",
          attachment: face!,
        },
      ],
    });
  },
} as ICommand;
