import { Context } from "detritus-client/lib/command";
import { Embed } from "detritus-client/lib/utils";
import { Colours } from "../constants";

export module Embeds {
  export function user(context: Context, embed: Embed = new Embed()) {
    embed.setColor(Colours.EMBED);
    embed.setAuthor(context.user.tag, context.user.avatarUrl);
    return embed;
  }
}
