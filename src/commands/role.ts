import { MessageEmbed } from "discord.js";
import { capitalizeWords } from "../functions/capitalizeWords";
import { formatTimestamp } from "../functions/formatTimestamp";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { getRole } from "../functions/getRole";
import { getUserPermissions } from "../functions/getUserPermissions";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";

module.exports = {
  name: "role",
  description: "get roles",
  restrictions: {
    guildOnly: true,
  },
  usage: "<role: Role>",
  usesArgs: false,
  async run(message, args) {
    const role = getRole(message, args, true);
    if (!role) {
      return await message.reply("Unknown Role");
    }
    const col = role.color
      ? `https://singlecolorimage.com/get/${role.hexColor.replace(
          "#",
          ""
        )}/256x256`
      : undefined;
    const emb = new MessageEmbed();
    emb.setAuthor(`Role "${role.name}"`, col);
    emb.setColor(Color.embed);
    emb.addField(
      `❯ Role Info`,
      `${decor.Emojis.GEAR} **ID**: \`${role.id}\`
${decor.Emojis.LINK} **Role**: ${role}
${decor.Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
        +role.createdAt
      )} ${formatTimestamp(role.createdAt)}`
    );
    const posTop = message.guild!.roles.cache.find(
      (e) => e.position == role!.position + 1
    );
    const posLow = message.guild!.roles.cache.find(
      (e) => e.position == role!.position - 1
    );

    emb.addField(
      "❯ Position",
      `**${posTop ? posTop?.position : ""} ${
        posTop ? posTop : "-- Top Of Role list"
      }**
**- ${role.position} ${role}**
**${posLow ? posLow?.position : ""} ${
        posLow ? posLow : "-- Bottom Of Role list"
      }**`
    );
    emb.addField(
      "❯ Permissions",
      getUserPermissions(role)
        .map(
          (e) => `\`${capitalizeWords(e.toLowerCase().replace(/_/g, " "))}\``
        )
        .join(", ")
    );
    emb.addField(
      "❯ Members",
      role.members.size ? role.members.array().join(", ") : "None"
    );
    await message.reply(emb);
  },
} as ICommand;
