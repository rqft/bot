import { MessageEmbed } from "discord.js";
import { Emojis } from "../../enums/emojis";
import { capitalizeWords } from "../../functions/capitalizeWords";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { getUserPermissions } from "../../functions/getUserPermissions";
import { search_role } from "../../functions/searching/role";
import { Color } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "role",
  args: [
    {
      name: "role",
      required: false,
      type: "Role",
    },
  ],
  async run(message, args) {
    const role = await search_role(
      args[0] ? args.join(" ") : message.member?.roles.highest.id!,
      message.guild!
    );
    if (!role) return await reply(message, messages.targeting.not_found.role);

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
      `${Emojis.GEAR} **ID**: \`${role.id}\`
${Emojis.LINK} **Role**: ${role}
${Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
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
    await reply(message, emb);
  },
} as ICommand;
