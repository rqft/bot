import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { GuildVoiceRegion, VoiceRegionsText } from "../../constants";
import { CustomEmojis } from "../emojis";
import { Markdown } from "../markdown";
import { editOrReply } from "../tools";
import * as Basic from "./basic";
import * as Embed from "./embed";

export async function guild(context: Context | InteractionContext) {
  const { guild } = context;
  if (!guild) {
    throw new Error("Need to be in a guild");
  }

  const embed = Embed.user(context);

  {
    embed.setTitle(guild.name);
    if (guild.iconUrl) {
      embed.setThumbnail(guild.iconUrl);
    }

    if (guild.bannerUrl) {
      embed.setImage(guild.bannerUrl);
    }

    if (guild.description) {
      embed.setDescription(guild.description);
    }
  }

  {
    const description: Array<string> = [];
    description.push(
      Basic.field(
        CustomEmojis.GUI_RICH_PRESENCE,
        "ID",
        Markdown.Format.codestring(guild.id)
      )
    );

    if (guild.owner) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_OWNERCROWN,
          "Owner",
          `${Markdown.Format.link(guild.owner.tag, guild.owner.jumpLink)} (${
            guild.owner.mention
          })`
        )
      );
    }

    if (guild.region) {
      description.push(
        Basic.field(
          CustomEmojis.CHANNEL_VOICE,
          "Voice Region",
          VoiceRegionsText[guild.region as GuildVoiceRegion] || guild.region
        )
      );
    }

    const GuildPublicStatesText: Record<string, string> = {
      [String(true)]: "Public",
      [String(false)]: "Private",
    };

    description.push(
      Basic.field(
        CustomEmojis.GUI_DISCOVERY,
        "Server Type",
        GuildPublicStatesText[String(guild.isPublic)]!
      )
    );

    if (description.length) {
      embed.addField("Information", description.join("\n"));
    }
  }

  {
    const description: Array<string> = [];

    if (guild.channels.length) {
      description.push(
        Basic.field(
          CustomEmojis.CHANNEL_TEXT,
          "Text Channels",
          Markdown.Format.codestring(guild.channels.size.toLocaleString())
        )
      );
    }
  }

  return await editOrReply(context, { embed });
}
