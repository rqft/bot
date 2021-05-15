import { Context } from "detritus-client/lib/command";
import { Message } from "detritus-client/lib/structures";
import { CustomEmojis } from "../enums/customEmojis";
import { getStickerUrl } from "./findImage";
import { generateEmbed } from "./generateEmbedTemplate";
import { limit } from "./limit";
const sender = async (message: Message) => {
  if (message.fromSystem) return "Discord";
  if (message.fromWebhook) {
    const webhook = (await message.guild?.fetchWebhooks())!.find(
      (v) => v.id === message.webhookId
    );
    if (!webhook) return "Unknown Webhook";
  }
  if (message.fromUser)
    if (message.member) return `@${message.member!.name}`;
    else return `@${message.author.name}`;
  return "@Unknown User";
};
export async function makeFoundMessageEmbed(
  context: Context | Message,
  message: Message
) {
  const emb = generateEmbed({
    user: context instanceof Context ? context.user : context.member,
  });
  emb.setAuthor(
    `Sent by ${await sender(message)} in ${message.channel ?? "DMs"}`,
    message.member?.avatarUrl,
    message.jumpLink
  );

  const content = [];
  if (message.application) {
    content.push(
      `┌╴ ${CustomEmojis.GUI_SLASH_COMMAND} used a command from ${message.application.name}`
    );
  }

  if (message.referencedMessage)
    content.push(
      `┌╴ ${CustomEmojis.GUI_REPLY} Replied to \`@${await sender(
        message.referencedMessage
      )}\` [*\u200b${limit(message.referencedMessage.content, 30)}*](${
        message.referencedMessage.jumpLink
      })`
    );
  if (
    message.content ||
    (message.embeds.first() && message.embeds.first()?.description) ||
    (message.embeds.first() &&
      message.embeds.first()?.fields?.first() &&
      message.embeds.first()?.fields)
  )
    content.push(
      `\u200b${limit(
        message.content ??
          message.embeds.first()?.description ??
          message.embeds.first()?.fields?.first()!.value,
        400
      )}`
    );
  if (content.length) emb.setDescription(content.join("\n"));
  if (message.hasAttachment) {
    emb.setImage(message.attachments.toArray()[0]!.url!);
    if (message.attachments.size > 1)
      emb.addField(
        `Attachments`,
        message.attachments.map((v) => `[${v.filename}](${v.url})`).join(", "),
        true
      );
  }
  if (message.embeds.size)
    emb.addField(
      `Embeds`,
      message.embeds
        .map(
          (v) =>
            v.title ??
            (v.author ? v.author.name : null) ??
            (v.fields
              ? v.fields.first()!.name
              : v.footer
              ? v.footer.text
              : null)
        )
        .join(", ")
    );
  if (message.stickers.size) {
    if (message.hasAttachment)
      emb.setThumbnail(getStickerUrl(message.stickers.toArray()[0]!));
    else emb.setImage(getStickerUrl(message.stickers.toArray()[0]!));
    console.log(emb.thumbnail, emb.image);

    if (message.stickers.size > 1)
      emb.addField(
        `Stickers`,
        message.stickers
          .map((v) => `[${v.name}](${getStickerUrl(v)})`)
          .join(", "),
        true
      );
  }
  emb.setTimestamp(message.createdAt);
  return emb;
}
