import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { selfclient } from "../../globals";
import { Secrets } from "../../secrets";
import { EmojiData } from "../api.emojis";
import { CustomEmojis, Emojis } from "../emojis";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { Parameters } from "../parameters";
import { buildTimestampString, editOrReply } from "../tools";
import { Basic } from './basic';
import { Embed } from './embed';
export interface EmojiArgs {
    emoji: Parameters.EmojiUrl;
  }
  export async function emoji(
    context: Context | InteractionContext,
    args: EmojiArgs
  ) {
    const { emoji } = args;

    const embed = Embed.user(context);
    embed.setThumbnail(emoji.url);

    switch (emoji.type) {
      case Parameters.EmojiType.TWEMOJI: {
        const instance = new EmojiData.API(Secrets.Key.EmojiData);
        console.log(emoji.raw);
        const data = await instance.searchBy(
          "codePoint",
          emoji.raw.toUpperCase().split("-").join(" ")
        );
        if (!data) {
          throw new Err("No emoji data found for that unicode emoji");
        }

        embed.setTitle(data.unicodeName);

        {
          const description: Array<string> = [];

          description.push(
            Basic.field(
              CustomEmojis.GUI_RICH_PRESENCE,
              "Slug",
              Markdown.Format.codestring(data.slug)
            )
          );

          description.push(
            Basic.field(
              CustomEmojis.GUI_ADD_FILE,
              "Code Point",
              Markdown.Format.codestring(data.codePoint)
            )
          );

          description.push(
            Basic.field(
              CustomEmojis.CHANNEL_CATEGORY,
              "Group",
              Markdown.Format.codestring(data.group)
            )
          );

          description.push(
            Basic.field(
              CustomEmojis.BLANK,
              "-> Sub Group",
              Markdown.Format.codestring(data.subGroup)
            )
          );

          if (description.length) {
            embed.addField("Info", description.join("\n"), true);
          }
        }

        break;
      }
      case Parameters.EmojiType.CUSTOM: {
        const data = [context.client, selfclient]
          .map((x) => x.emojis.toArray())
          .flat()
          .find((x) => x.id === emoji.id!);
        if (!data) {
          throw new Err("No emoji data found for that custom emoji");
        }

        embed.setTitle(data.name);

        {
          const description: Array<string> = [];

          description.push(
            Basic.field(
              CustomEmojis.GUI_RICH_PRESENCE,
              "ID",
              Markdown.Format.codestring(data.id!)
            )
          );

          if (data.createdAtUnix) {
            description.push(
              Basic.field(
                Emojis.CALENDAR,
                "Created At",
                buildTimestampString(data.createdAtUnix)
              )
            );
          }

          if (data.user) {
            description.push(
              Basic.field(
                CustomEmojis.GUI_DISCOVERY,
                "Created By",
                `${Markdown.Format.link(
                  data.user.tag,
                  data.user.jumpLink
                )} (${data.user.mention})`
              )
            );
          }

          {
            const tags: Array<string> = [];
            if (data.managed) {
              tags.push("Managed");
            }

            if (data.animated) {
              tags.push("Animated");
            }

            if (data.requireColons) {
              tags.push("Requires Colons");
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

          if (data.roles.size) {
            description.push(
              Basic.field(
                CustomEmojis.GUI_ROLE,
                "Roles",
                data.roles.map((x) => x!.mention).join(", ")
              )
            );
          }

          if (data.guild) {
            description.push(
              Basic.field(
                Emojis.SHIELD,
                "Server",
                `${Markdown.Format.link(
                  data.guild.name,
                  data.guild.jumpLink
                )} (${Markdown.Format.codestring(data.guild.id)})`
              )
            );
          }

          if (description.length) {
            embed.addField("Info", description.join("\n"), true);
          }
        }
      }
    }
    return await editOrReply(context, { embed });
  }