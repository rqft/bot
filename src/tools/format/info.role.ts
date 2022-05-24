import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Role } from "detritus-client/lib/structures";
import { PermissionsText } from "../../constants";
import { CustomEmojis, Emojis } from "../emojis";
import { Markdown } from "../markdown";
import { buildTimestampString, editOrReply, store } from "../tools";
import * as Basic from "./basic";
import { permissionsList } from "./basic";
import * as Embed from "./embed";
import * as Image from "./image";
export interface RoleArgs {
  role: Role;
}

export async function role(
  context: Context | InteractionContext,
  args: RoleArgs
) {
  const { role } = args;
  if (!role) {
    throw new Error("unknown role");
  }

  const embed = Embed.user(context);

  embed.setTitle(role.name);

  {
    let url: string;

    if (role.color) {
      console.log(role.color);
      const data = await Image.instance.imageColor(
        512,
        role.color.toString(16)
      );
      const attach = await store(data, "color.png");
      console.log(attach.url);
      url = attach.url!;
    }

    embed.setThumbnail(url!);
  }

  {
    const description: Array<string> = [];

    description.push(
      Basic.field(
        CustomEmojis.GUI_RICH_PRESENCE,
        "ID",
        Markdown.Format.codestring(role.id)
      )
    );

    if (role.color) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_ADD_FILE,
          "Color",
          `\`#${role.color.toString(16)}\``
        )
      );
    } else {
      description.push(Basic.field(CustomEmojis.GUI_ADD_FILE, "Color", "None"));
    }

    if (role.unicodeEmoji) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_EMOJI,
          "Emoji",
          Markdown.Format.codestring(role.unicodeEmoji)
        )
      );
    }

    if (role.createdAtUnix) {
      description.push(
        Basic.field(
          Emojis.CALENDAR,
          "Created At",
          buildTimestampString(role.createdAtUnix)
        )
      );
    }

    description.push(
      Basic.field(
        CustomEmojis.GUI_MEMBERS,
        "Members",
        role.members.size.toLocaleString()
      )
    );

    {
      const tags: Array<string> = [];
      if (role.tags) {
        if (role.tags.premiumSubscriber) {
          tags.push("Premium Role");
        }
      }

      if (role.hoist) {
        tags.push("Hoisted");
      }

      if (role.isBoosterRole) {
        tags.push("Booster Role");
      }
      if (role.isDefault) {
        tags.push("Default Role");
      }
      if (role.managed) {
        tags.push("Managed");
      }
      if (role.mentionable) {
        tags.push("Mentionable");
      }

      if (tags.length) {
        description.push(
          Basic.field(
            CustomEmojis.CHANNEL_STORE,
            "Tags",
            tags.map((x) => Markdown.Format.codestring(x)).join(", ")
          )
        );
      }
    }

    if (role.integrationId) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_ADD_FILE,
          "Integration ID",
          Markdown.Format.codestring(role.integrationId)
        )
      );
    }

    if (role.botId) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_DISCOVERY,
          "Bot ID",
          Markdown.Format.codestring(role.botId)
        )
      );
    }

    if (role.guild) {
      description.push(
        Basic.field(
          Emojis.SHIELD,
          "Server",
          `${Markdown.Format.link(
            role.guild.name,
            role.guild.jumpLink
          )} (${Markdown.Format.codestring(role.guild.id)})`
        )
      );
    }

    embed.addField("Info", description.join("\n"), true);
  }

  {
    const permissions = permissionsList(role);
    if (permissions.length) {
      embed.addField(
        "Permissions",
        permissions.map((x) => PermissionsText[String(x)]).join(", ")
      );
    }
  }

  return await editOrReply(context, { embed });
}
