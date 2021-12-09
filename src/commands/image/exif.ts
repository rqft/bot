import { Command, CommandClient } from "detritus-client";
import gm from "gm";
import { Brand } from "../../enums/brands";
import { createBrandEmbed } from "../../functions/embed";
import { Parameters } from "../../functions/parameters";
import { capitalizeWords } from "../../functions/tools";
import { BaseCommand } from "../basecommand";
export interface ExifArgs {
  image: string;
}

export default class ExifCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "exif",
      label: "image",
      type: Parameters.imageUrl,
      required: true,
    });
  }
  async run(context: Command.Context, args: ExifArgs) {
    const imageUrl = args.image;
    const image = await Parameters.image(imageUrl, context);
    let value: gm.ImageInfo = {} as gm.ImageInfo;
    gm(image).identify((err, _value) => {
      if (err) {
        return context.reply("Error while doing exif: " + err);
      }
      value = _value;
    });

    const embed = createBrandEmbed(Brand.GRAPHICS_MAGICK, context);
    embed.setTitle("Exif Info");
    embed.setThumbnail(imageUrl);
    {
      const description: Array<string> = [];
      for (const key in value) {
        let obj = value[key as keyof gm.ImageInfo] as any;
        if (obj) {
          if (isUsefulKey(key as keyof gm.ImageInfo)) {
            description.push(`**${capitalizeWords(key)}**: ${String(obj)}`);
          }
        }
      }

      embed.setDescription(description.join("\n"));
    }
    return context.editOrReply({ embed });
  }
}
function isUsefulKey(key: keyof gm.ImageInfo) {
  let uselessKeys: (keyof gm.ImageInfo)[] = [
    "Channel Depths",
    "Channel Statistics",
    "Compose",
    "Dispose",
    "JPEG-Colorspace-Name",
    "JPEG-Sampling-factors",
    "Matte Color",
    "Page geometry",
    "Profile-EXIF",
    "Profile-XMP",
    "Profile-color",
    "Profile-iptc",
    "Tainted",
  ];
  return !uselessKeys.includes(key) && typeof key === "string";
}
