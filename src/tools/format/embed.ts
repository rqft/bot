import { Utils } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Attachment } from "detritus-client/lib/structures";
import { Animation, load } from "imagescript/v2";
import { Pariah } from "pariah";
import { Data } from "pariah/dist/data";
import { Brand, BrandColours, BrandIcons, BrandNames, Colours } from "../../constants";
import { Err } from "../error";
import { formatBytes, store } from "../tools";


export function user(
  context: Context | InteractionContext,
  embed: Utils.Embed = new Utils.Embed()
) {
  embed.setAuthor(
    context.user.tag,
    context.user.avatarUrl,
    context.user.jumpLink
  );
  embed.setColor(Colours.EMBED);
  return embed;
}
export function brand(
  context: Context | InteractionContext,
  brand?: Brand,
  embed: Utils.Embed = new Utils.Embed()
) {
  const self = user(context, embed);
  if (brand) {
    self.setFooter(`${BrandNames[brand]}`, BrandIcons[brand]!.toString());
    self.setColor(BrandColours[brand]!);
  }
  return self;
}
export async function image(
  context: Context | InteractionContext,
  input: URL | string | Buffer | Attachment | ArrayBuffer | Data<string | Buffer | Attachment | ArrayBuffer>,
  name: string,
  ubrand?: Brand
) {
  if (input instanceof Data) {
    input = input.payload;
  }

  if (input instanceof ArrayBuffer) {
    const buf = Buffer.alloc(input.byteLength);
    const view = new Uint8Array(input);
    for (let index = 0; index < buf.length; ++index) {
      buf[index] = view[index]!;
    }
    input = buf;
  }

  if (input instanceof Attachment) {
    input = input.url!;
  }

  if (typeof input === "string") {
    input = new URL(input);
  }

  if (input instanceof URL) {
    input = await new Pariah(input).buffer("/");
  }

  const decoder = new TextDecoder();
  const txt = decoder.decode(input as BufferSource);
  if (txt.match(/^\w+$/g)) {
    switch (txt) {
      case "NO_FACES_DETECTED": { throw new Err("No faces detected"); }
      default: { throw new Err(txt); }
    }
  }

  const image = await store(input as Buffer, name);
  if (!image.url) {
    throw new Err("Failed to store image");
  }

  const embed = brand(context, ubrand);
  embed.setColor(Colours.EMBED);
  const footer = [image.filename];

  const imagescript = load(input as BufferSource);
  if (imagescript instanceof Animation) {
    footer.push(`${imagescript.frames.length} frames`);
  }

  if (image.size) {
    footer.push(
      `${image.width}x${image.height} (${formatBytes(image.size, 2, true)})`
    );
  }

  embed.setFooter(footer.join(", "));
  embed.setImage(image.url!);

  return embed;
}
export function card(
  _context: Context | InteractionContext,
  text: string,
  embed: Utils.Embed = new Utils.Embed()
) {
  embed.setColor(Colours.EMBED);
  embed.setDescription(text);
  return embed;
}