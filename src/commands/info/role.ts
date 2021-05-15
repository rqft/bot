import { Command, CommandClient } from "detritus-client";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import { capitalizeWords } from "../../functions/capitalizeWords";
import { findRole } from "../../functions/findRole";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { getUserPermissions } from "../../functions/getUserPermissions";
import { Color, CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";

export default class RoleCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "role",
      name: "role",
      args: [
        {
          name: "global",
          aliases: ["g"],
          default: false,
          type: "bool",
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const role = findRole(
      args.role === "" ? context.member?.highestRole!.id! : args.role,
      context.guild!,
      args.global
    );
    if (!role) throw new CustomError("I can't find that role");
    const col = role.color
      ? `https://singlecolorimage.com/get/${role.color.toString(16)}/256x256`
      : undefined;
    const emb = generateEmbed({
      user: context.user,
      color: role.color ?? Color.embed,
    });
    const flags = [
      role.isBoosterRole ? CustomEmojis.BADGE_SERVER_BOOSTER : undefined,
      role.mentionable ? CustomEmojis.GUI_MENTION : undefined,
      role.hoist ? CustomEmojis.GUI_REPLY : undefined,
      role.managed ? CustomEmojis.GUI_SETTINGS : undefined,
      role.members.size === 1 && role.members.has(role.guild!.ownerId)
        ? CustomEmojis.GUI_OWNERCROWN
        : undefined,
      role.isDefault ? CustomEmojis.GUI_SLASH_COMMAND : undefined,
    ];
    emb.setTitle(
      `${flags.filter((v) => v !== undefined).join(" ")} Role "${role.name}"`
    );
    if (col) emb.setThumbnail(col);
    emb.addField(
      `❯ Role Info`,
      `${Emojis.GEAR} **ID**: \`${role.id}\`
${Emojis.LINK} **Role**: ${role.mention}
${Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
        +role.createdAt
      )} ago ${formatTimestamp(role.createdAt)}
${CustomEmojis.GUI_SETTINGS} **From**: \`${role.guild!.name}\` **[**||\`${
        role.guildId
      }\`||**]**`
    );
    if (role.guildId === context.guildId) {
      const posTop = context.guild!.roles.find(
        (e) => e.position == role!.position + 1
      );
      const posLow = context.guild!.roles.find(
        (e) => e.position == role!.position - 1
      );

      emb.addField(
        "❯ Position",
        `**${posTop ? `- ${posTop.position}` : ""} ${
          posTop ? posTop.mention : "-- Top of role list --"
        }**
    **- ${role.position} ${role.mention}**
    **${posLow ? `- ${posLow.position}` : ""} ${
          posLow ? posLow.mention : "-- Bottom of role list --"
        }**`
      );
    }
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
      role.members.size
        ? role.members
            .map((v) => v.mention)
            .slice(0, 8)
            .join(", ")
        : "None"
    );
    await context.editOrReply({ embed: emb });
  }
}
