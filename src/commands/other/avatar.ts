import { AllowedImageFormat, MessageEmbed } from "discord.js";
import { replacer } from "../../functions/replacer";
import { search_user } from "../../functions/searching/user";
import { Color } from "../../globals";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "avatar",
  aliases: ["av"],
  args: [
    {
      name: "target",
      required: false,
      type: "User | GuildMember",
    },
  ],
  async run(message, args) {
    const user = await search_user(
      args[0] ? args.join(" ") : message.member!.id
    );

    const emb = new MessageEmbed();

    const avs = ([
      "webp",
      "jpg",
      "png",
      "jpeg",
      "gif",
    ] as AllowedImageFormat[]).map(
      (e) => `[${e.toUpperCase()}](${user.avatarURL({ format: e })})`
    );

    emb.setImage(
      user.avatarURL({ dynamic: true, size: 4096 }) ?? user.defaultAvatarURL
    );
    emb.setDescription(
      replacer(
        messages.commands.other.avatar.avatar_of,
        new Map([
          ["{USER}", user.toString()],
          ["{URLS}", avs.join(" | ")],
        ])
      )
    );
    emb.setColor(Color.embed);
    await message.reply(emb);
  },
} as ICommand;
