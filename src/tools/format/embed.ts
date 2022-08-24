import { Pariah } from "@rqft/fetch";
import { Utils } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Attachment } from "detritus-client/lib/structures";
import { Animation, Image, load } from "imagescript/v2";
import {
  Brand,
  BrandColours,
  BrandIcons,
  BrandNames,
  Colours,
} from "../../constants";
import { Err } from "../error";
import { formatBytes, store } from "../tools";

export module Embed {
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
    if (context.metadata) {
      if (context.metadata.page) {
        embed.setFooter(
          `Page ${context.metadata.page}/${context.metadata.pageLimit}`
        );
      }
    }
    return embed;
  }
  export function brand(
    context: Context | InteractionContext,
    brand?: Brand,
    embed: Utils.Embed = new Utils.Embed()
  ) {
    const self = user(context, embed);
    const footer = [];
    let icon: string | null = null;

    if (context.metadata) {
      if (context.metadata.page) {
        footer.push(
          `Page ${context.metadata.page}/${context.metadata.pageLimit}`
        );
      }
    }
    if (brand) {
      footer.push(`${BrandNames[brand]}`);
      icon = BrandIcons[brand].toString();
      self.setColor(BrandColours[brand]!);
    }

    if (footer.length) {
      self.setFooter(footer.join(", "), icon);
    }

    return self;
  }
  export async function image(
    context: Context | InteractionContext,
    input: URL | string | Buffer | Attachment | ArrayBuffer,
    name: string,
    ubrand?: Brand,
    skipBuffer = false
  ) {
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

    const embed = brand(context, ubrand);
    embed.setColor(Colours.EMBED);
    const footer = [];

    if (context.metadata) {
      if (context.metadata.page) {
        footer.push(
          `Page ${context.metadata.page}/${context.metadata.pageLimit}`
        );
      }
    }

    if (skipBuffer) {
      if (input instanceof ArrayBuffer || input instanceof Buffer) {
        throw new Err("Buffer is not allowed in this context", { status: 400 });
      }
      embed.setImage(input.toString());
    }

    if (!skipBuffer) {
      if (input instanceof URL) {
        input = (await new Pariah(input).buffer("/")).payload;
      }

      const decoder = new TextDecoder();
      const txt = decoder.decode(input);
      if (txt.match(/^\w+$/g)) {
        switch (txt) {
          case "NO_FACES_DETECTED": {
            throw new Err("No faces detected");
          }
          default: {
            throw new Err(txt);
          }
        }
      }

      let j = null;
      try {
        j = await JSON.parse(txt);
      } catch {
        void 0;
      }
      if (j !== null && "status" in j) {
        throw new Err(j["status"]["message"]);
      }

      const image = await store(input as Buffer, name);
      if (!image.url || !image.width || !image.height) {
        throw new Err("Failed to store image");
      }

      footer.push(image.filename);

      let imagescript: Image | Animation | null = null;
      try {
        imagescript = load(input as BufferSource);
      } catch {
        throw new Err("Failed to load image");
      }

      if (imagescript === null) {
        throw new Err("Failed to load image");
      }

      if (imagescript instanceof Animation) {
        footer.push(`${imagescript.frames.length} frames`);
      }

      if (image.size) {
        footer.push(
          `${image.width}x${image.height} (${formatBytes(image.size, 2, true)})`
        );
      }
      embed.setImage(image.url!);
    }

    embed.setFooter(footer.join(", "));

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
}
