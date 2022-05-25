import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { editOrReply } from "../tools";
import * as Embed from './embed';

export async function guild(context: Context | InteractionContext) {
    const { guild } = context;
    if (!guild) {
        throw new Error('Need to be in a guild');
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

    }

    return await editOrReply(context, { embed });
  }