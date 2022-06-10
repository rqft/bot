import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import fetch from "node-fetch";
import { CustomEmojis } from "../emojis";
import { Markdown } from "../markdown";
import { editOrReply, formatBytes, store } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";
export async function image(
  context: Context | InteractionContext,
  args: Basic.MediaArgs
) {
  const req = await fetch(args.target);
  const data = await req.buffer();

  const attachment = await store(data, "image.gif");

  const embed = Embed.user(context);

  // embed.setTitle(attachment.filename);
  embed.setThumbnail(args.target);

  // attachment info
  {
    const description: Array<string> = [];

    description.push(
      Basic.field(
        CustomEmojis.GUI_RICH_PRESENCE,
        "Attachment ID",
        Markdown.Format.codestring(attachment.id)
      )
    );

    description.push(
      Basic.field(
        CustomEmojis.CHANNEL_CATEGORY,
        "Class Type",
        Markdown.Format.codestring(attachment.classType)
      )
    );
    if (attachment.mimetype) {
      description.push(
        Basic.field(
          CustomEmojis.BLANK,
          "-> Mime Type",
          Markdown.Format.codestring(attachment.mimetype)
        )
      );
    }

    if (attachment.contentType) {
      description.push(
        Basic.field(
          CustomEmojis.BLANK,
          "-> Content-Type",
          Markdown.Format.codestring(attachment.contentType)
        )
      );
    }

    if (attachment.size) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_NAME_EDITED,
          "Size",
          Markdown.Format.codestring(`${attachment.width}x${attachment.height}`)
        )
      );

      description.push(
        Basic.field(
          CustomEmojis.BLANK,
          "-> File Size",
          Markdown.Format.codestring(formatBytes(attachment.size))
        )
      );

      if (description.length) {
        embed.addField("Attachment Info", description.join("\n"), true);
      }
    }
  }

  return await editOrReply(context, { embed });
}
