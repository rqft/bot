import { User } from "detritus-client/lib/structures";
import { Embed } from "detritus-client/lib/utils";
import { Color } from "../globals";

type EmbedTemplate = Partial<{
  showTime: boolean;
  user: User;
  color: number;
  otherText: string | string[];
  start: number;
}>;

export function generateEmbed(
  options: EmbedTemplate = {
    showTime: true,
    color: Color.embed,
  }
) {
  const emb = new Embed();
  if (options.showTime !== false) emb.setTimestamp(new Date());
  const text = [];
  if (options.user) text.push(`Requested by ${options.user.toString()}`);
  if (options.otherText)
    text.push(
      options.otherText instanceof Array
        ? options.otherText.join(" • ")
        : options.otherText
    );
  if (options.start) text.push(`Done in ${Date.now() - options.start}ms`);
  if (text.length)
    emb.setFooter(
      text.join(" • "),
      options.user ? options.user.avatarUrl : undefined
    );
  emb.setColor(options.color ?? Color.embed);
  return emb;
}
